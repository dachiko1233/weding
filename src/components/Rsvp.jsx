import { useState } from "react";
import { config } from "../config.js";
import Reveal from "./Reveal.jsx";

const ATTENDING = {
  yes: { label: "Joyfully accepts", value: "Yes" },
  no: { label: "Regretfully declines", value: "No" },
};

const initialForm = { name: "", guests: 1, attending: "", message: "" };

export default function Rsvp() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const chooseAttending = (key) => {
    setForm((f) => ({ ...f, attending: key }));
    setErrors((prev) => ({ ...prev, attending: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please tell us your name.";
    const guests = Number(form.guests);
    if (!Number.isFinite(guests) || guests < 1)
      next.guests = "At least one guest, please.";
    if (!form.attending) next.attending = "Please let us know if you'll join.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!validate()) return;

    setStatus("sending");

    // Field names MUST match the Apps Script: name, guests, attending, message
    const body = new FormData();
    body.append("name", form.name.trim());
    body.append("guests", String(form.guests));
    body.append("attending", ATTENDING[form.attending].value);
    body.append("message", form.message.trim());

    try {
      // no-cors gives an opaque response we can't read — a resolved fetch
      // (no thrown error) is treated as success.
      await fetch(config.rsvpEndpoint, {
        method: "POST",
        mode: "no-cors",
        body,
      });
      setStatus("done");
    } catch (err) {
      setStatus("error");
    }
  };

  // Confirmation state replaces the form entirely.
  if (status === "done") {
    const declined = form.attending === "no";
    return (
      <section id="rsvp" className="bg-accent py-24 text-cream md:py-32">
        <Reveal className="mx-auto max-w-content px-6 text-center">
          <h2 className="font-display text-5xl font-light tracking-wide sm:text-6xl">
            {declined ? "We'll miss you" : "Thank you"}
          </h2>
          <p className="mx-auto mt-6 max-w-md font-body text-xl italic text-cream/85">
            {declined
              ? "Thank you for letting us know — you'll be in our hearts."
              : "We can't wait to celebrate with you."}
          </p>
        </Reveal>
      </section>
    );
  }

  return (
    <section id="rsvp" className="bg-accent py-24 text-cream md:py-32">
      <Reveal className="mx-auto max-w-xl px-6">
        <div className="text-center">
          <p className="eyebrow text-xs text-cream/70">Kindly Respond</p>
          <h2 className="mt-4 font-display text-5xl font-light tracking-[0.06em] sm:text-6xl">
            RSVP
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-cream/40" />
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-12 space-y-8">
          {/* Full name */}
          <div>
            <label htmlFor="name" className="eyebrow block text-[0.7rem] text-cream/70">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={update("name")}
              className="mt-2 w-full border-0 border-b border-cream/30 bg-transparent px-0 py-2 font-body text-lg text-cream placeholder-cream/40 focus:border-cream focus:outline-none focus:ring-0"
              placeholder="Your name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id="name-error" className="mt-2 font-body text-sm italic text-cream/80">
                {errors.name}
              </p>
            )}
          </div>

          {/* Number of guests */}
          <div>
            <label htmlFor="guests" className="eyebrow block text-[0.7rem] text-cream/70">
              Number of Guests
            </label>
            <input
              id="guests"
              type="number"
              min="1"
              value={form.guests}
              onChange={update("guests")}
              className="mt-2 w-full border-0 border-b border-cream/30 bg-transparent px-0 py-2 font-body text-lg text-cream placeholder-cream/40 focus:border-cream focus:outline-none focus:ring-0"
              aria-invalid={!!errors.guests}
              aria-describedby={errors.guests ? "guests-error" : undefined}
            />
            {errors.guests && (
              <p id="guests-error" className="mt-2 font-body text-sm italic text-cream/80">
                {errors.guests}
              </p>
            )}
          </div>

          {/* Attending */}
          <div>
            <span className="eyebrow block text-[0.7rem] text-cream/70">
              Will You Attend?
            </span>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {Object.entries(ATTENDING).map(([key, opt]) => {
                const active = form.attending === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => chooseAttending(key)}
                    aria-pressed={active}
                    className={`rounded-[3px] border px-5 py-3 font-body text-base italic transition-colors ${
                      active
                        ? "border-cream bg-cream text-accent"
                        : "border-cream/40 text-cream hover:border-cream"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
            {errors.attending && (
              <p className="mt-2 font-body text-sm italic text-cream/80">
                {errors.attending}
              </p>
            )}
          </div>

          {/* Optional message */}
          <div>
            <label htmlFor="message" className="eyebrow block text-[0.7rem] text-cream/70">
              A Note <span className="lowercase tracking-normal">(optional)</span>
            </label>
            <textarea
              id="message"
              rows="3"
              value={form.message}
              onChange={update("message")}
              className="mt-2 w-full resize-none border-0 border-b border-cream/30 bg-transparent px-0 py-2 font-body text-lg text-cream placeholder-cream/40 focus:border-cream focus:outline-none focus:ring-0"
              placeholder="Share a message with the couple"
            />
          </div>

          {status === "error" && (
            <p className="font-body text-base italic text-cream/90">
              Something went wrong sending your RSVP. Please try again in a moment.
            </p>
          )}

          <div className="pt-2 text-center">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center justify-center rounded-[3px] bg-cream px-10 py-3 font-sans text-sm uppercase tracking-[0.25em] text-accent transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send RSVP"}
            </button>
          </div>
        </form>
      </Reveal>
    </section>
  );
}
