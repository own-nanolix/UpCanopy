// Shared pieces of the packaging mockups: the plate, colour helpers, the isometric box and small text helpers.
// One projection everywhere: x axis (0.866, 0.5), y axis (-0.866, 0.5), z up. Light from the upper left.
import Art from '@/components/art/Art';
import { SweepG, MaterialDefs } from '@/components/art/Mockup';
import { BrandDefs } from '@/components/art/KeyArt';
import { LINES, CONTACT } from '@/lib/brand';
import { r2 } from '@/lib/charts';

export const C = {
  navy: '#162557', green: '#26CF7B', dark: '#052E25', mint: '#F2FFE4', paper: '#DFF7E6', gray: '#DADADA',
  asphalt: '#1D1D1B', white: '#FFFFFF', board: '#D3E3D8', deep: '#0C1445',
};
export const K = 0.866;

const hex = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
// Mix colour a towards b by t (0..1).
export function mix(a, b, t) {
  const A = hex(a), B = hex(b);
  return `#${A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join('')}`;
}
export const lighten = (c, t) => mix(c, '#FFFFFF', t);
export const darken = (c, t) => mix(c, '#000000', t);

// The plate: tinted sweep, material and brand defs, then the objects. children receives { idp, m, b }.
export function Plate({ id, title, w = 1000, h = 750, horizon = 0.6, children }) {
  const idp = `use-packaging-${id}`;
  const ids = { idp, m: `${idp}-m`, b: `${idp}-b` };
  return (
    <div className="mock">
      <Art viewBox={`0 0 ${w} ${h}`} title={title} exportName={idp}>
        <MaterialDefs idp={ids.m} />
        <BrandDefs idp={ids.b} />
        <SweepG idp={`${idp}-s`} w={w} h={h} horizon={horizon} />
        {children(ids)}
      </Art>
    </div>
  );
}

// Polygon path from points; rotated rectangle points (centre at 0,0).
export const polyD = (pts) => `M${pts.map((p) => `${r2(p[0])} ${r2(p[1])}`).join('L')}Z`;
export function rectPts(w, h, deg = 0, ox = 0, oy = 0) {
  const a = (deg * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a);
  return [[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]].map(([x, y]) => [ox + x * c - y * s, oy + x * s + y * c]);
}

// A face of an object: local rect (w x h) mapped by transform T; art is clipped to it.
export function Face({ id, T, w, h, fill, filter, shade, shadeOp = 1, children }) {
  return (
    <g transform={T}>
      <clipPath id={id}>
        <rect width={w} height={h} />
      </clipPath>
      <rect width={w} height={h} fill={fill} filter={filter} />
      <g clipPath={`url(#${id})`}>
        {children}
        {shade && <rect width={w} height={h} fill={shade} opacity={shadeOp} />}
      </g>
    </g>
  );
}

// Isometric box with its front-bottom corner at (0, 0). a runs up-left, b runs up-right, h is height.
//   left face  (a x h): x along (0.866, 0.5)      right face (b x h): x along (0.866, -0.5)
//   top face   (a x b): x along (0.866, 0.5), y along (0.866, -0.5), or with swap: (b x a), x up-right.
// Top is lightest, left mid, right darkest. Edges are lit on the top and left, creased on the right.
export function boxGeo(a, b, h) {
  const L = [-K * a, -0.5 * a], R = [K * b, -0.5 * b];
  return { L, R, Lt: [L[0], L[1] - h], Rt: [R[0], R[1] - h], Ft: [0, -h], Bt: [L[0] + R[0], L[1] + R[1] - h] };
}
export const boxOutline = (a, b, h) => {
  const g = boxGeo(a, b, h);
  return polyD([g.L, g.Lt, g.Bt, g.Rt, g.R, [0, 0]]);
};

