"use client";

import { useState } from "react";
import Image from "next/image";

const ingredients = [
  {
    name: "Mulberry Root",
    tagline: "For the dark patches that seemed to appear overnight.",
    description:
      "Mulberry root helps visibly reduce pigmentation gently, without harsh bleaching ingredients. Safe for sensitive, hormonal skin.",
    image: "/images/maavie-turmeric-powder.png",
  },
  {
    name: "Bakuchiol",
    tagline: "The plant-based alternative to retinol loved during pregnancy.",
    description:
      "It helps smooth, brighten and renew skin — without the harshness many mothers are told to avoid.",
    image: "/images/maavie-ingredients-botanical.png",
  },
  {
    name: "Licorice Root",
    tagline: "A calming botanical used for centuries to soothe sensitive skin.",
    description:
      "Helps reduce the look of pigmentation while supporting a stronger, calmer skin barrier.",
    image: "/images/maavie-ingredients-pine.png",
  },
  {
    name: "Centella Asiatica",
    tagline: "Known across Asia for generations as a healing herb.",
    description:
      "Centella helps calm inflammation, strengthen weakened skin and support collagen naturally.",
    image: "/images/maavie-ingredients-flat.png",
  },
  {
    name: "Fermented Rice Water",
    tagline: "An ancient Korean ritual reimagined for modern skin.",
    description:
      "Rich in nutrients that help brighten, soften and support tired, depleted skin barriers.",
    image: "/images/maavie-oil-hand.png",
  },
];

export default function OurIngredients() {
  const [active, setActive] = useState(0);
  const ing = ingredients[active];

  return (
    <section className="bg-[#231F20] text-white overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-8 pt-16 pb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#9D6E6B] mb-3">
            What&rsquo;s Inside
          </p>
          <h2 className="text-3xl sm:text-4xl font-light leading-snug">
            Our Ingredients
          </h2>
          <p className="text-white/60 mt-3 max-w-md text-base">
            Every active in a Maavie formula has a reason to be there — and a clinical study to back it up.
          </p>
        </div>
      </div>

      {/* Ingredient tabs + panel */}
      <div className="flex flex-col lg:flex-row">
        {/* Left — ingredient list */}
        <div className="w-full lg:w-[30%] border-t border-white/10 lg:border-r lg:border-t-0">
          {ingredients.map((ing, i) => (
            <button
              key={ing.name}
              onClick={() => setActive(i)}
              className={`w-full text-left px-8 sm:px-10 py-6 border-b border-white/10 flex items-center justify-between gap-4 transition-colors duration-200 ${
                i === active
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <span className="text-sm tracking-wide">{ing.name}</span>
              {i === active && (
                <svg className="w-4 h-4 text-[#9D6E6B] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m9 18 6-6-6-6" />
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Right — content panel */}
        <div className="w-full lg:w-[70%] flex flex-col sm:flex-row min-h-[400px]">
          {/* Image */}
          <div className="relative w-full sm:w-[45%] aspect-square sm:aspect-auto overflow-hidden bg-[#3D1F1F]">
            <Image
              key={ing.image}
              src={ing.image}
              alt={ing.name}
              fill
              className="object-cover object-center opacity-80 transition-opacity duration-500"
              sizes="(max-width: 640px) 100vw, 30vw"
            />
          </div>

          {/* Text */}
          <div className="flex-1 flex flex-col justify-center px-10 sm:px-12 lg:px-14 py-12">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#9D6E6B] mb-4">
              {ing.name}
            </p>
            <h3 className="text-xl sm:text-2xl font-semibold leading-snug text-white mb-5">
              {ing.tagline}
            </h3>
            <p className="text-white/70 leading-relaxed text-base">
              {ing.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
