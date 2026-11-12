'use client';

import { useState } from 'react';
import Icon from '@/components/site/Icon';
import { Placeholder } from '@/components/ui/Card';
import s from './web-system.module.css';

// An app-style rail of square icon buttons; the active one is green. Names are the brand's area words.
const ITEMS = [
  { id: 'home', icon: 'home', label: 'HOME' },
  { id: 'crm', icon: 'users', label: 'CRM' },
  { id: 'agenda', icon: 'calendar', label: 'Agenda' },
  { id: 'fin', icon: 'chart', label: 'Financeiro' },
  { id: 'doc', icon: 'folder', label: 'Documents' },
];

export default function AppRail() {
  const [cur, setCur] = useState('crm');
  const now = ITEMS.find((i) => i.id === cur);
  return (
    <div className={s.railWrap}>
      <nav className={s.rail} aria-label="App rail">
        {ITEMS.map((i) => (
          <button
            key={i.id}
            type="button"
            className={s.railBtn}
            aria-label={i.label}
            aria-current={cur === i.id ? 'page' : undefined}
            onClick={() => setCur(i.id)}
          >
            <Icon name={i.icon} size={22} />
          </button>
        ))}
      </nav>
      <div className={s.railPane}>
        <p className="t-caps-lg" aria-live="polite">{now.label}</p>
        <hr className="rule" />
        {[8, 5, 7, 4].map((w, k) => (
          <div key={k} className={s.phRow}><Placeholder width={w} /></div>
        ))}
      </div>
    </div>
  );
}
