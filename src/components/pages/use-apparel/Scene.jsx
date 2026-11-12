import { CastG, StepG } from '@/components/art/Mockup';
import { Stage } from './parts';
import { TeeG, TEE_COLOURWAYS } from './Shirts';
import { WindbreakerG, PufferG, HoodieG, WB_COLOURWAYS, PF_COLOURWAYS, HD_COLOURWAYS } from './Jackets';

const IDP = 'use-apparel-collection';
const railY = (x) => Math.round(470 - 0.2945 * (x + 30));
const RAIL = 'M-30 470L1430 40L1430 52L-30 482Z';

// Each item: where it hangs on the rail, its scale, the y of its shoulder line and the half-width of its hanger.
const ITEMS = [
  { x: 40, s: 0.9, sh: 42, hw: 96, G: TeeG, props: { cw: TEE_COLOURWAYS[2], side: 'front' } },
  { x: 360, s: 0.56, sh: 150, hw: 112, G: WindbreakerG, props: { cw: WB_COLOURWAYS[1] } },
  { x: 700, s: 0.56, sh: 134, hw: 112, G: PufferG, props: { cw: PF_COLOURWAYS[0], lit: true } },
  { x: 1040, s: 0.56, sh: 142, hw: 112, G: HoodieG, props: { cw: HD_COLOURWAYS[0] } },
  { x: 1330, s: 0.9, sh: 42, hw: 96, G: TeeG, props: { cw: TEE_COLOURWAYS[0], side: 'back' } },
];

function Hanger({ x, y, hw }) {
  return (
    <g>
      <g transform="translate(2.5 3)" opacity="0.2" stroke="#052E25" fill="none" strokeWidth="3">
        <path d={`M${x - hw} ${y + 64}L${x} ${y + 24}L${x + hw} ${y + 64}M${x} ${y - 6}L${x} ${y + 24}`} />
      </g>
      <path d={`M${x - hw} ${y + 64}L${x} ${y + 24}L${x + hw} ${y + 64}M${x} ${y - 8}L${x} ${y + 24}`} fill="none" stroke="#3A3C3A" strokeWidth="3" />
      <path d={`M${x - hw} ${y + 62}L${x} ${y + 22}`} fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="1" />
    </g>
  );
}

export default function Scene() {
  return (
    <Stage idp={IDP} w={1400} h={800} title="Collection on a rail" exportName="use-apparel-collection" horizon={0.74}>
      <CastG d={RAIL} depth={26} opacity={0.2} />
      <path d={RAIL} fill={`url(#${IDP}-metal)`} />
      <path d="M-30 470L1430 40" stroke="#fff" strokeOpacity="0.7" strokeWidth="1.5" />
      {[210, 880].map((x) => (
        <rect key={x} x={x - 8} y={railY(x) - 12} width="16" height="40" fill={`url(#${IDP}-metal)`} stroke="#000" strokeOpacity="0.25" />
      ))}
      {ITEMS.map(({ x, s, sh, hw, G, props }, i) => {
        const y = railY(x);
        return (
          <StepG key={x} i={i}>
            <Hanger x={x} y={y} hw={hw} />
            <g transform={`translate(${x} ${y + 62}) scale(${s}) translate(0 ${-sh})`}>
              <G idp={IDP} k={`i${i}`} {...props} />
            </g>
          </StepG>
        );
      })}
    </Stage>
  );
}
