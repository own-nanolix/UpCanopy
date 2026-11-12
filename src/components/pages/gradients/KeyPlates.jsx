// Six key-art plates built only from the brand's own geometry: the frond, the mark and its crop, the
// construction circles, thick cut bands, the ten-dot row and the giant word-mark.
import Art from '@/components/art/Art';
import { FrondG, ConstructionG, ScaleDotsG } from '@/components/art/KeyArt';
import { MarkG, MarkCropG, WordmarkG, WordmarkVerticalG, DescriptorG } from '@/components/art/Mark';
import { LINES } from '@/lib/brand';
import { bandPath, r2 } from '@/lib/charts';
import { gradById, GradDef, GrainDef, DotsDef, GradRect } from './parts';
import s from './gradients.module.css';

const G = {
  rise: gradById('ocean-park'),
  dark: gradById('dark-field'),
  deep: gradById('navy-ground'),
  mint: gradById('mint-paper'),
};
const MINT = '#F2FFE4';

function Plate({ n, ratio, title, exportName, caption, spec, className, children }) {
  return (
    <figure className={`${s.fig} ${className || ''}`}>
      <Art viewBox={ratio} title={title} exportName={exportName} className={s.plate}>{children}</Art>
      <figcaption className={s.cap}>
        <strong>Key art {n}: {caption}</strong>
        <span>{spec}</span>
      </figcaption>
    </figure>
  );
}

// 1. Portrait 4:5. The canopy lifting along the rising gradient; the vertical word-mark reads bottom to top.
function Rising() {
  const idp = 'gradients-k1';
  return (
    <Plate n={1} ratio="0 0 800 1000" title="Rising frond on the navy to green gradient with the vertical word-mark" exportName="gradients-key-rising-frond"
      caption="Rising frond" spec="4:5. Frond on Blue Ocean, vertical word-mark, mark top right" className={s.k1}>
      <defs>
        <GradDef idp={idp} g={G.rise} />
        <GrainDef idp={idp} amt={0.16} />
        <clipPath id={`${idp}-clip`}><rect width="800" height="1000" /></clipPath>
      </defs>
      <g clipPath={`url(#${idp}-clip)`}>
        <GradRect idp={idp} g={G.rise} w={800} h={1000} />
        <FrondG cx={860} cy={560} r={470} a0={100} a1={262} count={38} len={400} width={14} lean={52} tone="onNavy" />
        <WordmarkVerticalG x={44} y={960} size={150} fill={MINT} />
        <MarkG x={684} y={44} size={72} fill="#26CF7B" />
      </g>
    </Plate>
  );
}

// 2. Landscape 16:9. The frond entering from the left edge on Green Dark, with a brand line.
function Poster() {
  const idp = 'gradients-k2';
  const w = LINES.level.split(' ');
  const last = w.pop();
  return (
    <Plate n={2} ratio="0 0 1600 900" title="Pale frond sweeping in from the left on dark green with a brand line" exportName="gradients-key-poster-frond"
      caption="Poster frond" spec="16:9. Frond on Green Dark, brand line top right" className={s.k2}>
      <defs>
        <GradDef idp={idp} g={G.dark} />
        <GrainDef idp={idp} amt={0.2} />
        <clipPath id={`${idp}-clip`}><rect width="1600" height="900" /></clipPath>
      </defs>
      <g clipPath={`url(#${idp}-clip)`}>
        <GradRect idp={idp} g={G.dark} w={1600} h={900} />
        <FrondG cx={150} cy={1060} r={760} a0={250} a1={352} count={40} len={560} width={17} lean={38} tone="onDark" />
        <text x="1500" y="150" fontSize="58" fontWeight="300" textAnchor="end" fill={MINT} lang="pt-BR">
          {w.join(' ')} <tspan fontWeight="700" fill="#26CF7B">{last}</tspan>
        </text>
        <MarkG x={1450} y={780} size={60} fill="#26CF7B" />
      </g>
    </Plate>
  );
}

// 3. Square. The mark crop: two broad bands of the mark, enlarged, as the folder cover.
function Crop() {
  const idp = 'gradients-k3';
  return (
    <Plate n={3} ratio="0 0 1000 1000" title="Enlarged crop of the mark in navy on Green Park" exportName="gradients-key-mark-crop"
      caption="Mark crop" spec="1:1. Enlarged mark in Blue Ocean on Green Park, word-mark below" className={s.k3}>
      <defs>
        <GradDef idp={idp} g={{ ...gradById('park-pale'), kind: 'linear' }} />
        <GrainDef idp={idp} amt={0.12} />
      </defs>
      <GradRect idp={idp} g={gradById('park-pale')} w={1000} h={1000} />
      <MarkCropG idp={`${idp}`} x={0} y={0} w={1000} h={760} zoom={1.7} dx={-0.35} dy={-0.92} fill="#162557" />
      <WordmarkG x={60} y={900} size={78} fill="#162557" />
      <DescriptorG x={940} y={896} size={20} fill="#162557" anchor="end" />
    </Plate>
  );
}

