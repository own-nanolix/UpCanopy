// Brand facts read from the case study. Every name, line and value on the site comes from here or from
// SOURCE.md. Brand copy is Portuguese, exactly as the designer wrote it. Do not add facts that are not in the
// case study: no prices, statistics, testimonials, dates, people or product data exist in it.

export const BRAND = 'UpCanopy';
export const DESCRIPTOR = 'REMOTE BACK–OFFICE';
export const TAGLINE = 'Organização que gera crescimento';
export const DESIGNER = 'Jonas Nicacio';

// Palette as printed on the colour slide (names and spellings kept).
export const PALETTE = [
  { name: 'Green Park', hex: '#26CF7B', no: '01', role: 'PRIMÁRIA', token: 'green' },
  { name: 'Blue Ocean', hex: '#162557', no: '02', role: 'PRIMÁRIA', token: 'navy' },
  { name: 'Green Dark', hex: '#052E25', no: '01', role: 'SECUNDÁRIA', token: 'green-dark' },
  { name: 'Asfalt', hex: '#1D1D1B', no: '02', role: 'SECUNDÁRIA', token: 'asphalt' },
  { name: 'Green Ligth', hex: '#F2FFE4', no: '03', role: 'SECUNDÁRIA', token: 'mint' },
  { name: 'Gray', hex: '#DADADA', no: '04', role: 'SECUNDÁRIA', token: 'gray' },
];
export const HEX = {
  green: '#26CF7B', navy: '#162557', greenDark: '#052E25', asphalt: '#1D1D1B', mint: '#F2FFE4', gray: '#DADADA',
  white: '#FFFFFF', navyDeep: '#0C1445', slide: '#F0F0F0', mintPaper: '#DFF7E6', frond: '#8FC9B5',
  greenInk: '#086338', muted: '#4A5568', navyMuted: '#A9B1D1',
};

// The brand lines. `strong` is the part the designer sets bold (green on dark grounds).
export const LINES = {
  bridge: { text: 'A ponte entre o trabalho manual e a maturidade empresarial chama-se UpCanopy', strong: 'UpCanopy',
    // line breaks as on the truck and the citylight
    rows: ['A ponte entre', 'o trabalho manual', 'e a maturidade', 'empresarial chama-se', 'UpCanopy'],
    // line breaks as on the poster and the folder
    rows4: ['A ponte entre o trabalho', 'manual e a maturidade', 'empresarial chama-se', 'UpCanopy'] },
  ceo: { text: "Deixe de ser 'faz-tudo' e torne-se o CEO da sua empresa de Hardscape", strong: ['CEO', 'Hardscape'],
    rows: ["Deixe de ser 'faz-tudo'", 'e torne-se o CEO', 'da sua empresa', 'de Hardscape'] },
  credibility: { text: 'Passe a credibilidade de uma grande empresa americana, mantendo a essência e a garra do empreendedor brasileiro.', strong: 'empresa americana',
    rows: ['Passe a credibilidade de uma', 'grande empresa americana,', 'mantendo a essência e a garra', 'do empreendedor brasileiro.'] },
  control: 'Deixe o caos para trás. Assuma o controle.',
  level: 'Nós elevamos o nível.',
  close: 'UpCanopy. Organização que gera crescimento.',
  enough: 'Nós existimos para dizer: chega.',
};

// Contact details and people printed in the case study.
export const CONTACT = {
  phone: '+1 (774) 360-7800', web: 'upcanopy.com', webCased: 'UpCanopy.com', sac: 'sac@UpCanopy.com',
  hello: 'hello@UpCanopy.com', handle: '@EdersonUpCanopy',  footer: '+1 (774) 360-7800 | upcanopy.com',
};
export const PEOPLE = {
  founder: { name: 'EDERSON DEVENS', role: 'CEO • FOUNDER', initials: 'ED' },   // business card
  badge: { name: 'Jhon Due', role: 'CEO', initials: 'JD' },                      // placeholder name on the badge
};
export const DOCUMENT = {
  title: 'Termo de Compliance e Conduta Ética', address: '123 Address St, City',
  labels: ['Contact', 'Telephone', 'Email', 'Signature'], invoice: ['Bank Account n°', 'Bank Detail', 'Total'],
};
export const SIGN = { home: 'HOME' };

