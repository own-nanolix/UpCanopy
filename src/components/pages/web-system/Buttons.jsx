import Button from '@/components/ui/Button';
import s from './web-system.module.css';

// Six variants, each on the ground it is meant for; labels come from the brand.
const VARIANTS = [
  { v: 'green', label: 'HOME', ground: 'gWhite', arrow: true },
  { v: 'navy', label: 'CRM', ground: 'gWhite' },
  { v: 'mint', label: 'Agenda', ground: 'gNavy' },
  { v: 'dark', label: 'Financeiro', ground: 'gWhite' },
  { v: 'white', label: 'Manifesto', ground: 'gNavy' },
  { v: 'ghost', label: 'upcanopy.com', ground: 'gWhite' },
];
const STATES = ['Default', 'Hover', 'Focus-visible', 'Active', 'Disabled'];

// A static copy of the shared look: same classes, state forced with a page-scoped class.
function Static({ v, label, arrow, state }) {
  const cls = ['btn', v !== 'green' && `btn-${v}`];
  if (state === 1) cls.push(v === 'ghost' ? s.sHoverGhost : s.sHover);
  if (state === 2) cls.push(s.sFocus);
  if (state === 3) cls.push(s.sActive);
  if (state === 4) cls.push(s.sOff);
  return (
    <span className={cls.filter(Boolean).join(' ')}>
      {label}
      {arrow && <span aria-hidden="true">→</span>}
    </span>
  );
}

export function ButtonSet() {
  return (
    <div className="stack">
      <h3 className="t-label">Live buttons</h3>
      <div className={s.liveGrid}>
        {VARIANTS.map((b) => (
          <div key={b.v} className={`${s.liveCell} ${s[b.ground]}`}>
            <Button variant={b.v} iconRight={b.arrow ? 'arrow-right' : undefined}>{b.label}</Button>
          </div>
        ))}
        <div className={`${s.liveCell} ${s.gWhite}`}>
          <Button disabled>HOME</Button>
        </div>
        <div className={`${s.liveCell} ${s.gWhite}`}>
          <Button variant="navy" size="sm" icon="calendar">Agenda</Button>
        </div>
      </div>

      <h3 className="t-label">States, six variants</h3>
      <div className={s.scroll} tabIndex={0} role="region" aria-label="Button states table">
        <table className={`${s.matrix} ${s.states}`}>
          <thead>
            <tr>
              <th scope="col">Variant</th>
              {STATES.map((st) => <th key={st} scope="col">{st}</th>)}
            </tr>
          </thead>
          <tbody>
            {VARIANTS.map((b) => (
              <tr key={b.v} className={s[b.ground]}>
                <th scope="row" className={s.rowHead}>{b.v}</th>
                {STATES.map((st, i) => (
                  <td key={st}><Static v={b.v} label={b.label} arrow={b.arrow} state={i} /></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const ICONS = [
  { name: 'home', label: 'Home' },
  { name: 'users', label: 'CRM' },
  { name: 'calendar', label: 'Agenda' },
  { name: 'chart', label: 'Financeiro' },
  { name: 'search', label: 'Search' },
  { name: 'plus', label: 'Add' },
];
const ROWS = [
  { v: 'green', icon: 'users', ground: 'gWhite' },
  { v: 'navy', icon: 'calendar', ground: 'gWhite' },
  { v: 'mint', icon: 'chart', ground: 'gNavy' },
];

function StaticIcon({ v, icon, state }) {
  const cls = ['btn btn-icon', v !== 'green' && `btn-${v}`];
  if (state === 1) cls.push(s.sHover);
  if (state === 2) cls.push(s.sFocus);
  if (state === 3) cls.push(s.sActive);
  if (state === 4) cls.push(s.sOff);
  return (
    <span className={cls.filter(Boolean).join(' ')}>
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><use href={`#site-icon-${icon}`} /></svg>
    </span>
  );
}

export function IconButtons() {
  return (
    <div className="stack">
      <h3 className="t-label">Live, 52 px squares</h3>
      <div className={`${s.stage} ${s.gWhite} ${s.iconRow}`}>
        {ICONS.map((i, k) => (
          <Button key={i.name} variant={k === 1 ? 'navy' : 'green'} icon={i.name} label={i.label} />
        ))}
      </div>
      <h3 className="t-label">States</h3>
      <div className={s.scroll} tabIndex={0} role="region" aria-label="Icon button states table">
        <table className={`${s.iconTable} ${s.states}`}>
          <thead>
            <tr>
              <th scope="col" className={s.rowHead}>Variant</th>
              {STATES.map((st) => <th key={st} scope="col">{st}</th>)}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.v} className={s[r.ground]}>
                <th scope="row" className={s.rowHead}>{r.v}</th>
                {STATES.map((st, i) => <td key={st}><StaticIcon v={r.v} icon={r.icon} state={i} /></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
