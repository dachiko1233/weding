import { config } from "../config.js";
import Reveal from "./Reveal.jsx";

export default function Location() {
  const { locations } = config;

  return (
    <section className="mx-auto max-w-content px-6 py-24 md:py-32">
      <Reveal className="text-center">
        <p className="eyebrow text-xs">Location</p>
        <h2 className="mt-4 font-display text-5xl font-light tracking-[0.06em] sm:text-6xl">
          Find Your Way
        </h2>
        <div className="mx-auto mt-6 h-px w-16 bg-line" />
      </Reveal>

      <Reveal className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {locations.map((loc) => {
          const comingSoon = !loc.url || loc.url === "#";
          const cardBody = (
            <>
              <p className="eyebrow text-[0.7rem]">{loc.title}</p>
              <p className="mt-3 font-display text-2xl font-light">
                {loc.subtitle}
              </p>
              <p className="mt-6 font-body text-sm italic text-muted">
                {comingSoon ? "Details coming soon" : "Open map →"}
              </p>
            </>
          );

          const className =
            "block h-full rounded-[3px] border border-line bg-white/40 p-8 transition-colors";

          return comingSoon ? (
            <div
              key={loc.title}
              className={`${className} cursor-default opacity-70`}
              aria-disabled="true"
            >
              {cardBody}
            </div>
          ) : (
            <a
              key={loc.title}
              href={loc.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${className} hover:border-accent hover:bg-white/70`}
            >
              {cardBody}
            </a>
          );
        })}
      </Reveal>
    </section>
  );
}
