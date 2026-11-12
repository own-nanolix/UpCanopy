import { pageMeta } from '@/lib/pages';
import Studio from '@/components/pages/mobile-a/Studio';
import Artwork from '@/components/pages/mobile-a/Artwork';

export const metadata = pageMeta('mobile-a');

export default function Page() {
  return (
    <section className="page" id="p-mobile-a" aria-label="Mobile app, screens 1 to 9">
      <Studio plates={<Artwork />} />
    </section>
  );
}
