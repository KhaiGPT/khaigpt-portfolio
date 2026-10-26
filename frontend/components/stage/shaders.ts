export const QUAD_VS = /* glsl */ `#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`

/** Pointer "wake": a low-res velocity field that decays each frame (RGBA8-safe). */
export const TRAIL_FS = /* glsl */ `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 o;
uniform sampler2D uPrev;
uniform vec2 uMouse;
uniform vec2 uVel;
uniform float uAspect;
uniform float uOn;
void main() {
  vec4 p = texture(uPrev, vUv);
  vec2 v = p.xy * 2.0 - 1.0;
  float s = p.z;
  v *= 0.955;
  s *= 0.94;
  v -= sign(v) * 0.004;
  s = max(s - 0.004, 0.0);
  v = mix(v, vec2(0.0), step(abs(v), vec2(0.006)));
  vec2 d = vUv - uMouse;
  d.x *= uAspect;
  float f = exp(-dot(d, d) / 0.0022) * uOn;
  v = clamp(v + uVel * f, -1.0, 1.0);
  s = clamp(s + f * min(length(uVel) * 3.0, 1.0), 0.0, 1.0);
  o = vec4(v * 0.5 + 0.5, s, 1.0);
}`

/**
 * The stage: obsidian smoke, a mercury pool, chrome sculptures that melt, rise and refract.
 * All positions are CSS px with a top-left origin.
 * Slot vec4s — uSlot: (alpha, melt, rise px, materialize) · uSlot2: (reflect, wave rad, scale, seed)
 */
