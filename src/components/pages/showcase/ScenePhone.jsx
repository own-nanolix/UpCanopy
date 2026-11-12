// Scene 1 (16:9): the phone upright at centre-left, five data cards stepping up and to the right behind it,
// the last one cropped by the top-right corner. One SVG: sweep, shadows, objects, shading and artwork.
import Art from '@/components/art/Art';
import { SweepG, ShadowG, MaterialDefs, StepG, SheenG, cascade } from '@/components/art/Mockup';
import { PhoneG, ScreenHomeG } from '@/components/art/Devices';
import { BrandDefs, FrondG, ScaleDotsG } from '@/components/art/KeyArt';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { IconUse } from '@/components/site/Icon';
import { AREAS, LINES, SCALES } from '@/lib/brand';
import { Slab, rr, WIDE } from './parts';

const P = 'showcase-s1';
const CW = 330, CH = 236;

const label = (t, x, y, fill) => (
  <text x={x} y={y} fontSize="13" fontWeight="500" letterSpacing="1" fill={fill} style={WIDE} className="wide">{t}</text>
);

function Rows({ x = 24, y = 76, n = 4, tile = '#2A3A78', ink = '#FFFFFF', on = 0 }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`translate(${x} ${y + i * 38})`}>
          <rect width="26" height="26" fill={i === on ? '#26CF7B' : tile} />
          <rect x="40" y="4" width={[170, 130, 190, 110][i % 4]} height="7" fill={ink} opacity="0.3" />
          <rect x="40" y="16" width={[90, 110, 70, 100][i % 4]} height="6" fill={ink} opacity="0.18" />
        </g>
      ))}
    </g>
  );
}

function CardCRM() {
  return (
    <g>
      <rect width={CW} height={CH} fill="#162557" />
      <IconUse name="users" x={22} y={22} size={24} color="#26CF7B" />
      {label(AREAS[0].toUpperCase(), 56, 40, '#FFFFFF')}
      <Rows y={72} />
    </g>
  );
}

function CardAgenda() {
  return (
    <g>
      <rect width={CW} height={CH} fill="#FFFFFF" />
      <IconUse name="calendar" x={22} y={22} size={24} color="#162557" />
      {label(AREAS[1].toUpperCase(), 56, 40, '#162557')}
      {Array.from({ length: 5 }, (_, d) =>
        Array.from({ length: 6 }, (_, k) => {
          const hit = (d * 3 + k * 2) % 7 === 0;
          return <rect key={`${d}-${k}`} x={24 + k * 49} y={68 + d * 31} width="45" height="27" fill={hit ? '#26CF7B' : '#162557'} opacity={hit ? 1 : 0.1} />;
        }),
      )}
    </g>
  );
}

function CardFin() {
  return (
    <g>
      <rect width={CW} height={CH} fill="#26CF7B" />
      <IconUse name="chart" x={22} y={22} size={24} color="#162557" />
      {label(AREAS[2].toUpperCase(), 56, 40, '#162557')}
      <Rows y={72} n={3} tile="#FFFFFF" ink="#162557" on={-1} />
      <rect x="24" y="190" width="282" height="22" fill="#FFFFFF" opacity="0.55" />
      <rect x="24" y="190" width="176" height="22" fill="#162557" />
    </g>
  );
}

function CardScale() {
  const sc = SCALES[0];
  return (
    <g lang="pt-BR">
      <rect width={CW} height={CH} fill="#F0F0F0" />
      <text x="24" y="40" fontSize="11" fontWeight="700" letterSpacing="1" fill="#162557">{sc.left}</text>
      <text x={CW - 24} y="40" fontSize="11" fontWeight="700" letterSpacing="1" textAnchor="end" fill="#162557">{sc.right}</text>
      <ScaleDotsG x={32} y={92} w={266} r={9} chosen={sc.chosen} />
      <ScaleDotsG x={32} y={140} w={266} r={9} chosen={SCALES[2].chosen} />
      <ScaleDotsG x={32} y={188} w={266} r={9} chosen={SCALES[3].chosen} />
    </g>
  );
}

function CardLine() {
  return (
    <g lang="pt-BR">
      <rect width={CW} height={CH} fill={`url(#${P}-b-rise)`} />
      <FrondG cx={-20} cy={300} r={240} a0={262} a1={380} count={30} len={170} width={7} lean={62} tone="onNavy" opacity={0.55} />
      <MarkG x={24} y={22} size={36} fill="#26CF7B" />
      <text fontSize="22" fontWeight="300" fill="#FFFFFF">
        {LINES.bridge.rows4.map((row, i) => (
          <tspan key={row} x="24" y={116 + i * 28} fontWeight={i === 3 ? 700 : 300} fill={i === 3 ? '#26CF7B' : '#FFFFFF'}>{row}</tspan>
        ))}
      </text>
    </g>
  );
}

const CARDS = [CardCRM, CardAgenda, CardFin, CardScale, CardLine];
const EDGES = ['#0A1230', '#9DA79B', '#0E7B45', '#B8B8B8', '#0A3A44'];

export default function ScenePhone() {
  const W = 1600, H = 900;
  const steps = cascade(5, 520, 478, 1385, -64);
  const phone = { x: 250, y: 112, w: 340 };
  const ph = Math.round(884 * (phone.w / 430));
  const base = phone.y + ph;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Phone with data cards stepping up to the right" exportName="showcase-phone-cards">
      <MaterialDefs idp={P} />
      <BrandDefs idp={`${P}-b`} />
      <SweepG idp={P} w={W} h={H} horizon={0.6} />

      {/* the far card first, so the nearer ones overlap it */}
      {[4, 3, 2, 1, 0].map((k) => {
        const Card = CARDS[k];
        return (
          <StepG key={k} i={k + 1} x={steps[k].x} y={steps[k].y}>
            <ShadowG idp={`${P}-c${k}`} cx={CW / 2} cy={CH + 34} rx={CW * 0.42} opacity={0.14} blur={14} />
            <Slab idp={P} id={`${P}-c${k}`} w={CW} h={CH} edge={EDGES[k]} cast={26} t={9}>
              <Card />
            </Slab>
          </StepG>
        );
      })}

      {/* the phone: hard short shadow on the floor, soft contact shadow, then the device turning to the light */}
      <StepG i={0} x={0} y={0}>
        <path d={`M${phone.x + 10} ${base - 4}H${phone.x + phone.w - 14}L${phone.x + phone.w + 58} ${base + 30}H${phone.x + 64}Z`} fill="#052E25" opacity="0.2" />
        <ShadowG idp={`${P}-ph`} cx={phone.x + phone.w / 2} cy={base + 2} rx={phone.w * 0.48} opacity={0.34} blur={8} />
        <g className="mock-lit">
          <PhoneG idp={`${P}-body`} x={phone.x} y={phone.y} w={phone.w}>
            <ScreenHomeG idp={`${P}-home`} />
          </PhoneG>
          <SheenG idp={P} d={rr(phone.x, phone.y, phone.w, ph, 52)} opacity={0.35} />
        </g>
      </StepG>
    </Art>
  );
}
