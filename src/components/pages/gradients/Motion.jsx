// Four looping motion studies. The markup is a complete finished frame; the loop is CSS keyframes in
// gradients.module.css (gradients-breathe, gradients-lift, gradients-rising, gradients-pulse).
import Art from '@/components/art/Art';
import { MARK, MARK_ARCH, MARK_BAR, MarkG } from '@/components/art/Mark';
import { FROND_TONES } from '@/components/art/KeyArt';
import { r2 } from '@/lib/charts';
import { gradById, GradDef, GrainDef, NoiseDef, leaflets, Leaflet } from './parts';
import s from './gradients.module.css';

const MINT = '#F2FFE4';

function Study({ title, exportName, caption, spec, children }) {
  return (
    <figure className={s.fig}>
      <Art viewBox="0 0 600 600" title={title} exportName={exportName} className={s.plate}>{children}</Art>
      <figcaption className={s.cap}><strong>{caption}</strong><span>{spec}</span></figcaption>
    </figure>
  );
}

// 1. The frond's leaflets breathing in a wave along the arc.
function Breathe() {
  const T = FROND_TONES.onNavy;
  const items = leaflets({ cx: 640, cy: 560, r: 360, a0: 110, a1: 262, count: 34, len: 330, width: 11, lean: 52 });
  return (
    <Study title="Frond leaflets breathing in a wave on navy" exportName="gradients-motion-frond-breathe" caption="Frond breathing" spec="Leaflets shorten and return in a wave, 5 s loop">
      <rect width="600" height="600" fill="#162557" />
      {items.map((p) => (
        <g key={p.i} transform={`translate(${p.x} ${p.y}) rotate(${p.rot})`}>
          <g className={s.breathe} style={{ '--i': p.i }}>
            <Leaflet L={p.L} W={p.W} a={T.a} b={T.b} />
          </g>
        </g>
      ))}
    </Study>
  );
}

// 2. The arch lifts off the bar and settles back.
function Lift() {
  return (
    <Study title="The arch of the mark lifting off the bar and settling" exportName="gradients-motion-arch-lift" caption="Arch lift" spec="Arch rises 7 units and lowers onto the bar, 4 s loop">
      <rect width="600" height="600" fill="#0C1445" />
      <g transform="translate(90 90) scale(4.2)">
        <path d={MARK_BAR} fill="#26CF7B" />
        <path d={MARK_ARCH} fill={MINT} className={s.lift} />
      </g>
      <path d="M90 520H510" stroke="#2B397F" strokeWidth="3" />
    </Study>
  );
}

// 3. The gradient rising: an oversized gradient rectangle slides up inside a clip; the stops never change.
function Rising() {
  const idp = 'gradients-m3';
  const g = { ...gradById('ocean-park'), v: [0, 1, 0.45, 0] };
  return (
    <Study title="The navy to green gradient rising inside a square" exportName="gradients-motion-gradient-rise" caption="Gradient rising" spec="Oversized rectangle slides upward in a clip, 8 s loop">
      <defs>
        <GradDef idp={idp} g={g} spread="reflect" />
        <NoiseDef idp={idp} amt={0.16} />
        <clipPath id={`${idp}-clip`}><rect width="600" height="600" /></clipPath>
      </defs>
      <g clipPath={`url(#${idp}-clip)`}>
        <rect y="-300" width="600" height="900" fill={`url(#${idp}-g)`} className={s.rising} />
        <rect width="600" height="600" fill="#000" filter={`url(#${idp}-noise)`} />
        <MarkG x={246} y={246} size={108} fill={MINT} />
      </g>
    </Study>
  );
}

// 4. The construction rings pulse in sequence, outward from the mark.
function Pulse() {
  const idp = 'gradients-m4';
  const centres = [MARK.UL, MARK.UR, MARK.B];
  return (
    <Study title="Construction rings pulsing in sequence around the mark" exportName="gradients-motion-ring-pulse" caption="Ring pulse" spec="Nine rings per circle light up from the inside out, 4.5 s loop">
      <defs>
        <GradDef idp={idp} g={gradById('mint-paper')} />
        <GrainDef idp={idp} amt={0.06} />
      </defs>
      <rect width="600" height="600" fill={`url(#${idp}-g)`} filter={`url(#${idp}-grain)`} />
      <clipPath id={`${idp}-clip`}><rect width="600" height="600" /></clipPath>
      <g clipPath={`url(#${idp}-clip)`}>
      <g transform="translate(60 60) scale(4.8)" fill="none" stroke="#162557" strokeWidth="0.45">
        {Array.from({ length: 9 }, (_, i) => (
          <g key={i} className={s.pulse} style={{ '--i': i }}>
            {centres.map((c, k) => <circle key={k} cx={c.cx} cy={c.cy} r={r2(MARK.U * (i + 0.5))} strokeDasharray="1.2 1.2" />)}
          </g>
        ))}
        <MarkG x={0} y={0} size={100} fill="#162557" stroke="none" />
      </g>
      </g>
    </Study>
  );
}

export default function Motion() {
  return (
    <div className={s.motionGrid}>
      <Breathe />
      <Lift />
      <Rising />
      <Pulse />
    </div>
  );
}
