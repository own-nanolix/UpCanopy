// Three posters, each 1080 x 1350. <g> functions, reused by the cascade mockup.
import Art from '@/components/art/Art';
import { MarkCropG, LockupG } from '@/components/art/Mark';
import { FrondG, BrandDefs } from '@/components/art/KeyArt';
import { LINES, CONTACT } from '@/lib/brand';
import { K, Rows, Contacts, Mk, Field, Piece } from './shared';

// 1. The poster on the timber wall: dark green, line top right, pale frond down the left, mark lower left.
export function PosterBridgeG({ idp }) {
  return (
    <g>
      <BrandDefs idp={idp} />
      <Field idp={idp} w={1080} h={1350} fill={K.dark} />
      <FrondG cx={-1790} cy={900} r={1800} a0={-13} a1={13} count={38} len={600} width={14} lean={14} tone="onDark" opacity={0.95} fan />
      <g className="slide-up" style={{ '--i': 6 }}>
        <Rows rows={LINES.bridge.rows4} x={1010} y={176} size={66} anchor="end" fill={K.mint} strong={LINES.bridge.strong} strongFill={K.green} />
      </g>
      <Mk x={100} y={1110} size={132} fill={K.green} />
      <Contacts x={1010} y={1218} size={30} fill={K.pale} />
    </g>
  );
}

// 2. The citylight: dark green to navy, mark top left, the frond behind the centre, the line in five rows.
export function PosterCitylightG({ idp }) {
  return (
    <g>
      <BrandDefs idp={idp} />
      <rect width="1080" height="1350" fill={`url(#${idp}-rise-dark)`} filter={`url(#${idp}-grain)`} />
      <radialGradient id={`${idp}-glow`} cx="0.5" cy="0.36" r="0.55">
        <stop offset="0" stopColor="#1F8F73" stopOpacity="0.55" />
        <stop offset="1" stopColor="#1F8F73" stopOpacity="0" />
      </radialGradient>
      <rect width="1080" height="1350" fill={`url(#${idp}-glow)`} />
      <FrondG cx={560} cy={640} r={200} a0={-185} a1={5} count={44} len={400} width={12} lean={0} tone="onNavy" opacity={0.7} fan />
      <Mk x={84} y={80} size={112} fill={K.green} />
      <g className="slide-up" style={{ '--i': 6 }}>
        <Rows rows={LINES.bridge.rows} x={84} y={900} size={68} fill={K.white} strong={LINES.bridge.strong} strongFill={K.green} />
      </g>
      <text x="1000" y="1262" fontSize="30" fontWeight="400" textAnchor="end" fill={K.green}>{CONTACT.web}</text>
    </g>
  );
}

// 3. The mark crop on green over a navy lower field with the CEO line.
export function PosterCeoG({ idp }) {
  return (
    <g>
      <BrandDefs idp={idp} />
      <Field idp={idp} w={1080} h={1350} fill={K.green} />
      <rect width="1080" height="780" fill={`url(#${idp}-green)`} />
      <g className="fade-in">
        <MarkCropG idp={`${idp}-c`} x={0} y={0} w={1080} h={780} zoom={1.5} dx={-0.28} dy={-0.14} fill={K.navy} />
      </g>
      <rect y="780" width="1080" height="570" fill={K.navy} filter={`url(#${idp}-grain)`} />
      <g className="slide-up" style={{ '--i': 5 }}>
        <Rows rows={LINES.ceo.rows} x={80} y={908} size={66} fill={K.white} strong={LINES.ceo.strong} strongFill={K.green} />
      </g>
      <LockupG x={80} y={1232} scale={0.62} fill={K.white} />
      <Contacts x={1000} y={1236} size={26} fill={K.muted} />
    </g>
  );
}

export const POSTERS = [
  { id: 'bridge', G: PosterBridgeG, title: 'Dark green poster with the bridge line and the pale frond', caption: 'Frond, dark green' },
  { id: 'citylight', G: PosterCitylightG, title: 'Dark green to navy poster with the frond and the bridge line in five rows', caption: 'Citylight' },
  { id: 'ceo', G: PosterCeoG, title: 'Poster with the mark crop on green and the CEO line on navy', caption: 'Mark crop' },
];

export default function Posters() {
  return POSTERS.map(({ id, G, title, caption }, n) => (
    <Piece key={id} kind="Poster" caption={caption} step={n}>
      <Art viewBox="0 0 1080 1350" title={title} exportName={`campaign-poster-${id}`}>
        <G idp={`campaign-poster-${id}`} />
      </Art>
    </Piece>
  ));
}
