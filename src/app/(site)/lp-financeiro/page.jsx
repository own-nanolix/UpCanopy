import { pageMeta } from '@/lib/pages';
import { DESCRIPTOR, LINES, PERSONALITY, TAGLINE, TONE, VALUES, VISUAL_IDENTITY, CONTACT } from '@/lib/brand';
import Reveal from '@/components/site/Reveal';
import Icon from '@/components/site/Icon';
import LandingNav from '@/components/ui/LandingNav';
import LandingFooter from '@/components/ui/LandingFooter';
import Button from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import { Line } from '@/components/ui/Card';
import Ledger from '@/components/pages/lp-financeiro/Ledger';
import ColumnBoard from '@/components/pages/lp-financeiro/ColumnBoard';
import { InvoiceArt, LetterArt, ScalesArt, HeroFrond, StepsArt } from '@/components/pages/lp-financeiro/FinArt';
import s from '@/components/pages/lp-financeiro/lp-financeiro.module.css';

export const metadata = pageMeta('lp-financeiro');

const HEADLINE = VALUES.points[1].text[0]; // "A confiança é a moeda de troca para o modelo de negócios funcionar."
const CONFIDENCE = VALUES.points[1].text[1];
const BULLET = TONE.points[1].text[1];
const SYMBOL = TONE.points[1].text[2];
const SUMMARY = VALUES.summary.text;

const PILLAR_CARDS = [
  { word: 'Confiança', icon: 'link', line: 'Nossa promessa é a Confiança.', cls: 'card-navy' },
  { word: 'Disciplina', icon: 'ruler', line: 'Nossa linguagem é a Disciplina.', cls: 'card-green' },
  { word: 'Organização', icon: 'layers', line: 'Nossa obsessão é a Organização.', cls: 'card' },
  { word: DESCRIPTOR, icon: 'briefcase', line: TAGLINE, cls: 'field-dark' },
];

