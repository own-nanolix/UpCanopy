// The truck trailer wrap (reference m02): trailer side cropped at the left, navy-to-green gradient, frond,
// pale mark, the line in five rows, twin rear wheels, underrun. Drawn in the reference's own 1600 x 900 space.
import { SweepG, MaterialDefs, StepG, ShadowG } from '@/components/art/Mockup';
import { BrandDefs, FROND_TONES } from '@/components/art/KeyArt';
import { MarkG } from '@/components/art/Mark';
import { CONTACT, LINES } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { Plate, BridgeLine, Bolt } from './parts';

const P = 'use-world-truck';
const X0 = -300; // trailer starts well off the left edge
const X1 = 1195;
const TOP = 175;
const BAND = 520;
const SKIRT = 548;
const BOT = 718;

// The frond as on m02: one sweep that runs from the top edge out to the right above the band and curls back
// to the left across the lower skirt. Leaflets stay nearly level (their right ends trace the curve), so this
// is drawn along a curve rather than with FrondG's circle. Measured from the reference in 1600 x 900.
const FP = { p0: [285, 176], c: [860, 470], p2: [330, 706] };
const quad = (a, b, c, t) => (1 - t) * (1 - t) * a + 2 * t * (1 - t) * b + t * t * c;
function TruckFrond() {
  const T = FROND_TONES.onNavy;
  const n = 34;
  return (
    <g opacity="0.95">
      {Array.from({ length: n }, (_, i) => {
        const t = i / (n - 1);
        const x = r2(quad(FP.p0[0], FP.c[0], FP.p2[0], t));
        const y = r2(quad(FP.p0[1], FP.c[1], FP.p2[1], t));
        const env = Math.sin(Math.PI * (0.18 + 0.72 * t));
        const L = r2(80 + 90 * env), W = r2(6.5 + 5.5 * env);
        const rot = r2(202 - 44 * t); // left and a little up at the top, left and a little down at the bottom
        return (
          <g key={i} transform={`translate(${x} ${y}) rotate(${rot})`} opacity={t > 0.64 ? 0.72 : 1}>
            <g className="fan" style={{ '--i': i }}>
              <path d={`M0 0Q${r2(L * 0.5)} ${-W} ${L} 0Q${r2(L * 0.5)} ${W} 0 0Z`} fill={T.a} />
              <path d={`M0 0Q${r2(L * 0.5)} ${-W} ${L} 0Q${r2(L * 0.5)} ${r2(-W * 0.15)} 0 0Z`} fill={T.b} />
            </g>
          </g>
        );
      })}
    </g>
  );
}

function Wheel({ cx, i }) {
  const cy = 672;
  const spokes = [45, 135, 225, 315];
  return (
    <g>
      <circle cx={cx} cy={cy} r="77" fill={`url(#${P}-rubber)`} />
      {Array.from({ length: 48 }, (_, k) => (
        <rect key={k} x={cx - 1.5} y={cy - 77} width="3" height="7" fill="#0B0B0A" opacity="0.8" transform={`rotate(${r2(k * 7.5)} ${cx} ${cy})`} />
      ))}
      <circle cx={cx} cy={cy} r="66" fill="#181817" />
      <circle cx={cx} cy={cy} r="58" fill={`url(#${P}-metal-dark)`} />
      <circle cx={cx} cy={cy} r="48" fill="#121211" stroke="#3D4140" strokeWidth="2" />
      {spokes.map((a) => (
        <g key={a} transform={`rotate(${a} ${cx} ${cy})`}>
          <rect x={cx - 7} y={cy - 46} width="14" height="46" fill="#232524" />
          <rect x={cx - 7} y={cy - 46} width="3" height="46" fill="#5A5F5E" />
        </g>
      ))}
      <circle cx={cx} cy={cy} r="17" fill={`url(#${P}-metal-dark)`} />
      <circle cx={cx - 4} cy={cy - 4} r="5" fill="#7B807F" opacity="0.7" />
      {Array.from({ length: 8 }, (_, k) => {
        const a = (k * Math.PI) / 4;
        return <circle key={k} cx={r2(cx + 52 * Math.cos(a))} cy={r2(cy + 52 * Math.sin(a))} r="2.2" fill="#4D5251" />;
      })}
      <circle cx={cx} cy={cy} r="77" fill={`url(#${P}-shade)`} opacity="0.9" />
      <path d={`M${cx - 70} ${cy - 30}A77 77 0 0 1 ${cx - 20} ${cy - 74}`} fill="none" stroke="#FFFFFF" strokeOpacity="0.22" strokeWidth="3" />
      <ShadowG idp={`${P}-sh-${i}`} cx={cx} cy={748} rx="82" opacity="0.4" />
    </g>
  );
}

