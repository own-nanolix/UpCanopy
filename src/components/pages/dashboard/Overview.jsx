import Icon from '@/components/site/Icon';
import { Thumb } from './Arts';
import s from './dashboard.module.css';

export const OPTIONS = [
  ['a', 'Editorial figures', 'Large figures on a light field'],
  ['b', 'Command rail', 'Navy field, rail and three columns'],
  ['c', 'Week grid', 'Calendar first, with a side list'],
  ['d', 'Ledger', 'Wide table under a summary strip'],
  ['e', 'Kanban', 'Cards in three columns'],
];

// How the five options differ, column by column. Plain structural words only.
const COMPARE = {
  head: ['Option', 'Structure', 'Ground', 'Leads with', 'Main controls'],
  rows: [
    ['a', 'Three figure columns over the scales and a list', 'Green Ligth', 'Large figures', 'Stage filter, sort'],
    ['b', 'Icon rail beside three area columns', 'Blue Ocean', 'Area columns', 'Rail, search, stage filter'],
    ['c', 'Week grid with a side list', 'White', 'Calendar', 'Week / Day range, slot select'],
    ['d', 'Summary strip above a wide table', 'Gray', 'Table', 'Sortable headers, area and stage filters'],
    ['e', 'Three stage columns of cards', 'Green Dark', 'Cards', 'Move arrows, area filter, search'],
  ],
};

// The five structures side by side, then compared in a table. Click a thumbnail or its button to open it.
export default function Overview({ open }) {
  return (
    <>
      <ul className={s.ov}>
        {OPTIONS.map(([id, name, desc], i) => (
          <li key={id} className="slide-up" style={{ '--i': i }}>
            <div className={s.ovArt} onClick={() => open(id)}><Thumb kind={id} /></div>
            <button type="button" className={s.ovBtn} onClick={() => open(id)}>
              <span className={s.ovLetter}>{id.toUpperCase()}</span>
              <span className={s.ovText}><strong>{name}</strong><span>{desc}</span></span>
              <Icon name="arrow-right" size={20} />
            </button>
          </li>
        ))}
      </ul>
      <div className={s.ovWrap}>
        <table className={s.ovTbl}>
          <caption className="sr-only">The five dashboard options compared</caption>
          <thead><tr>{COMPARE.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
          <tbody>
            {COMPARE.rows.map(([id, ...cells], i) => (
              <tr key={id} className="slide-up" style={{ '--i': i + 5 }}>
                <th scope="row"><button type="button" className={s.ovOpen} onClick={() => open(id)} aria-label={`Open option ${id.toUpperCase()}`}>{id.toUpperCase()}</button></th>
                {cells.map((c, k) => <td key={k}>{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
