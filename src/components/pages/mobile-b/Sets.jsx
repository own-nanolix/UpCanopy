'use client';

// The mobile component set as small specimens with states, in shared Tabs (id mobile-b-sets).
import { useState } from 'react';
import Tabs from '@/components/ui/Tabs';
import Icon from '@/components/site/Icon';
import { AREAS, DOCUMENT, CONTACT } from '@/lib/brand';
import { TAB_ICONS } from './Graphics';
import { Bar, StatusBar, NavBar, TabBar, ListRow, MenuRow, MCard, StatCard, MInput, Accordion, Sheet } from './Mobile';
import s from './mobile-b.module.css';

const TABS = TAB_ICONS.map(([icon, label]) => ({ id: label, icon, label }));

function Spec({ name, states, tone = 'white', children }) {
  return (
    <figure className={s.spec}>
      <div className={`${s.specBody} ${tone === 'navy' ? s.specNavy : tone === 'slide' ? s.specSlide : ''}`}>{children}</div>
      <figcaption className="t-label">{name}<span> · {states}</span></figcaption>
    </figure>
  );
}

function BarsSet() {
  const [a, setA] = useState('CRM');
  const [b, setB] = useState('Agenda');
  return (
    <div className={s.specGrid}>
      <Spec name="Status bar" states="light, navy" tone="slide">
        <div className={s.stack}><div style={{ background: 'var(--mint)' }}><StatusBar /></div><div style={{ background: 'var(--navy)' }}><StatusBar tone="navy" /></div></div>
      </Spec>
      <Spec name="Nav" states="mark + icons, back + title" tone="slide">
        <div className={s.stack}>
          <NavBar title="UpCanopy" trail={[{ name: 'search', label: 'Search' }, { name: 'bell', label: 'Notifications' }]} />
          <NavBar title="Files" tone="navy" lead="back" trail={[{ name: 'share', label: 'Share' }]} />
        </div>
      </Spec>
      <Spec name="Tab bar" states="active tile green and locked" tone="slide">
        <div className={s.stack}>
          <TabBar items={TABS} value={a} onChange={setA} label="Tab bar, light" />
          <TabBar items={TABS} value={b} onChange={setB} tone="navy" label="Tab bar, navy" />
        </div>
      </Spec>
    </div>
  );
}

function RowsSet() {
  const [sel, setSel] = useState(1);
  const [menu, setMenu] = useState('CRM');
  return (
    <div className={s.specGrid}>
      <Spec name="List row" states="default, selected, named" tone="slide">
        <div className={s.stack}>
          {[0, 1].map((i) => <ListRow key={i} icon={i ? 'calendar' : 'users'} label={i ? 'Calendar row' : 'Users row'} selected={sel === i} onClick={() => setSel(sel === i ? -1 : i)} line={8 - i * 2} />)}
          <ListRow icon="note" title={DOCUMENT.title} lang="pt-BR" trail="download" />
        </div>
      </Spec>
      <Spec name="Menu row" states="unchecked, checked" tone="slide">
        <div className={s.stack} role="radiogroup" aria-label="Area specimen">
          {AREAS.map((a) => <MenuRow key={a} label={a} icon={a === 'CRM' ? 'users' : a === 'Agenda' ? 'calendar' : 'chart'} checked={menu === a} onClick={() => setMenu(a)} />)}
        </div>
      </Spec>
    </div>
  );
}

function CardsSet() {
  const [rows, setRows] = useState(3);
  return (
    <div className={s.specGrid}>
      <Spec name="Card" states="closed, open" tone="slide">
        <div className={s.stack}><MCard title="CRM" /><MCard title="Agenda" defaultOpen rows={3} /></div>
      </Spec>
      <Spec name="Stat card" states="counts the rows shown" tone="slide">
        <div className={s.stack}>
          <div className={s.statPair}>
            <StatCard label="Rows shown" count={rows} />
            <StatCard label="Rows shown" count={rows} tone="green" />
          </div>
          <div className="row">
            <button type="button" className="btn btn-sm btn-ghost btn-icon" aria-label="Show one row fewer" disabled={rows <= 0} onClick={() => setRows(rows - 1)}><Icon name="chevron-left" size={16} /></button>
            <button type="button" className="btn btn-sm btn-icon" aria-label="Show one row more" disabled={rows >= 6} onClick={() => setRows(rows + 1)}><Icon name="plus" size={16} /></button>
          </div>
          <div className={s.stack}>{Array.from({ length: rows }, (_, i) => <ListRow key={i} icon="folder" trail={null} line={8 - i} />)}</div>
        </div>
      </Spec>
    </div>
  );
}

function InputsSet() {
  return (
    <div className={s.specGrid}>
      <Spec name="Input" states="default, focus, filled, error, disabled" tone="slide">
        <div className={s.stack}>
          <MInput id="mobile-b-set-in-default" label="Email" type="email" />
          <MInput id="mobile-b-set-in-focus" label="Email" state="focus" type="email" />
          <MInput id="mobile-b-set-in-filled" label="Email" type="email" defaultValue={CONTACT.hello} />
          <MInput id="mobile-b-set-in-error" label="Password" state="error" type="password" />
          <MInput id="mobile-b-set-in-off" label="Email" state="disabled" type="email" />
        </div>
      </Spec>
      <Spec name="Accordion" states="one open at a time" tone="slide">
        <Accordion idp="mobile-b-set-acc" items={AREAS.map((a) => ({ title: a, body: <div className={s.stack}><Bar w={14} /><Bar w={10} /></div> }))} />
      </Spec>
    </div>
  );
}

function SheetSet() {
  const [open, setOpen] = useState(true);
  const [area, setArea] = useState('CRM');
  return (
    <div className={s.specGrid}>
      <Spec name="Sheet" states="rises and locks, closes from the handle" tone="slide">
        <div className={s.stage}>
          <button type="button" className="btn btn-navy btn-sm" onClick={() => setOpen(true)}>Open sheet</button>
          <Sheet title="Sheet specimen" open={open} onOpenChange={setOpen}>
            <div className={s.sheetBody} role="radiogroup" aria-label="Area">
              {AREAS.map((a) => <MenuRow key={a} label={a} checked={area === a} onClick={() => setArea(a)} />)}
            </div>
          </Sheet>
        </div>
      </Spec>
    </div>
  );
}

export default function Sets() {
  return (
    <Tabs
      id="mobile-b-sets" label="Mobile component sets" tone="green"
      tabs={[
        { id: 'bars', label: 'Bars', content: <BarsSet /> },
        { id: 'rows', label: 'Rows', content: <RowsSet /> },
        { id: 'cards', label: 'Cards', content: <CardsSet /> },
        { id: 'inputs', label: 'Inputs', content: <InputsSet /> },
        { id: 'sheet', label: 'Sheet', content: <SheetSet /> },
      ]}
    />
  );
}
