import { pageMeta } from '@/lib/pages';

export const metadata = pageMeta('lp-crm');

export default function Page() {
  return (
    <section className="page" id="p-lp-crm" aria-label="Landing: CRM" data-stub="">
      <h1 tabIndex={-1} className="t-h1 wrap" style={{ paddingTop: 'var(--pad)' }}>Landing: CRM</h1>
    </section>
  );
}
