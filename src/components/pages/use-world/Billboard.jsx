// The billboard: the brochure artwork (reference m16) on a wide board with a steel frame, posts and lamps.
import { SweepG, MaterialDefs, StepG, ShadowG, CastG } from '@/components/art/Mockup';
import { BrandDefs, FrondG } from '@/components/art/KeyArt';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { CONTACT, HEX, LINES } from '@/lib/brand';
import { Plate, BridgeLine, CredLine, Bolt, SteelBar } from './parts';

const P = 'use-world-billboard';
const FX = 150, FY = 120, FW = 1410, FH = 440; // outer frame
const IN = 24;                                  // frame depth around the artwork
const AX = FX + IN, AY = FY + IN, AW = FW - IN * 2, AH = FH - IN * 2;
const SPLIT = 650;                              // width of the green panel
const FLOOR = 820;

function Post({ x }) {
  return (
    <g>
      <ShadowG idp={`${P}-sh-${x}`} cx={x + 22} cy={FLOOR + 4} rx="110" opacity="0.38" />
      <path d={`M${x} ${FLOOR}H${x + 44}L${x + 120} ${FLOOR + 36}H${x + 70}Z`} fill="#052E25" opacity="0.2" />
      <SteelBar idp={P} x={x} y={FY + FH - 6} w="44" h={FLOOR - FY - FH + 6} />
      <rect x={x + 18} y={FY + FH} width="2" height={FLOOR - FY - FH} fill="#FFFFFF" opacity="0.5" />
      {/* base plate with bolts */}
      <rect x={x - 28} y={FLOOR - 14} width="100" height="16" fill={`url(#${P}-metal)`} />
      <rect x={x - 28} y={FLOOR + 2} width="100" height="5" fill="#6E7573" />
      {[-18, 8, 36, 62].map((d) => (
        <Bolt key={d} x={x + d} y={FLOOR - 6} r="4" />
      ))}
      {/* gusset */}
      <path d={`M${x} ${FLOOR - 14}L${x - 20} ${FLOOR - 14}L${x} ${FLOOR - 80}Z`} fill={`url(#${P}-metal)`} />
      <path d={`M${x + 44} ${FLOOR - 14}L${x + 64} ${FLOOR - 14}L${x + 44} ${FLOOR - 80}Z`} fill="#8A908D" />
    </g>
  );
}

function Lamp({ x }) {
  return (
    <g>
      <path d={`M${x} ${FY}V${FY - 56}L${x + 46} ${FY - 86}`} fill="none" stroke={`url(#${P}-metal-dark)`} strokeWidth="7" />
      <rect x={x + 34} y={FY - 108} width="72" height="26" fill={`url(#${P}-metal-dark)`} transform={`rotate(24 ${x + 34} ${FY - 94})`} />
      <rect x={x + 40} y={FY - 102} width="56" height="5" fill="#FFFFFF" opacity="0.6" transform={`rotate(24 ${x + 34} ${FY - 94})`} />
      <path d={`M${x + 70} ${FY - 70}L${x + 20} ${FY + 50}L${x + 190} ${FY + 50}Z`} fill="#FFFFFF" opacity="0.1" />
      <Bolt x={x} y={FY - 10} r="4" />
    </g>
  );
}

