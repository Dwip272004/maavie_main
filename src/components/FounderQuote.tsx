import Image from "next/image";
import Link from "next/link";

export default function FounderQuote() {
  return (
    <section className="py-20 bg-[#F8F3EE]">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 lg:gap-16 items-start">
          {/* Left — label + image */}
          <div className="flex flex-col items-center lg:items-start gap-5">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#9D6E6B]">
              This is personal.
            </p>
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#9D6E6B]/30">
              <Image
                src="/images/maavie-woman-oil.png"
                alt="Shivani Magan, Co-Founder"
                fill
                className="object-cover object-top"
                sizes="96px"
              />
            </div>
            <div className="text-center lg:text-left">
              <p className="text-sm font-medium text-[#231F20]">Shivani Magan</p>
              <p className="text-xs text-[#9D6E6B]">Co-Founder, Maavie</p>
            </div>
          </div>

          {/* Right — story */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-light text-[#231F20] mb-8 leading-snug">
              Maavie began during my pregnancy.
            </h2>

            <div className="space-y-4 text-[#4F4242] text-base leading-relaxed mb-10">
              <p>
                I developed melasma that seemed to appear overnight, and suddenly the skincare
                products I trusted no longer felt safe to use.
              </p>
              <p>
                I struggled to find skincare that felt both truly safe and genuinely effective for
                what my skin was going through.
              </p>
              <p className="text-[#231F20] font-medium">
                I kept thinking: why are mothers expected to just deal with this?
              </p>
              <p>
                Maavie was born from that question. A brand created to support women through the
                hormonal changes nobody prepares us for — with honesty, science and care.
              </p>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#231F20] border-b border-[#231F20] pb-0.5 hover:text-[#9D6E6B] hover:border-[#9D6E6B] transition-colors duration-200 group w-fit"
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
