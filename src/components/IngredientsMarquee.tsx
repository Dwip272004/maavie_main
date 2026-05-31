import Image from "next/image";
import Link from "next/link";

/* ── Data from Maavie_Website_Copy_v2.docx ──────────────────── */
const row1 = [
  { name: "Mulberry Root",       benefit: "Fades hormonal pigmentation",       symbol: "✦" },
  { name: "Bakuchiol",           benefit: "Safe retinol alternative in pregnancy", symbol: "◎" },
  { name: "Licorice Root",       benefit: "Calms & brightens reactive skin",    symbol: "◇" },
  { name: "Centella Asiatica",   benefit: "Strengthens & soothes the skin barrier", symbol: "✦" },
  { name: "Fermented Rice Water",benefit: "Brightens & softens depleted skin",  symbol: "◎" },
  { name: "Mugwort",             benefit: "Traditional herb for sensitive skin", symbol: "◇" },
  { name: "Pine Bark Extract",   benefit: "Antioxidant support for elasticity", symbol: "✦" },
  { name: "Turmeric",            benefit: "Anti-inflammatory radiance booster",  symbol: "◎" },
];

const row2 = [
  { name: "Squalane",            benefit: "Deep moisture without heaviness",     symbol: "◇" },
  { name: "Niacinamide",         benefit: "Minimises pores & evens skin tone",   symbol: "✦" },
  { name: "Hyaluronic Acid",     benefit: "Multi-level hydration",               symbol: "◎" },
  { name: "Rosehip Seed Oil",    benefit: "Rich in vitamins A & C",              symbol: "◇" },
  { name: "Ginger Root",         benefit: "Circulation & scalp stimulation",     symbol: "✦" },
  { name: "Argan Oil",           benefit: "Nourishes hair & skin deeply",        symbol: "◎" },
  { name: "Vitamin C (stabilised)", benefit: "Brightens & protects against pigmentation", symbol: "◇" },
  { name: "Peptides",            benefit: "Supports collagen in maturing skin",  symbol: "✦" },
];

/* ── Single scrolling strip ─────────────────────────────────── */
function Strip({
  items,
  direction = "left",
  dark = false,
}: {
  items: typeof row1;
  direction?: "left" | "right";
  dark?: boolean;
}) {
  /* duplicate for seamless loop */
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden w-full" style={{ cursor: "default" }}>
      <div
        className={direction === "left" ? "animate-marquee" : "animate-marquee-reverse"}
        style={{ display: "flex", width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="flex items-center shrink-0 px-8 group"
          >
            {/* Symbol */}
            <span
              className="text-lg mr-3 transition-colors duration-300"
              style={{ color: dark ? "#9D6E6B" : "#590515" }}
            >
              {item.symbol}
            </span>

            {/* Name */}
            <span
              className="text-sm font-semibold tracking-[0.15em] uppercase whitespace-nowrap transition-colors duration-300"
              style={{ color: dark ? "#FFFFFF" : "#231F20" }}
            >
              {item.name}
            </span>

            {/* Benefit — revealed on hover (via group) */}
            <span
              className="ml-2 text-xs tracking-wide whitespace-nowrap transition-all duration-300 max-w-0 overflow-hidden group-hover:max-w-xs"
              style={{ color: dark ? "#9D6E6B" : "#9D6E6B" }}
            >
              &nbsp;— {item.benefit}
            </span>

            {/* Separator */}
            <span
              className="ml-8 text-lg"
              style={{ color: dark ? "#590515" : "#E8DEDA" }}
            >
              |
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
export default function IngredientsMarquee() {
  return (
    <section className="bg-white overflow-hidden">

      {/* ── Wide band header with botanical image background ── */}
      <div className="relative w-full overflow-hidden">
        {/* Background image — cropped to a band via fixed height */}
        <div className="absolute inset-0">
          <Image
            src="/images/maavie-ingredients-flat.png"
            alt="Maavie botanical ingredients"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-[#231F20]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#231F20]/80 via-[#231F20]/40 to-transparent" />

        {/* Text content — padding defines the band height */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-20 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#9D6E6B] mb-4">
              What&rsquo;s Inside
            </p>
            <h2
              className="text-white font-light leading-tight mb-5"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 3rem)" }}
            >
              Every ingredient has<br />
              <em className="italic text-[#F1E1DD]">a reason to be there.</em>
            </h2>
            <p className="text-white/70 text-base leading-relaxed max-w-xl">
              Every active in a Maavie formula is backed by clinical research and chosen
              specifically for skin that changes with hormones.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/about"
              className="inline-block border border-white/50 text-white px-9 py-4 text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-white hover:text-[#231F20] transition-colors duration-200 whitespace-nowrap"
            >
              Our Philosophy
            </Link>
          </div>
        </div>
      </div>

      {/* ── Row 1 — light background, moves left ──────────── */}
      <div className="bg-[#F8F3EE] py-5 border-t border-b border-[#E8DEDA]">
        <Strip items={row1} direction="left" dark={false} />
      </div>

      {/* ── Spotlight card — 5 hero ingredients ───────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              name: "Mulberry Root",
              icon: "🌿",
              tagline: "For the dark patches that seemed to appear overnight.",
              desc: "Reduces pigmentation gently — safe for hormonal, sensitive skin.",
              bg: "#F8F3EE",
            },
            {
              name: "Bakuchiol",
              icon: "🌸",
              tagline: "The plant-based alternative to retinol loved during pregnancy.",
              desc: "Smooths, brightens and renews — without the harshness.",
              bg: "#F1E1DD",
            },
            {
              name: "Licorice Root",
              icon: "🌾",
              tagline: "A calming botanical used for centuries.",
              desc: "Reduces pigmentation while strengthening the skin barrier.",
              bg: "#EAD1CB",
            },
            {
              name: "Centella Asiatica",
              icon: "🍃",
              tagline: "Known across Asia as a healing herb for generations.",
              desc: "Calms inflammation, strengthens skin and supports collagen naturally.",
              bg: "#F1E1DD",
            },
            {
              name: "Fermented Rice Water",
              icon: "✨",
              tagline: "An ancient Korean ritual reimagined for modern skin.",
              desc: "Brightens, softens and supports depleted skin barriers.",
              bg: "#F8F3EE",
            },
          ].map((ing) => (
            <div
              key={ing.name}
              className="group p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              style={{ backgroundColor: ing.bg }}
            >
              <span className="text-3xl">{ing.icon}</span>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#590515]">
                {ing.name}
              </p>
              <p className="text-sm font-medium text-[#231F20] leading-snug">
                {ing.tagline}
              </p>
              <p className="text-xs text-[#4F4242] leading-relaxed flex-1">
                {ing.desc}
              </p>
              {/* Hover bar */}
              <div className="h-0.5 bg-[#590515] w-0 group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* ── Row 2 — dark background, moves right ──────────── */}
      <div className="bg-[#231F20] py-5">
        <Strip items={row2} direction="right" dark={true} />
      </div>

      {/* ── Bottom CTA strip ──────────────────────────────── */}
      <div className="bg-[#590515] py-10 px-6 text-center">
        <p className="text-white/70 text-xs tracking-[0.25em] uppercase mb-3">
          Clinically reviewed · Hormone-safe · Made for Indian skin
        </p>
        <p className="text-white text-base font-light">
          Every active in a Maavie formula has a reason to be there — and a clinical study to back it up.
        </p>
      </div>

    </section>
  );
}
