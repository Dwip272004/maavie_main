import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "88vh" }}
    >
      {/* Full-bleed background image */}
      <Image
        src="/images/banner.png"
        alt="Maavie — Bodies evolve. Your skincare should, too."
        fill
        priority
        className="object-cover object-right"
        sizes="100vw"
      />

      {/* Subtle dark overlay across the whole image for depth */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Left-side stronger vignette for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

      {/* Text content — vertically centered, left-aligned */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center"
        style={{ minHeight: "88vh" }}
      >
        {/* Frosted glass panel — blur effect behind text */}
        <div
          className="w-full max-w-[500px] rounded-sm px-10 py-12"
          style={{
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            background: "rgba(89, 5, 21, 0.35)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <h1
            className="text-white leading-tight mb-5"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300 }}
          >
            Bodies evolve.<br />
            Your <em className="italic">skincare</em> should, too.
          </h1>
          <p className="text-white/80 text-lg font-light mb-10">
            Made for every stage of womanhood.
          </p>
          <Link
            href="/waitlist"
            className="inline-block bg-white text-[#231F20] px-9 py-4 text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-[#F1E1DD] transition-colors duration-200"
          >
            Join the Waitlist
          </Link>
        </div>
      </div>
    </section>
  );
}
