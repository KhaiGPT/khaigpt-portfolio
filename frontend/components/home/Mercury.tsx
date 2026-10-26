"use client"

import { useEffect, useRef } from "react"

const VS = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`

/*
 * Liquid mercury: a 2D metaball field shaded as polished chrome.
 * The field's gradient becomes a surface normal; the normal looks up a hand-made studio environment
 * (dark floor, ember key light low-left, ice rim high-right, white softbox overhead).
 * One extra blob chases the pointer, so the pool reaches for you.
 */
const FS = `precision highp float;
uniform vec2 uRes;uniform float uTime;uniform vec2 uPtr;uniform float uPtrOn;
float blob(vec2 p,vec2 c,float r){vec2 d=p-c;return r*r/(dot(d,d)+1e-4);}
float field(vec2 p){
  float t=uTime;float f=0.;
  f+=blob(p,vec2(sin(t*.31)*.62,cos(t*.23)*.10-.02),.17);
  f+=blob(p,vec2(sin(t*.27+2.1)*.48,sin(t*.35+1.)*.12),.13);
  f+=blob(p,vec2(cos(t*.22+4.)*.70,cos(t*.29+3.)*.09),.11);
  f+=blob(p,vec2(sin(t*.19+5.)*.30,sin(t*.41+.5)*.08),.15);
  f+=blob(p,vec2(cos(t*.33+1.3)*.85,sin(t*.25+2.)*.07),.09);
  f+=blob(p,uPtr,.12*uPtrOn);
  return f;
}
vec3 env(vec3 r){
  float up=r.y*.5+.5;
  vec3 c=mix(vec3(.015),vec3(.10,.10,.11),smoothstep(.0,.9,up));
  c+=vec3(1.,.36,.12)*1.3*pow(max(0.,dot(r,normalize(vec3(-.8,-.35,.45)))),5.);
  c+=vec3(.62,.80,1.)*1.1*pow(max(0.,dot(r,normalize(vec3(.85,.4,.35)))),6.);
  c+=vec3(1.)*1.6*smoothstep(.93,.99,dot(r,normalize(vec3(-.1,.9,.42))));
  c+=vec3(.9)*.6*smoothstep(.6,.65,up)*smoothstep(.75,.68,up);
  return c;
}
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*uRes)/uRes.y;
  float f=field(uv);
  float e=1.5/uRes.y;
  vec2 g=vec2(field(uv+vec2(e,0.))-field(uv-vec2(e,0.)),field(uv+vec2(0.,e))-field(uv-vec2(0.,e)))/(2.*e);
  float edge=smoothstep(.96,1.04,f);
  // squash the gradient into a dome-like normal: steep at the rim, flat on top
  vec3 n=normalize(vec3(-g*.012/(f*f*.25+.05),1.));
  vec3 r=reflect(vec3(0.,0.,-1.),n);
  vec3 col=env(r);
  col*=.55+.45*smoothstep(1.,2.6,f);
  float fres=pow(1.-n.z,2.);
  col+=fres*vec3(.25,.27,.3);
  gl_FragColor=vec4(col*edge,edge);
}`

export function Mercury() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    if (!cv || matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const gl = cv.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false })
    if (!gl) return
    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader")
      return s
    }
    let prog: WebGLProgram
    try {
      prog = gl.createProgram()!
      gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS))
      gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS))
      gl.linkProgram(prog)
    } catch (err) {
      console.warn("[mercury]", err)
      return
    }
    gl.useProgram(prog)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, "p")
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const u = (n: string) => gl.getUniformLocation(prog, n)
    const uRes = u("uRes"),
      uTime = u("uTime"),
      uPtr = u("uPtr"),
      uPtrOn = u("uPtrOn")

    // render at reduced resolution; the chrome is soft enough that nobody can tell, and it halves the cost
    const scale = Math.min(devicePixelRatio || 1, 1.5) * 0.6
    const size = () => {
      cv.width = Math.max(2, Math.round(cv.clientWidth * scale))
      cv.height = Math.max(2, Math.round(cv.clientHeight * scale))
      gl.viewport(0, 0, cv.width, cv.height)
    }
    size()
    const ptr = { x: 0, y: -0.6, tx: 0, ty: -0.6, on: 0, ton: 0 }
    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect()
      ptr.tx = (e.clientX - r.left - r.width / 2) / r.height
      ptr.ty = -(e.clientY - r.top - r.height / 2) / r.height
      ptr.ton = Math.abs(ptr.ty) < 0.45 ? 1 : 0.35
    }
    const onLeave = () => (ptr.ton = 0)
    const host = cv.parentElement!
    host.addEventListener("pointermove", onMove)
    host.addEventListener("pointerleave", onLeave)
    addEventListener("resize", size)

    let raf = 0
    let visible = false
    const t0 = performance.now()
    const frame = (now: number) => {
      raf = 0
      if (!visible) return
      ptr.x += (ptr.tx - ptr.x) * 0.08
      ptr.y += (ptr.ty - ptr.y) * 0.08
      ptr.on += (ptr.ton - ptr.on) * 0.05
      gl.uniform2f(uRes, cv.width, cv.height)
      gl.uniform1f(uTime, (now - t0) / 1000)
      gl.uniform2f(uPtr, ptr.x, ptr.y)
      gl.uniform1f(uPtrOn, ptr.on)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      cv.dataset.on = ""
      raf = requestAnimationFrame(frame)
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible && !raf) raf = requestAnimationFrame(frame)
    })
    io.observe(cv)

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      host.removeEventListener("pointermove", onMove)
      host.removeEventListener("pointerleave", onLeave)
      removeEventListener("resize", size)
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    }
  }, [])

  return <canvas ref={ref} className="mercury" aria-hidden data-testid="mercury-canvas" />
}
