import Art from '@/components/art/Art';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { ArrowG } from '@/components/art/KeyArt';
import { PILLARS, MODES, HEX } from '@/lib/brand';
import { bandPath, seeded, r2 } from '@/lib/charts';
import s from './strategy.module.css';

// Second set of diagrams: each one draws a phrase of the case study and lands on its finished state.
// Animation is CSS only, always on an inner <g> or on an element without a transform attribute.
const N = HEX.navy, G = HEX.green, W = '#FFFFFF', D = HEX.greenDark;
const wide = { fontFamily: 'var(--font-wide)' };
const Bg = () => <rect width="600" height="420" fill={HEX.slide} />;

// How "Up" and "Canopy" join in one name.
export function NamingJoinDiagram() {
  return (
    <Art viewBox="0 0 600 420" title="Up and Canopy joining into the name UpCanopy" exportName="strategy-naming-join">
      <Bg />
      <g className={s.joinL}>
        <rect x="40" y="120" width="190" height="150" fill={N} />
        <text x="135" y="212" textAnchor="middle" fontSize="44" fontWeight="500" fill={W} className="wide" style={wide}>Up</text>
      </g>
      <g className={s.joinR}>
        <rect x="230" y="120" width="330" height="150" fill={G} />
        <text x="395" y="212" textAnchor="middle" fontSize="44" fontWeight="500" fill={N} className="wide" style={wide}>Canopy</text>
      </g>
      <g className="fade-in" style={{ '--i': 8 }} color={N}>
        <g transform="rotate(-90 137 71)">
          <ArrowG x={112} y={48} size={46} stroke={N} strokeWidth={7} />
        </g>
        <rect x="230" y="104" width="330" height="8" fill={N} />
      </g>
      <g className="fade-in" style={{ '--i': 10 }} fontSize="16" fill={N} lang="pt-BR">
        <text x="395" y="78" textAnchor="middle">topo das árvores</text>
        <text x="395" y="98" textAnchor="middle" fontWeight="700">(canopy)</text>
      </g>
      <rect className="grow-x" style={{ '--i': 8 }} x="40" y="300" width="520" height="12" fill={D} />
      <g className="lock" style={{ '--i': 12 }}>
        <WordmarkG x={300} y={382} size={58} fill={N} anchor="middle" />
      </g>
    </Art>
  );
}

// "A ponte entre o trabalho manual e a maturidade empresarial chama-se UpCanopy": an arch bridging two banks.
export function BridgeDiagram() {
  const arch = bandPath(300, 396, 118, 160, -54, 54);
  return (
    <Art viewBox="0 0 600 420" title="A bridge from trabalho manual to maturidade empresarial, named UpCanopy" exportName="strategy-bridge">
      <Bg />
      <g className="rise" style={{ '--i': 0 }}>
        <rect x="24" y="296" width="156" height="100" fill={N} />
      </g>
      <g className="rise" style={{ '--i': 2 }}>
        <rect x="420" y="296" width="156" height="100" fill={D} />
      </g>
      <g fontSize="15" fontWeight="500" className="wide" style={wide} lang="pt-BR">
        <text x="102" y="340" textAnchor="middle" fill={W}>trabalho</text>
        <text x="102" y="362" textAnchor="middle" fill={W}>manual</text>
        <text x="498" y="340" textAnchor="middle" fill={HEX.mint}>maturidade</text>
        <text x="498" y="362" textAnchor="middle" fill={HEX.mint}>empresarial</text>
      </g>
      <g className="rise" style={{ '--i': 6 }}>
        <path d={arch} fill={G} />
      </g>
      <rect className="grow-x" style={{ '--i': 4 }} x="24" y="396" width="552" height="14" fill={HEX.asphalt} />
      <g className="fade-in" style={{ '--i': 12 }} lang="pt-BR" textAnchor="middle" fill={N}>
        <text x="300" y="150" fontSize="18">A ponte</text>
        <text x="300" y="196" fontSize="30" fontWeight="700">UpCanopy</text>
      </g>
      <g className="fade-in" style={{ '--i': 14 }} fill={N}>
        <rect x="270" y="212" width="60" height="6" />
        <rect x="294" y="218" width="12" height="22" />
      </g>
    </Art>
  );
}

// Organização, Disciplina, Confiança as three locked blocks under the mark's arch.
const WORDS = ['obsessão', 'linguagem', 'promessa'];
export function PillarsDiagram() {
  const fills = [[N, W], [G, N], [D, HEX.mint]];
  return (
    <Art viewBox="0 0 600 420" title="Organização, Disciplina and Confiança as three pillars under the arch" exportName="strategy-pillars">
      <Bg />
      <MarkG x={190} y={-14} size={220} fill={N} archClass="roof-arch" barClass="roof-bar" />
      {PILLARS.map((p, i) => (
        <g key={p} className="rise" style={{ '--i': 3 + i * 3 }} lang="pt-BR">
          <rect x={30 + i * 187} y={206} width="170" height="170" fill={fills[i][0]} />
          <text x={115 + i * 187} y={262} textAnchor="middle" fontSize="13" fill={fills[i][1]}>nossa {WORDS[i]}</text>
          <text x={115 + i * 187} y={304} textAnchor="middle" fontSize="20" fontWeight="500" fill={fills[i][1]} className="wide" style={wide}>{p}</text>
        </g>
      ))}
      <rect className="grow-x" style={{ '--i': 14 }} x="30" y="376" width="540" height="20" fill={HEX.asphalt} />
    </Art>
  );
}

