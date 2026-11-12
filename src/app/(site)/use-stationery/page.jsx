import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import { Line } from '@/components/ui/Card';
import { LINES } from '@/lib/brand';
import FlatLay from '@/components/pages/use-stationery/FlatLay';
import Letter from '@/components/pages/use-stationery/Letter';
import Cards from '@/components/pages/use-stationery/Cards';
import Notebooks from '@/components/pages/use-stationery/Notebooks';
import Brochure from '@/components/pages/use-stationery/Brochure';
import Report from '@/components/pages/use-stationery/Report';
import { SlideArt } from '@/components/pages/use-stationery/Slides';
import { ARTWORK } from '@/components/pages/use-stationery/PrintArtwork';
import { Cap } from '@/components/pages/use-stationery/parts';
import s from '@/components/pages/use-stationery/use-stationery.module.css';

export const metadata = pageMeta('use-stationery');

const SLIDE_NAMES = ['Stacked lockup', 'Horizontal lockup', 'Palette', 'Scales', 'Construction of the mark'];
const { letterhead: Letterhead, envelope: Envelope, notebookNavy: NotebookNavy, notebookGreen: NotebookGreen, cardMark: CardMark, cardLockup: CardLockup, cardBack: CardBack } = ARTWORK;

export default function Page() {
  return (
    <section className="page" id="p-use-stationery" aria-label="Stationery">
      <header className={`wrap ${s.head}`}>
        <h1 tabIndex={-1} className="t-h1">Stationery</h1>
        <p className="t-line" lang="pt-BR">
          <Line text={LINES.bridge.text} strong={LINES.bridge.strong} className="hl-ink" />
        </p>
      </header>

      <Reveal as="figure" className={s.opening}>
        <div className="mock"><FlatLay /></div>
        <div className={s.openingCap}><Cap name="Flat lay" /></div>
      </Reveal>

      <div className={`wrap ${s.sec}`}>
        <div className={s.secHead}><h2 className="t-caps-lg">Pieces</h2></div>
        <div className={s.stairs}>
          <Reveal as="figure" className={s.plate}>
            <div className="mock"><Letter /></div>
            <Cap name="Letterhead and envelope" />
          </Reveal>
          <Reveal as="figure" className={`${s.plate} ${s.low}`} delay={80}>
            <div className="mock"><Cards /></div>
            <Cap name="Business cards" />
          </Reveal>
          <Reveal as="figure" className={s.plate}>
            <div className="mock"><Notebooks /></div>
            <Cap name="Pen and notebooks" />
          </Reveal>
          <Reveal as="figure" className={`${s.plate} ${s.low}`} delay={80}>
            <div className="mock"><Brochure /></div>
            <Cap name="Tri-fold brochure and folder" />
          </Reveal>
          <Reveal as="figure" className={`${s.plate} ${s.wide}`}>
            <div className="mock"><Report /></div>
            <Cap name="Report cover and slides" />
          </Reveal>
        </div>
      </div>

      <div className={`wrap ${s.sec}`}>
        <div className={s.secHead}><h2 className="t-caps-lg">Print artwork</h2></div>
        <div className={s.artGrid}>
          <figure className={s.artItem}><Letterhead /><Cap name="Letterhead" /></figure>
          <figure className={`${s.artItem} ${s.span2}`}><Envelope /><Cap name="Envelope" /></figure>
          <figure className={s.artItem}><NotebookNavy /><Cap name="Notebook, navy" /></figure>
          <figure className={s.artItem}><CardMark /><Cap name="Card front, mark" /></figure>
          <figure className={s.artItem}><CardLockup /><Cap name="Card front, lockup" /></figure>
          <figure className={s.artItem}><CardBack /><Cap name="Card back" /></figure>
          <figure className={s.artItem}><NotebookGreen /><Cap name="Notebook, green" /></figure>
        </div>
      </div>

      <div className={`wrap ${s.sec}`}>
        <div className={s.secHead}><h2 className="t-caps-lg">Slides</h2></div>
        <div className={s.strip} role="region" aria-label="Slides, scroll sideways" tabIndex={0}>
          {SLIDE_NAMES.map((name, k) => (
            <figure key={name} className={s.slide}>
              <SlideArt k={k} />
              <Cap name={name} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
