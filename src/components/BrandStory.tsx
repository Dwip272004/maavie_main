import Image from "next/image";
import Link from "next/link";

export default function BrandStory() {
  return (
    <section className="bg-[#F8F3EE] overflow-visible" style={{ padding: "101px 0 48px" }}>
      <div className="flex flex-wrap max-w-[1500px] mx-auto">

        {/* Left — tall portrait image, bleeds upward */}
        <div className="w-full lg:w-[22%] hidden lg:block">
          <div className="relative" style={{ paddingBottom: "433px", marginTop: "-101px", maxWidth: "333px" }}>
            <Image
              src="/images/graphi.jpeg"
              alt="Maavie — every stage"
              fill
              className="object-cover object-center"
              sizes="22vw"
            />
          </div>
        </div>

        {/* Center — content */}
        <div className="w-full lg:w-[43%]" style={{ padding: "72px 0 80px 74px" }}>
          <div style={{ maxWidth: "500px" }}>
            <h2
              className="text-[#231F20] font-light leading-[1] mb-12"
              style={{ fontSize: "clamp(1.8rem, 2.667vw, 2.5rem)", lineHeight: "1" }}
            >
              Embodying Change
            </h2>
            <div className="mb-12">
              <p className="text-[#231F20] text-[18px] leading-[24px]">
                Your body deserves to be honoured at every stage of life.
                <br /><br />
                We exist to champion your changing body, naturally, and arm you with the
                knowledge, products, and community you need to thrive at every stage of womanhood.
                <br /><br />
                From hormonal pigmentation to hair thinning and skin sensitivity, our formulas
                support your body&rsquo;s every evolution.
              </p>
            </div>
            <Link
              href="/about"
              className="inline-block bg-[#590515] text-white px-9 py-4 text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-[#450110] transition-colors duration-200"
            >
              About Us
            </Link>
          </div>
        </div>

        {/* Right — two stacked images with negative margin overlaps */}
        <div className="w-full lg:w-[35%] hidden lg:block">
          {/* Top image — bleeds upward */}
          <div
            className="relative w-full"
            style={{ paddingBottom: "368px", maxWidth: "377px", marginTop: "-46px" }}
          >
            <Image
              src="/images/iimg3.jpeg"
              alt="Maavie ingredients"
              fill
              className="object-cover object-center"
              sizes="25vw"
            />
          </div>
          {/* Bottom image — overlaps the one above, bleeds downward */}
          <div
            className="relative w-full ml-auto"
            style={{ paddingBottom: "386px", maxWidth: "386px", margin: "-82px 0 -48px auto" }}
          >
            <Image
              src="/images/maavie-ingredients-botanical.png"
              alt="Maavie botanicals"
              fill
              className="object-cover object-center"
              sizes="25vw"
            />
          </div>
        </div>

        {/* Mobile: single full-width image */}
        <div className="w-full lg:hidden relative aspect-[4/3] overflow-hidden">
          <Image
            src="/images/maavie-ingredients-botanical.png"
            alt="Maavie botanicals"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

      </div>
    </section>
  );
}
