import Link from 'next/link';
import CopyValue from "@/components/site/CopyValue";
import Button from '@/components/ui/Button';
import { CONTACT } from '@/lib/brand';
import s from './web-system.module.css';

const STATES = ['Default', 'Hover', 'Focus-visible', 'Active', 'Disabled'];

function State({ i, children, arrow }) {
  const map = [null, s.lHover, s.lFocus, s.lActive, s.lOff];
  const cls = ['link', arrow && 'link-arrow', map[i], arrow && i === 1 && s.aHover];
  return <span className={cls.filter(Boolean).join(' ')}>{children}</span>;
}

export default function Links() {
  return (
    <div className="stack">
      <div className={`${s.stage} ${s.gWhite}`}>
        <div className={s.contactRow} style={{ marginBottom: 22 }}>
          <Link href="/lp-manifesto/" className="link">Manifesto</Link>
          <Link href="/lp-crm/" className="link link-arrow">CRM</Link>
          <Button href="/lp-home/" iconRight="arrow-right">HOME</Button>
        </div>
        <h3 className="t-label" style={{ marginBottom: 10 }}>Contact link row</h3>
        <div className={s.contactRow}>
          <CopyValue className="link" value={CONTACT.phone} label="phone" />
          <CopyValue className="link" value={CONTACT.sac} label="support e-mail" />
          <CopyValue className="link" value={CONTACT.hello} label="hello e-mail" />
          <Link className="link" href="/lp-home/">{CONTACT.web}</Link>
        </div>
      </div>

      <h3 className="t-label">States</h3>
      <div className={s.scroll} tabIndex={0} role="region" aria-label="Link states table">
        <table className={`${s.linkTable} ${s.states}`}>
          <thead>
            <tr>
              <th scope="col">State</th>
              <th scope="col">Text link</th>
              <th scope="col">Arrow link</th>
            </tr>
          </thead>
          <tbody>
            {STATES.map((st, i) => (
              <tr key={st}>
                <th scope="row" style={{ background: 'none', borderBottom: '1px solid var(--line)' }}>{st}</th>
                <td><State i={i}>Manifesto</State></td>
                <td><State i={i} arrow>CRM</State></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
