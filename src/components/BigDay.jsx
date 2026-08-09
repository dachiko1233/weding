import { config } from "../config.js";
import Icon from "./icons.jsx";
import Reveal from "./Reveal.jsx";

export default function BigDay() {
  const { schedule } = config;

  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-content px-6">
        <Reveal className="text-center">
          <p className="eyebrow text-xs">The Celebration</p>
          <h2 className="mt-4 font-display text-5xl font-light tracking-[0.08em] sm:text-6xl">
            THE BIG DAY
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-line" />
        </Reveal>

        <Reveal
          as="ul"
          className="mt-16 grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-3 lg:gap-6"
        >
          {schedule.map((item) => (
            <li
              key={item.label}
              className="flex flex-col items-center text-center text-ink"
            >
              <Icon name={item.icon} className="text-accent" />
              <p className="mt-4 font-display text-2xl font-light tracking-wide">
                {item.time}
              </p>
              <p className="mt-1 font-body text-base italic text-muted">
                {item.label}
              </p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
