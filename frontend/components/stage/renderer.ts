import type { ArtTarget } from "@/lib/stage-bus"
import { createProgram, createTarget, deleteTarget, emptyTexture, fullscreenTriangle, imageTexture, uniforms, type Target } from "./gl"
import { QUAD_VS, STAGE_FS, TRAIL_FS } from "./shaders"
import { clamp01, easeInCubic, easeOutCubic, Spring } from "./spring"

type Slot = {
  t: ArtTarget
  tex: WebGLTexture | null
  url: string
  born: number
  meltStart: number
  alpha: number
  mat: number
  rise: Spring
  scale: Spring
  wave: number
  splashed: boolean
  seed: number
}

const STAGE_UNIFORMS = [
  "uRes", "uView", "uDpr", "uTime", "uMotion", "uTilt", "uTrail", "uArtA", "uArtB",
  "uRectA", "uRectB", "uSlotA", "uSlotB", "uSlot2A", "uSlot2B", "uOriginA", "uOriginB",
  "uSpark", "uSparkVertical", "uRip",
] as const
const TRAIL_UNIFORMS = ["uPrev", "uMouse", "uVel", "uAspect", "uOn"] as const
const MELT_S = 0.72
const RIPPLES = 6
/** ?slowmo slows the stage 8× — handy for inspecting the shader transitions */
const SLOWMO = typeof location !== "undefined" && new URLSearchParams(location.search).has("slowmo") ? 8 : 1

export class StageRenderer {
  private gl: WebGL2RenderingContext
  private stage: WebGLProgram
  private trail: WebGLProgram
  private su: Record<(typeof STAGE_UNIFORMS)[number], WebGLUniformLocation | null>
  private tu: Record<(typeof TRAIL_UNIFORMS)[number], WebGLUniformLocation | null>
  private vao: WebGLVertexArrayObject
  private empty: WebGLTexture
  private trails: [Target, Target]
  private textures = new Map<string, Promise<WebGLTexture>>()
  private out: Slot | null = null
  private cur: Slot | null = null
  private ripples = new Float32Array(RIPPLES * 4)
  private rippleIdx = 0
  private pointer = { x: -1, y: -1, dx: 0, dy: 0, vx: 0, vy: 0, on: 0 }
  private tilt = { x: 0, y: 0 }
  private reduced: boolean
  private quality = 1
  private raf = 0
  private last = 0
  private slowFrames = 0
  private ready = false
  private t0 = performance.now()
  private cleanup: (() => void)[] = []

  constructor(private canvas: HTMLCanvasElement) {
    const gl = canvas.getContext("webgl2", { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: "high-performance" })
    if (!gl) throw new Error("WebGL2 unavailable")
    this.gl = gl
    this.stage = createProgram(gl, QUAD_VS, STAGE_FS)
    this.trail = createProgram(gl, QUAD_VS, TRAIL_FS)
    this.su = uniforms(gl, this.stage, STAGE_UNIFORMS)
    this.tu = uniforms(gl, this.trail, TRAIL_UNIFORMS)
    this.vao = fullscreenTriangle(gl)
    this.empty = emptyTexture(gl)
    this.reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
    this.trails = [createTarget(gl, 4, 4), createTarget(gl, 4, 4)]
    this.resize()
    this.listen()
  }

  private time() {
    return (performance.now() - this.t0) / 1000 / SLOWMO
  }

  private listen() {
    const on = <K extends keyof WindowEventMap>(type: K, fn: (e: WindowEventMap[K]) => void, opts?: AddEventListenerOptions) => {
      addEventListener(type, fn, opts)
      this.cleanup.push(() => removeEventListener(type, fn))
    }
    on("resize", () => this.resize())
    on("pointermove", (e) => {
      const p = this.pointer
      if (p.x >= 0) {
        p.dx += e.clientX - p.x
        p.dy += e.clientY - p.y
      }
      p.x = e.clientX
      p.y = e.clientY
      p.on = 1
    }, { passive: true })
    on("pointerdown", (e) => {
      if ((e.target as Element | null)?.closest?.("a,button")) return
      this.ripple(e.clientX, e.clientY, 0.55)
    }, { passive: true })
    on("blur", () => (this.pointer.on = 0))
    const onVis = () => (document.hidden ? this.stop() : this.start())
    document.addEventListener("visibilitychange", onVis)
    this.cleanup.push(() => document.removeEventListener("visibilitychange", onVis))
    const onLost = (e: Event) => {
      e.preventDefault()
      this.stop()
      delete document.documentElement.dataset.gl
    }
    this.canvas.addEventListener("webglcontextlost", onLost)
    this.cleanup.push(() => this.canvas.removeEventListener("webglcontextlost", onLost))
  }

