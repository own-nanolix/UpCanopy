import { pageMeta } from '@/lib/pages';

export const metadata = pageMeta('use-apparel');

export default function Page() {
  return (
    <section className="page" id="p-use-apparel" aria-label="Apparel" data-stub="">
      <h1 tabIndex={-1} className="t-h1 wrap" style={{ paddingTop: 'var(--pad)' }}>Apparel</h1>
    </section>
  );
}
