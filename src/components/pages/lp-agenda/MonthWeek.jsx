'use client';

import { useState } from 'react';
import { Segmented } from '@/components/ui/Toggle';
import { DAYS } from './WeekGrid';
import s from './modules.module.css';

// One card, two views. Week: seven columns of placeholder blocks. Month: five rows of quiet cells.
// Cells are real buttons; the selection is named by weekday and week of the month, never by a date.
const WEEKS = 5;
const has = (c, r) => (c * 3 + r * 5) % 4 === 0 || (c + r) % 7 === 3;
const blocksFor = (c) => [0, 1, 2].filter((k) => (c + k * 2) % 3 !== 1).map((k) => ({ k, h: 22 + ((c * 7 + k * 11) % 5) * 9 }));

export default function MonthWeek() {
  const [view, setView] = useState('Week');
  const [pick, setPick] = useState(null);
  const onView = (v) => { setView(v); setPick(null); };

  return (
    <div className={s.mw}>
      <div className={s.mwHead}>
        <h3 className="t-caps-lg">Calendar</h3>
        <Segmented id="lp-agenda-view" label="Calendar view" options={['Week', 'Month']} value={view} onChange={onView} />
      </div>
      <div className={s.mwDays} aria-hidden="true">
        {DAYS.map((d) => <span key={d}>{d}</span>)}
      </div>
      {view === 'Week' ? (
        <div className={s.mwWeek} key="week">
          {DAYS.map((d, c) => (
            <button
              key={d}
              type="button"
              className={`${s.mwCol} ${pick === `${c}-0` ? s.mwOn : ''}`}
              aria-pressed={pick === `${c}-0`}
              aria-label={`${d}, whole day`}
              onClick={() => setPick(pick === `${c}-0` ? null : `${c}-0`)}
            >
              {blocksFor(c).map((b) => (
                <span key={b.k} className={s.mwBlock} style={{ height: b.h, '--i': b.k + c }} />
              ))}
            </button>
          ))}
        </div>
      ) : (
        <div className={s.mwMonth} key="month">
          {Array.from({ length: WEEKS * 7 }, (_, n) => {
            const c = n % 7, r = Math.floor(n / 7), id = `${c}-${r + 1}`;
            return (
              <button
                key={id}
                type="button"
                className={`${s.mwCell} ${pick === id ? s.mwOn : ''}`}
                aria-pressed={pick === id}
                aria-label={`${DAYS[c]}, week ${r + 1}`}
                onClick={() => setPick(pick === id ? null : id)}
              >
                {has(c, r) && <span className="ph" aria-hidden="true" />}
                {(c + r) % 5 === 2 && <span className="ph" aria-hidden="true" style={{ width: '55%' }} />}
              </button>
            );
          })}
        </div>
      )}
      <p className={`t-label ${s.mwNote}`} role="status" aria-live="polite">
        {pick ? `${DAYS[Number(pick.split('-')[0])]}${view === 'Month' ? `, week ${pick.split('-')[1]}` : ''}` : `${view} view`}
      </p>
    </div>
  );
}
