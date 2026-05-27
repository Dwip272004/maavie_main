import Image from "next/image";
import Link from "next/link";

export default function BrandStory() {
  return (
    <section className="bg-[#FDFAF5] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        {/* Image */}
        <div className="relative min-h-[400px] lg:min-h-0 order-2 lg:order-1">
          <Image
            src="/images/maavie-woman-back.png"
            alt="Maavie philosophy"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#FDFAF5]/20 lg:to-[#FDFAF5]/10" />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center px-10 lg:px-16 py-20 order-1 lg:order-2 bg-[#FDFAF5]">
          <p className="text-xs tracking-[0.3em] uppercase text-[#C9963A] mb-5">
            Our Philosophy
          </p>
          <h2 className="text-3xl sm:text-4xl font-light leading-snug mb-6 text-[#1A1209]">
            Our Philosophy
          </h2>
          <p className="text-[#7A6A57] leading-relaxed mb-5 text-base">
            A woman&rsquo;s body changes constantly through life. Puberty. Pregnancy. Postpartum.
            Perimenopause. Menopause.
          </p>
          <p className="text-[#7A6A57] leading-relaxed mb-5 text-base">
            Yet most skincare was never designed with these changes in mind.
          </p>
          <p className="text-[#7A6A57] leading-relaxed mb-5 text-base">
            Maavie was created to bring together what women have always needed: safe, effective
            skincare that understands hormonal change with honesty, softness and care.
          </p>
          <p className="text-[#7A6A57] leading-relaxed mb-10 text-base">
            We combine time-honoured natural ingredients with modern scientific research to create
            formulas that support your skin through every stage of womanhood.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-3 text-sm tracking-widest uppercase text-[#1A1209] border-b border-[#1A1209] pb-0.5 hover:text-[#C9963A] hover:border-[#C9963A] transition-colors duration-200 group w-fit"
          >
            Our Full Story
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
