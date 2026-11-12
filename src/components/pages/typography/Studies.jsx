import Art from '@/components/art/Art';
import { MarkG, WordmarkG, WordmarkVerticalG } from '@/components/art/Mark';
import { HEX, LINES, DESCRIPTOR, DIRECTION, CONTACT, PEOPLE, BRAND } from '@/lib/brand';
import { METRICS } from './type-data';

const WIDE = { fontFamily: 'var(--font-wide)' };

// Split a line before its last word: the designer sets everything light and closes on one bold word.
function closeOf(text) {
  const i = text.trimEnd().lastIndexOf(' ');
  return [text.slice(0, i + 1), text.slice(i + 1)];
}

function Tag({ x, y, children, fill = HEX.green, anchor }) {
  return <text x={x} y={y} fontSize="12" fontWeight="500" letterSpacing="1.4" fill={fill} textAnchor={anchor} className="wide" style={WIDE}>{children}</text>;
}

// The line habit: light type, the last word bold (and Green Park on a dark ground). Three real brand lines.
const HABIT_LINES = [LINES.level, LINES.enough, LINES.close];
export function HabitLines() {
  return (
    <Art viewBox="0 0 1200 560" title="The line habit: three brand lines set in Light 300 with the last word in Bold 700 Green Park" exportName="typography-habit-lines">
      <rect width="1200" height="560" fill={HEX.navy} />
      <Tag x="40" y="52">LIGHT 300, THEN ONE BOLD 700 WORD</Tag>
      {HABIT_LINES.map((line, i) => {
        const [lead, tail] = closeOf(line);
        const y = 170 + i * 150;
        return (
          <g key={line} className="slide-up" style={{ '--i': i * 2 }}>
            <path d={`M40 ${y - 74}H1160`} stroke={HEX.white} strokeOpacity="0.25" />
            <Tag x="40" y={y - 44} fill={HEX.navyMuted}>{`LINE 0${i + 1}`}</Tag>
            <text x="40" y={y + 10} fontSize="50" lang="pt-BR" fill={HEX.mint}>
              <tspan fontWeight="300">{lead}</tspan>
              <tspan fontWeight="700" fill={HEX.green}>{tail}</tspan>
            </text>
            <Tag x="1160" y={y - 44} fill={HEX.navyMuted} anchor="end">{`300 / 700 · ${lead.trim().split(' ').length} + 1 WORDS`}</Tag>
          </g>
        );
      })}
    </Art>
  );
}

// Tracking and case habits on the descriptor, one row per tracking value. The chosen values are marked.
const TRACKS = [
  [0, 'WORD-MARK SETTING', false],
  [0.04, 'DESCRIPTOR UNDER THE LOGO', true],
  [0.06, 't-caps-lg', true],
  [0.08, 't-caps', true],
  [0.16, 'TOO OPEN FOR A LABEL', false],
];
export function Tracking() {
  return (
    <Art viewBox="0 0 1200 640" title="Letter-spacing study: the descriptor in logotype voice caps at five tracking values, with the values used by the brand marked" exportName="typography-tracking">
      <rect width="1200" height="640" fill={HEX.white} />
      <Tag x="40" y="48" fill={HEX.greenInk}>WIDE CAPS · TRACKING IN EM</Tag>
      {TRACKS.map(([em, name, used], i) => {
        const y = 130 + i * 78;
        return (
          <g key={em} className="grow-x" style={{ '--i': i * 2 }}>
            <path d={`M40 ${y - 40}H1160`} stroke={HEX.navy} strokeOpacity="0.15" />
            <text x="40" y={y + 4} fontSize="30" fontWeight="500" fill={HEX.navy} className="wide" style={WIDE} letterSpacing={em * 30}>{em.toFixed(2)}</text>
            <text x="250" y={y + 6} fontSize="32" fontWeight="500" fill={HEX.navy} className="wide" style={WIDE} letterSpacing={em * 32}>{DESCRIPTOR}</text>
            <text x="1160" y={y - 6} fontSize="11" fontWeight="500" letterSpacing="1.2" textAnchor="end" fill={used ? HEX.greenInk : HEX.muted} className="wide" style={WIDE}>{name}</text>
            {used ? <rect x="1148" y={y + 4} width="12" height="12" fill={HEX.green} /> : null}
          </g>
        );
      })}
      <path d="M40 520H1160" stroke={HEX.navy} strokeWidth="2" />
      <Tag x="40" y="560" fill={HEX.greenInk}>SENTENCE CASE FOR LINES, CAPS FOR LABELS</Tag>
      <text x="40" y="610" fontSize="34" fontWeight="300" fill={HEX.navy} lang="pt-BR">{LINES.level}</text>
      <text x="1160" y="610" fontSize="20" fontWeight="600" letterSpacing="1.4" textAnchor="end" fill={HEX.navy} className="wide" style={WIDE} lang="pt-BR">{DIRECTION.words.slice(0, 2).join(' • ')}</text>
    </Art>
  );
}

