import LegalLayout, { LegalSection } from './LegalLayout.jsx'

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="מדיניות פרטיות"
      subtitle='עמותת "יראנו ניסים" — ליגת הלב היהודי | עדכון אחרון: יוני 2026'
    >
      <LegalSection title="1. כללי">
        <p>
          מדיניות פרטיות זו מסבירה כיצד עמותת &quot;יראנו ניסים&quot; (להלן: &quot;העמותה&quot;), מנהלת ליגת הלב
          היהודי, אוספת, מאחסנת ומשתמשת במידע שנמסר במסגרת הרישום לטורניר.
        </p>
        <p>
          השימוש באתר ובטופס ההרשמה מהווה הסכמה לאיסוף ולשימוש במידע כמפורט להלן.
        </p>
      </LegalSection>

      <LegalSection title="2. המידע שנאסף">
        <p>במסגרת תהליך ההרשמה לליגה אנו אוספים את הפרטים הבאים:</p>
        <p className="font-semibold text-white/90">פרטי הנציג (שחקן מספר 1 בקבוצה):</p>
        <ul className="ms-4 list-inside list-disc space-y-1">
          <li>שם הקבוצה</li>
          <li>שם מלא של הנציג</li>
          <li>מספר טלפון וכתובת דוא&quot;ל</li>
          <li>בית ספר, שכבה, עיר מגורים ושכונה</li>
          <li>תעודת זהות</li>
        </ul>
        <p className="font-semibold text-white/90">פרטי שאר השחקנים (שחקנים 2–10):</p>
        <ul className="ms-4 list-inside list-disc space-y-1">
          <li>שם מלא וגיל</li>
          <li>בית ספר ושכבה</li>
          <li>מספר טלפון וכתובת דוא&quot;ל</li>
          <li>תעודת זהות</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. מטרות השימוש במידע">
        <p>המידע שנאסף משמש אך ורק לצרכים הבאים:</p>
        <ul className="ms-4 list-inside list-disc space-y-1">
          <li>ניהול הרישום לטורניר וסידורי המשחקים</li>
          <li>יצירת קשר עם נציגי הקבוצות בנושאים הקשורים לליגה</li>
          <li>שליחת אישור רישום אוטומטי לכתובת הדוא&quot;ל של הנציג</li>
          <li>זיהוי המשתתפים ואימות פרטיהם במהלך הטורניר</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. אחסון ועיבוד המידע">
        <p>
          הנתונים מאוחסנים ב-Google Sheets ומעובדים דרך פלטפורמת Make.com לצורך אוטומציה
          ושליחת אישורי הרשמה. הנתונים מוצפנים בתעבורה ומוגנים על ידי מנגנוני האבטחה
          המובנים בשירותים האלה.
        </p>
        <p>
          הנתונים אינם נמכרים ואינם משותפים עם גורמים חיצוניים שאינם קשורים ישירות לניהול
          הטורניר.
        </p>
      </LegalSection>

      <LegalSection title="5. גישה למידע">
        <p>
          הגישה למידע המאוחסן מוגבלת לצוות ניהול הטורניר של עמותת יראנו ניסים בלבד. לא
          יועברו פרטים אישיים לצדדים שלישיים ללא הסכמת הנרשם, למעט במקרים הנדרשים על פי דין.
        </p>
      </LegalSection>

      <LegalSection title="6. שמירת המידע">
        <p>
          המידע יישמר לאורך תקופת הטורניר ולתקופה סבירה לאחריה לצרכי תיעוד ורישום. לאחר
          מכן יימחק המידע ממאגרי הנתונים.
        </p>
      </LegalSection>

      <LegalSection title="7. משתתפים קטינים">
        <p>
          ליגת הלב היהודי מיועדת לבני נוער בגילאי 15–21. טופס ההרשמה הדיגיטלי מאסף פרטים
          ראשוניים לצורך שריון מקום בלבד. <strong className="text-white">הרישום הסופי אינו
          מושלם דרך האתר.</strong>
        </p>
        <p>
          החתימה על תקנון הליגה והצהרת הבריאות, הנדרשים להשתתפות בטורניר, מתבצעת פיזית
          בפגישה עם נציג העמותה, בנוכחות הורה או אפוטרופוס חוקי.
        </p>
      </LegalSection>

      <LegalSection title="8. זכויות המשתמש">
        <p>כל גורם שפרטיו נמסרו רשאי לפנות אלינו לצורך:</p>
        <ul className="ms-4 list-inside list-disc space-y-1">
          <li>קבלת מידע על הנתונים המוחזקים אודותיו</li>
          <li>תיקון או עדכון פרטים שגויים</li>
          <li>בקשת מחיקת הנתונים</li>
        </ul>
      </LegalSection>

      <LegalSection title="9. יצירת קשר">
        <p>לכל שאלה, פנייה או בקשה בנושאי פרטיות:</p>
        <p className="font-semibold text-white/90">
          יהונתן ישרזדה
          <span className="mx-2 text-gold">·</span>
          <a href="tel:0523675724" className="ltr text-gold transition-colors hover:text-gold-light">
            052-367-5724
          </a>
        </p>
        <p className="text-white/60">בשם עמותת יראנו ניסים</p>
      </LegalSection>
    </LegalLayout>
  )
}
