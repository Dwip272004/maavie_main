import Image from "next/image";
import Link from "next/link";

export default function FounderQuote() {
  return (
    <section className="py-20 bg-[#FDFAF5]">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 lg:gap-16 items-start">
          {/* Left — label + image */}
          <div className="flex flex-col items-center lg:items-start gap-5">
            <p className="text-xs tracking-[0.3em] uppercase text-[#C9963A]">
              This is personal.
            </p>
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#C9963A]/30">
              <Image
                src="/images/maavie-woman-oil.png"
                alt="Shivani Magan, Co-Founder"
                fill
                className="object-cover object-top"
                sizes="96px"
              />
            </div>
            <div className="text-center lg:text-left">
              <p className="text-sm font-medium text-[#1A1209]">Shivani Magan</p>
              <p className="text-xs text-[#C9963A]">Co-Founder, Maavie</p>
            </div>
          </div>

          {/* Right — story */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-light text-[#1A1209] mb-8 leading-snug">
              Maavie began during my pregnancy.
            </h2>

            <div className="space-y-4 text-[#7A6A57] text-base leading-relaxed mb-10">
              <p>
                I developed melasma that seemed to appear overnight, and suddenly the skincare
                products I trusted no longer felt safe to use.
              </p>
              <p>
                I struggled to find skincare that felt both truly safe and genuinely effective for
                what my skin was going through.
              </p>
              <p className="text-[#1A1209] font-medium">
                I kept thinking: why are mothers expected to just deal with this?
              </p>
              <p>
                Maavie was born from that question. A brand created to support women through the
                hormonal changes nobody prepares us for — with honesty, science and care.
              </p>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-3 text-sm tracking-widest uppercase text-[#1A1209] border-b border-[#1A1209] pb-0.5 hover:text-[#C9963A] hover:border-[#C9963A] transition-colors duration-200 group w-fit"
            >
              Read the Full Story
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
