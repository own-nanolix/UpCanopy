// Seven social posts, each 1080 x 1080. Every post is a <g> function (so the profile grid and the cascade can
// reuse it) and a <Art> wrapper below.
import Art from '@/components/art/Art';
import { WordmarkG, WordmarkVerticalG, LockupStackG } from '@/components/art/Mark';
import { FrondG, BrandDefs, ConstructionG, ScaleDotsG } from '@/components/art/KeyArt';
import { LINES, SCALES, CONTACT } from '@/lib/brand';
import { K, Rows, Wide, Contacts, Mk, Field, Piece } from './shared';

// 1. Navy with the mark top left and the word-mark bottom right (window panel 1, portrait left out).
export function PostNavyG({ idp }) {
  return (
    <g>
      <BrandDefs idp={idp} />
      <Field idp={idp} w={1080} h={1080} fill={K.navy} />
      <FrondG cx={-1500} cy={760} r={1500} a0={-12} a1={14} count={34} len={560} width={12} lean={14} tone="onNavy" opacity={0.6} fan />
      {/* measured from m15, panel 1 */}
      <Mk x={83} y={50} size={84} fill={K.green} />
      <g className="fade-in" style={{ '--i': 14 }}>
        <WordmarkG x={1036} y={1046} size={41} fill={K.white} anchor="end" />
      </g>
    </g>
  );
}

