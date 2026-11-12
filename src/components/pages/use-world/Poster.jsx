// The poster on the timber wall (reference m06): a framed dark green poster right of centre on vertical
// planks, a door cropped at the left. The poster carries the line, the pale frond, the mark and the contacts.
import { SweepG, MaterialDefs, StepG, CastG, ShadowG } from '@/components/art/Mockup';
import { BrandDefs, FrondG } from '@/components/art/KeyArt';
import { MarkG } from '@/components/art/Mark';
import { CONTACT, HEX, LINES } from '@/lib/brand';
import { r2, seeded } from '@/lib/charts';
import { Plate, BridgeLine, Bolt } from './parts';

const P = 'use-world-poster';
const WALL = { x: 330, y: -30, w: 1330, h: 840 };
const POS = { x: 880, y: 50, w: 460, h: 646 };
const DOOR = { x: -40, y: -30, w: 370, h: 840 };

const TONES = ['#C98E55', '#D29A60', '#BE8348', '#CF9559', '#C48A50', '#D6A06A'];

function Planks() {
  const rnd = seeded(19);
  const out = [];
  let x = WALL.x;
  let i = 0;
  while (x < WALL.x + WALL.w) {
    const w = 52 + Math.floor(rnd() * 16);
    const tone = TONES[i % TONES.length];
    const knots = [rnd(), rnd()];
    out.push(
      <g key={i}>
        <rect x={r2(x)} y={WALL.y} width={w} height={WALL.h} fill={tone} />
        <rect x={r2(x)} y={WALL.y} width="3" height={WALL.h} fill="#FFFFFF" opacity="0.22" />
        <rect x={r2(x + w - 4)} y={WALL.y} width="4" height={WALL.h} fill="#4A2A10" opacity="0.55" />
        {[0.1, 0.3, 0.5, 0.7].map((g, k) => (
          <rect key={k} x={r2(x + w * (0.2 + 0.18 * k + rnd() * 0.08))} y={WALL.y} width="1.2" height={WALL.h} fill="#7A4A22" opacity={0.18 + g * 0.1} />
        ))}
        {i % 3 === 0 && (
          <ellipse cx={r2(x + w * 0.5)} cy={r2(WALL.y + 120 + knots[0] * 560)} rx="5" ry="9" fill="#6B3E1A" opacity="0.7" />
        )}
        {i % 4 === 1 && (
          <ellipse cx={r2(x + w * 0.45)} cy={r2(WALL.y + 120 + knots[1] * 560)} rx="4" ry="7" fill="#6B3E1A" opacity="0.6" />
        )}
      </g>,
    );
    x += w;
    i += 1;
  }
  return <g>{out}</g>;
}

