import { pageMeta } from '@/lib/pages';
import Board from '@/components/pages/campaign/Board';

export const metadata = pageMeta('campaign');

export default function Page() {
  return (
    <section className="page" id="p-campaign" aria-label="Campaign">
      <div className="wrap" style={{ paddingTop: 'var(--pad)' }}>
        <h1 tabIndex={-1} className="t-display">Campaign</h1>
      </div>
      <Board />
    </section>
  );
}
