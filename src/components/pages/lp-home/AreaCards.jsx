'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/site/Icon';
import Reveal from '@/components/site/Reveal';
import { Placeholder } from '@/components/ui/Card';
import { AREAS } from '@/lib/brand';
import s from './lp-home.module.css';

// One modular card: a title (the area name), a small piece of working UI, and a link to its landing page.
function Shell({ title, icon, href, children, delay }) {
  return (
    <Reveal delay={delay} className={s.areaWrap}>
      <article className={s.area}>
        <header className={s.areaHead}>
          <h3 className={`t-caps-lg ${s.areaTitle}`}>{title}</h3>
          <Icon name={icon} size={22} />
        </header>
        <div className={s.areaUi}>{children}</div>
        <Link href={href} className={`link link-arrow ${s.areaLink}`}>Open {title}</Link>
      </article>
    </Reveal>
  );
}

// CRM: a short list of placeholder clients, each with a status dot the visitor can toggle.
function Crm() {
  const [on, setOn] = useState([true, false, true, true]);
  const flip = (i) => setOn((a) => a.map((v, k) => (k === i ? !v : v)));
  return (
    <ul className={s.list} aria-label="Clients">
      {on.map((v, i) => (
        <li key={i} className={s.crmRow}>
          <span className={s.tile} aria-hidden="true" />
          <span className={s.cells}>
            <Placeholder width={8} label="Client name" />
            <Placeholder width={5} label="Client detail" />
          </span>
          <button type="button" className={s.status} aria-pressed={v} aria-label={`Client ${i + 1} status`} onClick={() => flip(i)}>
            <span className={v ? 'dot dot-on' : 'dot'} />
            <span className="t-caps">{v ? 'On' : 'Off'}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

// Agenda: a week strip where a day can be selected; the day shows placeholder appointments.
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const SLOTS = [2, 3, 1, 3, 2, 1, 2];
function Agenda() {
  const [sel, setSel] = useState(1);
  return (
    <div>
      <div className={s.week} role="group" aria-label="Week">
        {DAYS.map((d, i) => (
          <button key={d} type="button" className={s.day} aria-pressed={sel === i} onClick={() => setSel(i)}>
            <span className="t-caps">{d}</span>
            <span className={s.dayMark} />
          </button>
        ))}
      </div>
      <ul className={s.list} key={sel} aria-label={`${DAYS[sel]} appointments`}>
        {Array.from({ length: SLOTS[sel] }, (_, i) => (
          <li key={i} className={`${s.slot} ${s.enter}`} style={{ '--i': i }}>
            <span className={s.slotTime}><Placeholder width={2.5} label="Time" /></span>
            <span className={s.cells}><Placeholder width={9} label="Appointment" /></span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Financeiro: a ledger of placeholder rows with a running bar that follows the selected row.
const RUN = [22, 46, 71, 100];
function Ledger() {
  const [sel, setSel] = useState(1);
  return (
    <div>
      <ul className={s.list} aria-label="Ledger">
        {RUN.map((_, i) => (
          <li key={i}>
            <button type="button" className={s.ledgerRow} aria-pressed={sel === i} aria-label={`Ledger row ${i + 1}`} onClick={() => setSel(i)}>
              <Placeholder width={7} label="Entry" />
              <Placeholder width={3} label="Amount" />
            </button>
          </li>
        ))}
      </ul>
      <div className={s.run} role="img" aria-label="Running total bar">
        <span className={s.runFill} style={{ transform: `scaleX(${RUN[sel] / 100})` }} />
      </div>
    </div>
  );
}

export default function AreaCards() {
  return (
    <div className={`grid cols-3 ${s.areas}`}>
      <Shell title={AREAS[0]} icon="users" href="/lp-crm/" delay={0}><Crm /></Shell>
      <Shell title={AREAS[1]} icon="calendar" href="/lp-agenda/" delay={90}><Agenda /></Shell>
      <Shell title={AREAS[2]} icon="chart" href="/lp-financeiro/" delay={180}><Ledger /></Shell>
    </div>
  );
}
