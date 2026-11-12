import { pageMeta } from '@/lib/pages';
import Art from '@/components/art/Art';
import { WordmarkVerticalG } from '@/components/art/Mark';
import Reveal from '@/components/site/Reveal';
import Chip from '@/components/ui/Chip';
import { HEX, LINES, DESCRIPTOR, DIRECTION } from '@/lib/brand';
import { TextVoice, LogotypeVoice } from '@/components/pages/typography/Voices';
import { Ladder } from '@/components/pages/typography/Scale';
import { CharsetText, CharsetLogotype } from '@/components/pages/typography/Charset';
import Poster from '@/components/pages/typography/Poster';
import Tester from '@/components/pages/typography/Tester';
import { HabitLines, Tracking, VerticalStudy, CardStudy } from '@/components/pages/typography/Studies';
import { MetricsArt, HabitWordmark } from '@/components/pages/typography/Metrics';
import s from '@/components/pages/typography/typography.module.css';

export const metadata = pageMeta('typography');

function Head({ n, title }) {
  return (
    <div className={s.secHead}>
      <h2 className="t-h2">{title}</h2>
      <span className="t-caps muted">{n}</span>
    </div>
  );
}

const bridge = LINES.bridge.text.slice(0, -LINES.bridge.strong.length);

export default function Page() {
  return (
    <section className="page" id="p-typography" aria-label="Typography">
      <div className="split">
        <aside className={`split-rail ${s.rail}`} aria-label="The word-mark, set vertically">
          <div className={s.railWord}>
            <Art viewBox="0 0 340 1000" title="UpCanopy word-mark set vertically, reading bottom to top, cropped by the edge" exportName="typography-wordmark-vertical" preserveAspectRatio="xMidYMax slice">
              <rect width="340" height="1000" fill={HEX.navy} />
              <g className="slide-up"><WordmarkVerticalG x={60} y={1000} size={200} fill={HEX.white} /></g>
            </Art>
          </div>
        </aside>

        <div className="split-main">
          <section className={s.head}>
            <div className={s.kicker}><Chip tone="navy">Typography</Chip><Chip>Two voices</Chip></div>
            <h1 className="t-display" tabIndex={-1}>A light voice, <span className="hl-ink">a wide one</span></h1>
            <p className={`t-lead muted ${s.note}`} style={{ marginTop: 18 }}>
              The case study names no typefaces. Red Hat Display and Lexend Exa are the closest free matches, chosen by us.
            </p>
          </section>

          <section className={s.sec}>
            <Reveal><Head n="01" title="Two voices" /></Reveal>
            <div className="grid cols-2">
              <Reveal><div className={s.plate}><TextVoice /></div></Reveal>
              <Reveal delay={120}><div className={s.plate}><LogotypeVoice /></div></Reveal>
            </div>
          </section>

          <section className={s.sec}>
            <Reveal><Head n="02" title="Type scale" /></Reveal>
            <p className={`t-small ${s.note}`}>Each step is a shared class. Samples are the brand&apos;s own lines and labels.</p>
            <Ladder />
          </section>

          <section className={s.sec}>
            <Reveal><Head n="03" title="Character sets" /></Reveal>
            <Reveal><div className={s.plate}><CharsetText /></div></Reveal>
            <Reveal><div className={s.plate}><CharsetLogotype /></div></Reveal>
          </section>

          <section className={s.sec}>
            <Reveal><Head n="04" title="Hierarchy in use" /></Reveal>
            <p className={`t-small ${s.note}`}>The designer&apos;s poster, rebuilt, with the type roles noted in the margin.</p>
            <Reveal><div className={s.plateSlide}><Poster /></div></Reveal>
          </section>

          <section className={s.sec}>
            <Reveal><Head n="05" title="Hierarchy on a business card" /></Reveal>
            <p className={`t-small ${s.note}`}>The back of the card, rebuilt from the stack on the navy table, with the front beside it. Four sizes of one voice and a single bold name.</p>
            <Reveal><div className={s.plateSlide}><CardStudy /></div></Reveal>
          </section>

          <section className={s.sec}>
            <Reveal><Head n="06" title="Construction and metrics" /></Reveal>
            <p className={`t-small ${s.note}`}>Guides measured on the two free faces, as fractions of the font size.</p>
            <Reveal><div className={s.plate}><MetricsArt /></div></Reveal>
          </section>

          <section className={s.sec}>
            <Reveal><Head n="07" title="Habits" /></Reveal>
            <div className={s.habits}>
              <div className={`card-navy ${s.habit}`}>
                <h3 className="t-caps">One bold word closes a line</h3>
                <p className={`t-line ${s.habitDemo}`} lang="pt-BR">{bridge}<span className="hl">{LINES.bridge.strong}</span></p>
              </div>
              <div className={`card-slide ${s.habit}`}>
                <h3 className="t-caps">Caps with wide tracking for descriptors</h3>
                <div className={s.habitDemo}>
                  <p className="t-caps-lg">{DESCRIPTOR}</p>
                  <p className="t-caps" style={{ marginTop: 10 }} lang="pt-BR">{DIRECTION.words.join(' • ')}</p>
                </div>
              </div>
              <div className={`card-navy ${s.habit}`} style={{ padding: 0 }}>
                <h3 className="t-caps" style={{ padding: 'clamp(18px, 2.2vw, 36px) clamp(18px, 2.2vw, 36px) 0' }}>The word-mark: huge, vertical, cropped</h3>
                <HabitWordmark />
              </div>
            </div>
            <Reveal><div className={s.plateNavy}><HabitLines /></div></Reveal>
            <Reveal><div className={s.plate}><Tracking /></div></Reveal>
          </section>

          <section className={s.sec}>
            <Reveal><Head n="08" title="The vertical word-mark" /></Reveal>
            <p className={`t-small ${s.note}`}>As on the letter: the word turned a quarter turn, reading from the bottom to the top, cropped by the edge of the sheet.</p>
            <Reveal><div className={s.plate}><VerticalStudy /></div></Reveal>
          </section>

          <section className={s.sec}>
            <Reveal><Head n="09" title="Try a line" /></Reveal>
            <p className={`t-small ${s.note}`}>Type a line, switch the voice, the weight and the size. The weights are the ones listed in section 01.</p>
            <Reveal><Tester /></Reveal>
          </section>
        </div>
      </div>
    </section>
  );
}
