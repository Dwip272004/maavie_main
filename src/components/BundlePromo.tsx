import Image from "next/image";
import Link from "next/link";

const bundles = [
  {
    name: "The Radiance Ritual",
    description: "Hair Genesis Serum + Golden Body Oil + Radiance Face Elixir",
    price: "₹7,999",
    savings: "Save ₹1,299",
    image: "/images/maavie-product-serum.png",
    href: "/bundles/radiance-ritual",
    popular: true,
  },
  {
    name: "The Scalp & Hair Kit",
    description: "Scalp Revival Oil + Hair Genesis Serum + Mugwort Mist",
    price: "₹6,499",
    savings: "Save ₹999",
    image: "/images/maavie-ingredients-pine.png",
    href: "/bundles/scalp-hair",
    popular: false,
  },
  {
    name: "The Glow Starter",
    description: "Golden Body Oil + Centella Calm Serum",
    price: "₹4,999",
    savings: "Save ₹599",
    image: "/images/maavie-serum-dropper.png",
    href: "/bundles/glow-starter",
    popular: false,
  },
];

export default function BundlePromo() {
  return (
    <section className="py-20 bg-[#F8F3EE]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#9D6E6B] mb-3">
            Better Together
          </p>
          <h2 className="text-3xl sm:text-4xl font-light text-[#231F20] mb-4">
            Shop bundles & save
          </h2>
          <p className="text-[#4F4242] max-w-xl mx-auto text-base">
            Rituals work better as systems. Our bundles are thoughtfully curated so your formulas
            work in synergy — deeper results, better value.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {bundles.map((b) => (
            <div
              key={b.name}
              className={`group relative border ${
                b.popular ? "border-[#9D6E6B]" : "border-[#E8DEDA]"
              } overflow-hidden`}
            >
              {b.popular && (
                <div className="absolute top-0 left-0 right-0 bg-[#9D6E6B] text-white text-[10px] tracking-widest uppercase text-center py-1.5 z-10">
                  Most Popular
                </div>
              )}

              {/* Image */}
              <div className={`relative aspect-square overflow-hidden bg-[#EAD1CB] ${b.popular ? "mt-8" : ""}`}>
                <Image
                  src={b.image}
                  alt={b.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>

              {/* Info */}
              <div className="p-6 bg-white">
                <h3 className="text-base font-medium text-[#231F20] mb-1">{b.name}</h3>
                <p className="text-xs text-[#4F4242] mb-4 leading-relaxed">{b.description}</p>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-lg font-medium text-[#231F20]">{b.price}</span>
                  <span className="text-xs text-[#9D6E6B] bg-[#9D6E6B]/10 px-2.5 py-1">{b.savings}</span>
                </div>
                <Link
                  href={b.href}
                  className="block text-center bg-[#590515] text-white text-[11px] tracking-[0.18em] uppercase py-3.5 hover:bg-[#450110] transition-colors duration-300"
                >
                  Shop Bundle
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/bundles"
            className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#231F20] border-b border-[#231F20] pb-0.5 hover:text-[#9D6E6B] hover:border-[#9D6E6B] transition-colors duration-200"
          >
            View All Bundles
          </Link>
        </div>
      </div>
    </section>
  );
}
