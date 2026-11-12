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

// The five structures side by side. Click a thumbnail or its button to open the option.
export default function Overview({ open }) {
  return (
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
  );
}
