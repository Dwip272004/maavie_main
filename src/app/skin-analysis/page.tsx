"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";

/* ── Types ─────────────────────────────────────────────────── */
type Mode = "landing" | "quiz";
type QuizStep = "stage" | "age" | "skintype" | "concerns" | "lifestyle" | "analyzing" | "results";

interface QuizData {
  stage: string; age: string; skinType: string;
  sunExposure: string; sleep: string; stress: string;
}

/* ── Quiz content ───────────────────────────────────────────── */
const STAGES = [
  { id: "ttc",           label: "Trying to Conceive",    icon: "◎", desc: "Your body is already preparing. Gentle, safe care starts now." },
  { id: "pregnancy",     label: "Pregnancy & Postpartum", icon: "✦", desc: "Hormones are surging. Skin changes feel relentless and sudden." },
  { id: "perimenopause", label: "Perimenopause",          icon: "◇", desc: "Fluctuating hormones, unpredictable skin. One week dry, the next breaking out." },
  { id: "menopause",     label: "Menopause",              icon: "⊕", desc: "Oestrogen is declining. Skin needs richer, more restorative support." },
];
const AGES = ["Under 25", "25–34", "35–44", "45–54", "55+"];
const SKIN_TYPES = [
  { id: "oily",        label: "Oily",        desc: "Shiny by midday, visible pores, prone to breakouts" },
  { id: "dry",         label: "Dry",         desc: "Tight, sometimes flaky or rough to the touch" },
  { id: "combination", label: "Combination", desc: "Oily T-zone, drier or normal cheeks" },
  { id: "normal",      label: "Normal",      desc: "Mostly balanced, rarely reactive" },
  { id: "sensitive",   label: "Sensitive",   desc: "Easily irritated, prone to redness or stinging" },
];
const CONCERNS = [
  { id: "pigmentation", label: "Hormonal Pigmentation", desc: "Dark patches, melasma, uneven tone" },
  { id: "dryness",      label: "Dryness & Dehydration", desc: "Tight, dull, depleted skin" },
  { id: "breakouts",    label: "Hormonal Breakouts",    desc: "Adult acne linked to your cycle or hormones" },
  { id: "sensitivity",  label: "Sensitivity",           desc: "Redness, stinging, reactive skin" },
  { id: "ageing",       label: "Fine Lines & Firmness", desc: "Loss of bounce, visible lines" },
  { id: "hair",         label: "Hair Thinning",         desc: "Shedding, weakening, loss of fullness" },
  { id: "tone",         label: "Uneven Skin Tone",      desc: "Dullness, discolouration, lack of radiance" },
  { id: "scars",        label: "Stretch Marks & Scars", desc: "Postpartum marks, textural concerns" },
];
const ANALYZING_MESSAGES = [
  "Reading your hormonal profile...",
  "Mapping your life stage...",
  "Identifying your key actives...",
  "Building your morning routine...",
  "Finalising your evening routine...",
];
const QUIZ_STEPS: QuizStep[] = ["stage", "age", "skintype", "concerns", "lifestyle"];
const PREV_STEP: Partial<Record<QuizStep, QuizStep>> = {
  age: "stage", skintype: "age", concerns: "skintype", lifestyle: "concerns",
};

