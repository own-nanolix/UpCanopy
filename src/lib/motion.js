// Easing and duration tokens. The same values are CSS variables in app/globals.css (--ease-*, --dur-*).
// Use these with framer-motion; never use default easings.
// Personality: steady, upward, exact. Things rise into place and lock.
export const ease = {
  out: [0.16, 1, 0.3, 1],        // rising into place
  inOut: [0.7, 0, 0.3, 1],       // moves between states
  draw: [0.45, 0, 0.15, 1],      // arcs and the frond sweeping
  lock: [0.2, 1.2, 0.4, 1],      // the last pixels of a piece locking in
};

export const dur = { d1: 0.12, d2: 0.24, d3: 0.48, d4: 0.8, d5: 1.4 };
export const stagger = 0.045;

// Shared transitions
export const tEnter = { duration: dur.d3, ease: ease.out };
export const tMove = { duration: dur.d2, ease: ease.inOut };
export const tChart = { duration: dur.d4, ease: ease.out };
export const tDraw = { duration: dur.d5, ease: ease.draw };
export const tLock = { duration: dur.d3, ease: ease.lock };

// Variants for a list that enters one by one: <motion.ul variants={listV} initial="hidden" animate="show">
export const listV = { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: 0.06 } } };
export const itemV = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: tEnter } };
export const fadeV = { hidden: { opacity: 0 }, show: { opacity: 1, transition: tEnter } };
