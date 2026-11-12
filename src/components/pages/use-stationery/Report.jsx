// The report cover with its spine (references m08, m31) and the five slides fanned along the rising diagonal
// behind it. One SVG, one projection.
import Art from '@/components/art/Art';
import { SweepG, MaterialDefs, StepG } from '@/components/art/Mockup';
import { BrandDefs } from '@/components/art/KeyArt';
import { MarkCropG, WordmarkVerticalG, WordmarkG, MarkG } from '@/components/art/Mark';
import { ID, C, IsoG, Block, CastBlock, Sheet, LeftFace } from './parts';
import { SlideG } from './Slides';

const P = `${ID}-rp`;
const B = `${P}b`;
const R = { w: 330, d: 450, h: 46 };

// The cover: Green Park gradient, the navy mark crop, the vertical word-mark.
export function ReportCoverG({ idp, clip, w = R.w, d = R.d }) {
  return (
    <g>
      <rect width={w} height={d} fill={`url(#${idp}-green)`} filter={`url(#${idp}-grain)`} />
      <MarkCropG idp={clip} w={w} h={d} zoom={1.5} dx={-0.2} dy={-0.08} fill={C.navy} />
      <WordmarkVerticalG x={w - d * 0.2} y={d - d * 0.05} size={d * 0.125} fill={C.white} />
      <path d={`M0 0V${d}`} stroke="#000000" strokeWidth="3" opacity="0.12" />
    </g>
  );
}

function Report() {
  const { w, d, h } = R;
  return (
    <>
      <StepG i={0}>
        <CastBlock x={0} y={0} w={w} d={d} len={h * 1.6} opacity={0.26} />
        <g className="mock-lit">
          <Block x={0} y={0} w={w} d={d} h={h} leftFill={C.navy}
            bands={[{ to: 0.13, fill: '#0F1B45' }, { to: 0.87, fill: '#E7ECE6' }, { to: 1, fill: '#0F1B45' }]} lines={13} lineColor="rgba(22,37,87,0.22)">
            <ReportCoverG idp={B} clip={`${P}-crop`} />
            <rect width={w} height={d} fill={`url(#${P}-cover-shade)`} />
            <path d={`M0 ${d}V0H${w}`} fill="none" stroke="#FFFFFF" strokeWidth="1.6" opacity="0.55" />
          </Block>
          <LeftFace x={0} y={0} d={d} h={h}>
            <rect width={d} height={h} fill={C.navyDark} opacity="0.25" />
            <WordmarkG x={d / 2} y={h / 2 + 8} size={22} fill={C.white} anchor="middle" weight={400} />
            <MarkG x={d - 44} y={h / 2 - 12} size={24} fill={C.green} />
          </LeftFace>
        </g>
      </StepG>
    </>
  );
}

export default function ReportAndSlides() {
  const order = [4, 3, 2, 1, 0]; // far slide first, so the near one lies on top
  return (
    <Art viewBox="0 0 1600 900" title="Report cover with a navy spine and five slides fanned along the rising diagonal behind it" exportName={`${ID}-report-slides`}>
      <MaterialDefs idp={P} />
      <BrandDefs idp={B} />
      <defs>
        <linearGradient id={`${P}-cover-shade`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#000000" stopOpacity="0.1" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <SweepG idp={P} w={1600} h={900} horizon={0.72} />
      <IsoG ox={120} oy={620}>
        {order.map((k) => (
          <StepG key={k} i={k + 1}>
            <Sheet x={250 + k * 175} y={-120 - k * 34} w={432} d={243} rot={-8 + k * 3} h={4} edge="#C9D0CB" shadow={14}>
              <g transform="scale(0.27)"><SlideG k={k} cid={`${P}-fan-${k}`} /></g>
              <rect width="432" height="243" fill={`url(#${P}-cover-shade)`} />
            </Sheet>
          </StepG>
        ))}
        <Report />
      </IsoG>
    </Art>
  );
}
