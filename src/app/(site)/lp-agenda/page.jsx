import Link from 'next/link';
import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import LandingNav from '@/components/ui/LandingNav';
import LandingFooter from '@/components/ui/LandingFooter';
import Button from '@/components/ui/Button';
import Icon from '@/components/site/Icon';
import { Line } from '@/components/ui/Card';
import { LINES, MANIFESTO, VALUES } from '@/lib/brand';
import WeekGrid from '@/components/pages/lp-agenda/WeekGrid';
import DayTimeline from '@/components/pages/lp-agenda/DayTimeline';
import { StepArt, WeekOutlineArt, CalmScaleArt } from '@/components/pages/lp-agenda/AgendaArt';
import s from '@/components/pages/lp-agenda/lp-agenda.module.css';

export const metadata = pageMeta('lp-agenda');

// MANIFESTO paragraph 3, split where its sentences end.
const SENT = MANIFESTO[2].split('. ');
const STEPS = [
  { kind: 'morning', label: 'Morning', text: SENT[1] + '.', dark: false },
  { kind: 'site', label: 'Site', text: SENT[3], dark: true },
  { kind: 'evening', label: 'Evening', text: SENT[2] + '.', dark: false },
];
const DISC = VALUES.points[0];

export default function Page() {
  return (
    <section className="page" id="p-lp-agenda" aria-label="Landing: Agenda">
      {/* 1. Hero: the live week, full-bleed on navy, headline overlaid top left */}
      <header className={`${s.hero} field-navy`}>
        <LandingNav current="lp-agenda" />
        <div className={s.stage}>
          <div className={s.headline}>
            <h1 className={`t-display ${s.h1}`} lang="pt-BR">
              <span className={s.problem}>{SENT[1]}. {SENT[2]}.</span>{' '}
              <span className={s.answer}><Line text={LINES.enough} strong="chega." className="hl" /></span>
            </h1>
          </div>
          <WeekGrid />
        </div>
      </header>

      {/* 2. Three stacked horizontal cards: the steps of the day */}
      <section className={`wrap ${s.sec}`} aria-labelledby="lp-agenda-h-steps">
        <Reveal><h2 id="lp-agenda-h-steps" className="t-h1">One day, three steps</h2></Reveal>
        <ol className={s.steps}>
          {STEPS.map((st, i) => (
            <li key={st.kind}>
              <Reveal delay={i * 90} className={`${s.step} ${st.dark ? 'card-navy' : 'card'}`}>
                <p className={`t-figure ${s.stepNo}`} style={st.dark ? { color: 'var(--green)' } : undefined} aria-hidden="true">0{i + 1}</p>
                <div className={s.stepMain}>
                  <h3 className="t-caps-lg">{st.label}</h3>
                  <p className="t-h2" lang="pt-BR" style={{ marginTop: 10 }}>{st.text}</p>
                  <p className={s.stepPh} aria-hidden="true"><span className="ph" style={{ width: '9em' }} /><span className="ph" style={{ width: '5em' }} /></p>
                </div>
                <div className={s.stepArt}><StepArt kind={st.kind} dark={st.dark} /></div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* 3. Scrub the day */}
      <section className={`${s.sec} ${s.scrubBand}`} aria-labelledby="lp-agenda-h-scrub">
        <div className="wrap">
          <Reveal>
            <p className="t-caps" style={{ color: 'var(--green-ink)' }}>Day</p>
            <h2 id="lp-agenda-h-scrub" className="t-h1" style={{ margin: '10px 0 28px' }}>Scrub the day</h2>
          </Reveal>
          <Reveal delay={100}><DayTimeline /></Reveal>
        </div>
      </section>

      {/* 4. Disciplina as a card pair */}
      <section className={`wrap ${s.sec}`} aria-labelledby="lp-agenda-h-disc">
        <Reveal>
          <p className="t-caps" style={{ color: 'var(--green-ink)' }}>{VALUES.title}</p>
          <h2 id="lp-agenda-h-disc" className="t-h1" lang="pt-BR" style={{ marginTop: 10 }}>{DISC.title}</h2>
        </Reveal>
        <div className={s.pair}>
          <Reveal className="card-navy">
            <p className="t-lead" lang="pt-BR">{DISC.text[0]}</p>
            <p className="t-body" lang="pt-BR" style={{ marginTop: 18 }}>{DISC.text[1]}</p>
          </Reveal>
          <Reveal delay={100} className="card">
            <p className="t-body" lang="pt-BR">{DISC.text[2]}</p>
            <div style={{ marginTop: 20 }}><WeekOutlineArt /></div>
          </Reveal>
        </div>
      </section>

      {/* 5. The level band */}
      <section className={`${s.sec} ${s.levelBand} field-dark`} aria-labelledby="lp-agenda-h-level">
        <div className="wrap">
          <Reveal>
            <h2 id="lp-agenda-h-level" className="t-display" lang="pt-BR">
              <Line text={LINES.level} strong="elevamos" className="hl" />
            </h2>
            <div style={{ marginTop: 36, maxWidth: 760 }}><CalmScaleArt /></div>
          </Reveal>
        </div>
      </section>

      {/* 6. The dynamic of the two values */}
      <section className={`wrap ${s.sec}`} aria-labelledby="lp-agenda-h-sum">
        <Reveal><h2 id="lp-agenda-h-sum" className="t-caps-lg" lang="pt-BR">{VALUES.summary.title}</h2></Reveal>
        <div className={s.sum}>
          <Reveal className="card-slide"><p className="t-h3" lang="pt-BR">{VALUES.summary.text[0].replace('• ', '')}</p></Reveal>
          <Reveal delay={80} className="card-slide"><p className="t-h3" lang="pt-BR">{VALUES.summary.text[1].replace('• ', '')}</p></Reveal>
          <Reveal delay={160} className={`${s.sumWide} card-line`}><p className="t-lead" lang="pt-BR">{VALUES.summary.text[2]}</p></Reveal>
        </div>
      </section>

      {/* 7. CTA band */}
      <section className={`${s.cta} field-green`} aria-labelledby="lp-agenda-h-cta">
        <div className="wrap">
          <Reveal>
            <h2 id="lp-agenda-h-cta" className="t-display" lang="pt-BR">{LINES.control}</h2>
            <div className="row" style={{ marginTop: 32, gap: 12 }}>
              <Button href="/lp-contato/" variant="navy" iconRight="arrow-right">HOME</Button>
              <Link href="/lp-crm/" className="btn btn-ghost">CRM <Icon name="arrow-right" size={16} /></Link>
              <Link href="/lp-financeiro/" className="btn btn-ghost">Financeiro <Icon name="arrow-right" size={16} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <LandingFooter />
    </section>
  );
}
