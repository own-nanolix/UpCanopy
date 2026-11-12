'use client';

// The mobile component set of the app: status bar, nav, tab bar, list row, menu row, card, stat card, input,
// accordion and sheet. All fluid (width 100%), so the same parts sit in a 390 px screen and in a specimen.
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useDragControls } from 'framer-motion';
import Icon from '@/components/site/Icon';
import Field from '@/components/ui/Field';
import { MarkG } from '@/components/art/Mark';
import { tEnter, tLock, tMove } from '@/lib/motion';
import s from './mobile-b.module.css';

export const Bar = ({ w = 6 }) => <span className="ph" aria-hidden="true" style={{ minWidth: `${w}em`, height: '0.6em' }} />;

export function StatusBar({ tone = 'light' }) {
  return (
    <div className={`${s.status} ${tone === 'navy' ? s.statusNavy : ''}`} aria-hidden="true">
      <span className="ph" style={{ width: 38, minWidth: 0, height: 12 }} />
      <svg width="48" height="14" viewBox="0 0 48 14" fill="currentColor">
        {[0, 1, 2, 3].map((i) => <rect key={i} x={i * 6} y={10 - i * 3} width="4" height={4 + i * 3} />)}
        <rect x="28" y="1" width="18" height="12" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="31" y="4" width="9" height="6" />
      </svg>
    </div>
  );
}

export function NavBar({ title, tone = 'light', lead = 'mark', trail = [], onLead, onTrail }) {
  return (
    <div className={`${s.nav} ${tone === 'navy' ? s.navNavy : ''}`}>
      {lead === 'back' ? (
        <button type="button" className={s.iconBtn} aria-label="Back" onClick={onLead}><Icon name="arrow-left" size={20} /></button>
      ) : (
        <svg width="34" height="34" viewBox="0 0 100 100" aria-hidden="true"><MarkG size={100} fill="#26CF7B" /></svg>
      )}
      <span className={s.navTitle}>{title}</span>
      <span className={s.navTrail}>
        {trail.map((t) => (
          <button key={t.name} type="button" className={s.iconBtn} aria-label={t.label} onClick={() => onTrail && onTrail(t.name)}><Icon name={t.name} size={20} /></button>
        ))}
      </span>
    </div>
  );
}

