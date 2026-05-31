import Image from "next/image";
import Link from "next/link";

export default function KnowledgeFounder() {
  return (
    <section className="bg-white">
      {/* Row 1: Knowledge / Guides */}
      <div className="flex flex-col sm:flex-row min-h-[400px]">
        {/* Left — image */}
        <div className="relative w-full sm:w-1/2 aspect-[4/3] sm:aspect-auto overflow-hidden">
          <Image
            src="/images/knowledge.jpeg"
            alt="Knowledge is yours. Free."
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </div>
        {/* Right — content */}
        <div
          className="w-full sm:w-1/2 flex items-center justify-center px-10 sm:px-14 lg:px-20 py-16"
          style={{ backgroundColor: "#D9C0BA" }}
        >
          <div className="max-w-[440px] text-center">
            <h2
              className="text-[#231F20] font-light mb-8"
              style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)", lineHeight: "1.1" }}
            >
              Knowledge is yours. Free.
            </h2>
            <p className="text-[#231F20] text-base leading-relaxed mb-10">
              Expert advice shouldn&rsquo;t cost a fortune. We&rsquo;ve created free downloadable
              guides from hormonal skincare basics to postpartum recovery — written with India&rsquo;s
              leading dermatologists and women&rsquo;s health specialists.
            </p>
            <Link
              href="/guides"
              className="inline-block bg-[#590515] text-white px-9 py-4 text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-[#450110] transition-colors duration-200"
            >
              Wellness Guides
            </Link>
          </div>
        </div>
      </div>

      {/* Row 2: Founder story */}
      <div className="flex flex-col sm:flex-row-reverse min-h-[400px]">
        {/* Right (visually) — image / video thumbnail */}
        <div className="relative w-full sm:w-1/2 aspect-[4/3] sm:aspect-auto overflow-hidden">
          <Image
            src="/images/thispersonal.jpeg"
            alt="This is personal — Maavie founder"
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </div>
        {/* Left — content */}
        <div className="w-full sm:w-1/2 bg-white flex items-center justify-center px-10 sm:px-14 lg:px-20 py-16">
          <div className="max-w-[440px] text-center">
            <h2
              className="text-[#231F20] font-light mb-8"
              style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)", lineHeight: "1.1" }}
            >
              This is personal.
            </h2>
            <p className="text-[#4F4242] text-base leading-relaxed mb-10 italic">
              &ldquo;As a new mum, I developed melasma that seemed to appear overnight — and suddenly
              the skincare I trusted no longer felt safe. I created Maavie to help all women feel
              supported when they&rsquo;re going through big life stages.
              <br /><br />
              We create products with purpose, champion women&rsquo;s health, and build a community
              of women who refuse to just deal with it.&rdquo;
              <br /><br />
              <span className="not-italic font-medium text-[#231F20]">Shivani Magan, Maavie Founder</span>
            </p>
            <Link
              href="/about"
              className="inline-block bg-[#590515] text-white px-9 py-4 text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-[#450110] transition-colors duration-200"
            >
              Maavie Philosophy
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