// The vertical word-mark: rotated -90 deg about its bottom-left corner, so it reads from the bottom to the top.
export function VerticalStudy() {
  const S = 135; // size of the study
  const X = 90;  // left edge of the column
  const guides = [
    ['cap', X + S * (0.76 - METRICS.wide.cap), 'Cap line'],
    ['x', X + S * (0.76 - METRICS.wide.x), 'x-line'],
    ['base', X + S * 0.76, 'Baseline'],
    ['desc', X + S * (0.76 + METRICS.wide.desc), 'Descender'],
  ];
  return (
    <Art viewBox="0 0 1200 1000" title="Vertical word-mark study: UpCanopy rotated 90 degrees to read from bottom to top, with its cap line, x-line, baseline and descender, and the same word cropped by an edge" exportName="typography-vertical-study">
      <defs>
        <clipPath id="typography-vertical-clip"><rect x="700" y="40" width="460" height="560" /></clipPath>
      </defs>
      <rect width="1200" height="1000" fill={HEX.mint} />
      <rect x="40" y="40" width="580" height="920" fill={HEX.white} />
      <g className="slide-up"><WordmarkVerticalG x={X} y={950} size={S} fill={HEX.navy} /></g>
      {guides.map(([k, x, label], i) => (
        <g key={k} className="fade-in" style={{ '--i': i * 3 }}>
          <path d={`M${x} 50V950`} stroke={k === 'base' ? HEX.navy : HEX.greenInk} strokeWidth="2" strokeDasharray={k === 'base' ? undefined : '10 7'} />
          <text x={x + 6} y="72" fontSize="12" fontWeight="500" fill={HEX.greenInk} transform={`rotate(90 ${x + 6} 72)`}>{label}</text>
        </g>
      ))}
      <path d="M380 900V420" stroke={HEX.navy} strokeWidth="3" />
      <path d="M380 400L362 440H398Z" fill={HEX.navy} />
      <Tag x="410" y="660" fill={HEX.greenInk}>BOTTOM TO TOP</Tag>
      <text x="410" y="692" fontSize="18" fill={HEX.navy}>Rotated −90° about</text>
      <text x="410" y="716" fontSize="18" fill={HEX.navy}>the bottom-left corner.</text>
      <text x="410" y="740" fontSize="18" fill={HEX.navy}>Letter tops face left.</text>

      <g clipPath="url(#typography-vertical-clip)">
        <rect x="700" y="40" width="460" height="560" fill={HEX.navy} />
        <g className="slide-up"><WordmarkVerticalG x={738} y={690} size={330} fill={HEX.white} /></g>
      </g>
      <Tag x="700" y="630" fill={HEX.greenInk}>CROPPED BY THE EDGE, AS ON THE LETTER</Tag>
      <text x="700" y="660" fontSize="19" fill={HEX.navy}>{`${BRAND} at size 330, cut by the frame.`}</text>

      <path d="M700 724H1160" stroke={HEX.navy} strokeOpacity="0.2" />
      <Tag x="700" y="764" fill={HEX.greenInk}>HORIZONTAL SETTING, THEN TURNED</Tag>
      <WordmarkG x={700} y={830} size={56} fill={HEX.navy} />
      <path d="M700 854H1040" stroke={HEX.navy} strokeWidth="2" />
      <path d="M1040 854L1022 844V864Z" fill={HEX.navy} />
      <text x="700" y="890" fontSize="19" fill={HEX.navy}>{`Size ${S}: the word runs about 6.1 x its size,`}</text>
      <text x="700" y="916" fontSize="19" fill={HEX.navy}>{`so the column is about ${Math.round(S * 6.1)} units tall.`}</text>
    </Art>
  );
}

