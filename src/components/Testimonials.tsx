"use client";

import { useState, useRef } from "react";

const testimonials = [
  {
    name: "Priya S.",
    date: "March 2025",
    rating: 5,
    text: "I've tried countless serums for hair loss but the Hanbang Hair Genesis Serum is on another level. Within 6 weeks I noticed baby hairs and significantly less shedding. Truly life-changing.",
    product: "Hanbang Hair Genesis Serum",
    verified: true,
  },
  {
    name: "Mei L.",
    date: "February 2025",
    rating: 5,
    text: "The Golden Body Oil has become a non-negotiable in my routine. My skin literally glows — not greasy, just that lit-from-within kind of radiance. The scent is divine too.",
    product: "Golden Body Oil",
    verified: true,
  },
  {
    name: "Sarah K.",
    date: "April 2025",
    rating: 5,
    text: "As someone who's always been skeptical of 'ancient wisdom' claims, I'm converted. The Centella Calm Serum cleared my chronic redness in three weeks. Dermatologist confirmed improvements.",
    product: "Centella Calm Serum",
    verified: true,
  },
  {
    name: "Aisha T.",
    date: "January 2025",
    rating: 5,
    text: "Postpartum my skin was completely depleted. Maavie's body oil has been my saviour — it absorbed stretch marks beautifully and gave me my confidence back.",
    product: "Golden Body Oil",
    verified: true,
  },
  {
    name: "Emma R.",
    date: "March 2025",
    rating: 5,
    text: "I love that every ingredient is rooted in something real — centuries of Korean herbal tradition. You can feel the quality in every drop. My skin has never looked better.",
    product: "Radiance Face Elixir",
    verified: true,
  },
  {
    name: "Yuna C.",
    date: "May 2025",
    rating: 5,
    text: "Finally a brand that actually knows its ingredients. Mugwort, ginger, centella — real hanbang herbs that work. My scalp is healthier than ever, and my hair growth is noticeably accelerated.",
    product: "Scalp Revival Oil",
    verified: true,
  },
  {
    name: "Nadia B.",
    date: "February 2025",
    rating: 5,
    text: "I've gifted the bundle to three friends already. Everyone who tries Maavie becomes obsessed. The formulation is thoughtful, the results are real, and the packaging is gorgeous.",
    product: "Radiance Bundle",
    verified: true,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-[#C9963A]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(testimonials.length - 1, c + 1));

  return (
    <section className="py-20 bg-[#F7F0E4]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#C9963A] mb-3">
              Real Results
            </p>
            <h2 className="text-3xl sm:text-4xl font-light text-[#1A1209]">
              Join 50,000+ who found their glow
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={prev}
              disabled={current === 0}
              className="w-10 h-10 border border-[#1A1209] flex items-center justify-center disabled:opacity-30 hover:bg-[#1A1209] hover:text-white transition-colors duration-200"
              aria-label="Previous"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={next}
              disabled={current === testimonials.length - 1}
              className="w-10 h-10 border border-[#1A1209] flex items-center justify-center disabled:opacity-30 hover:bg-[#1A1209] hover:text-white transition-colors duration-200"
              aria-label="Next"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.slice(current, current + 3).map((t) => (
            <div key={t.name + t.date} className="bg-[#FDFAF5] p-8 flex flex-col gap-4">
              <StarRating count={t.rating} />
              <p className="text-[#1A1209] leading-relaxed text-sm flex-1">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-[#E8D5A3]/60">
                <div>
                  <p className="text-sm font-medium text-[#1A1209]">{t.name}</p>
                  <p className="text-xs text-[#7A6A57]">{t.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#C9963A]">{t.product}</p>
                  {t.verified && (
                    <p className="text-xs text-[#7A6A57]">✓ Verified purchase</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current ? "bg-[#C9963A] w-6" : "bg-[#E8D5A3]"
              }`}
              aria-label={`Go to ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
