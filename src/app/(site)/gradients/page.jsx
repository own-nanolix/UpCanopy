import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import { MarkG } from '@/components/art/Mark';
import { LINES } from '@/lib/brand';
import Library from '@/components/pages/gradients/Library';
import Anatomy from '@/components/pages/gradients/Anatomy';
import Grain from '@/components/pages/gradients/Grain';
import KeyPlates from '@/components/pages/gradients/KeyPlates';
import Motion from '@/components/pages/gradients/Motion';
import s from '@/components/pages/gradients/gradients.module.css';

export const metadata = pageMeta('gradients');

function Head({ title, text }) {
  return (
    <div className={s.head}>
      <h2 className="t-h2">{title}</h2>
      <p className="t-small muted">{text}</p>
    </div>
  );
}

export default function Page() {
  return (
    <section className="page" id="p-gradients" aria-label="Gradients and key art">
      <div className="split split-right">
        <aside className={`split-rail ${s.rail}`}>
          <div className={s.railTop}>
            <svg viewBox="0 0 100 100" className={s.railMark} aria-hidden="true">
              <MarkG size={100} fill="currentColor" archClass="roof-arch" barClass="roof-bar" />
            </svg>
          </div>
          <div className={s.railPanel}>
            <h1 className="t-h1" tabIndex={-1}>Gradients and <span className="hl">key art</span></h1>
            <p className="t-small on-navy" lang="pt-BR">{LINES.level}</p>
            <p className={s.railCount}>6 gradients, grain, 6 key-art plates, 4 motion studies</p>
          </div>
        </aside>

        <div className="split-main">
          <section aria-labelledby="gradients-h-library">
            <Reveal>
              <div className={s.head}>
                <h2 className="t-h2" id="gradients-h-library">Gradient library</h2>
                <p className="t-small muted">Six brand gradients, each as it appears in the case study, with fine print grain.</p>
              </div>
              <Library />
            </Reveal>
          </section>

          <section>
            <Reveal>
              <Head title="Gradient anatomy" text="Stops, offsets and angle of two gradients, drawn with dimension lines." />
              <Anatomy />
            </Reveal>
          </section>

          <section>
            <Reveal>
              <Head title="Grain and dot texture" text="The brand prints with fine grain and a small regular dot texture on mint surfaces. Four strengths of each." />
              <Grain />
            </Reveal>
          </section>

          <section>
            <Reveal>
              <Head title="Key art" text="Six pieces composed from the frond, the mark, its construction circles, thick cut bands, the ten-dot row and the word-mark." />
              <KeyPlates />
            </Reveal>
          </section>

          <section style={{ paddingBottom: 'var(--band)' }}>
            <Reveal>
              <Head title="Motion studies" text="Four looping studies. Each is a finished frame when still." />
              <Motion />
            </Reveal>
          </section>
        </div>
      </div>
    </section>
  );
}
