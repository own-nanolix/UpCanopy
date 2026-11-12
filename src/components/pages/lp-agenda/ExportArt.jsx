import Art from '@/components/art/Art';
import { r2 } from '@/lib/charts';

// Two exportable drawings: the week grid (days across, hours down) and one day timeline with its now rule.
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const hh = (n) => `${String(n).padStart(2, '0')}:00`;
const BLOCKS = [[0, 4, 2], [1, 3, 3], [2, 5, 1], [3, 1, 2], [3, 6, 2], [4, 3, 3], [5, 2, 2], [6, 7, 1]];

export function WeekGridArt() {
  const X0 = 64, Y0 = 52, CW = 76, RH = 30, ROWS = 12;
  return (
    <Art viewBox="0 0 640 450" title="Week grid: seven days across, hours down, placeholder blocks" exportName="lp-agenda-week-grid" style={{ width: '100%', height: 'auto' }}>
      <rect width="640" height="450" fill="#162557" />
      <rect x={X0 + 2 * CW} y={Y0 - 8} width={CW} height={ROWS * RH + 8} fill="#26CF7B" opacity="0.1" />
      {Array.from({ length: ROWS + 1 }, (_, i) => (
        <rect key={`h${i}`} x={X0} y={r2(Y0 + i * RH - 0.5)} width={7 * CW} height="1" fill="#A9B1D1" opacity="0.4" />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={`v${i}`} x={r2(X0 + i * CW - 0.5)} y={Y0 - 8} width="1" height={ROWS * RH + 8} fill="#A9B1D1" opacity="0.4" />
      ))}
      <rect x={X0} y={Y0 - 10} width={7 * CW} height="4" fill="#26CF7B" />
      {DAYS.map((d, i) => (
        <text key={d} x={X0 + i * CW + 10} y="34" fontSize="11" fontWeight="700" letterSpacing="1.5" fill={i === 2 ? '#26CF7B' : '#A9B1D1'}>{d}</text>
      ))}
      {Array.from({ length: ROWS }, (_, i) => (
        <text key={i} x="14" y={Y0 + i * RH + 18} fontSize="10" fontWeight="700" fill="#A9B1D1">{hh(7 + i)}</text>
      ))}
      {BLOCKS.map(([c, r, n], i) => (
        <g key={i} className="rise" style={{ '--i': i }}>
          <rect x={X0 + c * CW + 4} y={Y0 + r * RH + 3} width={CW - 8} height={n * RH - 6} fill="#26CF7B" />
          <rect x={X0 + c * CW + 11} y={Y0 + r * RH + 11} width={CW - 30} height="5" fill="#162557" opacity="0.4" />
        </g>
      ))}
    </Art>
  );
}

export function DayLaneArt() {
  const X0 = 62, Y0 = 20, RH = 34, ROWS = 12, NOW = 4;
  const slots = [[1, 2], [4, 1], [6, 3], [10, 1]];
  return (
    <Art viewBox="0 0 360 450" title="Day timeline: hour axis, blocks and the now rule" exportName="lp-agenda-day-timeline" style={{ width: '100%', height: 'auto' }}>
      <rect width="360" height="450" fill="#F2FFE4" />
      <rect x={X0 - 2} y={Y0} width="4" height={ROWS * RH} fill="#162557" />
      {Array.from({ length: ROWS }, (_, i) => (
        <g key={i}>
          <rect x={X0} y={Y0 + i * RH} width="286" height="1" fill="#162557" opacity="0.2" />
          <text x="10" y={Y0 + i * RH + 20} fontSize="11" fontWeight="700" fill="#4A5568">{hh(7 + i)}</text>
        </g>
      ))}
      {slots.map(([r, n], i) => (
        <g key={r} className="rise" style={{ '--i': i }}>
          <rect x={X0 + 14} y={Y0 + r * RH + 3} width="220" height={n * RH - 6} fill="#162557" />
          <rect x={X0 + 28} y={Y0 + r * RH + 12} width="110" height="5" fill="#F2FFE4" opacity="0.45" />
        </g>
      ))}
      <g className="grow-x">
        <rect x={X0 - 2} y={Y0 + NOW * RH - 2} width="298" height="4" fill="#26CF7B" />
        <rect x="0" y={Y0 + NOW * RH - 13} width="54" height="26" fill="#26CF7B" />
        <text x="27" y={Y0 + NOW * RH + 5} fontSize="12" fontWeight="700" textAnchor="middle" fill="#162557">NOW</text>
      </g>
    </Art>
  );
}
