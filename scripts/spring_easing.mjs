// Samples a damped spring into a CSS linear() easing + its settle duration.
function spring({ stiffness, damping, mass = 1 }) {
  const dt = 1 / 600; let x = 0, v = 0, t = 0; const pts = [];
  while (t < 3) {
    const a = (-stiffness * (x - 1) - damping * v) / mass; v += a * dt; x += v * dt; t += dt;
    pts.push([t, x]);
    if (t > 0.1 && Math.abs(x - 1) < 0.001 && Math.abs(v) < 0.01) break;
  }
  const T = t, N = 48, out = [];
  for (let i = 0; i <= N; i++) { const p = pts[Math.min(pts.length - 1, Math.round((i / N) * (pts.length - 1)))]; out.push(+p[1].toFixed(4)); }
  out[N] = 1;
  return { duration: Math.round(T * 1000), css: `linear(0, ${out.slice(1).join(", ")})` };
}
for (const [name, cfg] of Object.entries({ soft: { stiffness: 140, damping: 20 }, bouncy: { stiffness: 220, damping: 15 }, jelly: { stiffness: 380, damping: 14 } })) {
  const s = spring(cfg); console.log(`--spring-${name}: ${s.css}; /* ${s.duration}ms */`);
}
