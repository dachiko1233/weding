// ⭐ ALL editable content lives here.
// The couple can change everything below without touching any JSX.
export const config = {
  couple: { partnerA: "Ashley", partnerB: "Mike" },
  date: { display: "03 September 2026", short: "September 03, 2026" },
  venue: { name: "The Courtyard", city: "Italy" },
  intro: "Together with their families,",
  request:
    "Request the honor of your presence in celebration of their marriage",

  schedule: [
    { time: "1:30 PM", label: "Wedding Ceremony", icon: "church" },
    { time: "3:00 PM", label: "Photo Session", icon: "camera" },
    { time: "4:30 PM", label: "Cocktail Hour", icon: "cheers" },
    { time: "6:30 PM", label: "Dinner Reception", icon: "dinner" },
    { time: "9:30 PM", label: "Party Time", icon: "party" },
  ],

  // Location links — PLACEHOLDERS. Owner replaces "#" with real URLs later.
  locations: [
    { title: "Ceremony Venue", subtitle: "The Courtyard", url: "#" },
    { title: "Reception", subtitle: "The Courtyard", url: "#" },
    { title: "Getting There", subtitle: "Directions & parking", url: "#" },
  ],

  // Google Apps Script Web App URL — owner pastes this after deploying the
  // script (see README.md). Until then, RSVP fails gracefully.
  rsvpEndpoint: "PASTE_YOUR_APPS_SCRIPT_URL_HERE",
};
