import Art from '@/components/art/Art';
import { ScaleDotsG } from '@/components/art/KeyArt';
import { bandPath, polar, r2 } from '@/lib/charts';
import { SCALES } from '@/lib/brand';

// One step of the day: the sun's path as a thick cut band, a green disc at its place, a heavy horizon rule.
const POS = { morning: -50, site: 0, evening: 50 };
export function StepArt({ kind, dark }) {
  const a = POS[kind];
  const [x, y] = polar(120, 140, 92, a);
  const ink = dark ? '#F2FFE4' : '#162557';
  return (
    <Art viewBox="0 0 240 160" title={`Step of the day: ${kind}`} exportName={`lp-agenda-step-${kind}`} style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid slice">
      <rect width="240" height="160" fill={dark ? '#162557' : '#DFF7E6'} />
      <path d={bandPath(120, 140, 84, 100, -80, 80)} fill={ink} opacity="0.22" />
      <g className="lock" style={{ '--i': 3 }}><circle cx={x} cy={y} r="14" fill="#26CF7B" /></g>
      <rect x="0" y="140" width="240" height="6" fill={ink} className="grow-x" />
    </Art>
  );
}

// The day rule with plain-hour ticks.
export function DayRuleArt() {
  const hours = [6, 8, 10, 12, 14, 16, 18, 20];
  return (
    <Art viewBox="0 0 1000 64" title="Day rule from 06:00 to 20:00" exportName="lp-agenda-day-rule" style={{ width: '100%', height: 'auto' }}>
      <rect x="0" y="0" width="1000" height="64" fill="none" />
      <rect x="28" y="12" width="944" height="10" fill="#162557" className="grow-x" />
      {hours.map((h, i) => {
        const x = r2(28 + (i / 7) * 944);
        return (
          <g key={h}>
            <rect x={x - 1.5} y="22" width="3" height="14" fill="#162557" />
            <text x={x} y="56" fontSize="14" fontWeight="700" textAnchor="middle" fill="#4A5568">{String(h).padStart(2, '0')}</text>
          </g>
        );
      })}
    </Art>
  );
}

// The week as outline: seven columns, rules, a few placeholder blocks.
export function WeekOutlineArt() {
  const cols = 7, rows = 6, cw = 62, ch = 40;
  const blocks = [[0, 1, 2], [1, 3, 1], [2, 0, 2], [3, 2, 3], [4, 4, 1], [5, 1, 2], [6, 3, 2]];
  return (
    <Art viewBox="0 0 480 300" title="Week outline: seven days, placeholder blocks" exportName="lp-agenda-week-outline" style={{ width: '100%', height: 'auto' }}>
      <rect width="480" height="300" fill="#FFFFFF" />
      {Array.from({ length: cols + 1 }, (_, i) => <rect key={`v${i}`} x={22 + i * cw - 1} y="24" width="2" height="252" fill="#162557" opacity="0.14" />)}
      {Array.from({ length: rows + 1 }, (_, i) => <rect key={`h${i}`} x="22" y={24 + i * ch - 1} width={cols * cw} height="2" fill="#162557" opacity="0.14" />)}
      <rect x="22" y="22" width={cols * cw} height="6" fill="#162557" />
      {blocks.map(([c, r, n], i) => (
        <g key={i} className="rise" style={{ '--i': i }}>
          <rect x={22 + c * cw + 4} y={24 + r * ch + 4} width={cw - 8} height={n * ch - 8} fill={c === 2 ? '#26CF7B' : '#162557'} />
          <rect x={22 + c * cw + 10} y={24 + r * ch + 11} width={cw - 28} height="5" fill="#FFFFFF" opacity="0.4" />
        </g>
      ))}
    </Art>
  );
}

// The CALMA to ENÉRGICA scale of the case study.
export function CalmScaleArt() {
  const sc = SCALES[3];
  return (
    <Art viewBox="0 0 640 110" title="Scale from CALMA to ENÉRGICA, the eighth dot chosen" exportName="lp-agenda-calm-scale" style={{ width: '100%', height: 'auto' }}>
      <text x="10" y="22" fontSize="14" fontWeight="700" letterSpacing="1.5" fill="#F2FFE4">{sc.left}</text>
      <text x="630" y="22" fontSize="14" fontWeight="700" letterSpacing="1.5" textAnchor="end" fill="#F2FFE4">{sc.right}</text>
      <ScaleDotsG x={22} y={74} w={596} r={15} chosen={sc.chosen} off="#F2FFE4" lock />
    </Art>
  );
}
