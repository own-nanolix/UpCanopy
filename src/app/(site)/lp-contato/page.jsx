import { pageMeta } from '@/lib/pages';

export const metadata = pageMeta('lp-contato');

export default function Page() {
  return (
    <section className="page" id="p-lp-contato" aria-label="Landing: Contact" data-stub="">
      <h1 tabIndex={-1} className="t-h1 wrap" style={{ paddingTop: 'var(--pad)' }}>Landing: Contact</h1>
    </section>
  );
}