  private resize() {
    const dpr = Math.min(devicePixelRatio || 1, 1.75) * this.quality
    const w = Math.max(1, Math.round(innerWidth * dpr))
    const h = Math.max(1, Math.round(innerHeight * dpr))
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w
      this.canvas.height = h
    }
    const tw = Math.max(8, Math.round(innerWidth / 5))
    const th = Math.max(8, Math.round(innerHeight / 5))
    if (this.trails[0].w !== tw || this.trails[0].h !== th) {
      this.trails.forEach((t) => deleteTarget(this.gl, t))
      this.trails = [createTarget(this.gl, tw, th), createTarget(this.gl, tw, th)]
    }
  }

  private texture(url: string) {
    let p = this.textures.get(url)
    if (!p) {
      p = imageTexture(this.gl, url)
      p.catch(() => this.textures.delete(url))
      this.textures.set(url, p)
    }
    return p
  }

  /** keeps the slot's texture in sync with the <img>'s responsive source */
  private syncTexture(s: Slot) {
    const url = s.t.el.currentSrc || s.t.el.src
    if (!url || url === s.url) return
    s.url = url
    this.texture(url).then((tex) => {
      if (s.url === url) s.tex = tex
    }, () => {})
  }

  private makeSlot(t: ArtTarget, born: number): Slot {
    const h = t.el.getBoundingClientRect().height || 300
    const rises = t.art.reflect && !this.reduced
    const s: Slot = {
      t,
      tex: null,
      url: "",
      born,
      meltStart: -1,
      alpha: this.reduced ? 0 : 1,
      mat: this.reduced ? 1 : 0,
      rise: new Spring(rises ? h * 0.92 : 0, 0, 92, 11),
      scale: new Spring(rises ? 0.86 : 0.94, 1, 150, 14),
      wave: t.art.wave ? 1 : 0,
      splashed: !rises,
      seed: Math.random() * 10,
    }
    this.syncTexture(s)
    return s
  }

  setArt(t: ArtTarget) {
    if (this.cur?.t.el === t.el) return
    const now = this.time()
    if (this.cur) {
      this.out = this.cur
      this.out.meltStart = now
      const h = this.out.t.el.getBoundingClientRect().height
      this.out.rise.target = this.out.t.art.reflect && !this.reduced ? h * 0.28 : 0
      this.out.rise.k = 40
    }
    this.cur = this.makeSlot(t, now + (this.out ? 0.2 : 0.05))
  }

  ripple(x: number, y: number, strength: number) {
    this.ripples.set([x, y, this.time(), strength], this.rippleIdx * 4)
    this.rippleIdx = (this.rippleIdx + 1) % RIPPLES
  }

  wave() {
    if (this.cur?.t.art.wave) this.cur.wave = 1
  }

  start() {
    if (this.raf) return
    this.last = performance.now()
    const loop = (ts: number) => {
      this.raf = requestAnimationFrame(loop)
      const dt = Math.min(0.05, (ts - this.last) / 1000) / SLOWMO
      this.last = ts
      this.adapt(dt)
      this.update(dt)
      this.draw()
    }
    this.raf = requestAnimationFrame(loop)
  }

  stop() {
    cancelAnimationFrame(this.raf)
    this.raf = 0
  }

  /** drop resolution on struggling GPUs */
  private adapt(dt: number) {
    if (dt > 0.028) this.slowFrames++
    else this.slowFrames = Math.max(0, this.slowFrames - 1)
    if (this.slowFrames > 40 && this.quality > 0.55) {
      this.quality -= 0.15
      this.slowFrames = 0
      this.resize()
    }
  }

  private update(dt: number) {
    const now = this.time()
    const p = this.pointer
    p.vx += (p.dx - p.vx) * 0.5
    p.vy += (p.dy - p.vy) * 0.5
    p.dx = p.dy = 0
    if (p.x >= 0) {
      this.tilt.x += ((p.x / innerWidth) * 2 - 1 - this.tilt.x) * 0.05
      this.tilt.y += ((p.y / innerHeight) * 2 - 1 - this.tilt.y) * 0.05
    }

    for (const s of [this.out, this.cur]) {
      if (!s) continue
      this.syncTexture(s)
      if (!s.tex) {
        s.born = Math.max(s.born, now)
        continue
      }
      if (now < s.born) continue
      s.rise.step(dt)
      s.scale.step(dt)
      s.wave *= Math.exp(-dt * 0.8)
      if (s === this.cur) {
        s.mat = Math.min(1, s.mat + dt / (s.t.art.reflect ? 0.6 : 1.25))
        if (this.reduced) s.alpha = Math.min(1, s.alpha + dt / 0.4)
      }
      if (!s.splashed && s.rise.x < s.t.el.getBoundingClientRect().height * 0.5) {
        s.splashed = true
        const r = s.t.el.getBoundingClientRect()
        this.ripple(r.left + r.width / 2, r.top + r.height * 1.015, -1)
      }
    }

    if (this.out) {
      const m = clamp01((now - this.out.meltStart) / MELT_S)
      if (this.reduced) this.out.alpha = 1 - m
      if (m >= 1 || !this.out.tex) this.out = null
    }

    if (!this.ready && this.cur?.tex && this.cur.mat > 0.1) {
      this.ready = true
      document.documentElement.dataset.gl = "ready"
    }
  }

  private slotUniforms(s: Slot | null, k: "A" | "B", unit: number) {
    const gl = this.gl
    const u = this.su
    gl.activeTexture(gl.TEXTURE0 + unit)
    gl.bindTexture(gl.TEXTURE_2D, s?.tex ?? this.empty)
    gl.uniform1i(u[`uArt${k}`], unit)
    if (!s || !s.tex || this.time() < s.born) {
      gl.uniform4f(u[`uRect${k}`], 0, 0, 0, 0)
      gl.uniform4f(u[`uSlot${k}`], 0, 0, 0, 0)
      return
    }
    const r = s.t.el.getBoundingClientRect()
    const now = this.time()
    const melt = s.meltStart >= 0 && !this.reduced ? easeInCubic(clamp01((now - s.meltStart) / MELT_S)) : 0
    const bob = s.t.art.reflect && !this.reduced ? Math.sin(now * 1.25 + s.seed) * 5 : 0
    const wave = s.wave * Math.sin(now * 9) * 0.2
    const spark = s.t.art.mobile && s.url.includes(s.t.art.mobile.src) ? s.t.art.mobile.spark : s.t.art.spark
    const origin = spark ?? [0.5, 1]
    gl.uniform4f(u[`uRect${k}`], r.left, r.top, r.width, r.height)
    gl.uniform4f(u[`uSlot${k}`], s.alpha, melt, s.rise.x + bob, easeOutCubic(s.mat))
    gl.uniform4f(u[`uSlot2${k}`], s.t.art.reflect ? 1 : 0, wave, s.scale.x, s.seed)
    gl.uniform2f(u[`uOrigin${k}`], origin[0], origin[1])
  }

  private sparkUniforms() {
    const u = this.su
    const s = this.cur?.t.art.spark ? this.cur : this.out?.t.art.spark ? this.out : null
    if (!s || !s.tex) return this.gl.uniform4f(u.uSpark, 0, 0, 0, 0)
    const mobile = !!s.t.art.mobile && s.url.includes(s.t.art.mobile.src)
    const [sx, sy] = mobile ? s.t.art.mobile!.spark : s.t.art.spark!
    const r = s.t.el.getBoundingClientRect()
    const x = r.left + sx * r.width
    const y = r.top + sy * r.height + (s.rise.x || 0)
    const near = this.pointer.x >= 0 ? Math.exp(-Math.hypot(this.pointer.x - x, this.pointer.y - y) / 200) : 0
    const melt = s.meltStart >= 0 ? clamp01((this.time() - s.meltStart) / (MELT_S * 0.6)) : 0
    const k = (0.5 + near * 1.1) * easeOutCubic(s.mat) * (1 - melt) * s.alpha
    this.gl.uniform4f(u.uSpark, x, y, k, 0)
    this.gl.uniform1f(u.uSparkVertical, mobile ? 1 : 0)
  }

  private draw() {
    const gl = this.gl
    const [src, dst] = this.trails
    const p = this.pointer
    gl.bindVertexArray(this.vao)

    gl.useProgram(this.trail)
    gl.bindFramebuffer(gl.FRAMEBUFFER, dst.fb)
    gl.viewport(0, 0, dst.w, dst.h)
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, src.tex)
    gl.uniform1i(this.tu.uPrev, 0)
    gl.uniform2f(this.tu.uMouse, p.x / innerWidth, 1 - p.y / innerHeight)
    const vs = 7
    gl.uniform2f(this.tu.uVel, Math.max(-1, Math.min(1, (p.vx / innerWidth) * vs * 10)), Math.max(-1, Math.min(1, (-p.vy / innerHeight) * vs * 10)))
    gl.uniform1f(this.tu.uAspect, innerWidth / innerHeight)
    gl.uniform1f(this.tu.uOn, this.reduced ? 0 : p.on)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    this.trails = [dst, src]

    gl.useProgram(this.stage)
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    gl.viewport(0, 0, this.canvas.width, this.canvas.height)
    const u = this.su
    gl.uniform2f(u.uRes, this.canvas.width, this.canvas.height)
    gl.uniform2f(u.uView, innerWidth, innerHeight)
    gl.uniform1f(u.uDpr, this.canvas.width / innerWidth)
    gl.uniform1f(u.uTime, this.time())
    gl.uniform1f(u.uMotion, this.reduced ? 0 : 1)
    gl.uniform2f(u.uTilt, this.tilt.x, this.tilt.y)
    gl.uniform4fv(u.uRip, this.ripples)
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, dst.tex)
    gl.uniform1i(u.uTrail, 0)
    this.slotUniforms(this.out, "A", 1)
    this.slotUniforms(this.cur, "B", 2)
    this.sparkUniforms()
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  dispose() {
    this.stop()
    this.cleanup.forEach((f) => f())
    // the context is kept alive: React strict mode re-mounts onto the same canvas
    delete document.documentElement.dataset.gl
  }
}
