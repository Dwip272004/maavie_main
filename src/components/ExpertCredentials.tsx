import Image from "next/image";
import Link from "next/link";

const pillars = [
  {
    icon: "◎",
    label: "Indian Dermatologists",
    text: "Formulated with specialists who understand hormonal skin changes unique to Indian women and melanin-rich skin.",
  },
  {
    icon: "✦",
    label: "Women's Health Experts",
    text: "Reviewed by practitioners who specialise in the hormonal transitions of every stage — from pregnancy to menopause.",
  },
  {
    icon: "○",
    label: "Clinically Reviewed",
    text: "Every ingredient is chosen for both safety and efficacy. Nothing is included without a clinical reason to be there.",
  },
];

export default function ExpertCredentials() {
  return (
    <section className="py-20 bg-[#F7F0E4]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#C9963A] mb-5">
              Expert-Led
            </p>
            <h2 className="text-3xl sm:text-4xl font-light text-[#1A1209] mb-4 leading-snug">
              Co-created with experts.
            </h2>
            <p className="text-xl font-light text-[#1A1209] mb-8">
              Only what your body needs. Nothing more.
            </p>
            <p className="text-[#7A6A57] leading-relaxed mb-5 text-base">
              Created alongside Indian dermatologists and women&rsquo;s health experts who understand
              hormonal skin and melanin-rich Indian skin.
            </p>
            <p className="text-[#7A6A57] leading-relaxed mb-10 text-base">
              Every formula is carefully reviewed for both safety and efficacy — with ingredients
              chosen to support skin through real biological change.
            </p>
            <Link
              href="/science"
              className="inline-flex items-center gap-3 text-sm tracking-widest uppercase text-[#1A1209] border-b border-[#1A1209] pb-0.5 hover:text-[#C9963A] hover:border-[#C9963A] transition-colors duration-200 group w-fit"
            >
              Explore the Science
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Right: Pillars */}
          <div className="flex flex-col gap-6">
            {pillars.map((p) => (
              <div key={p.label} className="flex gap-5 items-start bg-[#FDFAF5] p-6">
                <span className="text-2xl text-[#C9963A] shrink-0 mt-0.5 leading-none">{p.icon}</span>
                <div>
                  <p className="font-medium text-[#1A1209] text-sm mb-1">{p.label}</p>
                  <p className="text-sm text-[#7A6A57] leading-relaxed">{p.text}</p>
                </div>
              </div>
            ))}

            {/* Image */}
            <div className="relative aspect-[16/7] overflow-hidden">
              <Image
                src="/images/maavie-ingredients-flat.png"
                alt="Expert formulation"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
