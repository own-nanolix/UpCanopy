import { pageMeta } from '@/lib/pages';

export const metadata = pageMeta('lp-manifesto');

export default function Page() {
  return (
    <section className="page" id="p-lp-manifesto" aria-label="Landing: Manifesto" data-stub="">
      <h1 tabIndex={-1} className="t-h1 wrap" style={{ paddingTop: 'var(--pad)' }}>Landing: Manifesto</h1>
    </section>
  );
}
