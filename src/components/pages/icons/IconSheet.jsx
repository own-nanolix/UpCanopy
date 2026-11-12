import Art from '@/components/art/Art';
import Reveal from '@/components/site/Reveal';
import CopyName from './CopyName';
import { GROUPS, Glyph } from './data';
import s from './icons.module.css';

// The 32 icons as a 4-column sheet of large square cells with 2 px borders. Each icon is its own exportable SVG.
export default function IconSheet() {
  let n = 0;
  return (
    <section aria-labelledby="icons-sheet-h">
      <Reveal>
        <p className="t-label">Deliverable 01</p>
        <h2 id="icons-sheet-h" className="t-h2">
          The icon sheet, <span className="strong">32 icons</span>
        </h2>
        <p className="t-body muted" style={{ maxWidth: 640, marginTop: 12 }}>
          One grid and one stroke for all of them: 24 px grid, 2 px stroke, butt caps, mitre joins, no fills. Each cell is a
          separate SVG; the button beside the name copies it.
        </p>
      </Reveal>
      {GROUPS.map((g, gi) => (
        <div key={g.id} id={g.id} className={s.group}>
          <div className={s.groupHead}>
            <h3 className="t-caps-lg">
              <span className={s.groupNo}>0{gi + 1}</span> {g.label}
            </h3>
            <span className="t-label">{g.names.length} icons</span>
          </div>
          <ul className={s.sheet}>
            {g.names.map((name) => {
              const i = n++;
              return (
                <li key={name} className={s.cell}>
                  <div className={s.cellArt}>
                    <Art viewBox="0 0 24 24" title={`${name} icon`} exportName={`icons-${name}`} className={s.cellSvg}>
                      <Glyph name={name} className="draw" style={{ '--len': 1, '--i': i % 8 }} pathLength="1" />
                    </Art>
                  </div>
                  <div className={s.cellBar}>
                    <span className={s.cellName}>{name}</span>
                    <CopyName name={name} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </section>
  );
}
