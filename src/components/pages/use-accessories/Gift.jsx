// Gift card (front, back) and its carrier. No value, number or code: quiet pale bars stand in for them.
import { FrondG } from '@/components/art/KeyArt';
import { MarkG, WordmarkG, DescriptorG, LockupStackG } from '@/components/art/Mark';
import { StepG } from '@/components/art/Mockup';
import { C, Scene, Cast, rectD } from './parts';

const CW = 300, CH = 189;

function Card({ ids, id, side, x, y }) {
  const clip = `${ids.p}-card-${id}`;
  const d = rectD(0, 0, CW, CH);
  return (
    <g transform={`translate(${x} ${y})`}>
      <clipPath id={clip}><path d={d} /></clipPath>
      <Cast d={d} rot={-12} depth={10} />
      <path d={d} transform="translate(2.5 3.5)" fill={side === 'front' ? C.deep : C.dark} />
      <path d={d} fill={side === 'front' ? C.navy : C.green} filter={`url(#${ids.m}-paper)`} />
      <g clipPath={`url(#${clip})`}>
        {side === 'front' ? (
          <g>
            <FrondG cx={CW * 0.95} cy={CH * 1.05} r={CH * 0.75} a0={196} a1={330} count={30} len={CH * 0.7} width={5} lean={-6} tone="onNavy" opacity="0.8" />
            <MarkG x={22} y={20} size={42} fill={C.green} />
            <WordmarkG x={22} y={CH - 22} size={24} fill="#FFFFFF" />
            <rect x="22" y={CH - 74} width="96" height="9" fill="#fff" opacity="0.3" />
          </g>
        ) : (
          <g>
            <WordmarkG x={CW - 20} y={36} size={17} fill={C.navy} anchor="end" />
            {[0, 1, 2].map((k) => <rect key={k} x="22" y={62 + k * 18} width={150 - k * 26} height="8" fill={C.dark} opacity="0.2" />)}
            <rect x="22" y={CH - 54} width="150" height="30" fill="#fff" opacity="0.34" />
            <MarkG x={CW - 60} y={CH - 58} size={38} fill={C.navy} />
            <DescriptorG x={22} y={CH - 12} size={7.5} fill={C.navy} />
          </g>
        )}
        <path d={d} fill={`url(#${ids.m}-shade)`} opacity="0.8" />
      </g>
      <path d={d} fill={`url(#${ids.m}-glass)`} opacity="0.55" />
      <path d={rectD(0, 0, CW, 1.4)} fill="#fff" opacity="0.7" />
    </g>
  );
}

// The carrier: a mint paper pocket with a slanted opening; the cards stand out of it, up and to the right.
function Carrier({ ids, first, second }) {
  const back = rectD(0, 0, 316, 206);
  const pocket = 'M0 66L316 26V206H0Z';
  const clip = `${ids.p}-pocket`;
  return (
    <g>
      <clipPath id={clip}><path d={pocket} /></clipPath>
      <Cast d={back} rot={-12} depth={16} />
      <path d={back} transform="translate(3 4)" fill="#BFEFD3" />
      <path d={back} fill={C.paper} filter={`url(#${ids.m}-paper)`} />
      <Card ids={ids} id="p1" side={first} x={14} y={-52} />
      <Card ids={ids} id="p2" side={second} x={64} y={-106} />
      <path d={pocket} transform="translate(0 -3)" fill="#000" opacity="0.18" />
      <path d={pocket} fill="#FFFFFF" filter={`url(#${ids.m}-paper)`} />
      <g clipPath={`url(#${clip})`}>
        <FrondG cx={316} cy={230} r={110} a0={190} a1={290} count={26} len={90} width={4} lean={-10} tone="onMint" opacity="0.9" />
        <LockupStackG x={20} y={92} scale={0.3} fill={C.navy} markFill={C.navy} />
        <path d={pocket} fill={`url(#${ids.m}-shade)`} opacity="0.7" />
      </g>
      <path d="M0 66L316 26" stroke="#000" strokeOpacity="0.2" strokeWidth="1.6" />
      <path d="M0 64.4L316 24.4" stroke="#fff" strokeOpacity="0.8" strokeWidth="1.2" />
      <path d="M8 196H308" stroke={C.navy} strokeOpacity="0.3" strokeWidth="1.3" strokeDasharray="4 3.5" />
    </g>
  );
}

function GiftScene({ k, title, first, second, s, x, y }) {
  return (
    <Scene k={k} title={title} size="small">
      {(ids) => (
        <StepG i={0} x={x} y={y}>
          <g transform={`rotate(-12) scale(${s})`}><Carrier ids={ids} first={first} second={second} /></g>
        </StepG>
      )}
    </Scene>
  );
}

export const GiftFront = () => <GiftScene k="gift-front" title="Gift card, front, standing out of its carrier" first="back" second="front" s={1} x={20} y={250} />;
export const GiftBack = () => <GiftScene k="gift-back" title="Gift card, back, standing out of its carrier" first="front" second="back" s={1} x={20} y={250} />;
export const GiftCarrier = () => <GiftScene k="gift-carrier" title="Gift card carrier with both cards stepping out" first="back" second="front" s={0.9} x={30} y={240} />;
