import { pageMeta } from '@/lib/pages';
import Art from '@/components/art/Art';
import { MarkG, WordmarkG, DescriptorG } from '@/components/art/Mark';
import Reveal from '@/components/site/Reveal';
import { Line } from '@/components/ui/Card';
import { MANIFESTO, SHEET, TAGLINE, DESCRIPTOR, AREAS, SECTORS, PILLARS } from '@/lib/brand';
import FlatLay from '@/components/pages/overview/FlatLay';
import ContentsNav from '@/components/pages/overview/ContentsNav';
import Principles from '@/components/pages/overview/Principles';
import { ChapterLedger, ProductLedger } from '@/components/pages/overview/Ledgers';
import Signature from '@/components/pages/overview/Signature';
import Direction from '@/components/pages/overview/Direction';
import Thumbs from '@/components/pages/overview/Thumbs';
import BrandLines from '@/components/pages/overview/BrandLines';
import s from '@/components/pages/overview/overview.module.css';

export const metadata = pageMeta('overview');

const CONTENTS = [
  { id: 'overview-about', label: 'About this brand' },
  { id: 'overview-manifesto', label: 'Manifesto' },
  { id: 'overview-principles', label: 'Principles' },
  { id: 'overview-lines', label: 'Brand lines' },
  { id: 'overview-direction', label: 'Direction and palette' },
  { id: 'overview-tiles', label: 'Chapter tiles' },
  { id: 'overview-chapters', label: 'Every chapter' },
  { id: 'overview-products', label: 'Mockups and products' },
];

// Which paragraphs of the manifesto are set larger, and which close the text in bold.
const SIZE = { 0: 't-h2', 1: 't-h2', 2: 't-lead', 3: 't-display', 4: 't-h2', 5: 't-h2', 6: 't-lead', 7: 't-h1', 8: 't-display', 9: 't-display' };
const BOLD = new Set([8, 9]);

function Emph({ text, words }) {
  const parts = text.split(new RegExp(`(${words.join('|')})`));
  return parts.map((p, i) => (words.includes(p) ? <strong key={i} className="strong">{p}</strong> : p));
}

export default function Page() {
  return (
    <section className="page" id="p-overview" aria-label="Overview">
      <header className={s.open}>
        <div className={`mock ${s.hero}`}>
          <FlatLay />
        </div>
        <div className={`field-navy ${s.title}`}>
          <h1 className={`t-display ${s.h1}`} tabIndex={-1} lang="pt-BR">
            <Line text={TAGLINE} strong="crescimento" className="hl" />
          </h1>
          <div className={s.titleSide}>
            <Art viewBox="0 0 520 120" title="UpCanopy, remote back-office" exportName="overview-cover-lockup" className={s.coverLockup}>
              <MarkG x={0} y={4} size={104} fill="#26CF7B" archClass="roof-arch" barClass="roof-bar" />
              <WordmarkG x={140} y={66} size={52} fill="#FFFFFF" />
              <DescriptorG x={142} y={104} size={14} fill="#A9B1D1" />
            </Art>
          </div>
        </div>
      </header>

      <Signature />

      <div className="split">
        <aside className="split-rail" aria-label="Project sheet and contents">
          <div>
            <p className="t-caps" style={{ color: 'var(--navy-muted)' }}>Project sheet</p>
            <dl className={s.sheet}>
              {SHEET.map(([k, v]) => (
                <div key={k} className={s.sheetRow}>
                  <dt lang="pt-BR" className="t-label">{k}</dt>
                  <dd lang="pt-BR">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <p className="t-caps" style={{ color: 'var(--navy-muted)' }}>Contents</p>
            <ContentsNav items={CONTENTS} />
          </div>
        </aside>

        <div className="split-main">
          <section id="overview-about" aria-labelledby="overview-about-h" className={s.about}>
            <Reveal>
              <h2 id="overview-about-h" className="t-caps-lg">About this brand</h2>
              <p className={`t-lead ${s.aboutText}`}>
                A remote back-office for {SECTORS[0].toLowerCase()} and {SECTORS[1].toLowerCase()} companies led by Brazilian immigrants in the United States.
                It takes over the office: {AREAS[0]}, {AREAS[1].toLowerCase()} and finance, kept in order.
              </p>
              <p className="t-caps">{DESCRIPTOR}</p>
              <p className="t-small">Three pillars hold it up: {PILLARS.join(', ')}.</p>
            </Reveal>
          </section>

          <section id="overview-manifesto" aria-labelledby="overview-manifesto-h" className={s.manifesto}>
            <h2 id="overview-manifesto-h" className="t-caps-lg">Manifesto</h2>
            <div lang="pt-BR" className={s.manifestoBody}>
              {MANIFESTO.map((p, i) => (
                <Reveal key={i} as="p" className={`${SIZE[i]} ${BOLD.has(i) ? 'strong' : ''} ${i === 3 ? s.chega : ''}`}>
                  {i === 5 ? <Emph text={p} words={PILLARS} /> : p}
                </Reveal>
              ))}
            </div>
          </section>
        </div>
      </div>

      <section id="overview-principles" aria-labelledby="overview-principles-h" className={`wrap ${s.block}`}>
        <h2 id="overview-principles-h" className={`t-h1 ${s.blockHead}`}>Principles</h2>
        <Principles />
      </section>

      <section id="overview-lines" aria-labelledby="overview-lines-h" className={`wrap ${s.block}`}>
        <h2 id="overview-lines-h" className={`t-h1 ${s.blockHead}`}>Brand lines</h2>
        <BrandLines />
      </section>

      <section id="overview-direction" aria-labelledby="overview-direction-h" className={`wrap ${s.block}`}>
        <h2 id="overview-direction-h" className={`t-h1 ${s.blockHead}`}>Direction and palette</h2>
        <Direction />
      </section>

      <section id="overview-tiles" aria-labelledby="overview-tiles-h" className={`wrap ${s.block}`}>
        <h2 id="overview-tiles-h" className={`t-h1 ${s.blockHead}`}>Chapter tiles</h2>
        <Thumbs />
      </section>

      <section id="overview-chapters"aria-labelledby="overview-chapters-h" className={`wrap ${s.block}`}>
        <h2 id="overview-chapters-h" className={`t-h1 ${s.blockHead}`}>Every chapter</h2>
        <ChapterLedger />
      </section>

      <section id="overview-products" aria-labelledby="overview-products-h" className={`wrap ${s.block}`}>
        <h2 id="overview-products-h" className={`t-h1 ${s.blockHead}`}>Mockups and products</h2>
        <ProductLedger />
      </section>
    </section>
  );
}
