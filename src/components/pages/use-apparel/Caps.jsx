import { MarkG } from '@/components/art/Mark';
import { CastG, ShadowG, StepG } from '@/components/art/Mockup';
import { C, Stage, Cloth, Stitch } from './parts';

export const CAP_COLOURWAYS = [
  { id: 'navy', name: 'Navy cap', fill: C.navy, mark: C.green, thread: C.white },
  { id: 'dark', name: 'Dark green cap', fill: C.dark, mark: C.green, thread: C.green },
  { id: 'green', name: 'Green Park cap', fill: C.green, mark: C.navy, thread: C.navy },
];

// Cap, local box 360 x 292, front-on, centred on x = 182. Crown with six panels, curved peak.
const CROWN = 'M26 204C18 104 86 22 182 22C278 22 346 104 338 204C280 222 84 222 26 204Z';
const PEAK = 'M22 202C84 222 280 222 342 202C362 256 300 306 182 308C64 306 2 256 22 202Z';

export function CapG({ idp, k, cw, lit = false }) {
  const p = `${idp}-${k}`;
  const fab = `url(#${idp}-fabric)`;
  return (
    <g>
      <defs>
        <pattern id={`${p}-stitch`} width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
          <rect width="3" height="1.1" fill="#000" opacity="0.2" />
        </pattern>
        <radialGradient id={`${p}-hi`} cx="0.3" cy="0.22" r="0.8">
          <stop offset="0" stopColor="#fff" stopOpacity="0.3" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${p}-under`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.5" />
          <stop offset="0.35" stopColor="#000" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g className={lit ? 'mock-lit' : undefined}>
        {/* peak first, so the crown sits above it; shade under the crown, rows of stitching */}
        <Cloth idp={idp} id={`${k}-peak`} d={PEAK} fill={cw.fill} folds={['M60 236Q182 300 306 236']}>
          <path d={PEAK} fill={`url(#${p}-under)`} />
          {[246, 258, 270].map((y) => (
            <Stitch key={y} d={`M32 ${y}C92 ${y + 38} 272 ${y + 38} 332 ${y}`} c={cw.thread} o={0.4} w={1.1} dash="4 2.6" />
          ))}
          <path d="M18 200C84 224 280 224 346 200" fill="none" stroke="#000" strokeOpacity="0.35" strokeWidth="3" />
        </Cloth>
        <Cloth idp={idp} id={`${k}-crown`} d={CROWN} fill={cw.fill} folds={['M80 150C90 110 120 70 150 44', 'M290 160C284 120 262 80 236 50']}>
          <path d={CROWN} fill={`url(#${p}-hi)`} />
          {/* panel seams, doubled and stitched */}
          {['M182 22C186 90 186 150 182 214', 'M108 40C134 100 142 160 134 216', 'M256 40C230 100 222 160 230 216'].map((s) => (
            <g key={s}>
              <path d={s} fill="none" stroke="#000" strokeOpacity="0.32" strokeWidth="2.2" />
              <Stitch d={s} c={cw.thread} o={0.3} w={1} dash="3 2.4" />
            </g>
          ))}
          {/* sweatband line */}
          <path d="M28 202C84 222 280 222 336 202" fill="none" stroke="#000" strokeOpacity="0.3" strokeWidth="5" />
          {/* eyelets */}
          {[112, 252].map((x) => (
            <g key={x}>
              <circle cx={x} cy="74" r="5" fill="#000" opacity="0.4" />
              <circle cx={x} cy="73" r="3.4" fill={`url(#${idp}-metal-dark)`} />
            </g>
          ))}
          {/* embroidery: a thin darker offset below, the raised mark, fine satin stitches on top */}
          <g transform="translate(144 92) scale(1 0.94)">
            <g transform="translate(2.4 3)"><MarkG size={76} fill="#000" opacity="0.4" /></g>
            <MarkG size={76} fill={cw.mark} filter={fab} />
            <MarkG size={76} fill={`url(#${p}-stitch)`} />
            <g transform="translate(-1 -1)"><MarkG size={76} fill="#fff" opacity="0.14" /></g>
          </g>
        </Cloth>
        {/* button */}
        <circle cx="182" cy="24" r="9" fill="#000" opacity="0.3" transform="translate(1.5 2.5)" />
        <circle cx="182" cy="22" r="8" fill={`url(#${idp}-plastic)`} stroke="#000" strokeOpacity="0.25" strokeWidth="1" />
        <path d={CROWN} fill="none" stroke="#000" strokeOpacity="0.12" strokeWidth="1" />
      </g>
    </g>
  );
}

// Isometric shelf (30 degree edges) with thickness: lit left face, shaded right face.
const SHELF_TOP = 'M0 120L200 10L400 120L200 230Z';
const SHELF_L = 'M0 120L200 230L200 252L0 142Z';
const SHELF_R = 'M400 120L200 230L200 252L400 142Z';
const SHELF_ALL = 'M0 120L200 10L400 120L400 142L200 252L0 142Z';

export function ShelfCap({ idp, k, cw, lit = false }) {
  const p = `${idp}-${k}`;
  return (
    <g>
      <defs>
        <linearGradient id={`${p}-top`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E3F5D3" />
        </linearGradient>
      </defs>
      <CastG d={SHELF_ALL} depth={30} opacity={0.2} />
      <path d={SHELF_L} fill={C.grey} />
      <path d={SHELF_L} fill="#fff" opacity="0.4" />
      <path d={SHELF_R} fill="#A9B3AC" />
      <path d={SHELF_R} fill="#000" opacity="0.1" />
      <path d={SHELF_TOP} fill={`url(#${p}-top)`} filter={`url(#${idp}-paper)`} />
      <path d={SHELF_TOP} fill="none" stroke="#fff" strokeWidth="1.5" />
      <ShadowG idp={p} cx={206} cy={150} rx={118} ry={20} opacity={0.34} blur={8} />
      <g transform="translate(40 -122) scale(0.94)">
        <CapG idp={idp} k={k} cw={cw} lit={lit} />
      </g>
    </g>
  );
}

function CapSheet({ order }) {
  const idp = `use-apparel-cap-${CAP_COLOURWAYS[order[0]].id}`;
  const [hero, second] = order.map((n) => CAP_COLOURWAYS[n]);
  return (
    <Stage idp={idp} w={820} h={640} title={hero.name} exportName={`use-apparel-cap-${hero.id}`} horizon={0.7}>
      <StepG i={1} x={-80} y={330}>
        <ShelfCap idp={idp} k="b" cw={second} />
      </StepG>
      <StepG i={0} x={420} y={170}>
        <ShelfCap idp={idp} k="a" cw={hero} lit />
      </StepG>
    </Stage>
  );
}

// Close-up of the embroidery on the dark green cap (m26): the crown crops off the frame.
export function CapDetail() {
  const idp = 'use-apparel-cap-detail';
  return (
    <Stage idp={idp} w={820} h={640} title="Embroidered mark, close-up" exportName="use-apparel-cap-detail" horizon={0.8}>
      <StepG i={0} x={-250} y={-120}>
        <g transform="scale(2.5)">
          <CapG idp={idp} k="d" cw={CAP_COLOURWAYS[1]} lit />
        </g>
      </StepG>
    </Stage>
  );
}

export function Caps() {
  return [[0, 2], [1, 0], [2, 1]].map((order) => <CapSheet key={order[0]} order={order} />);
}
export { CapSheet };
