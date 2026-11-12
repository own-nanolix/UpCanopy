import Reveal from '@/components/site/Reveal';
import s from './web-system.module.css';

// One labelled bay of the workbench: a thick left rule, a plain English component name and a note.
// span is 7 or 5 (of 12 columns); on phones bays stack.
export default function Bay({ id, label, note, span = 7, children }) {
  const hid = `web-system-${id}-h`;
  return (
    <Reveal as="section" id={`web-system-${id}`} aria-labelledby={hid} className={`${s.bay} ${span === 7 ? s.s7 : s.s5}`}>
      <header className={s.bayHead}>
        <h2 id={hid} className="t-caps-lg">{label}</h2>
        {note && <p className="t-label">{note}</p>}
      </header>
      {children}
    </Reveal>
  );
}
