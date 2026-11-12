// Shared pieces of the logo page: palette shortcuts, slide furniture, the construction rings, and the numbers
// of the construction read straight from MARK (nothing is typed in by hand).
import { r2 } from '@/lib/charts';
import { HEX } from '@/lib/brand';
import { MARK } from '@/components/art/Mark';

export const C = HEX;
export const RED = '#B3261E';

// Radii in units of U, computed from the measured geometry (two decimals; none are rounded to a whole number).
export const RATIOS = [
  { key: 'flankOuter', label: 'Flank, outer edge', centre: 'UL / UR', r: MARK.flankOuter },
  { key: 'flankInner', label: 'Flank, inner edge', centre: 'UL / UR', r: MARK.flankInner },
  { key: 'topInner', label: 'Top band, inner edge', centre: 'B', r: MARK.topInner },
  { key: 'topOuter', label: 'Top band, outer edge', centre: 'B', r: MARK.topOuter },
  { key: 'barInner', label: 'Bar, inner edge', centre: 'B', r: MARK.barInner },
  { key: 'barOuter', label: 'Bar, outer edge', centre: 'B', r: MARK.barOuter },
].map((x) => ({ ...x, units: (x.r / MARK.U).toFixed(2) }));

// Tiny bold caps in the four corners of a plate, as on the designer's slides. Text is SVG text.
export function Furniture({ w, h, tl, tr, bl, br, fill = C.muted, size = 15, m = 28 }) {
  const common = { fontSize: size, fontWeight: 700, letterSpacing: size * 0.05, fill };
  return (
    <g aria-hidden="true">
      {tl && <text x={m} y={m + size * 0.7} {...common}>{tl}</text>}
      {tr && <text x={w - m} y={m + size * 0.7} textAnchor="end" {...common}>{tr}</text>}
      {bl && <text x={m} y={h - m} {...common}>{bl}</text>}
      {br && <text x={w - m} y={h - m} textAnchor="end" {...common}>{br}</text>}
    </g>
  );
}

// Dashed construction rings about the three centres, at whole multiples of U (the mark's edges sit on them).
// Drawn in the mark's 100-unit space; place with the same x, y, size as the mark.
export function Rings({ x = 0, y = 0, size = 100, max = 9, stroke = '#4A5568', width = 0.34, draw = false, delay = 0 }) {
  const centres = [MARK.UL, MARK.UR, MARK.B];
  return (
    <g transform={`translate(${x} ${y}) scale(${size / 100})`} fill="none" stroke={stroke} strokeWidth={width} strokeDasharray="1.1 1.1">
      {centres.map((c, k) =>
        Array.from({ length: max }, (_, i) => (
          <circle
            key={`${k}-${i}`}
            cx={c.cx}
            cy={c.cy}
            r={r2(MARK.U * (i + 1))}
            className={draw ? 'fade-in' : undefined}
            style={draw ? { '--i': i * 3 + k, animationDelay: `calc(${delay}ms + var(--i) * 40ms)` } : undefined}
          />
        )),
      )}
    </g>
  );
}

// Point on a circle about (cx, cy), at the angle of the point p.
export function angleOf(c, p) {
  return Math.atan2(p[1] - c.cy, p[0] - c.cx);
}

// A stacked lockup box is 480 x 240; the mark in it is 108 wide, so one ring unit there is 0.2104 x 108.
export const U_STACK = r2(MARK.U * 1.08);
