// Grain and dot texture: the rising gradient with and without grain, four strengths, and the mint dot texture.
import Art from '@/components/art/Art';
import { gradById, GradDef, GrainDef, DotsDef } from './parts';
import s from './gradients.module.css';

const RISE = gradById('ocean-park');
const MINT = gradById('mint-paper');
const LEVELS = [
  { key: 'none', amt: 0, label: 'No grain' },
  { key: 'level-1', amt: 0.08, label: 'Grain 1, fine' },
  { key: 'level-2', amt: 0.16, label: 'Grain 2, print' },
  { key: 'level-3', amt: 0.3, label: 'Grain 3, heavy' },
  { key: 'level-4', amt: 0.5, label: 'Grain 4, coarse' },
];

function Square({ lv }) {
  const idp = `gradients-grain-${lv.key}`;
  return (
    <figure className={s.fig}>
      <Art viewBox="0 0 300 300" title={`Rising gradient, ${lv.label.toLowerCase()}`} exportName={`gradients-grain-${lv.key}`} className={s.plate}>
        <defs>
          <GradDef idp={idp} g={RISE} />
          <GrainDef idp={idp} amt={lv.amt || 0.01} seed={7} />
        </defs>
        <rect width="300" height="300" fill={`url(#${idp}-g)`} filter={lv.amt ? `url(#${idp}-grain)` : undefined} />
      </Art>
      <figcaption className={s.cap}>
        <strong>{lv.label}</strong>
        <span>{lv.amt ? `Speckle opacity ${lv.amt}` : 'Flat gradient'}</span>
      </figcaption>
    </figure>
  );
}

// quadrants of the dot texture: radius and opacity grow
const DOT_Q = [
  { x: 0, y: 0, r: 0.6, op: 0.1 },
  { x: 150, y: 0, r: 0.9, op: 0.14 },
  { x: 0, y: 150, r: 1.2, op: 0.22 },
  { x: 150, y: 150, r: 1.6, op: 0.34 },
];

export default function Grain() {
  return (
    <div className={s.grainGrid}>
      {LEVELS.map((lv) => <Square key={lv.key} lv={lv} />)}

      <figure className={`${s.fig} ${s.span2}`}>
        <Art viewBox="0 0 620 300" title="The rising gradient without grain beside the same gradient with grain" exportName="gradients-grain-comparison" className={s.wide2}>
          <defs>
            <GradDef idp="gradients-cmp" g={RISE} />
            <GrainDef idp="gradients-cmp" amt={0.16} seed={7} />
          </defs>
          <rect width="300" height="300" fill="url(#gradients-cmp-g)" />
          <rect x="320" width="300" height="300" fill="url(#gradients-cmp-g)" filter="url(#gradients-cmp-grain)" />
          <path d="M310 0V300" stroke="#F2FFE4" strokeWidth="2" />
          <rect x="0" y="256" width="150" height="44" fill="#F2FFE4" />
          <text x="12" y="285" fontSize="20" fontWeight="700" letterSpacing="1.2" fill="#162557" className="wide">FLAT</text>
          <rect x="320" y="256" width="150" height="44" fill="#F2FFE4" />
          <text x="332" y="285" fontSize="20" fontWeight="700" letterSpacing="1.2" fill="#162557" className="wide">GRAIN</text>
        </Art>
        <figcaption className={s.cap}>
          <strong>With and without grain</strong>
          <span>Same gradient, left flat, right with speckle opacity 0.16</span>
        </figcaption>
      </figure>

      <figure className={s.fig}>
        <Art viewBox="0 0 300 300" title="Dot texture on mint paper in four strengths" exportName="gradients-dots-levels" className={s.plate}>
          <defs>
            <GradDef idp="gradients-dotq" g={MINT} />
            {DOT_Q.map((q, i) => <DotsDef key={i} idp={`gradients-dotq${i}`} r={q.r} op={q.op} />)}
          </defs>
          <rect width="300" height="300" fill="url(#gradients-dotq-g)" />
          {DOT_Q.map((q, i) => <rect key={i} x={q.x} y={q.y} width="150" height="150" fill={`url(#gradients-dotq${i}-dots)`} />)}
          <path d="M150 0V300M0 150H300" stroke="#26CF7B" strokeWidth="2" />
        </Art>
        <figcaption className={s.cap}>
          <strong>Dot texture, 4 strengths</strong>
          <span>7 unit grid, radius 0.6 / 0.9 / 1.2 / 1.6</span>
        </figcaption>
      </figure>

      <div className={`${s.recipe} ${s.span2}`}>
        <p className="t-label">Recipe</p>
        <p className="t-small">Grain: fractal noise, base frequency 1.1, 2 octaves, laid over the colour as dark speckle. Print strength is 0.16 on the rising gradient and 0.06 on mint paper.</p>
        <p className="t-small">Dots: one circle per 7 unit cell in Blue Ocean, radius 0.9, opacity 0.14, over the mint paper gradient.</p>
      </div>
    </div>
  );
}
