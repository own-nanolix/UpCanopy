// Shipping boxes: a plain board box with a navy mark, and a navy box with the frond wrapping a corner.
import { StepG, CastG, ShadowG } from '@/components/art/Mockup';
import { MarkG, LockupG, DescriptorG, WordmarkG } from '@/components/art/Mark';
import { FrondG } from '@/components/art/KeyArt';
import { seeded, r2 } from '@/lib/charts';
import { Plate, IsoBox, boxOutline, ContactG, BarsG, C } from './parts';

const TAPE = '#E4EFE8';

// Packing tape across the top seam and down the left face; one flat band in each face's own coordinates.
function TapeTop(a, b) {
  return (
    <g>
      <rect x={a / 2 - 15} y="0" width="30" height={b} fill={TAPE} opacity="0.92" />
      <rect x={a / 2 - 15} y="0" width="2" height={b} fill="#fff" opacity="0.7" />
      <rect x={a / 2 - 15} y="0" width="30" height={b} fill="#000" opacity="0.04" />
      <path d={`M${a / 2} 0V${b}`} stroke="#000" strokeOpacity="0.16" strokeWidth="1.5" />
    </g>
  );
}
function TapeSide(a, h) {
  const v = h * 0.4;
  return (
    <g>
      <rect x={a / 2 - 15} y="0" width="30" height={v} fill={TAPE} opacity="0.92" />
      <path d={`M${a / 2 - 15} ${v}h30l-6 -8l-6 8l-6 -8l-6 8l-6 -8z`} fill="none" />
      <path d={`M${a / 2} 0V${v}`} stroke="#000" strokeOpacity="0.14" strokeWidth="1.5" />
      <rect x={a / 2 - 15} y="0" width="2" height={v} fill="#fff" opacity="0.7" />
    </g>
  );
}

// Shipping label on the right face: lockup, descriptor, real contact lines, quiet bars and plain bars.
export function ShipLabel({ x = 0, y = 0, w = 190, scale = 1 }) {
  const rnd = seeded(7);
  const bars = Array.from({ length: 30 }, (_, i) => ({ i, w: 1 + Math.round(rnd() * 2.4) }));
  let cur = 0;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect width={w} height={118} fill="#fff" />
      <rect width={w} height={118} fill="none" stroke="#000" strokeOpacity="0.12" />
      <LockupG x={12} y={12} scale={0.3} fill={C.navy} markFill={C.green} />
      <DescriptorG x={12} y={46} size={6.4} fill={C.navy} />
      <rect x="12" y="54" width={w - 24} height="1.5" fill={C.navy} />
      <BarsG x={12} y={64} widths={[96, 74, 86]} gap={9} h={3.4} />
      <ContactG x={w - 12} y={72} size={7} fill={C.navy} />
      <g transform="translate(12 96)">
        {bars.map((s) => {
          const x = cur;
          cur += s.w + 1.6;
          return <rect key={s.i} x={r2(x)} y="0" width={s.w} height="14" fill={C.asphalt} />;
        })}
      </g>
    </g>
  );
}

const WIDE = 360;

function PlainBox({ id, m, a, b, h }) {
  return (
    <IsoBox id={id} m={m} a={a} b={b} h={h} base={C.board}
      top={(w, d) => <g>{TapeTop(w, d)}<path d={`M0 ${d / 2}H${w}`} stroke="#000" strokeOpacity="0.08" /></g>}
      left={(w, d) => (
        <g>
          {TapeSide(w, d)}
          <MarkG x={w * 0.6} y={d * 0.46} size={d * 0.38} fill={C.navy} />
          <path d={`M0 ${d * 0.86}H${w}`} stroke="#000" strokeOpacity="0.1" strokeWidth="2" />
        </g>
      )}
      right={(w, d) => (
        <g>
          <ShipLabel x={w * 0.1} y={d * 0.12} w={w * 0.68} scale={Math.min(1, w / 330)} />
          <path d={`M0 ${d * 0.86}H${w}`} stroke="#000" strokeOpacity="0.1" strokeWidth="2" />
        </g>
      )}
    />
  );
}

// Navy box: the frond and the huge word-mark live on an unfolded plane that wraps the corner (left then right face).
function NavyBox({ id, m, a, b, h }) {
  const unfold = (shift) => (
    <g transform={`translate(${-shift} 0)`}>
      <FrondG cx={a - 10} cy={h + 30} r={h * 1.05} a0={185} a1={330} count={34} len={h * 0.75} width={h * 0.035} lean={58} tone="onNavy" opacity={0.9} />
      <WordmarkG x={-24} y={h * 0.9} size={h * 0.62} fill="#fff" weight={500} />
    </g>
  );
  return (
    <IsoBox id={id} m={m} a={a} b={b} h={h} base={C.navy}
      top={(w, d) => <g>{TapeTop(w, d)}<MarkG x={w * 0.12} y={d * 0.2} size={Math.min(w, d) * 0.22} fill={C.green} opacity="0.95" /></g>}
      left={() => <g>{unfold(0)}{TapeSide(a, h)}</g>}
      right={() => <g>{unfold(a)}</g>}
    />
  );
}

function ShipPlate({ id, title, big, small }) {
  return (
    <Plate id={id} title={title}>
      {({ idp, m }) => {
        const mk = (kind, key, sz) => (
          <g>
            <ShadowG idp={`${idp}-${key}`} cx={0} cy={4} rx={sz.a * 0.9} ry={sz.a * 0.1} opacity={0.34} />
            <CastG d={boxOutline(sz.a, sz.b, sz.h)} depth={sz.h * 0.28} />
            {kind === 'plain' ? <PlainBox id={`${idp}-${key}`} m={m} {...sz} /> : <NavyBox id={`${idp}-${key}`} m={m} {...sz} />}
          </g>
        );
        return (
          <g>
            <StepG i={1} x={760} y={470}>{mk(small, 'sm', { a: 190, b: 170, h: 130 })}</StepG>
            <StepG i={0} x={260} y={790}>{mk(big, 'lg', { a: WIDE, b: 310, h: 250 })}</StepG>
          </g>
        );
      }}
    </Plate>
  );
}
export const ShipPlain = () => <ShipPlate id="ship-plain" title="Plain board shipping box" big="plain" small="navy" />;
export const ShipNavy = () => <ShipPlate id="ship-navy" title="Navy printed shipping box" big="navy" small="plain" />;

