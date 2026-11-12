// Shared pieces of the stationery page: colours, the one isometric projection used by every plate,
// blocks with thickness, hard cast shadows, binder clips and brand-line text.
import { r2 } from '@/lib/charts';

export const ID = 'use-stationery';

export const C = {
  navy: '#162557', navyDark: '#0F1B45', navyLight: '#24357A', green: '#26CF7B', greenDark: '#052E25', asphalt: '#1D1D1B',
  mint: '#F2FFE4', gray: '#DADADA', white: '#FFFFFF', slide: '#F0F0F0', deep: '#0C1445', paper: '#DFF7E6',
  frond: '#8FC9B5', folder: '#0F3B30', ground: '#EEF9E4', ink: '#22272B', muted: '#4A5568',
};

// ---------- the single projection of an isometric plate ----------
// Plane (u across, v down) to screen. One matrix for the whole plate, as in the designer's flat lay.
export const P = { ux: 0.94, uy: -0.36, vx: 0.6, vy: 0.8 };
const DET = P.ux * P.vy - P.vx * P.uy;
export const toPlane = (sx, sy) => [r2((P.vy * sx - P.vx * sy) / DET), r2((-P.uy * sx + P.ux * sy) / DET)];
export const toScreen = (u, v) => [r2(P.ux * u + P.vx * v), r2(P.uy * u + P.vy * v)];

// <IsoG ox oy> puts everything inside it on the plane whose origin sits at screen (ox, oy).
export function IsoG({ ox = 0, oy = 0, s = 1, children, ...rest }) {
  return <g transform={`matrix(${r2(P.ux * s)} ${r2(P.uy * s)} ${r2(P.vx * s)} ${r2(P.vy * s)} ${ox} ${oy})`} {...rest}>{children}</g>;
}

const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const poly = (pts) => `M${pts.map((p) => `${r2(p[0])} ${r2(p[1])}`).join('L')}Z`;

