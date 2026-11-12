// Construction diagram (rebuild of slide m10 with measurements), clear space and minimum sizes.
import Art from '@/components/art/Art';
import { MARK, MarkG, LockupStackG, LockupG, WordmarkG } from '@/components/art/Mark';
import { r2 } from '@/lib/charts';
import { C, RATIOS, Furniture, Rings, U_STACK } from './Parts';

const S = 4.2; // px per mark unit in the construction plate
const X0 = 290;
const Y0 = 170;
const px = (u, v) => [r2(X0 + u * S), r2(Y0 + v * S)];
const INK = C.navy;

// One measured radius: a thin line from a centre to its arc, a tick at the arc, and the value in U.
function Radius({ c, r, to, units, at = 0.5, side = 1 }) {
  const a = Math.atan2(to[1] - c.cy, to[0] - c.cx);
  const [x1, y1] = px(c.cx, c.cy);
  const [x2, y2] = px(c.cx + r * Math.cos(a), c.cy + r * Math.sin(a));
  const lx = r2(x1 + (x2 - x1) * at);
  const ly = r2(y1 + (y2 - y1) * at);
  const tx = -Math.sin(a) * 5 * side;
  const ty = Math.cos(a) * 5 * side;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth="1.4" />
      <line x1={r2(x2 - ty * 1.6)} y1={r2(y2 + tx * 1.6)} x2={r2(x2 + ty * 1.6)} y2={r2(y2 - tx * 1.6)} stroke={INK} strokeWidth="2" />
      <text x={lx} y={ly} dx={tx * 2.2} dy={ty * 2.2 + 5} textAnchor="middle" fontSize="15" fontWeight="700" fill={INK} stroke={C.gray} strokeWidth="4" paintOrder="stroke" className="wide">
        {units} U
      </text>
    </g>
  );
}

function Centre({ c, name, anchor = 'start', dx = 16, dy = -14 }) {
  const [x, y] = px(c.cx, c.cy);
  return (
    <g fill={INK}>
      <circle cx={x} cy={y} r="6" />
      <path d={`M${x - 14} ${y}H${x + 14}M${x} ${y - 14}V${y + 14}`} stroke={INK} strokeWidth="1.6" fill="none" />
      <text x={x + dx} y={y + dy} textAnchor={anchor} fontSize="17" fontWeight="700" stroke={C.gray} strokeWidth="4" paintOrder="stroke" className="wide">
        {name}
      </text>
      <text x={x + dx} y={y + dy + 19} textAnchor={anchor} fontSize="13" fontWeight="500" stroke={C.gray} strokeWidth="4" paintOrder="stroke">
        {`(${c.cx}, ${c.cy})`}
      </text>
    </g>
  );
}

