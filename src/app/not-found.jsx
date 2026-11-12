import Link from 'next/link';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <main id="site-main" className="page field-navy" style={{ display: 'grid', alignContent: 'center', gap: 24, padding: 'var(--pad)' }}>
      <p className="t-caps" style={{ color: 'var(--green)' }}>404</p>
      <h1 className="t-h1">
        This page is not under the <span className="hl">canopy</span>
      </h1>
      <p className="t-lead" style={{ color: 'var(--navy-muted)' }}>The address does not match any page of the UpCanopy brand system.</p>
      <p className="row">
        <Link className="btn" href="/overview/">Go to the overview</Link>
        <Link className="btn btn-ghost" href="/overview/?index=1">Open the index</Link>
      </p>
    </main>
  );
}
