// Shared parts of the use-product page: geometry helpers, the compliance letter, the pen, small marks.
import { r2 } from '@/lib/charts';
import { CONTACT, DOCUMENT } from '@/lib/brand';
import { MarkG, WordmarkVerticalG } from '@/components/art/Mark';

export const NAVY = '#162557';
export const GREEN = '#26CF7B';
export const DEEP = '#0C1445';
export const DARK = '#052E25';
export const MINT = '#F2FFE4';
export const PAPER = '#DFF7E6';
const RAD = Math.PI / 180;

// Map a point drawn inside `translate(tx ty) rotate(deg) translate(-ox -oy)` to the frame.
export function mapPt(tx, ty, deg, ox, oy, x, y) {
  const c = Math.cos(deg * RAD), s = Math.sin(deg * RAD);
  const dx = x - ox, dy = y - oy;
  return [r2(tx + dx * c - dy * s), r2(ty + dx * s + dy * c)];
}

// A closed polygon path from a list of [x, y] points.
export function poly(pts) {
  return `M${pts.map((p) => `${p[0]} ${p[1]}`).join('L')}Z`;
}

// The light falls from the upper left: this is the lower-right shadow offset expressed in a frame rotated by deg.
export function shadowOffset(deg, d) {
  const c = Math.cos(deg * RAD), s = Math.sin(deg * RAD);
  return [r2(d * (0.64 * c + 0.77 * s)), r2(d * (-0.64 * s + 0.77 * c))];
}

// The contactless symbol, drawn as four arcs. (x, y) is the centre of the arcs; the arcs open to the right.
export function Contactless({ x = 0, y = 0, size = 40, color = '#FFFFFF', strokeWidth = 3.4 }) {
  const arcs = [0.34, 0.58, 0.82, 1.06];
  return (
    <g transform={`translate(${x} ${y})`} fill="none" stroke={color} strokeWidth={strokeWidth}>
      {arcs.map((k) => {
        const r = size * k * 0.5, a = 0.75;
        return <path key={k} d={`M${r2(r * Math.cos(a))} ${r2(-r * Math.sin(a))}A${r2(r)} ${r2(r)} 0 0 1 ${r2(r * Math.cos(a))} ${r2(r * Math.sin(a))}`} />;
      })}
    </g>
  );
}

// Quiet text lines: pale bars instead of illegible body copy.
export function Lines({ x, y, w, rows = 8, gap = 9, h = 2.6, fill = NAVY, opacity = 0.34, seed = 0 }) {
  const widths = [1, 0.97, 0.99, 0.93, 1, 0.96, 0.62, 1, 0.98, 0.94, 0.88, 1, 0.7, 0.96];
  return (
    <g fill={fill} opacity={opacity}>
      {Array.from({ length: rows }, (_, i) => (
        <rect key={i} x={x} y={r2(y + i * gap)} width={r2(w * widths[(i + seed) % widths.length])} height={h} />
      ))}
    </g>
  );
}

