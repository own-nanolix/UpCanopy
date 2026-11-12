import { pageMeta } from '@/lib/pages';
import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import Easing from '@/components/pages/motion/Easing';
import { Durations, Stagger } from '@/components/pages/motion/Durations';
import LogoAnim from '@/components/pages/motion/LogoAnim';
import Transitions from '@/components/pages/motion/Transitions';
import Micro from '@/components/pages/motion/Micro';
import Loaders from '@/components/pages/motion/Loaders';
import DoDont from '@/components/pages/motion/DoDont';
import s from '@/components/pages/motion/motion.module.css';

export const metadata = pageMeta('motion');

const TOKENS = [
  ['ease.out', '0.16, 1, 0.3, 1'],
  ['ease.inOut', '0.7, 0, 0.3, 1'],
  ['ease.draw', '0.45, 0, 0.15, 1'],
  ['ease.lock', '0.2, 1.2, 0.4, 1'],
  ['dur-1', '120 ms'],
  ['dur-2', '240 ms'],
  ['dur-3', '480 ms'],
  ['dur-4', '800 ms'],
  ['dur-5', '1400 ms'],
  ['stagger', '45 ms'],
];

export default function Page() {
  return (
    <section className="page" id="p-motion" aria-label="Motion">
      <div className="split split-right">
        <div className="split-main">
          <section className={s.head}>
            <h1 tabIndex={-1} className="t-h1">
              Motion: <span className="strong">rise and lock</span>
            </h1>
            <p className={`t-lead ${s.lead}`}>Steady, upward, exact. Things rise into place and lock.</p>
          </section>

          <section aria-labelledby="motion-h-ease">
            <h2 id="motion-h-ease" className="t-h2">Easing curves</h2>
            <p className={`t-small muted ${s.sub}`}>Four curves, one lane each. Press Play, or scroll a lane into view.</p>
            <div className={s.block3}><Easing /></div>
          </section>

          <section aria-labelledby="motion-h-dur">
            <h2 id="motion-h-dur" className="t-h2">Durations and stagger</h2>
            <div className={s.block3}><Durations /></div>
            <div className={s.block3}><Stagger /></div>
          </section>

          <section aria-labelledby="motion-h-logo">
            <h2 id="motion-h-logo" className="t-h2">Logo animation</h2>
            <p className={`t-small muted ${s.sub}`}>The arch lowers onto the bar like a roof being set.</p>
            <div className={s.block3}><LogoAnim /></div>
          </section>

          <section aria-labelledby="motion-h-trans">
            <h2 id="motion-h-trans" className="t-h2">Page and component transitions</h2>
            <div className={s.block3}><Transitions /></div>
          </section>

          <section aria-labelledby="motion-h-micro">
            <h2 id="motion-h-micro" className="t-h2">Micro-interactions</h2>
            <div className={s.block3}><Micro /></div>
            <h3 className="t-caps-lg" style={{ marginTop: 'calc(var(--gap) * 1.6)' }}>Loaders</h3>
            <div className={s.block3}><Loaders /></div>
          </section>

          <section aria-labelledby="motion-h-dd">
            <h2 id="motion-h-dd" className="t-h2">Do and don&apos;t</h2>
            <DoDont />
          </section>
        </div>

        <aside className="split-rail" aria-label="Motion tokens">
          <div className={s.railTop}>
            <Art className={s.railMark} viewBox="0 0 100 100" title="The mark, arch lifting and settling" exportName="motion-rail-mark" decorative>
              <MarkG fill="#26CF7B" archClass={s.loopLift} />
            </Art>
            <p className="t-caps">Motion tokens</p>
          </div>
          <ul className={s.tokens}>
            {TOKENS.map(([k, v]) => (
              <li key={k}>
                <b>{k}</b>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
