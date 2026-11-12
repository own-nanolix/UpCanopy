import Link from 'next/link';
import { NAV_LINKS, SIGN } from '@/lib/brand';

// The landing navigation. The case study shows no website; this follows its print layout habit: the lockup in
// one corner, wide-caps labels, and the "HOME →" call from the wall sign.
// <LandingNav current="lp-crm" />   tone: "navy" (default, white type on dark grounds) | "light" (navy type)
export default function LandingNav({ current, tone = 'navy', className = '' }) {
  const light = tone === 'light';
  return (
    <nav className={`lp-nav ${className}`} aria-label="UpCanopy" style={{ color: light ? 'var(--navy)' : 'var(--white)' }}>
      <Link href="/lp-home/" className="lp-brand" aria-label="UpCanopy home" aria-current={current === 'lp-home' ? 'page' : undefined}>
        <svg viewBox="0 0 100 100" width="30" height="30" aria-hidden="true">
          <use href="#site-mark" />
        </svg>
        <span>UpCanopy</span>
      </Link>
      <div className="lp-links">
        {NAV_LINKS.map((l) => (
          <Link key={l.id} href={`/${l.id}/`} aria-current={current === l.id ? 'page' : undefined}>
            {l.label}
          </Link>
        ))}
        <Link href="/lp-manifesto/" aria-current={current === 'lp-manifesto' ? 'page' : undefined}>Manifesto</Link>
      </div>
      <div className="lp-actions">
        <Link href="/lp-contato/" className={`btn btn-sm ${light ? 'btn-navy' : ''}`} aria-current={current === 'lp-contato' ? 'page' : undefined}>
          {SIGN.home} <span aria-hidden="true">→</span>
          <span className="sr-only"> contact</span>
        </Link>
      </div>
    </nav>
  );
}
