import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import { INTRO, CHALLENGE, STRATEGY, NAMING, VISUAL_IDENTITY, TONE, VALUES, DIRECTION, LINES, MANIFESTO } from '@/lib/brand';
import { Line } from '@/components/ui/Card';
import ChapterRail from '@/components/pages/strategy/ChapterRail';
import ScalesSlide from '@/components/pages/strategy/ScalesSlide';
import ScaleReadout from '@/components/pages/strategy/ScaleReadout';
import * as D from '@/components/pages/strategy/Diagrams';
import * as E from '@/components/pages/strategy/Diagrams2';
import s from '@/components/pages/strategy/strategy.module.css';

export const metadata = pageMeta('strategy');

const CHAPTERS = [
  { id: 'strategy-intro', label: 'Introduction' },
  { id: 'strategy-desafio', label: CHALLENGE.title, lang: 'pt-BR' },
  { id: 'strategy-estrategia', label: STRATEGY.title, lang: 'pt-BR' },
  { id: 'strategy-naming', label: 'Naming', lang: 'pt-BR' },
  { id: 'strategy-identidade', label: 'Identidade Visual', lang: 'pt-BR' },
  { id: 'strategy-escalas', label: DIRECTION.label, lang: 'pt-BR' },
  { id: 'strategy-tom', label: TONE.title, lang: 'pt-BR' },
  { id: 'strategy-valores', label: VALUES.title, lang: 'pt-BR' },
];
const TOTAL = CHAPTERS.length;
const split = (t) => { const i = t.indexOf(': '); return [t.slice(0, i), t.slice(i + 2)]; };
const unbullet = (t) => t.replace(/^•\s*/, '');

// One slide: tiny caps in the corners, as on the designer's presentation slides.
function Slide({ n, children, flush }) {
  const c = CHAPTERS[n];
  return (
    <Reveal>
      <section id={c.id} aria-labelledby={`${c.id}-h`} className={`${s.slide} ${flush ? s.slideFlush : ''}`}>
        <div className={s.cornersTop}>
          <span lang={c.lang}>{c.label}</span>
          <span lang="pt-BR">CLIENTE: EDERSON DEVENS<br />PROJETO: UPCANOPY</span>
        </div>
        <div className={s.slideBody}>{children}</div>
        <div className={s.cornersBottom}>
          <span>UPCANOPY / REMOTE BACK–OFFICE</span>
          <span>→({String(n + 1).padStart(2, '0')}/{String(TOTAL).padStart(2, '0')})</span>
        </div>
      </section>
    </Reveal>
  );
}

// A figure under a slide's text: the brand phrase it draws on one side, the exportable diagram on the other.
function Extra({ label, caption, flip, children, phrase }) {
  return (
    <div className={`${s.extra} ${flip ? s.extraFlip : ''}`}>
      <div className={s.extraText}>
        <span className={s.extraLabel}>{label}</span>
        <p className={s.phrase} lang="pt-BR">{phrase}</p>
        <p className={s.cap}>{caption}</p>
      </div>
      {children}
    </div>
  );
}

const Points =({ list }) => (
  <ol className={s.points}>
    {list.map((p) => (
      <li key={p.title}>
        <h3 className="t-h3" lang="pt-BR">{p.title}</h3>
        <p className={s.lead} lang="pt-BR">{p.text[0]}</p>
        <ul className={s.bullets} lang="pt-BR">
          {p.text.slice(1).map((t) => <li key={t}>{unbullet(t)}</li>)}
        </ul>
      </li>
    ))}
  </ol>
);

