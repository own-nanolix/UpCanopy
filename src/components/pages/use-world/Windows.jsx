// Reception: the three lit window panels (reference m15) in a dark steel frame, and the mark as a glossy
// Green Park 3D sign in two pieces on a glass wall (reference m13). No portrait: the first panel carries the frond.
import { SweepG, MaterialDefs, StepG, CastG, ShadowG } from '@/components/art/Mockup';
import { BrandDefs, FrondG } from '@/components/art/KeyArt';
import { MarkG, WordmarkG, LockupStackG, MARK_ARCH, MARK_BAR } from '@/components/art/Mark';
import { CONTACT, HEX, LINES } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { Plate, BridgeLine, Bolt } from './parts';

const P = 'use-world-windows';
const PW = 416, PH = 446, K = 0.78; // panel artwork size and its scale in the frame
const GAP = 16;
const PXS = PW * K, PYS = PH * K;
const FW = 3 * PXS + 4 * GAP, FH = 500;

function Panel({ n }) {
  return (
    <g>
      {n === 0 && (
        <>
          <rect width={PW} height={PH} fill={HEX.navy} filter={`url(#${P}-b-grain)`} />
          <FrondG cx={-120} cy={250} r={250} a0={-62} a1={58} count={40} len={290} width={12} lean={24} tone="onNavy" opacity={0.55} />
          <rect width={PW} height={PH} fill={`url(#${P}-vig)`} />
          <MarkG x={26} y={20} size={52} fill={HEX.green} />
          <WordmarkG x={PW - 24} y={PH - 26} size={22} fill="#FFFFFF" anchor="end" />
        </>
      )}
      {n === 1 && (
        <>
          <rect width={PW} height={PH} fill={`url(#${P}-b-green)`} filter={`url(#${P}-b-grain)`} />
          <rect width={PW} height={PH} fill={`url(#${P}-b-dots)`} />
          <MarkG x={26} y={20} size={52} fill={HEX.green} />
          <BridgeLine rows={LINES.bridge.rows4} x={PW - 24} y={46} size={23} lh={1.26} fill={HEX.navy} strong={HEX.navy} anchor="end" />
          <text x="24" y={PH - 24} fontSize="12" fill={HEX.navy}>{CONTACT.footer}</text>
          <WordmarkG x={PW - 24} y={PH - 26} size={22} fill="#FFFFFF" anchor="end" opacity="0.6" />
        </>
      )}
      {n === 2 && (
        <>
          <rect width={PW} height={PH} fill={HEX.navy} filter={`url(#${P}-b-grain)`} />
          <rect width={PW} height={PH} fill={`url(#${P}-vig)`} />
          <LockupStackG x={(PW - 288) / 2} y={PH / 2 - 92} scale={0.6} fill="#FFFFFF" />
        </>
      )}
    </g>
  );
}

// The sign: two pieces (arch, bar), extruded to the lower right, a gloss gradient, a highlight and shade.
function Sign3D() {
  const layers = Array.from({ length: 12 }, (_, i) => 12 - i);
  return (
    <g>
      <g transform="translate(9 11)" opacity="0.28" filter={`url(#${P}-blur)`}>
        <path d={MARK_ARCH} fill="#052E25" />
        <path d={MARK_BAR} fill="#052E25" />
      </g>
      {layers.map((t) => (
        <g key={t} transform={`translate(${r2(t * 0.42)} ${r2(t * 0.52)})`} fill={t > 9 ? '#0A5A34' : '#0F7A45'}>
          <path d={MARK_ARCH} />
          <path d={MARK_BAR} />
        </g>
      ))}
      <g fill={`url(#${P}-gloss)`}>
        <path d={MARK_ARCH} />
        <path d={MARK_BAR} />
      </g>
      <g fill={`url(#${P}-shade)`} opacity="0.75">
        <path d={MARK_ARCH} />
        <path d={MARK_BAR} />
      </g>
      <g clipPath={`url(#${P}-signclip)`}>
        <path d="M-10 70L40 -10L58 -10L8 70Z" fill="#FFFFFF" opacity="0.32" />
        <path d="M40 80L95 -5L103 -5L48 80Z" fill="#FFFFFF" opacity="0.16" />
      </g>
      <path d={MARK_ARCH} fill={`url(#${P}-glass)`} className="mock-sheen" />
      <path d={MARK_BAR} fill={`url(#${P}-glass)`} className="mock-sheen" />
      <path d={MARK_ARCH} fill="none" stroke="#C6FFE0" strokeOpacity="0.55" strokeWidth="0.6" />
      <path d={MARK_BAR} fill="none" stroke="#C6FFE0" strokeOpacity="0.55" strokeWidth="0.6" />
    </g>
  );
}

