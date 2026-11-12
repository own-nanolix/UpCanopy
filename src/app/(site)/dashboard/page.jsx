import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import { AREAS, SECTORS } from '@/lib/brand';
import Shell from '@/components/pages/dashboard/Shell';
import Sheet from '@/components/pages/dashboard/Sheet';
import { ArtScales, ArtBlocks, ArtWeek, ArtFrond, ArtCrop, ArtKpi, ArtRail } from '@/components/pages/dashboard/Arts';
import s from '@/components/pages/dashboard/dashboard.module.css';

export const metadata = pageMeta('dashboard');

export default function Page() {
  return (
    <section className="page" id="p-dashboard" aria-label="Dashboard">
      <header className="wrap" style={{ paddingTop: 'var(--pad)' }}>
        <p className="t-caps">{AREAS.join(' · ')} · {SECTORS.join(' · ')}</p>
        <h1 tabIndex={-1} className="t-display" style={{ marginTop: 12 }}>Dashboard</h1>
        <p className="t-lead muted" style={{ marginTop: 14, maxWidth: 760 }}>
          The remote back-office in the brand&apos;s print language: five home layouts on one set of rows, slots and lines, and two inner screens. Filters, sort, search, tabs and moves all work.
        </p>
      </header>
      <div className="wrap" style={{ marginTop: 'var(--gap)' }}>
        <Shell />
      </div>
      <div className="wrap">
        <Reveal as="section" className={s.block}>
          <h2 className="t-h2">Components</h2>
          <Sheet />
        </Reveal>
        <Reveal as="section" className={s.block}>
          <h2 className="t-h2">Graphics</h2>
          <div className={s.gfx}>
            <div className={s.gfxWide}><ArtScales /></div>
            <div className={s.gfxWide}><ArtWeek /></div>
            <div><ArtBlocks /></div>
            <div><ArtKpi /></div>
            <div className={s.gfxTrio}>
              <div><ArtRail /></div>
              <div><ArtFrond /></div>
              <div><ArtCrop /></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
