import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import { ConstructionG } from '@/components/art/KeyArt';
import { AREAS, PERSONALITY, HEX } from '@/lib/brand';
import s from './strategy.module.css';

// Diagrams that only restate the text beside them. Each is a standalone SVG on slide grey, words verbatim.
const N = HEX.navy, G = HEX.green, W = '#FFFFFF';
const Bg = () => <rect width="600" height="420" fill={HEX.slide} />;
const wide = { fontFamily: 'var(--font-wide)' };

export function IntroDiagram() {
  const fills = [[N, W], [G, N], [HEX.greenDark, HEX.mint]];
  return (
    <Art viewBox="0 0 600 420" title="The roof over CRM, Agenda and Financeiro" exportName="strategy-intro-roof">
      <Bg />
      <MarkG x={190} y={10} size={220} fill={N} archClass="roof-arch" barClass="roof-bar" />
      {AREAS.map((a, i) => (
        <g key={a} className="lock" style={{ '--i': i * 4 }}>
          <rect x={30 + i * 190} y={262} width="170" height="110" fill={fills[i][0]} />
          <text x={115 + i * 190} y={324} textAnchor="middle" fontSize="18" fontWeight="500" fill={fills[i][1]} className="wide" style={wide}>{a}</text>
        </g>
      ))}
    </Art>
  );
}

export function ChallengeDiagram() {
  return (
    <Art viewBox="0 0 600 420" title="Organização as the foundation that scale stands on" exportName="strategy-challenge-pillar">
      <Bg />
      {Array.from({ length: 5 }, (_, i) => (
        <rect key={i} className="rise" style={{ '--i': i * 3 }} x={40 + i * 104} y={300 - i * 58} width="96" height={58 + i * 58} fill={i === 4 ? G : N} />
      ))}
      <rect className="grow-x" x="40" y="366" width="520" height="22" fill={HEX.asphalt} />
      <text x="40" y="412" fontSize="15" fontWeight="700" fill={N} className="wide" style={wide} lang="pt-BR">ORGANIZAÇÃO</text>
      <text x="560" y="50" fontSize="16" textAnchor="end" fill={N} lang="pt-BR">escalabilidade do negócio</text>
    </Art>
  );
}

export function StrategyDiagram() {
  return (
    <Art viewBox="0 0 600 420" title="Naming and visual identity joined in one ecosystem" exportName="strategy-ecosystem">
      <Bg />
      <circle className="draw" style={{ '--len': 817 }} cx="240" cy="160" r="130" fill="none" stroke={N} strokeWidth="14" />
      <circle className="draw" style={{ '--len': 817, '--i': 4 }} cx="360" cy="160" r="130" fill="none" stroke={G} strokeWidth="14" />
      <text x="300" y="166" textAnchor="middle" fontSize="14" fontWeight="700" fill={N} lang="pt-BR">ecossistema</text>
      <text x="170" y="166" textAnchor="middle" fontSize="16" fill={N} lang="pt-BR">naming</text>
      <text x="430" y="166" textAnchor="middle" fontSize="16" fill={N} lang="pt-BR">identidade visual</text>
      <g className="fade-in" style={{ '--i': 14 }} lang="pt-BR">
        <rect x="60" y="352" width="480" height="8" fill={N} />
        <circle cx="60" cy="356" r="16" fill={N} />
        <circle cx="540" cy="356" r="16" fill={G} />
        <rect x="288" y="338" width="24" height="36" fill={N} />
        <text x="60" y="400" fontSize="16" fill={N}>empatia</text>
        <text x="540" y="400" fontSize="16" textAnchor="end" fill={N}>rigor corporativo</text>
      </g>
    </Art>
  );
}

