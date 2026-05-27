import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F7F0E4]" style={{ minHeight: "90vh" }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/maavie-bottle-glow.png"
          alt="Maavie hero"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1209]/75 via-[#1A1209]/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-center h-full" style={{ minHeight: "90vh" }}>
        <div className="max-w-xl py-24">
          <h1 className="text-white font-light leading-tight mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            Bodies evolve.<br />
            <em className="italic">Your skincare should, too.</em>
          </h1>
          <p className="text-white/80 text-lg font-light leading-relaxed mb-10 max-w-md">
            Made for every stage of womanhood.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/products"
              className="inline-block bg-[#C9963A] text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-[#b8832a] transition-colors duration-300 text-center"
            >
              Shop Now
            </Link>
            <Link
              href="/about"
              className="inline-block bg-transparent text-white border border-white/60 px-8 py-4 text-sm tracking-widest uppercase hover:bg-white/10 transition-colors duration-300 text-center"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