export default function Page() {
  return (
    <section className="page" id="p-lp-financeiro" aria-label="Landing: Financeiro">
      {/* 1. Hero: dark green, live ledger left, headline right */}
      <div className={`field-dark ${s.hero}`}>
        <div className={s.heroBg}><HeroFrond /></div>
        <LandingNav current="lp-financeiro" />
        <div className={`wrap ${s.heroGrid}`}>
          <Ledger />
          <div className={s.heroText}>
            <h1 tabIndex={-1} className={`t-display ${s.heroTitle}`} lang="pt-BR">
              <Line text={HEADLINE} strong="moeda de troca" className="hl" />
            </h1>
            <p className={`t-lead ${s.heroConf}`} lang="pt-BR">{CONFIDENCE}</p>
            <div className={s.heroMeta}>
              {PERSONALITY.map((p) => <Chip key={p} tone="mint" lang="pt-BR">{p}</Chip>)}
              <Button href="/lp-contato/" variant="white" iconRight="arrow-right">HOME</Button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 2 x 2 of square cards */}
      <section className={`wrap ${s.sec}`} aria-labelledby="lp-financeiro-quad-h">
        <Reveal className={s.secHead}>
          <h2 id="lp-financeiro-quad-h" className="t-h2">Three pillars and a descriptor</h2>
          <span className={s.eyebrow}>Financeiro</span>
        </Reveal>
        <div className={s.quad}>
          {PILLAR_CARDS.map((c, i) => (
            <Reveal key={c.word} delay={i * 90} from="scale" className={`${s.sq} ${c.cls}`} tabIndex={0}>
              <div className="card-head">
                <span className={s.sqIcon}><Icon name={c.icon} size={30} /></span>
                <span className={s.sqDots} aria-hidden="true">{[0, 1, 2].map((d) => <i key={d} />)}</span>
              </div>
              <div>
                <p className={s.sqWord} lang={i === 3 ? undefined : 'pt-BR'}>{c.word}</p>
                <p className={s.sqLine} lang="pt-BR" style={{ marginTop: 12 }}>{c.line}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 3. Statement columns: a working table */}
      <section className={`wrap ${s.sec}`} aria-labelledby="lp-financeiro-cols-h">
        <Reveal className={s.secHead}>
          <h2 id="lp-financeiro-cols-h" className="t-h2">Statement columns</h2>
          <span className="t-small">Show a column, sort the rows.</span>
        </Reveal>
        <Reveal><ColumnBoard /></Reveal>
      </section>

      {/* 4. Invoice card */}
      <section className={`wrap ${s.sec}`} aria-labelledby="lp-financeiro-invoice-h">
        <div className={s.pair}>
          <Reveal className={s.plate}><InvoiceArt /></Reveal>
          <Reveal delay={120} className={`card-navy ${s.sideCard}`}>
            <div>
              <h2 id="lp-financeiro-invoice-h" className="t-caps-lg">Invoice</h2>
              <p className="t-lead" style={{ marginTop: 18 }} lang="pt-BR">{VISUAL_IDENTITY}</p>
            </div>
            <ul className={s.legend} aria-label="Invoice labels">
              <li><span>Bank Account n°</span><span className="ph" style={{ minWidth: '5em' }} /></li>
              <li><span>Bank Detail</span><span className="ph" style={{ minWidth: '7em' }} /></li>
              <li><span>Total</span><span className="ph" style={{ minWidth: '4em' }} /></li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 5. Compliance letter */}
      <section className={`wrap ${s.sec}`} aria-labelledby="lp-financeiro-letter-h">
        <div className={`${s.pair} ${s.pairRev}`}>
          <Reveal className={`card-green ${s.sideCard}`}>
            <div>
              <h2 id="lp-financeiro-letter-h" className="t-caps-lg">Compliance letter</h2>
              <p className="t-h2" style={{ marginTop: 18 }} lang="pt-BR">{LINES.close}</p>
            </div>
            <address className="t-body" style={{ fontStyle: 'normal' }}>
              <span className="strong">{CONTACT.phone}</span><br />
              {CONTACT.sac}
            </address>
          </Reveal>
          <Reveal delay={120} className={s.plate}><LetterArt /></Reveal>
        </div>
      </section>

      {/* 6. Trust card row */}
      <section className={`wrap ${s.sec}`} aria-labelledby="lp-financeiro-trust-h">
        <Reveal className={s.secHead}>
          <h2 id="lp-financeiro-trust-h" className="t-h2">Trust</h2>
          <span className={s.eyebrow} lang="pt-BR">{PERSONALITY[0]}</span>
        </Reveal>
        <div className={s.trust}>
          <Reveal className={`card-navy ${s.trustCard}`}>
            <span className={`${s.trustNum} hl`}>01</span>
            <p className={s.trustText} lang="pt-BR">{BULLET}</p>
          </Reveal>
          <Reveal delay={100} className={`card ${s.trustCard}`}>
            <span className={`${s.trustNum} hl-ink`}>02</span>
            <p className={s.trustText} lang="pt-BR">{SYMBOL}</p>
          </Reveal>
          <Reveal delay={200} className={`card-green ${s.trustCard}`}>
            <span className={s.trustNum}>03</span>
            <p className={s.trustText} lang="pt-BR">{SUMMARY[1]}</p>
          </Reveal>
        </div>
        <Reveal className={`card-slide ${s.scaleCard}`}>
          <div>
            <h3 className="t-caps-lg">Scales</h3>
            <p className="t-small" style={{ marginTop: 10 }} lang="pt-BR">{SUMMARY[0]}</p>
          </div>
          <ScalesArt />
        </Reveal>
      </section>

      {/* 7. CTA */}
      <section className={`wrap ${s.sec}`} aria-labelledby="lp-financeiro-cta-h">
        <Reveal className={`field-rise ${s.cta}`}>
          <div className={s.ctaBody}>
            <h2 id="lp-financeiro-cta-h" className="t-display" lang="pt-BR">
              <Line text={LINES.control} strong="Assuma o controle." className="hl" />
            </h2>
            <div className="row">
              <Button href="/lp-contato/" variant="white" iconRight="arrow-right">HOME</Button>
              <Button href="/lp-agenda/" variant="ghost">Agenda</Button>
            </div>
          </div>
          <StepsArt />
        </Reveal>
      </section>

      <LandingFooter />
    </section>
  );
}
