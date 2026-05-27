import Image from "next/image";
import Link from "next/link";

const products = [
  {
    name: "Hanbang Hair Genesis Serum",
    price: "$68",
    originalPrice: null,
    image: "/images/maavie-product-serum.png",
    href: "/products/hair-genesis-serum",
    badge: "Bestseller",
    description: "Clinically proven to reduce hair loss by 47% in 8 weeks.",
    stars: 4.9,
    reviews: 312,
  },
  {
    name: "Golden Body Oil",
    price: "$54",
    originalPrice: null,
    image: "/images/maavie-serum-dropper.png",
    href: "/products/golden-body-oil",
    badge: "Fan Favourite",
    description: "Luminous skin from the inside out — turmeric, ginger & argan.",
    stars: 4.8,
    reviews: 287,
  },
  {
    name: "Radiance Face Elixir",
    price: "$62",
    originalPrice: null,
    image: "/images/maavie-woman-back.png",
    href: "/products/radiance-face-elixir",
    badge: null,
    description: "Brightening elixir with 5 hanbang botanicals for visible clarity.",
    stars: 4.7,
    reviews: 198,
  },
  {
    name: "Scalp Revival Oil",
    price: "$48",
    originalPrice: "$60",
    image: "/images/maavie-ingredients-pine.png",
    href: "/products/scalp-revival-oil",
    badge: "Sale",
    description: "Rebalance and energise your scalp with mugwort & pine bark.",
    stars: 4.8,
    reviews: 154,
  },
];

function Stars({ count, reviews }: { count: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1.5 mt-1">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-3 h-3 ${i < Math.round(count) ? "text-[#C9963A]" : "text-[#E8D5A3]"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-xs text-[#7A6A57]">
        {count} ({reviews})
      </span>
    </div>
  );
}

export default function BestSellers() {
  return (
    <section className="py-20 bg-[#FDFAF5]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#C9963A] mb-3">
              Most Loved
            </p>
            <h2 className="text-3xl sm:text-4xl font-light text-[#1A1209]">
              The formulas people keep coming back for
            </h2>
          </div>
          <Link
            href="/products"
            className="text-sm text-[#1A1209] border-b border-[#1A1209] pb-0.5 hover:text-[#C9963A] hover:border-[#C9963A] transition-colors duration-200 shrink-0"
          >
            Shop All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <div key={p.name} className="group">
              {/* Image */}
              <Link href={p.href} className="block relative overflow-hidden aspect-square bg-[#F5EDE0]">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {p.badge && (
                  <span
                    className={`absolute top-3 left-3 text-[10px] tracking-widest uppercase px-2.5 py-1 ${
                      p.badge === "Sale"
                        ? "bg-[#1A1209] text-[#E8D5A3]"
                        : "bg-[#C9963A] text-white"
                    }`}
                  >
                    {p.badge}
                  </span>
                )}
                {/* Quick add overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-[#1A1209] text-white text-xs tracking-widest uppercase py-3 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  Quick Add
                </div>
              </Link>

              {/* Info */}
              <div className="pt-4">
                <Link href={p.href}>
                  <h3 className="text-sm font-medium text-[#1A1209] hover:text-[#C9963A] transition-colors">
                    {p.name}
                  </h3>
                </Link>
                <Stars count={p.stars} reviews={p.reviews} />
                <p className="text-xs text-[#7A6A57] mt-2 leading-relaxed">{p.description}</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-base font-medium text-[#1A1209]">{p.price}</span>
                  {p.originalPrice && (
                    <span className="text-sm text-[#7A6A57] line-through">{p.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