// Convex hull (monotone chain) of plane points: the outline of a cast shadow.
function hull(pts) {
  const p = [...pts].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo = [];
  for (const q of p) { while (lo.length >= 2 && cross(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
  const up = [];
  for (const q of [...p].reverse()) { while (up.length >= 2 && cross(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop(); up.push(q); }
  return [...lo.slice(0, -1), ...up.slice(0, -1)];
}

// Hard cast shadow of a block on the ground (plane space): footprint plus the footprint shifted to the lower
// right on screen by len px. Drawn first, under the object.
export function CastBlock({ x, y, w, d, len = 20, opacity = 0.24 }) {
  const [su, sv] = toPlane(len * 0.78, len * 0.62);
  const base = [[x, y], [x + w, y], [x + w, y + d], [x, y + d]];
  const pts = [...base, ...base.map(([a, b]) => [a + su, b + sv])];
  return <path d={poly(hull(pts))} fill="#052E25" opacity={opacity} />;
}

// A block with thickness. Footprint x, y, w, d on the plane, height h (screen px). The top face is drawn by
// children in top-face coordinates (0..w, 0..d). Left (u0) and bottom (v1) sides are the visible ones.
// bands: [{ to: 0..1, fill }] splits the bottom side from its top downward; lines: thin stack lines on the sides.
export function Block({ x, y, w, d, h, leftFill = '#0F1B45', bottomFill = '#0F1B45', bands, lines, lineColor = 'rgba(0,0,0,0.28)', lineOpacity = 1, children, ...rest }) {
  const [du, dv] = toPlane(0, -h);
  const tx = x + du, ty = y + dv;
  const L = [[x, y], [x, y + d], [tx, ty + d], [tx, ty]];
  const B = [[x, y + d], [x + w, y + d], [tx + w, ty + d], [tx, ty + d]];
  const slice = (P4, a, b) => {
    // P4 = base0, base1, top1, top0; slice between fractions a..b measured from the top
    const t0 = lerp(P4[3], P4[0], a), t1 = lerp(P4[2], P4[1], a), b1 = lerp(P4[2], P4[1], b), b0 = lerp(P4[3], P4[0], b);
    return [t0, t1, b1, b0];
  };
  const ln = [];
  if (lines) for (let i = 1; i < lines; i++) {
    const t = i / lines;
    [L, B].forEach((F, k) => {
      const a = lerp(F[3], F[0], t), b = lerp(F[2], F[1], t);
      ln.push(<path key={`${k}-${i}`} d={`M${r2(a[0])} ${r2(a[1])}L${r2(b[0])} ${r2(b[1])}`} stroke={lineColor} strokeWidth="0.7" opacity={lineOpacity} />);
    });
  }
  return (
    <g {...rest}>
      <path d={poly(L)} fill={leftFill} />
      {bands ? bands.map((b, i) => <path key={i} d={poly(slice(B, i ? bands[i - 1].to : 0, b.to))} fill={b.fill} />) : <path d={poly(B)} fill={bottomFill} />}
      {ln}
      <g transform={`translate(${r2(tx)} ${r2(ty)})`}>{children}</g>
    </g>
  );
}

// ---------- brand-line text with a bold word ----------
// rows: array of strings; strong: a word or array of words set bold (in strongFill).
export function Rich({ rows, strong = [], x = 0, y = 0, size = 12, lh = 1.22, fill = '#162557', strongFill, anchor = 'start', weight = 300, ...rest }) {
  const S = Array.isArray(strong) ? strong : [strong];
  const split = (row) => {
    let parts = [{ t: row, b: false }];
    S.forEach((w) => {
      parts = parts.flatMap((p) => {
        if (p.b || !p.t.includes(w)) return [p];
        const [a, ...b] = p.t.split(w);
        return [{ t: a, b: false }, { t: w, b: true }, { t: b.join(w), b: false }].filter((q) => q.t !== '');
      });
    });
    return parts;
  };
  return (
    <text x={x} y={y} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor} lang="pt-BR" {...rest}>
      {rows.map((row, i) => (
        <tspan key={i} x={x} dy={i ? r2(size * lh) : 0}>
          {split(row).map((p, j) => (p.b ? <tspan key={j} fontWeight="700" fill={strongFill || fill}>{p.t}</tspan> : p.t))}
        </tspan>
      ))}
    </text>
  );
}

// Plain small text lines, one per row.
export function Lines({ rows, x = 0, y = 0, size = 8, lh = 1.4, fill = '#162557', anchor = 'start', weight = 400, ...rest }) {
  return (
    <text x={x} y={y} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor} {...rest}>
      {rows.map((row, i) => <tspan key={i} x={x} dy={i ? r2(size * lh) : 0}>{row}</tspan>)}
    </text>
  );
}

// ---------- a binder clip (metal body, two wire loops), seen from above; clips the left edge of a sheet ----------
// Origin is the clip's centre on the sheet edge; the body sits on the sheet, the wires loop outward to the left.
export function BinderClip({ idp, x, y, scale = 1, rotate = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path d="M0 -9C-20 -24 -48 -12 -38 2C-31 10 -14 6 0 -1" fill="none" stroke="#A9AFAC" strokeWidth="2.6" />
      <path d="M0 9C-20 24 -48 12 -38 -2C-31 -10 -14 -6 0 1" fill="none" stroke="#6D7370" strokeWidth="2.2" />
      <rect x="-4" y="-32" width="44" height="64" fill={`url(#${idp}-metal)`} />
      <path d="M-4 -32H40V-26H-4Z" fill="#FFFFFF" opacity="0.55" />
      <path d="M-4 26H40V32H-4Z" fill="#000000" opacity="0.16" />
      <path d="M6 -26V26M16 -26V26" stroke="#000000" strokeWidth="0.8" opacity="0.18" />
      <rect x="-4" y="-32" width="44" height="64" fill="none" stroke="#5C615F" strokeWidth="0.8" opacity="0.7" />
    </g>
  );
}

// A caption (plain name) under a plate.
export function Cap({ name, note }) {
  return (
    <figcaption className="mock-cap">
      <span>{name}</span>
      {note ? <span>{note}</span> : null}
    </figcaption>
  );
}

// ---------- faces of a Block, with artwork that follows the surface ----------
// LeftFace: the u0 side. Artwork coordinates: s runs along the plate's v axis (0..d), t runs down the side (0..h).
export function LeftFace({ x, y, d, h, children }) {
  const [du, dv] = toPlane(0, -h);
  return <g transform={`matrix(0 1 ${r2(-du / h)} ${r2(-dv / h)} ${r2(x + du)} ${r2(y + dv)})`}>{children}</g>;
}
// BottomFace: the v1 side. s runs along u (0..w), t runs down the side (0..h).
export function BottomFace({ x, y, d, h, children }) {
  const [du, dv] = toPlane(0, -h);
  return <g transform={`matrix(1 0 ${r2(-du / h)} ${r2(-dv / h)} ${r2(x + du)} ${r2(y + d + dv)})`}>{children}</g>;
}

// A thin sheet lying on the plate at any rotation (slides, papers): an edge of thickness h and its top.
// The top is drawn by children in sheet coordinates (0..w, 0..d).
export function Sheet({ x, y, w, d, rot = 0, h = 3, edge = '#B9C2BC', shadow = 0, children }) {
  const [du, dv] = toPlane(0, h);
  const T = `translate(${x} ${y}) rotate(${rot})`;
  const c = Math.cos((rot * Math.PI) / 180), s = Math.sin((rot * Math.PI) / 180);
  const pts = [[0, 0], [w, 0], [w, d], [0, d]].map(([a, b]) => [x + a * c - b * s, y + a * s + b * c]);
  const [su, sv] = toPlane(shadow * 0.78, shadow * 0.62);
  return (
    <g>
      {shadow > 0 && <path d={poly(hull([...pts, ...pts.map(([a, b]) => [a + su, b + sv])]))} fill="#052E25" opacity="0.22" />}
      <g transform={`translate(${r2(du)} ${r2(dv)}) ${T}`}><rect width={w} height={d} fill={edge} /></g>
      <g transform={T}>{children}</g>
    </g>
  );
}

// Outline of a rotated rectangle in screen space (for CastG on top-view pieces).
export function rotRect(x, y, w, h, deg) {
  const c = Math.cos((deg * Math.PI) / 180), s = Math.sin((deg * Math.PI) / 180);
  return poly([[0, 0], [w, 0], [w, h], [0, h]].map(([a, b]) => [x + a * c - b * s, y + a * s + b * c]));
}
