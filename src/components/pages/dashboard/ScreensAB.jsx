import Icon from '@/components/site/Icon';
import { Line } from '@/components/ui/Card';
import { AREAS, LINES, CONTACT, SCALES } from '@/lib/brand';
import { STAGES, SLOTS, LINES_N, visible, pad, slotTime } from './data';
import { Ph, MarkSvg, SearchField, FilterChips, SortBar, AccountChip, ScaleRows, StageDot } from './Parts';
import s from './dashboard.module.css';

// A: light editorial layout led by large figures. The numerals are live counts of what is on this screen.
export function ScreenA({ b, up }) {
  const rows = visible(b);
  const figs = [[AREAS[0], rows.length, 'rows'], [AREAS[1], SLOTS.length, 'slots'], [AREAS[2], LINES_N, 'lines']];
  return (
    <div className={`${s.board} ${s.bA}`} data-screen="dashboard-a">
      <div className={s.aTop}>
        <MarkSvg size={72} color="#162557" />
        <p className="t-line" lang="pt-BR" style={{ fontSize: 30, maxWidth: 600, textAlign: 'right' }}>
          <Line text={LINES.bridge.text} strong={LINES.bridge.strong} />
        </p>
      </div>
      <div className={s.aFigs}>
        {figs.map(([a, n, u], i) => (
          <section key={a} className="slide-up" style={{ '--i': i }} aria-label={`${a}: ${n} ${u}`}>
            <p className={s.cap}>{a}<span>{u}</span></p>
            <p className="t-figure-xl" style={{ fontSize: 200 }}>{n}</p>
            <hr className="rule" style={{ margin: '22px 0 16px' }} />
            <div className={s.phStack}><Ph w="78%" /><Ph w="52%" /><Ph w="66%" /></div>
          </section>
        ))}
      </div>
      <div className={s.aLow}>
        <section aria-label="Scales">
          <p className={s.cap}>Scales<span>{SCALES.length} scales</span></p>
          <svg viewBox="0 0 1000 350" className={s.aScales} aria-hidden="false" role="group" aria-label="The five attribute scales">
            <ScaleRows tip lock />
          </svg>
        </section>
        <section aria-label="CRM list">
          <div className={s.aTools}>
            <FilterChips label="Stage" value={b.f} options={['All', ...STAGES]} onChange={(f) => up({ f })} />
            <SortBar b={b} up={up} />
          </div>
          <ul className={s.aList}>
            {rows.map((r, i) => (
              <li key={r.id} className="slide-up" style={{ '--i': i }}>
                <span>{pad(r.id)}</span><span>Client {pad(r.id)}</span><Ph w={90} /><span className={s.stageTxt}><StageDot stage={r.stage} />{r.stage}</span>
              </li>
            ))}
            {!rows.length && <li className={s.none}>No rows match the filter.</li>}
          </ul>
        </section>
      </div>
    </div>
  );
}

const RAIL = [['home', 'Home'], ['users', 'CRM'], ['calendar', 'Agenda'], ['chart', 'Financeiro'], ['gear', 'Settings']];

// B: navy command layout. Left rail of square icon buttons, three area columns.
export function ScreenB({ b, up }) {
  const rows = visible(b);
  const cols = [
    { name: AREAS[0], count: rows.length, body: rows.map((r) => ({ k: r.id, a: `Client ${pad(r.id)}`, st: r.stage })) },
    { name: AREAS[1], count: SLOTS.length, body: SLOTS.map((sl) => ({ k: sl.id, a: slotTime(sl) })) },
    { name: AREAS[2], count: LINES_N, body: Array.from({ length: LINES_N }, (_, i) => ({ k: i, a: `Line ${pad(i + 1)}` })) },
  ];
  return (
    <div className={`${s.board} ${s.dark} ${s.bB}`} data-screen="dashboard-b">
      <nav className={s.bRail} aria-label="Areas">
        <MarkSvg size={44} color="#26CF7B" />
        <div className={s.bRailBtns}>
          {RAIL.map(([ic, name], i) => (
            <button key={name} type="button" className={s.rail} aria-pressed={b.rail === i} aria-label={name} data-tip={name} onClick={() => up({ rail: i })}>
              <Icon name={ic} size={24} />
            </button>
          ))}
        </div>
        <button type="button" className={s.rail} aria-label="Log out" data-tip="Log out"><Icon name="logout" size={24} /></button>
      </nav>
      <div className={s.bMain}>
        <div className={s.bBar}>
          <SearchField id="dashboard-b-search" value={b.q} onChange={(q) => up({ q })} />
          <FilterChips label="Stage" value={b.f} options={['All', ...STAGES]} onChange={(f) => up({ f })} />
          <span className={s.grow} />
          <p className="t-line" lang="pt-BR" style={{ fontSize: 20, textAlign: 'right', maxWidth: 420 }}>
            <Line text={LINES.bridge.text} strong={LINES.bridge.strong} className="hl" />
          </p>
          <AccountChip />
        </div>
        <div className={s.bCols}>
          {cols.map((c, ci) => (
            <section key={c.name} className={`${s.bCol} slide-up`} style={{ '--i': ci }} data-on={b.rail === ci + 1} aria-label={c.name}>
              <header><h3 className={s.cap}>{c.name}</h3><span className="chip chip-sm chip-green">{c.count}</span></header>
              <ul>
                {c.body.map((r, i) => (
                  <li key={r.k} className="slide-up" style={{ '--i': i + ci }}>
                    <span>{r.a}</span>{r.st ? <span className={s.stageTxt}><StageDot stage={r.st} />{r.st}</span> : <Ph w={60} />}
                  </li>
                ))}
                {!c.body.length && <li className={s.none}>No rows match.</li>}
              </ul>
            </section>
          ))}
        </div>
        <p className={s.bFoot}>{CONTACT.footer}</p>
      </div>
      <p className={s.bWord} aria-hidden="true">UpCanopy</p>
    </div>
  );
}
