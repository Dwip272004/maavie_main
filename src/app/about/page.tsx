"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";

/* ── Scroll-reveal hook ───────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── Animated counter ─────────────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView(0.5);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(start);
    }, 20);
    return () => clearInterval(timer);
  }, [inView, to]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ── Founders data ────────────────────────────────────────────── */
const founders = [
  {
    id: "nupur",
    name: "Nupur Kaudan",
    role: "Founder",
    image: "/images/nupur.png",
    tagline: "She asked the question nobody was asking.",
    quote:
      "Indian women deserve skincare that was actually made for them — not reformulated for us as an afterthought.",
    story: [
      "Nupur spent over a decade in consumer wellness, watching as Indian women were handed the same products designed for different skin tones, different climates, and different hormonal realities — and told to be grateful.",
      "After her own experience watching her mother navigate perimenopause with zero guidance and ineffective products, Nupur began asking a question she couldn't stop thinking about: why does no brand in India actually understand a woman's skin through the stages of her life?",
      "She spent two years researching hormonal skin science alongside Indian dermatologists, studying the intersection of Ayurvedic tradition and clinical skincare, and building the formulation philosophy that would become Maavie.",
      "\"I wanted to build something that felt like it was finally listening,\" she says. \"Not just to skin concerns — but to the whole reality of being a woman whose body keeps changing.\"",
    ],
    facts: ["10+ years in consumer wellness", "2 years of formulation research", "Studied Ayurvedic + clinical skincare"],
  },
  {
    id: "shivani",
    name: "Shivani Magan",
    role: "Co-Founder",
    image: "/images/shivani.png",
    tagline: "She lived the problem Maavie was born to solve.",
    quote:
      "I kept thinking: why are mothers expected to just deal with this? That question became Maavie.",
    story: [
      "Shivani's journey to Maavie began during her first pregnancy. Almost overnight, she developed melasma — the kind of pigmentation that appears like a mask across the face — and suddenly realised that the skincare she had trusted for years was no longer safe to use.",
      "\"I spent hours reading ingredient labels, panicking in store aisles, and finding nothing that felt right,\" she remembers. \"Everything was either too harsh, or so watered-down it did nothing. And nobody was talking about this.\"",
      "She began documenting her experience, connecting with other women online, and realising the problem was universal. Postpartum hair loss, hormonal breakouts, unexpected dryness, sensitivity that came from nowhere — hundreds of women sharing the same confusion.",
      "Shivani brought that lived experience directly into Maavie's product development, ensuring every formula is tested specifically for the hormonal skin states women actually move through.",
    ],
    facts: ["Personal experience with hormonal melasma", "Community of 10,000+ mothers researched", "Led product safety testing"],
  },
];

/* ── Values data ──────────────────────────────────────────────── */
const values = [
  {
    num: "01",
    title: "Honesty First",
    body:
      "We tell you exactly what's in our products and why. No proprietary blends hiding inadequate doses. No marketing claims without clinical backing. Every ingredient earns its place.",
    color: "#F1E1DD",
  },
  {
    num: "02",
    title: "Made For Melanin",
    body:
      "Indian skin has specific needs — different pigmentation responses, different sensitivity profiles, different hormonal patterns. We formulate for the skin women in India actually have.",
    color: "#EAD1CB",
  },
  {
    num: "03",
    title: "Safe Through Every Stage",
    body:
      "Every formula is reviewed for safety during pregnancy, breastfeeding, perimenopause and menopause. We never ask you to choose between effective and safe.",
    color: "#F8F3EE",
  },
  {
    num: "04",
    title: "Community Over Commerce",
    body:
      "Maavie exists because women were not getting the support they needed. We invest in education, honest content and community — not just product launches.",
    color: "#F1E1DD",
  },
];

/* ── Timeline ─────────────────────────────────────────────────── */
const milestones = [
  { year: "2022", event: "Nupur begins two years of formulation research with Indian dermatologists." },
  { year: "2023", event: "Shivani joins as Co-Founder, bringing lived experience of hormonal skin change." },
  { year: "2024", event: "First three formulas complete clinical safety review. Community beta testing begins." },
  { year: "2025", event: "Maavie launches. 50,000+ women join the community in the first year." },
  { year: "2026", event: "Expanding the range with formulas for perimenopause, postpartum hair and scalp health." },
];

