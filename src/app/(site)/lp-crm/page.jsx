import Link from 'next/link';
import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import LandingNav from '@/components/ui/LandingNav';
import LandingFooter from '@/components/ui/LandingFooter';
import Button from '@/components/ui/Button';
import Icon from '@/components/site/Icon';
import { Line } from '@/components/ui/Card';
import { LINES, MANIFESTO, PILLARS, SECTORS, TONE } from '@/lib/brand';
import CrmBoard from '@/components/pages/lp-crm/CrmBoard';
import OrderSlider from '@/components/pages/lp-crm/OrderSlider';
import ClientList from '@/components/pages/lp-crm/ClientList';
import { ScalesArt, FrondArt, BoardOutlineArt, MarkTileArt, StageFlowArt } from '@/components/pages/lp-crm/CrmArt';
import s from '@/components/pages/lp-crm/lp-crm.module.css';

export const metadata = pageMeta('lp-crm');

// MANIFESTO paragraph 6, verbatim: its first sentence is the headline, its second begins the pillar line.
const P6 = MANIFESTO[5].split('. ');
const ORG = `${P6[1]}.`;
const HEAD = P6[0].split(' ');
const HEAD_LAST = HEAD.pop();

export default function Page() {
  const quote = TONE.points[0];
  const trust = TONE.points[1];
  return (
    <section className="page" id="p-lp-crm" aria-label="Landing: CRM">
      {/* 1. Hero on mint: headline left, the live board across the right two thirds */}
      <header className={s.hero}>
        <LandingNav current="lp-crm" tone="light" />
        <div className={s.heroGrid}>
          <div className={s.heroText}>
            <p className={`t-caps ${s.kicker}`}><span className={s.kickerBar} aria-hidden="true" />CRM</p>
            <h1 className={`t-display ${s.h1}`} lang="pt-BR">
              <span className={s.h1Line}>{HEAD.join(' ')}</span>{' '}
              <span className={s.h1Strong}>{HEAD_LAST}.</span>
            </h1>
            <p className="t-small" style={{ maxWidth: '28em' }}>
              Move a card with its buttons, with the left and right arrow keys, or by dragging it to another column.
            </p>
            <p className="t-line" lang="pt-BR" style={{ marginTop: 8 }}>
              <Line text={ORG} strong="Organização" className="hl-ink" />
            </p>
          </div>
          <div className={s.heroBoard}><CrmBoard /></div>
        </div>
      </header>

      {/* 2. Masonry of mixed-size cards */}
      <section className={`wrap ${s.sec}`} aria-labelledby="lp-crm-h-masonry">
        <Reveal><h2 id="lp-crm-h-masonry" className="t-caps-lg">Cards</h2></Reveal>
        <div className={s.masonry}>
          <Reveal className={`${s.m} ${s.mLine} field-rise`}>
            <p className="t-caps" style={{ opacity: 0.8 }}>01</p>
            <p className={`t-line ${s.mLineText}`} lang="pt-BR"><Line text={LINES.bridge.text} strong={LINES.bridge.strong} className="hl" /></p>
          </Reveal>
          <Reveal delay={80} className={`${s.m} ${s.mPillar} card-navy`}>
            <p className="t-label on-navy">{PILLARS[0]}</p>
            <p className="t-h2" lang="pt-BR" style={{ marginTop: 12 }}>
              <Line text={ORG} strong="Organização" className="hl" />
            </p>
          </Reveal>
          <Reveal delay={120} className={`${s.m} ${s.mScales} card-slide`}>
            <div className="card-head"><h3 className="t-caps-lg">SCALES</h3><span className="t-label">10 dots</span></div>
            <ScalesArt />
          </Reveal>
          <Reveal delay={60} className={`${s.m} ${s.mFrond}`}><FrondArt /></Reveal>
          <Reveal delay={100} className={`${s.m} ${s.mTile}`}><MarkTileArt /></Reveal>
          <Reveal delay={160} className={`${s.m} ${s.mSector} card`}>
            <p className="t-label">Sectors</p>
            <ul className={s.sectorList}>
              {SECTORS.map((n) => <li key={n} className="t-h2">{n}</li>)}
            </ul>
          </Reveal>
          <Reveal delay={140} className={`${s.m} ${s.mOutline} card`}>
            <p className="t-label">Structure</p>
            <BoardOutlineArt />
          </Reveal>
        </div>
      </section>

      {/* 3. Informality to order */}
      <section className={`${s.sec} ${s.orderBand}`} aria-labelledby="lp-crm-h-order">
        <div className="wrap">
          <Reveal>
                        <h2 id="lp-crm-h-order" className="t-h1" style={{ marginTop: 12, maxWidth: '16em' }}>
              Before <span className="hl">and after</span>
            </h2>
          </Reveal>
          <Reveal delay={100} className={s.sliderWrap}><OrderSlider /></Reveal>
        </div>
      </section>

      {/* 4. Client list */}
      <section className={`wrap ${s.sec}`} aria-labelledby="lp-crm-h-list">
        <div className={s.listHead}>
          <Reveal><h2 id="lp-crm-h-list" className="t-h2">Client list</h2></Reveal>
          <Reveal delay={80}><p className="t-lead" lang="pt-BR">{MANIFESTO[6].split('. ')[1]}</p></Reveal>
        </div>
        <Reveal delay={120} className={`card ${s.listCard}`}><ClientList /></Reveal>
        <Reveal delay={160} className={s.flow}><StageFlowArt /></Reveal>
      </section>

      {/* 5. Pull quote from the tone of voice */}
      <section className={`${s.quoteBand} field-green`} aria-labelledby="lp-crm-h-quote">
        <div className="wrap">
          <Reveal>
            <p className="t-caps">{TONE.title}</p>
            <h2 id="lp-crm-h-quote" className="t-h2" lang="pt-BR" style={{ marginTop: 16 }}>{quote.title}</h2>
            <hr className="rule" style={{ margin: '24px 0', maxWidth: 160, height: 6 }} />
            <blockquote className={`t-display ${s.quote}`} lang="pt-BR">{quote.text[0]}</blockquote>
            <p className="t-lead" lang="pt-BR" style={{ marginTop: 24, maxWidth: '38em' }}>{quote.text[1]}</p>
          </Reveal>
        </div>
      </section>

      {/* 6. Trust card */}
      <section className={`wrap ${s.sec}`} aria-labelledby="lp-crm-h-trust">
        <div className={s.trust}>
          <Reveal className={`card-navy ${s.trustMain}`}>
            <p className="t-label on-navy">{PILLARS[2]}</p>
            <h2 id="lp-crm-h-trust" className="t-h2 hl" lang="pt-BR" style={{ marginTop: 12 }}>{trust.title}</h2>
            <p className="t-lead" lang="pt-BR" style={{ marginTop: 20 }}>{trust.text[0]}</p>
          </Reveal>
          <Reveal delay={100} className={`card ${s.trustSide}`}>
            <p className="t-body" lang="pt-BR">{trust.text[1]}</p>
          </Reveal>
          <Reveal delay={160} className={`card-line ${s.trustSide}`}>
            <p className="t-body" lang="pt-BR">{trust.text[2]}</p>
          </Reveal>
        </div>
      </section>

      {/* 7. CTA */}
      <section className={`${s.cta} field-rise`} aria-labelledby="lp-crm-h-cta">
        <div className="wrap">
          <Reveal>
            <h2 id="lp-crm-h-cta" className="t-display" lang="pt-BR">
              <Line text={LINES.control} strong="Assuma o controle." className="hl" />
            </h2>
            <div className="row" style={{ marginTop: 32, gap: 12 }}>
              <Button href="/lp-contato/" variant="white" iconRight="arrow-right">Contact</Button>
              <Link href="/lp-agenda/" className="btn btn-ghost">Agenda <Icon name="arrow-right" size={16} /></Link>
              <Link href="/lp-financeiro/" className="btn btn-ghost">Financeiro <Icon name="arrow-right" size={16} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <LandingFooter />
    </section>
  );
}
