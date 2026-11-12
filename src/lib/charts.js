// UpCanopy's chart helpers: scales, paths, ticks. Pure functions that return numbers and SVG path strings.
// Charts are drawn as inline SVG by the pages; geometry goes in attributes, never in CSS.
// The brand's chart language comes from its slides and its mark: rows of ten round dots with one green dot,
// thick arcs cut with straight ends, square blocks, concentric dashed construction circles.

export const scale = (d0, d1, r0, r1) => (v) => r0 + ((v - d0) / (d1 - d0 || 1)) * (r1 - r0);
export const r2 = (n) => Math.round(n * 100) / 100;

// linePath([[x,y],...]) -> "M..L.." (straight segments)
export function linePath(points) {
  return points.map(([x, y], i) => `${i ? 'L' : 'M'}${r2(x)} ${r2(y)}`).join('');
}

// Stepped line: horizontal then vertical, for well-defined angles.
export function stepPath(points) {
  let d = '';
  points.forEach(([x, y], i) => {
    if (!i) d += `M${r2(x)} ${r2(y)}`;
    else d += `H${r2(x)}V${r2(y)}`;
  });
  return d;
}

// Closes a line down to a baseline.
export function areaPath(points, baseY, stepped = false) {
  const top = stepped ? stepPath(points) : linePath(points);
  return `${top}L${r2(points[points.length - 1][0])} ${r2(baseY)}L${r2(points[0][0])} ${r2(baseY)}Z`;
}

export const polar = (cx, cy, r, deg) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [r2(cx + r * Math.cos(a)), r2(cy + r * Math.sin(a))];
};

// Arc (centre line) from angle a0 to a1 in degrees, 0 = 12 o'clock, clockwise.
export function arcPath(cx, cy, r, a0, a1) {
  const [x0, y0] = polar(cx, cy, r, a0);
  const [x1, y1] = polar(cx, cy, r, a1);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  const sweep = a1 > a0 ? 1 : 0;
  return `M${x0} ${y0}A${r} ${r} 0 ${large} ${sweep} ${x1} ${y1}`;
}

// A thick band between two radii with straight radial cut ends: the shape the mark is built from.
// bandPath(cx, cy, rInner, rOuter, a0, a1) -> closed path
export function bandPath(cx, cy, r0, r1, a0, a1) {
  const [ax, ay] = polar(cx, cy, r1, a0), [bx, by] = polar(cx, cy, r1, a1);
  const [cx2, cy2] = polar(cx, cy, r0, a1), [dx, dy] = polar(cx, cy, r0, a0);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  return `M${ax} ${ay}A${r1} ${r1} 0 ${large} 1 ${bx} ${by}L${cx2} ${cy2}A${r0} ${r0} 0 ${large} 0 ${dx} ${dy}Z`;
}

export const arcLength = (r, a0, a1) => r2((Math.abs(a1 - a0) * Math.PI * r) / 180);

// The ten-dot scale from the case study: returns [{ cx, on }] for `count` dots across width w; `chosen` is 1-based.
export function dotScale(w, chosen, count = 10) {
  const step = w / (count - 1);
  return Array.from({ length: count }, (_, i) => ({ cx: r2(i * step), on: i + 1 === chosen, i }));
}

// Nice ticks for ordinary axes.
export function ticks(d0, d1, n = 5) {
  const span = d1 - d0, step0 = span / n, mag = Math.pow(10, Math.floor(Math.log10(step0)));
  const step = [1, 2, 5, 10].map((m) => m * mag).find((s) => span / s <= n) || mag * 10;
  const out = [];
  for (let v = Math.ceil(d0 / step) * step; v <= d1 + 1e-9; v += step) out.push(r2(v));
  return out;
}

// Share segments as thick bands: returns [{ d, mid: [x, y], value }]
export function shares(values, cx, cy, r0, r1, gapDeg = 3) {
  const total = values.reduce((a, b) => a + b, 0);
  let a = 0;
  return values.map((value) => {
    const span = (value / total) * 360;
    const seg = { d: bandPath(cx, cy, r0, r1, a + gapDeg / 2, a + span - gapDeg / 2), mid: polar(cx, cy, (r0 + r1) / 2, a + span / 2), value };
    a += span;
    return seg;
  });
}

// Segmented progress: n square segments across w with a gap; returns [{ x, w, on }]
export function segments(n, w, filled, gap = 6) {
  const sw = (w - gap * (n - 1)) / n;
  return Array.from({ length: n }, (_, i) => ({ x: r2(i * (sw + gap)), w: r2(sw), on: i < filled }));
}

// Deterministic pseudo-random numbers, so the server and the browser draw the same artwork.
export function seeded(seed = 1) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}
