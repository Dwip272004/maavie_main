"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-16 bg-[#C9963A]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-white/70 mb-3">
          Join the Community
        </p>
        <h2 className="text-3xl font-light text-white mb-3">
          Get 10% off your first order
        </h2>
        <p className="text-white/80 mb-8 text-base">
          Plus hanbang rituals, expert advice and early access to new formulas — straight to your inbox.
        </p>

        {submitted ? (
          <div className="bg-white/20 text-white px-8 py-5 text-sm tracking-wide">
            Welcome to the maavie circle. Your 10% discount is on its way ✦
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 px-5 py-4 bg-white text-[#1A1209] text-sm placeholder-[#7A6A57] focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="bg-[#1A1209] text-white px-6 py-4 text-xs tracking-widest uppercase hover:bg-[#2C1A0E] transition-colors duration-200 whitespace-nowrap"
            >
              Claim 10% Off
            </button>
          </form>
        )}

        <p className="text-white/50 text-xs mt-4">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
