import Art from '@/components/art/Art';
import { WordmarkVerticalG } from '@/components/art/Mark';
import { HEX } from '@/lib/brand';
import { METRICS } from './type-data';

const WIDE = { fontFamily: 'var(--font-wide)' };
const LINES = [
  ['asc', 'Ascender', '#8E2C9E'],
  ['cap', 'Cap height', HEX.navy],
  ['x', 'x-height', HEX.greenInk],
  ['base', 'Baseline', HEX.navy],
  ['desc', 'Descender', '#B3261E'],
];

function Panel({ y0, face, m, size, wide, weight, tag }) {
  const base = y0 + 260;
  const yOf = (k) => (k === 'base' ? base : k === 'desc' ? base + m.desc * size : base - m[k] * size);
  return (
    <g>
      <text x="60" y={y0 + 40} fontSize="12" fontWeight="500" letterSpacing="1.4" fill={HEX.muted} className="wide" style={WIDE}>{tag}</text>
      <text x="60" y={y0 + 70} fontSize="22" fontWeight="700" fill={HEX.navy}>{face}</text>
      <text x="80" y={base} fontSize={size} fontWeight={weight} fill={HEX.navy} className={wide ? 'wide' : undefined} style={wide ? WIDE : undefined}
        letterSpacing={wide ? -size * 0.04 : -size * 0.01}>Hxdp</text>
      {LINES.map(([k, label, c], i) => {
        const y = yOf(k);
        const v = k === 'base' ? '0' : k === 'desc' ? `−${m.desc.toFixed(2)}` : m[k].toFixed(2);
        return (
          <g key={k} className="grow-x" style={{ '--i': i * 3 }}>
            <path d={`M50 ${y}H1300`} stroke={c} strokeWidth="2" strokeDasharray={k === 'base' ? undefined : '10 7'} />
            <text x="1320" y={y + 6} fontSize="18" fontWeight="500" fill={c}>{label} {v} em</text>
          </g>
        );
      })}
    </g>
  );
}

// Metrics study: five guides over large letters of both voices. Values are measured on the free faces we chose.
export function MetricsArt() {
  return (
    <Art viewBox="0 0 1600 900" title="Type construction: ascender, cap height, x-height, baseline and descender over large letters of both voices" exportName="typography-metrics">
      <rect width="1600" height="900" fill={HEX.white} />
      <Panel y0={10} tag="TEXT VOICE" face="Red Hat Display" m={METRICS.text} size={300} weight={400} />
      <path d="M50 450H1550" stroke={HEX.navy} strokeOpacity="0.2" />
      <Panel y0={460} tag="LOGOTYPE VOICE" face="Lexend Exa" m={METRICS.wide} size={290} weight={500} wide />
    </Art>
  );
}

// The word-mark huge, vertical and cropped by the edge, as on the letter, cards and jackets.
export function HabitWordmark() {
  return (
    <Art viewBox="0 0 360 280" title="The word-mark set vertically and cropped by the edge" exportName="typography-habit-wordmark" decorative={false}>
      <rect width="360" height="280" fill={HEX.navy} />
      <WordmarkVerticalG x={40} y={282} size={170} fill={HEX.white} />
    </Art>
  );
}
