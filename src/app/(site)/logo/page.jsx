import { pageMeta } from '@/lib/pages';
import Art from '@/components/art/Art';
import { MarkG, MARK } from '@/components/art/Mark';
import { HEX } from '@/lib/brand';
import { ConstructionPlate, ClearSpacePlate, MinSizePlates } from '@/components/pages/logo/Construction';
import { PrimaryPlate, ColourPairs, FamilyPairs, MisuseGrid, CoverPlate, FrondPlate } from '@/components/pages/logo/Versions';
import { RATIOS, U_STACK } from '@/components/pages/logo/Parts';
import DrawOn from '@/components/pages/logo/DrawOn';
import s from '@/components/pages/logo/logo.module.css';

export const metadata = pageMeta('logo');

function Head({ id, title, note }) {
  return (
    <div className={s.head}>
      <h2 className="t-h2" id={id}>{title}</h2>
      {note && <p className={`t-small muted ${s.note}`}>{note}</p>}
    </div>
  );
}

export default function Page() {
  return (
    <section className="page" id="p-logo" aria-label="Logo">
      <div className="split split-right">
        <aside className={`split-rail split-rail-light ${s.rail}`} aria-label="The mark">
          <p className="t-label">Logo</p>
          <div className={s.railWrap}>
            <Art viewBox="0 0 100 100" title="The mark" exportName="logo-rail-mark" className={s.railMark}>
              <MarkG x={0} y={0} size={100} fill={HEX.green} archClass="roof-arch" barClass="roof-bar" />
            </Art>
          </div>
          <p className="t-label">Arch and bar</p>
        </aside>

        <div className="split-main">
          <section className={s.sec} aria-labelledby="logo-h-primary">
            <h1 className={`t-h1 ${s.h1}`} tabIndex={-1}>Logo</h1>
            <p className={`t-lead ${s.intro}`}>
              The mark is two pieces, an arch and a bar, cut from three families of circles that share one ring unit.
            </p>
            <div className={`stack ${s.primary}`}>
              <h2 className="t-h2" id="logo-h-primary">Primary lockup</h2>
              <PrimaryPlate />
            </div>
          </section>

          <section className={s.sec} aria-labelledby="logo-h-construction">
            <Head
              title="Construction"
              note={`Three families of dashed circles about UL, UR and B. One ring unit U = ${MARK.U} in a mark box of 100.`}
            />
            <ConstructionPlate />
            <div className={s.tableWrap}>
              <table className={s.ratios}>
                <caption className="sr-only">Radii of the mark in units of U</caption>
                <thead>
                  <tr><th scope="col">Edge</th><th scope="col">Radius in U</th><th scope="col">Radius in mark units</th><th scope="col">Centre</th></tr>
                </thead>
                <tbody>
                  {RATIOS.map((r) => (
                    <tr key={r.key}><td>{r.label}</td><td>{r.units} U</td><td>{r.r}</td><td>{r.centre}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={s.sec} aria-labelledby="logo-h-space">
            <Head id="logo-h-space" title="Clear space" note={`Working recommendation: 3 U on every side, where U is the ring unit of the mark in the lockup (${U_STACK} at this size).`} />
            <ClearSpacePlate />
          </section>

          <section className={s.sec} aria-labelledby="logo-h-sizes">
            <Head id="logo-h-sizes" title="Minimum sizes" note="Working recommendation, shown at 1 unit = 1 px." />
            <div className={s.mins}>
              <MinSizePlates />
            </div>
          </section>

          <section className={s.sec} aria-labelledby="logo-h-colour">
            <Head id="logo-h-colour" title="Colour versions" />
            <div className={s.pairs}>
              <ColourPairs />
            </div>
          </section>

          <section className={s.sec} aria-labelledby="logo-h-family">
            <Head id="logo-h-family" title="Lockup family" />
            <div className={s.pairs}>
              <FamilyPairs />
            </div>
          </section>

          <section className={s.sec} aria-labelledby="logo-h-misuse">
            <Head id="logo-h-misuse" title="Misuse" note="Each example is crossed with a thin red line." />
            <div className={s.misuse}>
              <MisuseGrid />
            </div>
          </section>

          <section className={s.sec} aria-labelledby="logo-h-secondary">
            <Head id="logo-h-secondary" title="Secondary graphic from the mark" note="The mark crop on the green gradient, and the frond with the mark." />
            <div className={s.secondary}>
              <CoverPlate />
              <FrondPlate />
            </div>
          </section>

          <section className={s.sec} aria-labelledby="logo-h-draw">
            <Head id="logo-h-draw" title="Draw-on" note="Circles fade in, the bar rises, the arch lowers onto it." />
            <DrawOn />
          </section>
        </div>
      </div>
    </section>
  );
}
