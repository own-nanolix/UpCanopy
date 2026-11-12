import { pageMeta } from '@/lib/pages';
import Truck from '@/components/pages/use-world/Truck';
import Billboard from '@/components/pages/use-world/Billboard';
import Citylight from '@/components/pages/use-world/Citylight';
import Windows from '@/components/pages/use-world/Windows';
import WallSign from '@/components/pages/use-world/WallSign';
import Poster from '@/components/pages/use-world/Poster';
import s from '@/components/pages/use-world/use-world.module.css';

export const metadata = pageMeta('use-world');

export default function Page() {
  return (
    <section className="page" id="p-use-world" aria-label="In the world">
      <header className={`wrap ${s.head}`}>
        <h1 tabIndex={-1} className="t-h1">In the world</h1>
      </header>
      <div className={`wrap ${s.stack}`}>
        <Truck />
        <Billboard />
        <Citylight />
        <Windows />
        <WallSign />
        <Poster />
      </div>
    </section>
  );
}
