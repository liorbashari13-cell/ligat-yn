// ── Static page content ─────────────────────────────────────────────

// Stars the teams will meet. Photos live in public/players/.
// Row 1 (RTL): דולב חזיזה | אלמוג כהן | רמי גרשון
// Row 2 (RTL): אייל גולאסה | איתן אזולאי | טל בן חיים
export const PLAYERS = [
  { name: 'דולב חזיזה', role: 'שחקן מכבי חיפה ונבחרת ישראל', image: '/players/dolev-haziza.png' },
  { name: 'אלמוג כהן', role: 'מאמן בית"ר ירושלים', image: '/players/almog-cohen.jpeg' },
  { name: 'רמי גרשון', role: 'שחקן עבר', image: '/players/rami-gershon.jpg' },
  { name: 'אייל גולאסה', role: 'שחקן עבר', image: '/players/eyal-golasa.webp' },
  { name: 'איתן אזולאי', role: 'שחקן מכבי חיפה ונבחרת ישראל', image: '/players/itan-azulay.jpg' },
  { name: 'טל בן חיים', role: 'שחקן עבר', image: '/players/tal-ben-haim.jpg' },
]

// "מה מחכה לכם" — prize cards. `icon` keys map to PRIZE_ICONS in About.jsx.
export const ABOUT_CARDS = [
  {
    icon: 'gift',
    title: 'גיפט קארדים',
    text: 'בשווי אלפי שקלים לזוכים',
  },
  {
    icon: 'shirt',
    title: 'חולצות כוכבי הכדורגל',
    text: 'לכל משתתף',
  },
  {
    icon: 'shoe',
    title: 'חליפת אדידס אישית',
    text: 'חליפת כדורגל מבית אדידס לכל שחקן',
  },
  {
    icon: 'star',
    title: 'משחק מול כוכבים',
    text: 'מול שחקני ליגת העל ונבחרת ישראל',
  },
]
