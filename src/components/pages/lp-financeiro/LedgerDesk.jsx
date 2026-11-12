'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import Chip from '@/components/ui/Chip';
import { Segmented } from '@/components/ui/Toggle';
import { HEX, DOCUMENT } from '@/lib/brand';
import { seeded } from '@/lib/charts';
import { range } from '@/lib/site';
import d from './desk.module.css';

// Row lengths are structure, not amounts: seeded so server and browser agree.
const rnd = seeded(77);
const TOTAL = 10;
const ROWS = range(TOTAL, (i) => ({ id: i, w: 28 + Math.round(rnd() * 64), v: 24 + Math.round(rnd() * 70) }));
const FILTERS = ['All', 'Ticked', 'Open'];
const SORTS = ['Original', 'Longest first', 'Shortest first'];

// The block chart: one column of square blocks per state; a block is one row (counts of rows only).
function BlockChart({ ticked, open }) {
  const cols = [
    { label: 'Ticked', n: ticked, fill: HEX.green },
    { label: 'Open', n: open, fill: HEX.navy },
  ];
  return (
    <Art viewBox="0 0 320 400" title={`Blocks: ${ticked} rows ticked, ${open} rows open`} exportName="lp-financeiro-blocks">
      <rect x="0" y="0" width="320" height="400" fill={HEX.white} />
      {cols.map((c, ci) => (
        <g key={c.label} transform={`translate(${40 + ci * 140} 0)`}>
          {range(TOTAL, (b) => {
            const y = 316 - b * 28;
            const on = b < c.n;
            return (
              <rect key={b} x="0" y={y} width="100" height="22" fill={on ? c.fill : HEX.slide} stroke={on ? c.fill : HEX.gray} strokeWidth="2" />
            );
          })}
          <rect x="0" y="334" width="100" height="4" fill={HEX.navy} />
          <text x="0" y="364" fontSize="13" fontWeight="700" fill={HEX.navy}>{c.label}</text>
          <text x="100" y="364" fontSize="13" fontWeight="700" textAnchor="end" fill={HEX.navy}>{c.n}</text>
        </g>
      ))}
      <text x="40" y="34" fontSize="12" fontWeight="700" fill={HEX.navy}>{DOCUMENT.invoice[2]}</text>
      <rect x="40" y="44" width="240" height="4" fill={HEX.navy} />
    </Art>
  );
}

// The ledger desk: a filter (All / Ticked / Open), a sort, square checkboxes, and the block chart that grows
// as rows are ticked. Everything here works on placeholder rows.
export default function LedgerDesk() {
  const [ticked, setTicked] = useState([2, 5]);
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Original');

  const toggle = (id) => setTicked((t) => (t.includes(id) ? t.filter((x) => x !== id) : [...t, id]));
  const shown = ROWS.filter((r) => filter === 'All' || (filter === 'Ticked') === ticked.includes(r.id)).sort((a, b) => {
    if (sort === 'Longest first') return b.w - a.w;
    if (sort === 'Shortest first') return a.w - b.w;
    return a.id - b.id;
  });
  const clearAll = () => setTicked([]);
  const tickAll = () => setTicked(ROWS.map((r) => r.id));

  return (
    <div className={d.desk}>
      <div className={d.deskMain}>
        <div className={d.bar}>
          <div className="row">
            <span className="t-label">Filter</span>
            <Segmented id="lp-financeiro-filter" label="Filter rows" options={FILTERS} value={filter} onChange={setFilter} />
          </div>
          <div className="row">
            <span className="t-label">Sort</span>
            <Segmented id="lp-financeiro-desk-sort" label="Sort rows" options={SORTS} value={sort} onChange={setSort} />
          </div>
        </div>
        <div className={d.colHead} aria-hidden="true">
          <span />
          <span>{DOCUMENT.invoice[1]}</span>
          <span>{DOCUMENT.invoice[2]}</span>
        </div>
        <ul className={d.list} aria-label="Ledger rows">
          {shown.map((r) => {
            const on = ticked.includes(r.id);
            return (
              <li key={r.id} className={`${d.line} ${on ? d.lineOn : ''}`}>
                <input type="checkbox" className={d.box} id={`lp-financeiro-desk-${r.id}`} checked={on} onChange={() => toggle(r.id)} />
                <label htmlFor={`lp-financeiro-desk-${r.id}`} className={d.cells}>
                  <span className="sr-only">Row {r.id + 1}</span>
                  <span className={d.cellA}><span style={{ width: `${r.w}%` }} /></span>
                  <span className={d.cellB}><span style={{ width: `${r.v}%` }} /></span>
                </label>
              </li>
            );
          })}
        </ul>
        {shown.length === 0 && <p className="t-small" role="status">No rows in this view.</p>}
        <div className={d.actions}>
          <button type="button" className="btn btn-sm" onClick={tickAll}>Tick all</button>
          <button type="button" className="btn btn-sm btn-navy" onClick={clearAll}>Clear</button>
          <Chip size="sm" role="status">{ticked.length} / {TOTAL}</Chip>
        </div>
      </div>
      <aside className={d.chartCard} aria-label="Block chart">
        <BlockChart ticked={ticked.length} open={TOTAL - ticked.length} />
      </aside>
    </div>
  );
}
