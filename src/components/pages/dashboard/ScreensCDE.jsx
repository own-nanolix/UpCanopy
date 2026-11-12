import Icon from '@/components/site/Icon';
import { AREAS, CONTACT, DESCRIPTOR } from '@/lib/brand';
import { STAGES, SLOTS, DAYS, HOURS, ROWS, visible, pad, slotTime, countBy } from './data';
import { Ph, MarkSvg, SearchField, FilterChips, RangeSeg, AccountChip, LedgerTable, StageDot } from './Parts';
import s from './dashboard.module.css';

const H = 76; // px per hour row

// C: calendar-first. A week grid with a side list; select a slot in either; Day shows one day.
export function ScreenC({ b, up }) {
  const sel = SLOTS.find((x) => x.id === b.slot) || SLOTS[0];
  const days = b.range === 'Day' ? [sel.d] : DAYS.map((_, i) => i);
  const shown = SLOTS.filter((x) => days.includes(x.d));
  return (
    <div className={`${s.board} ${s.bC}`} data-screen="dashboard-c">
      <header className={s.cTop}>
        <MarkSvg size={52} color="#162557" />
        <h3 className={s.cap}>{AREAS[1]}<span>{shown.length} slots</span></h3>
        <span className={s.grow} />
        <RangeSeg value={b.range} onChange={(range) => up({ range })} />
        <AccountChip />
      </header>
      <div className={s.cBody}>
        <div className={s.cGrid} style={{ '--n': days.length }}>
          <div className={s.cHead}>
            <span />
            {days.map((d) => <span key={d} className={s.cap}>{DAYS[d]}</span>)}
          </div>
          <div className={s.cCols}>
            <div className={s.cAxis}>{HOURS.map((h) => <span key={h} style={{ height: H }}>{h}</span>)}</div>
            {days.map((d, ci) => (
              <div key={d} className={s.cDay} style={{ height: H * HOURS.length }}>
                {SLOTS.filter((x) => x.d === d).map((x, i) => (
                  <button key={x.id} type="button" className={`${s.slot} ${s.tip} slide-up`} style={{ top: x.h * H + 3, height: x.n * H - 6, '--i': i + ci }}
                    aria-pressed={sel.id === x.id} aria-label={`Slot ${pad(x.id)}, ${slotTime(x)}`} data-tip={`Slot ${pad(x.id)}: ${slotTime(x)}`} onClick={() => up({ slot: x.id })}>
                    <Ph w="60%" h={8} />
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
        <aside className={s.cSide} aria-label="Slot list">
          <p className={s.cap}>List<span>{shown.length}</span></p>
          <ul>
            {shown.map((x, i) => (
              <li key={x.id} className="slide-up" style={{ '--i': i }}>
                <button type="button" aria-pressed={sel.id === x.id} onClick={() => up({ slot: x.id })}>
                  <span>Slot {pad(x.id)}</span><span>{slotTime(x)}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className={s.phStack}><Ph w="70%" /><Ph w="48%" /></div>
        </aside>
      </div>
    </div>
  );
}

// D: ledger-first. A summary strip of blocks above a wide table; both follow the filters.
export function ScreenD({ b, up }) {
  const rows = visible(b);
  const strip = [...AREAS.map((a) => [a, rows.filter((r) => r.area === a).length, countBy(a)]), ['Total', rows.length, ROWS.length]];
  return (
    <div className={`${s.board} ${s.bD}`} data-screen="dashboard-d">
      <header className={s.dTop}>
        <MarkSvg size={52} color="#162557" />
        <p className={s.cap}>{DESCRIPTOR}</p>
        <span className={s.grow} />
        <SearchField id="dashboard-d-search" value={b.q} onChange={(q) => up({ q })} />
        <AccountChip />
      </header>
      <div className={s.dStrip}>
        {strip.map(([name, n, max], i) => (
          <section key={name} className={`${s.dBlock} slide-up`} style={{ '--i': i }} aria-label={`${name}: ${n} rows`}>
            <p className={s.cap}>{name}</p>
            <p className="t-figure" style={{ fontSize: 64 }}>{n}</p>
            <div className={s.sqRow}>
              {Array.from({ length: max }, (_, k) => (
                <button key={k} type="button" className={`${s.sqCell} ${s.tip} lock`} style={{ '--i': k }} data-on={k < n} data-tip={`${name}: ${n} of ${max} rows`} aria-label={`${name}: ${n} of ${max} rows`} />
              ))}
            </div>
          </section>
        ))}
      </div>
      <div className={s.dTools}>
        <FilterChips label="Area" value={b.area} options={['All', ...AREAS]} onChange={(area) => up({ area })} />
        <FilterChips label="Stage" value={b.f} options={['All', ...STAGES]} onChange={(f) => up({ f })} />
      </div>
      <div className={s.dTable}><LedgerTable rows={rows} b={b} up={up} label="Ledger" /></div>
      <p className={s.dFoot}>{CONTACT.footer}</p>
    </div>
  );
}

// E: kanban board of placeholder client cards in three columns. The arrows move a card.
export function ScreenE({ b, up }) {
  const rows = visible(b, true);
  const move = (id, to) => up({ stages: b.stages.map((x, i) => (i === id - 1 ? to : x)) });
  return (
    <div className={`${s.board} ${s.bE}`} data-screen="dashboard-e">
      <header className={s.eTop}>
        <MarkSvg size={52} color="#26CF7B" />
        <FilterChips label="Area" value={b.area} options={['All', ...AREAS]} onChange={(area) => up({ area })} />
        <span className={s.grow} />
        <SearchField id="dashboard-e-search" value={b.q} onChange={(q) => up({ q })} />
        <AccountChip />
      </header>
      <div className={s.eCols}>
        {STAGES.map((st, ci) => {
          const cards = rows.filter((r) => r.stage === st);
          return (
            <section key={st} className={s.eCol} aria-label={st}>
              <header><h3 className={s.cap}>{st}</h3><span className="chip chip-sm chip-green">{cards.length}</span></header>
              <ul>
                {cards.map((r, i) => (
                  <li key={r.id} className={`${s.card} slide-up`} style={{ '--i': i + ci * 2 }}>
                    <div className={s.cardTop}>
                      <span className="who-face" aria-hidden="true">{pad(r.id)}</span>
                      <div><p className={s.cardName}>Client {pad(r.id)}</p><span className="chip chip-sm chip-mint">{r.area}</span></div>
                    </div>
                    <div className={s.phStack}><Ph w="84%" /><Ph w="58%" /></div>
                    <div className={s.cardMove}>
                      <button type="button" disabled={ci === 0} aria-label={`Move Client ${pad(r.id)} to ${STAGES[ci - 1] || ''}`} onClick={() => move(r.id, STAGES[ci - 1])}><Icon name="arrow-left" size={18} /></button>
                      <span className={s.stageTxt}><StageDot stage={st} />{st}</span>
                      <button type="button" disabled={ci === 2} aria-label={`Move Client ${pad(r.id)} to ${STAGES[ci + 1] || ''}`} onClick={() => move(r.id, STAGES[ci + 1])}><Icon name="arrow-right" size={18} /></button>
                    </div>
                  </li>
                ))}
                {!cards.length && <li className={s.none}>Empty.</li>}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
