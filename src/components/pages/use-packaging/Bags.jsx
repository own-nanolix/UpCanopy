// Shopping bags: three colourways of one bag, rising in height and stepping to the right, the last cropped.
import { StepG, CastG, ShadowG, cascade } from '@/components/art/Mockup';
import { MarkG, MarkCropG, LockupStackG } from '@/components/art/Mark';
import { r2 } from '@/lib/charts';
import { Plate, C, lighten, darken } from './parts';

const WAYS = [
  { key: 'navy', name: 'Navy shopping bag', base: C.navy, rope: C.mint },
  { key: 'green', name: 'Green Park shopping bag', base: C.green, rope: C.navy },
  { key: 'mint', name: 'Mint shopping bag', base: C.mint, rope: C.navy },
];

// One rope handle: dark rope with a twisted lighter strand, ends passing through eyelets.
function Handle({ m, x1, x2, y, lift, rope, back }) {
  const d = `M${x1} ${y}C${x1} ${y - lift} ${x2} ${y - lift} ${x2} ${y}`;
  const c = back ? darken(rope, 0.25) : rope;
  return (
    <g>
      <path d={d} fill="none" stroke="#000" strokeOpacity="0.22" strokeWidth="7" transform="translate(3 4)" />
      <path d={d} fill="none" stroke={darken(c, 0.25)} strokeWidth="6" />
      <path d={d} fill="none" stroke={lighten(c, 0.35)} strokeWidth="2.6" strokeDasharray="3 4" />
      {[x1, x2].map((x) => (
        <g key={x}>
          <circle cx={x} cy={y} r="7.5" fill={`url(#${m}-metal)`} stroke="#000" strokeOpacity="0.35" />
          <circle cx={x} cy={y} r="3" fill={C.asphalt} />
          <circle cx={x - 2} cy={y - 2.5} r="1.2" fill="#fff" opacity="0.8" />
        </g>
      ))}
    </g>
  );
}

