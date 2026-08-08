# Wedding Invitation Website — Build Spec

> **Instructions for Claude Code:** Read this file fully, then scaffold and build the project described below. This is a **frontend-only** project. Do **not** add a backend, Docker, PostgreSQL, or any server — RSVP submissions go directly to a **Google Sheet** via a Google Apps Script Web App. Build the whole thing, install dependencies, and make sure `npm run dev` works.

---

## 1. What we're building

A single-page wedding invitation website for **Ashley & Mike** (the couple's names and details are placeholders — see the config section, they must be trivially editable in one file).

The page is a scrolling landing page. No routing, no login, no registration. Guests arrive from an email that shows a hero image, scroll through the story, see the schedule ("The Big Day"), find location links, and submit an **RSVP** form. The RSVP writes to a Google Sheet the owner can open and read.

Reference aesthetic: warm, cinematic mountain-elopement photography with elegant high-contrast serif typography, sepia/cream tones, lots of whitespace, editorial magazine feel. Think fine-art wedding invitation, not a SaaS landing page.

---

## 2. Tech stack (use exactly this)

- **Vite + React** (JavaScript, not TypeScript unless trivial)
- **Tailwind CSS** for all styling
- No backend. No database. No Docker.
- RSVP submission → **Google Apps Script Web App** endpoint (a single `fetch` POST), which appends a row to a Google Sheet.
- Deploy target: static host (Vercel / Netlify / GitHub Pages). Make sure `npm run build` produces a clean static bundle.

Keep dependencies minimal. Allowed extras only if genuinely useful: a font loader is not needed (use Google Fonts via `<link>` in `index.html`).

---

## 3. Project structure

```
wedding/
├── index.html                 # includes Google Fonts <link>
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx                # composes all sections
│   ├── index.css              # tailwind directives + base styles
│   ├── config.js             # ⭐ ALL editable content lives here
│   ├── assets/
│   │   └── hero.jpg          # placeholder hero image (see §7)
│   └── components/
│       ├── Hero.jsx
│       ├── Invitation.jsx     # "Together with their families" block
│       ├── BigDay.jsx         # schedule / timeline with icons
│       ├── Location.jsx       # location links (placeholders)
│       ├── Rsvp.jsx           # the RSVP form
│       └── Footer.jsx
└── README.md                  # setup + Google Sheet wiring instructions
```

---

## 4. `src/config.js` — single source of truth

Put **everything the couple would edit** here so no one has to touch JSX. Example shape:

```js
export const config = {
  couple: { partnerA: "Ashley", partnerB: "Mike" },
  date: { display: "03 September 2026", short: "September 03, 2026" },
  venue: { name: "The Courtyard", city: "Italy" },
  intro: "Together with their families,",
  request: "Request the honor of your presence in celebration of their marriage",

  schedule: [
    { time: "1:30 PM", label: "Wedding Ceremony", icon: "church" },
    { time: "3:00 PM", label: "Photo Session",    icon: "camera" },
    { time: "4:30 PM", label: "Cocktail Hour",    icon: "cheers" },
    { time: "6:30 PM", label: "Dinner Reception", icon: "dinner" },
    { time: "9:30 PM", label: "Party Time",       icon: "party" },
  ],

  // Location links — PLACEHOLDERS. Owner replaces "#" with real URLs later.
  locations: [
    { title: "Ceremony Venue", subtitle: "The Courtyard", url: "#" },
    { title: "Reception",      subtitle: "The Courtyard", url: "#" },
    { title: "Getting There",  subtitle: "Directions & parking", url: "#" },
  ],

  // Google Apps Script Web App URL — owner pastes this after deploying the script (§6)
  rsvpEndpoint: "PASTE_YOUR_APPS_SCRIPT_URL_HERE",
};
```

---

## 5. Sections / content

Build these as separate components, stacked vertically in `App.jsx`, in this order:

1. **Hero** — full-viewport-ish background hero image. Overlaid, centered: the short date (small, letter-spaced, uppercase), then the couple's names very large in the display serif (`ASHLEY & MIKE`), then venue in italic. Subtle dark gradient over the image so text stays readable. Text sits lower-third or centered.

2. **Invitation** — two-column on desktop (image left, text right), single column stacked on mobile. Text column: small italic intro ("Together with their families,"), big names, the "Request the honor…" line, the display date, the venue in caps, and an **RSVP** button that smooth-scrolls to the RSVP section.

3. **BigDay** — centered heading "THE BIG DAY" in the display serif. Below it, the schedule rendered as a horizontal row of items on desktop (wraps / stacks on mobile). Each item: a **line-art icon**, a time, and a label in small italic serif. Draw the icons as inline SVG (simple, single-stroke, ~1.5px, `currentColor`) — a church, a camera, two clinking glasses, a plate with fork/knife, and a party/speaker+disco icon. Map `icon` names from config to the SVGs.

4. **Location** — heading (e.g. "Find Your Way"). Render `config.locations` as a set of cards or a clean list; each links out (`target="_blank" rel="noopener noreferrer"`). Since URLs are placeholders (`#`), a card with a `#` url should render but visibly indicate it's coming soon (subtle, not broken).

5. **RSVP** — see §6.

6. **Footer** — couple's names + date, small, centered. Tiny "with love" line is fine. Keep it quiet.

---

## 6. RSVP → Google Sheets (the important part)

### Form fields (exactly these)
- **Full name** — text, required
- **Number of guests** — number input, min 1, required (this is "სტუმრების რაოდენობა")
- **Attending?** — a choice: `Joyfully accepts` / `Regretfully declines` (map internally to `Yes` / `No`), required
- (optional, nice-to-have) a short **message** textarea — keep it optional

### Behavior
- On submit: disable the button, show a loading state, POST the data to `config.rsvpEndpoint`.
- Because Apps Script + browsers are fussy about CORS on JSON, POST as `application/x-www-form-urlencoded` (URLSearchParams) or use `mode: "no-cors"` with `FormData`. **Use `no-cors` + `FormData`** — it's the most reliable for this pattern. Since `no-cors` gives an opaque response you can't read, treat a resolved fetch (no thrown error) as success and show a thank-you state. Handle thrown errors with a friendly retry message.
- After success: replace the form with a warm confirmation ("Thank you — we can't wait to celebrate with you." / for declines: "We'll miss you — thank you for letting us know.").
- Validate on the client before sending; show inline errors in the site's voice, not browser default popups where avoidable.

### The Google Apps Script (include this in README.md so the owner can set it up)

Provide these steps in `README.md`:

1. Create a new Google Sheet. Add a header row: `Timestamp | Name | Guests | Attending | Message`.
2. Extensions → Apps Script. Paste this code:

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

3. Deploy → New deployment → type **Web app** → Execute as **Me** → Who has access **Anyone** → Deploy. Copy the Web App URL.
4. Paste that URL into `src/config.js` as `rsvpEndpoint`.
5. Done — every RSVP appends a row to the Sheet, viewable anytime.

The frontend field names in the POST body **must match** the script: `name`, `guests`, `attending`, `message`.

---

## 7. Placeholder hero image

The couple will drop in their own photo. For now:
- Put a placeholder at `src/assets/hero.jpg`. If you can't generate a real image, reference a solid warm-toned CSS gradient as a fallback background behind the hero so the layout never looks broken, and leave a clear comment: `/* Replace src/assets/hero.jpg with the couple's photo */`.
- The `<img>`/background must be swappable by just overwriting that one file.

---

## 8. Design system (derive styling from this)

**Palette**
- `--cream` background: `#F4EEE4`
- `--ink` primary text: `#2B2622`
- `--muted` secondary text: `#8A7E70`
- `--line` hairlines/borders: `#D9CFC0`
- `--accent` (buttons, small marks): `#4A4038` (deep warm brown) — keep it restrained

**Type** (load via Google Fonts in `index.html`)
- **Display serif:** an elegant high-contrast serif — use **Cormorant Garamond** (or **Playfair Display** as fallback). Used LARGE, letter-spaced for names/headings, thin-to-regular weights. This carries the personality.
- **Body / utility:** a clean quiet serif or a refined sans for small caps, times, labels — use **EB Garamond** for body italics and a simple sans (e.g. system sans or **Inter**) only for form inputs/utility if needed.
- Uppercase + wide letter-spacing for eyebrows and small labels (date, venue caps).

**Layout & feel**
- Generous vertical rhythm and whitespace. Sections breathe.
- Max content width ~1100px, centered; hero can go full-bleed.
- Border-radius: minimal (0–4px). This is editorial/elegant, not bubbly.
- Buttons: solid deep-brown fill, cream text, letter-spaced uppercase small label ("RSVP"), subtle hover.
- Icons in BigDay: thin single-stroke line art, consistent stroke width.
- One tasteful motion touch only: a gentle fade/translate-up on scroll into view for each section (IntersectionObserver, ~400–600ms). Respect `prefers-reduced-motion` — disable transforms when set.

**Responsive**
- Mobile-first. Two-column blocks collapse to single column. Schedule row wraps to a 2-then-3 grid or vertical stack on small screens. Hero text scales down but stays legible. Test down to ~360px.

**Accessibility floor**
- Semantic landmarks, alt text on the hero, visible keyboard focus rings, sufficient contrast, form labels tied to inputs.

---

## 9. Deliverables / done criteria

- `npm install` && `npm run dev` runs with no errors.
- All five sections render and look cohesive with the design system.
- RSVP form validates and POSTs to `config.rsvpEndpoint` (works once the owner pastes the Apps Script URL; before that, it should fail gracefully with a friendly message).
- Everything the couple edits (names, date, venue, schedule, locations, endpoint) lives in `src/config.js`.
- `README.md` explains: how to run, how to set up the Google Sheet + Apps Script, how to replace the hero image, and how to deploy to Vercel/Netlify.
- `npm run build` produces a working static bundle.

Build it now.