export const STAGE_FS = /* glsl */ `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;

uniform vec2 uRes;
uniform vec2 uView;
uniform float uDpr;
uniform float uTime;
uniform float uMotion;
uniform vec2 uTilt;
uniform sampler2D uTrail;
uniform sampler2D uArtA;
uniform sampler2D uArtB;
uniform vec4 uRectA;
uniform vec4 uRectB;
uniform vec4 uSlotA;
uniform vec4 uSlotB;
uniform vec4 uSlot2A;
uniform vec4 uSlot2B;
uniform vec2 uOriginA;
uniform vec2 uOriginB;
uniform vec4 uSpark;
uniform float uSparkVertical;
uniform vec4 uRip[6];

const vec3 WARM = vec3(1.0, 0.36, 0.12);
const vec3 COOL = vec3(0.6, 0.8, 1.0);

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 r = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 4; i++) { v += a * vnoise(p); p = r * p * 2.03 + 11.7; a *= 0.5; }
  return v;
}
vec2 rot(vec2 v, float a) { float s = sin(a), c = cos(a); return mat2(c, -s, s, c) * v; }
float floorOf(vec4 rect) { return rect.y + rect.w * 1.015; }

// premultiplied colour of one sculpture at css position q
vec4 sculpture(sampler2D tex, vec4 rect, vec4 s, vec4 s2, vec2 origin, vec2 q, vec2 disp, bool mirror, out float edge) {
  edge = 0.0;
  if (s.x <= 0.001 || rect.z < 1.0) return vec4(0.0);
  float melt = s.y, rise = s.z, mat = s.w;
  bool reflect = s2.x > 0.5;
  float floorY = floorOf(rect);

  vec2 P = q;
  if (mirror) { if (q.y < floorY) return vec4(0.0); P.y = 2.0 * floorY - q.y; }
  else if (reflect && q.y > floorY + 1.0) return vec4(0.0);

  P.y -= rise;
  vec2 pivot = vec2(rect.x + rect.z * 0.5, rect.y + rect.w);
  P = pivot + (P - pivot) / s2.z;
  if (abs(s2.y) > 1e-4) {
    float k = clamp((pivot.y - P.y) / rect.w, 0.0, 1.0);
    P = pivot + rot(P - pivot, -s2.y * smoothstep(0.05, 0.6, k));
  }
  vec2 uv = (P - rect.xy) / rect.zw;
  uv += vec2(uTilt.x * (uv.y - 0.5), -uTilt.y * (uv.x - 0.5)) * 0.05 * uMotion;

  float column = vnoise(vec2(uv.x * 9.0 + s2.w, 2.7));
  uv.y -= melt * melt * (0.06 + 0.5 * column) * smoothstep(-0.3, 1.0, uv.y);
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return vec4(0.0);
  // free-floating art (the hero) dissolves into the dark at its cropped edges
  bool tall = rect.w > rect.z;
  float vignette = reflect ? 1.0 : tall
    ? smoothstep(0.0, 0.14, uv.y) * smoothstep(1.0, 0.86, uv.y)
    : smoothstep(0.0, 0.09, uv.x) * smoothstep(1.0, 0.91, uv.x) * smoothstep(0.0, 0.05, uv.y) * smoothstep(1.0, 0.95, uv.y);

  vec4 c;
  if (mirror) {
    c = texture(tex, uv, 2.5);
  } else {
    vec2 ca = clamp(disp / rect.zw * 0.45, -0.02, 0.02);
    vec4 g = texture(tex, uv);
    c = vec4(texture(tex, uv + ca).r, g.g, texture(tex, uv - ca).b, g.a);
    float sweep = mod(uTime * 0.11 + s2.w * 0.37, 2.8) - 0.7;
    float band = exp(-pow((uv.x * 0.8 + uv.y * 0.6 - sweep) * 6.0, 2.0));
    c.rgb += band * 0.3 * c.a * smoothstep(0.15, 0.6, max(c.r, max(c.g, c.b)));
  }

  float n = fbm(uv * 5.0 + s2.w);
  // soft meniscus where a rising sculpture breaks the surface
  if (reflect && !mirror) c *= 1.0 - smoothstep(floorY - 2.5, floorY + 1.0, q.y);
  if (melt > 0.0) {
    float k = uv.y * 0.55 + n * 0.45;
    float th = melt * 1.15 - 0.08;
    edge += (1.0 - smoothstep(0.0, 0.045, abs(k - th - 0.02))) * c.a * step(0.001, melt);
    c *= smoothstep(th, th + 0.04, k);
  }
  if (mat < 1.0) {
    float k = 1.0 - distance(uv, origin) * 0.85 + (n - 0.5) * 0.45;
    float th = 1.0 - mat * 1.3;
    edge += (1.0 - smoothstep(0.0, 0.05, abs(k - th - 0.03))) * (1.0 - mat) * c.a;
    c *= smoothstep(th, th + 0.05, k);
  }
  edge *= s.x * vignette;
  return c * s.x * vignette;
}

vec3 spill(vec3 col, vec4 rect, vec4 s, vec2 q) {
  if (rect.z < 1.0) return col;
  vec2 c = rect.xy + rect.zw * 0.5;
  float d = length((q - c) / max(rect.z, rect.w));
  float amt = exp(-d * d * 2.4) * 0.05 * s.x * s.w * (1.0 - s.y);
  return col + mix(WARM, COOL, smoothstep(-0.6, 0.6, (q.x - c.x) / rect.z)) * amt;
}

vec3 pool(vec3 col, sampler2D tex, vec4 rect, vec4 s, vec4 s2, vec2 origin, vec2 q, vec2 qd, vec2 disp) {
  if (s2.x < 0.5 || rect.z < 1.0) return col;
  float fy = floorOf(rect);
  float cx = rect.x + rect.z * 0.5;
  // glossy horizon where the sculpture meets the liquid
  float gloss = exp(-abs(qd.y - fy) * 0.45) * exp(-pow((q.x - cx) / (rect.z * 0.75), 2.0));
  col += vec3(0.07, 0.068, 0.065) * gloss * s.x * s.w;
  if (q.y < fy) return col;
  float depth = q.y - fy;
  vec2 rq = qd + vec2(sin(q.y * 0.09 - uTime * 2.2) * (1.2 + depth * 0.02), 0.0) * uMotion;
  float e;
  vec4 r = sculpture(tex, rect, s, s2, origin, rq, disp, true, e);
  r *= 0.34 * exp(-depth / (rect.w * 0.3));
  return col * (1.0 - r.a) + r.rgb;
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 q = vec2(frag.x, uRes.y - frag.y) / uDpr;

  vec4 tr = texture(uTrail, frag / uRes);
  vec2 vel = tr.xy * 2.0 - 1.0;
  vel.y = -vel.y;
  vec2 disp = vel * 38.0 * uMotion;

  float ring = 0.0;
  for (int i = 0; i < 6; i++) {
    vec4 R = uRip[i];
    float age = uTime - R.z;
    if (R.w == 0.0 || age < 0.0 || age > 2.2) continue;
    bool onFloor = R.w < 0.0;
    vec2 d = q - R.xy;
    if (onFloor) { if (q.y < R.y) continue; d.y *= 3.4; }
    float dist = length(d);
    float rad = age * (onFloor ? 240.0 : 1150.0);
    float w = onFloor ? 22.0 : 95.0;
    float k = exp(-pow((dist - rad) / w, 2.0)) * pow(1.0 - age / 2.2, 2.0) * abs(R.w);
    disp += (d / max(dist, 1.0)) * k * (onFloor ? 9.0 : 24.0) * uMotion;
    ring += k * (onFloor ? 1.6 : 0.6);
  }
  vec2 qd = q + disp;

  // obsidian smoke
  vec2 bu = qd / uView.y;
  float n1 = fbm(bu * 1.25 + vec2(uTime * 0.012, -uTime * 0.008));
  float n2 = fbm(bu * 2.7 - vec2(uTime * 0.018, 0.0) + n1);
  float smoke = smoothstep(0.42, 1.0, n1 * 0.65 + n2 * 0.45);
  vec3 col = vec3(0.0196) + smoke * smoke * vec3(0.06, 0.062, 0.07);

  col = spill(col, uRectA, uSlotA, q);
  col = spill(col, uRectB, uSlotB, q);
  col = pool(col, uArtA, uRectA, uSlotA, uSlot2A, uOriginA, q, qd, disp);
  col = pool(col, uArtB, uRectB, uSlotB, uSlot2B, uOriginB, q, qd, disp);

  float eA, eB;
  vec4 a = sculpture(uArtA, uRectA, uSlotA, uSlot2A, uOriginA, qd, disp, false, eA);
  col = col * (1.0 - a.a) + a.rgb;
  vec4 b = sculpture(uArtB, uRectB, uSlotB, uSlot2B, uOriginB, qd, disp, false, eB);
  col = col * (1.0 - b.a) + b.rgb;
  col += (eA + eB) * mix(WARM, vec3(1.0, 0.85, 0.7), 0.3) * 1.05;

  col += WARM * tr.z * 0.025 * uMotion + COOL * ring * 0.03;

  // the spark between the fingertips
  if (uSpark.z > 0.0) {
    vec2 d = q - uSpark.xy;
    if (uSparkVertical > 0.5) d = d.yx;
    float r = length(d);
    float flick = 0.72 + 0.28 * vnoise(vec2(uTime * 13.0, 3.1));
    float core = exp(-r * r / 26.0);
    float halo = exp(-r / 34.0) * 0.32;
    float bloom = exp(-r / 170.0) * 0.07;
    float jitter = (vnoise(vec2(d.x * 0.09, uTime * 9.0)) - 0.5) * 9.0;
    float arc = exp(-pow(d.y + jitter, 2.0) / 2.5) * smoothstep(34.0, 4.0, abs(d.x));
    col += (vec3(1.0, 0.94, 0.86) * core * 1.7 + WARM * (halo + bloom) + vec3(1.0, 0.75, 0.55) * arc * 0.55) * uSpark.z * flick;
  }

  vec2 vv = (q / uView - 0.5) * vec2(uView.x / uView.y, 1.0);
  col *= 1.0 - 0.36 * smoothstep(0.35, 1.25, length(vv));
  col += (hash(frag + fract(uTime * 7.3) * 91.0) - 0.5) * 0.026;
  outColor = vec4(col, 1.0);
}`
