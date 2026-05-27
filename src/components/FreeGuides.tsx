import Link from "next/link";
import Image from "next/image";

const guides = [
  {
    title: "The Hanbang Starter Guide",
    description: "Everything you need to know about Korean herbal skincare — the herbs, the rituals, and how to use them.",
    cta: "Download Free",
    href: "/guides/hanbang-starter",
    icon: "🌿",
  },
  {
    title: "Hair Loss & Thinning: A Deep Dive",
    description: "Understand the root causes of hair loss and how hanbang botanicals can help restore your hair's vitality.",
    cta: "Download Free",
    href: "/guides/hair-loss",
    icon: "✦",
  },
  {
    title: "Skincare by Life Stage",
    description: "From your 20s to your 60s, discover how your skin changes and the right formulas for every decade.",
    cta: "Download Free",
    href: "/guides/life-stage",
    icon: "◎",
  },
];

export default function FreeGuides() {
  return (
    <section className="py-20 bg-[#FDFAF5]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/maavie-ingredients-flat.png"
              alt="Hanbang guides"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-[#C9963A]/10" />
            <div className="absolute bottom-6 left-6 right-6 bg-[#1A1209]/80 backdrop-blur-sm p-6 text-white">
              <p className="text-xs tracking-[0.3em] uppercase text-[#E8D5A3] mb-2">
                Free Knowledge
              </p>
              <p className="text-2xl font-light">3 expert guides.<br />Yours for free.</p>
            </div>
          </div>

          {/* Text side */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#C9963A] mb-5">
              Knowledge Centre
            </p>
            <h2 className="text-3xl sm:text-4xl font-light text-[#1A1209] mb-4 leading-snug">
              Knowledge is yours.<br />
              <em className="italic">Always free.</em>
            </h2>
            <p className="text-[#7A6A57] leading-relaxed mb-10">
              We believe education is the most powerful skincare tool of all. Our free guides are
              written by our expert panel and grounded in both traditional hanbang wisdom and
              modern clinical research.
            </p>

            <div className="flex flex-col gap-6">
              {guides.map((g) => (
                <div key={g.title} className="flex gap-5 items-start">
                  <span className="text-2xl text-[#C9963A] shrink-0 mt-0.5">{g.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-base font-medium text-[#1A1209] mb-1">{g.title}</h3>
                    <p className="text-sm text-[#7A6A57] leading-relaxed mb-2">{g.description}</p>
                    <Link
                      href={g.href}
                      className="text-sm text-[#C9963A] border-b border-[#C9963A]/40 pb-0.5 hover:border-[#C9963A] transition-colors"
                    >
                      {g.cta} →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
