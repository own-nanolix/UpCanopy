import Art from '@/components/art/Art';
import { MarkG, MarkCropG } from '@/components/art/Mark';
import { BrandDefs, FrondG } from '@/components/art/KeyArt';
import { HEX } from '@/lib/brand';
import { r2, seeded } from '@/lib/charts';
import { range } from '@/lib/site';

// Two crops of the same mark, each on its own panel. "Folder" is the closed folder cover (m08), measured on the
// photograph after taking out the perspective: the right leg of the arch crosses the panel and ends in its cut,
// the right end of the bar sits at the bottom edge. "Hero" is the same idea re-framed for the wide hero at the top
// of this page. The numbers are a designer's crop settings (mark width and offsets as fractions of the panel),
// not facts about the brand.
export const CROPS = {
  Hero: { zoom: 1, dx: -0.3, dy: -0.5, pw: 560, ph: 315, ground: 'rise' },
  Folder: { zoom: 1.67, dx: -0.74, dy: -0.08, pw: 400, ph: 567, ground: 'green' },
};
// The hero cover: brand gradient with grain and an enlarged crop of the mark, framed like the closed folder (m08):
// the right leg of the arch crosses the field to its cut end, the bar sits along the bottom.
export function CoverArt() {
  return (
    <Art viewBox="0 0 1600 900" title="Brand gradient with an enlarged crop of the mark" exportName="lp-hardscape-cover" decorative preserveAspectRatio="xMidYMid slice">
      <BrandDefs idp="lp-hardscape-cover" />
      <rect width="1600" height="900" fill="url(#lp-hardscape-cover-rise)" filter="url(#lp-hardscape-cover-grain)" />
      <MarkCropG idp="lp-hardscape-cover" w={1600} h={900} zoom={CROPS.Hero.zoom} dx={CROPS.Hero.dx} dy={CROPS.Hero.dy} fill={HEX.navy} />
    </Art>
  );
}

// The small green mark.
export function SmallMark() {
  return (
    <Art viewBox="0 0 100 100" title="UpCanopy mark, green" exportName="lp-hardscape-mark-green">
      <MarkG size={100} fill={HEX.green} archClass="roof-arch" barClass="roof-bar" />
    </Art>
  );
}

// The dark mark, for the mint brochure panel (m16).
export function DarkMark() {
  return (
    <Art viewBox="0 0 100 100" title="UpCanopy mark, dark" exportName="lp-hardscape-mark-dark">
      <MarkG size={100} fill={HEX.navy} />
    </Art>
  );
}

// Landscape: a frond on green.
export function LandscapeArt() {
  return (
    <Art viewBox="0 0 500 300" title="Landscape: a frond of leaflets" exportName="lp-hardscape-landscape" decorative>
      <FrondG cx={60} cy={310} r={150} a0={-80} a1={10} count={26} len={230} width={9} lean={-62} tone="onGreen" fan />
    </Art>
  );
}

// Hardscape: courses of blocks laid in a running bond, "tijolo por tijolo".
export function BricksArt() {
  const rnd = seeded(9);
  const rows = 6;
  return (
    <Art viewBox="0 0 500 300" title="Hardscape: blocks laid course by course" exportName="lp-hardscape-bricks" decorative>
      {range(rows, (r) =>
        range(5, (c) => {
          const off = r % 2 ? 50 : 0;
          const x = c * 100 - off;
          return (
            <rect key={`${r}-${c}`} x={r2(x + 3)} y={r2(300 - (r + 1) * 50 + 3)} width="94" height="44" fill={rnd() > 0.82 ? HEX.green : HEX.mint} opacity={r2(0.3 + r * 0.1)} className="rise" style={{ '--i': r * 5 + c }} />
          );
        }),
      )}
    </Art>
  );
}
