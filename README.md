# Ashley & Mike — Wedding Invitation

A single-page, frontend-only wedding invitation website built with **Vite + React + Tailwind CSS**. RSVP submissions go straight to a **Google Sheet** via a Google Apps Script Web App — no backend, no database, no server.

---

## Run it locally

```bash
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173).

Build a production bundle:

```bash
npm run build      # outputs static files to dist/
npm run preview    # preview the built bundle locally
```

---

## Edit the content

**Everything the couple edits lives in one file: [`src/config.js`](src/config.js).**
Names, date, venue, the schedule, location links, and the RSVP endpoint — all there. You never need to touch the JSX.

---

## Replace the hero image

Overwrite **`src/assets/hero.jpg`** with the couple's own photo (keep the same filename). That single file is the only swap point. A warm gradient sits behind it as a fallback, so the layout never looks broken while you wait for the real photo.

---

## Wire up RSVP → Google Sheets

RSVPs are appended as rows to a Google Sheet you own. Set it up once:

1. **Create a new Google Sheet.** Add a header row in the first sheet:

   | Timestamp | Name | Guests | Attending | Message |
   | --------- | ---- | ------ | --------- | ------- |

2. In the Sheet, go to **Extensions → Apps Script** and paste this code (replace anything already there):

   ```js
   function doPost(e) {
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
     const p = e.parameter;
     sheet.appendRow([
       new Date(),
       p.name || "",
       p.guests || "",
       p.attending || "",
       p.message || ""
     ]);
     return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

3. **Deploy → New deployment → type "Web app"**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**, authorize, and **copy the Web App URL**.

4. Paste that URL into `src/config.js`:

   ```js
   rsvpEndpoint: "https://script.google.com/macros/s/.../exec",
   ```

5. Done. Every RSVP now appends a row to your Sheet, viewable anytime.

> **Note:** Until you paste a real URL, the RSVP form still works and validates, but submitting shows a friendly error instead of a confirmation. The frontend sends form fields named `name`, `guests`, `attending`, `message` — these must match the Apps Script (they do above).

---

## Deploy (static host)

The build output in `dist/` is plain static files — host it anywhere.

**Vercel**
- Import the repo, or run `npm i -g vercel && vercel`.
- Framework preset: **Vite**. Build command `npm run build`, output dir `dist`.

**Netlify**
- New site from Git → Build command `npm run build`, publish directory `dist`.
- Or drag-and-drop the `dist/` folder into the Netlify dashboard.

**GitHub Pages**
- `npm run build`, then publish the `dist/` folder (e.g. with the `gh-pages` package). If serving from a subpath, set Vite's `base` in `vite.config.js` accordingly.

---

## Project structure

```
├── index.html                 # Google Fonts <link>
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx                # composes all sections
│   ├── index.css              # tailwind directives + base styles
│   ├── config.js              # ⭐ ALL editable content
│   ├── assets/hero.jpg        # swappable placeholder hero image
│   └── components/
│       ├── Hero.jsx
│       ├── Invitation.jsx
│       ├── BigDay.jsx
│       ├── Location.jsx
│       ├── Rsvp.jsx
│       ├── Footer.jsx
│       ├── Reveal.jsx         # scroll-into-view fade (respects reduced motion)
│       └── icons.jsx          # line-art schedule icons
└── README.md
```
