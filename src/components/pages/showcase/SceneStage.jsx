// Scene 4 (21:9): the event stage with the brand on screen, as the booth of the case study (m30) seen slightly
// from the left. Panels step back to the right and are cropped at the right edge. The portrait of the source
// is not reproduced: the navy panel carries the mark crop instead.
import Art from '@/components/art/Art';
import { SweepG, ShadowG, CastG, MaterialDefs, StepG } from '@/components/art/Mockup';
import { FrondG } from '@/components/art/KeyArt';
import { MarkG, LockupG, LockupStackG } from '@/components/art/Mark';
import { LINES } from '@/lib/brand';
import { r2 } from '@/lib/charts';

const P = 'showcase-s5';
const W = 2100, H = 900;
// One-point perspective: walls recede to a vanishing point far to the right of the frame.
const VPX = 5200, VPY = 360, X0 = 70, Y0 = 776, C = 0.00032;
const sc = (t) => 1 / (1 + C * t);
const PX = (t) => VPX + (X0 - VPX) * sc(t);
const PY = (t, h, z = 0) => VPY + (Y0 - z - h - VPY) * sc(t);
const pt = (t, h, z = 0) => `${r2(PX(t))} ${r2(PY(t, h, z))}`;
const quad = (t0, t1, h, z = 0) => `M${pt(t0, h, z)}L${pt(t1, h, z)}L${pt(t1, 0, z)}L${pt(t0, 0, z)}Z`;
// An affine fit of a panel: local (u, v) with v from the top, u along the wall.
function fit(t0, t1, h, z = 0) {
  const w = t1 - t0;
  const a = (PX(t1) - PX(t0)) / w, b = (PY(t1, h, z) - PY(t0, h, z)) / w, d = (sc(t0) + sc(t1)) / 2;
  return `matrix(${r2(a * 1e3) / 1e3} ${r2(b * 1e3) / 1e3} 0 ${r2(d * 1e3) / 1e3} ${r2(PX(t0))} ${r2(PY(t0, h, z))})`;
}

const FLOOR = 120; // how far the deck reaches in front of the wall (scale 1)

function Panel({ id, t0, t1, h, z = 0, fill, children }) {
  return (
    <g>
      <clipPath id={`${P}-${id}-clip`}><path d={quad(t0, t1, h, z)} /></clipPath>
      <g clipPath={`url(#${P}-${id}-clip)`}>
        <g transform={fit(t0, t1, h, z)}>
          <rect width={t1 - t0} height={h} fill={fill} />
          {children}
          <rect width={t1 - t0} height={h} fill={`url(#${P}-wall-shade)`} />
        </g>
      </g>
      <path d={`M${pt(t0, 0, z)}L${pt(t0, h, z)}L${pt(t1, h, z)}`} fill="none" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="2" />
    </g>
  );
}

const Strong = ({ children, fill }) => <tspan fontWeight="700" fill={fill}>{children}</tspan>;