// 2. Mint to green with the dot texture, the line top right, contacts bottom left (window panel 2).
export function PostMintG({ idp }) {
  return (
    <g>
      <BrandDefs idp={idp} />
      <defs>
        <linearGradient id={`${idp}-mg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5BD897" />
          <stop offset="0.55" stopColor="#A5EBC4" />
          <stop offset="1" stopColor="#E3FAEA" />
        </linearGradient>
      </defs>
      <rect width="1080" height="1080" fill={`url(#${idp}-mg)`} filter={`url(#${idp}-grain)`} />
      <rect width="1080" height="1080" fill={`url(#${idp}-dots)`} />
      {/* measured from m15, panel 2 */}
      <Mk x={46} y={45} size={108} fill={K.navy} />
      <g className="slide-up" style={{ '--i': 3 }}>
        <Rows rows={LINES.bridge.rows4} x={1039} y={92} size={61} lh={1.07} anchor="end" fill={K.navy} strong={LINES.bridge.strong} strongFill={K.navy} />
      </g>
      <text x="46" y="1035" fontSize="30" fontWeight="400" fill={K.navy}>{CONTACT.footer}</text>
      <g className="fade-in" style={{ '--i': 10 }}>
        <WordmarkG x={1039} y={1046} size={41} fill={K.white} anchor="end" opacity="0.7" />
      </g>
    </g>
  );
}

// 3. Navy with the stacked lockup (window panel 3).
export function PostStackedG({ idp }) {
  return (
    <g>
      <BrandDefs idp={idp} />
      <Field idp={idp} w={1080} h={1080} fill={K.navy} />
      <circle cx="540" cy="520" r="360" fill="none" stroke={K.white} strokeOpacity="0.07" strokeWidth="2" strokeDasharray="6 8" />
      <circle cx="540" cy="520" r="250" fill="none" stroke={K.white} strokeOpacity="0.07" strokeWidth="2" strokeDasharray="6 8" />
      <g className="slide-up">
        {/* m15, panel 3: the lockup centred, mark top at 41 % of the height */}
        <LockupStackG x={319} y={441} scale={0.92} fill={K.white} />
      </g>
    </g>
  );
}

// 4. The brochure cover: green upper panel with the line and the frond, mint lower panel with the credibility line.
export function PostBrochureG({ idp }) {
  return (
    <g>
      <BrandDefs idp={idp} />
      <Field idp={idp} w={1080} h={1080} fill={K.green} />
      <FrondG cx={1160} cy={560} r={400} a0={150} a1={242} count={36} len={420} width={10} lean={-52} tone="onGreen" opacity={0.9} fan />
      <g className="slide-up" style={{ '--i': 2 }}>
        {/* m16: the line is set in white on the green panel */}
        <Rows rows={LINES.bridge.rows4} x={72} y={118} size={50} fill={K.white} strong={LINES.bridge.strong} strongFill={K.white} />
      </g>
      <rect y="470" width="1080" height="610" fill={`url(#${idp}-paper)`} filter={`url(#${idp}-grain)`} />
      <Mk x={900} y={500} size={110} fill={K.navy} />
      <g className="slide-up" style={{ '--i': 5 }}>
        <Rows rows={LINES.credibility.rows} x={72} y={668} size={42} fill={K.navy} strong={LINES.credibility.strong} strongFill={K.navy} />
      </g>
      <Contacts x={1008} y={878} size={28} fill={K.navy} />
      <g className="fade-in" style={{ '--i': 9 }}>
        <WordmarkG x={52} y={1072} size={178} fill={K.white} opacity="0.75" />
      </g>
    </g>
  );
}

// 5. The giant word-mark set vertically and cropped, with the tagline.
export function PostVerticalG({ idp }) {
  return (
    <g>
      <BrandDefs idp={idp} />
      <Field idp={idp} w={1080} h={1080} fill={K.green} />
      <g className="fade-in">
        <WordmarkVerticalG x={-30} y={1200} size={430} fill={K.navy} />
      </g>
      <Mk x={884} y={64} size={124} fill={K.navy} />
      <g className="slide-up" style={{ '--i': 4 }}>
        <Rows rows={['Organização', 'que gera', 'crescimento']} x={1008} y={800} size={60} anchor="end" fill={K.navy} />
      </g>
      <text x="1008" y="1010" fontSize="26" fontWeight="400" textAnchor="end" fill={K.navy}>{CONTACT.web}</text>
    </g>
  );
}

// 6. The five ten-dot scales on navy, one green dot each, under one line.
export function PostScalesG({ idp }) {
  return (
    <g>
      <BrandDefs idp={idp} />
      <Field idp={idp} w={1080} h={1080} fill={K.navy} />
      <g className="slide-up">
        <Rows rows={[LINES.level]} x={72} y={170} size={72} fill={K.white} strong="nível." strongFill={K.green} />
      </g>
      {SCALES.map((sc, i) => (
        <g key={sc.left} transform={`translate(72 ${330 + i * 132})`}>
          <ScaleDotsG x={18} y={44} w={906} r={18} chosen={sc.chosen} off="#4A5896" lock />
          <Wide x={0} y={0} size={17} fill={K.muted} spacing={1.4}>{sc.left}</Wide>
          <Wide x={936} y={0} size={17} fill={K.muted} spacing={1.4} anchor="end">{sc.right}</Wide>
        </g>
      ))}
      <Mk x={72} y={968} size={64} fill={K.green} />
    </g>
  );
}

// 7. The control line over the construction circles on dark green.
export function PostControlG({ idp }) {
  return (
    <g>
      <BrandDefs idp={idp} />
      <Field idp={idp} w={1080} h={1080} fill={K.dark} />
      <ConstructionG x={-160} y={-150} size={1300} rings={9} stroke={K.frond} strokeWidth={0.24} opacity={0.2} draw />
      <Mk x={444} y={170} size={192} fill={K.green} />
      <g className="slide-up" style={{ '--i': 5 }}>
        <Rows rows={['Deixe o caos para trás.', 'Assuma o controle.']} x={540} y={720} size={68} anchor="middle" fill={K.mint} strong="Assuma o controle." strongFill={K.green} />
      </g>
      <Wide x={540} y={1010} size={22} fill={K.frond} anchor="middle" spacing={2}>UPCANOPY</Wide>
    </g>
  );
}

export const POSTS = [
  { id: 'navy', G: PostNavyG, title: 'Navy post with the mark and the word-mark', caption: 'Navy' },
  { id: 'mint', G: PostMintG, title: 'Mint-to-green post with the bridge line and dot texture', caption: 'Mint to green' },
  { id: 'stacked', G: PostStackedG, title: 'Navy post with the stacked lockup', caption: 'Stacked lockup' },
  { id: 'brochure', G: PostBrochureG, title: 'Brochure-cover post, green and mint panels, credibility line', caption: 'Brochure cover' },
  { id: 'vertical', G: PostVerticalG, title: 'Green post with the giant vertical word-mark and the tagline', caption: 'Vertical word-mark' },
  { id: 'scales', G: PostScalesG, title: 'Navy post with the five ten-dot scales', caption: 'Ten-dot scales' },
  { id: 'control', G: PostControlG, title: 'Dark green post with the control line over construction circles', caption: 'Construction circles' },
];

export default function Posts() {
  return POSTS.map(({ id, G, title, caption }, n) => (
    <Piece key={id} solo kind="Post" caption={caption} shift={n % 2 === 1}>
      <Art viewBox="0 0 1080 1080" title={title} exportName={`campaign-post-${id}`}>
        <G idp={`campaign-post-${id}`} />
      </Art>
    </Piece>
  ));
}
