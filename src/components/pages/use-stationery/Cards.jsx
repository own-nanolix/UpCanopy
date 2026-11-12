// Business cards (reference m23): two thick stacks with painted Green Park edges on the edge of a navy table,
// stepping right. Navy front with the mark; Green Park back with the printed details. One SVG, one projection.
import Art from '@/components/art/Art';
import { SweepG, MaterialDefs, ShadowG, StepG } from '@/components/art/Mockup';
import { BrandDefs } from '@/components/art/KeyArt';
import { ID, C, IsoG, Block, CastBlock } from './parts';
import { CardFrontMarkG, CardBackG } from './Artwork';

const P = `${ID}-cd`;
const B = `${P}b`;
const EDGE = (y0, x) => y0 - 0.383 * (x + 50); // the table edge runs up and to the right

function Stack({ i, x, y, w = 330, d = 189, h = 88, children, ...rest }) {
  return (
    <StepG i={i}>
      <CastBlock x={x} y={y} w={w} d={d} len={h * 1.25} opacity={0.34} />
      <Block x={x} y={y} w={w} d={d} h={h} leftFill="#1CAD68" bottomFill="#22C277" lines={34} lineColor="rgba(5,46,37,0.34)" {...rest}>
        {children}
        <rect width={w} height={d} fill={`url(#${P}-top-shade)`} />
      </Block>
    </StepG>
  );
}

export default function Cards() {
  const e0 = 870;
  return (
    <Art viewBox="0 0 1200 900" title="Two stacks of business cards with Green Park edges on a navy table" exportName={`${ID}-cards-stacks`}>
      <MaterialDefs idp={P} />
      <BrandDefs idp={B} />
      <defs>
        <linearGradient id={`${P}-table`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#0B1342" />
          <stop offset="1" stopColor="#1B2A6E" />
        </linearGradient>
        <linearGradient id={`${P}-edge`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#33448F" />
          <stop offset="0.25" stopColor="#1A2766" />
          <stop offset="1" stopColor="#0B1340" />
        </linearGradient>
        <linearGradient id={`${P}-top-shade`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#000000" stopOpacity="0.04" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.12" />
        </linearGradient>
        <clipPath id={`${P}-tabletop`}>
          <path d={`M-60 ${EDGE(e0, -60)}L1260 ${EDGE(e0, 1260)}V-20H-60Z`} />
        </clipPath>
      </defs>
      <SweepG idp={P} w={1200} h={900} horizon={0.75} />
      <ShadowG idp={`${P}-leg`} cx={600} cy={880} rx={120} opacity={0.3} />
      <g className="mock-step" style={{ '--i': 0 }}>
        <rect x="566" y="640" width="64" height="270" fill={C.navy} />
        <rect x="566" y="640" width="64" height="270" fill={`url(#${P}-shade)`} />
        <ellipse cx="598" cy="640" rx="32" ry="9" fill="#2A3A82" />
        <path d={`M-60 ${EDGE(e0, -60)}L1260 ${EDGE(e0, 1260)}V${EDGE(e0, 1260) + 42}L-60 ${EDGE(e0, -60) + 42}Z`} fill={`url(#${P}-edge)`} />
        <path d={`M-60 ${EDGE(e0, -60)}L1260 ${EDGE(e0, 1260)}V-20H-60Z`} fill={`url(#${P}-table)`} filter={`url(#${B}-grain)`} />
        <path d={`M-60 ${EDGE(e0, -60)}L1260 ${EDGE(e0, 1260)}`} stroke="#6674BC" strokeWidth="1.6" opacity="0.7" />
      </g>
      <g clipPath={`url(#${P}-tabletop)`}>
        <IsoG ox={150} oy={530}>
          <Stack i={1} x={0} y={0}><g transform="scale(0.943)"><CardFrontMarkG /></g></Stack>
          <Stack i={2} x={410} y={-95}><g transform="scale(0.943)"><CardBackG /></g></Stack>
        </IsoG>
      </g>
    </Art>
  );
}
