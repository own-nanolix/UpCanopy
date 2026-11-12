import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import { FrondG } from '@/components/art/KeyArt';
import Reveal from '@/components/site/Reveal';
import { HEX } from '@/lib/brand';
import s from './overview.module.css';

// The four principles: each one a pillar of the brand, backed by a sentence taken word for word from the page text.
// The glyphs only restate the word: order (a grid that locks), discipline (equal bars), trust (the roof set on its
// bar), expansion (the frond fanning out).

function Organizacao({ on, off }) {
  return (
    <Art viewBox="0 0 200 200" title="Organização: a grid of squares locking into order" exportName="overview-principle-organizacao" decorative>
      {Array.from({ length: 9 }, (_, i) => {
        const c = i % 3, r = Math.floor(i / 3);
        return <rect key={i} className="lock" style={{ '--i': i }} x={14 + c * 62} y={14 + r * 62} width="52" height="52" fill={i === 5 ? on : off} />;
      })}
    </Art>
  );
}

function Disciplina({ on, off }) {
  return (
    <Art viewBox="0 0 200 200" title="Disciplina: equal thick bars in strict order" exportName="overview-principle-disciplina" decorative>
      {Array.from({ length: 5 }, (_, i) => (
        <rect key={i} className="grow-x" style={{ '--i': i * 3 }} x="14" y={14 + i * 38} width="172" height="24" fill={i === 4 ? on : off} />
      ))}
    </Art>
  );
}

function Confianca({ on }) {
  return (
    <Art viewBox="0 0 200 200" title="Confiança: the roof set on its bar" exportName="overview-principle-confianca" decorative>
      <MarkG x={14} y={14} size={172} fill={on} archClass="roof-arch" barClass="roof-bar" />
    </Art>
  );
}

function Expansao() {
  return (
    <Art viewBox="0 0 200 200" title="Expansão: the frond fanning out" exportName="overview-principle-expansao" decorative>
      <FrondG cx={-10} cy={196} r={120} a0={-100} a1={-6} count={16} len={130} width={7} lean={64} tone="onMint" fan />
    </Art>
  );
}

const CARDS = [
  { key: 'organizacao', name: 'Organização', quote: 'Por isso, nossa obsessão é a Organização.', cls: 'card-navy', glyph: <Organizacao on={HEX.green} off="#2E418A" /> },
  { key: 'disciplina', name: 'Disciplina', quote: 'Nossa linguagem é a Disciplina.', cls: 'card-green', glyph: <Disciplina on={HEX.navy} off="#0E9E57" /> },
  { key: 'confianca', name: 'Confiança', quote: 'Nossa promessa é a Confiança.', cls: 'field-dark', glyph: <Confianca on={HEX.mint} /> },
  { key: 'expansao', name: 'Expansão', quote: 'Nós elevamos o nível.', more: 'Tiramos você do modo "sobrevivência" e o colocamos no modo "expansão".', cls: 'field-paper', glyph: <Expansao /> },
];

export default function Principles() {
  return (
    <ol className={s.stair}>
      {CARDS.map((c, i) => (
        <li key={c.key} className={s.stairItem} style={{ '--n': i }}>
          <Reveal delay={i * 90} className={`${c.cls} ${s.pCard}`}>
            <div className={s.pTop}>
              <span className="t-caps" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div className={s.pGlyph}>{c.glyph}</div>
            </div>
            <div>
              <h3 className="t-caps-lg" lang="pt-BR">{c.name}</h3>
              <p className={`t-line ${s.pQuote}`} lang="pt-BR">{c.quote}</p>
              {c.more && <p className={s.pMore} lang="pt-BR">{c.more}</p>}
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

