// Scene 3 (1:1 pair): plinths in front view, stepping up (laptop) and stepping down (puck) with a little depth
// to the upper right. One SVG each: sweep, shadows, objects, materials, shading and the brand artwork.
import Art from '@/components/art/Art';
import { SweepG, ShadowG, CastG, MaterialDefs, StepG, SheenG, cascade } from '@/components/art/Mockup';
import { LaptopG, ScreenAppG, WatchG, ScreenWatchG } from '@/components/art/Devices';
import { BrandDefs, FrondG } from '@/components/art/KeyArt';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { LINES, PEOPLE, CONTACT } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { Box, OBL, rr, Slab, topMatrix, WIDE } from './parts';

const PLASTER = { front: '#E8EFE4', top: '#FBFFF6', side: '#BCC8B8' };

// The outline of a Box as one path, for its cast shadow.
const silhouette = (x, y, w, h, d) => {
  const dx = r2(d * OBL.x), dy = r2(d * OBL.y);
  return `M${x} ${y}L${x + dx} ${y + dy}H${x + w + dx}V${y + h + dy}L${x + w} ${y + h}H${x}Z`;
};

function Plinth({ idp, x, y, w, h, d = 150 }) {
  return (
    <g>
      <CastG d={silhouette(x, y, w, h, d)} depth={46} opacity={0.2} />
      <Box x={x} y={y} w={w} h={h} d={d} {...PLASTER} idp={idp}>
        <path d={`M${x} ${y + h - 14}H${x + w}`} stroke="#000000" strokeOpacity="0.06" strokeWidth="2" />
      </Box>
    </g>
  );
}

// A stack of business cards (as the case study's two stacks on the navy table): a thin block, the card on top.
function CardStack({ x, y, w = 150, d = 90, t = 24, kind = 'navy' }) {
  const navy = kind === 'navy';
  const face = navy ? '#162557' : '#26CF7B';
  const front = navy ? '#0F1C45' : '#1CB468';
  const side = navy ? '#0A1230' : '#0F8A4D';
  const L = d * 1.1; // depth units of the card's local space
  return (
    <g>
      <CastG d={`M${x} ${y}h${w}v${t}h${-w}Z`} depth={16} opacity={0.2} />
      <Box x={x} y={y} w={w} h={t} d={d} front={front} top={face} side={side}>
        {[1, 2, 3].map((k) => (
          <path key={k} d={`M${x} ${y + (t * k) / 4}H${x + w}`} stroke="#FFFFFF" strokeOpacity="0.16" strokeWidth="1" />
        ))}
        <g transform={topMatrix(x, y, d, L)}>
          {navy ? (
            <MarkG x={w / 2 - 22} y={L / 2 - 22} size={44} fill="#26CF7B" />
          ) : (
            <g fill="#052E25">
              <text x="8" y="22" fontSize="11" fontWeight="700" style={WIDE} className="wide">{PEOPLE.founder.name}</text>
              <text x="8" y="36" fontSize="9">{PEOPLE.founder.role}</text>
              <text x="8" y={L - 24} fontSize="9">{CONTACT.handle}</text>
              <text x="8" y={L - 12} fontSize="9">{CONTACT.phone}</text>
              <text x={w - 8} y="22" fontSize="12" fontWeight="500" textAnchor="end" style={WIDE} className="wide">UpCanopy</text>
            </g>
          )}
        </g>
      </Box>
    </g>
  );
}

// The navy document box with the gradient lid, its mark, the line and the big word-mark along the front edge.
function DocBox({ idp, x, y, w = 330, h = 66, d = 210 }) {
  const L = d * 1.15;
  return (
    <g>
      <CastG d={`M${x} ${y}h${w}v${h}h${-w}Z`} depth={26} opacity={0.22} />
      <Box x={x} y={y} w={w} h={h} d={d} front="#162557" top="#1C5C66" side="#0B1438">
        <path d={`M${x} ${y + 12}H${x + w}`} stroke="#26CF7B" strokeOpacity="0.5" strokeWidth="2" />
        <g transform={topMatrix(x, y, d, L)}>
          <rect width={w} height={L} fill={`url(#${idp}-rise)`} />
          <FrondG cx={w + 10} cy={-30} r={150} a0={95} a1={200} count={26} len={170} width={8} lean={-60} tone="onNavy" opacity={0.45} />
          <MarkG x={16} y={14} size={34} fill="#26CF7B" />
          <text fontSize="13" fontWeight="300" fill="#FFFFFF" lang="pt-BR">
            <tspan x={w - 16} y="26" textAnchor="end">A ponte entre o trabalho</tspan>
            <tspan x={w - 16} y="42" textAnchor="end">manual e a maturidade</tspan>
            <tspan x={w - 16} y="58" textAnchor="end">empresarial chama-se</tspan>
            <tspan x={w - 16} y="74" textAnchor="end" fontWeight="700" fill="#26CF7B">{LINES.bridge.strong}</tspan>
          </text>
          <WordmarkG x={16} y={L - 18} size={78} fill="#FFFFFF" />
        </g>
      </Box>
    </g>
  );
}