export function ConstructionPlate() {
  const [bx, by] = px(MARK.B.cx, MARK.B.cy);
  const u = r2(MARK.U * S);
  const legend = RATIOS;
  return (
    <Art viewBox="0 0 1000 1000" title="Construction of the mark with measurements" exportName="logo-construction">
      <rect width="1000" height="1000" fill={C.gray} />
      <Rings x={X0} y={Y0} size={100 * S} max={10} stroke="#4A5568" width={0.1} />
      <MarkG x={X0} y={Y0} size={100 * S} fill="#A3A3A3" />
      {/* measured radii */}
      <Radius c={MARK.UL} r={MARK.flankOuter} to={[0, 47.39]} units={RATIOS[0].units} at={0.52} />
      <Radius c={MARK.UL} r={MARK.flankInner} to={[9.34, 67.72]} units={RATIOS[1].units} at={0.8} side={-1} />
      <Radius c={MARK.UR} r={MARK.flankOuter} to={[100, 47.39]} units={RATIOS[0].units} at={0.52} />
      <Radius c={MARK.UR} r={MARK.flankInner} to={[90.66, 67.72]} units={RATIOS[1].units} at={0.8} />
      <Radius c={MARK.B} r={MARK.topInner} to={[60.44, 27.34]} units={RATIOS[2].units} at={0.4} side={-1} />
      <Radius c={MARK.B} r={MARK.topOuter} to={[75.27, 8.38]} units={RATIOS[3].units} at={0.8} />
      <Radius c={MARK.B} r={MARK.barOuter} to={[85.16, 75.41]} units={RATIOS[5].units} at={0.62} />
      <Radius c={MARK.B} r={MARK.barInner} to={[72.53, 94.09]} units={RATIOS[4].units} at={0.45} side={-1} />
      <Centre c={MARK.UL} name="UL" />
      <Centre c={MARK.UR} name="UR" anchor="end" dx={-16} />
      <Centre c={MARK.B} name="B" anchor="end" dx={-18} dy={34} />
      {/* ring unit ruler along the horizontal through B */}
      <g stroke={INK} strokeWidth="2" fill="none">
        <path d={`M${bx} ${by}H${r2(bx + u * 4)}`} />
        {[0, 1, 2, 3, 4].map((k) => (
          <path key={k} d={`M${r2(bx + u * k)} ${by - 10}V${by + 10}`} />
        ))}
      </g>
      {[1, 2, 3, 4].map((k) => (
        <text key={k} x={r2(bx + u * (k - 0.5))} y={by + 30} textAnchor="middle" fontSize="14" fontWeight="700" fill={INK} stroke={C.gray} strokeWidth="4" paintOrder="stroke" className="wide">
          {k === 1 ? 'U' : `${k}`}
        </text>
      ))}
      <text x={r2(bx + u * 4 + 16)} y={by + 5} fontSize="14" fontWeight="500" fill={INK} stroke={C.gray} strokeWidth="4" paintOrder="stroke">
        {`U = ${MARK.U}`}
      </text>
      {/* legend */}
      <g>
        <rect x="24" y="838" width="420" height="140" fill={C.gray} opacity="0.94" />
        <text x="32" y="860" fontSize="14" fontWeight="700" fill={INK} letterSpacing="0.8">RADII IN UNITS OF U (MARK BOX = 100)</text>
        {legend.map((l, i) => (
          <text key={l.key} x="32" y={884 + i * 18} fontSize="14" fill={INK}>
            {`${l.units} U   ${l.label}   about ${l.centre}   (${l.r})`}
          </text>
        ))}
      </g>
      <Furniture w={1000} h={1000} tl="CONSTRUCTION OF THE MARK" tr={`RING UNIT U = ${MARK.U}`} br="CENTRES: UL, UR, B" fill={INK} />
    </Art>
  );
}

const LOCKUP_TX = 160;
const LOCKUP_TY = 284;
const VB = { l: LOCKUP_TX + 26, r: LOCKUP_TX + 454, t: LOCKUP_TY + 6, b: LOCKUP_TY + 230 };

function Dim({ x1, y1, x2, y2, lx, ly }) {
return (
  <g stroke={INK} strokeWidth="1.6" fill="none">
    <path d={`M${x1} ${y1}L${x2} ${y2}`} />
    {x1 === x2 ? (
      <>
        <path d={`M${x1 - 8} ${y1}H${x1 + 8}M${x2 - 8} ${y2}H${x2 + 8}`} />
      </>
    ) : (
      <path d={`M${x1} ${y1 - 8}V${y1 + 8}M${x2} ${y2 - 8}V${y2 + 8}`} />
    )}
    <text x={lx} y={ly} textAnchor="middle" fontSize="17" fontWeight="700" fill={INK} stroke="none" className="wide">3 U</text>
  </g>
);
}

