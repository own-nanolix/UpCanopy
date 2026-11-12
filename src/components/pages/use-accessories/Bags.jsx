// Tote bags: the Green Park canvas tote of the case study (m22) and a navy one.
import { FrondG } from '@/components/art/KeyArt';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { StepG } from '@/components/art/Mockup';
import { C, Scene, Cast } from './parts';

const W = 300, H = 345;
const TOP = `M0 10Q${W * 0.22} 2 ${W * 0.4} 9Q${W / 2} 14 ${W * 0.6} 9Q${W * 0.78} 2 ${W} 10`;
const BODY = `${TOP}L${W - 5} ${H - 8}Q${W / 2} ${H + 6} 5 ${H - 8}Z`;
const TOP_STRAP = -330;

function Straps({ strap }) {
  const d = (a, t) => `M${a - 12} 16L${W / 2 + t - 11} ${TOP_STRAP}L${W / 2 + t + 11} ${TOP_STRAP}L${a + 12} 16Z`;
  return (
    <g>
      {[[W * 0.34, -9], [W * 0.66, 9]].map(([a, t], i) => (
        <g key={i}>
          <path d={d(a, t)} fill={strap} />
          <path d={d(a, t)} fill="#000" opacity={i ? 0.16 : 0.06} />
          <path d={`M${a - 7} 16L${W / 2 + t - 6} ${TOP_STRAP}M${a + 7} 16L${W / 2 + t + 6} ${TOP_STRAP}`} stroke="#fff" strokeOpacity="0.28" strokeWidth="1.4" strokeDasharray="4 4" fill="none" />
        </g>
      ))}
    </g>
  );
}

// One hanging tote. children: the artwork, drawn in the bag's own 300 x 345 space.
function Tote({ ids, id, canvas, strap, stitch, children }) {
  const clip = `${ids.p}-tote-clip-${id}`;
  return (
    <g>
      <clipPath id={clip}><path d={BODY} /></clipPath>
      <Cast d={BODY} depth={30} />
      <g filter={`url(#${ids.m}-fabric)`}>
        <Straps strap={strap} />
        <path d={BODY} fill={canvas} />
        <g clipPath={`url(#${clip})`}>{children}</g>
      </g>
      <g clipPath={`url(#${clip})`}>
        <path d={BODY} fill={`url(#${ids.m}-shade)`} />
        <path d={BODY} fill={`url(#${ids.m}-shade-v)`} opacity="0.7" />
        {[0.17, 0.4, 0.66, 0.86].map((x, i) => (
          <g key={i} fill="none">
            <path d={`M${W * x} 30Q${W * (x + 0.05)} ${H * 0.5} ${W * (x - 0.03)} ${H - 14}`} stroke="#000" strokeOpacity="0.05" strokeWidth="14" />
            <path d={`M${W * x - 7} 30Q${W * (x + 0.05) - 7} ${H * 0.5} ${W * (x - 0.03) - 7} ${H - 14}`} stroke="#fff" strokeOpacity="0.1" strokeWidth="2" />
          </g>
        ))}
        <path d={`M7 24L12 ${H - 14}M${W - 7} 24L${W - 12} ${H - 14}`} stroke={stitch} strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="4 3.5" fill="none" />
        <path d={`M6 40Q${W / 2} 47 ${W - 6} 40M6 45Q${W / 2} 52 ${W - 6} 45`} stroke={stitch} strokeOpacity="0.4" strokeWidth="1.3" strokeDasharray="4 3.5" fill="none" />
        {[W * 0.34, W * 0.66].map((a) => (
          <g key={a} fill="none" stroke={stitch} strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="3.5 3">
            <rect x={a - 14} y="16" width="28" height="30" />
            <path d={`M${a - 14} 16L${a + 14} 46M${a + 14} 16L${a - 14} 46`} />
          </g>
        ))}
        <path d={TOP} stroke="#000" strokeOpacity="0.28" strokeWidth="3.5" fill="none" />
        <path d={`M0 ${H - 8}Q${W / 2} ${H + 6} ${W} ${H - 8}`} stroke="#000" strokeOpacity="0.18" strokeWidth="6" fill="none" />
      </g>
    </g>
  );
}

const greenArt = (
  <g>
    <FrondG cx={W * 0.5} cy={H * 0.5} r={W * 0.56} a0={52} a1={262} count={48} len={W * 0.34} width={3.4} lean={180} tone="onGreen" opacity={0.92} />
    <MarkG x={W * 0.5 - 63} y={H * 0.5 - 60} size={126} fill={C.dark} opacity="0.86" />
  </g>
);
const navyArt = (
  <g>
    <MarkG x={W * 0.5 - 50} y={H * 0.26} size={100} fill={C.green} />
    <WordmarkG x={W / 2} y={H * 0.72} size={36} fill="#FFFFFF" anchor="middle" />
  </g>
);

const GREEN = { id: 'g', canvas: C.green, strap: '#0E5A43', stitch: C.dark, children: greenArt };
const NAVY = { id: 'n', canvas: C.navy, strap: C.deep, stitch: '#FFFFFF', children: navyArt };

export function ToteGreen() {
  return (
    <Scene k="tote-green" title="Green Park canvas tote bag with the mark and the frond" size="wide">
      {(ids) => (
        <>
          <StepG i={1} x={700} y={300}>
            <g transform="scale(1.05)"><Tote ids={ids} {...NAVY} id="n2" /></g>
          </StepG>
          <StepG i={0} x={150} y={190}>
            <g className="mock-lit"><g transform="scale(1.25)"><Tote ids={ids} {...GREEN} /></g></g>
          </StepG>
        </>
      )}
    </Scene>
  );
}

export function ToteNavy() {
  return (
    <Scene k="tote-navy" title="Navy canvas tote bag with the Green Park mark and the white word-mark" size="narrow">
      {(ids) => (
        <>
          <StepG i={1} x={-195} y={150}>
            {/* a second navy tote: the green one is not repeated at the edge next to its own plate */}
            <g transform="scale(1)"><Tote ids={ids} {...NAVY} id="n3" /></g>
          </StepG>
          <StepG i={0} x={190} y={250}>
            <g transform="scale(1.2)"><Tote ids={ids} {...NAVY} /></g>
          </StepG>
        </>
      )}
    </Scene>
  );
}
