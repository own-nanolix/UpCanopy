'use client';

// The nine screens, 10 to 18, each a different layout on a 390 x 844 artboard. `p` is the id prefix of this
// instance (the live phone and the contact sheet each get their own), `go(n)` moves the live phone.
import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '@/components/site/Icon';
import { toast } from '@/components/site/Toast';
import Field from '@/components/ui/Field';
import Toggle, { Segmented } from '@/components/ui/Toggle';
import { Line } from '@/components/ui/Card';
import { copy } from '@/lib/site';
import { tEnter } from '@/lib/motion';
import { AREAS, SECTORS, MODES, MANIFESTO, TONE, DOCUMENT, CONTACT, SIGN } from '@/lib/brand';
import { SignInArtG, BadgeScreenG, BusinessCardG } from './Graphics';
import { Bar, StatusBar, NavBar, TabBar, ListRow, MenuRow, Accordion, Sheet } from './Mobile';
import s from './mobile-b.module.css';

const AREA_ICON = { CRM: 'users', Agenda: 'calendar', Financeiro: 'chart' };
// The account tab bar of screens 12 and 16: each tile opens its screen in the live phone.
const TABS = [['user', 'Profile', 18], ['bell', 'Notifications', 12], ['folder', 'Files', 16], ['gear', 'Settings', 15]].map(([icon, label, n]) => ({ id: label, icon, label, n }));
const openTab = (go) => (id) => { const t = TABS.find((x) => x.id === id); if (go && t) go(t.n); };
const SOON = 'Not part of this preview';

// 10 Sign in: navy, stacked lockup, two fields, a green button, the wall sign's "HOME →".
export function SignIn({ p, go }) {
  return (
    <div className={`${s.screen} ${s.sNavy}`}>
      <svg className={s.bgFull} viewBox="0 0 390 844" aria-hidden="true"><SignInArtG idp={`${p}-art`} /></svg>
      <StatusBar tone="navy" />
      <form className={s.signForm} onSubmit={(e) => { e.preventDefault(); if (go) go(11); }}>
        <Field id={`${p}-email`} label="Email" type="email" autoComplete="email" className={s.darkField} />
        <Field id={`${p}-password`} label="Password" type="password" autoComplete="current-password" className={s.darkField} />
        <button type="submit" className="btn btn-block">Sign in</button>
      </form>
      {/* The foot of the wall sign (m17): the web address lower left, "HOME →" lower right. */}
      <div className={s.signFoot}>
        <span>{CONTACT.web}</span>
        <Link href="/mobile-a/" className={`link-arrow ${s.homeLink}`}>{SIGN.home}</Link>
      </div>
    </div>
  );
}

// 11 Area switcher: a sheet over the work, three areas and two sectors.
export function Areas({ p }) {
  const [area, setArea] = useState('CRM');
  const [sector, setSector] = useState('Landscape');
  const [open, setOpen] = useState(true);
  return (
    <div className={s.screen}>
      <StatusBar />
      <NavBar title="UpCanopy" trail={[{ name: 'search', label: 'Search' }, { name: 'bell', label: 'Notifications' }]} />
      <div className={s.body}>
        <button type="button" className={`btn btn-navy btn-block ${s.switchBtn}`} onClick={() => setOpen(true)}>{area} · {sector}<Icon name="chevron-down" size={16} /></button>
        {[0, 1, 2, 3, 4].map((i) => <ListRow key={i} icon={['users', 'calendar', 'note', 'chart', 'folder'][i]} line={8 - i} />)}
      </div>
      <Sheet title="Areas" open={open} onOpenChange={setOpen}>
        <div className={s.sheetBody} role="radiogroup" aria-label="Area">
          <p className="t-label">Areas</p>
          {AREAS.map((a) => <MenuRow key={a} icon={AREA_ICON[a]} label={a} checked={area === a} onClick={() => setArea(a)} />)}
          <hr className="rule" style={{ margin: '12px 0 8px' }} />
          <p className="t-label" id={`${p}-sectors`}>Sectors</p>
          <div role="radiogroup" aria-labelledby={`${p}-sectors`}>
            {SECTORS.map((a, i) => <MenuRow key={a} icon={i ? 'cube' : 'pin'} label={a} checked={sector === a} onClick={() => setSector(a)} />)}
          </div>
          <button type="button" className="btn btn-block" onClick={() => setOpen(false)} style={{ marginTop: 16 }}>Done</button>
        </div>
      </Sheet>
    </div>
  );
}

