/** Critically-damped-ish spring integrated with sub-steps for stability at low frame rates. */
export class Spring {
  v = 0

  constructor(
    public x: number,
    public target: number,
    public k = 170,
    public c = 18,
  ) {}

  step(dt: number) {
    const n = Math.max(1, Math.ceil(dt / (1 / 240)))
    const h = dt / n
    for (let i = 0; i < n; i++) {
      const a = -this.k * (this.x - this.target) - this.c * this.v
      this.v += a * h
      this.x += this.v * h
    }
  }

  get settled() {
    return Math.abs(this.x - this.target) < 0.01 && Math.abs(this.v) < 0.01
  }
}

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
export const easeInCubic = (t: number) => t * t * t
export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
