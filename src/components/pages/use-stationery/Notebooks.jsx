// Two notebooks stepping up and to the left, and the Green Park pen across them (reference m28). One SVG.
import Art from '@/components/art/Art';
import { SweepG, MaterialDefs, CastG, StepG } from '@/components/art/Mockup';
import { BrandDefs } from '@/components/art/KeyArt';
import { MarkG, MarkCropG, WordmarkVerticalG } from '@/components/art/Mark';
import { ID, C, rotRect } from './parts';

const P = `${ID}-nb`;
const B = `${P}b`;
export const NB = { w: 380, h: 520 };

// Notebook cover artwork. kind: 'navy' (mint mark) or 'green' (navy mark crop and the vertical word-mark).
// idp is needed for the gradient and the clip.
export function NotebookCoverG({ kind, idp, clip }) {
  const { w, h } = NB;
  if (kind === 'navy') {
    return (
      <g>
        <rect width={w} height={h} fill={C.navy} filter={`url(#${idp}-grain)`} />
        <MarkG x={190} y={300} size={126} fill={C.mint} />
      </g>
    );
  }
  return (
    <g>
      <rect width={w} height={h} fill={`url(#${idp}-green)`} filter={`url(#${idp}-grain)`} />
      <MarkCropG idp={clip} w={w} h={h} zoom={1.45} dx={-0.18} dy={-0.12} fill={C.navy} />
      <WordmarkVerticalG x={26} y={h - 30} size={58} fill={C.white} />
    </g>
  );
}

function Notebook({ i, x, y, rot, scale, kind, clip }) {
  const { w, h } = NB;
  const W = w * scale, H = h * scale;
  return (
    <g className="mock-step" style={{ '--i': i }}>
      <CastG d={rotRect(x, y, W, H, rot)} depth={30} opacity={0.26} />
      <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
        {[3, 6, 9].map((o, k) => <rect key={o} x={o * 0.64 + 2} y={o * 0.77 + 2} width={w} height={h} fill={k === 2 ? '#E4E4DB' : '#F5F5EE'} stroke="#CFCFC4" strokeWidth="0.6" />)}
        <NotebookCoverG kind={kind} idp={B} clip={clip} />
        <rect width={w} height={h} fill={`url(#${P}-shade-v)`} opacity="0.35" />
        <rect x="0" y="0" width="16" height={h} fill="#000000" opacity="0.14" />
        <rect x="0" y="0" width="7" height={h} fill={`url(#${P}-metal)`} />
        <path d={`M16 0V${h}`} stroke="#FFFFFF" strokeWidth="1.2" opacity="0.3" />
        <path d={`M0 ${h}V0H${w}`} fill="none" stroke="#FFFFFF" strokeWidth="1.8" opacity="0.5" />
      </g>
    </g>
  );
}

function Pen({ i }) {
  return (
    <StepG i={i} x={720} y={560} rotate={-58}>
      <g transform="scale(1.1 1.5)">
      <g transform="translate(16 20)" opacity="0.3" filter={`url(#${P}-soft)`}>
        <rect x="-290" y="-12" width="550" height="24" fill="#052E25" />
      </g>
      <g>
        <path d="M-250 -11L-292 -3V3L-250 11Z" fill={`url(#${P}-metal)`} />
        <path d="M-292 -3L-312 0L-292 3Z" fill="#2B2F2E" />
        <rect x="-250" y="-11" width="500" height="22" fill={`url(#${P}-pen)`} />
        <rect x="-252" y="-12" width="10" height="24" fill={`url(#${P}-metal)`} />
        <rect x="236" y="-12" width="22" height="24" fill="#0F9A58" />
        <rect x="232" y="-12" width="6" height="24" fill={`url(#${P}-metal)`} />
        <path d="M-236 -6H230" stroke="#FFFFFF" strokeWidth="2.4" opacity="0.5" />
        <rect x="60" y="-18.5" width="176" height="7" fill={`url(#${P}-metal)`} />
        <path d="M60 -17.5H236" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.7" />
        <circle cx="62" cy="-15" r="6.5" fill={`url(#${P}-metal)`} />
        <path d="M-252 9H258" stroke="#000000" strokeWidth="2.4" opacity="0.18" />
      </g>
      </g>
    </StepG>
  );
}

export default function Notebooks() {
  return (
    <Art viewBox="0 0 1200 900" title="A navy notebook and a green notebook overlapping, with a Green Park pen across them" exportName={`${ID}-notebooks-pen`}>
      <MaterialDefs idp={P} />
      <BrandDefs idp={B} />
      <defs>
        <linearGradient id={`${P}-pen`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5BE6A2" />
          <stop offset="0.35" stopColor="#26CF7B" />
          <stop offset="1" stopColor="#0B7D47" />
        </linearGradient>
      </defs>
      <SweepG idp={P} w={1200} h={900} horizon={0.7} />
      <Notebook i={1} x={190} y={-90} rot={-7} scale={1.4} kind="green" clip={`${P}-gcrop`} />
      <Notebook i={0} x={560} y={210} rot={4} scale={1.4} kind="navy" clip={`${P}-ncrop`} />
      <Pen i={2} />
    </Art>
  );
}
