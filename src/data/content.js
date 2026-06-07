// ── Static page content ─────────────────────────────────────────────

// Premier League players the teams will meet. Images are placeholders for
// now — see Players.jsx (// Replace placeholder with real image…).
export const PLAYERS = [
  { name: 'עומר אצילי' },
  { name: 'אלמוג כהן' },
  { name: 'חן עזרא' },
  { name: 'שיר צדק' },
  { name: 'איתן אוזלאי' },
  { name: 'רמי גרשון' },
  { name: 'ירין לוי' },
]

// "?מה מחכה לכם" — three feature cards.
export const ABOUT_CARDS = [
  {
    icon: '🏆',
    title: 'טורניר אמיתי',
    text: 'פורמט ליגת אלופות, קבוצות של 8 שחקנים',
  },
  {
    icon: '⚽',
    title: 'תשחקו מול הכוכבים',
    text: 'הזוכים ישחקו מול שחקני ליגת העל',
  },
  {
    icon: '🎁',
    title: 'פרסים מטורפים',
    text: 'פרסים אישיים לכל משתתף ופרסים מיוחדים לזוכים',
  },
]

// Tournament timeline (revealed on scroll with GSAP).
export const TIMELINE = [
  { step: '1', title: 'הרשמה', text: 'רישום הקבוצות נפתח — 19 מקומות בלבד' },
  { step: '2', title: 'שלב הבתים', text: 'פורמט ליגת אלופות — משחקים מול כל הקבוצות בבית' },
  { step: '3', title: 'נוקאאוט', text: 'רבע גמר, חצי גמר וגמר תחת זרקורים' },
  { step: '4', title: 'הגמר הגדול', text: 'הזוכים עולים לשחק מול כוכבי ליגת העל' },
]
