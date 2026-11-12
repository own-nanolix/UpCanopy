import { pageMeta } from '@/lib/pages';
import { LINES, MANIFESTO } from '@/lib/brand';
import Reveal from '@/components/site/Reveal';
import Button from '@/components/ui/Button';
import { Line } from '@/components/ui/Card';
import LandingFooter from '@/components/ui/LandingFooter';
import Hero from '@/components/pages/lp-manifesto/Hero';
import Steps from '@/components/pages/lp-manifesto/Steps';
import Pillars from '@/components/pages/lp-manifesto/Pillars';
import Level from '@/components/pages/lp-manifesto/Level';
import Closing from '@/components/pages/lp-manifesto/Closing';
import s from '@/components/pages/lp-manifesto/lp-manifesto.module.css';

export const metadata = pageMeta('lp-manifesto');

export default function Page() {
  return (
    <section className="page" id="p-lp-manifesto" aria-label="Landing: Manifesto" style={{ paddingBottom: 0 }}>
      <Hero />

      <section className={`band ${s.stepsBand}`} aria-labelledby="lp-manifesto-steps-h">
        <div className="wrap">
          <Reveal>
            <h2 id="lp-manifesto-steps-h" className="t-caps-lg" style={{ marginBottom: 28 }}>The manifesto, card by card</h2>
          </Reveal>
          <Steps />
        </div>
      </section>

      <section className={`field-navy ${s.turn}`} aria-labelledby="lp-manifesto-turn-h">
        <div className="wrap">
          <Reveal>
            <p className="t-label on-navy">04 / 10</p>
            <h2 id="lp-manifesto-turn-h" lang="pt-BR" className={s.turnTitle}>{MANIFESTO[3]}</h2>
            <span className={s.turnBar} aria-hidden="true" />
          </Reveal>
        </div>
      </section>

      <section className="band" aria-labelledby="lp-manifesto-pillars-h">
        <div className="wrap">
          <Reveal>
            <h2 id="lp-manifesto-pillars-h" className="t-caps-lg" style={{ marginBottom: 28 }}>The three pillars</h2>
          </Reveal>
          <Reveal delay={80}>
            <Pillars />
          </Reveal>
        </div>
      </section>

      <section className={`band ${s.levelBand}`} aria-label="Two modes">
        <div className="wrap">
          <Reveal>
            <Level />
          </Reveal>
        </div>
      </section>

      <section aria-label="Closing lines">
        <Closing />
      </section>

      <section className={`field-navy ${s.cta}`} aria-labelledby="lp-manifesto-cta-h">
        <div className="wrap">
          <Reveal>
            <h2 id="lp-manifesto-cta-h" lang="pt-BR" className="t-display">
              <Line text={LINES.bridge.text} strong={LINES.bridge.strong} className="hl" />
            </h2>
            <div className="row" style={{ marginTop: 32, gap: 12 }}>
              <Button href="/lp-contato/" iconRight="arrow-right">Contact</Button>
              <Button href="/lp-home/" variant="ghost">Back to home</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <LandingFooter />
    </section>
  );
}