// Card back (m23): green, small dark type. Rows are [x, baseline, size, weight, text].
const CARD = { x: 40, y: 40, w: 700, h: 400 };
const CARD_NOTES = [
  [94, 70, 'WORD-MARK', ['Logotype voice Medium 500,', 'top right']],
  [125, 160, 'NAME AND ROLE', ['Bold 700 first name, Regular 400', 'surname and role']],
  [222, 250, 'CONTACT BLOCK', ['Regular 400, one line each,', 'line pitch 24 units']],
  [318, 350, 'ADDRESS', ['Two lines, set apart']],
  [390, 440, 'WEB ADDRESS', ['Bold 700, closes the card']],
];
// As printed on m23: the first name bold, the surname regular; the address lines are quiet placeholder bars.
const NAME = PEOPLE.founder.name.split(' ');
export function CardStudy() {
  const TX = CARD.x + 48;
  const rows = [
    [TX, 112, 20, 700, NAME[0], NAME.slice(1).join(' ')],
    [TX, 138, 16, 400, PEOPLE.founder.role],
    [TX, 198, 16, 400, CONTACT.handle],
    [TX, 222, 16, 400, CONTACT.phone],
    [TX, 246, 16, 400, CONTACT.hello],
    [TX, 390, 16, 700, CONTACT.webCased],
  ];
  return (
    <Art viewBox="0 0 1280 960" title="Business card rebuilt: green back with name, role, contacts, address and web address in small dark type and the word-mark top right; navy front with the mark; type roles noted" exportName="typography-card">
      <rect width="1280" height="960" fill={HEX.slide} />
      <rect x={CARD.x} y={CARD.y} width={CARD.w} height={CARD.h} fill={HEX.green} />
      <g className="slide-up">
        <WordmarkG x={CARD.x + CARD.w - 48} y={100} size={20} fill={HEX.mint} anchor="end" />
        {rows.map(([x, y, size, w, t, rest]) => (
          <text key={t} x={x} y={y} fontSize={size} fontWeight={w} fill={HEX.greenDark}>
            {t}
            {rest ? <tspan fontWeight="400">{` ${rest}`}</tspan> : null}
          </text>
        ))}
        <rect x={TX} y={293} width={230} height={16} rx={2} fill={HEX.greenDark} opacity="0.16" />
        <rect x={TX} y={317} width={170} height={16} rx={2} fill={HEX.greenDark} opacity="0.16" />
      </g>
      <rect x={CARD.x} y="500" width={CARD.w} height={CARD.h} fill={HEX.navy} />
      <g className="lock"><MarkG x={CARD.x + 285} y={620} size={130} fill={HEX.green} /></g>
      <Tag x={CARD.x} y="480" fill={HEX.greenInk}>FRONT</Tag>
      <Tag x={CARD.x} y="30" fill={HEX.greenInk}>BACK</Tag>
      {CARD_NOTES.map(([py, ny, head, lines], i) => (
        <g key={head} className="fade-in" style={{ '--i': i * 3 }}>
          <path d={`M${CARD.x + 680} ${py}H756L780 ${ny}H800`} fill="none" stroke={HEX.navy} strokeWidth="2" />
          <circle cx={CARD.x + 680} cy={py} r="5" fill={HEX.green} stroke={HEX.navy} strokeWidth="2" />
          <text x="812" y={ny + 5} fontSize="16" fontWeight="500" letterSpacing="1.2" fill={HEX.greenInk} className="wide" style={WIDE}>{head}</text>
          {lines.map((l, k) => <text key={l} x="812" y={ny + 32 + k * 26} fontSize="20" fill={HEX.navy}>{l}</text>)}
        </g>
      ))}
      <g className="fade-in" style={{ '--i': 18 }}>
        <path d="M740 700H800" stroke={HEX.navy} strokeWidth="2" />
        <Tag x="812" y="705" fill={HEX.greenInk}>MARK ONLY</Tag>
        <text x="812" y="737" fontSize="20" fill={HEX.navy}>The front carries no type: the</text>
        <text x="812" y="763" fontSize="20" fill={HEX.navy}>mark alone, Green Park on navy.</text>
      </g>
    </Art>
  );
}
