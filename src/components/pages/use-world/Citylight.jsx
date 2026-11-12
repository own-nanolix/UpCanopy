// The citylight (reference m24) with two roll-up banners stepping away to the right. No portrait: the frond
// stands behind the centre of the lit poster.
import { SweepG, MaterialDefs, StepG, ShadowG, CastG } from '@/components/art/Mockup';
import { BrandDefs, FrondG } from '@/components/art/KeyArt';
import { MarkG, LockupStackG, MarkCropG, WordmarkVerticalG } from '@/components/art/Mark';
import { CONTACT, HEX, LINES } from '@/lib/brand';
import { Plate, BridgeLine, Bolt } from './parts';

const P = 'use-world-citylight';
const CX = 120, CY = 56, CW = 470, CH = 650; // citylight frame
const PX = CX + 34, PY = CY + 34, PW = CW - 68, PH = CH - 80; // lit poster
const FLOOR = 850;

function Citylight() {
  const outer = `M${CX} ${CY}H${CX + CW}V${CY + CH}H${CX}Z`;
  const cx = CX + CW / 2;
  return (
    <g>
      <ShadowG idp={`${P}-sh-c`} cx={cx} cy={FLOOR + 6} rx="190" opacity="0.4" />
      <CastG d={outer} depth="30" opacity="0.14" />
      <path d={`M${cx - 90} ${FLOOR}H${cx + 90}L${cx + 190} ${FLOOR + 30}H${cx + 40}Z`} fill="#052E25" opacity="0.18" />
      {/* base column and foot */}
      <rect x={cx - 92} y={CY + CH - 6} width="184" height={FLOOR - CY - CH + 6} fill={`url(#${P}-metal-dark)`} />
      <rect x={cx - 92} y={CY + CH - 6} width="184" height={FLOOR - CY - CH + 6} fill={`url(#${P}-shade)`} opacity="0.9" />
      <rect x={cx - 92} y={CY + CH - 6} width="5" height={FLOOR - CY - CH + 6} fill="#FFFFFF" opacity="0.25" />
      <rect x={cx - 120} y={FLOOR - 14} width="240" height="16" fill={`url(#${P}-metal-dark)`} />
      <rect x={cx - 120} y={FLOOR - 14} width="240" height="2" fill="#FFFFFF" opacity="0.3" />
      {[-100, -60, 60, 100].map((d) => (
        <Bolt key={d} x={cx + d} y={FLOOR - 6} r="3.5" />
      ))}
      <rect x={cx - 92} y={CY + CH + 40} width="184" height="3" fill="#000000" opacity="0.4" />
      {/* frame body with depth: a lit top and left edge, a dark right and bottom edge */}
      <path d={`M${CX + CW} ${CY}L${CX + CW + 16} ${CY + 14}V${CY + CH + 14}L${CX + 16} ${CY + CH + 14}L${CX} ${CY + CH}H${CX + CW}Z`} fill="#0A0B0A" />
      <rect x={CX} y={CY} width={CW} height={CH} fill={`url(#${P}-metal-dark)`} />
      <path d={`M${CX} ${CY + CH}V${CY}H${CX + CW}`} fill="none" stroke="#B4BAB7" strokeWidth="3" />
      <rect x={CX + 14} y={CY + 14} width={CW - 28} height={CH - 28} fill="#0B0D0C" />
      <path d={`M${CX + 14} ${CY + CH - 14}V${CY + 14}H${CX + CW - 14}`} fill="none" stroke="#000000" strokeWidth="4" />
      {/* light spill onto the inner frame */}
      <rect x={PX - 14} y={PY - 14} width={PW + 28} height={PH + 28} fill="#26CF7B" opacity="0.16" filter={`url(#${P}-glow)`} />
      {/* lit poster */}
      <g clipPath={`url(#${P}-poster)`}>
        <rect x={PX} y={PY} width={PW} height={PH} fill={`url(#${P}-b-rise-dark)`} filter={`url(#${P}-b-grain)`} />
        <ellipse cx={PX + PW * 0.5} cy={PY + PH * 0.34} rx={PW * 0.55} ry={PH * 0.3} fill="#26CF7B" opacity="0.22" filter={`url(#${P}-glow)`} />
        <FrondG cx={PX + 40} cy={PY + PH * 0.5} r={170} a0={-80} a1={10} count={34} len={190} width={10} lean={20} tone="onNavy" opacity={0.7} fan />
        <rect x={PX} y={PY + PH * 0.55} width={PW} height={PH * 0.45} fill={`url(#${P}-fade)`} />
        <MarkG x={PX + 26} y={PY + 22} size={54} fill={HEX.green} />
        <BridgeLine rows={LINES.bridge.rows} x={PX + 32} y={PY + PH - 158} size={25.5} lh={1.26} fill="#E6EDF5" />
        <text x={PX + PW - 26} y={PY + PH - 32} fontSize="15" textAnchor="end" fill="#8FD9B6">{CONTACT.web}</text>
        <rect x={PX} y={PY} width={PW} height={PH} fill={`url(#${P}-glass)`} opacity="0.35" className="mock-sheen" />
      </g>
      <path d={`M${PX} ${PY + PH}V${PY}H${PX + PW}`} fill="none" stroke="#000000" strokeOpacity="0.55" strokeWidth="3" />
      {/* frame bolts, vent slots on the head */}
      {[CX + 7, CX + CW - 7].map((x) => (
        <g key={x}>
          <Bolt x={x} y={CY + 7} r="3" />
          <Bolt x={x} y={CY + CH - 7} r="3" />
        </g>
      ))}
      <rect x={CX + 14} y={CY + CH - 38} width={CW - 28} height="22" fill="#050606" />
      {Array.from({ length: 14 }, (_, i) => (
        <rect key={i} x={CX + 36 + i * 29} y={CY + CH - 32} width="14" height="3" fill="#2A2D2C" />
      ))}
    </g>
  );
}

