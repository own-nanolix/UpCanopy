import { pageMeta } from '@/lib/pages';

export const metadata = pageMeta('lp-financeiro');

export default function Page() {
  return (
    <section className="page" id="p-lp-financeiro" aria-label="Landing: Financeiro" data-stub="">
      <h1 tabIndex={-1} className="t-h1 wrap" style={{ paddingTop: 'var(--pad)' }}>Landing: Financeiro</h1>
    </section>
  );
}
