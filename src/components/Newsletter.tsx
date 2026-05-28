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
    <section className="py-16 bg-[#F1E1DD]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#9D6E6B] mb-3">
          Join the Community
        </p>
        <h2 className="text-3xl font-light text-[#231F20] mb-3">
          Get 10% off your first order
        </h2>
        <p className="text-[#4F4242] mb-8 text-base">
          Plus skincare rituals, expert advice and early access to new formulas — straight to your inbox.
        </p>

        {submitted ? (
          <div className="bg-[#590515]/10 border border-[#590515]/20 text-[#231F20] px-8 py-5 text-sm tracking-wide">
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
              className="flex-1 px-5 py-4 bg-white border border-[#E8DEDA] text-[#231F20] text-sm placeholder-[#7A6869] focus:outline-none focus:ring-2 focus:ring-[#9D6E6B]/30"
            />
            <button
              type="submit"
              className="bg-[#590515] text-white px-6 py-4 text-[11px] tracking-[0.18em] uppercase hover:bg-[#450110] transition-colors duration-200 whitespace-nowrap"
            >
              Claim 10% Off
            </button>
          </form>
        )}

        <p className="text-[#7A6869] text-xs mt-4">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