export function ClearSpacePlate() {
  const X = r2(U_STACK * 3);
  const o = { l: VB.l - X, r: VB.r + X, t: VB.t - X, b: VB.b + X };
  const cy = (VB.t + VB.b) / 2;
  const cx = (VB.l + VB.r) / 2;
  return (
    <Art viewBox="0 0 800 800" title="Clear space around the stacked lockup" exportName="logo-clear-space">
      <rect width="800" height="800" fill={C.slide} />
      <path
        fillRule="evenodd"
        d={`M${o.l} ${o.t}H${o.r}V${o.b}H${o.l}ZM${VB.l} ${VB.t}V${VB.b}H${VB.r}V${VB.t}Z`}
        fill={C.green}
        opacity="0.16"
      />
      <rect x={o.l} y={o.t} width={o.r - o.l} height={o.b - o.t} fill="none" stroke={C.green} strokeWidth="2" strokeDasharray="8 6" />
      <rect x={VB.l} y={VB.t} width={VB.r - VB.l} height={VB.b - VB.t} fill="none" stroke={INK} strokeWidth="1" strokeDasharray="3 4" />
      <LockupStackG x={LOCKUP_TX} y={LOCKUP_TY} fill={INK} />
      {/* unit blocks: three squares of one U on the left and on the top */}
      {[0, 1, 2].map((k) => (
        <g key={k} fill="none" stroke={C.green} strokeWidth="2">
          <rect x={r2(o.l + k * U_STACK)} y={r2(cy - U_STACK / 2)} width={U_STACK} height={U_STACK} />
          <rect x={r2(cx - U_STACK / 2)} y={r2(o.t + k * U_STACK)} width={U_STACK} height={U_STACK} />
        </g>
      ))}
      <Dim x1={o.l} y1={cy + 56} x2={VB.l} y2={cy + 56} lx={r2((o.l + VB.l) / 2)} ly={cy + 82} />
      <Dim x1={o.r} y1={cy + 56} x2={VB.r} y2={cy + 56} lx={r2((o.r + VB.r) / 2)} ly={cy + 82} />
      <Dim x1={cx + 120} y1={o.t} x2={cx + 120} y2={VB.t} lx={cx + 150} ly={r2((o.t + VB.t) / 2 + 6)} />
      <Dim x1={cx + 120} y1={o.b} x2={cx + 120} y2={VB.b} lx={cx + 150} ly={r2((o.b + VB.b) / 2 + 6)} />
      <Furniture w={800} h={800} tl="CLEAR SPACE" tr={`1 U = ${U_STACK} AT THIS SIZE`} bl="3 U ON EVERY SIDE" br="WORKING RECOMMENDATION" />
    </Art>
  );
}

// Four minimum-size plates: each shows the item at 1 unit = 1 px, with its width marked.
const MIN = [
  { id: 'stacked', title: 'Minimum size of the stacked lockup', label: '160 PX WIDE', w: 160 },
  { id: 'horizontal', title: 'Minimum size of the horizontal lockup', label: '120 PX WIDE', w: 120 },
  { id: 'mark', title: 'Minimum size of the mark', label: '16 PX WIDE', w: 16 },
  { id: 'word', title: 'Minimum size of the word-mark', label: '12 PX TYPE SIZE', w: 73 },
];

function MinItem({ id }) {
  if (id === 'stacked') return <LockupStackG x={40} y={80} scale={160 / 480} fill={INK} />;
  if (id === 'horizontal') return <LockupG x={60} y={110} scale={120 / 400} fill={INK} />;
  if (id === 'mark') return <MarkG x={112} y={106} size={16} fill={C.green} />;
  return <WordmarkG x={120} y={124} size={12} anchor="middle" fill={INK} />;
}

export function MinSizePlates() {
  return MIN.map((m) => (
    <Art key={m.id} viewBox="0 0 240 240" title={m.title} exportName={`logo-min-${m.id}`}>
      <rect width="240" height="240" fill={C.slide} />
      <MinItem id={m.id} />
      <path d={`M${120 - m.w / 2} 176h${m.w}M${120 - m.w / 2} 172v8M${120 + m.w / 2} 172v8`} stroke={INK} strokeWidth="1" fill="none" />
      <Furniture w={240} h={240} tl="MINIMUM SIZE" bl={m.label} size={9} m={14} />
    </Art>
  ));
}
