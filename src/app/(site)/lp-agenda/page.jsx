import Link from 'next/link';
import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import LandingNav from '@/components/ui/LandingNav';
import LandingFooter from '@/components/ui/LandingFooter';
import Button from '@/components/ui/Button';
import Icon from '@/components/site/Icon';
import { Line } from '@/components/ui/Card';
import { LINES, MANIFESTO, VALUES, PILLARS, AREAS } from '@/lib/brand';
import WeekGrid from '@/components/pages/lp-agenda/WeekGrid';
import DayTimeline from '@/components/pages/lp-agenda/DayTimeline';
import { StepArt, WeekOutlineArt, CalmScaleArt } from '@/components/pages/lp-agenda/AgendaArt';
import MonthWeek from '@/components/pages/lp-agenda/MonthWeek';
import DayNow from '@/components/pages/lp-agenda/DayNow';
import { AppointmentCard, ReminderRows } from '@/components/pages/lp-agenda/AppointmentCard';
import { WeekGridArt, DayLaneArt } from '@/components/pages/lp-agenda/ExportArt';
import s from '@/components/pages/lp-agenda/lp-agenda.module.css';
import m from '@/components/pages/lp-agenda/modules.module.css';

export const metadata = pageMeta('lp-agenda');

// MANIFESTO paragraph 3, split where its sentences end.
const SENT = MANIFESTO[2].split('. ');
const STEPS = [
  { kind: 'morning', label: 'Morning', text: SENT[1] + '.', dark: false },
  { kind: 'site', label: 'Site', text: SENT[3], dark: true },
  { kind: 'evening', label: 'Evening', text: SENT[2] + '.', dark: false },
];
const DISC = VALUES.points[0];
// MANIFESTO paragraph 6: one sentence per pillar. Paragraph 7 names the three areas.
const PSENT = MANIFESTO[5].split('. ');
const PILLAR_TEXT = [PSENT[1] + '.', PSENT[2] + '.', PSENT[3]];
const AREA_LINK = { CRM: '/lp-crm/', Agenda: '/lp-agenda/', Financeiro: '/lp-financeiro/' };
const AREA_ICON = { CRM: 'users', Agenda: 'calendar', Financeiro: 'chart' };
const CARE = MANIFESTO[6].split('. ')[1];

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
        <Reveal><h2 id="lp-agenda-h-steps" className="t-h1">Three steps</h2></Reveal>
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

      {/* 3. Modular product cards that reflow */}
      <section className={`wrap ${s.sec}`} aria-labelledby="lp-agenda-h-cards">
        <Reveal>
          <p className="t-caps" style={{ color: 'var(--green-ink)' }}>Agenda</p>
          <h2 id="lp-agenda-h-cards" className="t-h1" style={{ marginTop: 10 }}>Week and month</h2>
        </Reveal>
        <div className={m.bento}>
          <Reveal className={`${m.bentoWide} card`}><MonthWeek /></Reveal>
          <div className={m.bentoSide}>
            <Reveal delay={80}><AppointmentCard /></Reveal>
            <Reveal delay={160} className="card-navy">
              <h3 className="t-caps-lg" style={{ marginBottom: 8 }}>Reminders</h3>
              <ReminderRows />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. The week as a drawing, exportable */}
      <section className={`${s.sec} field-navy ${s.drawBand}`} aria-labelledby="lp-agenda-h-draw">
        <div className="wrap">
          <Reveal>
            <h2 id="lp-agenda-h-draw" className="t-h1" lang="pt-BR">{LINES.control.split('. ')[1]}</h2>
          </Reveal>
          <Reveal delay={100}><div className={s.drawFrame}><WeekGridArt /></div></Reveal>
        </div>
      </section>

      {/* 5. Scrub the day */}
      <section className={`${s.sec} ${s.scrubBand}`} aria-labelledby="lp-agenda-h-scrub">
        <div className="wrap">
          <Reveal>
            <p className="t-caps" style={{ color: 'var(--green-ink)' }}>Day</p>
            <h2 id="lp-agenda-h-scrub" className="t-h1" style={{ margin: '10px 0 28px' }}>Day scrubber</h2>
          </Reveal>
          <Reveal delay={100}><DayTimeline /></Reveal>
        </div>
      </section>

      {/* 6. The now rule beside its drawing */}
      <section className={`wrap ${s.sec}`} aria-labelledby="lp-agenda-h-now">
        <Reveal>
          <p className="t-caps" style={{ color: 'var(--green-ink)' }}>Day</p>
          <h2 id="lp-agenda-h-now" className="t-h1" style={{ marginTop: 10 }}>Now</h2>
        </Reveal>
        <div className={m.nowGrid}>
          <Reveal><DayNow /></Reveal>
          <Reveal delay={100} className={m.nowArt}><DayLaneArt /></Reveal>
        </div>
      </section>

      {/* 7. Disciplina as a card pair */}
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

      {/* 8. The three pillars, one sentence each */}
      <section className={`wrap ${s.sec}`} aria-labelledby="lp-agenda-h-pillars">
        <Reveal><h2 id="lp-agenda-h-pillars" className="t-caps-lg" lang="pt-BR">{PILLARS.join(' · ')}</h2></Reveal>
        <ul className={m.pillars} style={{ listStyle: 'none', padding: 0 }}>
          {PILLARS.map((p, i) => (
            <li key={p}>
              <Reveal delay={i * 90} className={`${m.pillar} ${i === 1 ? 'card-navy' : 'card'}`}>
                <span className={m.pillarBar} style={{ animationDelay: `${i * 120}ms` }} aria-hidden="true" />
                <h3 className="t-h2" lang="pt-BR">{p}</h3>
                <p className="t-body" lang="pt-BR">{PILLAR_TEXT[i]}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* 9. Agenda among the three areas */}
      <section className={`wrap ${s.sec}`} aria-labelledby="lp-agenda-h-areas">
        <Reveal>
          <h2 id="lp-agenda-h-areas" className="t-h1" lang="pt-BR">{AREAS.join(', ')}</h2>
          <p className="t-lead" lang="pt-BR" style={{ marginTop: 14, maxWidth: '38em' }}>{CARE}</p>
        </Reveal>
        <div className={m.areas}>
          {AREAS.map((a, i) => (
            <Reveal key={a} delay={i * 90}>
              <Link href={AREA_LINK[a]} className={`${m.area} ${a === 'Agenda' ? m.areaHere : ''}`} aria-current={a === 'Agenda' ? 'page' : undefined}>
                <span className={m.areaTop}><Icon name={AREA_ICON[a]} size={28} /><Icon name="arrow-up-right" size={22} /></span>
                <span className="t-h2" lang="pt-BR">{a}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 10. The level band */}
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

      {/* 11. The dynamic of the two values */}
      <section className={`wrap ${s.sec}`} aria-labelledby="lp-agenda-h-sum">
        <Reveal><h2 id="lp-agenda-h-sum" className="t-caps-lg" lang="pt-BR">{VALUES.summary.title}</h2></Reveal>
        <div className={s.sum}>
          <Reveal className="card-slide"><p className="t-h3" lang="pt-BR">{VALUES.summary.text[0].replace('• ', '')}</p></Reveal>
          <Reveal delay={80} className="card-slide"><p className="t-h3" lang="pt-BR">{VALUES.summary.text[1].replace('• ', '')}</p></Reveal>
          <Reveal delay={160} className={`${s.sumWide} card-line`}><p className="t-lead" lang="pt-BR">{VALUES.summary.text[2]}</p></Reveal>
        </div>
      </section>

      {/* 12. CTA band */}
      <section className={`${s.cta} field-green`} aria-labelledby="lp-agenda-h-cta">
        <div className="wrap">
          <Reveal>
            <h2 id="lp-agenda-h-cta" className="t-display" lang="pt-BR"><Line text={LINES.close} strong="Organização que gera crescimento." className="strong" /></h2>
            <div className="row" style={{ marginTop: 32, gap: 12 }}>
              <Button href="/lp-contato/" variant="navy" iconRight="arrow-right">Contact</Button>
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
