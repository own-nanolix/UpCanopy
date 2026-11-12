// The app icon: the navy tile with the Green Park mark, at 16, 32, 64, 128 and 256 px, on a thick ruler.
import Art from '@/components/art/Art';
import { AppIconG, MarkG } from '@/components/art/Mark';
import { r2 } from '@/lib/charts';

export const SIZES = [16, 32, 64, 128, 256];
// The mark is drawn a little larger on the smallest tiles so that it stays legible.
const MARK = { 16: 0.76, 32: 0.68, 64: 0.62, 128: 0.58, 256: 0.58 };

function Tile({ size, x = 0, y = 0 }) {
  const m = MARK[size];
  if (size > 64) return <AppIconG x={x} y={y} size={size} radius={22} />;
  return (
    <g>
      <rect x={x} y={y} width={size} height={size} rx={r2(size * 0.2)} fill="#162557" />
      <MarkG x={r2(x + (size * (1 - m)) / 2)} y={r2(y + (size * (1 - m)) / 2)} size={r2(size * m)} fill="#26CF7B" />
    </g>
  );
}

// One icon alone at its size (exports at its own pixel size).
export function IconAt({ size }) {
  return (
    <Art viewBox={`0 0 ${size} ${size}`} title={`App icon, ${size} px`} exportName={`use-product-icon-${size}`}>
      <Tile size={size} />
    </Art>
  );
}

// The ladder: five sizes standing on a thick ruler with wide-caps labels.
export function IconLadder() {
  const gap = 34, x0 = 56;
  const items = SIZES.map((s, i) => ({ s, x: x0 + SIZES.slice(0, i).reduce((a, b) => a + b + gap, 0) }));
  const total = x0 * 2 + SIZES.reduce((a, b) => a + b, 0) + gap * (SIZES.length - 1);
  const base = 320, rh = 74;
  return (
    <Art viewBox={`0 0 ${total} ${base + rh + 40}`} title="App icon at five sizes on a ruler" exportName="use-product-icon-ladder">
      <rect width={total} height={base + rh + 40} fill="#F2FFE4" />
      {/* ruler */}
      <rect x="0" y={base} width={total} height={rh} fill="#162557" />
      <rect x="0" y={base} width={total} height="4" fill="#FFFFFF" opacity="0.25" />
      {Array.from({ length: Math.floor(total / 16) }, (_, i) => (
        <rect key={i} x={i * 16} y={base + 4} width="2" height={i % 4 === 0 ? 20 : 10} fill="#26CF7B" />
      ))}
      {items.map(({ s, x: ix }) => (
        <g key={s}>
          <path d={`M${ix + 6} ${base - 4}H${ix + s + 6}V${base}H${ix + 6}Z`} fill="#052E25" opacity="0.2" />
          <Tile size={s} x={ix} y={base - s} />
          <text x={ix} y={base + 56} fontSize="10" fontWeight="500" letterSpacing="0.8" fill="#FFFFFF" className="wide" style={{ fontFamily: 'var(--font-wide)' }}>{s} PX</text>
        </g>
      ))}
    </Art>
  );
}