export default function Poster() {
  const posterD = `M${POS.x} ${POS.y}H${POS.x + POS.w}V${POS.y + POS.h}H${POS.x}Z`;
  return (
    <Plate side="right" name="Poster on a timber wall" exportName="use-world-poster" title="Dark green UpCanopy poster on a timber wall beside a glass door">
      <SweepG idp={P} w="1600" h="900" horizon={0.92} />
      <BrandDefs idp={`${P}-b`} />
      <MaterialDefs idp={P} />
      <defs>
        <clipPath id={`${P}-wall`}>
          <rect x={WALL.x} y={WALL.y} width={WALL.w} height={WALL.h} />
        </clipPath>
        <clipPath id={`${P}-poster`}>
          <rect x={POS.x} y={POS.y} width={POS.w} height={POS.h} />
        </clipPath>
        <linearGradient id={`${P}-field`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#063226" />
          <stop offset="1" stopColor="#0C4A39" />
        </linearGradient>
        <linearGradient id={`${P}-light`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFE9C2" stopOpacity="0.35" />
          <stop offset="0.5" stopColor="#FFE9C2" stopOpacity="0" />
          <stop offset="1" stopColor="#2A1608" stopOpacity="0.35" />
        </linearGradient>
        <filter id={`${P}-blur`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      {/* the timber wall: vertical boards, a concrete plinth, standing on the sweep */}
      <StepG i={0}>
        <CastG d={`M${WALL.x} ${WALL.y}H${WALL.x + WALL.w}V${WALL.y + WALL.h}H${WALL.x}Z`} depth="40" opacity="0.16" />
        <g clipPath={`url(#${P}-wall)`}>
          <Planks />
          <rect x={WALL.x} y={WALL.y} width={WALL.w} height={WALL.h} fill={`url(#${P}-light)`} />
          <path d="M520 -30L640 -30L420 810L300 810Z" fill="#FFF2D6" opacity="0.1" />
          <path d="M700 -30L760 -30L540 810L480 810Z" fill="#FFF2D6" opacity="0.07" />
        </g>
        <rect x={WALL.x} y={WALL.y + WALL.h - 44} width={WALL.w} height="44" fill="#9DA3A0" />
        <rect x={WALL.x} y={WALL.y + WALL.h - 44} width={WALL.w} height="3" fill="#E6E9E7" opacity="0.7" />
        <rect x={WALL.x} y={WALL.y + WALL.h - 44} width={WALL.w} height="44" fill={`url(#${P}-shade-v)`} />
        <ShadowG idp={`${P}-sh-w`} cx="1000" cy={WALL.y + WALL.h + 6} rx="700" opacity="0.28" />
      </StepG>

      {/* the door, cropped by the left edge: a steel frame, dark glass, a pull handle */}
      <StepG i={1}>
        <rect x={DOOR.x} y={DOOR.y} width={DOOR.w + 12} height={DOOR.h} fill="#1D1F1F" />
        <rect x={DOOR.x} y={DOOR.y} width={DOOR.w} height={DOOR.h - 44} fill={`url(#${P}-metal-dark)`} />
        <rect x="40" y="30" width="268" height={DOOR.h - 130} fill="#0B0D0D" />
        <rect x="40" y="30" width="268" height={DOOR.h - 130} fill={`url(#${P}-glass)`} opacity="0.55" className="mock-sheen" />
        <path d="M60 60L180 60L60 380Z" fill="#FFFFFF" opacity="0.07" />
        <path d="M40 30V750" stroke="#9EA4A1" strokeWidth="3" />
        <rect x="302" y="30" width="6" height={DOOR.h - 130} fill="#7A807D" />
        <rect x="316" y="250" width="12" height="190" fill={`url(#${P}-metal)`} />
        <rect x="316" y="250" width="3" height="190" fill="#FFFFFF" opacity="0.8" />
        <rect x={DOOR.x} y={DOOR.y + DOOR.h - 44} width={DOOR.w + 12} height="44" fill="#9DA3A0" />
        <rect x={DOOR.x} y={DOOR.y + DOOR.h - 44} width={DOOR.w + 12} height="3" fill="#E6E9E7" opacity="0.7" />
        <ShadowG idp={`${P}-sh-d`} cx="150" cy={DOOR.y + DOOR.h + 6} rx="320" opacity="0.28" />
      </StepG>

      {/* the poster: hanging on the boards, a thin dark frame, a printed field with grain */}
      <StepG i={2}>
        <rect x={POS.x + 14} y={POS.y + 18} width={POS.w + 14} height={POS.h + 14} fill="#2A1608" opacity="0.55" filter={`url(#${P}-blur)`} />
        <CastG d={posterD} depth="26" fill="#2A1608" opacity="0.3" />
        <rect x={POS.x - 9} y={POS.y - 9} width={POS.w + 18} height={POS.h + 18} fill="#3A3732" />
        <path d={`M${POS.x - 9} ${POS.y + POS.h + 9}V${POS.y - 9}H${POS.x + POS.w + 9}`} fill="none" stroke="#9A958C" strokeWidth="2" />
        <g clipPath={`url(#${P}-poster)`}>
          <rect x={POS.x} y={POS.y} width={POS.w} height={POS.h} fill={`url(#${P}-field)`} filter={`url(#${P}-b-grain)`} />
          <FrondG cx={POS.x - 380} cy={POS.y + 430} r={400} a0={-30} a1={30} count={36} len={310} width={9} lean={14} tone="onDark" opacity={0.9} fan />
          <BridgeLine rows={LINES.bridge.rows4} x={POS.x + POS.w - 30} y={POS.y + 70} size={28} lh={1.28} fill="#CFE4DA" strong={HEX.green} anchor="end" />
          <MarkG x={POS.x + 34} y={POS.y + POS.h - 124} size={74} fill={HEX.green} />
          <text x={POS.x + POS.w - 30} y={POS.y + POS.h - 50} fontSize="14" textAnchor="end" fill="#D9ECE2">{CONTACT.phone}</text>
          <text x={POS.x + POS.w - 30} y={POS.y + POS.h - 28} fontSize="14" textAnchor="end" fill="#D9ECE2">{CONTACT.web}</text>
          <rect x={POS.x} y={POS.y} width={POS.w} height={POS.h} fill={`url(#${P}-shade-v)`} opacity="0.5" />
          <rect x={POS.x} y={POS.y} width={POS.w} height={POS.h} fill={`url(#${P}-glass)`} opacity="0.25" className="mock-sheen" />
        </g>
        {[[POS.x - 4, POS.y - 4], [POS.x + POS.w + 4, POS.y - 4], [POS.x - 4, POS.y + POS.h + 4], [POS.x + POS.w + 4, POS.y + POS.h + 4]].map(([x, y]) => (
          <Bolt key={`${x}-${y}`} x={x} y={y} r="3" />
        ))}
      </StepG>
    </Plate>
  );
}
