import { TAGLINE } from '@/lib/brand';
import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import { FrondG, BrandDefs } from '@/components/art/KeyArt';
import s from './lp-manifesto.module.css';

const W = 1080;
const H = 1350;
const EDGE = 72;

// Three manifesto posters, 1080 x 1350, one sentence each. Rows are the sentence broken in place; the last word
// is set bold. Ground, frond and ink change between the three, the layout does not.
const POSTERS = [
  { key: 'enough', title: 'Poster: Nós existimos para dizer: chega.', rows: ['Nós existimos', 'para dizer:', 'chega.'], fill: 'url(#lp-manifesto-p0-rise-dark)', ink: '#F2FFE4', accent: '#26CF7B', mark: '#26CF7B', tone: 'onDark', frond: { cx: 1180, cy: 1400, r: 400, a0: 175, a1: 268, lean: 60 } },
  { key: 'level', title: 'Poster: Nós elevamos o nível.', rows: ['Nós elevamos', 'o nível.'], fill: '#26CF7B', ink: '#162557', accent: '#162557', mark: '#162557', tone: 'onGreen', frond: { cx: 1180, cy: 1400, r: 400, a0: 175, a1: 268, lean: 56 } },
  { key: 'control', title: 'Poster: Deixe o caos para trás. Assuma o controle.', rows: ['Deixe o caos', 'para trás.', 'Assuma o', 'controle.'], fill: '#162557', ink: '#FFFFFF', accent: '#26CF7B', mark: '#26CF7B', tone: 'onNavy', frond: { cx: 1180, cy: 1400, r: 400, a0: 175, a1: 268, lean: 60 } },
];

function Poster({ p, n }) {
  const idp = `lp-manifesto-p${n}`;
  const size = p.rows.length > 3 ? 120 : 140;
  const lead = size * 1.12;
  const top = 250;
  const [lastRow] = p.rows.slice(-1);
  const cut = lastRow.lastIndexOf(' ') + 1;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title={p.title} exportName={`lp-manifesto-poster-${p.key}`}>
      <BrandDefs idp={idp} />
      <rect width={W} height={H} fill={p.fill} filter={`url(#${idp}-grain)`} />
      <FrondG {...p.frond} count={34} len={300} width={12} tone={p.tone} opacity={0.9} fan />
      <MarkG x={EDGE} y={EDGE} size={84} fill={p.mark} />
      <text x={W - EDGE} y={EDGE + 40} textAnchor="end" fontSize="26" fill={p.ink} lang="pt-BR">
        <tspan fontWeight="300">{TAGLINE.slice(0, TAGLINE.lastIndexOf(' ') + 1)}</tspan>
        <tspan fontWeight="700">{TAGLINE.slice(TAGLINE.lastIndexOf(' ') + 1)}</tspan>
      </text>
      <text x={EDGE} fontSize={size} fill={p.ink} letterSpacing="-3" lang="pt-BR">
        {p.rows.map((row, k) => {
          const isLast = k === p.rows.length - 1;
          return (
            <tspan key={row} x={EDGE} y={top + 200 + k * lead} fontWeight="300">
              {isLast ? row.slice(0, cut) : row}
              {isLast && <tspan fontWeight="700" fill={p.accent}>{row.slice(cut)}</tspan>}
            </tspan>
          );
        })}
      </text>
    </Art>
  );
}

export default function Posters() {
  return (
    <ul className={s.posterRow} lang="pt-BR">
      {POSTERS.map((p, n) => (
        <li key={p.key} className={s.posterItem}>
          <div className={s.posterFrame}>
            <Poster p={p} n={n} />
          </div>
          <p className="t-label">{`0${n + 1} / 03`}</p>
        </li>
      ))}
    </ul>
  );
}
