// The tri-fold brochure open on a sage folder (references m08, m16, m19): inside left a navy-to-green panel with
// the mark and the CEO line, inside right the frond on the gradient (the portrait is not reproduced); clipped
// copies with the mark-crop cover step up and to the right behind it. One SVG, one projection.
import Art from '@/components/art/Art';
import { SweepG, MaterialDefs, StepG } from '@/components/art/Mockup';
import { BrandDefs, FrondG } from '@/components/art/KeyArt';
import { MarkG } from '@/components/art/Mark';
import { LINES } from '@/lib/brand';
import { ID, C, IsoG, Block, CastBlock, Rich, BinderClip } from './parts';
import { ReportCoverG } from './Report';

const P = `${ID}-br`;
const B = `${P}b`;
const GRAIN = `url(#${B}-grain)`;
const PAPER = `url(#${P}-paper)`;

function Folder() {
  const d = 520;
  return (
    <StepG i={0}>
      <CastBlock x={0} y={0} w={842} d={d} len={16} />
      <rect x="378" y="0" width="16" height={d} fill="#6B7B68" />
      <Block x={0} y={0} w={380} d={d} h={8} leftFill="#9DAE9A" bottomFill="#A9B9A6" lines={2} lineColor="rgba(5,46,37,0.2)">
        <rect width="380" height={d} fill="#D3DDD0" filter={PAPER} />
        <rect width="380" height={d} fill={`url(#${P}-hinge-l)`} />
      </Block>
      <Block x={392} y={0} w={450} d={d} h={8} leftFill="#9DAE9A" bottomFill="#A9B9A6" lines={2} lineColor="rgba(5,46,37,0.2)">
        <rect width="450" height={d} fill="#DCE5D9" filter={PAPER} />
        <rect width="450" height={d} fill={`url(#${P}-hinge-r)`} />
      </Block>
    </StepG>
  );
}

function Copy({ k }) {
  const x = 450 + k * 70, y = -120 - k * 30, w = 220, d = 340;
  return (
    <StepG i={k + 1}>
      <CastBlock x={x} y={y} w={w} d={d} len={12} />
      <Block x={x} y={y} w={w} d={d} h={7} leftFill="#7CCFA2" bottomFill="#9BDDB9" lines={3} lineColor="rgba(5,46,37,0.22)">
        <ReportCoverG idp={B} clip={`${P}-copy-${k}`} w={w} d={d} />
        <path d={`M0 ${d}V0H${w}`} fill="none" stroke="#FFFFFF" strokeWidth="1.4" opacity="0.5" />
      </Block>
      <BinderClip idp={P} x={x + 2} y={y + 90} scale={0.9} />
      <BinderClip idp={P} x={x + 2} y={y + 250} scale={0.9} />
    </StepG>
  );
}

function Spread() {
  const x = 130, y = 44, d = 410, a = 255;
  return (
    <StepG i={4}>
      <CastBlock x={x} y={y} w={a * 2} d={d} len={12} />
      <Block x={x} y={y} w={a * 2} d={d} h={5} leftFill="#13204F" bottomFill="#0F1B45" lines={2} lineColor="rgba(255,255,255,0.16)">
        <g className="mock-lit">
          <rect width={a} height={d} fill={`url(#${B}-rise)`} filter={GRAIN} />
          <rect x={a} width={a} height={d} fill={`url(#${B}-rise)`} filter={GRAIN} />
          <g transform={`translate(${a} 0)`}>
            <clipPath id={`${P}-panel-b`}><rect width={a} height={d} /></clipPath>
            <g clipPath={`url(#${P}-panel-b)`}><FrondG cx={128} cy={290} r={96} a0={192} a1={348} count={36} len={104} width={7} lean={0} tone="onNavy" /></g>
          </g>
          <rect width={a} height={d} fill={`url(#${P}-fold-l)`} />
          <rect x={a} width={a} height={d} fill={`url(#${P}-fold-r)`} />
          <path d={`M${a} 0V${d}`} stroke="#000000" strokeWidth="1" opacity="0.35" />
          <MarkG x={24} y={22} size={34} fill={C.green} />
          <Rich rows={LINES.ceo.rows} strong={LINES.ceo.strong} x={26} y={d - 86} size={16} lh={1.25} fill="#E8EEF4" strongFill={C.white} />
        </g>
      </Block>
    </StepG>
  );
}

export default function Brochure() {
  return (
    <Art viewBox="0 0 1200 900" title="Open tri-fold brochure on a folder, with clipped copies stepping up and to the right behind it" exportName={`${ID}-brochure-folder`}>
      <MaterialDefs idp={P} />
      <BrandDefs idp={B} />
      <defs>
        <linearGradient id={`${P}-hinge-l`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.18" />
          <stop offset="0.8" stopColor="#000000" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id={`${P}-hinge-r`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000000" stopOpacity="0.2" />
          <stop offset="0.12" stopColor="#000000" stopOpacity="0" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.14" />
        </linearGradient>
        <linearGradient id={`${P}-fold-l`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000000" stopOpacity="0" />
          <stop offset="0.75" stopColor="#000000" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id={`${P}-fold-r`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000000" stopOpacity="0.32" />
          <stop offset="0.14" stopColor="#FFFFFF" stopOpacity="0.04" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <SweepG idp={P} w={1200} h={900} horizon={0.7} />
      <IsoG ox={-30} oy={560} s={1.16}>
        <Folder />
        {[0, 1, 2].map((k) => <Copy key={k} k={k} />)}
        <Spread />
      </IsoG>
    </Art>
  );
}
