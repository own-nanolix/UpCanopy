// Key art in UpCanopy's own language: the frond, the brand gradient with grain, the dot texture of the mint
// paper, the construction circles of the mark and the ten-dot scale. Every component returns an SVG group
// (<g>) or <defs>; wrap in <Art> for a standalone graphic. Components that create gradients, clips, patterns or
// filters take an `idp` (id prefix): use a different one each time.
import { r2 } from '@/lib/charts';
import { MARK } from './Mark';

// Tints of the frond on each ground.
export const FROND_TONES = {
  onDark: { a: '#8FC9B5', b: '#DFF7E6' },      // on Green Dark (poster, folder)
  onNavy: { a: '#6F78B8', b: '#C9CEF0' },      // on Blue Ocean (truck, citylight)
  onGreen: { a: '#0B6B4B', b: '#052E25' },     // on Green Park (tote, booth)
  onMint: { a: '#26CF7B', b: '#0FA05C' },      // on Green Ligth
};

// The frond: long, thin, pointed leaflets fanned along a sweeping arc, each lit along one side.
//   cx, cy, r        the arc the leaflets grow from
//   a0, a1           start and end angle in degrees (0 = 3 o'clock, clockwise as on screen)
//   count            number of leaflets (30 to 45 in the case study)
//   len              longest leaflet; they taper towards both ends of the arc
//   lean             how far each leaflet leans away from the radius, in degrees
//   tone             a key of FROND_TONES
//   fan              true animates the leaflets fanning out one by one (CSS, lands on the finished artwork)
export function FrondG({ cx = 0, cy = 0, r = 300, a0 = 200, a1 = 340, count = 36, len = 220, width = 9, lean = 62, tone = 'onDark', opacity = 1, fan = false, ...rest }) {
  const T = FROND_TONES[tone] || FROND_TONES.onDark;
  const items = [];
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const a = a0 + (a1 - a0) * t;
    const rad = (a * Math.PI) / 180;
    const px = cx + r * Math.cos(rad), py = cy + r * Math.sin(rad);
    const env = 0.35 + 0.65 * Math.sin(Math.PI * (0.12 + 0.88 * t));
    const L = len * env, W = width * (0.7 + 0.5 * env);
    items.push({ px: r2(px), py: r2(py), rot: r2(a + lean), L: r2(L), W: r2(W), i });
  }
  return (
    <g opacity={opacity} {...rest}>
      {items.map((s) => (
        <g key={s.i} transform={`translate(${s.px} ${s.py}) rotate(${s.rot})`}>
          <g className={fan ? 'fan' : undefined} style={fan ? { '--i': s.i } : undefined}>
            <path d={`M0 0Q${r2(s.L * 0.5)} ${-s.W} ${s.L} 0Q${r2(s.L * 0.5)} ${s.W} 0 0Z`} fill={T.a} />
            <path d={`M0 0Q${r2(s.L * 0.5)} ${-s.W} ${s.L} 0Q${r2(s.L * 0.5)} ${r2(-s.W * 0.15)} 0 0Z`} fill={T.b} />
          </g>
        </g>
      ))}
    </g>
  );
}

// Brand gradients and textures as <defs>. Put once inside an SVG, then use:
//   fill="url(#<idp>-rise)"       Blue Ocean to Green Park, lower left to upper right (box lid, truck, sign)
//   fill="url(#<idp>-rise-dark)"  Green Dark to Blue Ocean (posters)
//   fill="url(#<idp>-paper)"      near white to pale mint (letter, folder)
//   fill="url(#<idp>-green)"      Green Park to a paler green (folder cover)
//   fill="url(#<idp>-dots)"       the small regular dot texture of the mint surfaces (overlay)
//   filter="url(#<idp>-grain)"    fine print grain (apply to the coloured shape)
export function BrandDefs({ idp }) {
  return (
    <defs>
      <linearGradient id={`${idp}-rise`} x1="0" y1="1" x2="1" y2="0">
        <stop offset="0.1" stopColor="#162557" />
        <stop offset="0.6" stopColor="#1C5C66" />
        <stop offset="1" stopColor="#26CF7B" />
      </linearGradient>
      <linearGradient id={`${idp}-rise-dark`} x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="#162557" />
        <stop offset="1" stopColor="#0B4A3A" />
      </linearGradient>
      <linearGradient id={`${idp}-paper`} x1="1" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#BFEFD3" />
      </linearGradient>
      <linearGradient id={`${idp}-green`} x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="#BFEFD3" />
        <stop offset="0.55" stopColor="#4FDB95" />
        <stop offset="1" stopColor="#26CF7B" />
      </linearGradient>
      <pattern id={`${idp}-dots`} width="7" height="7" patternUnits="userSpaceOnUse">
        <circle cx="3.5" cy="3.5" r="0.9" fill="#162557" opacity="0.14" />
      </pattern>
      <filter id={`${idp}-grain`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="7" result="n" />
        <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.16 0" result="g" />
        <feComposite in="g" in2="SourceAlpha" operator="in" result="gi" />
        <feMerge>
          <feMergeNode in="SourceGraphic" />
          <feMergeNode in="gi" />
        </feMerge>
      </filter>
    </defs>
  );
}

// The construction circles of the mark (slide m10): dashed concentric rings about UL, UR and B.
// Drawn in the mark's 100-unit space; place it with the same x, y, size as the MarkG it explains.
export function ConstructionG({ x = 0, y = 0, size = 100, rings = 9, stroke = '#4A5568', strokeWidth = 0.35, draw = false, ...rest }) {
  const centres = [MARK.UL, MARK.UR, MARK.B];
  return (
    <g transform={`translate(${x} ${y}) scale(${size / 100})`} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeDasharray="1.2 1.2" {...rest}>
      {centres.map((c, k) =>
        Array.from({ length: rings }, (_, i) => (
          <circle key={`${k}-${i}`} cx={c.cx} cy={c.cy} r={r2(MARK.U * (i + 0.5) * 1)} className={draw ? 'fade-in' : undefined} style={draw ? { '--i': k * rings + i } : undefined} />
        )),
      )}
    </g>
  );
}

// One row of the ten-dot scale (slide m03). chosen is counted from the left (1 to 10).
// Draws dots only; labels are the caller's (so they can be HTML or SVG text).
export function ScaleDotsG({ x = 0, y = 0, w = 900, r = 23, chosen = 8, count = 10, off = '#22272B', on = '#26CF7B', lock = false, ...rest }) {
  const step = w / (count - 1);
  return (
    <g transform={`translate(${x} ${y})`} {...rest}>
      {Array.from({ length: count }, (_, i) => (
        <circle key={i} cx={r2(i * step)} cy="0" r={r} fill={i + 1 === chosen ? on : off} className={lock ? 'lock' : undefined} style={lock ? { '--i': i } : undefined} />
      ))}
    </g>
  );
}

// A thick arrow, as beside "HOME" on the wall sign. Box about 1.2 x 1 of size.
export function ArrowG({ x = 0, y = 0, size = 24, stroke = 'currentColor', strokeWidth = 2, ...rest }) {
  const s = size;
  return <path transform={`translate(${x} ${y})`} d={`M0 ${s / 2}H${s * 1.1}M${s * 0.62} ${s * 0.06}L${s * 1.1} ${s / 2}L${s * 0.62} ${s * 0.94}`} fill="none" stroke={stroke} strokeWidth={strokeWidth} {...rest} />;
}
