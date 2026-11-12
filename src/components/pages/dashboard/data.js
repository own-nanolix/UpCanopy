import { AREAS } from '@/lib/brand';

// Structure only: rows, slots and lines are placeholders. Nothing here is a client, amount or appointment.
export const STAGES = ['New', 'In progress', 'Done'];
export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const pad = (n) => String(n).padStart(2, '0');
export const HOURS = Array.from({ length: 10 }, (_, i) => `${pad(8 + i)}:00`);
const START = [0, 1, 2, 1, 0, 2, 1, 0, 2, 0, 1, 2];
export const ROWS = Array.from({ length: 12 }, (_, i) => ({ id: i + 1, area: AREAS[i % 3] }));
// [day, first hour row, hours]
export const SLOTS = [[0, 1, 2], [0, 5, 1], [1, 0, 1], [1, 3, 2], [2, 2, 2], [3, 1, 1], [3, 6, 1], [4, 4, 3], [5, 2, 1], [6, 0, 1]]
  .map(([d, h, n], i) => ({ id: i + 1, d, h, n }));
export const LINES_N = 6;
export const slotTime = (sl) => `${DAYS[sl.d]} ${HOURS[sl.h]}–${pad(8 + sl.h + sl.n)}:00`;
export const countBy = (area) => ROWS.filter((r) => r.area === area).length;

export const initialBoard = {
  stages: START.map((i) => STAGES[i]), q: '', f: 'All', area: 'All', key: 'id', dir: 1, slot: 1, rail: 1, range: 'Week',
};

// Rows after the shared filter, search and sort.
export function visible(b, ignoreStage = false) {
  const q = b.q.trim().toLowerCase();
  const rows = ROWS.map((r) => ({ ...r, stage: b.stages[r.id - 1] })).filter((r) =>
    (ignoreStage || b.f === 'All' || r.stage === b.f) && (b.area === 'All' || r.area === b.area)
    && (!q || `client ${pad(r.id)} ${r.area} ${r.stage}`.toLowerCase().includes(q)));
  const k = b.key === 'client' ? 'id' : b.key;
  return rows.sort((a, c) => (k === 'id' ? a.id - c.id : String(a[k]).localeCompare(String(c[k])) || a.id - c.id) * b.dir);
}

export const nextSort = (b, key) => (b.key === key ? { dir: -b.dir } : { key, dir: 1 });
