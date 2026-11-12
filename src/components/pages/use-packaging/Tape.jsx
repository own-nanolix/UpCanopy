// Tape: two rolls standing on their sides and a set of flat strips. Each is its own exportable mockup.
import { StepG, CastG, ShadowG, SheenG, cascade } from '@/components/art/Mockup';
import { MarkG, WordmarkG, DescriptorG } from '@/components/art/Mark';
import { r2 } from '@/lib/charts';
import { Plate, C, K, lighten, darken, polyD } from './parts';

const TAPES = [
  { key: 'navy', base: C.navy, name: 'Navy tape roll' },
  { key: 'green', base: C.green, name: 'Green Park tape roll' },
];

// Printed band on the wall of the roll: items sit at angles round the front half, squeezed by sin(angle).
function wallPrint({ kind, cx, cy, rx, ry, hh, ink, mark }) {
  const items = kind === 'navy' ? [0.15, 0.5, 0.85] : [0.08, 0.5, 0.92];
  return items.map((t, i) => {
    const phi = Math.PI * t;
    const x = cx - rx * Math.cos(phi), s = Math.sin(phi), y = cy + hh / 2 + ry * s;
    return (
      <g key={t} transform={`translate(${r2(x)} ${r2(y)}) scale(${r2(Math.max(s, 0.18))} 1)`}>
        {kind === 'navy'
          ? (i === 1 ? <WordmarkG x={0} y={9} size={26} fill="#fff" anchor="middle" /> : <MarkG x={-20} y={-20} size={40} fill={mark} />)
          : <DescriptorG x={0} y={3} size={9} fill={ink} anchor="middle" />}
      </g>
    );
  });
}

// One roll lying on its side (axis vertical): wall, tape edge ring, cardboard core and the tail curling off.
function Roll({ id, m, kind, base, rx = 124, hh = 86 }) {
  const ry = r2(rx * 0.42), cx = 0, cy = 0;
  const ink = kind === 'navy' ? '#fff' : C.navy;
  const sideD = `M${-rx} 0L${-rx} ${hh}A${rx} ${ry} 0 0 0 ${rx} ${hh}L${rx} 0Z`;
  const silD = `M${-rx} 0A${rx} ${ry} 0 0 1 ${rx} 0L${rx} ${hh}A${rx} ${ry} 0 0 1 ${-rx} ${hh}Z`;
  const rimTop = lighten(base, kind === 'navy' ? 0.22 : 0.4);
  const coreR = 0.6;
  const x0 = rx;
  const tail = `M${x0} 0C${x0 + 50} 0 ${x0 + 92} ${r2(hh * 0.5)} ${x0 + 168} ${r2(hh * 0.92 + ry * 0.35)}L${x0 + 142} ${r2(hh * 1.35 + ry * 0.55)}C${x0 + 96} ${r2(hh * 1.1 + ry * 0.45)} ${x0 + 40} ${hh + 6} ${x0} ${hh}Z`;
  return (
    <g>
      <ShadowG idp={`${id}-sh`} cx={0} cy={hh + 6} rx={rx * 1.1} ry={ry * 0.8} opacity={0.34} />
      <CastG d={silD} depth={34} />
      {/* tail first: it leaves the wall at the right and settles on the floor */}
      <CastG d={tail} depth={8} opacity={0.2} />
      <path d={tail} fill={darken(base, 0.1)} filter={`url(#${m}-paper)`} />
      <path d={tail} fill={`url(#${m}-shade-v)`} />
      <path d={`M${x0} 0C${x0 + 50} 0 ${x0 + 92} ${r2(hh * 0.5)} ${x0 + 168} ${r2(hh * 0.92 + ry * 0.35)}`} fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" />
      <path d={`M${x0 + 168} ${r2(hh * 0.92 + ry * 0.35)}L${x0 + 142} ${r2(hh * 1.35 + ry * 0.55)}`} stroke={darken(base, 0.45)} strokeWidth="2.5" />
      {/* wall */}
      <path d={sideD} fill={base} filter={`url(#${m}-paper)`} />
      <clipPath id={`${id}-wall`}><path d={sideD} /></clipPath>
      <g clipPath={`url(#${id}-wall)`}>
        {wallPrint({ kind, cx, cy, rx, ry, hh, ink, mark: C.green })}
        <rect x={-rx} y="0" width={rx * 2} height={hh + ry} fill={`url(#${m}-shade)`} />
        <ellipse cx="0" cy={hh} rx={rx} ry={ry} fill="none" stroke="#000" strokeOpacity="0.28" strokeWidth="5" />
      </g>
      <SheenG idp={m} d={sideD} opacity={0.4} />
      {/* top: the edge of the wound tape, its layers as ellipses, the card core and the hole */}
      <ellipse cx="0" cy="0" rx={rx} ry={ry} fill={rimTop} />
      {[0.97, 0.9, 0.83, 0.76, 0.69].map((k, i) => (
        <ellipse key={k} cx="0" cy="0" rx={r2(rx * k)} ry={r2(ry * k)} fill="none" stroke={i % 2 ? darken(base, 0.15) : '#fff'} strokeOpacity={i % 2 ? 0.3 : 0.45} strokeWidth="1.2" />
      ))}
      <ellipse cx="0" cy="0" rx={r2(rx * (coreR + 0.05))} ry={r2(ry * (coreR + 0.05))} fill="#C9CBCA" />
      <ellipse cx="0" cy="0" rx={r2(rx * (coreR + 0.05))} ry={r2(ry * (coreR + 0.05))} fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="1.5" />
      <clipPath id={`${id}-hole`}><ellipse cx="0" cy="0" rx={r2(rx * coreR)} ry={r2(ry * coreR)} /></clipPath>
      <ellipse cx="0" cy="0" rx={r2(rx * coreR)} ry={r2(ry * coreR)} fill="#8E9290" />
      <g clipPath={`url(#${id}-hole)`}>
        <ellipse cx="0" cy={r2(ry * 0.62)} rx={r2(rx * coreR)} ry={r2(ry * coreR)} fill={C.asphalt} />
        <ellipse cx={-6} cy={-2} rx={r2(rx * coreR)} ry={r2(ry * coreR)} fill="none" stroke="#000" strokeOpacity="0.35" strokeWidth="6" />
      </g>
      <ellipse cx="0" cy="0" rx={r2(rx * coreR)} ry={r2(ry * coreR)} fill="none" stroke={C.asphalt} strokeOpacity="0.4" strokeWidth="1" />
      <path d={`M${-rx} 0A${rx} ${ry} 0 0 1 0 ${-ry}`} fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="2" />
    </g>
  );
}

