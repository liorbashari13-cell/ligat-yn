import LegalLayout, { LegalSection } from './LegalLayout.jsx'

export default function AccessibilityPage() {
  return (
    <LegalLayout
      title="הצהרת נגישות"
      subtitle="בהתאם לתקן ישראלי 5568 (WCAG 2.1) | 21 ביוני 2026"
    >
      <LegalSection title="1. כללי">
        <p>
          עמותת &quot;יראנו ניסים&quot;, המפעילה את אתר ליגת הלב היהודי, פועלת להנגיש את
          האתר לאנשים עם מוגבלות, בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות
          (תשנ&quot;ח-1998) ותקן ישראלי 5568, המבוסס על הנחיות WCAG 2.1 ברמה AA.
        </p>
        <p>
          הצהרה זו משקפת את מצב הנגישות של האתר נכון לתאריך הרשום לעיל ותעודכן בהתאם
          לשינויים.
        </p>
      </LegalSection>

      <LegalSection title="2. תכונות נגישות קיימות">
        <p>האתר מיישם את תכונות הנגישות הבאות:</p>
        <ul className="ms-4 list-inside list-disc space-y-2">
          <li>
            <strong className="text-white/90">שפה וכיוון:</strong> האתר מוגדר במלואו
            לעברית עם כיוון RTL מלא (<code className="rounded bg-white/10 px-1 text-xs">lang=&quot;he&quot; dir=&quot;rtl&quot;</code>)
          </li>
          <li>
            <strong className="text-white/90">HTML סמנטי:</strong> שימוש באלמנטים
            מובנים — <code className="rounded bg-white/10 px-1 text-xs">&lt;header&gt;</code>,{' '}
            <code className="rounded bg-white/10 px-1 text-xs">&lt;nav&gt;</code>,{' '}
            <code className="rounded bg-white/10 px-1 text-xs">&lt;main&gt;</code>,{' '}
            <code className="rounded bg-white/10 px-1 text-xs">&lt;section&gt;</code>,{' '}
            <code className="rounded bg-white/10 px-1 text-xs">&lt;footer&gt;</code>
          </li>
          <li>
            <strong className="text-white/90">תיאורי תמונות:</strong> כל התמונות כוללות
            טקסט חלופי (<code className="rounded bg-white/10 px-1 text-xs">alt</code>)
          </li>
          <li>
            <strong className="text-white/90">תיאורי כפתורים:</strong> כפתורי פעולה וניווט
            כוללים תוויות{' '}
            <code className="rounded bg-white/10 px-1 text-xs">aria-label</code> ו-
            <code className="rounded bg-white/10 px-1 text-xs">aria-expanded</code>{' '}
            כנדרש
          </li>
          <li>
            <strong className="text-white/90">אייקונים דקורטיביים:</strong> אייקוני SVG
            שאינם נושאים מידע מוגדרים עם{' '}
            <code className="rounded bg-white/10 px-1 text-xs">aria-hidden=&quot;true&quot;</code>
          </li>
          <li>
            <strong className="text-white/90">ניווט מקלדת:</strong> ניתן לנווט בין
            אלמנטים אינטראקטיביים באמצעות מקלדת בלבד
          </li>
          <li>
            <strong className="text-white/90">תוויות טפסים:</strong> כל שדות טופס ההרשמה
            כוללים תוויות <code className="rounded bg-white/10 px-1 text-xs">&lt;label&gt;</code>{' '}
            מפורשות
          </li>
          <li>
            <strong className="text-white/90">גופן קריא:</strong> שימוש בגופן Heebo
            הרשמי, התומך בעברית ובטקסט ברמות גדלים שונות
          </li>
          <li>
            <strong className="text-white/90">כלי נגישות מובנה:</strong> האתר כולל
            ווידג&apos;ט נגישות צף (לחצן ♿ בפינת המסך) המאפשר הגדלת גודל הטקסט, הפעלת
            מצב ניגודיות גבוהה והשבתת אנימציות
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. מגבלות ידועות">
        <p>
          האתר נמצא בתהליך שיפור נגישות מתמשך. למרות מאמצינו, ייתכנו מגבלות בתחומים
          הבאים:
        </p>
        <ul className="ms-4 list-inside list-disc space-y-2">
          <li>
            ניגודיות צבעים של אלמנטים גרפיים מסוימים (כגון תוכן האנימציה בדף הבית)
            עשויה לא לעמוד במלוא דרישות WCAG 2.1 AA
          </li>
          <li>
            תוכן אנימטיבי (אנימציות כניסה, אפקטי ריצוד ועוד) עלול להפריע למשתמשים
            הרגישים לתנועה — ניתן להשביתו דרך כלי הנגישות
          </li>
          <li>
            חלק מהאלמנטים הגרפיים בסוגר הטורניר (Tournament Bracket) מיועדים בעיקר
            לתצוגה ויזואלית
          </li>
        </ul>
        <p>
          אנו עובדים על שיפורים נוספים ומקבלים בברכה פניות המסייעות לנו לזהות ולתקן
          בעיות נגישות.
        </p>
      </LegalSection>

      <LegalSection title="4. פנייה בנושא נגישות">
        <p>
          נתקלתם בבעיית נגישות באתר? ברצונכם לדווח על תקלה, לקבל את תוכן האתר בפורמט
          נגיש אחר, או לקבל סיוע? פנו אלינו:
        </p>
        <p className="font-semibold text-white/90">
          יהונתן ישרזדה
          <span className="mx-2 text-gold">·</span>
          <a href="tel:0523675724" className="ltr text-gold transition-colors hover:text-gold-light">
            052-367-5724
          </a>
        </p>
        <p className="text-white/60">בשם עמותת יראנו ניסים</p>
        <p className="mt-2 text-sm text-white/50">
          נשתדל להשיב לפניות נגישות בתוך 5 ימי עסקים.
        </p>
      </LegalSection>

      <LegalSection title="5. תאריך הצהרה זו">
        <p>הצהרת נגישות זו פורסמה ב-21 ביוני 2026.</p>
      </LegalSection>
    </LegalLayout>
  )
}
