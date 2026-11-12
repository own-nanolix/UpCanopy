import Art from '@/components/art/Art';
import { HEX, TAGLINE, LINES, DESCRIPTOR, BRAND, DIRECTION } from '@/lib/brand';
import { TEXT_FACE, WIDE_FACE, TEXT_WEIGHTS, WIDE_WEIGHTS } from './type-data';

const WIDE = { fontFamily: 'var(--font-wide)' };
const TEXT_SAMPLES = [TAGLINE, LINES.level, LINES.control, BRAND];
const WIDE_SAMPLES = [DESCRIPTOR, BRAND, DIRECTION.label];
const WIDE_SIZES = [22, 40, 16];

// One voice as a specimen sheet: role, face, a giant "Aa" and each weight with a brand line.
function Sheet({ exportName, title, role, face, weights, samples, sizes, wide, ground, ink, accent }) {
  return (
    <Art viewBox="0 0 600 780" title={title} exportName={exportName}>
      <rect width="600" height="780" fill={ground} />
      <text x="36" y="52" fontSize="12" fontWeight="500" letterSpacing="1.4" fill={accent} className="wide" style={WIDE}>{role}</text>
      <text x="36" y="104" fontSize="40" fontWeight={wide ? 500 : 700} fill={ink} className={wide ? 'wide' : undefined} style={wide ? WIDE : undefined} letterSpacing={wide ? -2 : 0}>{face}</text>
      <g className="slide-up">
        <text x="30" y="330" fontSize="250" fontWeight={wide ? 500 : 300} fill={ink} className={wide ? 'wide' : undefined} style={wide ? WIDE : undefined} letterSpacing={wide ? -17 : -8}>Aa</text>
        <text x="566" y="330" textAnchor="end" fontSize="250" fontWeight={wide ? 600 : 700} fill={accent} className={wide ? 'wide' : undefined} style={wide ? WIDE : undefined}>&amp;</text>
      </g>
      {weights.map(([w, name], i) => {
        const y = 392 + i * (wide ? 112 : 92);
        const size = sizes ? sizes[i] : 28;
        return (
          <g key={w} className="slide-up" style={{ '--i': i + 2 }}>
            <path d={`M36 ${y - 38}H564`} stroke={ink} strokeOpacity="0.3" strokeWidth="1" />
            <text x="36" y={y - 14} fontSize="12" fontWeight="500" letterSpacing="1.2" fill={accent} className="wide" style={WIDE}>{`${w} ${name.toUpperCase()}`}</text>
            <text x="36" y={y + 24} fontSize={size} fontWeight={w} fill={ink} lang="pt-BR" className={wide ? 'wide' : undefined} style={wide ? WIDE : undefined} letterSpacing={wide && i === 1 ? -size * 0.07 : wide && i === 0 ? size * 0.04 : 0}>{samples[i]}</text>
          </g>
        );
      })}
    </Art>
  );
}

export function TextVoice() {
  return (
    <Sheet exportName="typography-voice-text" title="Primary typeface, the text voice, weights 300, 400, 500 and 700" role="PRIMARY · TEXT VOICE" face={TEXT_FACE}
      weights={TEXT_WEIGHTS} samples={TEXT_SAMPLES} sizes={[30, 30, 28, 40]} ground={HEX.navy} ink={HEX.white} accent={HEX.green} />
  );
}

export function LogotypeVoice() {
  return (
    <Sheet exportName="typography-voice-logotype" title="Secondary typeface, the logotype voice, weights 400, 500 and 600" role="SECONDARY · LOGOTYPE VOICE" face={WIDE_FACE} wide
      weights={WIDE_WEIGHTS} samples={WIDE_SAMPLES} sizes={WIDE_SIZES.map((v, i) => (i === 0 ? 22 : i === 1 ? 52 : 18))} ground={HEX.mint} ink={HEX.navy} accent={HEX.greenInk} />
  );
}
