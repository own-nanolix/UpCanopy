import { CONTACT, HEX, LINES, PEOPLE } from '@/lib/brand';
import Art from '@/components/art/Art';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { BrandDefs } from '@/components/art/KeyArt';

// m23: the two faces of the business card as exportable plates, 700 x 400 (the printed 1.75 : 1).
// The front carries the painted green edges of the stack; the back keeps the small dark text as printed.
export function CardFront() {
  const edges = [7, 6, 5, 4, 3, 2, 1];
  return (
    <Art viewBox="0 0 740 440" title="Business card front: Green Park mark on navy, green painted edges" exportName="lp-contato-card-front">
      <BrandDefs idp="lp-contato-cf" />
      {edges.map((e) => (
        <rect key={e} x={20 - e * 3} y={20 + e * 3} width="700" height="400" fill={HEX.green} stroke={HEX.greenDark} strokeOpacity="0.22" strokeWidth="1" />
      ))}
      <g>
        <rect x="20" y="20" width="700" height="400" fill={HEX.navy} filter="url(#lp-contato-cf-grain)" />
        <MarkG x={290} y={140} size={160} fill={HEX.green} archClass="roof-arch" barClass="roof-bar" />
      </g>
    </Art>
  );
}

export function CardBack() {
  const f = PEOPLE.founder;
  const [first, ...rest] = f.name.split(' ');
  return (
    <Art viewBox="0 0 740 440" title="Business card back: Green Park with the details as printed" exportName="lp-contato-card-back">
      <BrandDefs idp="lp-contato-cb" />
      <rect x="20" y="20" width="700" height="400" fill={HEX.green} filter="url(#lp-contato-cb-grain)" />
      <g fill={HEX.navy} className="wide" style={{ fontFamily: 'var(--font-wide)' }}>
        <text x="60" y="72" fontSize="17" fontWeight="700" letterSpacing="0.6">
          {first} <tspan fontWeight="400">{rest.join(' ')}</tspan>
        </text>
        <text x="60" y="94" fontSize="13" fontWeight="400" letterSpacing="0.6">{f.role}</text>
      </g>
      <WordmarkG x={680} y={78} size={30} fill={HEX.white} anchor="end" />
      <g fill={HEX.navy} fontSize="17" fontWeight="500">
        <text x="60" y="206">{CONTACT.handle}</text>
        <text x="60" y="232">{CONTACT.phone}</text>
        <text x="60" y="258">{CONTACT.hello}</text>
        <rect x="60" y="289" width="230" height="15" rx="2" fill={HEX.navy} opacity="0.16" />
        <rect x="60" y="315" width="170" height="15" rx="2" fill={HEX.navy} opacity="0.16" />
        <text x="60" y="376" fontWeight="700">{CONTACT.webCased}</text>
      </g>
    </Art>
  );
}

// The contact line of the folders and the envelope ("+1 (774) 360-7800 | upcanopy.com") as a strip on each ground.
const GROUNDS = {
  navy: { bg: HEX.navy, ink: HEX.white, mark: HEX.green, name: 'navy' },
  green: { bg: HEX.green, ink: HEX.navy, mark: HEX.navy, name: 'Green Park' },
  mint: { bg: HEX.mintPaper, ink: HEX.navy, mark: HEX.navy, name: 'mint' },
};
export function Strip({ tone }) {
  const g = GROUNDS[tone];
  const idp = `lp-contato-st-${tone}`;
  return (
    <Art viewBox="0 0 1200 150" title={`Contact strip on ${g.name}: ${CONTACT.footer}`} exportName={`lp-contato-strip-${tone}`}>
      <BrandDefs idp={idp} />
      <rect width="1200" height="150" fill={g.bg} filter={`url(#${idp}-grain)`} />
      {tone === 'mint' && <rect width="1200" height="150" fill={`url(#${idp}-dots)`} />}
      <MarkG x={44} y={42} size={66} fill={g.mark} />
      <text x="1156" y="88" textAnchor="end" fontSize="34" fontWeight="300" fill={g.ink} className="wide" style={{ fontFamily: 'var(--font-wide)' }}>
        {CONTACT.footer}
      </text>
      <rect x="130" y="72" width="300" height="6" fill={g.ink} opacity="0.16" />
    </Art>
  );
}

// The layout habit of the case study: mark in one corner, the brand line in the opposite top corner with its last
// word bold, contacts small at bottom right, a big quiet field between. One artboard on the rising gradient and
// one on mint, with the frond entering from the lower left on the gradient.
const HABIT = {
  rise: { fill: 'url(#lp-contato-lay-rise-rise)', ink: HEX.white, mark: HEX.green, strong: HEX.white, title: 'on the navy-to-green gradient' },
  mint: { fill: HEX.mint, ink: HEX.navy, mark: HEX.navy, strong: HEX.navy, title: 'on mint' },
};
export function Layout({ tone }) {
  const h = HABIT[tone];
  const idp = `lp-contato-lay-${tone}`;
  const [head, last] = LINES.control.split('. ').map((x, i) => (i ? x : x + '.'));
  return (
    <Art viewBox="0 0 1000 620" title={`Layout habit ${h.title}: mark top left, brand line top right, contacts bottom right`} exportName={`lp-contato-layout-${tone}`}>
      <BrandDefs idp={idp} />
      <rect width="1000" height="620" fill={h.fill} filter={`url(#${idp}-grain)`} />
      {tone === 'mint' && <rect width="1000" height="620" fill={`url(#${idp}-dots)`} />}
      <MarkG x={48} y={48} size={64} fill={h.mark} archClass="roof-arch" barClass="roof-bar" />
      <g fill={h.ink} fontSize="30" fontWeight="300" textAnchor="end" lang="pt-BR">
        <text x="952" y="82">{head}</text>
        <text x="952" y="122" fontWeight="700" fill={h.strong}>{last}</text>
      </g>
      <rect x="48" y="300" width="360" height="8" fill={h.ink} opacity="0.2" className="grow-x" />
      <rect x="48" y="328" width="240" height="8" fill={h.ink} opacity="0.2" className="grow-x" style={{ '--i': 1 }} />
      <g fill={h.ink} fontSize="16" fontWeight="500" textAnchor="end">
        <text x="952" y="560">{CONTACT.phone}</text>
        <text x="952" y="586">{CONTACT.web}</text>
      </g>
    </Art>
  );
}