// 4. Banner 3:1. The giant word-mark cropped by the edge, over a row of ten dots with one chosen.
function Banner() {
  const idp = 'gradients-k4';
  return (
    <Plate n={4} ratio="0 0 1500 500" title="Giant cropped word-mark over the ten-dot row on deep navy" exportName="gradients-key-wordmark-banner"
      caption="Word-mark banner" spec="3:1. Cropped word-mark, ten-dot row with the eighth dot chosen" className={s.k4}>
      <defs>
        <GradDef idp={idp} g={G.deep} />
        <GrainDef idp={idp} amt={0.1} />
        <clipPath id={`${idp}-clip`}><rect width="1500" height="500" /></clipPath>
      </defs>
      <g clipPath={`url(#${idp}-clip)`}>
        <GradRect idp={idp} g={G.deep} w={1500} h={500} />
        <WordmarkG x={-70} y={330} size={330} fill="#26CF7B" />
        <ScaleDotsG x={60} y={452} w={1380} r={11} chosen={8} off="#2B397F" on="#26CF7B" />
      </g>
    </Plate>
  );
}

// 5. Tall 1:2. Thick bands cut with straight ends, stacked like a canopy over the construction circles.
function Canopy() {
  const idp = 'gradients-k5';
  const radii = [[250, 340], [370, 460], [490, 580], [610, 700], [730, 820]];
  const cx = 300, cy = 1160;
  const bands = radii.map(([r0, r1], i) => {
    const half = Math.min(Math.asin(262 / r1) * (180 / Math.PI), 62 - i * 3);
    return { i, d: bandPath(cx, cy, r0, r1, r2(-half), r2(half)), fill: i % 2 ? '#26CF7B' : '#162557' };
  });
  return (
    <Plate n={5} ratio="0 0 600 1200" title="Thick cut bands stacked like a canopy on mint paper" exportName="gradients-key-canopy-bands"
      caption="Canopy bands" spec="1:2. Five thick bands with straight cut ends, construction circles beneath" className={s.k5}>
      <defs>
        <GradDef idp={idp} g={G.mint} />
        <GrainDef idp={idp} amt={0.06} />
        <DotsDef idp={idp} />
      </defs>
      <GradRect idp={idp} g={G.mint} w={600} h={1200} />
      <rect width="600" height="1200" fill={`url(#${idp}-dots)`} />
      <ConstructionG x={-60} y={520} size={720} rings={9} stroke="#4A5568" strokeWidth={0.3} />
      {bands.map((b) => <path key={b.i} d={b.d} fill={b.fill} />)}
      <DescriptorG x={40} y={1150} size={20} fill="#162557" />
    </Plate>
  );
}

// 6. Landscape 3:2. The whole mark over its own construction circles on the rising gradient.
function Construction() {
  const idp = 'gradients-k6';
  const close = LINES.close.replace('UpCanopy. ', '');
  return (
    <Plate n={6} ratio="0 0 1200 800" title="The mark over its construction circles on the rising gradient" exportName="gradients-key-construction"
      caption="Construction" spec="3:2. Whole mark in Green Ligth over the dashed construction circles" className={s.k6}>
      <defs>
        <GradDef idp={idp} g={G.rise} />
        <GrainDef idp={idp} amt={0.16} />
        <clipPath id={`${idp}-clip`}><rect width="1200" height="800" /></clipPath>
      </defs>
      <g clipPath={`url(#${idp}-clip)`}>
        <GradRect idp={idp} g={G.rise} w={1200} h={800} />
        <ConstructionG x={330} y={-30} size={840} rings={9} stroke={MINT} strokeWidth={0.35} opacity={0.55} />
        <MarkG x={510} y={150} size={480} fill={MINT} />
        <text x="60" y="720" fontSize="36" fontWeight="300" fill={MINT} lang="pt-BR">
          <tspan fontWeight="700">UpCanopy.</tspan> {close}
        </text>
      </g>
    </Plate>
  );
}

export default function KeyPlates() {
  return (
    <div className={s.keyGrid}>
      <Rising />
      <Poster />
      <Crop />
      <Banner />
      <Canopy />
      <Construction />
    </div>
  );
}
