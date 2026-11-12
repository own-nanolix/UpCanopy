import { MarkG, LockupStackG } from '@/components/art/Mark';
import { CastG, StepG, cascade } from '@/components/art/Mockup';
import { C, Stage, Cloth, Stitch } from './parts';

// Flat t-shirt, local box 300 x 262, drawn centred on x = 0 by TeeG. dip = neckline depth.
const tee = (dip) =>
  `M112 18L42 42L2 122L42 146L62 108L64 262L236 262L238 108L258 146L298 122L258 42L188 18Q150 ${2 * dip - 18} 112 18Z`;
export const TEE_FRONT = tee(46);
export const TEE_BACK = tee(30);

export const TEE_COLOURWAYS = [
  { id: 'white', name: 'White t-shirt', fill: C.white, ink: C.navy, mark: C.green, thread: C.navy, rib: '#E4EBE1' },
  { id: 'navy', name: 'Navy t-shirt', fill: C.navy, ink: C.white, mark: C.green, thread: C.white, rib: '#0F1B47' },
  { id: 'green', name: 'Green Park t-shirt', fill: C.green, ink: C.navy, mark: C.navy, thread: C.navy, rib: '#1FB56A' },
];

const FOLDS = [
  'M78 124Q104 190 86 250',
  'M226 150Q206 205 224 252',
  'M30 112Q36 92 48 64',
  'M270 112Q262 92 252 64',
  'M118 40Q150 62 182 40',
];

export function TeeG({ idp, k, cw, side = 'front', lit = false }) {
  const back = side === 'back';
  const d = back ? TEE_BACK : TEE_FRONT;
  const neck = back ? 'M112 18Q150 42 188 18' : 'M112 18Q150 74 188 18';
  const fab = `url(#${idp}-fabric)`;
  return (
    <g transform="translate(-150 0)">
      <CastG d={d} depth={14} />
      <g className={lit ? 'mock-lit' : undefined}>
        <Cloth idp={idp} id={`${k}-body`} d={d} fill={cw.fill} folds={FOLDS} hi={cw.id === 'navy' ? 0.14 : 0.5}>
          {!back && <path d="M112 18Q150 42 188 18Q150 74 112 18Z" fill="#000" opacity="0.3" />}
          <path d={neck} fill="none" stroke={cw.rib} strokeWidth="14" />
          <path d={neck} fill="none" stroke="#000" strokeOpacity="0.12" strokeWidth="14" strokeDasharray="1.2 2.6" />
          <Stitch d={back ? 'M112 25Q150 50 188 25' : 'M112 26Q150 82 188 26'} c={cw.thread} o={0.45} w={1.1} dash="3 2.4" />
          {/* armhole seams, sleeve hems, body hem */}
          <Stitch d="M42 42Q58 78 62 108" c={cw.thread} o={0.35} dash="4 2.6" />
          <Stitch d="M258 42Q242 78 238 108" c={cw.thread} o={0.35} dash="4 2.6" />
          <Stitch d="M6 116L46 140" c={cw.thread} o={0.5} />
          <Stitch d="M294 116L254 140" c={cw.thread} o={0.5} />
          <Stitch d="M66 250L234 250" c={cw.thread} o={0.5} />
          {back ? (
            // m18: the stacked lockup sits just under the back neck, about a third of the body's width
            <LockupStackG x={118.8} y={43} scale={0.13} fill={cw.ink} markFill={cw.mark} filter={fab} />
          ) : (
            <MarkG x={177} y={58} size={26} fill={cw.mark} filter={fab} />
          )}
        </Cloth>
        <path d={d} fill="none" stroke="#000" strokeOpacity="0.14" strokeWidth="1" />
      </g>
    </g>
  );
}

// One mockup: front and back of one colourway, the back overlapping the front in a step down-right.
export function TeeSheet({ cw, n }) {
  const idp = `use-apparel-tee-${cw.id}`;
  const pos = cascade(2, 28, 34, 318, 198);
  return (
    <Stage idp={idp} w={700} h={580} title={`${cw.name}, front and back`} exportName={`use-apparel-tee-${cw.id}`}>
      <StepG {...pos[0]} rotate={-3}>
        <g transform="translate(180 0) scale(1.2)">
          <TeeG idp={idp} k={`f${n}`} cw={cw} side="front" />
        </g>
      </StepG>
      <StepG {...pos[1]} rotate={2}>
        <g transform="translate(180 0) scale(1.2)">
          <TeeG idp={idp} k={`b${n}`} cw={cw} side="back" lit />
        </g>
      </StepG>
    </Stage>
  );
}

// The case study's white t-shirt from the back (m18), larger, cropped by the frame.
export function TeeBackDetail() {
  const idp = 'use-apparel-tee-detail';
  return (
    <Stage idp={idp} w={700} h={580} title="White t-shirt, back, lockup between the shoulders" exportName="use-apparel-tee-detail">
      <StepG i={0} x={350} y={10}>
        <g transform="scale(2.1)">
          <TeeG idp={idp} k="d" cw={TEE_COLOURWAYS[0]} side="back" lit />
        </g>
      </StepG>
    </Stage>
  );
}

export function Tees() {
  return TEE_COLOURWAYS.map((cw, n) => <TeeSheet key={cw.id} cw={cw} n={n} />);
}
