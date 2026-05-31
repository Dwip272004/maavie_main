"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const tabs = [
  {
    label: "Pregnancy & Postpartum",
    image: "/images/pregnency and post partaum.png",
    headline: "Your body is doing something extraordinary. And your skin feels every part of it.",
    description:
      "Pigmentation, dryness, sensitivity, sudden changes you never expected — all while the world tells you to \"just enjoy the glow.\" We believe mothers deserve more than that. They deserve care, understanding, and products made for this season of life.",
    cta: "Shop Pregnancy & Postpartum",
    href: "/shop/pregnancy",
  },
  {
    label: "Perimenopause",
    image: "/images/preemanopaues.png",
    headline: "One day your skincare works. The next, your skin feels completely different.",
    description:
      "Unexpected dryness. Fine lines. Hormonal breakouts returning years later. Perimenopause changes more than we talk about — and your skincare should change with you.",
    cta: "Shop Perimenopause Edit",
    href: "/shop/perimenopause",
  },
  {
    label: "Menopause",
    image: "/images/manopause.png",
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
    <section className="bg-white">
      {/* Heading row + tabs */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-12 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-light text-[#231F20]">
          What does <em className="italic">your</em> body need?
        </h2>
        <nav className="flex items-center gap-6 overflow-x-auto scrollbar-hide pb-1">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveIndex(i)}
              className={`text-[11px] font-medium tracking-[0.15em] uppercase whitespace-nowrap pb-0.5 border-b transition-colors duration-200 shrink-0 ${
                i === activeIndex
                  ? "text-[#231F20] border-[#231F20]"
                  : "text-[#B0A090] border-transparent hover:text-[#4F4242]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Panel */}
      <div className="flex flex-col lg:flex-row min-h-[480px]">
        <div className="relative w-full lg:w-[42%] aspect-[4/5] lg:aspect-auto overflow-hidden bg-[#EAD1CB]">
          <Image
            key={active.image}
            src={active.image}
            alt={active.label}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
        </div>
        <div className="w-full lg:w-[58%] bg-[#F8F3EE] flex items-center px-10 sm:px-14 lg:px-20 py-16">
          <div className="max-w-lg">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#9D6E6B] mb-4">
              {active.label}
            </p>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#231F20] leading-snug mb-5">
              {active.headline}
            </h3>
            <p className="text-[#4F4242] leading-relaxed mb-10 text-base">
              {active.description}
            </p>
            <Link
              href={active.href}
              className="inline-block bg-[#590515] text-white px-9 py-4 text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-[#450110] transition-colors duration-200"
            >
              {active.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
