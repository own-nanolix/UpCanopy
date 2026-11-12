// The profile grid: nine square tiles (3 x 3) in one SVG, reusing the posts and cropping a poster and a story.
import Art from '@/components/art/Art';
import { K, Piece } from './shared';
import { PostNavyG, PostMintG, PostControlG, PostVerticalG, PostStackedG, PostBrochureG, PostScalesG } from './Posts';
import { PosterBridgeG } from './Posters';
import { StoryEnoughG } from './Stories';

const T = 360, GAP = 4;

// Each tile: [component, kind]. A square post is scaled to fit; a poster is fitted inside; a story is cropped.
const TILES = [
  { G: PostNavyG }, { G: PostMintG }, { G: PostControlG },
  { G: PostVerticalG }, { G: PostStackedG }, { G: PostBrochureG },
  { G: PostScalesG }, { G: PosterBridgeG, fit: 'poster', bg: K.dark }, { G: StoryEnoughG, fit: 'story', bg: K.dark },
];

function Tile({ n, G, fit, bg }) {
  const x = (n % 3) * (T + GAP), y = Math.floor(n / 3) * (T + GAP);
  const idp = `campaign-grid-${n + 1}`;
  let inner;
  if (fit === 'poster') inner = <g transform="translate(108 0) scale(0.8)"><G idp={idp} /></g>;
  else if (fit === 'story') inner = <g transform="translate(0 -420)"><G idp={idp} /></g>;
  else inner = <G idp={idp} />;
  return (
    <g transform={`translate(${x} ${y})`}>
      <clipPath id={`${idp}-tile`}><rect width={T * 3} height={T * 3} /></clipPath>
      <g transform={`scale(${T / (T * 3)})`}>
        {bg && <rect width="1080" height="1080" fill={bg} />}
        <g clipPath={`url(#${idp}-tile)`}>{inner}</g>
      </g>
    </g>
  );
}

export function GridArt() {
  const S = T * 3 + GAP * 2;
  return (
    <Art viewBox={`0 0 ${S} ${S}`} title="Profile grid of nine square tiles" exportName="campaign-grid">
      <rect width={S} height={S} fill={K.deep} />
      {TILES.map((t, n) => <Tile key={n} n={n} {...t} />)}
    </Art>
  );
}

// Profile header (HTML) above the grid, inside a phone-width column.
export default function Grid() {
  return (
    <Piece solo kind="Profile grid" caption="3 x 3">
      <GridArt />
    </Piece>
  );
}