/* ══════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  const [activeFounder, setActiveFounder] = useState<"nupur" | "shivani">("nupur");
  const [heroDone, setHeroDone] = useState(false);
  const founder = founders.find((f) => f.id === activeFounder)!;

  const storyReveal = useInView();
  const valuesReveal = useInView();
  const timelineReveal = useInView();
  const statsReveal = useInView();
  const manifestoReveal = useInView();

  useEffect(() => {
    const t = setTimeout(() => setHeroDone(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main>
        {/* ── 1. HERO ──────────────────────────────────────────── */}
        <section className="relative w-full overflow-hidden bg-[#231F20]" style={{ minHeight: "90vh" }}>
          <Image
            src="/images/maavie-hero-banner.png"
            alt="Maavie — the women behind the brand"
            fill
            priority
            className="object-cover object-center opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#231F20]/60 via-transparent to-[#231F20]/80" />

          <div
            className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 flex flex-col items-center justify-center text-center"
            style={{ minHeight: "90vh" }}
          >
            <p
              className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#9D6E6B] mb-6 transition-all duration-700"
              style={{ opacity: heroDone ? 1 : 0, transform: heroDone ? "none" : "translateY(12px)" }}
            >
              Our Story
            </p>
            <h1
              className="text-white font-light leading-tight mb-8 transition-all duration-700 delay-150"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
                opacity: heroDone ? 1 : 0,
                transform: heroDone ? "none" : "translateY(20px)",
              }}
            >
              Built by women who lived<br />
              <em className="italic text-[#F1E1DD]">the problem.</em>
            </h1>
            <p
              className="text-white/70 text-lg font-light max-w-2xl leading-relaxed mb-12 transition-all duration-700 delay-300"
              style={{ opacity: heroDone ? 1 : 0, transform: heroDone ? "none" : "translateY(20px)" }}
            >
              Maavie was born from personal experience — from pregnancy, from melasma,
              from the quiet frustration of searching for skincare that understood a body that was changing.
            </p>
            <div
              className="flex gap-4 flex-wrap justify-center transition-all duration-700 delay-500"
              style={{ opacity: heroDone ? 1 : 0, transform: heroDone ? "none" : "translateY(20px)" }}
            >
              <a
                href="#founders"
                className="inline-block bg-white text-[#231F20] px-7 sm:px-9 py-4 text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-[#F1E1DD] transition-colors duration-200"
              >
                Meet the Founders
              </a>
              <Link
                href="/products"
                className="inline-block border border-white/40 text-white px-7 sm:px-9 py-4 text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-white/10 transition-colors duration-200"
              >
                Shop Now
              </Link>
            </div>

            {/* Scroll indicator */}
            <div
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-700"
              style={{ opacity: heroDone ? 0.5 : 0 }}
            >
              <span className="text-white text-[10px] tracking-[0.25em] uppercase">Scroll</span>
              <div className="w-px h-10 bg-white/40 animate-pulse" />
            </div>
          </div>
        </section>

        {/* ── 2. ORIGIN STORY ─────────────────────────────────── */}
        <section className="bg-white py-24" ref={storyReveal.ref}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: image */}
            <div
              className="relative aspect-[3/4] overflow-hidden transition-all duration-1000"
              style={{ opacity: storyReveal.inView ? 1 : 0, transform: storyReveal.inView ? "none" : "translateX(-40px)" }}
            >
              <Image
                src="/images/momportrait.png"
                alt="Maavie ingredients"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Floating badge */}
              <div className="absolute bottom-8 left-8 bg-[#590515] text-white px-6 py-4">
                <p className="text-[10px] tracking-[0.25em] uppercase text-white/70 mb-1">Founded</p>
                <p className="text-2xl font-light">2022</p>
              </div>
            </div>

            {/* Right: story */}
            <div
              className="transition-all duration-1000 delay-200"
              style={{ opacity: storyReveal.inView ? 1 : 0, transform: storyReveal.inView ? "none" : "translateX(40px)" }}
            >
              <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#9D6E6B] mb-5">
                How it began
              </p>
              <h2 className="text-3xl sm:text-4xl font-light text-[#231F20] leading-snug mb-8">
                The question that<br /><em className="italic">changed everything.</em>
              </h2>
              <div className="space-y-5 text-[#4F4242] text-base leading-relaxed">
                <p>
                  Two women. Two different experiences of the same invisible problem: a beauty industry that
                  had never genuinely designed for a woman&rsquo;s changing body.
                </p>
                <p>
                  One watched her mother struggle through perimenopause with products that didn&rsquo;t
                  understand her skin. The other developed melasma overnight during pregnancy and stood in
                  store aisles, reading ingredient labels in panic, finding nothing safe.
                </p>
                <p>
                  Both asked the same question, separately, and eventually together:
                </p>
                <blockquote className="border-l-2 border-[#590515] pl-6 py-2">
                  <p className="text-[#231F20] text-xl font-light italic leading-relaxed">
                    &ldquo;Why does no brand in India actually understand what a woman&rsquo;s skin needs as her body changes?&rdquo;
                  </p>
                </blockquote>
                <p>
                  Maavie is their answer. Built from research, lived experience, and the conviction that
                  Indian women deserve more than imported formulas designed for someone else.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. STATS BAR ────────────────────────────────────── */}
        <section className="bg-[#590515] py-14" ref={statsReveal.ref}>
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: 50000, suffix: "+", label: "Women in our community" },
              { value: 5, suffix: "", label: "Clinically reviewed formulas" },
              { value: 2, suffix: " yrs", label: "Of formulation research" },
              { value: 100, suffix: "%", label: "Hormone-safe ingredients" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-white text-3xl sm:text-4xl font-light mb-2">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="text-white/60 text-xs tracking-widest uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. FOUNDERS ─────────────────────────────────────── */}
        <section id="founders" className="bg-[#F8F3EE] py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10">
            <div className="text-center mb-16">
              <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#9D6E6B] mb-4">
                The People
              </p>
              <h2 className="text-3xl sm:text-4xl font-light text-[#231F20]">
                Meet the founders
              </h2>
            </div>

            {/* Tab switcher */}
            <div className="flex justify-center gap-3 mb-14">
              {founders.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFounder(f.id as "nupur" | "shivani")}
                  className={`px-8 py-3 text-[11px] font-semibold tracking-[0.18em] uppercase transition-all duration-300 ${
                    activeFounder === f.id
                      ? "bg-[#590515] text-white"
                      : "bg-white text-[#231F20] border border-[#E8DEDA] hover:border-[#9D6E6B]"
                  }`}
                >
                  {f.name}
                </button>
              ))}
            </div>

            {/* Founder card — animated swap */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[600px]">
              {/* Image panel */}
              <div className="relative overflow-hidden min-h-[420px] lg:min-h-0">
                <Image
                  key={founder.image}
                  src={founder.image}
                  alt={founder.name}
                  fill
                  className="object-cover object-top transition-opacity duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Overlay tag */}
                <div className="absolute top-8 left-8 bg-white px-5 py-3">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-[#9D6E6B]">{founder.role}</p>
                  <p className="text-base font-semibold text-[#231F20] mt-0.5">{founder.name}</p>
                </div>
              </div>

              {/* Content panel */}
              <div className="bg-white px-6 sm:px-10 lg:px-14 py-10 sm:py-14 flex flex-col justify-center">
                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#9D6E6B] mb-4">
                  {founder.tagline}
                </p>

                {/* Pull quote */}
                <blockquote className="border-l-2 border-[#590515] pl-6 mb-8">
                  <p className="text-xl font-light italic text-[#231F20] leading-snug">
                    &ldquo;{founder.quote}&rdquo;
                  </p>
                </blockquote>

                {/* Story paragraphs */}
                <div className="space-y-4 text-[#4F4242] text-sm leading-relaxed mb-8">
                  {founder.story.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* Quick facts */}
                <div className="border-t border-[#E8DEDA] pt-6 flex flex-col gap-2">
                  {founder.facts.map((fact) => (
                    <div key={fact} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#590515] shrink-0" />
                      <span className="text-xs text-[#4F4242] tracking-wide">{fact}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. MISSION STATEMENT ────────────────────────────── */}
        <section className="bg-[#590515] py-24 px-6" ref={manifestoReveal.ref}>
          <div
            className="max-w-4xl mx-auto text-center transition-all duration-1000"
            style={{
              opacity: manifestoReveal.inView ? 1 : 0,
              transform: manifestoReveal.inView ? "none" : "translateY(30px)",
            }}
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#F1E1DD]/60 mb-8">
              Our Mission
            </p>
            <p
              className="text-white font-light leading-relaxed"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)", lineHeight: "1.5" }}
            >
              To give every Indian woman skincare that was{" "}
              <em className="italic text-[#F1E1DD]">actually designed for her</em> — her skin tone, her
              hormonal reality, her life stage — and the honesty, knowledge and community to understand
              her changing body with{" "}
              <em className="italic text-[#F1E1DD]">confidence, not confusion.</em>
            </p>
          </div>
        </section>

        {/* ── 6. VALUES ────────────────────────────────────────── */}
        <section className="bg-white py-24" ref={valuesReveal.ref}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10">
            <div className="text-center mb-16">
              <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#9D6E6B] mb-4">
                What We Stand For
              </p>
              <h2 className="text-3xl sm:text-4xl font-light text-[#231F20]">
                Our values
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((v, i) => (
                <div
                  key={v.num}
                  className="group p-6 sm:p-10 cursor-default transition-all duration-700 hover:shadow-lg"
                  style={{
                    backgroundColor: v.color,
                    opacity: valuesReveal.inView ? 1 : 0,
                    transform: valuesReveal.inView ? "none" : "translateY(30px)",
                    transitionDelay: `${i * 120}ms`,
                  }}
                >
                  <p className="text-5xl font-light text-[#590515]/20 mb-4 group-hover:text-[#590515]/40 transition-colors duration-300">
                    {v.num}
                  </p>
                  <h3 className="text-xl font-semibold text-[#231F20] mb-4 group-hover:text-[#590515] transition-colors duration-300">
                    {v.title}
                  </h3>
                  <p className="text-[#4F4242] leading-relaxed text-sm">{v.body}</p>
                  {/* Animated underline */}
                  <div className="mt-6 h-0.5 bg-[#590515] w-0 group-hover:w-12 transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. TIMELINE ─────────────────────────────────────── */}
        <section className="bg-[#F8F3EE] py-24" ref={timelineReveal.ref}>
          <div className="max-w-4xl mx-auto px-6 sm:px-10">
            <div className="text-center mb-16">
              <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#9D6E6B] mb-4">
                The Journey
              </p>
              <h2 className="text-3xl sm:text-4xl font-light text-[#231F20]">
                How we got here
              </h2>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[18px] sm:left-1/2 top-0 bottom-0 w-px bg-[#E8DEDA] -translate-x-1/2" />

              <div className="flex flex-col gap-10">
                {milestones.map((m, i) => (
                  <div
                    key={m.year}
                    className={`flex items-start gap-8 sm:gap-0 transition-all duration-700`}
                    style={{
                      opacity: timelineReveal.inView ? 1 : 0,
                      transform: timelineReveal.inView ? "none" : "translateY(20px)",
                      transitionDelay: `${i * 150}ms`,
                    }}
                  >
                    {/* Mobile: left always; Desktop: alternating */}
                    <div className={`w-full sm:w-1/2 ${i % 2 === 0 ? "pl-10 sm:pl-0 sm:pr-12 sm:text-right" : "pl-10 sm:pl-12 sm:ml-auto"}`}>
                      <div className={`inline-block bg-white p-6 shadow-sm relative ${i % 2 === 0 ? "" : ""}`}>
                        <p className="text-[#590515] text-[11px] font-bold tracking-[0.2em] uppercase mb-2">
                          {m.year}
                        </p>
                        <p className="text-[#231F20] text-sm leading-relaxed">{m.event}</p>
                      </div>
                    </div>

                    {/* Dot on the line */}
                    <div className="absolute left-[18px] sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#590515] border-4 border-[#F8F3EE] mt-4" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. SPLIT CTA ────────────────────────────────────── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 min-h-[420px]">
          {/* Left: shop */}
          <div className="relative overflow-hidden group">
            <Image
              src="/images/maavie-oil-hand.png"
              alt="Shop Maavie"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-[#231F20]/50 group-hover:bg-[#231F20]/40 transition-colors duration-500" />
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-10 py-16 min-h-[320px]">
              <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/60 mb-4">
                Our Products
              </p>
              <h3 className="text-2xl sm:text-3xl font-light text-white mb-6">
                Made for your<br /><em className="italic">changing body.</em>
              </h3>
              <Link
                href="/products"
                className="inline-block bg-white text-[#231F20] px-8 py-3.5 text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-[#F1E1DD] transition-colors duration-200"
              >
                Shop All Products
              </Link>
            </div>
          </div>

          {/* Right: community */}
          <div className="bg-[#590515] flex flex-col items-center justify-center text-center px-10 py-16">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#F1E1DD]/60 mb-4">
              Join Us
            </p>
            <h3 className="text-2xl sm:text-3xl font-light text-white mb-6">
              You don&rsquo;t have to<br /><em className="italic text-[#F1E1DD]">figure this out alone.</em>
            </h3>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs mb-8">
              50,000+ Indian women are talking honestly about hormonal skin, hair and body changes.
              Come find your people.
            </p>
            <Link
              href="https://wa.me/message/maavie"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-white text-white px-8 py-3.5 text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-white hover:text-[#590515] transition-colors duration-200"
            >
              Join Our Community
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
