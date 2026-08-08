// ⭐ ALL editable content lives here.
// The couple can change everything below without touching any JSX.
export const config = {
  couple: { partnerA: "Nicole Michaelides", partnerB: "Giorgi Maisashvili" },
  date: { display: "28 november 2026", short: "november 28, 2026" },
  venue: { name: "The Courtyard", city: "Limassol" },
  intro: "Together with their families,",
  request:
    "Request the honor of your presence in celebration of their marriage",

  schedule: [
    { time: "5:30 PM", label: "Wedding Ceremony", icon: "church" },
    { time: "8:00 PM", label: "Dinner Reception", icon: "dinner" },
    { time: "9:30 PM", label: "Party Time", icon: "party" },
  ],

  // Location links — PLACEHOLDERS. Owner replaces "#" with real URLs later.
  locations: [
    { title: "Ceremony Venue", subtitle: "The Courtyard", url: "#" },
    { title: "Reception", subtitle: "The Courtyard", url: "#" },
  ],

  // Dress Code — fully editable here. `palette` is optional; omit or set to
  // an empty array to hide the color swatches.
  dressCode: {
    title: "Dress Code",
    style: "Smart",
    note: "We'd love to see you dressed smart and elegant for the celebration.",
  },

  // Google Apps Script Web App URL — owner pastes this after deploying the
  // script (see README.md). Until then, RSVP fails gracefully.
  rsvpEndpoint:
    "https://script.google.com/macros/s/AKfycbxsY_Oli4wPKrRYhDGCGUMX_yTmsO8klVYYh1JW4zwJvC9LTy13KVvYOPhX4R2a1bIN/exec",
};
