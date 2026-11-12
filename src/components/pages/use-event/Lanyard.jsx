// The lanyard with the speaker badge (rebuild of m09) and the VIP pass on a short lanyard (extension).
import { MarkG, WordmarkG, WordmarkVerticalG } from '@/components/art/Mark';
import { FrondG } from '@/components/art/KeyArt';
import { ShadowG } from '@/components/art/Mockup';
import { C, Stage, Cast, Webbing, SwivelClip, CardBody, rrect } from './parts';

const CARD = { w: 325, h: 492 };
const cardD = `M0 14A14 14 0 0 1 14 0H${CARD.w - 14}A14 14 0 0 1 ${CARD.w} 14V${CARD.h - 14}A14 14 0 0 1 ${CARD.w - 14} ${CARD.h}H14A14 14 0 0 1 0 ${CARD.h - 14}Z`;

// Strap of the lanyard in its own horizontal space; the caller rotates it into place.
function LanyardStrap({ id, idp, len, h = 70 }) {
  return (
    <Webbing id={id} idp={idp} len={len} h={h} fill={C.navy}>
      <g transform={`translate(${len - 46} ${h / 2}) rotate(-90)`}>
        <MarkG x={-17} y={-17} size={34} fill="#FFFFFF" />
      </g>
      <g transform={`translate(${len - 74} ${h / 2 + 9}) rotate(180)`}>
        <WordmarkG size={27} fill="#FFFFFF" />
      </g>
    </Webbing>
  );
}

export function LanyardBadge() {
  const name = 'lanyard';
  const idp = `use-event-${name}`;
  return (
    <Stage name={name} title="Lanyard with speaker badge" w={960} h={1080} horizon={0.78}>
      {/* green card behind, turned about 22 degrees */}
      <g transform="translate(365 258) rotate(22)">
        <g className="mock-step" style={{ '--i': 0 }}>
          <Cast d={cardD} depth={20} opacity={0.2} />
          <CardBody id={`${idp}-back`} idp={idp} w={CARD.w} h={CARD.h} fill={C.green} grain={`${idp}-b-grain`}>
            <WordmarkVerticalG x={34} y={CARD.h + 150} size={112} fill="#FFFFFF" />
          </CardBody>
        </g>
      </g>
      {/* lanyard, cropped by the top edge */}
      <g className="mock-step" style={{ '--i': 1 }}>
        <Cast d={rrect(225, 70)} x={528} y={-10} rot={90} depth={10} opacity={0.18} />
        <g transform="translate(528 -10) rotate(90)">
          <LanyardStrap id={`${idp}-strap`} idp={idp} len={235} />
          <g stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" fill="none" strokeDasharray="4 3">
            <rect x="203" y="7" width="22" height="56" />
          </g>
        </g>
      </g>
      {/* the badge turns to the light */}
      <g className="mock-lit">
        <g transform="translate(333 308)">
          <Cast d={cardD} depth={22} opacity={0.24} />
          <CardBody id={`${idp}-front`} idp={idp} w={CARD.w} h={CARD.h} fill={C.navy} slot>
            <rect width={CARD.w} height={CARD.h} fill={C.navyLift} opacity="0.5" />
            <FrondG cx={170} cy={430} r={150} a0={198} a1={338} count={34} len={150} width={7} lean={62} tone="onNavy" opacity={0.95} />
            <MarkG x={18} y={14} size={36} fill={C.green} />
            <WordmarkG x={CARD.w - 18} y={36} size={14} fill="#FFFFFF" anchor="end" />
            <rect y={CARD.h - 120} width={CARD.w} height="120" fill="url(#use-event-lanyard-name)" />
            <text x="18" y={CARD.h - 56} fontSize="31" fontWeight="300" fill="#FFFFFF">Jhon Due</text>
            <text x="18" y={CARD.h - 20} fontSize="31" fontWeight="300" fill="#FFFFFF">CEO</text>
          </CardBody>
        </g>
        <SwivelClip idp={idp} x={493} y={221} />
      </g>
      <defs>
        <linearGradient id="use-event-lanyard-name" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.navy} stopOpacity="0" />
          <stop offset="1" stopColor={C.navy} stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <ShadowG idp={`${idp}-s1`} cx={500} cy={880} rx={260} opacity={0.14} />
    </Stage>
  );
}

const VW = 360, VH = 520;
const vipD = `M0 16A16 16 0 0 1 16 0H${VW - 16}A16 16 0 0 1 ${VW} 16V${VH - 16}A16 16 0 0 1 ${VW - 16} ${VH}H16A16 16 0 0 1 0 ${VH - 16}Z`;

export function VipPass() {
  const name = 'vip-pass';
  const idp = `use-event-${name}`;
  const len = 340;
  const strap = (k) => (
    <Webbing key={k} id={`${idp}-strap-${k}`} idp={idp} len={len} h={56} fill={C.navy}>
      {[60, 150, 240].map((px) => (
        <g key={px} transform={`translate(${px} 28)`}>
          <MarkG x={-14} y={-14} size={28} fill="#FFFFFF" />
        </g>
      ))}
    </Webbing>
  );
  return (
    <Stage name={name} title="VIP pass on a short lanyard" w={960} h={1080} horizon={0.8}>
      <g className="mock-step" style={{ '--i': 0 }}>
        <Cast d={rrect(len, 56)} x={250} y={-30} rot={46.8} depth={12} opacity={0.18} />
        <Cast d={rrect(len, 56)} x={710} y={-30} rot={133.2} depth={12} opacity={0.18} />
        <g transform="translate(250 -30) rotate(46.8)">{strap(0)}</g>
        <g transform="translate(710 -30) rotate(133.2)">{strap(1)}</g>
        <rect x="456" y="222" width="48" height="26" rx="3" fill={`url(#${idp}-metal)`} />
        <rect x="456" y="233" width="48" height="2" fill="#000000" opacity="0.35" />
      </g>
      <g className="mock-lit">
        <g transform="translate(300 380)">
          <Cast d={vipD} depth={22} opacity={0.24} />
          <CardBody id={`${idp}-card`} idp={idp} w={VW} h={VH} r={16} fill={`url(#${idp}-b-rise)`} grain={`${idp}-b-grain`} slot>
            <FrondG cx={250} cy={560} r={200} a0={200} a1={335} count={30} len={170} width={8} lean={62} tone="onNavy" opacity={0.6} />
            <MarkG x={20} y={16} size={38} fill="#FFFFFF" />
            <WordmarkG x={VW - 20} y={40} size={15} fill="#FFFFFF" anchor="end" />
            <text x="22" y={VH - 40} fontSize="132" fontWeight="500" fill="#FFFFFF" letterSpacing="-9" className="wide" style={{ fontFamily: 'var(--font-wide)' }}>VIP</text>
          </CardBody>
        </g>
        <SwivelClip idp={idp} x={480} y={275} />
      </g>
      <ShadowG idp={`${idp}-s1`} cx={490} cy={960} rx={240} opacity={0.14} />
    </Stage>
  );
}
