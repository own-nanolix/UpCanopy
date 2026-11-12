import { still } from '@/lib/site';

// A transition from the shared tokens. With reduced motion (or export mode) it jumps to the end state.
export const tr = (duration, ease, delay = 0) => (still() ? { duration: 0 } : { duration, ease, delay });