// 12 Notifications: one row per area, a toggle each and a quiet line. Nothing is invented.
export function Notifications({ go }) {
  const [on, setOn] = useState({ CRM: true, Agenda: true, Financeiro: false });
  const all = Object.values(on).every(Boolean);
  return (
    <div className={s.screen}>
      <StatusBar />
      <NavBar title="Notifications" lead="back" onLead={() => go && go(11)} />
      <div className={s.body}>
        <p className="t-label">Areas</p>
        {AREAS.map((a) => (
          <div key={a} className={`${s.notice} ${on[a] ? s.noticeOn : ''}`}>
            <span className={s.tile} aria-hidden="true"><Icon name={AREA_ICON[a]} size={22} /></span>
            <span className={s.rowText}><span className={s.rowTitle}>{a}</span><Bar w={9} /></span>
            <Toggle label={`Notifications for ${a}`} hideLabel checked={on[a]} onChange={(v) => setOn({ ...on, [a]: v })} />
          </div>
        ))}
        <button type="button" className="btn btn-ghost btn-block" onClick={() => setOn({ CRM: !all, Agenda: !all, Financeiro: !all })} style={{ marginTop: 'auto' }}>{all ? 'Mute all' : 'Turn all on'}</button>
      </div>
      <TabBar items={TABS} value="Notifications" onChange={openTab(go)} label="Account" />
    </div>
  );
}

// 13 Manifesto reader: the ten paragraphs one at a time, ten dots below.
export function Manifesto({ p }) {
  const [i, setI] = useState(0);
  const text = MANIFESTO[i];
  const size = text.length < 60 ? 36 : text.length < 170 ? 27 : 20;
  const step = (d) => setI((v) => Math.min(MANIFESTO.length - 1, Math.max(0, v + d)));
  return (
    <div className={`${s.screen} ${s.sDark}`}>
      <StatusBar tone="navy" />
      <NavBar title="Manifesto" tone="navy" />
      <div className={s.reader}>
        <p className="t-label" style={{ color: 'var(--frond)' }}>{String(i + 1).padStart(2, '0')} / {MANIFESTO.length}</p>
        <div className={s.readerText} aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p key={i} lang="pt-BR" style={{ fontSize: size }} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={tEnter}>
              {i === MANIFESTO.length - 1 ? <Line text={text} strong="UpCanopy" className="hl" /> : text}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className={s.dots} role="group" aria-label="Paragraph">
          {MANIFESTO.map((_, k) => (
            <button key={k} type="button" id={`${p}-dot-${k}`} className={`${s.dotBtn} ${k === i ? s.dotOn : k < i ? s.dotPast : ''}`} aria-label={`Paragraph ${k + 1}`} aria-current={k === i ? 'step' : undefined} onClick={() => setI(k)}><span /></button>
          ))}
        </div>
        <div className={s.readerNav}>
          <button type="button" className="btn btn-mint btn-icon" aria-label="Previous paragraph" disabled={i === 0} onClick={() => step(-1)}><Icon name="arrow-left" size={20} /></button>
          <button type="button" className="btn btn-icon" aria-label="Next paragraph" disabled={i === MANIFESTO.length - 1} onClick={() => step(1)}><Icon name="arrow-right" size={20} /></button>
        </div>
      </div>
    </div>
  );
}

// 14 Help: the three tone points as an accordion, verbatim.
export function Help({ p, go }) {
  const items = TONE.points.map((pt) => ({ title: pt.title, body: pt.text.map((t) => <p key={t}>{t}</p>) }));
  return (
    <div className={`${s.screen} ${s.sPaper}`}>
      <StatusBar />
      <NavBar title="Help" lead="back" onLead={() => go && go(15)} />
      <div className={s.body}>
        <p className="t-label" lang="pt-BR">{TONE.title}</p>
        <Accordion idp={`${p}-acc`} items={items} lang="pt-BR" />
        <button type="button" className="btn btn-navy btn-block" style={{ marginTop: 'auto' }} onClick={() => go && go(17)}><Icon name="headset" size={18} />Support</button>
      </div>
    </div>
  );
}

// 15 Settings: toggles with plain labels, a segmented control for the two modes, three links.
export function Settings({ p, go }) {
  const [t, setT] = useState({ Notifications: true, Sound: false, Haptics: true });
  const [mode, setMode] = useState(MODES[1]);
  return (
    <div className={`${s.screen} ${s.sSlide}`}>
      <StatusBar />
      <NavBar title="Settings" lead="back" onLead={() => go && go(14)} />
      <div className={s.body}>
        <div className={s.group}>
          {Object.keys(t).map((k) => <Toggle key={k} label={k} checked={t[k]} onChange={(v) => setT({ ...t, [k]: v })} className={s.toggleRow} />)}
        </div>
        <div className={s.group}>
          <p className="t-label">Mode</p>
          <div lang="pt-BR"><Segmented id={`${p}-mode`} label="Mode" options={MODES} value={mode} onChange={setMode} /></div>
        </div>
        <div className={s.group}>
          {[['Profile', 'user', 18], ['Files', 'folder', 16], ['Support', 'headset', 17]].map(([l, ic, n]) => (
            <button key={l} type="button" className={s.linkRow} onClick={() => go && go(n)}><Icon name={ic} size={20} /><span>{l}</span><Icon name="chevron-right" size={18} /></button>
          ))}
        </div>
        <button type="button" className="btn btn-ghost btn-block" style={{ marginTop: 'auto' }} onClick={() => go && go(10)}><Icon name="logout" size={18} />Log out</button>
      </div>
    </div>
  );
}

