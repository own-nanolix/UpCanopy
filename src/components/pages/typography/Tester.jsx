'use client';

import { useState } from 'react';
import { Segmented } from '@/components/ui/Toggle';
import { LINES } from '@/lib/brand';
import { TEXT_WEIGHTS, WIDE_WEIGHTS, TEXT_FACE, WIDE_FACE } from './type-data';
import s from './typography.module.css';

const VOICES = ['Text voice', 'Logotype voice'];
const PRESETS = [LINES.level, LINES.enough, LINES.control];

// A live tester: type a line, pick the voice, a weight and a size. The weight list follows the voice.
export default function Tester() {
  const [text, setText] = useState(LINES.level);
  const [voice, setVoice] = useState(VOICES[0]);
  const [weight, setWeight] = useState('300');
  const [size, setSize] = useState(64);
  const [caps, setCaps] = useState(false);
  const wide = voice === VOICES[1];
  const weights = (wide ? WIDE_WEIGHTS : TEXT_WEIGHTS).map(([w]) => String(w));
  const face = wide ? WIDE_FACE : TEXT_FACE;
  const used = weights.includes(weight) ? weight : weights[0];

  const pickVoice = (v) => {
    setVoice(v);
    const list = (v === VOICES[1] ? WIDE_WEIGHTS : TEXT_WEIGHTS).map(([w]) => String(w));
    if (!list.includes(weight)) setWeight(v === VOICES[1] ? '500' : '300');
  };

  return (
    <div className={s.tester}>
      <div className={s.testerControls}>
        <div className={s.control}>
          <label className="t-caps muted" htmlFor="typography-tester-text">Your line</label>
          <input id="typography-tester-text" className="input" type="text" lang="pt-BR" value={text} maxLength={90}
            onChange={(e) => setText(e.target.value)} spellCheck={false} />
          <div className="row" style={{ gap: 6, flexWrap: 'wrap' }}>
            {PRESETS.map((p) => (
              <button key={p} type="button" className={s.preset} aria-pressed={p === text} onClick={() => setText(p)} lang="pt-BR">
                {p.length > 26 ? `${p.slice(0, 24)}…` : p}
              </button>
            ))}
          </div>
        </div>
        <div className={s.control}>
          <span className="t-caps muted">Voice</span>
          <Segmented id="typography-tester-voice" label="Voice" options={VOICES} value={voice} onChange={pickVoice} />
        </div>
        <div className={s.control}>
          <span className="t-caps muted">Weight</span>
          <Segmented id="typography-tester-weight" label="Weight" options={weights} value={used} onChange={setWeight} />
        </div>
        <div className={s.control}>
          <label className="t-caps muted" htmlFor="typography-tester-size">Size {size} px</label>
          <input id="typography-tester-size" className={s.range} type="range" min="16" max="120" step="2" value={size}
            onChange={(e) => setSize(Number(e.target.value))} />
        </div>
        <div className={s.control}>
          <span className="t-caps muted">Case</span>
          <Segmented id="typography-tester-case" label="Case" options={['Sentence', 'Caps']} value={caps ? 'Caps' : 'Sentence'} onChange={(v) => setCaps(v === 'Caps')} />
        </div>
      </div>
      <div className={s.testerStage} data-voice={wide ? 'wide' : 'text'}>
        <p className={s.testerSample} lang="pt-BR"
          style={{
            fontFamily: wide ? 'var(--font-wide)' : 'var(--font)',
            fontWeight: Number(used),
            fontSize: size,
            lineHeight: wide ? 1.12 : 1.18,
            letterSpacing: wide ? (caps ? '0.06em' : '-0.04em') : caps ? '0.08em' : 0,
            textTransform: caps ? 'uppercase' : 'none',
          }}>{text || ' '}</p>
        <p className="t-caps on-navy" style={{ marginTop: 18 }}>{face} · {used} · {size} px</p>
      </div>
    </div>
  );
}
