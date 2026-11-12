import Art from '@/components/art/Art';
import { MARK_ARCH } from '@/components/art/Mark';
import { HEX, PILLARS } from '@/lib/brand';
import { r2 } from '@/lib/charts';

// The three pillars as locked blocks under the mark's arch. The arch is the roof; the blocks are laid
// beneath it, one after another, in the order the manifesto names them.
const FILLS = [
  { bg: HEX.navy, ink: HEX.white, rule: HEX.green },
  { bg: HEX.green, ink: HEX.navy, rule: HEX.navy },
  { bg: HEX.greenDark, ink: HEX.mint, rule: HEX.green },
];
const BW = 252;
const GAP = 12;
const X0 = (900 - (3 * BW + 2 * GAP)) / 2;

export default function Pillars() {
  return (
    <Art viewBox="0 0 900 560" title="Organização, Disciplina and Confiança as three blocks under the arch of the mark" exportName="lp-hardscape-pillars">
      <rect width="900" height="560" fill={HEX.mint} />
      <g className="rise" style={{ '--i': 0 }}>
        <g transform="translate(200 -22) scale(5)">
          <path d={MARK_ARCH} fill={HEX.navy} />
        </g>
      </g>
      {/* the bar of the mark, widened to the span of the blocks, as the ground the blocks stand on */}
      <rect x={X0 - 12} y="340" width={3 * BW + 2 * GAP + 24} height="14" fill={HEX.navy} className="grow-x" />
      {PILLARS.map((name, i) => {
        const f = FILLS[i];
        const x = r2(X0 + i * (BW + GAP));
        return (
          <g key={name} className="lock" style={{ '--i': i + 2 }}>
            <rect x={x} y="356" width={BW} height="176" fill={f.bg} />
            <rect x={x} y="356" width={BW} height="8" fill={f.rule} />
            <text x={r2(x + 22)} y="412" fontSize="16" fill={f.ink} className="wide" style={{ fontFamily: 'var(--font-wide)' }} letterSpacing="1.6">{`0${i + 1}`}</text>
            <text x={r2(x + 22)} y="500" fontSize="32" fill={f.ink} fontWeight="700">{name}</text>
          </g>
        );
      })}
    </Art>
  );
}
