import Image from "next/image";
import Link from "next/link";

export default function ExpertCredentials() {
  return (
    <section className="bg-[#F8F3EE]" style={{ padding: "43px 0" }}>
      <div className="flex flex-wrap max-w-[1500px] mx-auto items-start">

        {/* Left — expert headshot */}
        <div className="w-full lg:w-[25%] hidden lg:flex justify-end">
          <div
            className="relative"
            style={{ width: "100%", maxWidth: "344px", paddingBottom: "331px", marginTop: "-43px" }}
          >
            <Image
              src="/images/maavie-turmeric-powder.png"
              alt="Expert formulation"
              fill
              className="object-cover object-center"
              sizes="25vw"
            />
          </div>
        </div>

        {/* Center — text */}
        <div className="w-full lg:w-[37%] text-center" style={{ padding: "75px 20px 110px" }}>
          <div className="mx-auto" style={{ maxWidth: "480px" }}>
            <h2
              className="text-[#231F20] font-light mb-6"
              style={{ fontSize: "clamp(1.8rem, 2.667vw, 2.5rem)", lineHeight: "1" }}
            >
              Co-created with Experts.
            </h2>
            <p className="text-[#231F20] text-lg font-light mb-8">
              Only what your body needs. Nothing more.
            </p>
            <p className="text-[#4F4242] text-base leading-relaxed mb-6">
              Created alongside Indian dermatologists and women&rsquo;s health experts who understand
              hormonal skin changes and melanin-rich Indian skin.
            </p>
            <p className="text-[#4F4242] text-base leading-relaxed mb-10">
              Every formula is carefully reviewed for both safety and efficacy — with ingredients
              chosen to support skin through real biological change.
            </p>
            <Link
              href="/science"
              className="inline-block bg-[#590515] text-white px-9 py-4 text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-[#450110] transition-colors duration-200"
            >
              Expert Education
            </Link>
          </div>
        </div>

        {/* Right — group/lab photo (two stacked) */}
        <div className="w-full lg:w-[38%] hidden lg:block relative">
          {/* Top image */}
          <div
            className="relative w-full"
            style={{ paddingBottom: "356px", maxWidth: "486px", marginTop: "-43px" }}
          >
            <Image
              src="/images/maavie-ingredients-flat.png"
              alt="Maavie expert team"
              fill
              className="object-cover object-center"
              sizes="38vw"
            />
          </div>
          {/* Bottom image */}
          <div
            className="relative w-full ml-auto"
            style={{ paddingBottom: "357px", maxWidth: "482px", margin: "-259px 0 -43px auto" }}
          >
            <Image
              src="/images/maavie-ingredients-pine.png"
              alt="Maavie laboratory"
              fill
              className="object-cover object-center"
              sizes="38vw"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
