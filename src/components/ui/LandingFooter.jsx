import Link from 'next/link';
import { CONTACT, NAV_LINKS, DESCRIPTOR, TAGLINE, PILLARS } from '@/lib/brand';

// The landing footer, in the brand's print language: navy field, contacts as printed in the case study, and
// the word-mark huge and cropped by the bottom edge (as on the box lid and the letter).
export default function LandingFooter({ className = '' }) {
  return (
    <footer className={`lp-footer ${className}`}>
      <div className="wrap">
        <div className="lp-footer-grid">
          <div className="lp-footer-brand">
            <svg viewBox="0 0 100 100" width="44" height="44" role="img" aria-label="UpCanopy" style={{ color: 'var(--green)' }}>
              <use href="#site-mark" />
            </svg>
            <p className="t-line" style={{ marginTop: 20, maxWidth: '16em' }}>{TAGLINE}</p>
          </div>
          <div>
            <p className="lp-foot-head">{DESCRIPTOR}</p>
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.id}><Link href={`/${l.id}/`}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="lp-foot-head">{PILLARS[0]}</p>
            <ul>
              <li><Link href="/lp-manifesto/">Manifesto</Link></li>
              {PILLARS.slice(1).map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="lp-foot-head">Contact</p>
            <address>
              <span style={{ display: 'block' }}>{CONTACT.phone}</span>
              <span style={{ display: 'block' }}>{CONTACT.sac}</span>
              <span style={{ display: 'block' }}>{CONTACT.web}</span>
            </address>
          </div>
        </div>
        <p className="lp-footer-word" aria-hidden="true">UpCanopy</p>
        <div className="lp-footer-base">
          <span>UpCanopy</span>
          <span>{CONTACT.footer}</span>
        </div>
      </div>
    </footer>
  );
}
