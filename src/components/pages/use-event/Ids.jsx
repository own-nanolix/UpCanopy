// Two staff ID cards in a clear holder, stepping up-right. No photographs: the frond fills the portrait area.
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { FrondG } from '@/components/art/KeyArt';
import { StepG, SheenG } from '@/components/art/Mockup';
import { PEOPLE } from '@/lib/brand';
import { C, Stage, Cast, CardBody } from './parts';

const W = 212, H = 312;

const FACES = {
  founder: { fill: C.navy, ink: '#FFFFFF', mark: C.green, tone: 'onNavy', ...PEOPLE.founder, caps: true },
  badge: { fill: C.green, ink: C.navy, mark: C.navy, tone: 'onGreen', ...PEOPLE.badge, caps: false },
};

function IdFace({ idp, id, f }) {
  return (
    <CardBody id={id} idp={idp} w={W} h={H} r={10} fill={f.fill} grain={f.fill === C.green ? `${idp}-b-grain` : undefined} slot thick={3}>
      <FrondG cx={110} cy={250} r={120} a0={198} a1={338} count={26} len={110} width={6} lean={62} tone={f.tone} opacity={0.9} />
      <MarkG x={14} y={12} size={28} fill={f.mark} />
      <WordmarkG x={W - 14} y={30} size={11} fill={f.ink} anchor="end" />
      {f.caps ? (
        <g fill={f.ink}>
          <text x="14" y={H - 38} fontSize="16" fontWeight="500" letterSpacing="0.8">{f.name}</text>
          <text x="14" y={H - 18} fontSize="11" fontWeight="300" letterSpacing="1.2">{f.role}</text>
        </g>
      ) : (
        <g fill={f.ink}>
          <text x="14" y={H - 44} fontSize="26" fontWeight="300">{f.name}</text>
          <text x="14" y={H - 14} fontSize="26" fontWeight="300">{f.role}</text>
        </g>
      )}
    </CardBody>
  );
}

const holderD = 'M0 14A14 14 0 0 1 14 0H246A14 14 0 0 1 260 14V346A14 14 0 0 1 246 360H14A14 14 0 0 1 0 346Z';

function Holder({ idp, id, face }) {
  return (
    <g>
      <Cast d={holderD} depth={16} opacity={0.22} />
      <rect x="2" y="5" width="256" height="356" rx="14" fill="#6C7A72" opacity="0.35" />
      <g transform="translate(24 38)">
        <IdFace idp={idp} id={`${id}-face`} f={face} />
      </g>
      <path d={holderD} fill="#FFFFFF" opacity="0.12" />
      <path d={holderD} fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.7" />
      <path d={holderD} fill="none" stroke="#052E25" strokeWidth="1" opacity="0.25" transform="translate(1 1)" />
      <rect x="82" y="10" width="96" height="14" rx="7" fill="#000000" opacity="0.28" />
      <rect x="82" y="11.5" width="96" height="14" rx="7" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
      <rect x="0" y="334" width="260" height="26" rx="12" fill={`url(#${idp}-plastic)`} opacity="0.55" />
      <SheenG idp={idp} d={holderD} opacity={0.5} />
    </g>
  );
}

export function StaffIds({ which }) {
  const front = FACES[which];
  const back = FACES[which === 'founder' ? 'badge' : 'founder'];
  const name = `id-${which}`;
  const idp = `use-event-${name}`;
  const title = which === 'founder' ? 'Staff ID card, navy' : 'Staff ID card, Green Park';
  return (
    <Stage name={name} title={title}>
      <StepG i={0} x={330} y={36}>
        <g transform="rotate(7)">
          <Cast d={`M0 0H${W} V${H}H0Z`} depth={14} opacity={0.2} />
          <CardBody id={`${idp}-back`} idp={idp} w={W} h={H} r={10} fill={back.fill} grain={back.fill === C.green ? `${idp}-b-grain` : undefined} thick={3}>
            <FrondG cx={110} cy={250} r={120} a0={198} a1={338} count={26} len={110} width={6} lean={62} tone={back.tone} opacity={0.9} />
            <MarkG x={14} y={12} size={28} fill={back.mark} />
          </CardBody>
        </g>
      </StepG>
      <StepG i={1} x={46} y={82}>
        <Holder idp={idp} id={`${idp}-holder`} face={front} />
      </StepG>
    </Stage>
  );
}
