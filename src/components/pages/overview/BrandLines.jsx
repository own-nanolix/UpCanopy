import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import { FrondG } from '@/components/art/KeyArt';
import Reveal from '@/components/site/Reveal';
import { Line } from '@/components/ui/Card';
import { LINES, PERSONALITY, HEX } from '@/lib/brand';
import s from './overview.module.css';

// The three printed brand lines, each on the ground it was printed on, with its bold part as the designer sets
// it. The small marks beside them are exportable.
const FIELDS = [
  { key: 'bridge', cls: 'field-dark', line: LINES.bridge, mark: HEX.green, tone: 'onDark' },
  { key: 'ceo', cls: 'field-navy', line: LINES.ceo, mark: HEX.green, tone: 'onNavy' },
  { key: 'credibility', cls: 'field-paper', line: LINES.credibility, mark: HEX.navy, tone: 'onMint' },
];

function Corner({ k, fill, tone }) {
  return (
    <Art viewBox="0 0 200 120" title={`Corner mark and frond for the ${k} line`} exportName={`overview-line-${k}`} decorative className={s.lineArt}>
      <FrondG cx={230} cy={150} r={150} a0={-180} a1={-96} count={20} len={170} width={7} lean={64} tone={tone} fan />
      <MarkG x={10} y={10} size={44} fill={fill} />
    </Art>
  );
}

export default function BrandLines() {
  return (
    <div className={s.lines}>
      {FIELDS.map((f, i) => {
        const dark = f.cls !== 'field-paper';
        return (
          <Reveal key={f.key} delay={i * 90} className={`${f.cls} ${s.lineCard}`}>
            <Corner k={f.key} fill={f.mark} tone={f.tone} />
            <p className={`t-line ${s.lineText}`} lang="pt-BR">
              <Line text={f.line.text} strong={f.line.strong} className={dark ? 'hl' : 'strong'} />
            </p>
          </Reveal>
        );
      })}
      <Reveal delay={270} className={s.personality}>
        <p className="t-caps">Personality</p>
        <ul className={s.personList} lang="pt-BR">
          {PERSONALITY.map((p) => (
            <li key={p} className="t-h2">{p}</li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