export function ScenePlinths() {
  const P = 'showcase-s3';
  const W = 1200, H = 1200;
  const spots = cascade(3, -10, 1110, 940, 1030); // base line of each plinth, stepping back as they rise
  const hs = [250, 440, 620];
  const ws = [340, 470, 400];
  const tops = spots.map((s, i) => s.y - hs[i]);
  const lap = { x: spots[1].x + 14 + 38, w: 450 };
  const lapH = Math.round(1016 * (lap.w / 1840));
  const lapY = tops[1] - 10 - lapH + 4;
  const lid = { x: lap.x + 170 * (lap.w / 1840), w: 1500 * (lap.w / 1840), h: 960 * (lap.w / 1840) };
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Laptop on a plinth, with business cards and the document box on plinths of rising height" exportName="showcase-laptop-plinth">
      <MaterialDefs idp={P} />
      <BrandDefs idp={`${P}-b`} />
      <SweepG idp={P} w={W} h={H} horizon={0.64} />

      <StepG i={2} x={0} y={0}>
        <ShadowG idp={`${P}-b3`} cx={spots[2].x + ws[2] / 2 + 60} cy={spots[2].y + 8} rx={ws[2] * 0.62} opacity={0.24} blur={12} />
        <Plinth idp={P} x={spots[2].x} y={tops[2]} w={ws[2]} h={hs[2]} />
        <DocBox idp={`${P}-b`} x={spots[2].x + 24} y={tops[2] - 8 - 66 + 4} />
      </StepG>

      <StepG i={1} x={0} y={0}>
        <ShadowG idp={`${P}-b2`} cx={spots[1].x + ws[1] / 2 + 60} cy={spots[1].y + 8} rx={ws[1] * 0.62} opacity={0.26} blur={12} />
        <Plinth idp={P} x={spots[1].x} y={tops[1]} w={ws[1]} h={hs[1]} />
        <g className="mock-lit">
          <ShadowG idp={`${P}-lap`} cx={lap.x + lap.w / 2 + 14} cy={lapY + lapH + 2} rx={lap.w * 0.5} ry={10} opacity={0.34} blur={6} />
          <path d={`M${lap.x + lap.w * 0.96} ${lapY + lapH - 6}l${lap.w * 0.16} -26v10l-${lap.w * 0.12} 22Z`} fill="#052E25" opacity="0.18" />
          <LaptopG idp={`${P}-laptop`} x={lap.x} y={lapY} w={lap.w}>
            <ScreenAppG idp={`${P}-app`} />
          </LaptopG>
          <SheenG idp={P} d={rr(lid.x, lapY + 6, lid.w, lid.h, 6)} opacity={0.4} />
        </g>
      </StepG>

      <StepG i={0} x={0} y={0}>
        <ShadowG idp={`${P}-b1`} cx={spots[0].x + ws[0] / 2 + 60} cy={spots[0].y + 8} rx={ws[0] * 0.62} opacity={0.28} blur={12} />
        <Plinth idp={P} x={spots[0].x} y={tops[0]} w={ws[0]} h={hs[0]} />
        <CardStack x={spots[0].x + 22} y={tops[0] - 6} kind="navy" />
        <CardStack x={spots[0].x + 172} y={tops[0] - 26} kind="green" />
      </StepG>
    </Art>
  );
}