export default function Windows() {
  const outer = `M0 0H${r2(FW)}V${FH}H0Z`;
  const GX = 760, GY = -40, GW = 900, GH = 520;
  return (
    <Plate side="right" name="Reception windows and 3D sign" exportName="use-world-windows" title="Three lit window panels in a dark frame with the glossy green 3D mark above, cropped right">
      <SweepG idp={P} w="1600" h="900" horizon={0.9} />
      <BrandDefs idp={`${P}-b`} />
      <MaterialDefs idp={P} />
      <defs>
        <clipPath id={`${P}-signclip`}>
          <path d={MARK_ARCH} />
          <path d={MARK_BAR} />
        </clipPath>
        <clipPath id={`${P}-panel`}>
          <rect width={PW} height={PH} />
        </clipPath>
        <clipPath id={`${P}-glasswall`}>
          <rect x={GX} y={GY} width={GW} height={GH} />
        </clipPath>
        <linearGradient id={`${P}-gloss`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#8DF5BC" />
          <stop offset="0.3" stopColor="#26CF7B" />
          <stop offset="0.7" stopColor="#1BA866" />
          <stop offset="1" stopColor="#0F7D47" />
        </linearGradient>
        <linearGradient id={`${P}-wall`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E3F1EE" />
          <stop offset="0.5" stopColor="#B7D0D3" />
          <stop offset="1" stopColor="#8FAEB4" />
        </linearGradient>
        <radialGradient id={`${P}-vig`} cx="0.5" cy="0.45" r="0.8">
          <stop offset="0.5" stopColor="#0C1445" stopOpacity="0" />
          <stop offset="1" stopColor="#0C1445" stopOpacity="0.5" />
        </radialGradient>
        <filter id={`${P}-blur`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
        <filter id={`${P}-glow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="20" />
        </filter>
      </defs>

      {/* glass wall with the sign, upper right, cropped by the top and right edges */}
      <StepG i={1}>
        <g clipPath={`url(#${P}-glasswall)`}>
          <rect x={GX} y={GY} width={GW} height={GH} fill={`url(#${P}-wall)`} />
          {Array.from({ length: 9 }, (_, i) => (
            <g key={`v${i}`}>
              <rect x={GX + 40 + i * 120} y={GY} width="6" height={GH} fill="#3A4547" />
              <rect x={GX + 40 + i * 120} y={GY} width="2" height={GH} fill="#FFFFFF" opacity="0.6" />
            </g>
          ))}
          {Array.from({ length: 6 }, (_, i) => (
            <g key={`h${i}`}>
              <rect x={GX} y={GY + 30 + i * 100} width={GW} height="6" fill="#3A4547" />
              <rect x={GX} y={GY + 30 + i * 100} width={GW} height="2" fill="#FFFFFF" opacity="0.6" />
            </g>
          ))}
          <path d={`M${GX + 120} ${GY + GH}L${GX + 420} ${GY}H${GX + 520}L${GX + 220} ${GY + GH}Z`} fill="#FFFFFF" opacity="0.22" />
          <path d={`M${GX + 520} ${GY + GH}L${GX + 800} ${GY}H${GX + 840}L${GX + 560} ${GY + GH}Z`} fill="#FFFFFF" opacity="0.14" />
          <rect x={GX} y={GY} width={GW} height={GH} fill={`url(#${P}-shade-v)`} opacity="0.5" />
        </g>
        <path d={`M${GX} ${GY + GH}V${GY}`} stroke="#3A4547" strokeWidth="8" />
        <rect x={GX - 8} y={GY + GH - 6} width={GW + 8} height="16" fill={`url(#${P}-metal-dark)`} />
        <g transform="translate(1006 22) rotate(-4)">
          <g transform="scale(4.1)">
            <g className="mock-lit">
              <Sign3D />
            </g>
          </g>
        </g>
      </StepG>

      {/* the three window panels in a dark steel frame, lower left, cropped by the left edge */}
      <StepG i={0} x={-34} y={338}>
        <CastG d={outer} depth="26" opacity="0.14" />
        <ShadowG idp={`${P}-sh`} cx={FW / 2} cy={FH + 2} rx={FW * 0.5} opacity="0.35" />
        <rect width={FW} height={FH} fill={`url(#${P}-metal-dark)`} />
        <path d={`M0 ${FH}V0H${r2(FW)}`} fill="none" stroke="#8E9491" strokeWidth="3" />
        {/* light spilling from the panels */}
        <rect x={GAP} y={PYS + 40} width={FW - GAP * 2} height="60" fill="#26CF7B" opacity="0.22" filter={`url(#${P}-glow)`} />
        {[0, 1, 2].map((n) => {
          const x = GAP + n * (PXS + GAP);
          const y = 46;
          return (
            <g key={n}>
              <rect x={x - 5} y={y - 5} width={PXS + 10} height={PYS + 10} fill="#0A0B0A" />
              <g transform={`translate(${r2(x)} ${y}) scale(${K})`}>
                <g clipPath={`url(#${P}-panel)`}>
                  <Panel n={n} />
                  <rect width={PW} height={PH} fill={`url(#${P}-shade-v)`} opacity="0.5" />
                  <rect width={PW} height={PH} fill={`url(#${P}-glass)`} opacity="0.35" className="mock-sheen" />
                </g>
              </g>
              <path d={`M${r2(x - 5)} ${r2(y + PYS + 5)}V${y - 5}H${r2(x + PXS + 5)}`} fill="none" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="2" />
            </g>
          );
        })}
        {/* mullions, transom, spandrel panels, sill */}
        {[0, 1, 2, 3].map((n) => {
          const x = n * (PXS + GAP);
          return (
            <g key={n}>
              <rect x={x} y="0" width={GAP} height={FH - 30} fill={`url(#${P}-metal-dark)`} />
              <rect x={x} y="0" width="3" height={FH - 30} fill="#FFFFFF" opacity="0.28" />
              {[60, 150, 240, 330].map((d) => (
                <Bolt key={d} x={x + GAP / 2} y={d} r="2.6" />
              ))}
            </g>
          );
        })}
        <rect x="0" y="0" width={FW} height="40" fill={`url(#${P}-metal-dark)`} />
        <rect x="0" y="38" width={FW} height="3" fill="#FFFFFF" opacity="0.22" />
        {[0, 1, 2].map((n) => {
          const x = GAP + n * (PXS + GAP);
          return (
            <g key={n}>
              <rect x={x} y={PYS + 56} width={PXS} height={FH - PYS - 56 - 34} fill="#0C0D0D" />
              <rect x={x} y={PYS + 56} width={PXS} height="3" fill="#FFFFFF" opacity="0.14" />
              <rect x={x} y={PYS + 56} width={PXS} height={FH - PYS - 56 - 34} fill={`url(#${P}-shade-v)`} opacity="0.5" />
            </g>
          );
        })}
        <rect x="0" y={FH - 32} width={FW} height="32" fill={`url(#${P}-metal-dark)`} />
        <rect x="0" y={FH - 32} width={FW} height="3" fill="#B4BAB7" opacity="0.6" />
      </StepG>
    </Plate>
  );
}