// The compliance letter (reference m12, m28), drawn upright on a 430 x 620 sheet with its top edge curling up.
// mat is the id prefix of this SVG's MaterialDefs (for the paper grain); idp makes the gradient ids.
export function Letter({ idp, mat, w = 430, h = 620 }) {
  return (
    <g>
      <defs>
        <linearGradient id={`${idp}-sheet`} x1="0" y1="1" x2="0.8" y2="0">
          <stop offset="0" stopColor="#4FDB95" />
          <stop offset="0.38" stopColor="#BFEFD3" />
          <stop offset="0.7" stopColor="#EEF6EE" />
          <stop offset="1" stopColor="#F9FAF7" />
        </linearGradient>
        <linearGradient id={`${idp}-sheet-shade`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.35" />
          <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="1" stopColor="#052E25" stopOpacity="0.14" />
        </linearGradient>
      </defs>
      <path d={`M0 6Q${w * 0.5} -22 ${w} 4L${w} ${h}L0 ${h}Z`} fill={`url(#${idp}-sheet)`} filter={`url(#${mat}-paper)`} />
      <path d={`M0 6Q${w * 0.5} -22 ${w} 4L${w} ${h}L0 ${h}Z`} fill={`url(#${idp}-sheet-shade)`} />
      <path d={`M${w} 4L${w} ${h}`} stroke="#FFFFFF" strokeWidth="1.4" opacity="0.8" />
      <WordmarkVerticalG x={14} y={h - 22} size={96} fill={NAVY} />
      <MarkG x={w - 68} y={22} size={36} fill={GREEN} />
      <text x="136" y="64" fontSize="11.5" fill={NAVY}>{DOCUMENT.title}</text>
      <text x="136" y="82" fontSize="9" fill={NAVY} opacity="0.8">{DOCUMENT.address}</text>
      <rect x="136" y="98" width={w - 136 - 26} height="1.4" fill={NAVY} opacity="0.7" />
      <Lines x={136} y={112} w={w - 136 - 26} rows={Math.floor((h - 112 - 100) / 8.4)} gap={8.4} h={1.7} opacity={0.42} />
      <rect x="136" y={h - 86} width={w - 136 - 26} height="1.4" fill={NAVY} opacity="0.7" />
      <text x={w - 26} y={h - 54} fontSize="12.5" fontWeight="700" textAnchor="end" fill={NAVY}>{DOCUMENT.labels[0]}</text>
      <text x={w - 26} y={h - 36} fontSize="9" textAnchor="end" fill={NAVY}>{DOCUMENT.labels[1]}</text>
      <text x={w - 26} y={h - 22} fontSize="9" textAnchor="end" fill={NAVY}>{DOCUMENT.labels[2]}</text>
      <text x={w - 96} y={h - 36} fontSize="9" textAnchor="end" fill={NAVY}>{CONTACT.phone}</text>
      <text x={w - 96} y={h - 22} fontSize="9" textAnchor="end" fill={NAVY}>{CONTACT.sac}</text>
    </g>
  );
}

// The Green Park pen, drawn vertically (cap end at y = 0, tip at y = L), with a clip, ring, cone and highlight.
// sdeg is the total rotation of the pen in the frame, so its shadow falls to the lower right.
export function Pen({ idp, mat, L = 520, sdeg = 0 }) {
  const [sx, sy] = shadowOffset(sdeg, 9);
  const body = `M-8 0H8V${L - 46}H-8Z`;
  return (
    <g>
      <defs>
        <linearGradient id={`${idp}-pen`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#064D32" />
          <stop offset="0.22" stopColor="#1BB56A" />
          <stop offset="0.4" stopColor="#8FF2BE" />
          <stop offset="0.58" stopColor="#26CF7B" />
          <stop offset="1" stopColor="#09683E" />
        </linearGradient>
      </defs>
      <g transform={`translate(${sx} ${sy})`} opacity="0.3" filter={`url(#${mat}-soft)`}>
        <path d={`${body}M-8 ${L - 46}L-2.6 ${L}H2.6L8 ${L - 46}Z`} fill={DARK} />
        <rect x="-18" y="18" width="6" height="120" fill={DARK} />
      </g>
      <rect x="-18" y="22" width="6" height="118" fill="#0B8A52" />
      <rect x="-18" y="22" width="2" height="118" fill="#7DF0B6" />
      <path d="M-18 22H-8V34H-18Z" fill="#0B8A52" />
      <path d={body} fill={`url(#${idp}-pen)`} />
      <path d={`M-8 ${L - 46}L-2.6 ${L}H2.6L8 ${L - 46}Z`} fill={`url(#${idp}-pen)`} />
      <rect x="-8.6" y="148" width="17.2" height="5" fill={`url(#${mat}-metal)`} />
      <rect x="-8.6" y={L - 50} width="17.2" height="4" fill={`url(#${mat}-metal)`} />
      <path d={`M-2.6 ${L}H2.6V${L + 7}H-2.6Z`} fill={`url(#${mat}-metal)`} />
      <rect x="-8" y="0" width="16" height="3" fill="#064D32" opacity="0.5" />
      <rect x="-3.8" y="8" width="2.2" height={L - 70} fill="#FFFFFF" opacity="0.6" className="mock-sheen" />
      <path d={body} fill={`url(#${mat}-glass)`} opacity="0.5" />
    </g>
  );
}
