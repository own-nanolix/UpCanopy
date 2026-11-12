// Small shared helpers for the dataviz charts. Only real values are ever drawn (see BRIEF.md rule 3).
import { HEX } from '@/lib/brand';

export const INK = HEX.asphalt;
export const OFF = '#22272B'; // the dark dots of slide m03
export const QUIET = HEX.gray; // empty cells and unfilled steps
export const SMALL = '320'; // the viewBox width of a one-card chart
export const LARGE = '440'; // the viewBox width of a two-card chart

// Text inside artwork. Caps labels use wide tracking, as on the slides.
export function Lbl({ x, y, children, anchor = 'start', size = 13, fill = INK, weight = 400, ls = 0.06, wide = false, ...rest }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={fill} letterSpacing={Math.round(ls * size * 100) / 100} style={wide ? { fontFamily: 'var(--font-wide)' } : undefined} {...rest}>
      {children}
    </text>
  );
}

// A quiet placeholder bar: stands where the case study publishes no label or value.
export function Ph({ x, y, w, h = 7, fill = HEX.navy, op = 0.16 }) {
  return <rect x={x} y={y} width={w} height={h} fill={fill} opacity={op} />;
}

// Props that make a mark focusable, named, and shown by the tooltip.
export const tip = (text) => ({ tabIndex: 0, 'aria-label': text, 'data-tip': text });

// An invisible, focusable hit area over a mark that cannot take props itself.
export function Hit({ cx, cy, r, text }) {
  return <circle cx={cx} cy={cy} r={r} fill="transparent" {...tip(text)} />;
}

export const pad2 = (n) => String(n).padStart(2, '0');