export default function Billboard() {
  const outer = `M${FX} ${FY}H${FX + FW}V${FY + FH}H${FX}Z`;
  return (
    <Plate side="right" name="Billboard" exportName="use-world-billboard" title="Billboard on a steel frame carrying the brochure artwork">
      <SweepG idp={P} w="1600" h="900" horizon={0.9} />
      <BrandDefs idp={`${P}-b`} />
      <MaterialDefs idp={P} />
      <defs>
        <clipPath id={`${P}-clip-green`}>
          <rect x={AX} y={AY} width={SPLIT} height={AH} />
        </clipPath>
        <clipPath id={`${P}-clip-mint`}>
          <rect x={AX + SPLIT} y={AY} width={AW - SPLIT} height={AH} />
        </clipPath>
        <linearGradient id={`${P}-greenpanel`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#1FC070" />
          <stop offset="1" stopColor="#38DD8B" />
        </linearGradient>
        <linearGradient id={`${P}-mintpanel`} x1="0.2" y1="0" x2="0.5" y2="1">
          <stop offset="0" stopColor="#5FD596" />
          <stop offset="1" stopColor="#D2F5DE" />
        </linearGradient>
      </defs>

      <StepG i={0} x={0} y={0}>
        <Post x={430} />
        <Post x={1230} />
        {/* cross bracing between the posts */}
        <path d={`M474 ${FY + FH + 70}L1230 ${FLOOR - 120}M474 ${FLOOR - 120}L1230 ${FY + FH + 70}`} stroke="#8E9491" strokeWidth="6" />
        <SteelBar idp={P} x="474" y={FY + FH + 60} w="756" h="14" />
        <SteelBar idp={P} x="474" y={FLOOR - 126} w="756" h="14" />
      </StepG>

      <StepG i={1} x={0} y={0}>
        <CastG d={outer} depth="26" opacity="0.16" />
        {/* board depth: the lit edge below and to the right */}
        <path d={`M${FX + FW} ${FY}L${FX + FW + 14} ${FY + 12}V${FY + FH + 14}L${FX + 14} ${FY + FH + 14}L${FX} ${FY + FH}H${FX + FW}Z`} fill="#0E0E0D" />
        <rect x={FX} y={FY} width={FW} height={FH} fill={`url(#${P}-metal-dark)`} />
        <path d={`M${FX} ${FY + FH}V${FY}H${FX + FW}`} fill="none" stroke="#9EA4A1" strokeWidth="3" />
        <rect x={FX + 6} y={FY + 6} width={FW - 12} height={IN - 10} fill="#000000" opacity="0.25" />

        {/* the artwork, clipped to the board */}
        <g clipPath={`url(#${P}-clip-green)`}>
          <rect x={AX} y={AY} width={SPLIT} height={AH} fill={`url(#${P}-greenpanel)`} filter={`url(#${P}-b-grain)`} />
          <FrondG cx={AX + 440} cy={AY + 270} r={180} a0={-75} a1={55} count={36} len={190} width={11} lean={22} tone="onGreen" />
          <BridgeLine rows={LINES.bridge.rows4} x={AX + 52} y={AY + 82} size={32} lh={1.28} fill="#EFFFF6" strong="#FFFFFF" />
        </g>
        <g clipPath={`url(#${P}-clip-mint)`}>
          <rect x={AX + SPLIT} y={AY} width={AW - SPLIT} height={AH} fill={`url(#${P}-mintpanel)`} filter={`url(#${P}-b-grain)`} />
          <rect x={AX + SPLIT} y={AY} width={AW - SPLIT} height={AH} fill={`url(#${P}-b-dots)`} />
          <MarkG x={AX + AW - 150} y={AY + 34} size={92} fill={HEX.navy} />
          <CredLine x={AX + SPLIT + 58} y={AY + 140} size={29} fill={HEX.navy} />
          <text x={AX + AW - 36} y={AY + 262} fontSize="18" textAnchor="end" fill={HEX.navy}>{CONTACT.phone}</text>
          <text x={AX + AW - 36} y={AY + 288} fontSize="18" textAnchor="end" fill={HEX.navy}>{CONTACT.web}</text>
          <WordmarkG x={AX + SPLIT + 40} y={AY + AH + 8} size={118} fill="#FFFFFF" weight={500} opacity="0.5" />
        </g>
        <rect x={AX + SPLIT - 2} y={AY} width="4" height={AH} fill="#0A2F25" opacity="0.5" />
        {/* print is lit from the upper left; glass sheen drifts across */}
        <rect x={AX} y={AY} width={AW} height={AH} fill={`url(#${P}-shade-v)`} opacity="0.55" />
        <rect x={AX} y={AY} width={AW} height={AH} fill={`url(#${P}-glass)`} opacity="0.3" className="mock-sheen" />
        <path d={`M${AX} ${AY + AH}V${AY}H${AX + AW}`} fill="none" stroke="#000000" strokeOpacity="0.45" strokeWidth="3" />

        {/* frame bolts and rear ribs */}
        {[FX + 12, FX + FW / 2, FX + FW - 12].map((x) => (
          <g key={x}>
            <Bolt x={x} y={FY + 12} r="4" />
            <Bolt x={x} y={FY + FH - 12} r="4" />
          </g>
        ))}
        <SteelBar idp={P} x={FX - 10} y={FY + FH} w={FW + 24} h="22" />
        {Array.from({ length: 22 }, (_, i) => (
          <rect key={i} x={FX + 10 + i * 64} y={FY + FH + 22} width="6" height="14" fill="#6E7573" />
        ))}
      </StepG>

      <StepG i={2} x={0} y={0}>
        <Lamp x={380} />
        <Lamp x={820} />
        <Lamp x={1260} />
      </StepG>
    </Plate>
  );
}