// A roll-up banner: hanging bar, banner face, cassette with end caps and feet. Local origin = banner top-left.
function RollUp({ id, w, h, kind }) {
  const outer = `M-14 -16H${w + 14}V${h + 56}H-14Z`;
  return (
    <g>
      <ShadowG idp={`${P}-sh-${id}`} cx={w / 2} cy={h + 58} rx={w * 0.7} opacity="0.4" />
      <CastG d={outer} depth="22" opacity="0.14" />
      <rect x="-3" y="-16" width={w + 6} height="16" fill={`url(#${P}-metal)`} />
      <rect x="-3" y="-16" width={w + 6} height="3" fill="#FFFFFF" opacity="0.6" />
      <g clipPath={`url(#${P}-ru-${id})`}>
        {kind === 'navy' ? (
          <>
            <rect width={w} height={h} fill={HEX.navy} filter={`url(#${P}-b-grain)`} />
            <LockupStackG x={w / 2 - 94} y={h * 0.3} scale={0.39} fill="#FFFFFF" />
            <path d={`M0 ${h}V${h - 130}L${w} ${h - 190}V${h}Z`} fill="#0C1445" opacity="0.5" />
          </>
        ) : (
          <>
            <rect width={w} height={h} fill={HEX.green} filter={`url(#${P}-b-grain)`} />
            <MarkCropG idp={`${P}-mc`} x={0} y={0} w={w} h={190} zoom={1.7} dx={-0.3} dy={-0.12} fill={HEX.navy} />
            <WordmarkVerticalG x={26} y={h - 26} size={58} fill={HEX.navy} />
          </>
        )}
        <rect width={w} height={h} fill={`url(#${P}-shade)`} opacity="0.8" />
        <rect width={w} height={h} fill={`url(#${P}-shade-v)`} opacity="0.5" />
      </g>
      <rect x="0" y="0" width="2" height={h} fill="#FFFFFF" opacity="0.35" />
      {/* cassette */}
      <rect x="-14" y={h} width={w + 28} height="44" fill={`url(#${P}-metal)`} />
      <rect x="-14" y={h} width={w + 28} height="44" fill={`url(#${P}-shade-v)`} />
      <rect x="-14" y={h + 4} width={w + 28} height="2" fill="#FFFFFF" opacity="0.7" />
      <rect x={-14} y={h} width="14" height="44" fill="#1D1D1B" />
      <rect x={w} y={h} width="14" height="44" fill="#1D1D1B" />
      <rect x="-14" y={h} width="3" height="44" fill="#6C7170" />
      <rect x={14} y={h + 44} width="34" height="8" fill={`url(#${P}-rubber)`} />
      <rect x={w - 48} y={h + 44} width="34" height="8" fill={`url(#${P}-rubber)`} />
    </g>
  );
}

export default function CitylightScene() {
  const ru = [
    { id: 'a', x: 770, y: 270, w: 230, h: 520, kind: 'navy', s: 1 },
    { id: 'b', x: 1440, y: 230, w: 230, h: 520, kind: 'green', s: 0.86 },
  ];
  return (
    <Plate side="left" name="Citylight and roll-up banners" exportName="use-world-citylight" title="Lit citylight with two roll-up banners stepping away to the right">
      <SweepG idp={P} w="1600" h="900" horizon={0.88} />
      <BrandDefs idp={`${P}-b`} />
      <MaterialDefs idp={P} />
      <defs>
        <clipPath id={`${P}-poster`}>
          <rect x={PX} y={PY} width={PW} height={PH} />
        </clipPath>
        {ru.map((r) => (
          <clipPath key={r.id} id={`${P}-ru-${r.id}`}>
            <rect width={r.w} height={r.h} />
          </clipPath>
        ))}
        <filter id={`${P}-glow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
        <linearGradient id={`${P}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0C1445" stopOpacity="0" />
          <stop offset="1" stopColor="#0C1445" stopOpacity="0.75" />
        </linearGradient>
      </defs>
      <StepG i={0}>
        <Citylight />
      </StepG>
      {ru.map((r, k) => (
        <StepG key={r.id} i={k + 1} x={r.x} y={r.y + (1 - r.s) * 280} >
          <g transform={`scale(${r.s})`}>
            <RollUp id={r.id} w={r.w} h={r.h} kind={r.kind} />
          </g>
        </StepG>
      ))}
    </Plate>
  );
}

