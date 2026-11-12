import Art from '@/components/art/Art';
import CopyValue from '@/components/site/CopyValue';
import { HEX } from '@/lib/brand';
import { LADDERS, inkOn } from './color-data';
import s from './color.module.css';

// Tint ladders (base towards white) and shade ladders (base towards black), eleven computed steps each,
// for Green Park and Blue Ocean. The first step of every ladder is the printed colour.
export function LaddersArt() {
  const W = 92;
  const H = 96;
  const GAP = 26;
  return (
    <Art viewBox={`0 0 ${11 * W} ${LADDERS.length * (H + GAP) - GAP + 30}`} title="Tint and shade ladders for Green Park and Blue Ocean, eleven steps each" exportName="color-ladders">
      {LADDERS.map((l, row) => {
        const y = row * (H + GAP) + 30;
        return (
          <g key={l.id}>
            <text x="0" y={y - 12} fontSize="12" fontWeight="500" letterSpacing="1.2" fill={HEX.muted} className="wide" style={{ fontFamily: 'var(--font-wide)' }}>{l.label.toUpperCase()}</text>
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

// The same steps as click-to-copy cells.
export function LadderCells() {
  return (
    <div className={s.ladders}>
      {LADDERS.map((l) => (
        <div key={l.id} className={s.ladder}>
          <h3 className="t-caps muted">{l.label}</h3>
          <ul className={s.ladderRow}>
            {l.steps.map((st) => (
              <li key={st.token} className={s.ladderCell}>
                <span className={s.ladderSw} style={{ background: st.hex }} />
                <CopyValue value={st.hex} label={`${l.label} ${st.pct} percent hex`} className={s.ladderHex} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
