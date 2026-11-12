// The wall sign (reference m17): a navy-to-green plate with the stacked lockup on a dark ribbed wall, a
// wayfinding panel stepping below it, and a room plaque. The wall is drawn as vertical bars.
import { SweepG, MaterialDefs, StepG, CastG, ShadowG } from '@/components/art/Mockup';
import { BrandDefs, ArrowG, FrondG } from '@/components/art/KeyArt';
import { MarkG, LockupStackG } from '@/components/art/Mark';
import { AREAS, CONTACT, HEX, SIGN } from '@/lib/brand';
import { Plate, Bolt, Ribs } from './parts';

const P = 'use-world-wallsign';
const WALL = { x: -40, y: -40, w: 1560, h: 830 };
const SP = { x: 300, y: 120, w: 620, h: 378 };   // the sign plate
const WF = { x: 560, y: 540, w: 380, h: 214 };   // wayfinding panel
const RP = { x: 1100, y: 300, w: 196, h: 250 };  // room plaque
const wide = { fontFamily: 'var(--font-wide)' };

export default function WallSign() {
  const wallD = `M${WALL.x} ${WALL.y}H${WALL.x + WALL.w}V${WALL.y + WALL.h}H${WALL.x}Z`;
  return (
    <Plate side="left" name="Wall sign and wayfinding" exportName="use-world-wall-sign" title="HOME wall sign on a dark ribbed wall with a wayfinding panel and a room plaque">
      <SweepG idp={P} w="1600" h="900" horizon={0.9} />
      <BrandDefs idp={`${P}-b`} />
      <MaterialDefs idp={P} />
      <defs>
        <clipPath id={`${P}-plate`}>
          <rect x={SP.x} y={SP.y} width={SP.w} height={SP.h} />
        </clipPath>
        <clipPath id={`${P}-wf`}>
          <rect x={WF.x} y={WF.y} width={WF.w} height={WF.h} />
        </clipPath>
        <linearGradient id={`${P}-wallshade`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.14" />
          <stop offset="0.5" stopColor="#000000" stopOpacity="0.1" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.62" />
        </linearGradient>
        <filter id={`${P}-blur`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {/* the ribbed wall, cropped by the top and left edges, standing on the sweep */}
      <StepG i={0}>
        <CastG d={wallD} depth="44" opacity="0.2" />
        <g clipPath={`url(#${P}-wall)`}>
          <Ribs x0={WALL.x} y0={WALL.y} y1={WALL.y + WALL.h} n={46} bw={34} />
          <rect x={WALL.x} y={WALL.y} width={WALL.w} height={WALL.h} fill={`url(#${P}-wallshade)`} />
        </g>
        <rect x={WALL.x} y={WALL.y + WALL.h - 10} width={WALL.w} height="14" fill={`url(#${P}-metal-dark)`} />
        <rect x={WALL.x} y={WALL.y + WALL.h - 10} width={WALL.w} height="2" fill="#FFFFFF" opacity="0.35" />
        <ShadowG idp={`${P}-sh-w`} cx="700" cy={WALL.y + WALL.h + 8} rx="800" opacity="0.3" />
      </StepG>
      <defs>
        <clipPath id={`${P}-wall`}>
          <rect x={WALL.x} y={WALL.y} width={WALL.w} height={WALL.h - 10} />
        </clipPath>
      </defs>

      {/* the HOME plate: standoffs, thickness, gradient with grain, lockup and the two small texts */}
      <StepG i={1}>
        <rect x={SP.x + 14} y={SP.y + 18} width={SP.w} height={SP.h} fill="#000000" opacity="0.55" filter={`url(#${P}-blur)`} />
        <path d={`M${SP.x + SP.w} ${SP.y}L${SP.x + SP.w + 9} ${SP.y + 8}V${SP.y + SP.h + 9}L${SP.x + 9} ${SP.y + SP.h + 9}L${SP.x} ${SP.y + SP.h}H${SP.x + SP.w}Z`} fill="#070B1C" />
        <g clipPath={`url(#${P}-plate)`}>
          <rect x={SP.x} y={SP.y} width={SP.w} height={SP.h} fill={`url(#${P}-b-rise)`} filter={`url(#${P}-b-grain)`} />
          <FrondG cx={SP.x + SP.w + 30} cy={SP.y - 40} r={260} a0={92} a1={190} count={34} len={260} width={13} lean={10} tone="onGreen" opacity={0.28} />
          <LockupStackG x={SP.x + SP.w / 2 - 150} y={SP.y + 52} scale={0.625} fill="#E7EAF1" />
          <text x={SP.x + 32} y={SP.y + SP.h - 30} fontSize="16" fill="#37D78B">{CONTACT.web}</text>
          <text x={SP.x + SP.w - 92} y={SP.y + SP.h - 30} fontSize="24" textAnchor="end" letterSpacing="5" fill="#F0F2F8" className="wide" style={wide}>{SIGN.home}</text>
          <ArrowG x={SP.x + SP.w - 80} y={SP.y + SP.h - 48} size={22} stroke="#F0F2F8" strokeWidth={3} />
          <rect x={SP.x} y={SP.y} width={SP.w} height={SP.h} fill={`url(#${P}-shade-v)`} opacity="0.6" />
          <rect x={SP.x} y={SP.y} width={SP.w} height={SP.h} fill={`url(#${P}-glass)`} opacity="0.35" className="mock-sheen" />
        </g>
        <path d={`M${SP.x} ${SP.y + SP.h}V${SP.y}H${SP.x + SP.w}`} fill="none" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="2" />
        {[[10, 10], [SP.w - 10, 10], [10, SP.h - 10], [SP.w - 10, SP.h - 10]].map(([dx, dy]) => (
          <Bolt key={`${dx}-${dy}`} x={SP.x + dx} y={SP.y + dy} r="4.5" />
        ))}
      </StepG>

      {/* wayfinding panel: the three areas with arrows */}
      <StepG i={2}>
        <rect x={WF.x + 12} y={WF.y + 14} width={WF.w} height={WF.h} fill="#000000" opacity="0.55" filter={`url(#${P}-blur)`} />
        <rect x={WF.x - 8} y={WF.y - 8} width={WF.w + 16} height={WF.h + 16} fill={`url(#${P}-metal-dark)`} />
        <path d={`M${WF.x - 8} ${WF.y + WF.h + 8}V${WF.y - 8}H${WF.x + WF.w + 8}`} fill="none" stroke="#B4BAB7" strokeWidth="2" />
        <g clipPath={`url(#${P}-wf)`}>
          <rect x={WF.x} y={WF.y} width={WF.w} height={WF.h} fill={HEX.navy} filter={`url(#${P}-b-grain)`} />
          <MarkG x={WF.x + 20} y={WF.y + 8} size={40} fill={HEX.green} />
          <rect x={WF.x} y={WF.y + 52} width={WF.w} height="3" fill={HEX.green} />
          {AREAS.map((a, i) => {
            const y = WF.y + 55 + i * 53;
            return (
              <g key={a}>
                <text x={WF.x + 30} y={y + 35} fontSize="24" fill="#FFFFFF" fontWeight="500" className="wide" style={wide}>{a}</text>
                <ArrowG x={WF.x + WF.w - 66} y={y + 17} size={22} stroke={HEX.green} strokeWidth={3} />
                {i < AREAS.length - 1 && <rect x={WF.x + 20} y={y + 52} width={WF.w - 40} height="1.5" fill="#FFFFFF" opacity="0.22" />}
              </g>
            );
          })}
          <rect x={WF.x} y={WF.y} width={WF.w} height={WF.h} fill={`url(#${P}-shade-v)`} opacity="0.55" />
        </g>
        {[[WF.x - 3, WF.y - 3], [WF.x + WF.w + 3, WF.y - 3], [WF.x - 3, WF.y + WF.h + 3], [WF.x + WF.w + 3, WF.y + WF.h + 3]].map(([x, y]) => (
          <Bolt key={`${x}-${y}`} x={x} y={y} r="3.5" />
        ))}
      </StepG>

      {/* room plaque: the mark and one area name */}
      <StepG i={3}>
        <rect x={RP.x + 10} y={RP.y + 14} width={RP.w} height={RP.h} fill="#000000" opacity="0.55" filter={`url(#${P}-blur)`} />
        <rect x={RP.x} y={RP.y} width={RP.w} height={RP.h} fill={`url(#${P}-metal-dark)`} />
        <rect x={RP.x + 8} y={RP.y + 8} width={RP.w - 16} height={RP.h - 16} fill={HEX.navy} filter={`url(#${P}-b-grain)`} />
        <MarkG x={RP.x + RP.w / 2 - 38} y={RP.y + 34} size={76} fill={HEX.green} />
        <rect x={RP.x + 28} y={RP.y + 156} width={RP.w - 56} height="3" fill={HEX.green} />
        <text x={RP.x + RP.w / 2} y={RP.y + 204} fontSize="27" fontWeight="500" textAnchor="middle" fill="#FFFFFF" className="wide" style={wide}>{AREAS[1]}</text>
        <rect x={RP.x + 8} y={RP.y + 8} width={RP.w - 16} height={RP.h - 16} fill={`url(#${P}-shade-v)`} opacity="0.55" />
        <path d={`M${RP.x} ${RP.y + RP.h}V${RP.y}H${RP.x + RP.w}`} fill="none" stroke="#B4BAB7" strokeWidth="2" />
        <Bolt x={RP.x + 4} y={RP.y + 4} r="2.8" />
        <Bolt x={RP.x + RP.w - 4} y={RP.y + 4} r="2.8" />
        <Bolt x={RP.x + 4} y={RP.y + RP.h - 4} r="2.8" />
        <Bolt x={RP.x + RP.w - 4} y={RP.y + RP.h - 4} r="2.8" />
      </StepG>
    </Plate>
  );
}
