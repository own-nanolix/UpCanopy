import Art from '@/components/art/Art';
import { HEX } from '@/lib/brand';
import { LADDERS, inkOn } from './color-data';
import Hotspots from './Hotspots';

// Tint ladders (base towards white) and shade ladders (base towards black), eleven computed steps each,
// for Green Park and Blue Ocean. The first step of every ladder is the printed colour. Every cell of the sheet
// is also a button that copies its hex.
const W = 92;
const H = 96;
const GAP = 46;
const TOP = 30;
const VW = 11 * W;
const VH = LADDERS.length * (H + GAP) - GAP + TOP;
const rowY = (row) => row * (H + GAP) + TOP;

function LaddersArt() {
  return (
    <Art viewBox={`0 0 ${VW} ${VH}`} title="Tint and shade ladders for Green Park and Blue Ocean, eleven steps each" exportName="color-ladders">
      {LADDERS.map((l, row) => {
        const y = rowY(row);
        return (
          <g key={l.id}>
            <text x="0" y={y - 14} fontSize="12" fontWeight="500" letterSpacing="1.2" fill={HEX.muted} className="wide" style={{ fontFamily: 'var(--font-wide)' }}>{l.label.toUpperCase()}</text>
            {l.steps.map((st, i) => (
              <g key={st.token} className="rise" style={{ '--i': i + row * 2 }}>
                <rect x={i * W} y={y} width={W - 4} height={H} fill={st.hex} />
                <rect x={i * W} y={y} width={W - 4} height={H} fill="none" stroke={HEX.navy} strokeOpacity="0.14" />
                <text x={i * W + 8} y={y + 20} fontSize="12" fontWeight="700" fill={inkOn(st.hex)}>{st.pct}%</text>
                <text x={i * W + 8} y={y + H - 10} fontSize="11" fontWeight="500" fill={inkOn(st.hex)}>{st.hex}</text>
              </g>
            ))}
          </g>
        );
      })}
    </Art>
  );
}

const SPOTS = LADDERS.flatMap((l, row) =>
  l.steps.map((st, i) => ({ key: st.token, x: i * W, y: rowY(row), w: W - 4, h: H, value: st.hex, label: `${l.label} ${st.pct} percent, ${st.hex}` })),
);

export default function Ladders() {
  return (
    <Hotspots vw={VW} vh={VH} spots={SPOTS}>
      <LaddersArt />
    </Hotspots>
  );
}
