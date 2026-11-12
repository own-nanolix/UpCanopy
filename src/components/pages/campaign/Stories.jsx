// Four stories, each 1080 x 1920. Content stays inside the safe zone (y 250 to 1670).
import Art from '@/components/art/Art';
import { WordmarkG } from '@/components/art/Mark';
import { FrondG, BrandDefs, ConstructionG, ScaleDotsG } from '@/components/art/KeyArt';
import { LINES, PILLARS, TAGLINE, CONTACT } from '@/lib/brand';
import { K, Rows, Wide, Mk, Field, Piece } from './shared';

// 1. The bridge line over a big frond on navy.
export function StoryBridgeG({ idp }) {
  return (
    <g>
      <BrandDefs idp={idp} />
      <Field idp={idp} w={1080} h={1920} fill={K.navy} />
      <FrondG cx={1180} cy={760} r={760} a0={180} a1={262} count={40} len={900} width={16} lean={-40} tone="onNavy" opacity={0.8} fan />
      <Mk x={860} y={1530} size={130} fill={K.green} />
      <g className="slide-up" style={{ '--i': 6 }}>
        <Rows rows={LINES.bridge.rows} x={84} y={1180} size={84} fill={K.white} strong={LINES.bridge.strong} strongFill={K.green} />
      </g>
      <text x="84" y="1660" fontSize="34" fontWeight="400" fill={K.green}>{CONTACT.web}</text>
    </g>
  );
}

// 2. "chega." large on dark green over the construction circles.
export function StoryEnoughG({ idp }) {
  return (
    <g>
      <BrandDefs idp={idp} />
      <Field idp={idp} w={1080} h={1920} fill={K.dark} />
      <ConstructionG x={-560} y={380} size={1700} rings={9} stroke={K.frond} strokeWidth={0.22} opacity={0.45} draw />
      <g className="slide-up">
        <Rows rows={['Nós existimos', 'para dizer:']} x={84} y={760} size={86} fill={K.mint} />
      </g>
      <g className="slide-up" style={{ '--i': 4 }}>
        <text x="74" y="1090" fontSize="290" fontWeight="700" fill={K.green} letterSpacing="-10">chega.</text>
      </g>
      <Mk x={84} y={1500} size={110} fill={K.green} />
      <WordmarkG x={228} y={1585} size={58} fill={K.white} />
    </g>
  );
}

// 3. The CEO line on the rising gradient with a ten-dot scale above it.
export function StoryCeoG({ idp }) {
  return (
    <g>
      <BrandDefs idp={idp} />
      <rect width="1080" height="1920" fill={`url(#${idp}-rise)`} filter={`url(#${idp}-grain)`} />
      <ScaleDotsG x={102} y={420} w={876} r={20} chosen={8} off={K.navy} on={K.white} lock />
      <Wide x={84} y={350} size={24} fill={K.white} spacing={1.6}>MODO SOBREVIVÊNCIA</Wide>
      <Wide x={996} y={350} size={24} fill={K.white} spacing={1.6} anchor="end">MODO EXPANSÃO</Wide>
      <g className="slide-up" style={{ '--i': 5 }}>
        <Rows rows={LINES.ceo.rows} x={84} y={1120} size={92} fill={K.white} strong={LINES.ceo.strong} strongFill={K.green} />
      </g>
      <Mk x={84} y={1560} size={96} fill={K.green} />
    </g>
  );
}

// 4. The three pillars on mint, each with a thick rule that grows.
export function StoryPillarsG({ idp }) {
  return (
    <g>
      <BrandDefs idp={idp} />
      <rect width="1080" height="1920" fill={K.mint} filter={`url(#${idp}-grain)`} />
      <rect width="1080" height="1920" fill={`url(#${idp}-dots)`} />
      <Mk x={846} y={264} size={140} fill={K.navy} />
      {PILLARS.map((p, i) => (
        <g key={p}>
          <rect className="grow-x" style={{ '--i': i * 6 }} x="84" y={640 + i * 300} width="912" height="8" fill={K.navy} />
          <g className="slide-up" style={{ '--i': i * 6 + 3 }}>
            <text x="84" y={800 + i * 300} fontSize="150" fontWeight={i === 2 ? 700 : 300} fill={i === 2 ? K.ink : K.navy} letterSpacing="-3">{p}</text>
          </g>
        </g>
      ))}
      <text x="84" y="1620" fontSize="38" fontWeight="300" fill={K.navy}>{TAGLINE}</text>
    </g>
  );
}

export const STORIES = [
  { id: 'bridge', G: StoryBridgeG, title: 'Navy story with the frond and the bridge line', caption: 'Bridge' },
  { id: 'enough', G: StoryEnoughG, title: 'Dark green story with the word chega over construction circles', caption: 'Chega' },
  { id: 'ceo', G: StoryCeoG, title: 'Gradient story with a ten-dot scale and the CEO line', caption: 'CEO' },
  { id: 'pillars', G: StoryPillarsG, title: 'Mint story with the three pillars', caption: 'Pillars' },
];

export default function Stories() {
  return STORIES.map(({ id, G, title, caption }, n) => (
    <Piece key={id} kind="Story" caption={caption} step={n}>
      <Art viewBox="0 0 1080 1920" title={title} exportName={`campaign-story-${id}`}>
        <G idp={`campaign-story-${id}`} />
      </Art>
    </Piece>
  ));
}