// Project sheet printed on the page.
export const SHEET = [['Cliente', 'Ederson Devens'], ['Projeto', 'UpCanopy'], ['País', 'Estados Unidos'], ['Ano', '2026'], ['Escopo', 'Naming, branding e identidade visual'], ['Direção de arte e criação', 'Jonas Nicácio']];

// The five attribute scales (ten steps each; `chosen` is the green dot, counted from the left).
export const SCALES = [
  { left: 'TRADICIONAL', right: 'MODERNA', chosen: 8 },
  { left: 'CLÁSSICA', right: 'FUTURISTA', chosen: 7 },
  { left: 'NATURAL', right: 'URBANA', chosen: 9 },
  { left: 'CALMA', right: 'ENÉRGICA', chosen: 8 },
  { left: 'CONCEITUAL', right: 'DIRETA', chosen: 7 },
];
export const DIRECTION = { label: 'DIRECIONAMENTO VISUAL DEFINIDO', words: ['EXCLUSIVA', 'MODERNA', 'CONCEITUAL', 'ABSTRATA'] };

// Words the case study uses for what the brand does and stands for.
export const AREAS = ['CRM', 'Agenda', 'Financeiro'];              // "CRM, agenda e financeiro"
export const SECTORS = ['Landscape', 'Hardscape'];
export const PILLARS = ['Organização', 'Disciplina', 'Confiança'];
export const PERSONALITY = ['Séria e Confiável', 'Acolhedora e Empática'];
export const MODES = ['sobrevivência', 'expansão'];                // from "modo sobrevivência" to "modo expansão"
export const NAV_LINKS = [
  { label: 'CRM', id: 'lp-crm' },
  { label: 'Agenda', id: 'lp-agenda' },
  { label: 'Financeiro', id: 'lp-financeiro' },
  { label: 'Hardscape', id: 'lp-hardscape' },
];

// ---- The page's texts, verbatim, paragraph by paragraph ----
export const MANIFESTO = [
  "Nós conhecemos o valor do suor. Sabemos que o \"sonho americano\" não é dado; ele é construído. Tijolo por tijolo, jardim por jardim.",
  "Mas também sabemos de uma verdade dura: trabalhar muito não é o mesmo que crescer.",
  "Por muito tempo, o empreendedor de landscape e hardscape aceitou um fardo pesado: ser o primeiro a chegar na obra e o último a sair do escritório. Fazer orçamentos de madrugada. Perder o jantar com a família para organizar notas fiscais. Deixar o telefone tocar porque as mãos estavam ocupadas com a terra.",
  "Nós existimos para dizer: chega.",
  "A UpCanopy nasceu para ser a estrutura que faltava. Não somos apenas um escritório remoto. Somos a fundação invisível que sustenta o seu crescimento visível.",
  "Acreditamos que a informalidade é o teto que limita o seu potencial. Por isso, nossa obsessão é a Organização. Nossa linguagem é a Disciplina. Nossa promessa é a Confiança.",
  "Nós entendemos a sua cultura e falamos a sua língua — literalmente e nos negócios. Nós cuidamos da burocracia, da agenda e do dinheiro, para que você possa voltar a fazer o que faz de melhor: construir obras primas e liderar sua equipe.",
  "Nós elevamos o nível. Tiramos você do modo \"sobrevivência\" e o colocamos no modo \"expansão\".",
  "Deixe o caos para trás. Assuma o controle.",
  "UpCanopy. Organização que gera crescimento.",
];

export const INTRO = { title: "UpCanopy: Estratégia, Naming e Identidade Visual", text: "A UpCanopy nasceu com uma missão clara: profissionalizar empresas de landscape e hardscape lideradas por imigrantes brasileiros nos Estados Unidos. O projeto de branding foi desenvolvido para romper com a informalidade do setor, oferecendo uma solução robusta para o empreendedor que busca delegar a gestão de seu escritório, incluindo CRM, agenda e financeiro." };
export const CHALLENGE = { title: "O Desafio", text: "O maior objetivo era construir uma marca que transmitisse extrema segurança e autoridade. A identidade precisava ser culturalmente acolhedora para o público brasileiro, mas visualmente séria e sólida, rejeitando qualquer traço de fragilidade. O foco era convencer o cliente de que a organização é o pilar fundamental para a escalabilidade do negócio." };
export const STRATEGY = { title: "A Estratégia", text: "Sob a tagline Organização que gera crescimento, a estratégia de marca unificou o naming e a identidade visual em um ecossistema que equilibra empatia e rigor corporativo." };
export const NAMING = "Naming: O nome UpCanopy remete ao topo das árvores (canopy), simbolizando proteção, visão sistêmica e o potencial de elevação do negócio.";
export const VISUAL_IDENTITY = "Identidade Visual: Desenvolvida para projetar confiança imediata, a marca utiliza elementos que reforçam a estrutura e a estabilidade, fundamentais para quem gerencia o pilar financeiro e operacional de outras empresas.";

