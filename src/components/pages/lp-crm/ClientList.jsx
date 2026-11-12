'use client';

import { useState } from 'react';
import Chip from '@/components/ui/Chip';
import Icon from '@/components/site/Icon';
import { Placeholder } from '@/components/ui/Card';
import { SECTORS } from '@/lib/brand';
import { seeded } from '@/lib/charts';
import s from './lp-crm.module.css';

// A client list: labelled columns, placeholder rows. Filter by sector and sort by position, both real.
const rnd = seeded(7);
const STAGES = ['New', 'In progress', 'Done'];
const ROWS = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  sector: i % 3 === 1 ? 1 : 0,
  stage: Math.floor(rnd() * 3),
  w: 6 + Math.round(rnd() * 6),
  w2: 4 + Math.round(rnd() * 5),
  w3: 3 + Math.round(rnd() * 4),
}));

export default function ClientList() {
  const [sector, setSector] = useState(-1);
  const [asc, setAsc] = useState(true);
  const shown = ROWS.filter((r) => sector < 0 || r.sector === sector).sort((a, b) => (asc ? a.stage - b.stage : b.stage - a.stage) || a.id - b.id);
  return (
    <div>
      <div className={s.listBar}>
        <div className="row" role="group" aria-label="Filter by sector">
          <Chip pressed={sector < 0} onClick={() => setSector(-1)}>All</Chip>
          {SECTORS.map((n, i) => (
            <Chip key={n} pressed={sector === i} onClick={() => setSector(i)}>{n}</Chip>
          ))}
        </div>
        <button type="button" className="btn btn-sm btn-navy" onClick={() => setAsc((a) => !a)} aria-label={`Sort by stage, ${asc ? 'ascending' : 'descending'}`}>
          <Icon name="sort" size={16} /> Sort
        </button>
      </div>
      <div className={s.tableWrap}>
        <table className={s.table}>
          <caption className="sr-only">Client list</caption>
          <thead>
            <tr><th scope="col">Client</th><th scope="col">Sector</th><th scope="col">Stage</th><th scope="col">Contact</th></tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.id}>
                <td><Placeholder width={r.w} label="Name placeholder" /></td>
                <td><span className="chip chip-sm">{SECTORS[r.sector]}</span></td>
                <td><span className="chip chip-sm chip-navy">{STAGES[r.stage]}</span></td>
                <td><Placeholder width={r.w2} label="Contact placeholder" /> <Placeholder width={r.w3} label="Detail placeholder" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="t-small" role="status" aria-live="polite" style={{ marginTop: 10 }}>{shown.length} of {ROWS.length} rows</p>
    </div>
  );
}
