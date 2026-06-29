// ── Static page content ─────────────────────────────────────────────

// Stars the teams will meet. Photos live in public/players/.
// Row 1 (RTL): דולב חזיזה | אלמוג כהן | רמי גרשון | אייל גולאסה
// Row 2 (RTL): איתן אזולאי | טל בן חיים | חן עזרא
export const PLAYERS = [
  { name: 'דולב חזיזה', role: 'שחקן מכבי חיפה ונבחרת ישראל', image: '/players/dolev-haziza.png' },
  { name: 'אלמוג כהן', role: 'מאמן בית"ר ירושלים', image: '/players/almog-cohen.jpeg' },
  { name: 'רמי גרשון', role: 'שחקן עבר', image: '/players/rami-gershon.jpg' },
  { name: 'אייל גולאסה', role: 'שחקן עבר', image: '/players/eyal-golasa.webp' },
  { name: 'איתן אזולאי', role: 'שחקן מכבי חיפה ונבחרת ישראל', image: '/players/itan-azulay.jpg' },
  { name: 'טל בן חיים', role: 'שחקן עבר', image: '/players/tal-ben-haim.jpg' },
  { name: 'חן עזרא', role: 'שחקן עבר', image: '/players/chen-ezra.png' },
]

// "מה מחכה לכם" — prize cards. `icon` keys map to PRIZE_ICONS in About.jsx.
export const ABOUT_CARDS = [
  {
    icon: 'star',
    title: 'משחק ראווה',
    text: 'מול שחקני ליגת העל ונבחרת ישראל!',
  },
  {
    icon: 'shoe',
    title: 'חליפת כדורגל אישית',
    text: 'לכל שחקן!',
  },
  {
    icon: 'shirt',
    title: 'חולצות שחקן',
    text: 'של כוכבי הכדורגל - עומר אצילי ועוד',
  },
  {
    icon: 'money',
    title: 'פרס כספי בשווי ₪25,000',
    text: 'במקום הגיפטקארדים',
  },
]
