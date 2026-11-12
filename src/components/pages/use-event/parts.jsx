// Shared pieces of the Event page: the stage (sweep, materials, brand defs), shadows, woven webbing, the swivel
// clip and the card body. Every object takes colour parameters; every id starts with `use-event-`.
import Art from '@/components/art/Art';
import { SweepG, MaterialDefs } from '@/components/art/Mockup';
import { BrandDefs } from '@/components/art/KeyArt';
import { r2 } from '@/lib/charts';

export const C = {
  navy: '#162557', green: '#26CF7B', dark: '#052E25', asphalt: '#1D1D1B', mint: '#F2FFE4', paper: '#DFF7E6',
  deep: '#0C1445', white: '#FFFFFF', navyLift: '#2A3A78',
};
export const PX = 'use-event';

// One mockup = one Art SVG on the tinted studio sweep. The brand defs get their own prefix (`-b`) so the
// gradient ids never collide with the material filters.
export function Stage({ name, title, w = 600, h = 450, horizon = 0.62, children }) {
  const idp = `${PX}-${name}`;
  return (
    <Art viewBox={`0 0 ${w} ${h}`} title={title} exportName={idp}>
      <MaterialDefs idp={idp} />
      <BrandDefs idp={`${idp}-b`} />
      <SweepG idp={idp} w={w} h={h} horizon={horizon} />
      {children}
    </Art>
  );
}

// Hard cast shadow of a flat, possibly rotated object: its own outline shifted to the lower right.
export function Cast({ d, x = 0, y = 0, rot = 0, depth = 14, opacity = 0.22 }) {
  return <path d={d} transform={`translate(${r2(x + depth * 0.64)} ${r2(y + depth * 0.77)}) rotate(${rot})`} fill={C.dark} opacity={opacity} />;
}

export const rrect = (w, h) => `M0 0H${w}V${h}H0Z`;

// A woven strap in its own horizontal space: weave, selvedge, stitching, shade. children are clipped to it.
export function Webbing({ id, idp, len, h, fill, stitch = 'rgba(255,255,255,0.5)', children }) {
  return (
    <g>
      <clipPath id={`${id}-clip`}>
        <rect width={len} height={h} />
      </clipPath>
      <pattern id={`${id}-weave`} width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="1.1" height="4" fill="#FFFFFF" opacity="0.1" />
        <rect x="2" width="1" height="4" fill="#000000" opacity="0.1" />
      </pattern>
      <g filter={`url(#${idp}-fabric)`}>
        <rect width={len} height={h} fill={fill} />
      </g>
      <rect width={len} height={h} fill={`url(#${id}-weave)`} />
      <g clipPath={`url(#${id}-clip)`}>{children}</g>
      <rect width={len} height="3" fill="#000000" opacity="0.22" />
      <rect y={h - 3} width={len} height="3" fill="#000000" opacity="0.22" />
      <line x1="0" x2={len} y1="7" y2="7" stroke={stitch} strokeWidth="1.2" strokeDasharray="5 4" />
      <line x1="0" x2={len} y1={h - 7} y2={h - 7} stroke={stitch} strokeWidth="1.2" strokeDasharray="5 4" />
      <rect width={len} height={h} fill={`url(#${idp}-shade-v)`} />
    </g>
  );
}

// Metal ring and black swivel clip with its hook. Origin: centre of the ring; the hook tip lands 121 below.
export function SwivelClip({ idp, x = 0, y = 0, s = 1, rot = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <ellipse rx="38" ry="20" fill="none" stroke={`url(#${idp}-metal-dark)`} strokeWidth="6.5" />
      <ellipse rx="38" ry="20" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.3" strokeDasharray="40 120" transform="rotate(-24)" />
      <rect x="-9" y="14" width="18" height="26" rx="6" fill={`url(#${idp}-metal-dark)`} />
      <rect x="-9" y="25" width="18" height="2.6" fill="#000000" opacity="0.55" />
      <path d="M-12 40C-19 66 -16 98 -3 126L10 121C5 98 15 66 12 40Z" fill={`url(#${idp}-metal-dark)`} />
      <path d="M-5 48C-9 72 -6 98 1 118" fill="none" stroke="#8A8F90" strokeWidth="1.6" opacity="0.8" />
      <path d="M8 46C11 70 7 92 6 112" fill="none" stroke={`url(#${idp}-metal)`} strokeWidth="2.6" />
      <circle cx="9" cy="44" r="2" fill={`url(#${idp}-metal)`} />
    </g>
  );
}

// The body of a card in its own space (0,0 to w,h): thickness, coating, edge light and shade. Artwork goes in
// children and is clipped to the rounded face. `slot` punches the lanyard slot near the top.
export function CardBody({ id, idp, w, h, r = 14, fill, grain, slot = false, thick = 4, children }) {
  return (
    <g>
      <clipPath id={`${id}-face`}>
        <rect width={w} height={h} rx={r} />
      </clipPath>
      <rect x="0.5" y={thick} width={w - 1} height={h} rx={r} fill="#000000" opacity="0.32" />
      <rect width={w} height={h} rx={r} fill={fill} filter={grain ? `url(#${grain})` : `url(#${idp}-paper)`} />
      <g clipPath={`url(#${id}-face)`}>
        {children}
        <rect width={w} height={h} fill={`url(#${idp}-glass)`} opacity="0.7" />
        <rect x="0" y={h - 22} width={w} height="22" fill="#000000" opacity="0.1" />
      </g>
      <rect x="0.6" y="0.6" width={w - 1.2} height={h - 1.2} rx={r} fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.28" />
      {slot && (
        <g>
          <rect x={w / 2 - 12} y="16" width="24" height="8" rx="4" fill="#000000" opacity="0.6" />
          <rect x={w / 2 - 12} y="17.5" width="24" height="8" rx="4" fill="none" stroke="#FFFFFF" strokeWidth="0.9" opacity="0.3" />
        </g>
      )}
    </g>
  );
}

// Plain generic bars that encode nothing (barcode look): widths from a fixed sequence.
const BARS = [3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 3, 1, 2, 1, 3, 2, 1];
export function PlainBars({ x, y, h, fill, opacity = 0.7, unit = 2 }) {
  let cx = 0;
  const out = [];
  BARS.forEach((b, i) => {
    if (i % 2 === 0) out.push(<rect key={i} x={r2(x + cx * unit)} y={y} width={r2(b * unit)} height={h} fill={fill} opacity={opacity} />);
    cx += b + 1;
  });
  return <g>{out}</g>;
}