// "Séria" na execução, "Empática e Acolhedora" no relacionamento: two columns of one house.
export function BalanceDiagram() {
  const cols = [
    { x: 40, fill: N, ink: W, head: 'Séria', sub: 'na execução', items: ['cumprir prazos', 'proteger dados'] },
    { x: 320, fill: G, ink: N, head: 'Empática', sub: 'no relacionamento', items: ['comunidade brasileira', 'profissionalismo'] },
  ];
  return (
    <Art viewBox="0 0 600 420" title="Séria na execução and Empática no relacionamento, side by side" exportName="strategy-balance">
      <Bg />
      {cols.map((c, k) => (
        <g key={c.head} className="rise" style={{ '--i': k * 3 }} lang="pt-BR">
          <rect x={c.x} y="120" width="240" height="250" fill={c.fill} />
          <text x={c.x + 24} y="172" fontSize="26" fontWeight="500" fill={c.ink} className="wide" style={wide}>{c.head}</text>
          <text x={c.x + 24} y="200" fontSize="16" fill={c.ink}>{c.sub}</text>
          {c.items.map((t, j) => (
            <g key={t}>
              <rect x={c.x + 24} y={246 + j * 44} width="14" height="14" fill={c.ink} />
              <text x={c.x + 50} y={259 + j * 44} fontSize="16" fill={c.ink}>{t}</text>
            </g>
          ))}
        </g>
      ))}
      <rect className="grow-x" style={{ '--i': 6 }} x="40" y="370" width="520" height="16" fill={HEX.asphalt} />
      <g className="fade-in" style={{ '--i': 9 }} lang="pt-BR" fill={N} fontSize="16" fontWeight="700">
        <text x="40" y="84">alicerce</text>
        <text x="560" y="84" textAnchor="end">contrapeso</text>
        <rect x="40" y="100" width="520" height="4" />
      </g>
    </Art>
  );
}

// Disciplina garante a Eficiência (entrega do serviço); Confiança garante a Adesão (venda e retenção).
export function DynamicsDiagram() {
  const rows = [
    { from: 'Disciplina', to: 'Eficiência', note: 'entrega do serviço', fill: N, ink: W },
    { from: 'Confiança', to: 'Adesão', note: 'venda e retenção', fill: G, ink: N },
  ];
  return (
    <Art viewBox="0 0 600 420" title="Disciplina leads to Eficiência, Confiança leads to Adesão" exportName="strategy-dynamics">
      <Bg />
      {rows.map((r, k) => (
        <g key={r.from} lang="pt-BR">
          <g className="grow-x" style={{ '--i': k * 5 }}>
            <rect x="40" y={90 + k * 130} width="230" height="92" fill={r.fill} />
          </g>
          <text x="64" y={146 + k * 130} fontSize="22" fontWeight="500" fill={r.ink} className="wide" style={wide}>{r.from}</text>
          <g className="fade-in" style={{ '--i': 6 + k * 5 }}>
            <ArrowG x={292} y={114 + k * 130} size={40} stroke={N} strokeWidth={7} />
            <rect x="372" y={90 + k * 130} width="188" height="92" fill="none" stroke={N} strokeWidth="4" />
            <text x="392" y={132 + k * 130} fontSize="20" fontWeight="700" fill={N}>{r.to}</text>
            <text x="392" y={158 + k * 130} fontSize="15" fill={N}>{r.note}</text>
          </g>
        </g>
      ))}
      <rect className="grow-x" style={{ '--i': 14 }} x="40" y="370" width="520" height="8" fill={N} />
      <text className="fade-in" style={{ '--i': 16 }} x="300" y="404" textAnchor="middle" fontSize="15" fill={N} lang="pt-BR">cumpre o que promete e protege quem a contrata</text>
    </Art>
  );
}

// From "sobrevivência" (blocks scattered) to "expansão" (the same blocks aligned and locked).
export function ModesDiagram() {
  const rnd = seeded(11);
  const loose = Array.from({ length: 6 }, (_, i) => ({
    x: r2(30 + (i % 3) * 82 + rnd() * 26), y: r2(110 + Math.floor(i / 3) * 112 + rnd() * 34), rot: r2((rnd() - 0.5) * 70), i,
  }));
  const aligned = Array.from({ length: 6 }, (_, i) => ({ x: 340 + (i % 3) * 82, y: 110 + Math.floor(i / 3) * 82, i }));
  return (
    <Art viewBox="0 0 600 420" title="Modo sobrevivência: scattered blocks. Modo expansão: the same blocks aligned" exportName="strategy-modes">
      <Bg />
      {loose.map((b) => (
        <g key={b.i} transform={`translate(${b.x} ${b.y}) rotate(${b.rot} 32 32)`}>
          <g className="lock" style={{ '--i': b.i }}>
            <rect width="64" height="64" fill={N} opacity="0.75" />
          </g>
        </g>
      ))}
      <g className="fade-in" style={{ '--i': 8 }}>
        <ArrowG x={262} y={186} size={38} stroke={N} strokeWidth={7} />
      </g>
      {aligned.map((b) => (
        <g key={b.i} className="lock" style={{ '--i': 10 + b.i }}>
          <rect x={b.x} y={b.y} width="64" height="64" fill={b.i === 5 ? G : N} />
        </g>
      ))}
      <rect className="grow-x" style={{ '--i': 12 }} x="340" y="284" width="228" height="8" fill={N} />
      <g fontSize="18" fill={N} fontWeight="700" lang="pt-BR">
        <text x="30" y="60">modo</text>
        <text x="30" y="88">{MODES[0]}</text>
        <text x="340" y="60">modo</text>
        <text x="340" y="88" fill={HEX.greenInk}>{MODES[1]}</text>
      </g>
    </Art>
  );
}
