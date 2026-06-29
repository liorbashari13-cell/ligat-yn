const SHEET_ID = '1HVReujh4o6HUwwmiqyG4YQYVUo7EOr2J8hmM5YuL6bw';
const SENDER_EMAIL = 'ligat.yn@gmail.com';
const MAX_TEAMS = 16;
const ALERT_AT = 15;

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();

  const currentCount = sheet.getLastRow() - 1;
  if (currentCount >= MAX_TEAMS) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: 'הרישום הסתיים' })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  sheet.appendRow([
    new Date(),
    data.teamName,
    data.contactName,
    data.phone,
    data.email,
    data.school,
    data.grade,
    data.city,
    data.neighborhood || '',
    // players: [{ fullName, age, school, grade, phone, idNumber, email }, ...]
    JSON.stringify(data.players),
    currentCount + 1
  ]);

  MailApp.sendEmail({
    to: data.email,
    subject: '✅ הקבוצה שלך נרשמה לליגת הלב היהודי!',
    htmlBody: `
      <div dir="rtl" style="font-family: Arial; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a2a5e;">!ברוכים הבאים לליגת הלב היהודי 🏆</h2>
        <p>שלום ${data.contactName},</p>
        <p>הקבוצה <strong>${data.teamName}</strong> נרשמה בהצלחה!</p>
        <h3>:פרטי הרישום</h3>
        <ul>
          <li>שם הקבוצה: ${data.teamName}</li>
          <li>בית ספר: ${data.school}</li>
          <li>שכבה: ${data.grade}</li>
          <li>מספר שחקנים: ${data.players.length}</li>
        </ul>
        <p><strong>תאריך תחילת הליגה: 4.7.2026</strong></p>
        <p><strong>מיקום: איצטדיון טוברוק, נתניה</strong></p>
        <p>.נציג שלנו יצור איתך קשר בקרוב עם פרטים נוספים</p>
        <p>!בהצלחה 🎯</p>
        <hr/>
        <p style="color: #888; font-size: 12px;">ליגת הלב היהודי | ligat.yn@gmail.com</p>
      </div>
    `
  });

  if (currentCount + 1 === ALERT_AT) {
    MailApp.sendEmail({
      to: SENDER_EMAIL,
      subject: '⚠️ התראה: הגענו ל-120 משתתפים!',
      body: `נרשמו ${ALERT_AT} קבוצות (${ALERT_AT * 8} משתתפים). שקול להגדיל את המכסה.`
    });
  }

  return ContentService.createTextOutput(
    JSON.stringify({ success: true, teamNumber: currentCount + 1 })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
  const count = Math.max(0, sheet.getLastRow() - 1);
  return ContentService.createTextOutput(
    JSON.stringify({ count, max: MAX_TEAMS })
  ).setMimeType(ContentService.MimeType.JSON);
}
