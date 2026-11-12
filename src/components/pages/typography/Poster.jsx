import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import { FrondG } from '@/components/art/KeyArt';
import { HEX, LINES, CONTACT } from '@/lib/brand';

const WIDE = { fontFamily: 'var(--font-wide)' };
const PX = 40; // poster left edge
const PY = 10;
const PW = 700;
const PH = 980;

// Annotations: [y of the pointer, heading, detail lines]
const NOTES = [
  [118, 'BRAND LINE', ['Red Hat Display Light 300', 'about 5% of poster height', 'line-height 1.2, right-aligned']],
  [296, 'BOLD CLOSE', ['UpCanopy in Bold 700,', 'Green Park on the dark field']],
  [520, 'FROND', ['Graphic, not type: it enters', 'from the left edge and is cropped']],
  [838, 'MARK', ['Green mark, lower left']],
  [905, 'CONTACTS', ['Red Hat Display Regular 400', 'small, bottom right']],
];

// The designer's poster (reference m06) rebuilt, with the type roles noted in the margin.
export default function Poster() {
  return (
    <Art viewBox="0 0 1180 1000" title="Poster: dark green field, brand line top right with a bold green close, frond left, mark lower left, contacts lower right; type roles noted" exportName="typography-poster">
      <defs>
        <clipPath id="typography-poster-clip"><rect x={PX} y={PY} width={PW} height={PH} /></clipPath>
      </defs>
      <rect width="1180" height="1000" fill={HEX.slide} />
      <g clipPath="url(#typography-poster-clip)">
        <rect x={PX} y={PY} width={PW} height={PH} fill={HEX.greenDark} />
        <FrondG cx={PX - 430} cy={PY + 650} r={520} a0={-26} a1={26} count={38} len={330} width={7} lean={14} tone="onDark" fan />
        {LINES.bridge.rows4.map((row, i) => (
          <text key={row} x={PX + PW - 52} y={PY + 120 + i * 59} fontSize="49" textAnchor="end" lang="pt-BR"
            fontWeight={i === 3 ? 700 : 300} fill={i === 3 ? HEX.green : HEX.mint}>{row}</text>
        ))}
        <MarkG x={PX + 52} y={PY + 800} size={76} fill={HEX.green} />
        <text x={PX + PW - 52} y={PY + 892} fontSize="17" textAnchor="end" fill={HEX.mint}>{CONTACT.phone}</text>
        <text x={PX + PW - 52} y={PY + 918} fontSize="17" textAnchor="end" fill={HEX.mint}>{CONTACT.web}</text>
      </g>
      <rect x={PX} y={PY} width={PW} height={PH} fill="none" stroke={HEX.navy} strokeOpacity="0.25" />
      {NOTES.map(([y, head, lines], i) => (
        <g key={head} className="fade-in" style={{ '--i': i * 3 }}>
          <path d={`M${PX + PW - 40} ${y - 6}H784`} stroke={HEX.navy} strokeWidth="2" strokeDasharray={head === 'MARK' || head === 'FROND' ? '6 6' : undefined} />
          <circle cx={PX + PW - 40} cy={y - 6} r="5" fill={HEX.green} stroke={HEX.navy} strokeWidth="2" />
          <text x="800" y={y - 4} fontSize="16" fontWeight="500" letterSpacing="1.2" fill={HEX.greenInk} className="wide" style={WIDE}>{head}</text>
          {lines.map((l, k) => (
            <text key={l} x="800" y={y + 26 + k * 28} fontSize="21" fontWeight="400" fill={HEX.navy}>{l}</text>
          ))}
        </g>
      ))}
    </Art>
  );
}
