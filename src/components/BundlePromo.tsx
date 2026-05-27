import Image from "next/image";
import Link from "next/link";

const bundles = [
  {
    name: "The Radiance Ritual",
    description: "Hair Genesis Serum + Golden Body Oil + Radiance Face Elixir",
    price: "$158",
    savings: "Save $26",
    image: "/images/maavie-product-serum.png",
    href: "/bundles/radiance-ritual",
    popular: true,
  },
  {
    name: "The Scalp & Hair Kit",
    description: "Scalp Revival Oil + Hair Genesis Serum + Mugwort Mist",
    price: "$128",
    savings: "Save $18",
    image: "/images/maavie-ingredients-pine.png",
    href: "/bundles/scalp-hair",
    popular: false,
  },
  {
    name: "The Glow Starter",
    description: "Golden Body Oil + Centella Calm Serum",
    price: "$96",
    savings: "Save $12",
    image: "/images/maavie-serum-dropper.png",
    href: "/bundles/glow-starter",
    popular: false,
  },
];

export default function BundlePromo() {
  return (
    <section className="py-20 bg-[#FDFAF5]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-[#C9963A] mb-3">
            Better Together
          </p>
          <h2 className="text-3xl sm:text-4xl font-light text-[#1A1209] mb-4">
            Shop bundles & save
          </h2>
          <p className="text-[#7A6A57] max-w-xl mx-auto text-base">
            Rituals work better as systems. Our bundles are thoughtfully curated so your formulas
            work in synergy — deeper results, better value.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {bundles.map((b) => (
            <div
              key={b.name}
              className={`group relative border ${
                b.popular ? "border-[#C9963A]" : "border-[#E8D5A3]"
              } overflow-hidden`}
            >
              {b.popular && (
                <div className="absolute top-0 left-0 right-0 bg-[#C9963A] text-white text-[10px] tracking-widest uppercase text-center py-1.5 z-10">
                  Most Popular
                </div>
              )}

              {/* Image */}
              <div className={`relative aspect-square overflow-hidden bg-[#F5EDE0] ${b.popular ? "mt-8" : ""}`}>
                <Image
                  src={b.image}
                  alt={b.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-base font-medium text-[#1A1209] mb-1">{b.name}</h3>
                <p className="text-xs text-[#7A6A57] mb-4 leading-relaxed">{b.description}</p>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-lg font-medium text-[#1A1209]">{b.price}</span>
                  <span className="text-xs text-[#C9963A] bg-[#C9963A]/10 px-2.5 py-1">{b.savings}</span>
                </div>
                <Link
                  href={b.href}
                  className="block text-center bg-[#1A1209] text-white text-xs tracking-widest uppercase py-3.5 hover:bg-[#C9963A] transition-colors duration-300"
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
            className="text-sm text-[#1A1209] border-b border-[#1A1209] pb-0.5 hover:text-[#C9963A] hover:border-[#C9963A] transition-colors duration-200"
          >
            View All Bundles
          </Link>
        </div>
      </div>
    </section>
  );
}
