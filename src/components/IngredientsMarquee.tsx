import Image from "next/image";
import Link from "next/link";

const ingredients = [
  {
    name: "Mulberry Root",
    tagline: "Fades hormonal pigmentation",
    image: "/images/maavie-woman-back.png",
    bg: null,
  },
  {
    name: "Bakuchiol",
    tagline: "Safe retinol, pregnancy-friendly",
    image: null,
    bg: "#590515",
  },
  {
    name: "Licorice Root",
    tagline: "Calms & brightens reactive skin",
    image: "/images/maavie-ingredients-botanical.png",
    bg: null,
  },
  {
    name: "Centella Asiatica",
    tagline: "Strengthens the skin barrier",
    image: null,
    bg: "#EAD1CB",
  },
  {
    name: "Fermented Rice Water",
    tagline: "Brightens & softens depleted skin",
    image: "/images/maavie-korean-wave.png",
    bg: null,
  },
  {
    name: "Pine Bark Extract",
    tagline: "Antioxidant support for elasticity",
    image: null,
    bg: "#4F4242",
  },
  {
    name: "Turmeric",
    tagline: "Anti-inflammatory radiance booster",
    image: "/images/maavie-turmeric-powder.png",
    bg: null,
  },
  {
    name: "Squalane",
    tagline: "Deep moisture without heaviness",
    image: null,
    bg: "#9D6E6B",
  },
  {
    name: "Niacinamide",
    tagline: "Evens skin tone & minimises pores",
    image: "/images/maavie-serum-dropper.png",
    bg: null,
  },
  {
    name: "Hyaluronic Acid",
    tagline: "Multi-level hydration",
    image: null,
    bg: "#590515",
  },
  {
    name: "Rosehip Seed Oil",
    tagline: "Rich in vitamins A & C",
    image: "/images/maavie-woman-oil.png",
    bg: null,
  },
  {
    name: "Mugwort",
    tagline: "Soothes sensitive & hormonal skin",
    image: null,
    bg: "#F1E1DD",
  },
  {
    name: "Vitamin C",
    tagline: "Brightens & fights pigmentation",
    image: "/images/maavie-ingredients-flat.png",
    bg: null,
  },
  {
    name: "Peptides",
    tagline: "Supports collagen in maturing skin",
    image: null,
    bg: "#231F20",
  },
];

const DARK_BG = new Set(["#590515", "#4F4242", "#231F20", "#9D6E6B"]);

function Card({ ing }: { ing: (typeof ingredients)[0] }) {
  const isDark = ing.bg ? DARK_BG.has(ing.bg) : false;

  const nameColor = isDark ? "#F1E1DD" : "#590515";
  const taglineColor = isDark ? "rgba(255,255,255,0.65)" : "#4F4242";

  return (
    <div
      className="shrink-0 relative overflow-hidden group"
      style={{ width: "220px", height: "310px" }}
    >
      {ing.image ? (
        <>
          <Image
            src={ing.image}
            alt={ing.name}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            sizes="220px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a0a]/80 via-[#231F20]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="text-[9px] font-bold tracking-[0.28em] uppercase text-[#9D6E6B] mb-1.5">
              {ing.name}
            </p>
            <p className="text-[13px] font-light text-white leading-snug">
              {ing.tagline}
            </p>
          </div>
        </>
      ) : (
        <div
          className="absolute inset-0 flex flex-col justify-end p-5"
          style={{ backgroundColor: ing.bg! }}
        >
          {/* Decorative initial */}
          <span
            className="absolute top-5 left-5 leading-none select-none pointer-events-none"
            style={{
              fontSize: "88px",
              fontFamily: "Georgia, serif",
              fontWeight: 700,
              color: nameColor,
              opacity: 0.07,
              lineHeight: 1,
            }}
          >
            {ing.name[0]}
          </span>
          {/* Subtle rule */}
          <div
            className="mb-3"
            style={{ width: "20px", height: "1px", backgroundColor: nameColor, opacity: 0.35 }}
          />
          <p
            className="text-[9px] font-bold tracking-[0.28em] uppercase mb-1.5"
            style={{ color: nameColor }}
          >
            {ing.name}
          </p>
          <p className="text-[13px] font-light leading-snug" style={{ color: taglineColor }}>
            {ing.tagline}
          </p>
        </div>
      )}
    </div>
  );
}

export default function IngredientsMarquee() {
  const doubled = [...ingredients, ...ingredients];

  return (
    <section className="bg-[#F8F3EE] overflow-hidden">

      {/* ── Header ── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 pt-20 pb-12 text-center">
        <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#590515] mb-4">
          What&rsquo;s Inside
        </p>
        <h2
          className="text-[#231F20] font-light leading-tight mb-5"
          style={{ fontSize: "clamp(1.9rem, 3.5vw, 3rem)" }}
        >
          Every ingredient has<br />
          <em className="italic text-[#9D6E6B]">a reason to be there.</em>
        </h2>
        <p className="text-[#4F4242] text-base font-light leading-relaxed max-w-2xl mx-auto">
          Every active in a Maavie formula is backed by clinical research and chosen
          specifically for skin that changes with hormones.
        </p>
      </div>

      {/* ── Scrolling carousel ── */}
      <div className="overflow-hidden w-full" style={{ cursor: "default" }}>
        <div
          className="animate-marquee"
          style={{ display: "flex", gap: "2px", width: "max-content" }}
        >
          {doubled.map((ing, i) => (
            <Card key={`${ing.name}-${i}`} ing={ing} />
          ))}
        </div>
      </div>

      {/* ── CTA strip ── */}
      <div className="text-center py-14 px-6 border-t border-[#E8DEDA] mt-14">
        <p className="text-[#9D6E6B] text-[10px] tracking-[0.28em] uppercase mb-5">
          Clinically reviewed &nbsp;·&nbsp; Hormone-safe &nbsp;·&nbsp; Made for Indian skin
        </p>
        <Link
          href="/waitlist"
          className="inline-block bg-[#590515] text-white px-9 py-4 text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-[#450110] transition-colors duration-200"
        >
          Join the Waitlist
        </Link>
      </div>

    </section>
  );
}
