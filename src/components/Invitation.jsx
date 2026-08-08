import { config } from "../config.js";
import hero from "../assets/hero.jpg";
import Reveal from "./Reveal.jsx";

export default function Invitation() {
  const { couple, date, venue, intro, request } = config;

  const scrollToRsvp = () => {
    const el = document.getElementById("rsvp");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-content px-6 py-24 md:py-32">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* Image — left on desktop, stacks on mobile */}
        <Reveal className="order-1">
          <img
            src={hero}
            alt={`${couple.partnerA} and ${couple.partnerB}`}
            className="aspect-[4/5] w-full rounded-[3px] object-cover"
          />
        </Reveal>

        {/* Text column */}
        <Reveal className="order-2 flex flex-col items-start">
          <p className="font-body text-lg italic text-muted">{intro}</p>
          <h2 className="mt-4 font-display text-5xl font-light leading-tight tracking-wide sm:text-6xl">
            {couple.partnerA} &amp; {couple.partnerB}
          </h2>
          <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-ink/80">
            {request}
          </p>
          <p className="mt-8 font-display text-3xl font-light tracking-wide">
            {date.display}
          </p>
          <p className="eyebrow mt-3 text-sm">
            {venue.name} — {venue.city}
          </p>
          <button
            type="button"
            onClick={scrollToRsvp}
            className="btn-primary mt-10"
          >
            RSVP
          </button>
        </Reveal>
      </div>
    </section>
  );
}