export function NamingDiagram() {
  return (
    <Art viewBox="0 0 600 440" title="The canopy mark above a trunk drawn from the mark's arcs" exportName="strategy-naming-canopy">
      <Bg />
      <rect width="600" height="20" y="420" fill={HEX.slide} />
      <MarkG x={200} y={10} size={200} fill={G} archClass="roof-arch" barClass="roof-bar" />
      <g fill="none" stroke={N} strokeWidth="14">
        <path className="draw" style={{ '--len': 260, '--i': 4 }} d="M284 222A240 240 0 0 1 246 414" />
        <path className="draw" style={{ '--len': 260, '--i': 4 }} d="M316 222A240 240 0 0 0 354 414" />
        <path className="draw" style={{ '--len': 140, '--i': 8 }} d="M246 414A90 90 0 0 0 160 396" />
        <path className="draw" style={{ '--len': 140, '--i': 8 }} d="M354 414A90 90 0 0 1 440 396" />
      </g>
      <g fontSize="16" fill={N} lang="pt-BR" className="fade-in" style={{ '--i': 10 }}>
        <text x="180" y="40" textAnchor="end">topo das árvores</text>
        <text x="180" y="62" textAnchor="end">(canopy)</text>
        <text x="430" y="40">proteção</text>
        <text x="430" y="100">visão sistêmica</text>
        <text x="430" y="160">potencial de elevação</text>
        <text x="430" y="182">do negócio</text>
      </g>
    </Art>
  );
}

export function IdentityDiagram() {
  return (
    <Art viewBox="0 0 600 420" title="The mark's construction: structure and stability" exportName="strategy-identity-structure">
      <Bg />
      <clipPath id="strategy-identity-clip"><rect width="600" height="420" /></clipPath>
      <g clipPath="url(#strategy-identity-clip)">
        <ConstructionG x={150} y={30} size={300} rings={9} stroke={HEX.muted} strokeWidth={0.4} draw />
      </g>
      <MarkG x={150} y={30} size={300} fill={N} archClass="roof-arch" barClass="roof-bar" />
      <g fontSize="16" fill={N} lang="pt-BR" fontWeight="700">
        <text x="20" y="190">estrutura</text>
        <text x="580" y="190" textAnchor="end">estabilidade</text>
        <text x="300" y="400" textAnchor="middle" fontWeight="400">confiança imediata</text>
      </g>
    </Art>
  );
}

export function ToneDiagram() {
  return (
    <Art viewBox="0 0 600 420" title="Séria e Confiável as the foundation, Acolhedora e Empática as the counterweight" exportName="strategy-tone-balance">
      <Bg />
      <rect className="grow-x" x="80" y="260" width="440" height="110" fill={N} />
      <text x="300" y="322" textAnchor="middle" fontSize="20" fontWeight="500" fill={W} className="wide" style={wide} lang="pt-BR">{PERSONALITY[0]}</text>
      <g className="lock" style={{ '--i': 6 }}>
        <circle cx="300" cy="170" r="84" fill={G} />
        <text x="300" y="166" textAnchor="middle" fontSize="18" fontWeight="700" fill={N} lang="pt-BR">Acolhedora</text>
        <text x="300" y="190" textAnchor="middle" fontSize="18" fontWeight="700" fill={N} lang="pt-BR">e Empática</text>
      </g>
      <g fontSize="16" fill={N} lang="pt-BR">
        <text x="410" y="120">contrapeso</text>
        <text x="80" y="398">alicerce</text>
      </g>
    </Art>
  );
}

export function ValuesDiagram() {
  return (
    <Art viewBox="0 0 600 420" title="Disciplina (interno) and Confiança (externo) locking together" exportName="strategy-values-lock">
      <Bg />
      <g className={s.joinL}>
        <path d="M40 120H280V180H330V240H280V300H40Z" fill={N} />
        <text x="160" y="205" textAnchor="middle" fontSize="20" fontWeight="500" fill={W} className="wide" style={wide} lang="pt-BR">Disciplina</text>
        <text x="160" y="232" textAnchor="middle" fontSize="15" fill={W} lang="pt-BR">Interno</text>
      </g>
      <g className={s.joinR}>
        <path d="M280 120H560V300H280V240H330V180H280Z" fill={G} />
        <text x="450" y="205" textAnchor="middle" fontSize="20" fontWeight="500" fill={N} className="wide" style={wide} lang="pt-BR">Confiança</text>
        <text x="450" y="232" textAnchor="middle" fontSize="15" fill={N} lang="pt-BR">Externo</text>
      </g>
      <g fontSize="16" fill={N} lang="pt-BR">
        <text x="300" y="76" textAnchor="middle" fontWeight="700">reputação da UpCanopy</text>
        <rect x="40" y="94" width="520" height="4" fill={N} />
        <text x="40" y="340">Eficiência</text>
        <text x="560" y="340" textAnchor="end">Adesão</text>
      </g>
    </Art>
  );
}
