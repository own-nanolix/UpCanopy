import { pageMeta } from '@/lib/pages';

export const metadata = pageMeta('feature');

export default function Page() {
  return (
    <section className="page" id="p-feature" aria-label="Remote back-office" data-stub="">
      <h1 tabIndex={-1} className="t-h1 wrap" style={{ paddingTop: 'var(--pad)' }}>Remote back-office</h1>
    </section>
  );
}
