import { pageMeta } from '@/lib/pages';

export const metadata = pageMeta('campaign');

export default function Page() {
  return (
    <section className="page" id="p-campaign" aria-label="Campaign" data-stub="">
      <h1 tabIndex={-1} className="t-h1 wrap" style={{ paddingTop: 'var(--pad)' }}>Campaign</h1>
    </section>
  );
}
