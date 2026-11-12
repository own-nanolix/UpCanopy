'use client';

import { useState } from 'react';
import Icon from '@/components/site/Icon';
import Toggle from '@/components/ui/Toggle';
import { DOCUMENT } from '@/lib/brand';
import s from './modules.module.css';

// An appointment that opens in place. Only structure: labelled rows with placeholder bars.
const ROWS = DOCUMENT.labels.slice(0, 3);

export function AppointmentCard() {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${s.appt} ${open ? s.apptOpen : ''}`}>
      <button
        type="button"
        className={s.apptHead}
        aria-expanded={open}
        aria-controls="lp-agenda-appt-panel"
        onClick={() => setOpen(!open)}
      >
        <span className={s.apptTime}><Icon name="clock" size={18} /><span className="ph" style={{ width: '3.4em' }} aria-hidden="true" /></span>
        <span className={s.apptTitle} aria-hidden="true">
          <span className="ph" style={{ width: '9em' }} />
          <span className="ph" style={{ width: '5em' }} />
        </span>
        <span className="sr-only">Appointment</span>
        <span className={s.apptChev} aria-hidden="true"><Icon name="chevron-down" size={20} /></span>
      </button>
      <div className={s.apptBody} id="lp-agenda-appt-panel" role="region" aria-label="Appointment details" inert={!open}>
        <div className={s.apptInner}>
          <dl className={s.apptRows}>
            {ROWS.map((l) => (
              <div key={l}>
                <dt className="t-label">{l}</dt>
                <dd><span className="ph" style={{ width: `${4 + l.length}em` }} aria-hidden="true" /></dd>
              </div>
            ))}
          </dl>
          <div className="row" style={{ gap: 8 }}>
            <button type="button" className="btn btn-sm btn-navy" onClick={() => setOpen(false)}>Close</button>
            <span className={s.apptNote} aria-hidden="true"><span className="ph" style={{ width: '7em' }} /></span>
          </div>
        </div>
      </div>
    </div>
  );
}

// A reminder row: icon, placeholder text, a switch. Each row keeps its own state.
const REMINDERS = [
  { id: 'remind', icon: 'bell', label: 'Reminder', on: true, w: 8 },
  { id: 'repeat', icon: 'clock', label: 'Repeat', on: false, w: 6 },
  { id: 'share', icon: 'share', label: 'Share', on: false, w: 7 },
];

export function ReminderRows() {
  return (
    <ul className={s.rem}>
      {REMINDERS.map((r) => (
        <li key={r.id} className={s.remRow}>
          <span className={s.remIcon} aria-hidden="true"><Icon name={r.icon} size={20} /></span>
          <span className={s.remText} aria-hidden="true"><span className="ph" style={{ width: `${r.w}em` }} /></span>
          <Toggle label={r.label} defaultChecked={r.on} id={`lp-agenda-rem-${r.id}`} />
        </li>
      ))}
    </ul>
  );
}
