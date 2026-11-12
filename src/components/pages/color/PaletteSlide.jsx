import Art from '@/components/art/Art';
import { PALETTE, HEX } from '@/lib/brand';

// The palette slide as printed (reference m07): a 1600 x 900 white slide, two large primaries on the left,
// four secondaries in two columns on the right. Name top left with the hex under it, number top right with its role.
// Boxes, radius and type sizes measured on m07 (name and number about 16 px, hex and role about 11 px).
const BOX = {
  green: [27, 27, 760, 410],
  navy: [27, 463, 760, 410],
  'green-dark': [813, 27, 367, 410],
  asphalt: [1207, 27, 367, 410],
  mint: [813, 463, 367, 410],
  gray: [1207, 463, 367, 410],
};
const INK = { green: HEX.asphalt, navy: HEX.white, 'green-dark': HEX.white, asphalt: HEX.white, mint: HEX.asphalt, gray: HEX.asphalt };

export default function PaletteSlide() {
  return (
    <Art viewBox="0 0 1600 900" title="Palette slide: Green Park, Blue Ocean, Green Dark, Asfalt, Green Ligth, Gray" exportName="color-palette-slide">
      <rect width="1600" height="900" fill={HEX.white} />
      {PALETTE.map((c, i) => {
        const [x, y, w, h] = BOX[c.token];
        const ink = INK[c.token];
        return (
          <g key={c.token} className="fade-in" style={{ '--i': i * 2 }}>
            <rect x={x} y={y} width={w} height={h} rx="6" fill={c.hex} />
            <text x={x + 26} y={y + 37} fontSize="16" fontWeight="400" fill={ink}>{c.name}</text>
            <text x={x + 26} y={y + 50} fontSize="11" fontWeight="400" fill={ink}>{c.hex.slice(1).toLowerCase()}</text>
            <text x={x + w - 26} y={y + 37} fontSize="16" fontWeight="400" fill={ink} textAnchor="end">{c.no}</text>
            <text x={x + w - 26} y={y + 50} fontSize="11" fontWeight="400" fill={ink} textAnchor="end" lang="pt-BR">{c.role}</text>
          </g>
        );
      })}
    </Art>
  );
}
