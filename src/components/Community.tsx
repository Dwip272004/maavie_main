import Link from "next/link";

export default function Community() {
  return (
    <section className="w-full">
      <div className="flex flex-col sm:flex-row">

        {/* Left panel — dark maroon */}
        <div
          className="w-full sm:w-1/2 flex items-center justify-center"
          style={{ backgroundColor: "#590515", padding: "65px 20px 72px" }}
        >
          <div className="text-center max-w-[438px]">
            <h2
              className="text-white font-light mb-6"
              style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)", lineHeight: "1.1" }}
            >
              You don&rsquo;t have to<br />
              <em className="italic">figure this out alone.</em>
            </h2>
            <p className="text-white/80 text-base leading-relaxed mb-10">
              Join a community of Indian women who are done being told to &ldquo;just deal
              with it&rdquo; — and are choosing honesty, science and each other instead.
            </p>
            <Link
              href="https://wa.me/message/maavie"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#590515] px-9 py-4 text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-[#F1E1DD] transition-colors duration-200"
            >
              Join Our Community
            </Link>
          </div>
        </div>

        {/* Right panel — dusty rose */}
        <div
          className="w-full sm:w-1/2 flex items-center justify-center"
          style={{ backgroundColor: "#D9C0BA", padding: "65px 20px 72px" }}
        >
          <div className="text-center max-w-[438px]">
            <h2
              className="font-light mb-6"
              style={{ color: "#590515", fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)", lineHeight: "1.1" }}
            >
              Shop bundles
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: "#590515" }}>
              Treat yourself to nature&rsquo;s finest ingredients.
              <br /><br />
              Our bundles are designed to support women through life&rsquo;s big changes — and
              give you better results than any single product alone.
            </p>
            <Link
              href="/bundles"
              className="inline-block text-white px-9 py-4 text-[11px] font-semibold tracking-[0.18em] uppercase hover:opacity-90 transition-opacity duration-200"
              style={{ backgroundColor: "#590515" }}
            >
              Shop Bundles
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
