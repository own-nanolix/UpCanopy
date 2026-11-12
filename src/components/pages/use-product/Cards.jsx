// The client access card for the back-office, in three colourways, front over back.
import Art from '@/components/art/Art';
import { SweepG, CastG, MaterialDefs, StepG } from '@/components/art/Mockup';
import { MarkG, WordmarkG, DescriptorG, LockupG, MarkCropG } from '@/components/art/Mark';
import { CONTACT } from '@/lib/brand';
import { Contactless } from './parts';

const W = 520, H = 328;
const CARD = `M12 0H${W - 12}A12 12 0 0 1 ${W} 12V${H - 12}A12 12 0 0 1 ${W - 12} ${H}H12A12 12 0 0 1 0 ${H - 12}V12A12 12 0 0 1 12 0Z`;

const WAYS = [
  { key: 'navy', name: 'Navy', face: '#162557', edge: '#26CF7B', ink: '#FFFFFF', mark: '#26CF7B', crop: '#1F3070', strip: '#0C1445', bar: '#FFFFFF', barOp: 0.2 },
  { key: 'green', name: 'Green Park', face: '#26CF7B', edge: '#162557', ink: '#162557', mark: '#162557', crop: '#1FB86C', strip: '#052E25', bar: '#162557', barOp: 0.22 },
  { key: 'mint', name: 'Mint', face: '#DFF7E6', edge: '#8FC9B5', ink: '#162557', mark: '#26CF7B', crop: '#CBEED7', strip: '#162557', bar: '#162557', barOp: 0.14 },
];

function Front({ c, id }) {
  return (
    <g>
      <path d={CARD} fill={c.face} />
      <g clipPath={`url(#${id}-clip)`}>
        <MarkCropG idp={`${id}-crop`} x={250} y={110} w={290} h={240} zoom={1.7} dx={-0.2} dy={-0.18} fill={c.crop} />
      </g>
      <MarkG x={34} y={32} size={66} fill={c.mark} />
      <Contactless x={W - 78} y={64} size={50} color={c.ink} strokeWidth={4} />
      <WordmarkG x={34} y={H - 66} size={36} fill={c.ink} />
      <DescriptorG x={36} y={H - 34} size={11.5} fill={c.ink} />
    </g>
  );
}

function Back({ c }) {
  return (
    <g>
      <path d={CARD} fill={c.face} />
      <rect x="0" y="40" width={W} height="62" fill={c.strip} />
      <rect x="0" y="40" width={W} height="3" fill="#FFFFFF" opacity="0.14" />
      <rect x="0" y="98" width={W} height="4" fill="#000000" opacity="0.3" />
      <LockupG x={36} y={128} scale={0.4} fill={c.ink} markFill={c.mark} />
      <rect x="36" y="178" width="190" height="10" fill={c.bar} opacity={c.barOp + 0.1} />
      <rect x="36" y="198" width="120" height="7" fill={c.bar} opacity={c.barOp} />
      <rect x="296" y="178" width="188" height="28" fill={c.bar} opacity={c.barOp} />
      <text x="36" y={H - 52} fontSize="16" fontWeight="500" fill={c.ink}>{CONTACT.phone}</text>
      <text x="36" y={H - 28} fontSize="16" fontWeight="500" fill={c.ink}>{CONTACT.web}</text>
    </g>
  );
}

// A card with a painted edge (the card's thickness shows on the lower and right sides) and a lit upper-left rim.
function Card({ c, id, mat, children }) {
  return (
    <g>
      <CastG d={CARD} depth={22} opacity={0.22} />
      <g transform="translate(3.5 4.5)"><path d={CARD} fill={c.edge} /></g>
      <g transform="translate(1.8 2.2)"><path d={CARD} fill={c.edge} /></g>
      <clipPath id={`${id}-clip`}><path d={CARD} /></clipPath>
      {children}
      <path d={CARD} fill={`url(#${mat}-shade)`} opacity="0.55" filter={`url(#${mat}-paper)`} />
      <path d={`M12 1.2H${W - 12}`} stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="1.6" />
      <path d={`M1.2 ${H - 12}V12`} stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1.6" />
    </g>
  );
}

export function AccessCard({ way }) {
  const c = WAYS.find((w) => w.key === way);
  const id = `use-product-card-${c.key}`;
  const mat = `${id}-m`;
  return (
    <Art viewBox="0 0 800 880" title={`Access card, ${c.name}, front over back`} exportName={`use-product-card-${c.key}`}>
      <MaterialDefs idp={mat} />
      <SweepG idp={`${id}-s`} w={800} h={880} horizon={0.7} />
      <StepG i={0} x={180} y={450} rotate={-5}>
        <Card c={c} id={`${id}-back`} mat={mat}><Back c={c} /></Card>
      </StepG>
      <StepG i={1} x={70} y={90} rotate={-5}>
        <g className="mock-lit">
          <Card c={c} id={`${id}-front`} mat={mat}><Front c={c} id={`${id}-front`} /></Card>
        </g>
      </StepG>
    </Art>
  );
}

export const WAY_LIST = WAYS;