// 16 Files: DOCUMENT.title is the one named file; the rest are quiet rows.
export function Files({ p, go }) {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const hit = DOCUMENT.title.toLowerCase().includes(q.trim().toLowerCase());
  const rows = [0, 1, 2, 3, 4];
  return (
    <div className={s.screen}>
      <StatusBar />
      <NavBar title="Files" lead="back" onLead={() => go && go(15)} trail={[{ name: 'share', label: 'Share' }]} onTrail={() => toast(SOON)} />
      <div className={s.body}>
        <Field id={`${p}-search`} label="Search" type="search" value={q} onChange={(e) => setQ(e.target.value)} />
        {hit && <ListRow icon="note" title={DOCUMENT.title} lang="pt-BR" selected={sel === 'doc'} onClick={() => setSel(sel === 'doc' ? 0 : 'doc')} trail={null} />}
        <AnimatePresence initial={false}>
          {sel === 'doc' && hit && (
            <motion.div className={s.fileActions} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={tEnter}>
              <button type="button" className="btn btn-sm" onClick={() => toast(SOON)}><Icon name="share" size={16} />Share</button>
              <button type="button" className="btn btn-sm btn-ghost" onClick={() => toast(SOON)}><Icon name="download" size={16} />Download</button>
            </motion.div>
          )}
        </AnimatePresence>
        {!q && rows.map((r) => <ListRow key={r} icon="folder" label={`Folder ${r + 1}`} line={9 - r} selected={sel === r + 1} onClick={() => setSel(sel === r + 1 ? 0 : r + 1)} />)}
        {q && !hit && <p className="t-small">No match</p>}
      </div>
      <TabBar items={TABS} value="Files" onChange={openTab(go)} label="Account" />
    </div>
  );
}

function CopyRow({ label, value, lang }) {
  const [done, setDone] = useState(false);
  const run = async () => {
    const ok = await copy(value);
    toast(ok ? `Copied ${value}` : `Could not copy ${value}`);
    setDone(true);
    setTimeout(() => setDone(false), 1400);
  };
  return (
    <div className={s.copyRow}>
      <span><span className="t-label">{label}</span><span className={s.copyVal} lang={lang}>{value}</span></span>
      <button type="button" className={`${s.iconBtn} ${done ? s.iconBtnOk : ''}`} aria-label={`Copy ${label} ${value}`} onClick={run}><Icon name={done ? 'check' : 'copy'} size={18} /></button>
    </div>
  );
}

// 17 Support: the real contact details with copy buttons, and the business card as a small card.
export function Support({ go }) {
  const [, tel, mail] = DOCUMENT.labels;
  return (
    <div className={`${s.screen} ${s.sPaper}`}>
      <StatusBar />
      <NavBar title="Support" lead="back" onLead={() => go && go(15)} />
      <div className={s.body}>
        <svg viewBox="0 0 340 200" className={s.cardSvg} aria-hidden="true"><BusinessCardG /></svg>
        <CopyRow label={tel} value={CONTACT.phone} />
        <CopyRow label={mail} value={CONTACT.sac} />
        <CopyRow label={mail} value={CONTACT.hello} />
        <CopyRow label="Web" value={CONTACT.web} />
        <CopyRow label="Handle" value={CONTACT.handle} />
      </div>
    </div>
  );
}

// 18 Profile: the badge as a screen. Navy card, mark top left, "UpCanopy" top right, the frond for the portrait.
export function Profile({ p, go }) {
  return (
    <div className={`${s.screen} ${s.sGreen}`}>
      <StatusBar />
      <svg className={s.badgeSvg} viewBox="0 0 390 560" aria-hidden="true"><BadgeScreenG idp={`${p}-badge`} /></svg>
      <div className={s.profileActions}>
        <button type="button" className="btn btn-navy btn-block" onClick={() => toast(SOON)}><Icon name="share" size={18} />Share</button>
        <button type="button" className="btn btn-ghost btn-block" onClick={() => go && go(10)}><Icon name="logout" size={18} />Log out</button>
      </div>
    </div>
  );
}

export const SCREEN_LIST = [
  { n: 10, title: 'Sign in', C: SignIn },
  { n: 11, title: 'Area switcher', C: Areas },
  { n: 12, title: 'Notifications', C: Notifications },
  { n: 13, title: 'Manifesto reader', C: Manifesto },
  { n: 14, title: 'Help', C: Help },
  { n: 15, title: 'Settings', C: Settings },
  { n: 16, title: 'Files', C: Files },
  { n: 17, title: 'Support', C: Support },
  { n: 18, title: 'Profile', C: Profile },
];
