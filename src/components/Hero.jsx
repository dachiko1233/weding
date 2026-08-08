import { config } from "../config.js";
// Replace src/assets/hero.jpg with the couple's photo — this import is the
// single swap point for the hero background.
import hero from "../assets/hero.jpg";

export default function Hero() {
  const { couple, date, venue } = config;

  return (
    <header className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
      {/* Warm gradient fallback sits behind the image so the layout is never
          broken even if hero.jpg is missing/removed. */}
      <div
        className="absolute inset-0 -z-20 bg-gradient-to-b from-[#6B5B47] to-[#2B2622]"
        aria-hidden="true"
      />
      <img
        src={hero}
        alt={`${couple.partnerA} and ${couple.partnerB} at ${venue.name}`}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      {/* Subtle dark gradient for text legibility */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-black/25 to-black/60"
        aria-hidden="true"
      />

      <div className="mx-auto flex max-w-content flex-col items-center px-6 text-center text-cream">
        <p className="eyebrow text-xs text-cream/80 sm:text-sm">{date.short}</p>
        <h1 className="mt-6 font-display text-6xl font-light leading-[0.95] tracking-[0.04em] sm:text-7xl md:text-8xl lg:text-9xl">
          {couple.partnerA.toUpperCase()}
          <span className="mx-3 font-light">&amp;</span>
          {couple.partnerB.toUpperCase()}
        </h1>
        <p className="mt-6 font-body text-xl italic text-cream/90 sm:text-2xl">
          {venue.name}, {venue.city}
        </p>
      </div>
    </header>
  );
}
