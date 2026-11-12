'use client';

import { useState } from 'react';
import Icon from '@/components/site/Icon';
import { CONTACT, DOCUMENT, SHEET, TONE } from '@/lib/brand';
import s from './web-system.module.css';

export function SheetRows() {
  return (
    <dl className={s.dl} lang="pt-BR">
      {SHEET.map(([k, v]) => (
        <div key={k} className={s.dlRow}>
          <dt className="t-label">{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

const CONTACTS = [
  { icon: 'headset', label: DOCUMENT.labels[1], value: CONTACT.phone },
  { icon: 'note', label: DOCUMENT.labels[2], value: CONTACT.sac },
  { icon: 'note', label: DOCUMENT.labels[2], value: CONTACT.hello },
  { icon: 'link', label: 'Web', value: CONTACT.web },
  { icon: 'pin', label: 'Address', value: null },
];

export function ContactList() {
  return (
    <ul className={s.contactList}>
      {CONTACTS.map((c) => (
        <li key={`${c.label}-${c.value}`} className={s.contactItem}>
          <Icon name={c.icon} size={20} />
          <span>
            <span className="t-label" style={{ display: 'block' }}>{c.label}</span>
            {c.value ?? <span className="ph" style={{ width: '12em', minWidth: 0 }} aria-hidden="true" />}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function DocumentRow() {
  return (
    <div className={s.docRow}>
      <span className={s.docIcon}><Icon name="download" size={24} /></span>
      <span>
        <span lang="pt-BR" style={{ display: 'block', fontWeight: 700 }}>{DOCUMENT.title}</span>
        <span className="t-label" style={{ display: 'block' }}>{DOCUMENT.address}</span>
      </span>
      <Icon name="arrow-right" size={20} />
    </div>
  );
}

export function Accordion() {
  const [open, setOpen] = useState(0);
  return (
    <div className={s.acc} lang="pt-BR">
      {TONE.points.map((p, i) => {
        const isOpen = open === i;
        return (
          <div key={p.title} className={s.accItem}>
            <h3 className={s.accHead}>
              <button
                type="button"
                id={`web-system-acc-btn-${i}`}
                className={s.accBtn}
                aria-expanded={isOpen}
                aria-controls={`web-system-acc-panel-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{p.title}</span>
                <Icon name="chevron-down" size={22} />
              </button>
            </h3>
            <div
              id={`web-system-acc-panel-${i}`}
              role="region"
              aria-labelledby={`web-system-acc-btn-${i}`}
              className={s.accPanel}
              data-open={isOpen}
            >
              <div className={s.accInner}>
                <div className={s.accText}>
                  {p.text.map((t) => <p key={t} className="t-body">{t}</p>)}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