export default function SceneStage() {
  const tb = [-80, 560, 1500, 2300];
  const deckBack = [pt(tb[0], 0, 48), pt(tb[3], 0, 48)];
  const deckFront = [`${r2(PX(tb[0]))} ${r2(PY(tb[0], -FLOOR))}`, `${r2(PX(tb[3]))} ${r2(PY(tb[3], -FLOOR))}`];
  const deck = `M${deckBack[0]}L${deckBack[1]}L${deckFront[1]}L${deckFront[0]}Z`;
  const lip = (t) => `${r2(PX(t))} ${r2(PY(t, -FLOOR) + 26 * sc(t))}`;
  const deckEdge = `M${deckFront[0]}L${deckFront[1]}L${lip(tb[3])}L${lip(tb[0])}Z`;

  // the counter stands in front of the green wall
  const cT0 = 1000, cT1 = 1300, cH = 250, cz = -84;
  const k = sc((cT0 + cT1) / 2);
  const cD = 64; // the counter's depth: in this camera depth reads as height on the page, as on the deck

  const stool = (t, f = 1) => {
    const s = sc(t), x = PX(t), yb = PY(t, 0, -100), y = yb - 118 * s;
    return (
      <g key={t}>
        <ShadowG idp={`${P}-st${t}`} cx={x} cy={yb + 3} rx={30 * s * f} ry={4 * s} opacity={0.35} blur={3} />
        <g stroke="#1D1D1B" strokeWidth={3 * s} fill="none">
          <path d={`M${r2(x - 20 * s)} ${r2(y)}L${r2(x - 28 * s)} ${r2(yb)}M${r2(x + 20 * s)} ${r2(y)}L${r2(x + 28 * s)} ${r2(yb)}M${r2(x)} ${r2(y)}V${r2(yb)}`} />
          <ellipse cx={x} cy={yb - 44 * s} rx={22 * s} ry={5 * s} />
        </g>
        <ellipse cx={x} cy={y} rx={30 * s} ry={8 * s} fill="#2A2D30" />
        <ellipse cx={x - 6 * s} cy={y - 1.5 * s} rx={20 * s} ry={4 * s} fill="#FFFFFF" opacity="0.16" />
      </g>
    );
  };
  const tT = 1700;
  const ts = sc(tT), tx = PX(tT), tyb = PY(tT, 0, -50), tyTop = tyb - 215 * ts;

  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Event stage with the brand on screen: navy panel, green wall, navy side wall and counter" exportName="showcase-event-stage">
      <MaterialDefs idp={P} />
      <defs>
        <linearGradient id={`${P}-wall-shade`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.14" />
          <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id={`${P}-deck`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3A3D40" />
          <stop offset="0.5" stopColor="#26282A" />
          <stop offset="1" stopColor="#1D1D1B" />
        </linearGradient>
      </defs>
      <SweepG idp={P} w={W} h={H} horizon={0.8} />

      <StepG i={3} x={0} y={0}>
        <CastG d={deckEdge} depth={30} opacity={0.2} />
        <path d={deck} fill={`url(#${P}-deck)`} />
        <path d={deckEdge} fill="#0E0E0D" />
        <path d={`M${deckFront[0]}L${deckFront[1]}`} stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="2" />
      </StepG>

      {/* wall panels, the farthest first; each steps back from the one before */}
      <StepG i={2} x={0} y={0}>
        <Panel id="c" t0={tb[2]} t1={tb[3]} h={640} z={48} fill="#162557">
          <MarkG x={420} y={-90} size={600} fill="#1B2E70" />
          <LockupStackG x={140} y={235} scale={0.92} fill="#FFFFFF" />
        </Panel>
      </StepG>
      <StepG i={1} x={0} y={0}>
        <Panel id="b" t0={tb[1]} t1={tb[2]} h={570} z={24} fill="#26CF7B">
          {Array.from({ length: 5 }, (_, i) => <rect key={i} x={(i + 1) * 156} y="0" width="2" height="570" fill="#052E25" opacity="0.18" />)}
          <rect x="300" width="90" height="570" fill="#FFFFFF" opacity="0.07" />
          <FrondG cx={480} cy={400} r={215} a0={292} a1={96} count={46} len={240} width={13} lean={64} tone="onGreen" />
          <MarkG x={44} y={42} size={74} fill="#052E25" />
          <text textAnchor="end" fontSize="24" fontWeight="300" fill="#052E25" lang="pt-BR">
            {LINES.bridge.rows4.slice(0, 3).map((row, i) => <tspan key={row} x="900" y={66 + i * 31}>{row}</tspan>)}
            <tspan x="900" y={66 + 3 * 31} fontWeight="700">{LINES.bridge.strong}</tspan>
          </text>
        </Panel>
      </StepG>
      <StepG i={0} x={0} y={0}>
        <Panel id="a" t0={tb[0] + 80} t1={tb[1]} h={570} fill="#162557">
          <MarkG x={190} y={-10} size={600} fill="#1B2E70" />
          <text x="36" y="46" fontSize="18" fontWeight="300" fill="#FFFFFF">UpCanopy</text>
          <text fontSize="29" fontWeight="300" fill="#FFFFFF" lang="pt-BR">
            <tspan x="36" y="440">Deixe de ser &apos;faz-tudo&apos;</tspan>
            <tspan x="36" y="474">e torne-se o <Strong fill="#FFFFFF">CEO</Strong></tspan>
            <tspan x="36" y="508">da sua empresa</tspan>
            <tspan x="36" y="542">de <Strong fill="#FFFFFF">Hardscape</Strong></tspan>
          </text>
        </Panel>
      </StepG>

      {/* counter with the horizontal lockup, a bar table and two stools */}
      <StepG i={4} x={0} y={0}>
        <CastG d={quad(cT0, cT1, cH, cz)} depth={34} opacity={0.24} />
        <ShadowG idp={`${P}-ct`} cx={PX((cT0 + cT1) / 2)} cy={PY((cT0 + cT1) / 2, 0, cz) + 4} rx={150 * k} ry={9 * k} opacity={0.4} blur={6} />
        <path d={`M${pt(cT0, cH, cz)}L${pt(cT1, cH, cz)}L${pt(cT1, cH, cz + cD)}L${pt(cT0, cH, cz + cD)}Z`} fill="#3D52A8" />
        <path d={`M${pt(cT0, cH, cz + cD)}L${pt(cT1, cH, cz + cD)}`} stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="1.5" />
        <path d={quad(cT0, cT1, cH, cz)} fill="#162557" />
        <g clipPath={`url(#${P}-ct-clip)`}>
          <clipPath id={`${P}-ct-clip`}><path d={quad(cT0, cT1, cH, cz)} /></clipPath>
          <g transform={fit(cT0, cT1, cH, cz)}>
            <rect width={cT1 - cT0} height={cH} fill={`url(#${P}-wall-shade)`} />
            <LockupG x={30} y={104} scale={0.58} fill="#FFFFFF" />
          </g>
        </g>
        <path d={`M${pt(cT0, 0, cz)}L${pt(cT0, cH, cz)}L${pt(cT1, cH, cz)}`} fill="none" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="2" />
        {stool(1560)}
        {stool(1850)}
        <g>
          <ShadowG idp={`${P}-tb`} cx={tx} cy={tyb + 3} rx={40 * ts} ry={5 * ts} opacity={0.3} blur={3} />
          <path d={`M${r2(tx)} ${r2(tyTop)}V${r2(tyb)}`} stroke="#1D1D1B" strokeWidth={5 * ts} />
          <ellipse cx={tx} cy={tyb} rx={36 * ts} ry={7 * ts} fill="#1D1D1B" />
          <ellipse cx={tx} cy={tyTop} rx={58 * ts} ry={13 * ts} fill="#2A2D30" />
          <ellipse cx={tx - 10 * ts} cy={tyTop - 2 * ts} rx={36 * ts} ry={6 * ts} fill="#FFFFFF" opacity="0.18" />
        </g>
      </StepG>
    </Art>
  );
}
