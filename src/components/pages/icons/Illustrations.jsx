import Art from '@/components/art/Art';
import { ConstructionG, ScaleDotsG } from '@/components/art/KeyArt';
import { MARK_ARCH } from '@/components/art/Mark';
import Reveal from '@/components/site/Reveal';
import { bandPath, r2, seeded } from '@/lib/charts';
import { range } from '@/lib/site';
import { AREAS, MODES } from '@/lib/brand';
import { GlyphAt } from './data';
import s from './icons.module.css';

const W = 800;
const H = 560;
const wide = { fontFamily: 'var(--font-wide)' };

// Two grounds per subject: light (slide grey or Green Ligth) and dark (navy or Green Dark).
function theme(dark, ground) {
  if (!dark) return { bg: ground === 'mint' ? '#F2FFE4' : '#F0F0F0', ink: '#162557', accent: '#26CF7B', soft: '#DADADA', ring: '#086338', on: '#162557' };
  return { bg: ground === 'dark' ? '#052E25' : '#162557', ink: '#FFFFFF', accent: '#26CF7B', soft: ground === 'dark' ? '#8FC9B5' : '#6F78B8', ring: '#8FC9B5', on: '#162557' };
}

// 1. The canopy: the arch as a treetop sheltering blocks beneath it.
function Canopy({ t }) {
  const rows = [6, 4, 2];
  return (
    <>
      <ConstructionG x={100} y={20} size={600} rings={7} stroke={t.ring} strokeWidth={0.22} opacity="0.55" />
      <path d={MARK_ARCH} transform="translate(100 20) scale(6)" fill={t.ink} />
      {rows.map((n, ri) =>
        range(n).map((ci) => {
          const x = 400 - (n * 54) / 2 + ci * 54 + 2;
          const y = 450 - ri * 54 - 46;
          const top = ri === 2;
          return <rect key={`${ri}-${ci}`} x={x} y={y} width="46" height="46" fill={top ? t.accent : t.soft} className="lock" style={{ '--i': ri * 6 + ci }} />;
        }),
      )}
      <path d="M96 458H704" stroke={t.ink} strokeWidth="6" />
      <ScaleDotsG x={100} y={510} w={600} r={7} chosen={8} on={t.accent} off={t.soft} lock />
    </>
  );
}

// 2. From sobrevivência to expansão: scattered blocks become an ordered, rising stack.
function Rise({ t }) {
  const rnd = seeded(11);
  const loose = range(9).map((i) => ({ x: r2(60 + rnd() * 250), y: r2(300 + rnd() * 180), a: r2((rnd() - 0.5) * 80), z: r2(30 + rnd() * 22), i }));
  return (
    <>
      <path d={bandPath(300, 700, 280, 304, -34, 24)} fill={t.accent} className="fade-in" />
      {loose.map((b) => (
        <rect key={b.i} x={b.x} y={b.y} width={b.z} height={b.z} fill={b.i % 4 === 0 ? t.ink : t.soft} transform={`rotate(${b.a} ${r2(b.x + b.z / 2)} ${r2(b.y + b.z / 2)})`} />
      ))}
      {range(5).map((c) =>
        range(c + 1).map((r) => (
          <rect key={`${c}-${r}`} x={440 + c * 62} y={470 - r * 54 - 46} width="46" height="46" fill={c === 4 && r === 4 ? t.accent : t.ink} className="lock" style={{ '--i': c * 2 + r }} />
        )),
      )}
      <path d="M430 470H776" stroke={t.ink} strokeWidth="6" />
      <text x="60" y="520" fontSize="15" fontWeight="500" letterSpacing="1.5" fill={t.ink} className="wide" style={wide} lang="pt-BR">{MODES[0].toUpperCase()}</text>
      <text x="776" y="520" fontSize="15" fontWeight="500" letterSpacing="1.5" fill={t.ink} textAnchor="end" className="wide" style={wide} lang="pt-BR">{MODES[1].toUpperCase()}</text>
      <ScaleDotsG x={70} y={60} w={300} r={6} chosen={8} on={t.accent} off={t.soft} />
    </>
  );
}

// 3. The three desks: CRM, Agenda and Financeiro as three linked blocks under one arch.
const DESK_ICON = ['users', 'calendar', 'chart'];
function Desks({ t }) {
  return (
    <>
      <path d={MARK_ARCH} transform="translate(150 10) scale(5)" fill={t.ink} />
      {[0, 1].map((i) => (
        <path key={i} d={`M${296 + i * 200} 440H${354 + i * 200}`} stroke={t.accent} strokeWidth="10" />
      ))}
      {AREAS.map((a, i) => (
        <g key={a} className="lock" style={{ '--i': i * 3 }}>
          <rect x={130 + i * 200} y="380" width="166" height="120" fill={i === 0 ? t.accent : t.ink} />
          <GlyphAt name={DESK_ICON[i]} x={146 + i * 200} y={396} size={44} color={i === 0 ? t.on : t.bg} sw={2.2} />
          <text x={146 + i * 200} y="482" fontSize="15" fontWeight="500" letterSpacing="1" fill={i === 0 ? t.on : t.bg} className="wide" style={wide}>{a.toUpperCase()}</text>
        </g>
      ))}
    </>
  );
}

const SCENES = [
  { key: 'canopy', name: 'The canopy', Scene: Canopy, light: 'slide', dark: 'navy', note: 'The arch as a treetop, blocks sheltered beneath it.' },
  { key: 'rise', name: 'From sobrevivência to expansão', Scene: Rise, light: 'mint', dark: 'dark', note: 'Scattered blocks become one ordered, rising stack.',
    head: <>From <span lang="pt-BR">{MODES[0]}</span> to <span lang="pt-BR">{MODES[1]}</span></> },
  { key: 'desks', name: 'The three desks', Scene: Desks, light: 'slide', dark: 'navy', note: 'CRM, Agenda and Financeiro, linked, under one arch.' },
];

function Pair({ sc }) {
  return (
    <Reveal delay={60} className={s.pair}>
      <div className={s.pairHead}>
        <h3 className="t-caps-lg">{sc.head || sc.name}</h3>
        <p className="t-small">{sc.note}</p>
      </div>
      <div className={s.pairArts}>
        {[false, true].map((dark) => {
          const t = theme(dark, dark ? sc.dark : sc.light);
          return (
            <figure key={String(dark)} className={s.fig}>
              <Art viewBox={`0 0 ${W} ${H}`} title={`${sc.name}, ${dark ? 'dark' : 'light'}`} exportName={`icons-illustration-${sc.key}-${dark ? 'dark' : 'light'}`} className={s.illus}>
                <rect width={W} height={H} fill={t.bg} />
                <sc.Scene t={t} />
              </Art>
              <figcaption className="t-label">{dark ? 'Dark' : 'Light'}</figcaption>
            </figure>
          );
        })}
      </div>
    </Reveal>
  );
}

export default function Illustrations() {
  return (
    <section id="icons-illustrations" aria-labelledby="icons-illustrations-h">
      <Reveal>
        <h2 id="icons-illustrations-h" className="t-h2">
          Illustrations, <span className="strong">light and dark</span>
        </h2>
        <p className="t-body muted" style={{ maxWidth: 640, marginTop: 12 }}>
          Built from the geometry of the brand only: the arch, thick bands with cut ends, dashed circles, square blocks and
          rows of dots. No people, no faces, no hands.
        </p>
      </Reveal>
      <div className={s.pairs}>
        {SCENES.map((sc) => (
          <Pair key={sc.key} sc={sc} />
        ))}
      </div>
    </section>
  );
}
