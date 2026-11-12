import { pageMeta } from '@/lib/pages';

export const metadata = pageMeta('use-stationery');

export default function Page() {
  return (
    <section className="page" id="p-use-stationery" aria-label="Stationery" data-stub="">
      <h1 tabIndex={-1} className="t-h1 wrap" style={{ paddingTop: 'var(--pad)' }}>Stationery</h1>
    </section>
  );
}