// The active tile turns green and locks: a green block rises from the bottom edge of the tile.
export function TabBar({ items, value, onChange, tone = 'light', label = 'Tabs' }) {
  return (
    <nav className={`${s.tabbar} ${tone === 'navy' ? s.tabbarNavy : ''}`} aria-label={label}>
      {items.map((it) => {
        const on = it.id === value;
        return (
          <button key={it.id} type="button" className={`${s.tab} ${on ? s.tabOn : ''}`} aria-current={on ? 'page' : undefined} onClick={() => onChange && onChange(it.id)}>
            <Icon name={it.icon} size={22} />
            <span className={s.tabLabel}>{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export function ListRow({ icon = 'folder', title, label, lang, selected, onClick, trail = 'chevron-right', line = 7 }) {
  const body = (
    <>
      <span className={s.tile} aria-hidden="true"><Icon name={icon} size={20} /></span>
      <span className={s.rowText}>
        {title ? <span className={s.rowTitle} lang={lang}>{title}</span> : <Bar w={9} />}
        <Bar w={line} />
      </span>
      {trail && <Icon name={trail} size={18} />}
    </>
  );
  const cls = `${s.row} ${selected ? s.rowOn : ''}`;
  return onClick ? <button type="button" className={cls} aria-label={label} aria-pressed={selected} onClick={onClick}>{body}</button> : <div className={cls}>{body}</div>;
}

export function MenuRow({ icon, label, checked, onClick, lang }) {
  return (
    <button type="button" className={`${s.menuRow} ${checked ? s.menuOn : ''}`} role="radio" aria-checked={checked} onClick={onClick}>
      {icon && <Icon name={icon} size={20} />}
      <span lang={lang}>{label}</span>
      <span className={s.check} aria-hidden="true">{checked && <Icon name="check" size={16} />}</span>
    </button>
  );
}

// A card that opens on tap and shows more rows.
export function MCard({ title, defaultOpen = false, rows = 2 }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`${s.mcard} ${open ? s.mcardOpen : ''}`}>
      <button type="button" className={s.mcardHead} aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className={s.mcardTitle}>{title}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={tMove} style={{ display: 'inline-flex' }}><Icon name="chevron-down" size={18} /></motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={tEnter} style={{ overflow: 'hidden' }}>
            <div className={s.mcardBody}>
              {Array.from({ length: rows }, (_, i) => <Bar key={i} w={14 - i * 3} />)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// A stat card shows a count of the rows that are actually listed, never an invented figure.
export function StatCard({ label, count, tone = 'light' }) {
  return (
    <div className={`${s.stat} ${tone === 'green' ? s.statGreen : ''}`}>
      <span className="t-label" style={{ color: 'inherit' }}>{label}</span>
      <motion.span key={count} className="t-figure" initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={tLock}>{String(count).padStart(2, '0')}</motion.span>
    </div>
  );
}

export function MInput({ id, label, state = 'default', ...rest }) {
  const cls = state === 'focus' ? s.inFocus : state === 'error' ? s.inError : '';
  return (
    <div className={`${s.mInput} ${cls}`}>
      <Field id={id} label={label} disabled={state === 'disabled'} aria-invalid={state === 'error' || undefined} hint={state === 'error' ? 'Required' : undefined} {...rest} />
    </div>
  );
}

export function Accordion({ idp, items, defaultOpen = 0, lang }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={s.acc}>
      {items.map((it, i) => (
        <div key={it.title} className={`${s.accItem} ${open === i ? s.accOn : ''}`}>
          <button type="button" id={`${idp}-b${i}`} className={s.accHead} aria-expanded={open === i} aria-controls={`${idp}-p${i}`} onClick={() => setOpen(open === i ? -1 : i)}>
            <span lang={lang}>{it.title}</span>
            <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={tMove} style={{ display: 'inline-flex' }}><Icon name="chevron-down" size={18} /></motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div id={`${idp}-p${i}`} role="region" aria-labelledby={`${idp}-b${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={tEnter} style={{ overflow: 'hidden' }}>
                <div className={s.accBody} lang={lang}>{it.body}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// A bottom sheet: rises and locks, closes from its drag handle (drag down, tap, or Escape).
export function Sheet({ title, open, onOpenChange, children, scrim = true }) {
  const dc = useDragControls();
  const moved = useRef(false);
  const handle = useRef(null);
  const was = useRef(open);
  // When the visitor opens the sheet, focus moves to its handle (so Escape and Tab work inside it); it does not
  // steal focus when a screen first shows with the sheet already open.
  useEffect(() => {
    if (open && !was.current) requestAnimationFrame(() => handle.current && handle.current.focus({ preventScroll: true }));
    was.current = open;
  }, [open]);
  return (
    <AnimatePresence>
      {open && scrim && (
        <motion.div key="scrim" className={s.scrim} aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={tMove} onClick={() => onOpenChange(false)} />
      )}
      {open && (
        <motion.div
          key="sheet" role="dialog" aria-label={title} className={s.sheet}
          initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={tLock}
          drag="y" dragListener={false} dragControls={dc} dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.5 }}
          onDragStart={() => { moved.current = true; }}
          onDragEnd={(_, info) => { if (info.offset.y > 70 || info.velocity.y > 500) onOpenChange(false); setTimeout(() => { moved.current = false; }, 0); }}
          onKeyDown={(e) => { if (e.key === 'Escape') onOpenChange(false); }}
        >
          <button ref={handle} type="button" className={s.handle} aria-label="Close sheet" onPointerDown={(e) => dc.start(e)} onClick={() => { if (!moved.current) onOpenChange(false); }}>
            <span aria-hidden="true" />
          </button>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
