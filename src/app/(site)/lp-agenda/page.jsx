import { pageMeta } from '@/lib/pages';

export const metadata = pageMeta('lp-agenda');

export default function Page() {
  return (
    <section className="page" id="p-lp-agenda" aria-label="Landing: Agenda" data-stub="">
      <h1 tabIndex={-1} className="t-h1 wrap" style={{ paddingTop: 'var(--pad)' }}>Landing: Agenda</h1>
    </section>
  );
}