export function IsoBox({ id, m, a, b, h, base = C.board, fills, swap = false, top, left, right, grain, edge = 2.5 }) {
  const g = boxGeo(a, b, h);
  const f = fills || { top: lighten(base, 0.28), left: base, right: darken(base, 0.3) };
  const tT = swap ? `matrix(${K} -0.5 ${K} 0.5 ${r2(g.Lt[0])} ${r2(g.Lt[1])})` : `matrix(${K} 0.5 ${K} -0.5 ${r2(g.Lt[0])} ${r2(g.Lt[1])})`;
  const [tw, th] = swap ? [b, a] : [a, b];
  const lT = `matrix(${K} 0.5 0 1 ${r2(g.Lt[0])} ${r2(g.Lt[1])})`;
  const rT = `matrix(${K} -0.5 0 1 0 ${-h})`;
  const flt = grain || `url(#${m}-paper)`;
  return (
    <g>
      <Face id={`${id}-fl`} T={lT} w={a} h={h} fill={f.left} filter={grain === null ? undefined : flt} shade={`url(#${m}-shade)`} shadeOp={0.7}>
        {left && left(a, h)}
      </Face>
      <Face id={`${id}-fr`} T={rT} w={b} h={h} fill={f.right} filter={grain === null ? undefined : flt} shade={`url(#${m}-shade)`} shadeOp={0.8}>
        {right && right(b, h)}
      </Face>
      <Face id={`${id}-ft`} T={tT} w={tw} h={th} fill={f.top} filter={grain === null ? undefined : flt} shade={`url(#${m}-shade-v)`} shadeOp={0.55}>
        {top && top(tw, th)}
      </Face>
      {/* board thickness: lit edge along the top and left, dark crease at the corner */}
      <path d={`M${g.L[0]} ${g.L[1] - h}L${g.Lt[0] + 0}${g.Lt[1]}L${g.Bt[0]} ${g.Bt[1]}L${g.Rt[0]} ${g.Rt[1]}`} fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth={edge} strokeLinejoin="miter" />
      <path d={`M${g.Lt[0]} ${g.Lt[1]}L0 ${-h}L${g.Rt[0]} ${g.Rt[1]}`} fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="1.5" />
      <path d={`M0 ${-h}L0 0`} stroke="#000" strokeOpacity="0.28" strokeWidth="1.6" />
      <path d={`M${g.L[0]} ${g.L[1]}L0 0L${g.R[0]} ${g.R[1]}`} fill="none" stroke="#000" strokeOpacity="0.3" strokeWidth="2" />
    </g>
  );
}

// The brand line, one tspan per row, the last row bold in `strong`.
export function BridgeG({ x = 0, y = 0, size = 12, fill = '#fff', strong, anchor = 'start', rows = LINES.bridge.rows4, lh = 1.25, ...rest }) {
  return (
    <text x={x} y={y} fontSize={size} fontWeight="300" fill={fill} textAnchor={anchor} lang="pt-BR" {...rest}>
      {rows.map((r, i) => (
        <tspan key={r} x={x} dy={i ? r2(size * lh) : 0} fontWeight={i === rows.length - 1 ? 700 : 300} fill={i === rows.length - 1 ? strong || fill : fill}>
          {r}
        </tspan>
      ))}
    </text>
  );
}

// Phone and web on two lines.
export function ContactG({ x = 0, y = 0, size = 10, fill = '#fff', anchor = 'end', ...rest }) {
  return (
    <text x={x} y={y} fontSize={size} fontWeight="300" fill={fill} textAnchor={anchor} {...rest}>
      <tspan x={x}>{CONTACT.phone}</tspan>
      <tspan x={x} dy={r2(size * 1.3)}>{CONTACT.web}</tspan>
    </text>
  );
}

// Quiet pale bars standing in for address lines and codes.
export function BarsG({ x = 0, y = 0, widths = [90, 70, 80], gap = 12, h = 4, fill = '#DADADA', ...rest }) {
  return (
    <g {...rest}>
      {widths.map((w, i) => <rect key={i} x={x} y={y + i * gap} width={w} height={h} fill={fill} />)}
    </g>
  );
}
