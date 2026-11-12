import Art from '@/components/art/Art';
import { ConstructionG } from '@/components/art/KeyArt';
import Reveal from '@/components/site/Reveal';
import { range } from '@/lib/site';
import { CORE } from '@/components/site/icons';
import { HEX } from '@/lib/brand';
import { Glyph } from './data';
import s from './icons.module.css';

const K = 16; // pixels per grid unit on the plate
const O = 48; // plate margin

const PLATES = [
  { name: 'calendar', why: 'Agenda', note: 'Square frame and two straight tabs: every angle is a right angle, the rings cross at the frame.' },
  { name: 'users', why: 'CRM', note: 'Two heads and two shoulders: round forms are cut with straight ends, as the arch of the mark is.' },
];

function Plate({ name }) {
  return (
    <Art viewBox="0 0 480 480" title={`${name} icon construction on the pixel grid`} exportName={`icons-construction-${name}`} className={s.plateSvg}>
      <rect width="480" height="480" fill="#FFFFFF" />
      <ConstructionG x={O} y={O} size={24 * K} rings={9} stroke={HEX.greenInk} strokeWidth={0.3} />
      {range(25).map((i) => (
        <g key={i} stroke="#162557" strokeWidth={i % 12 === 0 ? 1.2 : 0.6} opacity={i % 12 === 0 ? 0.5 : 0.18}>
          <path d={`M${O + i * K} ${O}V${O + 24 * K}`} />
          <path d={`M${O} ${O + i * K}H${O + 24 * K}`} />
        </g>
      ))}
      <rect x={O + 2 * K} y={O + 2 * K} width={20 * K} height={20 * K} fill="none" stroke="#B3261E" strokeWidth="1.2" strokeDasharray="6 4" />
      <g transform={`translate(${O} ${O}) scale(${K})`} color="#162557">
        <Glyph name={name} sw={2} opacity="0.88" />
      </g>
      <g transform={`translate(${O} ${O}) scale(${K})`}>
        <path d={CORE[name]} fill="none" stroke="#26CF7B" strokeWidth="0.09" />
      </g>
      <g fontSize="11" className="wide" fill="#4A5568" style={{ fontFamily: 'var(--font-wide)' }}>
        <text x={O} y={O - 14}>24 x 24 GRID</text>
        <text x={O + 24 * K} y={O - 14} textAnchor="end">2 PX MARGIN</text>
      </g>
    </Art>
  );
}

function Sizes({ name }) {
  const sizes = [16, 24, 32, 48];
  const xs = [20, 60, 108, 164];
  return (
    <Art viewBox="0 0 232 110" title={`${name} icon at 16, 24, 32 and 48 pixels`} exportName={`icons-sizes-${name}`} className={s.sizesSvg}>
      <rect width="232" height="110" fill="#F0F0F0" />
      {sizes.map((z, i) => (
        <g key={z}>
          <g transform={`translate(${xs[i]} ${80 - z}) scale(${z / 24})`} color="#162557">
            <Glyph name={name} sw={2} />
          </g>
          <text x={xs[i] + z / 2} y="100" textAnchor="middle" fontSize="10" fontWeight="700" fill="#4A5568">
            {z} px
          </text>
        </g>
      ))}
    </Art>
  );
}

export default function Construction() {
  return (
    <section id="icons-construction" aria-labelledby="icons-construction-h">
      <Reveal>
        <h2 id="icons-construction-h" className="t-h2">
          Construction on the <span className="strong">pixel grid</span>
        </h2>
        <p className="t-body muted" style={{ maxWidth: 640, marginTop: 12 }}>
          Two icons drawn over the 24 x 24 grid, the 2 px margin (red, dashed), the stroke centre lines (green) and, behind
          them, the dashed construction circles of the mark, so the set and the mark share one geometry.
        </p>
      </Reveal>
      <div className={s.plates}>
        {PLATES.map((p, i) => (
          <Reveal key={p.name} delay={i * 90} className={s.plateRow}>
            <div className={s.plate}>
              <Plate name={p.name} />
            </div>
            <div className={s.plateSide}>
              <h3 className="t-caps-lg">{p.name}</h3>
              <p className="t-label">Used for {p.why}</p>
              <p className="t-small">{p.note}</p>
              <div className={s.sizes}>
                <Sizes name={p.name} />
              </div>
              <ul className={s.legend}>
                <li><i style={{ background: 'var(--green)' }} />Stroke centre line</li>
                <li><i style={{ background: 'var(--red-ink)' }} />2 px margin</li>
                <li><i style={{ background: 'var(--green-ink)' }} />Construction circles</li>
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