/* ── Results engine ─────────────────────────────────────────── */
function buildResults(data: Partial<QuizData>, concerns: string[]) {
  const byStage: Record<string, { headline: string; profile: string; summary: string; morning: string[]; evening: string[]; ingredients: string[] }> = {
    ttc: {
      headline: "Pre-Conception Skin Prep",
      profile: "Hormonal Sensitivity — Trying to Conceive",
      summary: "Your body is already shifting hormonally before conception, and your skin is responding. This is the moment to establish a safe, effective baseline — formulas that nurture without any risk.",
      morning: ["Gentle milky cleanser", "Vitamin C (stabilised) brightening serum", "Niacinamide balancing treatment", "Lightweight hydrating moisturiser", "Broad-spectrum SPF 30+"],
      evening: ["Gentle milky cleanser", "Niacinamide serum", "Hyaluronic Acid hydrating essence", "Barrier-repair moisturiser"],
      ingredients: ["Vitamin C (stabilised)", "Niacinamide", "Hyaluronic Acid", "Squalane", "Centella Asiatica"],
    },
    pregnancy: {
      headline: "Pregnancy-Safe Hormonal Support",
      profile: "Hormonal Pigmentation — Pregnancy & Postpartum",
      summary: "Rising oestrogen and progesterone are triggering real, visible skin changes — pigmentation, sensitivity, sudden dryness. You need formulas that are both genuinely effective and completely safe for this season.",
      morning: ["Gentle cleanse", "Mulberry Root brightening serum", "Bakuchiol renewal treatment", "Rich moisturiser", "SPF 50+ (essential daily)"],
      evening: ["Gentle cleanse", "Centella Asiatica calming serum", "Fermented Rice Water brightening essence", "Nourishing night moisturiser"],
      ingredients: ["Mulberry Root", "Bakuchiol", "Centella Asiatica", "Fermented Rice Water", "Licorice Root"],
    },
    perimenopause: {
      headline: "Hormonal Transition Support",
      profile: "Oestrogen Fluctuation — Perimenopause",
      summary: "Fluctuating oestrogen means your skin changes week to week — dryness one day, breakouts the next. Your routine needs to balance, not just treat single symptoms in isolation.",
      morning: ["Balancing gel-cream cleanse", "Licorice Root pigmentation serum", "Peptide firming moisturiser", "SPF 30+"],
      evening: ["Balancing cleanse", "Niacinamide pore-refining treatment", "Peptide repair serum", "Rich barrier-support night cream"],
      ingredients: ["Licorice Root", "Peptides", "Niacinamide", "Squalane", "Pine Bark Extract"],
    },
    menopause: {
      headline: "Deep Renewal & Replenishment",
      profile: "Oestrogen Decline — Menopause",
      summary: "Declining oestrogen means your skin produces less collagen, retains less moisture, and is more vulnerable to environmental damage. Richer, more restorative formulas are now non-negotiable.",
      morning: ["Hydrating cream cleanse", "Vitamin C + Peptide brightening serum", "Rich collagen-support moisturiser", "SPF 50+"],
      evening: ["Hydrating cleanse", "Rosehip Seed Oil restorative treatment", "Peptide collagen serum", "Overnight nourishing cream"],
      ingredients: ["Peptides", "Rosehip Seed Oil", "Hyaluronic Acid", "Pine Bark Extract", "Squalane"],
    },
  };
  const base = byStage[data.stage ?? "pregnancy"];
  const extraNotes: string[] = [];
  if (concerns.includes("pigmentation")) extraNotes.push("Mulberry Root and Licorice Root are your two most important brightening actives — both are clinically safe for hormonal skin.");
  if (concerns.includes("hair"))         extraNotes.push("Ginger Root and Argan Oil support scalp circulation and strengthen hair from root to tip.");
  if (concerns.includes("sensitivity"))  extraNotes.push("Mugwort and Centella Asiatica are your barrier-builders — prioritise both morning and evening.");
  if (concerns.includes("dryness"))      extraNotes.push("Squalane and Fermented Rice Water work together to restore the moisture your hormones are depleting.");
  if (concerns.includes("ageing"))       extraNotes.push("Peptides support collagen at a cellular level — start using them now, not when lines appear.");
  return { ...base, extraNotes };
}

