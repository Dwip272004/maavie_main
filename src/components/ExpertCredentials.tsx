import Link from "next/link";

const pillars = [
  {
    symbol: "◎",
    title: "Dermatologist Co-created",
    desc: "Formulated alongside Indian dermatologists who understand melanin-rich skin and hormonal change.",
  },
  {
    symbol: "✦",
    title: "Clinically Tested Actives",
    desc: "Every ingredient is backed by peer-reviewed clinical research — no trend-driven filler.",
  },
  {
    symbol: "◇",
    title: "Hormone-Safe Formulas",
    desc: "Safe across pregnancy, postpartum, perimenopause and beyond. Reviewed at every stage.",
  },
  {
    symbol: "⊕",
    title: "Made for Indian Skin",
    desc: "Developed specifically for melanin-rich skin and the hormonal realities of Indian women.",
  },
];

export default function ExpertCredentials() {
  return (
    <section className="bg-[#590515]">

      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 sm:px-10 pt-20 pb-14 text-center">
        <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#F1E1DD]/60 mb-4">
          Expert-Led
        </p>
        <h2
          className="text-white font-light leading-tight mb-5"
          style={{ fontSize: "clamp(1.9rem, 3.5vw, 3rem)" }}
        >
          Co-created with<br />
          <em className="italic text-[#F1E1DD]">Indian Experts.</em>
        </h2>
        <p className="text-white/55 text-base font-light max-w-lg mx-auto">
          Only what your body needs. Nothing more.
        </p>
      </div>

      {/* Pillars */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 pb-16">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ gap: "1px", backgroundColor: "rgba(255,255,255,0.12)" }}
        >
          {pillars.map((p) => (
            <div key={p.title} className="bg-[#590515] px-6 sm:px-8 py-8 sm:py-10 group">
              <span
                className="block mb-5 text-[22px] text-[#F1E1DD]/50 transition-colors duration-300 group-hover:text-[#F1E1DD]"
              >
                {p.symbol}
              </span>
              <p className="text-white text-sm font-semibold tracking-wide leading-snug mb-3">
                {p.title}
              </p>
              <p className="text-white/50 text-sm leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pb-20">
        <Link
          href="/waitlist"
          className="inline-block border border-white/35 text-white px-9 py-4 text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-white hover:text-[#590515] transition-colors duration-200"
        >
          Join the Waitlist
        </Link>
      </div>

    </section>
  );
}
