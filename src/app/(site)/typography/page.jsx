import { pageMeta } from '@/lib/pages';

export const metadata = pageMeta('typography');

export default function Page() {
  return (
    <section className="page" id="p-typography" aria-label="Typography" data-stub="">
      <h1 tabIndex={-1} className="t-h1 wrap" style={{ paddingTop: 'var(--pad)' }}>Typography</h1>
    </section>
  );
}
