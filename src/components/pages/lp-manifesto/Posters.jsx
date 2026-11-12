import { CONTACT, HEX } from '@/lib/brand';
import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import { FrondG, BrandDefs } from '@/components/art/KeyArt';
import s from './lp-manifesto.module.css';

const W = 1080;
const H = 1350;
// The poster's layout (m06), measured as fractions of the sheet and kept on all three: line right-aligned at the
// top (right margin 0.106 W, first row at about 0.13 H), frond entering from the left edge, mark in the lower left
// (0.14 W wide, 0.07 W from the edge, 0.078 H from the bottom), the two contact lines small at the lower right.
const RIGHT = Math.round(W * 0.894);
const MARK = Math.round(W * 0.14);
const MARK_X = Math.round(W * 0.07);
const MARK_Y = Math.round(H * 0.922 - MARK * 0.941);
const FROND = { cx: -1680, cy: 950, r: 1620, a0: -27, a1: 30, len: 700, width: 12, lean: 20, count: 40 };

// Three manifesto posters, 1080 x 1350, one sentence each, the last word bold. Ground, frond and ink change.
const POSTERS = [
  { key: 'enough', title: 'Poster: Nós existimos para dizer: chega.', rows: ['Nós existimos', 'para dizer:', 'chega.'], fill: 'url(#lp-manifesto-p0-rise-dark)', ink: HEX.mint, accent: HEX.green, mark: HEX.green, tone: 'onDark' },
  { key: 'level', title: 'Poster: Nós elevamos o nível.', rows: ['Nós elevamos', 'o nível.'], fill: HEX.green, ink: HEX.navy, accent: HEX.navy, mark: HEX.navy, tone: 'onGreen' },
  { key: 'control', title: 'Poster: Deixe o caos para trás. Assuma o controle.', rows: ['Deixe o caos', 'para trás.', 'Assuma o', 'controle.'], fill: HEX.navy, ink: HEX.white, accent: HEX.green, mark: HEX.green, tone: 'onNavy' },
];

function Poster({ p, n }) {
  const idp = `lp-manifesto-p${n}`;
  const size = p.rows.length > 3 ? 104 : 118;
  const lead = Math.round(size * 1.12);
  const top = Math.round(H * 0.132 + size * 0.7);
  const lastRow = p.rows[p.rows.length - 1];
  const cut = lastRow.lastIndexOf(' ') + 1;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title={p.title} exportName={`lp-manifesto-poster-${p.key}`}>
      <BrandDefs idp={idp} />
      <rect width={W} height={H} fill={p.fill} filter={`url(#${idp}-grain)`} />
      <FrondG {...FROND} tone={p.tone} opacity={0.9} fan />
      <MarkG x={MARK_X} y={MARK_Y} size={MARK} fill={p.mark} />
      <text textAnchor="end" fontSize={size} fill={p.ink} letterSpacing="-3" lang="pt-BR">
        {p.rows.map((row, k) => {
          const isLast = k === p.rows.length - 1;
          return (
            <tspan key={row} x={RIGHT} y={top + k * lead} fontWeight="300">
              {isLast ? row.slice(0, cut) : row}
              {isLast && <tspan fontWeight="700" fill={p.accent}>{row.slice(cut)}</tspan>}
            </tspan>
          );
        })}
      </text>
      <g fill={p.ink} fontSize="26" fontWeight="400" textAnchor="end">
        <text x={RIGHT} y={Math.round(H * 0.875)}>{CONTACT.phone}</text>
        <text x={RIGHT} y={Math.round(H * 0.875) + 32}>{CONTACT.web}</text>
      </g>
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
