import Art from '@/components/art/Art';
import { HEX } from '@/lib/brand';
import { PROPORTION } from './color-data';

// The proportion bar: four blocks whose widths are the estimated shares. Blocks grow in from the left.
export default function Proportion() {
  const W = 1000;
  const blocks = PROPORTION.map((b, i) => ({
    ...b,
    i,
    w: (W * b.pct) / 100,
    x: (W * PROPORTION.slice(0, i).reduce((a, q) => a + q.pct, 0)) / 100,
  }));
  return (
    <Art viewBox="0 0 1000 330" title="Proportion of colour: Blue Ocean about 40%, greens about 35%, pale mint and white about 20%, Asfalt and Gray about 5% (estimated)" exportName="color-proportion">
      <text x="0" y="16" fontSize="12" fontWeight="500" letterSpacing="1.2" fill={HEX.muted} className="wide" style={{ fontFamily: 'var(--font-wide)' }}>PROPORTION, ESTIMATED</text>
      {blocks.map((b) => (
        <g key={b.id} className="grow-x" style={{ '--i': b.i * 3 }}>
          {b.parts.map((p, k) => (
            <rect key={p} x={b.x + (b.w / b.parts.length) * k} y="32" width={b.w / b.parts.length} height="150" fill={p} />
          ))}
          <rect x={b.x} y="32" width={b.w} height="150" fill="none" stroke={HEX.navy} strokeOpacity="0.2" />
        </g>
      ))}
      {blocks.slice(0, 3).map((b) => (
        <g key={b.id}>
          <text x={b.x + 4} y="226" fontSize="34" fontWeight="500" fill={HEX.navy} className="wide" style={{ fontFamily: 'var(--font-wide)' }}>about {b.pct}%</text>
          <text x={b.x + 4} y="254" fontSize="18" fontWeight="400" fill={HEX.muted}>{b.label}</text>
        </g>
      ))}
      <g>
        <path d={`M${blocks[3].x + blocks[3].w / 2} 184V270`} stroke={HEX.navy} strokeWidth="2" />
        <text x={W} y="296" fontSize="34" fontWeight="500" textAnchor="end" fill={HEX.navy} className="wide" style={{ fontFamily: 'var(--font-wide)' }}>about {blocks[3].pct}%</text>
        <text x={W} y="322" fontSize="18" fontWeight="400" textAnchor="end" fill={HEX.muted}>{blocks[3].label}</text>
      </g>
    </Art>
  );
}
