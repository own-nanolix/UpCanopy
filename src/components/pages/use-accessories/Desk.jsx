// Desk mat and mouse pad: isometric rubber-backed fabric, the pad stepping onto the mat.
import { FrondG } from '@/components/art/KeyArt';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { StepG } from '@/components/art/Mockup';
import { r2 } from '@/lib/charts';
import { C, Scene, rectD } from './parts';

const MW = 900, MV = 400, PW = 330, PH = 270;

// A plan drawn flat (u to the lower right, v to the lower left) and viewed isometrically with scale s.
const isoT = (ox, oy, s) => `translate(${r2(ox)} ${r2(oy)}) matrix(${r2(0.866 * s)} ${r2(0.5 * s)} ${r2(-0.866 * s)} ${r2(0.5 * s)} 0 0)`;

function MatPad({ ids, ox, oy, s = 1, padU, padV }) {
  const { p, m, b } = ids;
  const mat = rectD(0, 0, MW, MV), pad = rectD(padU, padV, PW, PH);
  return (
    <g>
      <defs>
        <linearGradient id={`${p}-lit`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.28" /><stop offset="0.5" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity="0.22" />
        </linearGradient>
        <clipPath id={`${p}-matclip`}><path d={mat} /></clipPath>
        <clipPath id={`${p}-padclip`}><path d={pad} /></clipPath>
      </defs>
      <g transform={isoT(ox + 14 * s, oy + 16 * s, s)}><path d={mat} fill={C.dark} opacity="0.22" /></g>
      <g transform={isoT(ox, oy + 8 * s, s)}><path d={mat} fill={`url(#${m}-rubber)`} /></g>
      <g transform={isoT(ox, oy, s)}>
        <path d={mat} fill={`url(#${b}-rise)`} filter={`url(#${b}-grain)`} />
        <g clipPath={`url(#${p}-matclip)`}>
          <FrondG cx={MW * 0.74} cy={MV * 1.25} r={MV * 0.95} a0={196} a1={340} count={42} len={MV * 0.8} width={6.5} lean={-4} tone="onDark" opacity="0.85" />
          <WordmarkG x={-40} y={MV * 0.93} size={300} fill="#FFFFFF" opacity="0.15" />
          <MarkG x={34} y={MV - 92} size={58} fill={C.green} />
          <path d={rectD(10, 10, MW - 20, MV - 20)} fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="6 5" />
          <path d={mat} fill={`url(#${p}-lit)`} />
        </g>
        <path d={rectD(0, 0, MW, 3)} fill="#fff" opacity="0.5" />
        {/* the pad steps onto the mat */}
        <g transform={`translate(${r2(9 * 1.14)} ${r2(9 * 0.4)})`}><path d={pad} fill={C.dark} opacity="0.34" /></g>
        <path d={pad} transform="translate(4 4)" fill={C.dark} />
        <path d={pad} fill={C.green} filter={`url(#${b}-grain)`} />
        <g clipPath={`url(#${p}-padclip)`}>
          <FrondG cx={padU + PW * 0.2} cy={padV + PH * 1.15} r={PH * 0.7} a0={220} a1={340} count={26} len={PH * 0.55} width={5} lean={-4} tone="onGreen" />
          <MarkG x={padU + PW * 0.5 - 46} y={padV + PH * 0.5 - 46} size={92} fill={C.navy} />
          <path d={rectD(padU + 9, padV + 9, PW - 18, PH - 18)} fill="none" stroke={C.dark} strokeOpacity="0.5" strokeWidth="2" strokeDasharray="5 4" />
          <path d={pad} fill={`url(#${p}-lit)`} />
        </g>
        <path d={rectD(padU, padV, PW, 2)} fill="#fff" opacity="0.55" />
      </g>
    </g>
  );
}

export function DeskMat() {
  return (
    <Scene k="desk-mat" title="Desk mat in the navy-to-green gradient with the frond and the giant word-mark, with a mouse pad on it" size="wide">
      {(ids) => (
        <StepG i={0} x={0} y={0}>
          <MatPad ids={ids} ox={400} oy={-80} padU={500} padV={110} />
        </StepG>
      )}
    </Scene>
  );
}

export function MousePad() {
  return (
    <Scene k="mouse-pad" title="Green Park mouse pad with the navy mark, stepping onto the desk mat" size="narrow">
      {(ids) => (
        <StepG i={0} x={0} y={0}>
          <MatPad ids={ids} ox={110} oy={-10} s={0.92} padU={330} padV={90} />
        </StepG>
      )}
    </Scene>
  );
}