export const TONE = {
  title: "Tom de voz da marca",
  intro: [
  "A tonalidade \"Séria e Confiável\" atua como o alicerce da Personalidade da Marca UpCanopy, servindo como o contrapeso necessário à sua característica \"Acolhedora e Empática\".",
  "Segundo as fontes, essa escolha de tom não é estética, mas uma necessidade de sobrevivência do negócio no contexto da Identidade Corporativa:",
],
  points: [
    { title: "1. O Antídoto para a Informalidade", text: [
  "O cliente ideal (o landscaper imigrante) luta contra a desorganização e o amadorismo.",
  "• Ao adotar um tom sério, a UpCanopy se posiciona como a \"maturidade organizacional\" que falta ao cliente.",
  "• A marca rejeita explicitamente traços de \"modéstia, fragilidade ou insegurança\", pois precisa projetar a autoridade de quem vai colocar ordem na casa.",
] },
    { title: "2. A Moeda de Troca: Segurança", text: [
  "A fonte destaca que um dos desafios é a \"curva inicial de confiança do cliente\".",
  "• Como a UpCanopy lida com o financeiro e o CRM (o coração da empresa), a tonalidade confiável é obrigatória.",
  "• Visualmente, isso já foi traduzido na defesa do símbolo: o uso de \"linhas grossas e ângulos bem definidos\" foi escolhido especificamente para transmitir essa \"disciplina e autoridade\", evitando que a marca pareça frágil.",
] },
    { title: "3. O Equilíbrio com a Empatia", text: [
  "A \"Seriedade\" aqui refere-se aos processos e resultados, não ao atendimento humano.",
  "• A identidade busca ser \"Séria\" na execução (cumprir prazos, proteger dados), mas continua sendo \"Empática e Acolhedora\" no relacionamento. É o \"profissionalismo\" que não perde a conexão com a comunidade brasileira.",
] },
  ],
};

export const VALUES = {
  title: "Valores da marca",
  intro: [
  "Na UpCanopy, Disciplina e Confiança não são apenas palavras bonitas na parede; as fontes indicam que elas são os mecanismos de sobrevivência da marca, atuando como os pilares que sustentam a personalidade \"Séria e Confiável\".",
  "Aqui está como elas funcionam no contexto da identidade:",
],
  points: [
    { title: "1. Disciplina: O Motor Operacional (Interno)", text: [
  "A disciplina é a resposta direta ao \"caos operacional\" que o cliente vive.",
  "• A Função: Enquanto o cliente opera na improvisação (\"apagando incêndios\"), a marca impõe a Disciplina para criar rotinas e processos padronizados. É o rigor necessário para garantir que o \"escritório remoto estruturado\" funcione como um relógio,.",
  "• Na Identidade Visual: Esse valor foi traduzido visualmente na defesa do símbolo através de \"linhas grossas e ângulos bem definidos\", que comunicam autoridade e rejeitam a fragilidade.",
] },
    { title: "2. Confiança: A Ponte Relacional (Externo)", text: [
  "A confiança é a moeda de troca para o modelo de negócios funcionar.",
  "• O Desafio: As fontes citam a \"curva inicial de confiança\" como uma barreira crítica. O cliente (imigrante) precisa entregar o acesso ao seu financeiro e aos seus clientes a terceiros.",
  "• A Conexão: A personalidade da marca precisa transmitir segurança absoluta para superar o medo de golpes ou incompetência. É por isso que a marca se posiciona como \"acolhedora\" (para atrair) mas \"séria\" (para reter),.",
] },
  ],
  summary: { title: "Resumo da Dinâmica", text: [
  "• Disciplina garante a Eficiência (entrega do serviço).",
  "• Confiança garante a Adesão (venda e retenção).",
  "Juntas, elas formam a base da reputação da UpCanopy: uma empresa que cumpre o que promete (Disciplina) e protege quem a contrata (Confiança).",
] },
};