// Second square plate of the family: the puck, a watch and the mark tile on plinths stepping down to the right.
export function ScenePuck() {
  const P = 'showcase-s4';
  const W = 1200, H = 1200;
  const spots = cascade(3, -60, 1110, 800, 1020);
  const hs = [660, 450, 260];
  const ws = [480, 340, 330];
  const tops = spots.map((s, i) => s.y - hs[i]);
  const dx = 75;
  const cx0 = spots[0].x + ws[0] / 2 + dx / 2, cy0 = tops[0] - 22;
  const cx1 = spots[1].x + ws[1] / 2 + dx / 2;
  const cx2 = spots[2].x + ws[2] / 2 + dx / 2;
  const R = 150, T = 62;
  const ell = (cx, cy, rx, ry) => `M${cx - rx} ${cy}A${rx} ${ry} 0 1 0 ${cx + rx} ${cy}A${rx} ${ry} 0 1 0 ${cx - rx} ${cy}Z`;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Puck, watch and mark tile on plinths stepping down to the right" exportName="showcase-puck-plinth">
      <MaterialDefs idp={P} />
      <defs>
        <filter id={`${P}-glow`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>
      <SweepG idp={P} w={W} h={H} horizon={0.66} />

      <StepG i={2} x={0} y={0}>
        <ShadowG idp={`${P}-b3`} cx={spots[2].x + ws[2] / 2 + 60} cy={spots[2].y + 8} rx={ws[2] * 0.62} opacity={0.24} blur={12} />
        <Plinth idp={P} x={spots[2].x} y={tops[2]} w={ws[2]} h={hs[2]} />
        <g transform={`translate(${cx2 - 80} ${tops[2] - 150})`}>
          <ShadowG idp={`${P}-tile`} cx={80} cy={152} rx={96} ry={9} opacity={0.3} blur={6} />
          <Slab idp={P} id={`${P}-tile`} w={160} h={150} edge="#0A1230" cast={16} t={8}>
            <rect width="160" height="150" fill="#162557" />
            <MarkG x={34} y={30} size={92} fill="#26CF7B" />
          </Slab>
        </g>
      </StepG>

      <StepG i={1} x={0} y={0}>
        <ShadowG idp={`${P}-b2`} cx={spots[1].x + ws[1] / 2 + 60} cy={spots[1].y + 8} rx={ws[1] * 0.62} opacity={0.26} blur={12} />
        <Plinth idp={P} x={spots[1].x} y={tops[1]} w={ws[1]} h={hs[1]} />
        <g className="mock-lit">
          <ShadowG idp={`${P}-watch`} cx={cx1} cy={tops[1] - 4} rx={64} ry={8} opacity={0.32} blur={6} />
          <WatchG idp={`${P}-wa`} x={cx1 - 85} y={tops[1] - 4 - 347} w={170}>
            <ScreenWatchG />
          </WatchG>
        </g>
      </StepG>

      <StepG i={0} x={0} y={0}>
        <ShadowG idp={`${P}-b1`} cx={spots[0].x + ws[0] / 2 + 60} cy={spots[0].y + 8} rx={ws[0] * 0.62} opacity={0.28} blur={12} />
        <Plinth idp={P} x={spots[0].x} y={tops[0]} w={ws[0]} h={hs[0]} />
        <g className="mock-lit">
          <CastG d={ell(cx0, cy0, R, R * 0.3)} depth={30} opacity={0.24} />
          <ShadowG idp={`${P}-puck`} cx={cx0} cy={cy0 + 4} rx={R * 0.98} ry={14} opacity={0.3} blur={7} />
          {/* body: the side wall, then the rim ellipse, then the navy top disc with the glowing mark */}
          <path d={`M${cx0 - R} ${cy0 - T}V${cy0}A${R} ${R * 0.3} 0 0 0 ${cx0 + R} ${cy0}V${cy0 - T}Z`} fill={`url(#${P}-plastic)`} />
          <path d={`M${cx0 - R} ${cy0 - T}V${cy0}A${R} ${R * 0.3} 0 0 0 ${cx0 + R} ${cy0}V${cy0 - T}Z`} fill={`url(#${P}-shade)`} />
          <ellipse cx={cx0} cy={cy0 - T} rx={R} ry={R * 0.3} fill="#F4F8EF" />
          <ellipse cx={cx0} cy={cy0 - T} rx={R * 0.82} ry={R * 0.246} fill="#162557" />
          <ellipse cx={cx0} cy={cy0 - T} rx={R * 0.82} ry={R * 0.246} fill={`url(#${P}-glass)`} opacity="0.5" />
          <g transform={`translate(${cx0} ${cy0 - T}) scale(1 0.3)`}>
            <g filter={`url(#${P}-glow)`} opacity="0.9"><MarkG x={-34} y={-34} size={68} fill="#26CF7B" /></g>
            <MarkG x={-34} y={-34} size={68} fill="#26CF7B" />
          </g>
          <path d={`M${cx0 - R} ${cy0 - T}A${R} ${R * 0.3} 0 0 1 ${cx0 + R * 0.2} ${cy0 - T - R * 0.3}`} fill="none" stroke="#FFFFFF" strokeOpacity="0.8" strokeWidth="2" />
        </g>
      </StepG>
    </Art>
  );
}
