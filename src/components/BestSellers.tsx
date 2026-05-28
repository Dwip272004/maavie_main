import Image from "next/image";
import Link from "next/link";

const products = [
  {
    name: "Hanbang Hair Genesis Serum",
    image: "/images/maavie-product-serum.png",
    href: "/products/hair-genesis-serum",
  },
  {
    name: "Golden Body Oil",
    image: "/images/maavie-serum-dropper.png",
    href: "/products/golden-body-oil",
  },
  {
    name: "Radiance Face Elixir",
    image: "/images/maavie-ingredients-botanical.png",
    href: "/products/radiance-face-elixir",
  },
  {
    name: "Scalp Revival Oil",
    image: "/images/maavie-ingredients-pine.png",
    href: "/products/scalp-revival-oil",
  },
];

export default function BestSellers() {
  return (
    <section className="bg-white overflow-hidden" style={{ padding: "67px 0 80px" }}>
      <div className="max-w-[1340px] mx-auto px-6 sm:px-10">
        <div className="text-center mb-[67px]">
          <h2 className="text-[40px] leading-[48px] font-light text-[#231F20]">
            The formulas women keep coming back for.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {products.map((p) => (
            <Link key={p.name} href={p.href} className="group block relative overflow-hidden">
              {/* Portrait image — 2:3 ratio */}
              <div className="relative w-full" style={{ paddingBottom: "150%" }}>
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                {/* Dark gradient at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/60 to-transparent" />
                {/* Product name overlay */}
                <p className="absolute bottom-7 left-0 right-0 text-white font-bold text-center text-xl sm:text-[25px] leading-[30px] px-5 z-10">
                  {p.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