// A bag standing on its front-bottom-left corner at (0, 0); width w, height h, gusset depth to the back right.
function Bag({ id, m, b, way, w, h }) {
  const dx = w * 0.24, dy = -w * 0.12, lip = 30;
  const base = way.base, mint = way.key === 'mint';
  const sideC = darken(base, mint ? 0.2 : 0.34), frontC = base;
  const front = `M0 0H${w}V${-h}H0Z`;
  const side = `M${w} 0L${w + dx} ${dy}L${w + dx} ${-h + dy}L${w} ${-h}Z`;
  const top = `M0 ${-h}L${w} ${-h}L${w + dx} ${-h + dy}L${dx} ${-h + dy}Z`;
  const silh = `M0 0H${w}L${w + dx} ${dy}V${-h + dy}L${dx} ${-h + dy}L0 ${-h}Z`;
  const eyY = -h + lip / 2;
  return (
    <g>
      <ShadowG idp={`${id}-sh`} cx={w * 0.55} cy={4} rx={w * 0.7} ry={14} opacity={0.34} />
      <CastG d={silh} depth={30} opacity={0.2} />
      {/* back handle, behind the bag */}
      <Handle m={m} x1={dx + w * 0.3} x2={dx + w * 0.7} y={-h + dy + lip / 2} lift={h * 0.34} rope={way.rope} back />
      {/* inside of the mouth, seen over the front edge */}
      <path d={top} fill={darken(base, 0.55)} />
      <path d={`M${dx} ${-h + dy}L${w + dx} ${-h + dy}L${w + dx} ${-h + dy + 8}L${dx} ${-h + dy + 8}Z`} fill="#000" opacity="0.25" />
      {/* gusset with its V fold and centre crease */}
      <path d={side} fill={sideC} filter={`url(#${m}-paper)`} />
      <clipPath id={`${id}-gc`}><path d={side} /></clipPath>
      <g clipPath={`url(#${id}-gc)`}>
        <path d={`M${w} ${-h}L${w + dx / 2} ${-h * 0.62 + dy / 2}L${w + dx} ${-h + dy}`} fill="none" stroke="#000" strokeOpacity="0.3" strokeWidth="1.6" />
        <path d={`M${w + dx / 2} ${-h * 0.62 + dy / 2}V${dy / 2}`} stroke="#000" strokeOpacity="0.26" strokeWidth="1.6" />
        <path d={`M${w + dx / 2 + 2} ${-h * 0.62 + dy / 2}V${dy / 2}`} stroke="#fff" strokeOpacity="0.14" strokeWidth="1" />
        <path d={`M${w} ${-h}L${w + dx / 2} ${-h * 0.62 + dy / 2}L${w} ${-h * 0.62 + dy}Z`} fill="#000" opacity="0.14" />
        <path d={side} fill={`url(#${m}-shade)`} />
      </g>
      {/* front panel */}
      <path d={front} fill={frontC} filter={`url(#${m}-paper)`} />
      <clipPath id={`${id}-fc`}><path d={front} /></clipPath>
      <g clipPath={`url(#${id}-fc)`}>
        {way.key === 'navy' && <MarkG x={w * 0.22} y={-h * 0.62} size={w * 0.56} fill={C.green} />}
        {way.key === 'green' && <MarkCropG idp={`${id}-crop`} x={0} y={-h + lip} w={w} h={h - lip} zoom={1.8} dx={-0.34} dy={-0.1} fill={C.navy} />}
        {mint && (
          <g>
            <rect x="0" y={-h + lip} width={w} height={h - lip} fill={`url(#${b}-dots)`} />
            <LockupStackG x={w * 0.1} y={-h * 0.56} scale={(w * 0.8) / 480} fill={C.navy} markFill={C.navy} />
          </g>
        )}
        {/* folded top edge, bottom fold and soft vertical creases */}
        <rect x="0" y={-h} width={w} height={lip} fill="#fff" opacity={mint ? 0.5 : 0.14} />
        <path d={`M0 ${-h + lip}H${w}`} stroke="#000" strokeOpacity="0.3" strokeWidth="1.8" />
        <path d={`M0 ${-h + lip + 2}H${w}`} stroke="#fff" strokeOpacity="0.2" strokeWidth="1" />
        <path d={`M0 -14H${w}`} stroke="#000" strokeOpacity="0.14" strokeWidth="1.5" />
        {[0.07, 0.93].map((t) => <path key={t} d={`M${r2(w * t)} ${-h + lip}V0`} stroke="#000" strokeOpacity="0.1" strokeWidth="2" />)}
        <rect width={w} height={h} y={-h} fill={`url(#${m}-shade)`} opacity="0.9" />
        <rect width={w} height={h} y={-h} fill={`url(#${m}-shade-v)`} opacity="0.5" />
      </g>
      <path d={`M0 ${-h}H${w}L${w + dx} ${-h + dy}`} fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="2" />
      <path d={`M0 ${-h}V0`} stroke="#fff" strokeOpacity="0.4" strokeWidth="1.5" />
      <path d={`M${w} ${-h}V0`} stroke="#000" strokeOpacity="0.28" strokeWidth="1.6" />
      <Handle m={m} x1={w * 0.3} x2={w * 0.7} y={eyY} lift={h * 0.4} rope={way.rope} />
    </g>
  );
}

// Each plate stages the three bags differently. Bags are listed back to front (drawing order); i is the
// entrance step, k the colourway.
const STAGES = [
  // navy: rising heights stepping right, the tallest cropped by the right edge
  cascade(3, 70, 730, 735, 690).map((p, i) => ({ ...p, k: i, w: [205, 250, 300][i], h: [290, 380, 480][i] })).reverse(),
  // green: the tallest at the back left, falling heights stepping down-right, the last cropped by the bottom
  cascade(3, 70, 640, 690, 790).map((p, i) => ({ ...p, k: [1, 0, 2][i], w: [290, 240, 200][i], h: [470, 360, 280][i] })),
  // mint: one large bag cropped by the left and bottom edges, two small ones stepping up-right behind it
  [
    { x: 790, y: 520, i: 2, k: 1, w: 150, h: 210 },
    { x: 560, y: 590, i: 1, k: 0, w: 185, h: 265 },
    { x: -70, y: 830, i: 0, k: 2, w: 430, h: 680 },
  ],
];

function BagPlate({ n }) {
  return (
    <Plate id={`bag-${WAYS[n].key}`} title={WAYS[n].name}>
      {({ idp, m, b }) => (
        STAGES[n].map((p) => (
          <StepG key={p.i} i={p.i} x={p.x} y={p.y}>
            <Bag id={`${idp}-b${p.i}`} m={m} b={b} way={WAYS[p.k]} w={p.w} h={p.h} />
          </StepG>
        ))
      )}
    </Plate>
  );
}
export const BagNavy = () => <BagPlate n={0} />;
export const BagGreen = () => <BagPlate n={1} />;
export const BagMint = () => <BagPlate n={2} />;
