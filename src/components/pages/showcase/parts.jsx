// Shared pieces of the showcase scenes: rounded rectangles, a thick card with its shadow, plain phone screens,
// and an oblique box for the plinths. Everything returns SVG groups for use inside one <Art> per scene.
import { CastG } from '@/components/art/Mockup';
import { MarkG, WordmarkG, DescriptorG } from '@/components/art/Mark';
import { FrondG } from '@/components/art/KeyArt';
import { r2 } from '@/lib/charts';

export const WIDE = { fontFamily: 'var(--font-wide)' };

// Rounded rectangle path.
export function rr(x, y, w, h, r = 0) {
  if (!r) return `M${r2(x)} ${r2(y)}H${r2(x + w)}V${r2(y + h)}H${r2(x)}Z`;
  return `M${r2(x + r)} ${r2(y)}H${r2(x + w - r)}A${r} ${r} 0 0 1 ${r2(x + w)} ${r2(y + r)}V${r2(y + h - r)}A${r} ${r} 0 0 1 ${r2(x + w - r)} ${r2(y + h)}H${r2(x + r)}A${r} ${r} 0 0 1 ${r2(x)} ${r2(y + h - r)}V${r2(y + r)}A${r} ${r} 0 0 1 ${r2(x + r)} ${r2(y)}Z`;
}

// A thick card (slab): hard cast shadow, a painted edge on the right and bottom, the face clipped to its
// outline, soft shading over it and a bright upper-left rim. `idp` is the scene's MaterialDefs prefix and
// `id` must be unique for the clip path.
export function Slab({ idp, id, w, h, t = 8, edge = '#0A1230', cast = 20, shade = 1, children }) {
  return (
    <g>
      <CastG d={rr(0, 0, w + t * 0.64, h + t * 0.77)} depth={cast} />
      <rect x={t * 0.64} y={t * 0.77} width={w} height={h} fill={edge} />
      <clipPath id={`${id}-clip`}>
        <rect width={w} height={h} />
      </clipPath>
      <g clipPath={`url(#${id}-clip)`}>{children}</g>
      <rect width={w} height={h} fill={`url(#${idp}-shade)`} opacity={shade} />
      <rect width={w} height={h} fill={`url(#${idp}-shade-v)`} opacity={shade} />
      <path d={`M0 ${h}V0H${w}`} fill="none" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="2" />
      <path d={`M${w} 0V${h}H0`} fill="none" stroke="#000000" strokeOpacity="0.18" strokeWidth="2" />
    </g>
  );
}

// Plain phone screens in the brand's own colours, 390 x 844 (the mark, the word-mark, the frond).
export function ScreenPlain({ kind }) {
  const t = {
    navy: { bg: '#162557', mark: '#26CF7B', word: '#FFFFFF', tone: 'onNavy', f: 0.9 },
    green: { bg: '#26CF7B', mark: '#052E25', word: '#162557', tone: 'onGreen', f: 0.85 },
    mint: { bg: '#F2FFE4', mark: '#162557', word: '#162557', tone: 'onMint', f: 0.8 },
  }[kind];
  return (
    <g>
      <rect width="390" height="844" fill={t.bg} />
      <FrondG cx={-30} cy={900} r={420} a0={262} a1={392} count={34} len={330} width={11} lean={62} tone={t.tone} opacity={t.f} />
      <MarkG x={125} y={190} size={140} fill={t.mark} />
      <WordmarkG x={195} y={420} size={50} fill={t.word} anchor="middle" />
      <DescriptorG x={195} y={462} size={15} fill={t.word} anchor="middle" />
    </g>
  );
}

// ---- Isometric helpers: a flat object lying on the floor, long side running down-right ----
export const ISO_K = 0.42;
export function isoMatrix(k = ISO_K) {
  return [r2(0.866 * k), r2(-0.5 * k), r2(0.866 * k), r2(0.5 * k)];
}
// Map a point of the flat object to the screen.
export const isoPt = (x, y, k = ISO_K) => [0.866 * k * (x + y), 0.5 * k * (y - x)];
// A rounded rectangle on the floor as a screen-space path (sampled corners).
export function isoRoundRect(w, h, r, k = ISO_K) {
  const pts = [];
  const corner = (cx, cy, a0) => {
    for (let i = 0; i <= 6; i++) {
      const a = ((a0 + (i * 90) / 6) * Math.PI) / 180;
      pts.push(isoPt(cx + r * Math.cos(a), cy + r * Math.sin(a), k));
    }
  };
  corner(r, r, 180);
  corner(w - r, r, 270);
  corner(w - r, h - r, 0);
  corner(r, h - r, 90);
  return `M${pts.map(([x, y]) => `${r2(x)} ${r2(y)}`).join('L')}Z`;
}

// ---- Oblique box (front view with a little depth up and to the right) for the plinths and boxes ----
export const OBL = { x: 0.5, y: -0.3 };
export function Box({ x, y, w, h, d, front, top, side, children, topChildren, idp }) {
  // (x, y) is the top-left of the front face; d is the depth in front-plane pixels.
  const dx = r2(d * OBL.x), dy = r2(d * OBL.y);
  return (
    <g>
      <path d={`M${x + w} ${y}L${x + w + dx} ${y + dy}V${y + h + dy}L${x + w} ${y + h}Z`} fill={side} />
      <path d={`M${x} ${y}L${x + dx} ${y + dy}H${x + w + dx}L${x + w} ${y}Z`} fill={top} />
      <rect x={x} y={y} width={w} height={h} fill={front} />
      {children}
      {topChildren}
      {idp && (
        <g>
          <path d={`M${x + w} ${y}L${x + w + dx} ${y + dy}V${y + h + dy}L${x + w} ${y + h}Z`} fill="#000000" opacity="0.14" />
          <rect x={x} y={y} width={w} height={h} fill={`url(#${idp}-shade)`} />
          <path d={`M${x} ${y + h}V${y}L${x + dx} ${y + dy}H${x + w + dx}`} fill="none" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="2" />
        </g>
      )}
    </g>
  );
}
// Matrix that lays a flat face on the top of a Box whose front-top-left is (x, y): local x runs across, local y
// runs from the BACK edge (0) to the FRONT edge (depthUnits), so text on it reads upright.
export function topMatrix(x, y, d, depthUnits) {
  const sx = (d * OBL.x) / depthUnits, sy = (d * OBL.y) / depthUnits;
  return `matrix(1 0 ${r2(-sx)} ${r2(-sy)} ${r2(x + sx * depthUnits)} ${r2(y + sy * depthUnits)})`;
}
