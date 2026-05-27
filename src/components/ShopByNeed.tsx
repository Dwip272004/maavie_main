"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const tabs = [
  {
    label: "Trying to Conceive",
    image: "/images/maavie-ingredients-botanical.png",
    headline: "Your body is already preparing for change — even before the test turns positive.",
    description:
      "Hormones begin to shift quietly, and skin can suddenly feel more sensitive, reactive or unfamiliar. This is where gentle, safe skincare matters most. Care that supports your body before motherhood even begins.",
    cta: "Shop TTC Edit",
    href: "/shop/ttc",
  },
  {
    label: "Pregnancy & Postpartum",
    image: "/images/maavie-woman-back.png",
    headline: "Your body is doing something extraordinary. And your skin feels every part of it.",
    description:
      "Pigmentation, dryness, sensitivity, sudden changes you never expected — all while the world tells you to \"just enjoy the glow.\" We believe mothers deserve more than that. They deserve care, understanding, and products made for this season of life.",
    cta: "Shop Pregnancy & Postpartum",
    href: "/shop/pregnancy",
  },
  {
    label: "Perimenopause",
    image: "/images/maavie-woman-oil.png",
    headline: "One day your skincare works. The next, your skin feels completely different.",
    description:
      "Unexpected dryness. Fine lines. Hormonal breakouts returning years later. Perimenopause changes more than we talk about — and your skincare should change with you.",
    cta: "Shop Perimenopause Edit",
    href: "/shop/perimenopause",
  },
  {
    label: "Menopause",
    image: "/images/maavie-serum-dropper.png",
    headline: "Your skin is changing because your body is changing.",
    description:
      "Thinner skin. Less bounce. More dryness. More sensitivity. This isn't something to \"fix.\" It's a new season that deserves softer, smarter support.",
    cta: "Shop Menopause Edit",
    href: "/shop/menopause",
  },
];

export default function ShopByNeed() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = tabs[activeIndex];

  return (
    <section className="bg-[#FDFAF5]">
      {/* Heading row + tabs */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-8 pt-14 pb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-light text-[#1A1209]">
          What does <em className="italic">your</em> body need?
        </h2>

        {/* Tab pills — scroll horizontally on mobile */}
        <nav className="flex items-center gap-5 sm:gap-8 overflow-x-auto scrollbar-hide pb-1">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveIndex(i)}
              className={`text-xs tracking-[0.15em] uppercase whitespace-nowrap transition-colors duration-200 pb-0.5 border-b shrink-0 ${
                i === activeIndex
                  ? "text-[#1A1209] border-[#1A1209] font-medium"
                  : "text-[#B0A090] border-transparent hover:text-[#7A6A57]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content panel — image left (~42%), text right */}
      <div className="flex flex-col lg:flex-row min-h-[480px]">
        {/* Portrait image */}
        <div className="relative w-full lg:w-[42%] aspect-[4/5] lg:aspect-auto overflow-hidden bg-[#E8D5A3]">
          <Image
            key={active.image}
            src={active.image}
            alt={active.label}
            fill
            priority
            className="object-cover object-center transition-opacity duration-500"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
        </div>

        {/* Text panel */}
        <div className="w-full lg:w-[58%] bg-[#F5EDE0] flex items-center px-10 sm:px-14 lg:px-20 py-16">
          <div className="max-w-lg">
            <p className="text-xs tracking-[0.25em] uppercase text-[#C9963A] mb-4">
              {active.label}
            </p>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#1A1209] leading-snug mb-5">
              {active.headline}
            </h3>
            <p className="text-[#7A6A57] leading-relaxed mb-10 text-base">
              {active.description}
            </p>
            <Link
              href={active.href}
              className="inline-block bg-[#1A1209] text-white px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#2C1A0E] transition-colors duration-200"
            >
              {active.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
