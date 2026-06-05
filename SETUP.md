# Google Apps Script Setup

1. Go to script.google.com
2. Create new project
3. Paste the contents of Code.gs
4. Click Deploy → New Deployment → Web App
5. Execute as: Me
6. Who has access: Anyone
7. Copy the Web App URL
8. Paste it in .env as VITE_APPS_SCRIPT_URL

After updating `.env`, restart the dev server (`npm run dev`) so Vite picks up the new value.
