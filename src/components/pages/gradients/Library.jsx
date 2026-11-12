// The library: six named brand gradients as tall portrait plates, each an exportable SVG.
import Art from '@/components/art/Art';
import { GRADS, GradDef, GrainDef, DotsDef, GradRect, specOf } from './parts';
import s from './gradients.module.css';

export default function Library() {
  return (
    <div className={s.libGrid}>
      {GRADS.map((g, n) => {
        const idp = `gradients-lib-${g.key}`;
        return (
          <figure key={g.key} className={s.fig}>
            <Art viewBox="0 0 300 420" title={`${g.name} gradient`} exportName={`gradients-${g.key}`} className={s.plate}>
              <defs>
                <GradDef idp={idp} g={g} />
                <GrainDef idp={idp} amt={g.grain} seed={3 + n} />
                {g.dots && <DotsDef idp={idp} />}
              </defs>
              <GradRect idp={idp} g={g} w={300} h={420} />
              {g.dots && <rect width="300" height="420" fill={`url(#${idp}-dots)`} />}
            </Art>
            <figcaption className={s.cap}>
              <strong>{g.name}</strong>
              <span>{specOf(g)}</span>
              <span>Seen on: {g.seen}</span>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
