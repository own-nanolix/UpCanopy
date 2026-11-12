import { pageMeta } from '@/lib/pages';
import Studio from '@/components/pages/mobile-b/Studio';

export const metadata = pageMeta('mobile-b');

export default function Page() {
  return (
    <section className="page" id="p-mobile-b" aria-label="Mobile app, screens 10 to 18">
      <Studio />
    </section>
  );
}