/* ── FAQ Accordion ──────────────────────────────────────────── */
const FAQS = [
  { q: "Is the Maavie AI Skin Analysis right for me?",             a: "Yes — if you're a woman navigating any hormonal life stage (trying to conceive, pregnant, postpartum, perimenopausal or menopausal) and you're looking for skincare that was actually designed for your body, this tool is built for you. Our analysis is tailored specifically to Indian skin and hormonal skin change." },
  { q: "How long does the analysis take?",                       a: "Most people complete it in under 2 minutes. There are 5 short questions covering your life stage, skin type, concerns and a few lifestyle factors — then your personalised routine is ready instantly." },
  { q: "Do I need to create an account or download an app?",     a: "No. The Maavie AI Skin Analysis runs entirely in your browser — no account, no app, no sign-up required. Just answer the questions and get your results." },
  { q: "Can I save my results?",                                  a: "Yes — when you join the Maavie waitlist, we'll save your skin profile so that your personalised routine is ready the moment our products launch. You can also screenshot or note your results." },
  { q: "What happens after I get my results?",                   a: "You'll see a personalised morning and evening routine, your key active ingredients, and notes specific to your concerns. You can then join the waitlist to be notified when your exact Maavie products are available." },
  { q: "Is there a selfie or photo upload required?",             a: "No — our analysis is based on your answers about your hormonal stage and skin profile. We believe the most accurate data comes from how you experience your skin, not just a photo. A photo-analysis feature is planned for a future update." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#E8DEDA] last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left flex justify-between items-center py-5 sm:py-6 gap-4"
      >
        <span className="text-sm sm:text-base font-medium text-[#231F20] leading-snug">{q}</span>
        <span
          className="shrink-0 w-6 h-6 rounded-full border border-[#E8DEDA] flex items-center justify-center text-[#590515] transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "none" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      {open && (
        <p className="text-sm text-[#4F4242] leading-relaxed pb-6 pr-8">{a}</p>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
export default function SkinAnalysisPage() {
  const [mode, setMode]         = useState<Mode>("landing");
  const [quizStep, setQuizStep] = useState<QuizStep>("stage");
  const [visible, setVisible]   = useState(true);
  const [data, setData]         = useState<Partial<QuizData>>({});
  const [concerns, setConcerns] = useState<string[]>([]);
  const [analyzeIdx, setAnalyzeIdx] = useState(0);

  const goTo = useCallback((next: QuizStep) => {
    setVisible(false);
    setTimeout(() => { setQuizStep(next); setVisible(true); }, 260);
  }, []);

  const startQuiz = () => {
    setMode("quiz");
    setQuizStep("stage");
    setData({});
    setConcerns([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (quizStep !== "analyzing") return;
    setAnalyzeIdx(0);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setAnalyzeIdx(i);
      if (i >= ANALYZING_MESSAGES.length - 1) {
        clearInterval(iv);
        setTimeout(() => {
          setVisible(false);
          setTimeout(() => { setQuizStep("results"); setVisible(true); }, 260);
        }, 900);
      }
    }, 750);
    return () => clearInterval(iv);
  }, [quizStep]);

  const qIdx     = QUIZ_STEPS.indexOf(quizStep);
  const progress = qIdx >= 0 ? Math.round(((qIdx + 1) / QUIZ_STEPS.length) * 100) : 0;
  const results  = quizStep === "results" ? buildResults(data, concerns) : null;

  const cardCls = (sel: boolean) =>
    `text-left border-2 transition-all duration-200 cursor-pointer ${
      sel ? "border-[#590515] bg-[#F8F3EE]" : "border-[#E8DEDA] bg-white hover:border-[#9D6E6B] hover:bg-[#faf7f5]"
    }`;

  /* ════════════════════════════════════════
     LANDING PAGE
  ════════════════════════════════════════ */
  if (mode === "landing") return (
    <>
      <AnnouncementBar />
      <Header />
      <main>

        {/* ── 1. HERO ── */}
        <section className="bg-white overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[88vh]">

            {/* Left — text */}
            <div className="w-full lg:w-1/2 flex items-center px-6 sm:px-12 lg:px-16 xl:px-20 py-16 sm:py-20">
              <div className="max-w-[540px]">
                <p className="text-[11px] font-semibold tracking-[0.32em] uppercase text-[#590515] mb-6">
                  Maavie AI Skin Analysis
                </p>
                <h1
                  className="text-[#231F20] font-light leading-[1.04] mb-6"
                  style={{ fontSize: "clamp(2rem, 3.8vw, 3.5rem)" }}
                >
                  Developed with<br />
                  Dermatologists.<br />
                  <em className="italic text-[#9D6E6B]">Powered by Intelligent<br />Formulation.</em>
                </h1>
                <p className="text-[#4F4242] text-base sm:text-lg font-light leading-relaxed mb-10">
                  A personalised skin analysis tool that builds a complete hormonal skincare
                  routine — made specifically for Indian women and every stage of womanhood.
                </p>
                <button
                  onClick={startQuiz}
                  className="inline-block bg-[#590515] text-white px-12 py-4 text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-[#450110] transition-colors duration-200 mb-5"
                >
                  Start Your Analysis
                </button>
                <p className="text-[#9D6E6B] text-[10px] tracking-[0.2em] uppercase">
                  5 questions &nbsp;·&nbsp; Under 2 minutes &nbsp;·&nbsp; No sign-up needed
                </p>
              </div>
            </div>

            {/* Right — hero image with analysis overlay */}
            <div className="relative w-full lg:w-1/2 min-h-[420px] lg:min-h-0 overflow-hidden bg-[#EAD1CB]">
              <Image
                src="/images/maavie-woman-oil.png"
                alt="Maavie skin analysis"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#590515]/20 to-transparent" />

              {/* Animated scan rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-56 h-56 sm:w-72 sm:h-72">
                  <div className="absolute inset-0 rounded-full border border-white/25"
                    style={{ animation: "pulse 3s ease-in-out infinite" }} />
                  <div className="absolute inset-6 rounded-full border border-white/15"
                    style={{ animation: "pulse 3s ease-in-out infinite 0.5s" }} />
                  <div className="absolute inset-12 rounded-full border border-white/10"
                    style={{ animation: "pulse 3s ease-in-out infinite 1s" }} />
                  {/* Analysis dots */}
                  {[
                    { top: "22%", left: "30%"  },
                    { top: "38%", left: "72%"  },
                    { top: "60%", left: "22%"  },
                    { top: "55%", left: "65%"  },
                    { top: "75%", left: "45%"  },
                  ].map((pos, i) => (
                    <div key={i} className="absolute w-2.5 h-2.5 rounded-full bg-[#F1E1DD]"
                      style={{ ...pos, animation: `ping 2s ease-in-out infinite ${i * 0.4}s` }} />
                  ))}
                </div>
              </div>
              <style>{`
                @keyframes ping { 0%,100%{opacity:0.3;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }
                @keyframes pulse { 0%,100%{opacity:0.25} 50%{opacity:0.5} }
              `}</style>

              {/* Badge */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-3">
                <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#9D6E6B]">Maavie</p>
                <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#231F20]">AI Skin Consult</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. HOW IT WORKS ── */}
        <section className="bg-[#F8F3EE] py-20 sm:py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[11px] font-semibold tracking-[0.32em] uppercase text-[#590515] mb-4">
                Simple &amp; Fast
              </p>
              <h2
                className="text-[#231F20] font-light"
                style={{ fontSize: "clamp(1.9rem, 3vw, 2.8rem)" }}
              >
                3 Easy Steps
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  num: "01",
                  icon: (
                    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-[#590515]">
                      <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                    </svg>
                  ),
                  title: "Answer Your Questions",
                  desc: "Tell us your life stage, skin type, top concerns and a few lifestyle details. 5 questions — under 2 minutes.",
                },
                {
                  num: "02",
                  icon: (
                    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-[#590515]">
                      <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
                    </svg>
                  ),
                  title: "Build Your Profile",
                  desc: "Our analysis maps your hormonal stage, skin state and concerns to a clinical database of ingredient and routine combinations.",
                },
                {
                  num: "03",
                  icon: (
                    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-[#590515]">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ),
                  title: "Get Your Routine",
                  desc: "Receive a complete personalised morning and evening routine — with the exact active ingredients chosen for your hormonal skin right now.",
                },
              ].map((s) => (
                <div key={s.num} className="bg-white p-8 sm:p-10 border border-[#E8DEDA]">
                  <div className="mb-5">{s.icon}</div>
                  <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#9D6E6B] mb-3">{s.title}</p>
                  <p className="text-sm text-[#4F4242] leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button
                onClick={startQuiz}
                className="inline-block bg-[#590515] text-white px-12 py-4 text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-[#450110] transition-colors duration-200"
              >
                Start Your Analysis
              </button>
            </div>
          </div>
        </section>

        {/* ── 3. COMPLETE SKIN PROFILE ── */}
        <section className="bg-white overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[580px]">

            {/* Left — image */}
            <div className="relative w-full lg:w-[45%] min-h-[380px] lg:min-h-0 overflow-hidden bg-[#F1E1DD]">
              <Image
                src="/images/maavie-serum-dropper.png"
                alt="Complete skin profile"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#590515]/10" />
              {/* Badge */}
              <div className="absolute top-6 left-6 bg-[#590515] text-white px-5 py-3">
                <p className="text-[9px] font-bold tracking-[0.28em] uppercase text-white/70 mb-0.5">Maavie</p>
                <p className="text-[11px] font-bold tracking-[0.18em] uppercase">AI Skin Profile</p>
              </div>
            </div>

            {/* Right — content */}
            <div className="w-full lg:w-[55%] flex items-center px-6 sm:px-12 lg:px-16 py-14 sm:py-20">
              <div className="max-w-[500px]">
                <p className="text-[11px] font-semibold tracking-[0.32em] uppercase text-[#590515] mb-5">
                  What We Analyse
                </p>
                <h2
                  className="text-[#231F20] font-light leading-tight mb-6"
                  style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)" }}
                >
                  A Complete<br />
                  <em className="italic text-[#9D6E6B]">Hormonal AI Skin Profile</em>
                </h2>
                <p className="text-[#4F4242] text-base leading-relaxed mb-7">
                  Our analysis evaluates your skin across 6 dimensions — all mapped to
                  your hormonal life stage and Indian skin needs:
                </p>
                <ul className="space-y-3 mb-10">
                  {[
                    "Hormonal life stage & skin patterns",
                    "Skin type & current barrier state",
                    "Primary & secondary skin concerns",
                    "Lifestyle &amp; environmental factors",
                    "Ingredient compatibility & safety",
                    "Personalised morning + evening routine",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-[#590515]" />
                      <span className="text-sm text-[#231F20]" dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
                <button
                  onClick={startQuiz}
                  className="inline-block bg-[#590515] text-white px-10 py-4 text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-[#450110] transition-colors duration-200"
                >
                  Start Your Analysis
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. BEHIND THE SCIENCE ── */}
        <section className="bg-[#F8F3EE] overflow-hidden">
          <div className="flex flex-col lg:flex-row-reverse min-h-[520px]">

            {/* Right (visually) — image */}
            <div className="relative w-full lg:w-[42%] min-h-[340px] lg:min-h-0 overflow-hidden bg-[#EAD1CB]">
              <Image
                src="/images/maavie-ingredients-botanical.png"
                alt="Maavie science"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-[#231F20]/20" />
            </div>

            {/* Left — text */}
            <div className="w-full lg:w-[58%] flex items-center px-6 sm:px-12 lg:px-16 xl:px-20 py-14 sm:py-20">
              <div className="max-w-[520px]">
                <p className="text-[11px] font-semibold tracking-[0.32em] uppercase text-[#590515] mb-5">
                  The Science
                </p>
                <h2
                  className="text-[#231F20] font-light leading-tight mb-7"
                  style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)" }}
                >
                  Behind the<br />
                  <em className="italic text-[#9D6E6B]">Technology</em>
                </h2>
                <p className="text-[#4F4242] text-base leading-relaxed mb-5">
                  Our analysis engine was co-created with Indian dermatologists and women&rsquo;s health
                  specialists who have spent years studying how hormonal change affects melanin-rich skin.
                </p>
                <p className="text-[#4F4242] text-base leading-relaxed mb-5">
                  Unlike generic skin quizzes, Maavie&rsquo;s analysis is built on two foundational
                  truths: that Indian skin has specific needs, and that those needs shift significantly
                  depending on where you are in your hormonal journey.
                </p>
                <p className="text-[#4F4242] text-base leading-relaxed mb-10">
                  Every routine recommendation is reviewed against ingredient safety data for
                  pregnancy, breastfeeding and all hormonal stages — so you never have to choose
                  between effective and safe.
                </p>
                <div className="flex flex-wrap gap-4">
                  {["Dermatologist-reviewed", "Hormone-safe actives", "Indian skin-first"].map((badge) => (
                    <span key={badge} className="border border-[#E8DEDA] text-[#590515] text-[9px] font-bold tracking-[0.2em] uppercase px-4 py-2">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. CTA SECTION ── */}
        <section className="bg-[#590515] py-20 sm:py-24 px-6 text-center">
          <p className="text-[11px] font-semibold tracking-[0.32em] uppercase text-[#F1E1DD]/60 mb-5">
            Ready to begin?
          </p>
          <h2
            className="text-white font-light leading-tight mb-8"
            style={{ fontSize: "clamp(1.9rem, 3.5vw, 3rem)" }}
          >
            Get Your Personalised<br />
            <em className="italic text-[#F1E1DD]">Maavie Routine Recommendation</em>
          </h2>
          <button
            onClick={startQuiz}
            className="inline-block bg-white text-[#590515] px-12 py-4 text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-[#F1E1DD] transition-colors duration-200"
          >
            Start Your Analysis
          </button>
        </section>

        {/* ── 6. FAQs ── */}
        <section className="bg-white py-20 sm:py-24 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[11px] font-semibold tracking-[0.32em] uppercase text-[#590515] mb-4">
                Questions
              </p>
              <h2
                className="text-[#231F20] font-light"
                style={{ fontSize: "clamp(1.8rem, 2.5vw, 2.4rem)" }}
              >
                FAQs
              </h2>
            </div>
            <div>
              {FAQS.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );

  /* ════════════════════════════════════════
     QUIZ MODE
  ════════════════════════════════════════ */
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>

        {/* Progress bar (quiz steps only) */}
        {qIdx >= 0 && (
          <div className="h-[3px] bg-[#E8DEDA]">
            <div className="h-full bg-[#590515] transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        )}

        {/* ── Quiz steps ── */}
        {qIdx >= 0 && (
          <section
            className="min-h-[calc(100vh-67px)] bg-white flex flex-col justify-center py-12 px-6"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(8px)", transition: "opacity 0.26s ease, transform 0.26s ease" }}
          >
            <div className="max-w-2xl mx-auto w-full">
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[#9D6E6B] mb-3">
                Step {qIdx + 1} of {QUIZ_STEPS.length}
              </p>

              {/* Stage */}
              {quizStep === "stage" && (
                <>
                  <h2 className="text-2xl sm:text-3xl font-light text-[#231F20] leading-snug mb-2">What stage of life are you in?</h2>
                  <p className="text-[#9D6E6B] text-sm mb-8">This is the foundation of your entire skin profile.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {STAGES.map((s) => (
                      <button key={s.id} className={`${cardCls(data.stage === s.id)} p-6`}
                        onClick={() => { setData((d) => ({ ...d, stage: s.id })); goTo("age"); }}>
                        <span className="block text-2xl text-[#9D6E6B] mb-3">{s.icon}</span>
                        <p className="text-sm font-semibold text-[#231F20] mb-1.5">{s.label}</p>
                        <p className="text-xs text-[#4F4242] leading-relaxed">{s.desc}</p>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Age */}
              {quizStep === "age" && (
                <>
                  <h2 className="text-2xl sm:text-3xl font-light text-[#231F20] leading-snug mb-2">What&rsquo;s your age range?</h2>
                  <p className="text-[#9D6E6B] text-sm mb-8">Hormonal patterns shift significantly through each decade of a woman&rsquo;s life.</p>
                  <div className="flex flex-col gap-3">
                    {AGES.map((a) => (
                      <button key={a} className={`${cardCls(data.age === a)} px-6 py-4 flex justify-between items-center`}
                        onClick={() => { setData((d) => ({ ...d, age: a })); goTo("skintype"); }}>
                        <span className="text-sm font-medium text-[#231F20]">{a}</span>
                        <span className="text-[#9D6E6B]">→</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Skin type */}
              {quizStep === "skintype" && (
                <>
                  <h2 className="text-2xl sm:text-3xl font-light text-[#231F20] leading-snug mb-2">How would you describe your skin right now?</h2>
                  <p className="text-[#9D6E6B] text-sm mb-8">Choose what feels truest today — hormones can shift your skin type unexpectedly.</p>
                  <div className="flex flex-col gap-3">
                    {SKIN_TYPES.map((s) => (
                      <button key={s.id} className={`${cardCls(data.skinType === s.id)} px-6 py-4 flex justify-between items-center`}
                        onClick={() => { setData((d) => ({ ...d, skinType: s.id })); goTo("concerns"); }}>
                        <div>
                          <p className="text-sm font-semibold text-[#231F20]">{s.label}</p>
                          <p className="text-xs text-[#9D6E6B] mt-0.5">{s.desc}</p>
                        </div>
                        <span className="text-[#9D6E6B] shrink-0 ml-4">→</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Concerns */}
              {quizStep === "concerns" && (
                <>
                  <h2 className="text-2xl sm:text-3xl font-light text-[#231F20] leading-snug mb-2">What are your top skin concerns?</h2>
                  <p className="text-[#9D6E6B] text-sm mb-8">
                    Select up to <strong className="font-semibold text-[#231F20]">3</strong>.
                    {concerns.length > 0 && <span className="ml-2 text-[#590515]">({concerns.length}/3 selected)</span>}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {CONCERNS.map((c) => {
                      const sel = concerns.includes(c.id);
                      const maxed = !sel && concerns.length >= 3;
                      return (
                        <button key={c.id} disabled={maxed}
                          className={`${cardCls(sel)} flex items-start gap-3 px-5 py-4 ${maxed ? "opacity-35 cursor-not-allowed" : ""}`}
                          onClick={() => { if (sel) setConcerns((p) => p.filter((x) => x !== c.id)); else if (!maxed) setConcerns((p) => [...p, c.id]); }}>
                          <span className="mt-0.5 w-4 h-4 shrink-0 border flex items-center justify-center transition-colors"
                            style={{ borderColor: sel ? "#590515" : "#9D6E6B", backgroundColor: sel ? "#590515" : "transparent" }}>
                            {sel && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-[#231F20] leading-snug">{c.label}</p>
                            <p className="text-xs text-[#9D6E6B] mt-0.5">{c.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <button disabled={concerns.length === 0} onClick={() => goTo("lifestyle")}
                    className="bg-[#590515] text-white px-10 py-4 text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-[#450110] transition-colors disabled:opacity-35 disabled:cursor-not-allowed">
                    Continue
                  </button>
                </>
              )}

              {/* Lifestyle */}
              {quizStep === "lifestyle" && (
                <>
                  <h2 className="text-2xl sm:text-3xl font-light text-[#231F20] leading-snug mb-2">A few lifestyle questions.</h2>
                  <p className="text-[#9D6E6B] text-sm mb-10">These help us fine-tune your formula recommendations.</p>
                  {([
                    { key: "sunExposure" as const, label: "Daily sun exposure",   opts: ["Minimal (indoors)", "Moderate 1–3 hrs", "High 3+ hrs"] },
                    { key: "sleep"       as const, label: "Sleep quality",         opts: ["Good", "Disrupted", "Poor"] },
                    { key: "stress"      as const, label: "Current stress level",  opts: ["Low", "Medium", "High"] },
                  ] as const).map(({ key, label, opts }) => (
                    <div key={key} className="mb-8">
                      <p className="text-sm font-semibold text-[#231F20] mb-3">{label}</p>
                      <div className="flex flex-wrap gap-2.5">
                        {opts.map((opt) => (
                          <button key={opt} onClick={() => setData((d) => ({ ...d, [key]: opt }))}
                            className={`px-5 py-2.5 border-2 text-sm transition-all duration-200 ${data[key] === opt ? "border-[#590515] bg-[#F8F3EE] text-[#231F20] font-semibold" : "border-[#E8DEDA] bg-white text-[#4F4242] hover:border-[#9D6E6B]"}`}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button disabled={!data.sunExposure || !data.sleep || !data.stress} onClick={() => goTo("analyzing")}
                    className="bg-[#590515] text-white px-10 py-4 text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-[#450110] transition-colors disabled:opacity-35 disabled:cursor-not-allowed">
                    Analyse My Skin
                  </button>
                </>
              )}

              {/* Back */}
              {PREV_STEP[quizStep] && (
                <button onClick={() => goTo(PREV_STEP[quizStep]!)}
                  className="mt-7 block text-[10px] font-semibold tracking-[0.2em] uppercase text-[#9D6E6B] hover:text-[#590515] transition-colors">
                  ← Back
                </button>
              )}
              {quizStep === "stage" && (
                <button onClick={() => setMode("landing")}
                  className="mt-7 block text-[10px] font-semibold tracking-[0.2em] uppercase text-[#9D6E6B] hover:text-[#590515] transition-colors">
                  ← Back to Overview
                </button>
              )}
            </div>
          </section>
        )}

        {/* ── Analyzing ── */}
        {quizStep === "analyzing" && (
          <section className="min-h-[calc(100vh-67px)] bg-[#231F20] flex flex-col items-center justify-center px-6 text-center"
            style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}>
            <div className="relative w-20 h-20 mb-10">
              <div className="absolute inset-0 rounded-full border border-white/10" />
              <div className="absolute inset-2 rounded-full border border-white/20" />
              <div className="absolute inset-0 rounded-full border-t-2 border-[#9D6E6B]"
                style={{ animation: "spin 1.2s linear infinite" }} />
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            </div>
            <p className="text-[11px] font-semibold tracking-[0.32em] uppercase text-[#9D6E6B]/60 mb-5">Maavie AI Skin Analysis</p>
            <p className="text-white font-light transition-all duration-500" style={{ fontSize: "clamp(1.15rem, 2.5vw, 1.6rem)" }} key={analyzeIdx}>
              {ANALYZING_MESSAGES[Math.min(analyzeIdx, ANALYZING_MESSAGES.length - 1)]}
            </p>
          </section>
        )}

        {/* ── Results ── */}
        {quizStep === "results" && results && (
          <section className="bg-[#F8F3EE] py-16 sm:py-20 px-6" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s ease" }}>
            <div className="max-w-3xl mx-auto">

              <div className="text-center mb-12">
                <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#590515] mb-5">Your Maavie AI Skin Profile</p>
                <h1 className="text-[#231F20] font-light leading-tight mb-5" style={{ fontSize: "clamp(1.9rem, 3.5vw, 3rem)" }}>
                  {results.headline}
                </h1>
                <div className="inline-block bg-[#590515] text-white text-[9px] font-bold tracking-[0.28em] uppercase px-5 py-2 mb-7">
                  {results.profile}
                </div>
                <p className="text-[#4F4242] text-base leading-relaxed max-w-xl mx-auto">{results.summary}</p>
              </div>

              {concerns.length > 0 && (
                <div className="bg-white p-6 sm:p-8 mb-5">
                  <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#9D6E6B] mb-5">Your Priority Concerns</p>
                  <div className="flex flex-wrap gap-2.5">
                    {concerns.map((c) => (
                      <span key={c} className="bg-[#F1E1DD] text-[#590515] text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-2">
                        {CONCERNS.find((x) => x.id === c)?.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                {[{ label: "Morning Routine", sym: "☀", steps: results.morning }, { label: "Evening Routine", sym: "◑", steps: results.evening }].map(({ label, sym, steps }) => (
                  <div key={label} className="bg-white p-6 sm:p-8">
                    <div className="flex items-center gap-2.5 mb-6">
                      <span className="text-[#590515] text-lg">{sym}</span>
                      <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#9D6E6B]">{label}</p>
                    </div>
                    <ol className="space-y-3.5">
                      {steps.map((s, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-5 h-5 shrink-0 mt-0.5 bg-[#590515] text-white text-[9px] font-bold flex items-center justify-center">{i + 1}</span>
                          <span className="text-sm text-[#231F20] leading-relaxed">{s}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>

              <div className="bg-[#590515] p-6 sm:p-8 mb-5">
                <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#F1E1DD]/55 mb-5">Your Key Active Ingredients</p>
                <div className="flex flex-wrap gap-3">
                  {results.ingredients.map((ing) => (
                    <span key={ing} className="border border-white/30 text-white text-[11px] font-medium tracking-wide px-4 py-2">{ing}</span>
                  ))}
                </div>
              </div>

              {results.extraNotes.length > 0 && (
                <div className="bg-[#F1E1DD] p-6 sm:p-8 mb-5">
                  <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#590515] mb-5">Formulated for Your Concerns</p>
                  <ul className="space-y-3">
                    {results.extraNotes.map((note, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 mt-2 shrink-0 rounded-full bg-[#590515]" />
                        <p className="text-sm text-[#4F4242] leading-relaxed">{note}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-white p-8 sm:p-12 text-center">
                <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#9D6E6B] mb-4">Your products are coming</p>
                <h2 className="text-[#231F20] font-light leading-tight mb-5" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)" }}>
                  Be the first to shop<br /><em className="italic text-[#9D6E6B]">your personalised Maavie routine.</em>
                </h2>
                <p className="text-[#4F4242] text-sm leading-relaxed mb-8 max-w-md mx-auto">
                  We&rsquo;re formulating the exact products for your profile right now. Join the waitlist and we&rsquo;ll notify you the moment your routine is ready.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/waitlist"
                    className="inline-block bg-[#590515] text-white px-10 py-4 text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-[#450110] transition-colors">
                    Join the Waitlist
                  </Link>
                  <button
                    onClick={() => { setData({}); setConcerns([]); setMode("landing"); window.scrollTo({ top: 0 }); }}
                    className="inline-block border-2 border-[#E8DEDA] text-[#4F4242] px-10 py-4 text-[11px] font-semibold tracking-[0.18em] uppercase hover:border-[#9D6E6B] hover:text-[#590515] transition-colors">
                    Retake Analysis
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