export default function Page() {
  const [nameLabel, nameText] = split(NAMING);
  const [idLabel, idText] = split(VISUAL_IDENTITY);
  return (
    <section className="page" id="p-strategy" aria-label="Strategy">
      <div className="split">
        <ChapterRail chapters={CHAPTERS} />
        <div className={`split-main ${s.deck}`}>
          <Slide n={0}>
            <div className={s.pair}>
              <div>
                <h2 className="t-h2" id="strategy-intro-h" lang="pt-BR">{INTRO.title}</h2>
                <p className={`t-lead ${s.text}`} lang="pt-BR">{INTRO.text}</p>
              </div>
              <D.IntroDiagram />
            </div>
            <Extra label="Two modes" phrase={MANIFESTO[7]} caption="Six blocks scatter in the first mode and lock into one grid in the second.">
              <E.ModesDiagram />
            </Extra>
          </Slide>

          <Slide n={1}>
            <div className={s.pair}>
              <div>
                <h2 className="t-h2" id="strategy-desafio-h" lang="pt-BR">{CHALLENGE.title}</h2>
                <p className={`t-lead ${s.text}`} lang="pt-BR">{CHALLENGE.text}</p>
              </div>
              <D.ChallengeDiagram />
            </div>
            <Extra label="Three pillars" flip phrase={MANIFESTO[5]} caption="Each pillar rises under the arch of the mark and locks onto the base.">
              <E.PillarsDiagram />
            </Extra>
          </Slide>

          <Slide n={2}>
            <div className={s.pair}>
              <div>
                <h2 className="t-h2" id="strategy-estrategia-h" lang="pt-BR">{STRATEGY.title}</h2>
                <p className={`t-lead ${s.text}`} lang="pt-BR">{STRATEGY.text}</p>
              </div>
              <D.StrategyDiagram />
            </div>
            <Extra label="The bridge" phrase={<Line text={LINES.bridge.text} strong={LINES.bridge.strong} className="hl-ink" />} caption="An arch rises between the two banks and carries the name.">
              <E.BridgeDiagram />
            </Extra>
          </Slide>

          <Slide n={3}>
            <div className={s.pair}>
              <div>
                <h2 className="t-h2" id="strategy-naming-h" lang="pt-BR">{nameLabel}</h2>
                <p className={`t-lead ${s.text}`} lang="pt-BR">{nameText}</p>
              </div>
              <D.NamingDiagram />
            </div>
            <Extra label="Two words, one name" flip phrase="UpCanopy" caption="Up and Canopy slide together and set the name.">
              <E.NamingJoinDiagram />
            </Extra>
          </Slide>

          <Slide n={4}>
            <div className={s.pair}>
              <div>
                <h2 className="t-h2" id="strategy-identidade-h" lang="pt-BR">{idLabel}</h2>
                <p className={`t-lead ${s.text}`} lang="pt-BR">{idText}</p>
              </div>
              <D.IdentityDiagram />
            </div>
          </Slide>

          <Reveal>
            <section id="strategy-escalas" aria-labelledby="strategy-escalas-h">
              <h2 id="strategy-escalas-h" className="sr-only" lang="pt-BR">{DIRECTION.label}</h2>
              <ScalesSlide />
              <ScaleReadout />
            </section>
          </Reveal>

          <Slide n={6}>
            <h2 className="t-h2" id="strategy-tom-h" lang="pt-BR">{TONE.title}</h2>
            <div className={s.intro} lang="pt-BR">
              {TONE.intro.map((t) => <p key={t} className="t-lead">{t}</p>)}
            </div>
            <Points list={TONE.points} />
            <div className={s.diagramWide}><D.ToneDiagram /></div>
            <Extra label="Two columns" phrase={TONE.points[2].text[1].replace(/^•\s*/, '').split(', mas')[0]} caption="Serious in the doing, warm in the relationship: the two columns rise side by side.">
              <E.BalanceDiagram />
            </Extra>
          </Slide>

          <Slide n={7}>
            <h2 className="t-h2" id="strategy-valores-h" lang="pt-BR">{VALUES.title}</h2>
            <div className={s.intro} lang="pt-BR">
              {VALUES.intro.map((t) => <p key={t} className="t-lead">{t}</p>)}
            </div>
            <Points list={VALUES.points} />
            <div className={s.diagramWide}><D.ValuesDiagram /></div>
            <Extra label="Summary of the dynamics" flip phrase={VALUES.summary.text[0].replace(/^•\s*/, '')} caption="Each value leads to one outcome; the bar closes the sentence.">
              <E.DynamicsDiagram />
            </Extra>
            <div className={s.summary} lang="pt-BR">
              <h3 className="t-caps-lg">{VALUES.summary.title}</h3>
              <ul className={s.bullets}>
                {VALUES.summary.text.slice(0, 2).map((t) => <li key={t}>{unbullet(t)}</li>)}
              </ul>
              <p className="t-lead strong">{VALUES.summary.text[2]}</p>
            </div>
          </Slide>
        </div>
      </div>
    </section>
  );
}
