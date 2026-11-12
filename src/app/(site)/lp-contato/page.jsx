import { pageMeta } from '@/lib/pages';
import { LINES, PILLARS, PALETTE, CONTACT } from '@/lib/brand';
import Reveal from '@/components/site/Reveal';
import CopyValue from '@/components/site/CopyValue';
import Button from '@/components/ui/Button';
import { Line } from '@/components/ui/Card';
import LandingFooter from '@/components/ui/LandingFooter';
import Hero from '@/components/pages/lp-contato/Hero';
import Picker from '@/components/pages/lp-contato/Picker';
import Channels from '@/components/pages/lp-contato/Channels';
import { Letter, Badge, WallSign } from '@/components/pages/lp-contato/Objects';
import { CardFront, CardBack, Strip, Layout } from '@/components/pages/lp-contato/Plates';
import s from '@/components/pages/lp-contato/lp-contato.module.css';

export const metadata = pageMeta('lp-contato');

export default function Page() {
  return (
    <section className="page" id="p-lp-contato" aria-label="Landing: Contact" style={{ paddingBottom: 0 }}>
      <Hero />

      <section className={`band ${s.pickBand}`} aria-labelledby="lp-contato-pick-h">
        <div className="wrap">
          <Reveal>
            <h2 id="lp-contato-pick-h" className="t-caps-lg" style={{ marginBottom: 28 }}>Pick a channel</h2>
            <Picker />
          </Reveal>
        </div>
      </section>

      <section className="band" aria-labelledby="lp-contato-channels-h">
        <div className="wrap">
          <Reveal>
            <h2 id="lp-contato-channels-h" className="t-caps-lg" style={{ marginBottom: 28 }}>Channels</h2>
          </Reveal>
          <Channels />
        </div>
      </section>

      <section className={`field-navy ${s.plates}`} aria-labelledby="lp-contato-plates-h">
        <div className="wrap">
          <Reveal>
            <h2 id="lp-contato-plates-h" className="t-caps-lg">Business card plates</h2>
            <p className="t-small on-navy" style={{ marginTop: 8 }}>Printed proportion 1.75 : 1. Front and back are exportable.</p>
          </Reveal>
          <div className={s.plateGrid}>
            <Reveal className={s.plate}>
              <figure>
                <CardFront />
                <figcaption className="t-caps">Front: {PALETTE[1].name} {PALETTE[1].hex}, mark in {PALETTE[0].name}</figcaption>
              </figure>
            </Reveal>
            <Reveal delay={120} className={s.plate}>
              <figure>
                <CardBack />
                <figcaption className="t-caps">Back: {PALETTE[0].name} {PALETTE[0].hex}, details as printed</figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      <div className={`wrap ${s.mosaic}`}>
        <section className={s.letterCell} aria-labelledby="lp-contato-letter-h">
          <Reveal className={s.objCard}>
            <h2 id="lp-contato-letter-h" className="t-caps-lg">Compliance letter</h2>
            <div className={s.letterArt}><Letter /></div>
          </Reveal>
        </section>
        <section className={s.badgeCell} aria-labelledby="lp-contato-badge-h">
          <Reveal delay={100} className={`${s.objCard} ${s.objDeep}`}>
            <h2 id="lp-contato-badge-h" className="t-caps-lg">Badge</h2>
            <div className={s.badgeArt}><Badge /></div>
          </Reveal>
        </section>
        <section className={s.signCell} aria-labelledby="lp-contato-sign-h">
          <Reveal delay={60} className={`${s.objCard} ${s.objWall}`}>
            <h2 id="lp-contato-sign-h" className="t-caps-lg">Wall sign</h2>
            <div className={s.signArt}><WallSign /></div>
          </Reveal>
        </section>
      </div>

      <section className="band" style={{ background: 'var(--mint-paper)' }} aria-labelledby="lp-contato-habit-h">
        <div className="wrap">
          <Reveal>
            <h2 id="lp-contato-habit-h" className="t-caps-lg">Where the contacts sit</h2>
            <p className="t-small" style={{ marginTop: 8, marginBottom: 24 }}>Mark in one corner, brand line opposite, contacts small at bottom right.</p>
          </Reveal>
          <div className={s.habitGrid}>
            {['rise', 'mint'].map((tone, k) => (
              <Reveal key={tone} delay={k * 100}>
                <Layout tone={tone} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`band ${s.lines}`} aria-labelledby="lp-contato-strips-h">
        <div className="wrap">
          <Reveal>
            <div className={s.stripHead}>
              <h2 id="lp-contato-strips-h" className="t-caps-lg">Contact strips</h2>
              <p className="t-small">
                The folder and envelope line: <CopyValue value={CONTACT.footer} label="contact line" />
              </p>
            </div>
          </Reveal>
          <div className={s.stripStack}>
            {['navy', 'green', 'mint'].map((tone, k) => (
              <Reveal key={tone} delay={k * 80}>
                <Strip tone={tone} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`band ${s.strip}`} aria-labelledby="lp-contato-pillars-h">
        <div className="wrap">
          <Reveal>
            <h2 id="lp-contato-pillars-h" className="sr-only">Pillars</h2>
            <ul className={s.pillars} lang="pt-BR">
              {PILLARS.map((p, k) => (
                <li key={p} className={`${s.pillar} ${s[`pl${k}`]}`}>
                  <span className={s.pillarNo}>{`0${k + 1}`}</span>
                  <span className={s.pillarWord}>{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className={`field-navy ${s.cta}`} aria-labelledby="lp-contato-cta-h">
        <div className="wrap">
          <Reveal>
            <h2 id="lp-contato-cta-h" lang="pt-BR" className="t-h1" style={{ maxWidth: '22em' }}>
              <Line text={LINES.credibility.text} strong={LINES.credibility.strong} className="hl" />
            </h2>
            <div className="row" style={{ marginTop: 32, gap: 12 }}>
              <Button href="/lp-manifesto/" iconRight="arrow-right">Read the manifesto</Button>
              <Button href="/lp-home/" variant="ghost">Back to home</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <LandingFooter />
    </section>
  );
}
