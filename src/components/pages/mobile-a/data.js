// The nine screens of the mobile app (screens 10 to 18 belong to mobile-b).
// Names are plain English or the area names from the case study (CRM, Agenda, Financeiro).
export const SCREENS = [
  { n: 1, name: 'Home' },
  { n: 2, name: 'CRM list' },
  { n: 3, name: 'CRM record' },
  { n: 4, name: 'Agenda week' },
  { n: 5, name: 'Agenda day' },
  { n: 6, name: 'Financeiro ledger' },
  { n: 7, name: 'Invoice' },
  { n: 8, name: 'Modes' },
  { n: 9, name: 'Brand' },
];

export const pad2 = (n) => String(n).padStart(2, '0');

// Screen indexes the area bar jumps to.
export const AREA_SCREEN = { CRM: 2, Agenda: 4, Financeiro: 6 };

// Plain English stage names for the CRM list (stages are not named in the case study).
export const STAGES = ['New', 'In progress', 'Done'];

// Weekday abbreviations and the hour axis.
export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
