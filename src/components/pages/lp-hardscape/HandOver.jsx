'use client';

import { useState } from 'react';
import Toggle from '@/components/ui/Toggle';
import s from './lp-hardscape.module.css';

// A day bar: the work site, then the office, with a switch for the back-office.
export default function HandOver() {
  const [on, setOn] = useState(false);
  return (
    <div className={`${s.day} ${on ? s.handed : ''}`}>
      <div className={s.dayBar} aria-hidden="true">
        <div className={`${s.seg} ${s.segWork}`}>Work site</div>
        <div className={`${s.seg} ${s.segOffice}`}>Office</div>
      </div>
      <Toggle label="Back-office on" checked={on} onChange={setOn} />
      <p className="t-small" style={{ color: 'var(--navy-muted)' }} aria-live="polite">{on ? 'Back-office on' : 'Back-office off'}</p>
    </div>
  );
}
