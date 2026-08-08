import { config } from "../config.js";

export default function Footer() {
  const { couple, date } = config;
  return (
    <footer className="bg-cream py-16 text-center">
      <p className="font-display text-3xl font-light tracking-[0.15em]">
        {couple.partnerA.toUpperCase()} &amp; {couple.partnerB.toUpperCase()}
      </p>
      <p className="eyebrow mt-4 text-xs">{date.display}</p>
      <p className="mt-6 font-body text-sm italic text-muted">
        Made with love.
      </p>
    </footer>
  );
}