// One mockup: the hero roll and a partner in the other colourway, stepping up-right and cropped by the frame.
function RollPlate({ n }) {
  const order = [TAPES[n], TAPES[1 - n]];
  const steps = cascade(2, 340, 520, 790, 330);
  return (
    <Plate id={`tape-${TAPES[n].key}`} title={TAPES[n].name}>
      {({ idp, m }) => (
        [...steps].reverse().map((p) => {
          const t = order[p.i];
          return (
            <StepG key={p.i} i={p.i} x={p.x} y={p.y}>
              <g transform={`scale(${p.i ? 1.15 : 1.6})`}>
                <Roll id={`${idp}-r${p.i}`} m={m} kind={t.key} base={t.base} />
              </g>
            </StepG>
          );
        })
      )}
    </Plate>
  );
}
export const RollNavy = () => <RollPlate n={0} />;
export const RollGreen = () => <RollPlate n={1} />;

// A flat strip lying on the floor in the same projection: local x along (0.866, -0.5), local y along (0.866, 0.5).
function Strip({ id, m, len, wd, kind }) {
  const base = kind === 'navy' ? C.navy : C.green;
  const ink = kind === 'navy' ? '#fff' : C.navy;
  const pitch = Math.round(wd * (kind === 'navy' ? 4.6 : 5.6));
  const reps = Math.ceil(len / pitch);
  const d = (x, y) => [r2(K * (x + y)), r2(-0.5 * x + 0.5 * y)];
  const outline = polyD([d(0, 0), d(len, 0), d(len, wd), d(0, wd)]);
  return (
    <g>
      <CastG d={outline} depth={12} opacity={0.24} />
      <g transform={`matrix(${K} -0.5 ${K} 0.5 0 0)`}>
        <clipPath id={`${id}-c`}><rect width={len} height={wd} /></clipPath>
        <rect width={len} height={wd} fill={base} filter={`url(#${m}-paper)`} />
        <g clipPath={`url(#${id}-c)`}>
          {Array.from({ length: reps }, (_, k) => k).map((k) => (
            <g key={k} transform={`translate(${k * pitch + 14} 0)`}>
              {kind === 'navy' ? (
                <g>
                  <MarkG x={0} y={wd * 0.2} size={wd * 0.6} fill={C.green} />
                  <WordmarkG x={wd * 0.78} y={wd * 0.66} size={wd * 0.42} fill="#fff" />
                </g>
              ) : (
                <DescriptorG x={0} y={wd * 0.62} size={wd * 0.3} fill={ink} />
              )}
            </g>
          ))}
          <rect width={len} height={wd} fill={`url(#${m}-shade-v)`} opacity="0.9" />
          {/* creased end: a short lifted flap */}
          <path d={`M${len - 38} 0L${len} 0L${len} ${wd * 0.55}Z`} fill={lighten(base, 0.3)} />
          <path d={`M${len - 38} 0L${len} ${wd * 0.55}`} stroke="#000" strokeOpacity="0.25" strokeWidth="1.5" />
        </g>
        <path d={`M0 0H${len}`} stroke="#fff" strokeOpacity="0.55" strokeWidth="2" />
        <path d={`M0 ${wd}H${len}`} stroke="#000" strokeOpacity="0.25" strokeWidth="1.5" />
      </g>
      <path d={outline} fill={`url(#${m}-glass)`} className="mock-sheen" opacity="0.4" />
    </g>
  );
}

export function TapeStrips() {
  const kinds = ['navy', 'green', 'navy'];
  const steps = cascade(3, -150, 720, -50, 400);
  return (
    <Plate id="tape-strips" title="Printed tape strips">
      {({ idp, m }) => (
        steps.map((p) => (
          <StepG key={p.i} i={p.i} x={p.x} y={p.y}>
            <Strip id={`${idp}-s${p.i}`} m={m} len={[900, 820, 760][p.i]} wd={[96, 84, 90][p.i]} kind={kinds[p.i]} />
          </StepG>
        ))
      )}
    </Plate>
  );
}
