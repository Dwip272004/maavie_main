import Image from "next/image";
import Link from "next/link";

export default function BrandStory() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[600px]">

        {/* Left — content */}
        <div className="w-full lg:w-[52%] flex items-center px-10 sm:px-14 lg:px-20 xl:px-28 py-20 lg:py-24">
          <div className="max-w-[520px]">
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#590515] mb-6">
              Our Story
            </p>
            <h2
              className="text-[#231F20] font-light leading-[1.05] mb-6"
              style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.2rem)" }}
            >
              Embodying<br />
              <em className="italic text-[#9D6E6B]">Change.</em>
            </h2>
            <div className="w-10 h-px bg-[#590515] mb-8" style={{ opacity: 0.35 }} />
            <p
              className="text-[#231F20] leading-[1.75] mb-5"
              style={{ fontSize: "clamp(1rem, 1.2vw, 1.1rem)" }}
            >
              Your body deserves to be honoured at every stage of life.
            </p>
            <p className="text-[#4F4242] text-base leading-relaxed mb-5">
              We exist to champion your changing body — naturally. Arming you with the
              knowledge, products, and community you need to thrive at every stage of womanhood.
            </p>
            <p className="text-[#4F4242] text-base leading-relaxed mb-12">
              From hormonal pigmentation to hair thinning and skin sensitivity, our formulas
              support your body&rsquo;s every evolution.
            </p>
            <Link
              href="/waitlist"
              className="inline-block bg-[#590515] text-white px-9 py-4 text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-[#450110] transition-colors duration-200"
            >
              Join the Waitlist
            </Link>
          </div>
        </div>

        {/* Right — image */}
        <div className="relative w-full lg:w-[48%] aspect-[4/3] lg:aspect-auto overflow-hidden">
          <Image
            src="/images/graphi.jpeg"
            alt="Maavie — every stage of womanhood"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 48vw"
          />
          {/* Subtle left-edge fade into white */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent hidden lg:block" />
        </div>

      </div>
    </section>
  );
}