export default function Truck() {
  const bodyD = `M${X0} ${TOP}H${X1 - 6}Q${X1} ${TOP} ${X1} ${TOP + 6}V640L1190 668V692L1150 ${BOT}H${X0}Z`;
  return (
    <Plate side="left" name="Truck wrap" exportName="use-world-truck" title="Truck trailer wrapped in the UpCanopy gradient with the frond and the brand line">
      <SweepG idp={P} w="1600" h="900" horizon={0.8} />
      <BrandDefs idp={`${P}-b`} />
      <MaterialDefs idp={P} />
      <defs>
        <clipPath id={`${P}-body`}>
          <path d={bodyD} />
        </clipPath>
        <clipPath id={`${P}-up`}>
          <rect x={X0} y={TOP} width={X1 - X0} height={BAND - TOP} />
        </clipPath>
        <clipPath id={`${P}-low`}>
          <rect x={X0} y={SKIRT} width="700" height={BOT - SKIRT} />
        </clipPath>
        <filter id={`${P}-blur`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      {/* hard cast shadow on the floor, lower right */}
      <g>
        <path d={`M${X0 + 40} 722H1180L1330 800H${X0 + 160}Z`} fill="#052E25" opacity="0.2" filter={`url(#${P}-blur)`} />
      </g>

      <StepG i={0}>
        {/* trailer body */}
        <g clipPath={`url(#${P}-body)`}>
          <rect x={X0} y={TOP} width={X1 - X0} height={BOT - TOP} fill={`url(#${P}-b-rise)`} filter={`url(#${P}-b-grain)`} />
          <rect x={X0} y={SKIRT} width={X1 - X0} height={BOT - SKIRT} fill="#0C1445" opacity="0.32" />
          <TruckFrond />
          {/* dark band along the lower third of the box, lit edge on top */}
          <rect x={X0} y={BAND} width={X1 - X0} height={SKIRT - BAND} fill="#0A0E1C" />
          <rect x={X0} y={BAND} width={X1 - X0} height="2" fill="#FFFFFF" opacity="0.18" />
          <rect x={X0} y={SKIRT - 3} width={X1 - X0} height="3" fill="#000000" opacity="0.5" />
          {/* panel seams */}
          {[120, 545].map((x) => (
            <g key={x}>
              <rect x={x} y={SKIRT} width="3" height={BOT - SKIRT} fill="#050A24" opacity="0.7" />
              <rect x={x + 3} y={SKIRT} width="1.5" height={BOT - SKIRT} fill="#FFFFFF" opacity="0.14" />
            </g>
          ))}
          <rect x={X0} y={632} width={X1 - X0} height="2" fill="#050A24" opacity="0.35" />
          {/* marker lamps */}
          {[85, 552].map((x) => (
            <rect key={x} x={x} y="566" width="26" height="5" fill="#C9CECB" opacity="0.55" />
          ))}
          {/* rear door edge */}
          <rect x={X1 - 32} y={TOP} width="32" height={BOT - TOP} fill={`url(#${P}-metal-dark)`} opacity="0.55" />
          <rect x={X1 - 34} y={TOP} width="2" height={BAND - TOP} fill="#000000" opacity="0.3" />
          {/* lit from the upper left, shaded lower right */}
          <rect x={X0} y={TOP} width={X1 - X0} height={BOT - TOP} fill={`url(#${P}-shade-v)`} opacity="0.8" />
          <rect x={X0} y={TOP} width={X1 - X0} height="4" fill="#FFFFFF" opacity="0.4" />
        </g>

        {/* artwork on the wrap */}
        <MarkG x={1028} y={206} size={84} fill="#D5DAEC" opacity="0.95" />
        <BridgeLine rows={LINES.bridge.rows} x={38} y={360} size={26.5} lh={1.24} fill="#AEB5D6" strong="#1FA862" />
        {/* rear underrun and tail assembly */}
        <path d="M1000 600H1160L1190 650V662H1000Z" fill="#0A0B0C" />
        <path d="M1006 606H1156L1180 646H1006Z" fill={`url(#${P}-metal-dark)`} />
        <rect x="1160" y="560" width="20" height="40" fill="#0A0B0C" />
        <rect x="1166" y="566" width="6" height="28" fill="#4C5150" />
        <rect x="1000" y="662" width="190" height="3" fill="#FFFFFF" opacity="0.12" />
        <Bolt x={1168} y={632} r={4} />
        <Bolt x={1018} y={632} r={4} />
        <text x="985" y="690" fontSize="17" fill="#4FDB95" fillOpacity="0.85">{CONTACT.web}</text>
      </StepG>

      <StepG i={1}>
        {/* wheel arch, then the twin wheels */}
        <path d="M572 722V690C572 624 650 586 762 586C874 586 950 624 950 690V722Z" fill="#05081A" />
        <path d="M572 722V690C572 624 650 586 762 586C874 586 950 624 950 690" fill="none" stroke="#2C3470" strokeWidth="4" />
        <path d="M580 700C584 640 660 600 762 600" fill="none" stroke="#FFFFFF" strokeOpacity="0.14" strokeWidth="3" />
        <Wheel cx={677} i={0} />
        <Wheel cx={855} i={1} />
        <rect x="560" y="716" width="400" height="4" fill="#0A0E1C" />
      </StepG>
    </Plate>
  );
}
