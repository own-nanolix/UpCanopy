import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import { FROND_TONES } from '@/components/art/KeyArt';
import { r2 } from '@/lib/charts';
import { HEX, LINES, CONTACT } from '@/lib/brand';

const WIDE = { fontFamily: 'var(--font-wide)' };
const PX = 40; // poster left edge
const PY = 10;
const PW = 700;
const PH = 980;
const SIDE = 80; // right margin of the type, measured on m06 (47 of 412 px)

// Annotations: [y of the pointer, heading, detail lines]
const NOTES = [
  [134, 'BRAND LINE', ['Text voice Light 300', 'line pitch about 5% of poster height', 'right-aligned, ragged left']],
  [289, 'BOLD CLOSE', ['UpCanopy in Bold 700,', 'Green Park on the dark field']],
  [560, 'FROND', ['Graphic, not type: it grows from the', 'left edge and is cropped by it']],
  [830, 'MARK', ['Green mark, lower left']],
  [900, 'CONTACTS', ['Text voice Regular 400', 'small, bottom right']],
];

// The frond as measured on m06: 38 leaflets, roots on the left edge from 26% to 99% of the poster height,
// leaflets near horizontal (tilting from +7 deg at the top to -9 deg at the foot), longest (about 58% of the
// width) at 70% of the height, short at both ends.
const FROND = { count: 38, y0: 252, y1: 974, longest: 410, shortest: 80 };
function leaflets() {
  const T = FROND_TONES.onDark;
  return Array.from({ length: FROND.count }, (_, i) => {
    const t = i / (FROND.count - 1);
    const y = FROND.y0 + (FROND.y1 - FROND.y0) * t;
    const rot = 7 - 17 * t * t;
    const env = Math.sin(Math.PI * Math.pow(t, 1.27));
    const L = FROND.shortest + (FROND.longest - FROND.shortest) * env;
    const W = 4.2 + 2.2 * env;
    return { i, y: r2(PY + y), x: r2(PX - 6 + 10 * Math.sin(Math.PI * t)), rot: r2(rot), L: r2(L), W: r2(W), T };
  });
}

// The designer's poster (reference m06) rebuilt, with the type roles noted in the margin.
export default function Poster() {
  return (
    <Art viewBox="0 0 1180 1000" title="Poster: dark green field, brand line top right with a bold green close, frond growing from the left edge, mark lower left, contacts lower right; type roles noted" exportName="typography-poster">
      <defs>
        <clipPath id="typography-poster-clip"><rect x={PX} y={PY} width={PW} height={PH} /></clipPath>
      </defs>
      <rect width="1180" height="1000" fill={HEX.slide} />
      <g clipPath="url(#typography-poster-clip)">
        <rect x={PX} y={PY} width={PW} height={PH} fill={HEX.greenDark} />
        <g>
          {leaflets().map((l) => (
            <g key={l.i} transform={`translate(${l.x} ${l.y}) rotate(${l.rot})`}>
              <g className="fan" style={{ '--i': l.i }}>
                <path d={`M0 0Q${r2(l.L * 0.5)} ${-l.W} ${l.L} 0Q${r2(l.L * 0.5)} ${l.W} 0 0Z`} fill={l.T.a} />
                <path d={`M0 0Q${r2(l.L * 0.5)} ${-l.W} ${l.L} 0Q${r2(l.L * 0.5)} ${r2(-l.W * 0.15)} 0 0Z`} fill={l.T.b} />
              </g>
            </g>
          ))}
        </g>
        {LINES.bridge.rows4.map((row, i) => (
          <text key={row} x={PX + PW - SIDE} y={PY + 134 + i * 51} fontSize="42" textAnchor="end" lang="pt-BR"
            fontWeight={i === 3 ? 700 : 300} fill={i === 3 ? HEX.green : HEX.mint}>{row}</text>
        ))}
        <MarkG x={PX + 60} y={PY + 811} size={90} fill={HEX.green} />
        <text x={PX + PW - SIDE} y={PY + 858} fontSize="18" textAnchor="end" fill={HEX.mint}>{CONTACT.phone}</text>
        <text x={PX + PW - SIDE} y={PY + 888} fontSize="18" textAnchor="end" fill={HEX.mint}>{CONTACT.web}</text>
      </g>
      <rect x={PX} y={PY} width={PW} height={PH} fill="none" stroke={HEX.navy} strokeOpacity="0.25" />
      {NOTES.map(([y, head, lines], i) => {
        const x0 = head === 'FROND' ? PX + 420 : head === 'MARK' ? PX + 160 : PX + PW - 40;
        return (
          <g key={head} className="fade-in" style={{ '--i': i * 3 }}>
            <path d={`M${x0} ${y - 6}H784`} stroke={HEX.navy} strokeWidth="2" strokeDasharray={head === 'MARK' || head === 'FROND' ? '6 6' : undefined} />
            <circle cx={x0} cy={y - 6} r="5" fill={HEX.green} stroke={HEX.navy} strokeWidth="2" />
            <text x="800" y={y - 4} fontSize="16" fontWeight="500" letterSpacing="1.2" fill={HEX.greenInk} className="wide" style={WIDE}>{head}</text>
            {lines.map((l, k) => (
              <text key={l} x="800" y={y + 26 + k * 28} fontSize="20" fontWeight="400" fill={HEX.navy}>{l}</text>
            ))}
          </g>
        );
      })}
    </Art>
  );
}
