import { config } from "../config.js";
import Reveal from "./Reveal.jsx";

export default function DressCode() {
  const { dressCode } = config;
  if (!dressCode) return null;

  const { title, style, note, palette } = dressCode;
  const hasPalette = Array.isArray(palette) && palette.length > 0;

  return (
    <section className="mx-auto max-w-content px-6 py-24 md:py-32">
      <Reveal className="text-center">
        <p className="eyebrow text-xs">Attire</p>
        <h2 className="mt-4 font-display text-5xl font-light tracking-[0.06em] sm:text-6xl">
          {title}
        </h2>
        <div className="mx-auto mt-6 h-px w-16 bg-line" />

        <p className="mt-10 font-display text-3xl font-light tracking-wide text-ink sm:text-4xl">
          {style}
        </p>

        {note && (
          <p className="mx-auto mt-5 max-w-md font-body text-lg italic leading-relaxed text-muted">
            {note}
          </p>
        )}

        {hasPalette && (
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {palette.map((color, i) => (
              <li key={`${color}-${i}`}>
                <span
                  className="block h-9 w-9 rounded-full border border-line shadow-sm sm:h-10 sm:w-10"
                  style={{ backgroundColor: color }}
                  title={color}
                  role="img"
                  aria-label={`Color inspiration ${color}`}
                />
              </li>
            ))}
          </ul>
        )}
      </Reveal>
    </section>
  );
}
