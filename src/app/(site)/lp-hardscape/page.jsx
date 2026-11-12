import { pageMeta } from '@/lib/pages';
import { LINES, MANIFESTO, CONTACT } from '@/lib/brand';
import Reveal from '@/components/site/Reveal';
import LandingNav from '@/components/ui/LandingNav';
import LandingFooter from '@/components/ui/LandingFooter';
import Button from '@/components/ui/Button';
import { Line } from '@/components/ui/Card';
import HeroCover from '@/components/pages/lp-hardscape/HeroCover';
import SectorCards from '@/components/pages/lp-hardscape/SectorCards';
import ModeBoard from '@/components/pages/lp-hardscape/ModeBoard';
import HandOver from '@/components/pages/lp-hardscape/HandOver';
import { SmallMark, DarkMark } from '@/components/pages/lp-hardscape/HardArt';
import s from '@/components/pages/lp-hardscape/lp-hardscape.module.css';

export const metadata = pageMeta('lp-hardscape');

export default function Page() {
  return (
    <section className="page" id="p-lp-hardscape" aria-label="Landing: Hardscape">
      {/* 1. Hero: the line, very large, on the gradient with the mark crop behind */}
      <div className={s.hero}>
        <HeroCover />
        <div className={s.scrim} />
        <div style={{ position: 'relative', zIndex: 2 }}><LandingNav current="lp-hardscape" /></div>
        <div className={`wrap ${s.heroBody}`}>
          <div className={s.heroMark}><SmallMark /></div>
          <h1 tabIndex={-1} className={s.heroTitle} lang="pt-BR">
            <Line text={LINES.ceo.text} strong={LINES.ceo.strong} className="strong" />
          </h1>
          <div className={s.heroActions}>
            <Button href="/lp-contato/" iconRight="arrow-right">HOME</Button>
            <Button href="/lp-manifesto/" variant="ghost">Manifesto</Button>
          </div>
        </div>
      </div>

      {/* 2. Two sector cards that flip */}
      <section className={`wrap ${s.sec}`} aria-labelledby="lp-hardscape-sectors-h">
        <Reveal className={s.secHead}>
          <h2 id="lp-hardscape-sectors-h" className="t-h2">Two sectors</h2>
          <span className={`${s.eyebrow} hl-ink`}>Click or press Enter to flip</span>
        </Reveal>
        <Reveal><SectorCards /></Reveal>
      </section>

      {/* 3. Mode switch re-lays the cards */}
      <section className={`${s.modeWrap} ${s.sec}`} aria-labelledby="lp-hardscape-mode-h">
        <div className="wrap">
          <Reveal className={s.secHead}>
            <h2 id="lp-hardscape-mode-h" className="t-h2">Two modes</h2>
            <span className={`${s.eyebrow} hl`}>CRM / Agenda / Financeiro</span>
          </Reveal>
          <Reveal><ModeBoard /></Reveal>
        </div>
      </section>

      {/* 4. Manifesto opening as a card */}
      <section className={`wrap ${s.sec}`} aria-labelledby="lp-hardscape-open-h">
        <h2 id="lp-hardscape-open-h" className="sr-only">Manifesto, opening</h2>
        <Reveal className={`field-paper ${s.openCard}`}>
          <p lang="pt-BR">
            <Line text={MANIFESTO[0]} strong="Tijolo por tijolo, jardim por jardim." className="strong" />
          </p>
          <div className={s.openAside}>
            <span className={`${s.eyebrow} hl-ink`}>Manifesto</span>
            <Button href="/lp-manifesto/" variant="navy" iconRight="arrow-right">Read on</Button>
          </div>
        </Reveal>
      </section>

      {/* 5. First to arrive, last to leave */}
      <section className={`${s.over} ${s.sec}`} aria-labelledby="lp-hardscape-over-h">
        <div className="wrap">
          <Reveal>
            <h2 id="lp-hardscape-over-h" className={s.overHead} lang="pt-BR">{MANIFESTO[3]}</h2>
          </Reveal>
          <div className={s.overGrid}>
            <Reveal className={s.overText}>
              <p lang="pt-BR">
                <Line text={MANIFESTO[2]} strong={['primeiro a chegar na obra', 'último a sair do escritório']} className="strong" />
              </p>
            </Reveal>
            <Reveal delay={120}><HandOver /></Reveal>
          </div>
        </div>
      </section>

      {/* 6. Credibility line on mint with the dark mark (brochure m16) */}
      <section className={`wrap ${s.sec}`} aria-labelledby="lp-hardscape-cred-h">
        <h2 id="lp-hardscape-cred-h" className="sr-only">Credibility</h2>
        <Reveal className={s.cred}>
          <div className={s.credMark}><DarkMark /></div>
          <p className={s.credLine} lang="pt-BR">
            <Line text={LINES.credibility.text} strong={LINES.credibility.strong} className="strong" />
          </p>
          <p className={s.credFoot}>{CONTACT.phone}<br />{CONTACT.web}</p>
          <span className={s.credWord} aria-hidden="true">UpCanopy</span>
        </Reveal>
      </section>

      {/* 7. CTA */}
      <section className={`wrap ${s.sec}`} aria-labelledby="lp-hardscape-cta-h">
        <Reveal className={s.cta}>
          <h2 id="lp-hardscape-cta-h" className={s.ctaLine} lang="pt-BR">{LINES.level}</h2>
          <div className="row">
            <Button href="/lp-contato/" iconRight="arrow-right">HOME</Button>
            <Button href="/lp-financeiro/" variant="ghost">Financeiro</Button>
          </div>
        </Reveal>
      </section>

      <LandingFooter />
    </section>
  );
}
