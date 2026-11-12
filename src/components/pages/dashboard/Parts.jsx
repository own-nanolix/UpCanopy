import Icon from '@/components/site/Icon';
import Chip from '@/components/ui/Chip';
import { MarkG } from '@/components/art/Mark';
import { r2 } from '@/lib/charts';
import { SCALES } from '@/lib/brand';
import { STAGES, pad } from './data';
import s from './dashboard.module.css';

// Quiet placeholder bar.
export function Ph({ w = 120, h = 10, style }) {
  return <span className="ph" aria-hidden="true" style={{ width: w, minWidth: 0, height: h, ...style }} />;
}

export function MarkSvg({ size = 48, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <MarkG size={100} fill={color} />
    </svg>
  );
}

export function SearchField({ id, value, onChange }) {
  const bind = onChange ? { value, onChange: (e) => onChange(e.target.value) } : { defaultValue: value };
  return (
    <label className={s.search} htmlFor={id}>
      <Icon name="search" size={20} />
      <span className="sr-only">Search</span>
      <input id={id} className={s.searchIn} type="search" placeholder="Search" {...bind} />
    </label>
  );
}

export function FilterChips({ label, value, options, onChange }) {
  return (
    <div className={s.chips} role="group" aria-label={label}>
      {options.map((o) => (
        <Chip key={o} size="sm" pressed={value === o} onClick={() => onChange(o)}>{o}</Chip>
      ))}
    </div>
  );
}

export function RangeSeg({ value, onChange, options = ['Week', 'Day'] }) {
  return (
    <div className={s.range} role="group" aria-label="Date range">
      <Icon name="calendar" size={20} />
      {options.map((o) => (
        <button key={o} type="button" aria-pressed={value === o} onClick={onChange ? () => onChange(o) : undefined}>{o}</button>
      ))}
    </div>
  );
}

export function SortBar({ b, up }) {
  const opts = [['id', 'No.'], ['client', 'Client'], ['area', 'Area'], ['stage', 'Stage']];
  return (
    <div className={s.sortbar}>
      <label className={s.sel}>
        <span className="sr-only">Sort by</span>
        <select className={s.select} value={b.key} onChange={(e) => up({ key: e.target.value })}>
          {opts.map(([v, l]) => <option key={v} value={v}>Sort: {l}</option>)}
        </select>
      </label>
      <button type="button" className={s.sq} aria-label={b.dir > 0 ? 'Ascending, switch to descending' : 'Descending, switch to ascending'} onClick={() => up({ dir: -b.dir })}>
        <Icon name={b.dir > 0 ? 'arrow-up' : 'arrow-down'} size={18} />
      </button>
    </div>
  );
}

export function StageDot({ stage }) {
  return <span className={`${s.sdot} ${s[`st${STAGES.indexOf(stage)}`]}`} aria-hidden="true" />;
}

export function AccountChip({ state }) {
  return (
    <button type="button" className={s.acct} data-state={state} aria-label="Account">
      <span className={s.acctFace} aria-hidden="true">UC</span>
      <Ph w={70} />
      <Icon name="chevron-down" size={18} />
    </button>
  );
}

// The ledger: sortable headers (aria-sort), rows that rise in order.
export function LedgerTable({ rows, b, up, label }) {
  const cols = [['id', 'No.'], ['client', 'Client'], ['area', 'Area'], ['stage', 'Stage'], [null, 'Total']];
  return (
    <table className={s.tbl} aria-label={label}>
      <thead>
        <tr>
          {cols.map(([k, l]) => (
            <th key={l} scope="col" aria-sort={k && b.key === k ? (b.dir > 0 ? 'ascending' : 'descending') : k ? 'none' : undefined}>
              {k ? (
                <button type="button" className={s.th} onClick={() => up({ ...(b.key === k ? { dir: -b.dir } : { key: k, dir: 1 }) })}>
                  {l}
                  <Icon name={b.key === k ? (b.dir > 0 ? 'arrow-up' : 'arrow-down') : 'sort'} size={14} />
                </button>
              ) : l}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={r.id} className="slide-up" style={{ '--i': i }}>
            <td>{pad(r.id)}</td>
            <td>Client {pad(r.id)}</td>
            <td>{r.area}</td>
            <td><span className={s.stageTxt}><StageDot stage={r.stage} />{r.stage}</span></td>
            <td><Ph w={70} /></td>
          </tr>
        ))}
        {!rows.length && <tr><td colSpan={5} className={s.none}>No rows match the filter.</td></tr>}
      </tbody>
    </table>
  );
}

// The five attribute scales as ten-dot rows (the brand's own values). A group of SVG elements in a 1000 x 350 box.
export function ScaleRows({ tip = false, lock = false, ink = '#162557', off = '#22272B', tag = false }) {
  const x0 = 220, step = 62, r = 19;
  return (
    <g>
      {SCALES.map((sc, k) => {
        const y = 35 + k * 70;
        return (
          <g key={sc.left}>
            <text x="190" y={y + 6} textAnchor="end" fontSize="17" letterSpacing="1.5" fill={ink} lang="pt-BR">{sc.left}</text>
            {Array.from({ length: 10 }, (_, i) => {
              const on = i + 1 === sc.chosen, cx = r2(x0 + i * step);
              const dot = <circle cx={cx} cy={y} r={r} fill={on ? '#26CF7B' : off} className={lock ? 'lock' : undefined} style={lock ? { '--i': i + k * 3 } : undefined} />;
              if (!on || !(tip || tag)) return <g key={i}>{dot}</g>;
              const txt = `${sc.left} to ${sc.right}: ${sc.chosen} of 10`;
              return tip ? (
                <g key={i} className={s.dotg} tabIndex={0} role="img" aria-label={txt}>
                  {dot}
                  <g className={s.dotTip}>
                    <rect x={cx - 52} y={y - 62} width="104" height="30" fill="#26CF7B" />
                    <text x={cx} y={y - 42} textAnchor="middle" fontSize="15" fontWeight="700" fill="#162557">{sc.chosen} of 10</text>
                  </g>
                </g>
              ) : (
                <g key={i}>{dot}<title>{txt}</title></g>
              );
            })}
            <text x={x0 + 9 * step + 40} y={y + 6} fontSize="17" letterSpacing="1.5" fill={ink} lang="pt-BR">{sc.right}</text>
          </g>
        );
      })}
    </g>
  );
}
