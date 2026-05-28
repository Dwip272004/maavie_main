"use client";

import { useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    headline: "It has literally changed my life",
    image: "/images/maavie-product-serum.png",
    text: "I developed melasma during pregnancy and felt like I'd tried everything. Maavie's Radiance Elixir is the first thing that has actually made a visible difference. I feel like myself again.",
    name: "Priya S",
    date: "March 2025",
    product: "Radiance Face Elixir",
  },
  {
    headline: "Far less dull — genuinely glowing",
    image: "/images/maavie-oil-hand.png",
    text: "My skin was completely depleted postpartum. The Golden Body Oil absorbed beautifully, no greasiness. Within two weeks my skin looked luminous and I finally felt comfortable in my body again.",
    name: "Aisha T",
    date: "January 2025",
    product: "Golden Body Oil",
  },
  {
    headline: "It's really working",
    image: "/images/maavie-serum-dropper.png",
    text: "I'm in perimenopause and my skin was going haywire — breakouts, dryness and dullness all at once. The Centella Calm Serum has genuinely calmed everything down. My dermatologist noticed the improvement.",
    name: "Sarah K",
    date: "April 2025",
    product: "Centella Calm Serum",
  },
  {
    headline: "Finally a brand that understands me",
    image: "/images/maavie-ingredients-botanical.png",
    text: "Hormonal hair loss was destroying my confidence. After 8 weeks with the Hair Genesis Serum I have baby hairs growing back and so much less shedding. I recommend it to every woman going through the same.",
    name: "Mei L",
    date: "February 2025",
    product: "Hanbang Hair Genesis Serum",
  },
  {
    headline: "Stretch marks visibly fading",
    image: "/images/maavie-woman-back.png",
    text: "I used this throughout my second pregnancy and the difference compared to my first is remarkable. My stretch marks are barely visible and my skin stayed supple throughout. This is now my forever product.",
    name: "Emma R",
    date: "March 2025",
    product: "Golden Body Oil",
  },
  {
    headline: "My scalp has never felt better",
    image: "/images/maavie-ingredients-pine.png",
    text: "Mugwort, ginger, centella — real ingredients that do what they say. My scalp is healthier, itchiness is gone and my hair growth has noticeably accelerated. I'll never use another product.",
    name: "Yuna C",
    date: "May 2025",
    product: "Scalp Revival Oil",
  },
];

export default function Testimonials() {
  const [start, setStart] = useState(0);
  const visible = testimonials.slice(start, start + 3);
  const canPrev = start > 0;
  const canNext = start + 3 < testimonials.length;

  return (
    <section className="py-[71px_0_81px] bg-white overflow-hidden" style={{ padding: "71px 0 81px" }}>
      <div className="max-w-[1275px] mx-auto px-6 sm:px-10">
        {/* Title */}
        <div className="flex items-start justify-between mb-12 gap-6">
          <h2 className="text-4xl font-light text-[#231F20] max-w-2xl leading-[1.2]">
            Join 50,000+ women choosing<br className="hidden sm:block" /> science-backed skincare.
          </h2>
          <div className="flex gap-3 shrink-0 mt-2">
            <button
              onClick={() => setStart(s => Math.max(0, s - 1))}
              disabled={!canPrev}
              className="w-9 h-9 flex items-center justify-center text-[#231F20] disabled:opacity-30 hover:text-[#590515] transition-colors"
              aria-label="Previous"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => setStart(s => Math.min(testimonials.length - 3, s + 1))}
              disabled={!canNext}
              className="w-9 h-9 flex items-center justify-center text-[#231F20] disabled:opacity-30 hover:text-[#590515] transition-colors"
              aria-label="Next"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((t) => (
            <div key={t.name + t.date} className="flex min-h-[320px]">
              {/* Left: image */}
              <div className="w-1/2 relative overflow-hidden rounded-tl-[10px] rounded-bl-[10px]">
                <Image
                  src={t.image}
                  alt={t.headline}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                />
              </div>
              {/* Right: content */}
              <div className="w-1/2 bg-[#F7F1EC] rounded-tr-[10px] rounded-br-[10px] flex items-center px-5 py-6">
                <div className="text-center w-full">
                  <h3 className="text-base font-semibold text-[#231F20] mb-5 leading-snug">
                    {t.headline}
                  </h3>
                  <div className="text-[#590515] mb-4 text-[13px] tracking-wider">
                    ★★★★★
                  </div>
                  <p className="text-sm text-[#231F20] leading-relaxed mb-4">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <p className="text-[10px] text-[#590515] tracking-wide">
                    {t.name}. {t.date}. ✓ Verified
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
