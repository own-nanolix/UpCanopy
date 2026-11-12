'use client';

import { useState } from 'react';
import { DOCUMENT } from '@/lib/brand';
import { seeded } from '@/lib/charts';
import { range } from '@/lib/site';
import Chip from '@/components/ui/Chip';
import { Segmented } from '@/components/ui/Toggle';
import s from './lp-financeiro.module.css';

const rnd = seeded(5);
const ROWS = range(6, (i) => ({ id: i, a: 40 + Math.round(rnd() * 50), b: 30 + Math.round(rnd() * 60), c: 26 + Math.round(rnd() * 64) }));
const COLS = [
  { key: 'a', label: DOCUMENT.invoice[0], cls: '' },
  { key: 'b', label: DOCUMENT.invoice[1], cls: '' },
  { key: 'c', label: DOCUMENT.invoice[2], cls: s.cellTotal },
];

// Statement columns: show or hide a column, sort the rows by the length of their bar. Structure only.
export default function ColumnBoard() {
  const [shown, setShown] = useState({ a: true, b: true, c: true });
  const [dir, setDir] = useState('Longest first');
  const cols = COLS.filter((c) => shown[c.key]);
  const rows = [...ROWS].sort((x, y) => (dir === 'Longest first' ? y.c - x.c : x.c - y.c));

  return (
    <div className={s.board}>
      <div className={s.boardBar}>
        <div className="row" role="group" aria-label="Columns">
          {COLS.map((c) => (
            <Chip key={c.key} pressed={shown[c.key]} onClick={() => setShown((v) => ({ ...v, [c.key]: !v[c.key] }))}>
              {c.label}
            </Chip>
          ))}
        </div>
        <div className="row">
          <span className="t-label">Sort</span>
          <Segmented id="lp-financeiro-sort" label="Sort rows" options={['Longest first', 'Shortest first']} value={dir} onChange={setDir} />
        </div>
      </div>
      <div className={s.boardTable}>
        <div className={s.grid4} style={{ gridTemplateColumns: `repeat(${Math.max(cols.length, 1)}, minmax(0, 1fr))` }} role="table" aria-label="Statement columns">
          <div role="row" style={{ display: 'contents' }}>
            {cols.map((c) => (
              <div key={c.key} role="columnheader" className={`${s.hd} ${s.colEnter}`}>{c.label}</div>
            ))}
          </div>
          {rows.map((r) => (
            <div key={r.id} role="row" className={s.rowA} style={{ display: 'contents' }}>
              {cols.map((c) => (
                <div key={c.key} role="cell" className={`${s.cell} ${c.cls}`}>
                  <span className={s.cellBar} style={{ width: `${r[c.key]}%` }} aria-hidden="true" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {cols.length === 0 && <p className="t-small">Choose a column.</p>}
    </div>
  );
}
