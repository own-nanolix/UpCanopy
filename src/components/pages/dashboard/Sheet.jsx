import Icon from '@/components/site/Icon';
import Chip from '@/components/ui/Chip';
import { AREAS } from '@/lib/brand';
import { STAGES, ROWS } from './data';
import { Ph, SearchField, RangeSeg, AccountChip, StageDot } from './Parts';
import s from './dashboard.module.css';

const Cmp = ({ title, children, dark }) => (
  <figure className={`${s.cmp} ${dark ? s.dark : ''}`}>
    <figcaption className="t-caps-lg">{title}</figcaption>
    <div className={s.cmpRow}>{children}</div>
  </figure>
);
const St = ({ children }) => <div className={s.state}><span className="t-label">{children[0]}</span>{children[1]}</div>;

const SB = ({ name, icon, state, cur }) => (
  <button type="button" className={s.sb} data-state={state} aria-current={cur ? 'true' : undefined}><Icon name={icon} size={22} />{name}</button>
);
const Th = ({ sort }) => (
  <table className={s.tbl}><thead><tr><th scope="col" aria-sort={sort}>
    <button type="button" className={s.th}>Stage<Icon name={sort === 'ascending' ? 'arrow-up' : sort === 'descending' ? 'arrow-down' : 'sort'} size={14} /></button>
  </th></tr></thead></table>
);
const Tr = ({ state, sel }) => (
  <table className={s.tbl}><tbody><tr data-state={state} aria-selected={sel || undefined}><td>01</td><td>Client 01</td><td><Ph w={60} /></td></tr></tbody></table>
);

// The dashboard components, each with its states. Forced states use data-state so they can be seen at rest.
export default function Sheet() {
  return (
    <div className={s.sheet2}>
      <Cmp title="Sidebar item">
        <St>{'Default'}<SB name={AREAS[0]} icon="users" /></St>
        <St>{'Hover'}<SB name={AREAS[1]} icon="calendar" state="hover" /></St>
        <St>{'Active'}<SB name={AREAS[2]} icon="chart" cur /></St>
        <St>{'Focus'}<SB name={AREAS[0]} icon="users" state="focus" /></St>
      </Cmp>
      <Cmp title="Rail item" dark>
        {[['Default', undefined, false], ['Hover', 'hover', false], ['Active', undefined, true], ['Focus', 'focus', false]].map(([l, st, on]) => (
          <St key={l}>{l}<button type="button" className={s.rail} data-state={st} aria-pressed={on} aria-label={`Rail item, ${l}`}><Icon name="users" size={24} /></button></St>
        ))}
      </Cmp>
      <Cmp title="KPI tile">
        {[['Default', undefined], ['Hover', 'hover'], ['Selected', 'sel']].map(([l, st]) => (
          <St key={l}>{l}<div className={s.kpi} data-state={st}><p className={s.cap}>{AREAS[0]}</p><p className="t-figure">{ROWS.length}</p><Ph w="70%" /></div></St>
        ))}
      </Cmp>
      <Cmp title="Table header">
        <St>{'Unsorted'}<Th sort="none" /></St>
        <St>{'Ascending'}<Th sort="ascending" /></St>
        <St>{'Descending'}<Th sort="descending" /></St>
      </Cmp>
      <Cmp title="Table row">
        <St>{'Default'}<Tr /></St>
        <St>{'Hover'}<Tr state="hover" /></St>
        <St>{'Selected'}<Tr state="sel" sel /></St>
      </Cmp>
      <Cmp title="Filter chip">
        <St>{'Off'}<Chip size="sm" pressed={false}>All</Chip></St>
        <St>{'On'}<Chip size="sm" pressed>{STAGES[1]}</Chip></St>
        <St>{'Hover'}<span className="chip chip-sm chip-navy">{STAGES[2]}</span></St>
      </Cmp>
      <Cmp title="Status row">
        {STAGES.map((st) => <St key={st}>{st}<p className={s.statusRow}><StageDot stage={st} />{st}<Ph w={70} /></p></St>)}
      </Cmp>
      <Cmp title="Search field">
        <St>{'Empty'}<SearchField id="dashboard-sheet-search-a" value="" /></St>
        <St>{'Filled'}<SearchField id="dashboard-sheet-search-b" value="Client 01" /></St>
        <St>{'Focus'}<div data-state="focus" className={s.focusBox}><SearchField id="dashboard-sheet-search-c" value="" /></div></St>
      </Cmp>
      <Cmp title="Date range">
        <St>{'Week'}<RangeSeg value="Week" /></St>
        <St>{'Day'}<RangeSeg value="Day" /></St>
      </Cmp>
      <Cmp title="Account chip">
        <St>{'Default'}<AccountChip /></St>
        <St>{'Hover'}<AccountChip state="hover" /></St>
        <St>{'Focus'}<AccountChip state="focus" /></St>
      </Cmp>
    </div>
  );
}
