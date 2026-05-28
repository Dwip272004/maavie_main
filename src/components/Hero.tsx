import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #7A4F4A 0%, #A07068 35%, #C4908A 65%, #D4A89E 100%)",
        minHeight: "88vh",
      }}
    >
      {/* Full-bleed product image — right half, bottom-anchored */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[55%] pointer-events-none">
        <Image
          src="/images/maavie-product-serum.png"
          alt="Maavie products"
          fill
          priority
          className="object-contain object-bottom lg:object-right-bottom"
          sizes="(max-width: 1024px) 100vw, 55vw"
        />
      </div>

      {/* Overlay gradient on mobile so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent lg:hidden" />

      {/* Text content — positioned left-center */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center"
        style={{ minHeight: "88vh" }}
      >
        <div className="w-full lg:w-[45%]">
          <h1
            className="text-white leading-tight mb-5"
            style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)", fontWeight: 300 }}
          >
            Bodies evolve.<br />
            Your <em className="italic">skincare</em> should, too.
          </h1>
          <p className="text-white/80 text-lg font-light mb-10">
            Made for every stage of womanhood.
          </p>
          <Link
            href="/products"
            className="inline-block bg-white text-[#231F20] px-9 py-4 text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-[#F1E1DD] transition-colors duration-200"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}
