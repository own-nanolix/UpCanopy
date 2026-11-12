import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import Chip from '@/components/ui/Chip';
import { DESCRIPTOR } from '@/lib/brand';
import ScenePhone from '@/components/pages/showcase/ScenePhone';
import SceneLineup from '@/components/pages/showcase/SceneLineup';
import { ScenePlinths, ScenePuck } from '@/components/pages/showcase/ScenePlinths';
import SceneStage from '@/components/pages/showcase/SceneStage';
import s from '@/components/pages/showcase/showcase.module.css';

export const metadata = pageMeta('showcase');

export default function Page() {
  return (
    <section className="page" id="p-showcase" aria-label="Showcase">
      <div className={`wrap ${s.top}`}>
        <h1 tabIndex={-1} className="t-display">Show<span className="strong">case</span></h1>
        <div className={s.topRow}>
          <p className={`t-lead ${s.lead}`}>Four scenes on one studio sweep, each stepping along its own diagonal and running off the frame.</p>
          <Chip>{DESCRIPTOR}</Chip>
        </div>
      </div>

      <div className={`wrap ${s.plates}`}>
        <Reveal as="figure" className={s.plate}>
          <div className="mock"><ScenePhone /></div>
          <figcaption className="mock-cap"><span>Phone with data cards</span><span>16:9</span></figcaption>
        </Reveal>

        <Reveal as="figure" className={s.plate}>
          <div className="mock"><SceneLineup /></div>
          <figcaption className="mock-cap"><span>Line-up of eight phones</span><span>3:1</span></figcaption>
        </Reveal>

        <div className={s.pair}>
          <Reveal as="figure" className={s.plate}>
            <div className="mock"><ScenePlinths /></div>
            <figcaption className="mock-cap"><span>Laptop on a plinth</span><span>1:1</span></figcaption>
          </Reveal>
          <Reveal as="figure" className={s.plate} delay={120}>
            <div className="mock"><ScenePuck /></div>
            <figcaption className="mock-cap"><span>Puck on a plinth</span><span>1:1</span></figcaption>
          </Reveal>
        </div>

        <Reveal as="figure" className={s.plate}>
          <div className="mock"><SceneStage /></div>
          <figcaption className="mock-cap"><span>Event stage</span><span>21:9</span></figcaption>
        </Reveal>
      </div>
    </section>
  );
}
