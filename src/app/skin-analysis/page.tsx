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
        <section className="bg-white">
          <div className="flex flex-col lg:flex-row">

            {/* Left — text */}
            <div className="w-full lg:w-[48%] flex items-center px-8 sm:px-14 lg:px-16 xl:px-20 py-16 sm:py-20 lg:py-24">
              <div className="max-w-[480px]">
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#9D6E6B] mb-8">
                  Maavie AI Skin Analysis
                </p>
                <h1
                  className="font-bold text-[#231F20] leading-[1.05] uppercase mb-5"
                  style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.4rem)", letterSpacing: "-0.01em" }}
                >
                  Developed with<br />Dermatologists.<br />Powered by<br />Artificial Intelligence.
                </h1>
                <p className="text-[#4F4242] text-sm sm:text-base leading-relaxed mb-10">
                  Skin analysis tool that creates a customised hormonal skincare routine for you.
                </p>
                <button
                  onClick={startQuiz}
                  className="bg-[#590515] text-white px-10 py-3.5 text-[11px] font-bold tracking-[0.14em] uppercase hover:bg-[#450110] transition-colors duration-200"
                >
                  Start Now
                </button>
              </div>
            </div>

            {/* Right — image */}
            <div className="relative w-full lg:w-[52%] min-h-[420px] lg:min-h-[540px] overflow-hidden bg-[#EAD1CB]">
              <Image
                src="/images/maavie-woman-oil.png"
                alt="Maavie AI skin analysis"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 52vw"
              />
              {/* Scan overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-52 h-52 sm:w-64 sm:h-64">
                  <div className="absolute inset-0 rounded-full border border-white/30"
                    style={{ animation: "scanpulse 3s ease-in-out infinite" }} />
                  <div className="absolute inset-5 rounded-full border border-white/20"
                    style={{ animation: "scanpulse 3s ease-in-out infinite 0.6s" }} />
                  <div className="absolute inset-10 rounded-full border border-white/10"
                    style={{ animation: "scanpulse 3s ease-in-out infinite 1.2s" }} />
                  {[
                    { top: "18%", left: "28%" }, { top: "35%", left: "70%" },
                    { top: "62%", left: "18%" }, { top: "58%", left: "68%" },
                  ].map((pos, i) => (
                    <span key={i} className="absolute w-2 h-2 rounded-full bg-white/70"
                      style={{ ...pos, animation: `scandot 2.2s ease-in-out infinite ${i * 0.45}s` }} />
                  ))}
                </div>
              </div>
              <style>{`
                @keyframes scanpulse{0%,100%{opacity:.2}50%{opacity:.55}}
                @keyframes scandot{0%,100%{opacity:.3;transform:scale(1)}50%{opacity:.9;transform:scale(1.4)}}
              `}</style>
              {/* Badge — top right like Vichy */}
              <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-sm px-4 py-2.5 text-right">
                <p className="text-[8px] font-bold tracking-[0.25em] uppercase text-[#9D6E6B] leading-none mb-0.5">Maavie</p>
                <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#231F20] leading-none">
                  <span className="text-[#590515]">AI</span> Skin Consult
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. 3 EASY STEPS ── */}
        <section className="bg-white py-20 sm:py-24 px-6 border-t border-[#F0EDED]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center font-bold uppercase text-[#231F20] tracking-[0.06em] mb-14 sm:mb-16"
              style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)" }}>
              3 Easy Steps
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
              {[
                {
                  step: "STEP 1",
                  title: "Answer Your Questions",
                  desc: "Tell us your life stage, skin type and top concerns. 5 questions, under 2 minutes.",
                  screen: (
                    <div className="w-full h-full flex flex-col px-4 py-5 gap-2">
                      <div className="h-2 w-3/4 bg-[#590515]/15 rounded" />
                      {["Trying to Conceive","Pregnancy","Perimenopause","Menopause"].map((l, i) => (
                        <div key={i} className={`flex items-center gap-2 border rounded px-3 py-2 ${i === 0 ? "border-[#590515] bg-[#F8F3EE]" : "border-[#E8DEDA]"}`}>
                          <span className={`w-3 h-3 rounded-full border flex-shrink-0 ${i === 0 ? "border-[#590515] bg-[#590515]" : "border-[#9D6E6B]"}`} />
                          <span className="text-[7px] font-medium text-[#231F20]">{l}</span>
                        </div>
                      ))}
                    </div>
                  ),
                },
                {
                  step: "STEP 2",
                  title: "Complete Your Analysis",
                  desc: "Our engine maps your hormonal profile to a clinical database of ingredient combinations.",
                  screen: (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-5">
                      <div className="relative w-16 h-16">
                        <div className="absolute inset-0 rounded-full border-2 border-[#E8DEDA]" />
                        <div className="absolute inset-0 rounded-full border-t-2 border-[#590515]"
                          style={{ animation: "spin 1.4s linear infinite" }} />
                        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                      </div>
                      <div className="text-center space-y-1.5 w-full">
                        {["Hormonal profile","Life stage","Key actives"].map((l, i) => (
                          <div key={i} className="flex items-center gap-2 justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#590515]" />
                            <span className="text-[7px] text-[#4F4242]">{l}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
                {
                  step: "STEP 3",
                  title: "Get Your Results",
                  desc: "Receive a personalised morning and evening routine with actives chosen for your skin right now.",
                  screen: (
                    <div className="w-full h-full flex flex-col px-3 py-4 gap-2">
                      <div className="h-1.5 w-2/3 bg-[#590515]/20 rounded mb-1" />
                      {[["☀","Morning","Cleanser · Serum · SPF"],["◑","Evening","Serum · Repair Cream"]].map(([sym, lbl, items], i) => (
                        <div key={i} className="border border-[#E8DEDA] rounded px-2.5 py-2">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-[9px] text-[#590515]">{sym}</span>
                            <span className="text-[7px] font-bold uppercase tracking-wide text-[#231F20]">{lbl}</span>
                          </div>
                          <span className="text-[6.5px] text-[#9D6E6B]">{items}</span>
                        </div>
                      ))}
                      <div className="mt-auto bg-[#590515] rounded text-center py-1.5">
                        <span className="text-[7px] font-bold text-white tracking-wide uppercase">Join Waitlist</span>
                      </div>
                    </div>
                  ),
                },
              ].map(({ step, title, desc, screen }) => (
                <div key={step} className="flex flex-col items-center text-center">
                  {/* Phone frame */}
                  <div className="w-[160px] h-[260px] sm:w-[148px] sm:h-[240px] rounded-[22px] border-2 border-[#231F20] bg-white overflow-hidden shadow-sm mb-6 relative">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-3 bg-[#231F20] rounded-b-xl z-10" />
                    <div className="w-full h-full pt-3">
                      {screen}
                    </div>
                  </div>
                  <p className="text-[9px] font-bold tracking-[0.22em] uppercase text-[#9D6E6B] mb-2">{step}</p>
                  <p className="text-sm font-bold text-[#231F20] mb-2">{title}</p>
                  <p className="text-xs text-[#4F4242] leading-relaxed max-w-[200px]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. COMPLETE SKIN PROFILE ── */}
        <section className="bg-white border-t border-[#F0EDED]">
          <div className="flex flex-col lg:flex-row">

            {/* Left — image with scan overlay + badge */}
            <div className="relative w-full lg:w-[48%] min-h-[400px] lg:min-h-[520px] overflow-hidden bg-[#F1E1DD]">
              <Image
                src="/images/maavie-woman-oil.png"
                alt="A complete hormonal skin profile"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
              {/* Scan circles */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-44 h-44 sm:w-52 sm:h-52">
                  <div className="absolute inset-0 rounded-full border border-white/35" />
                  <div className="absolute inset-6 rounded-full border border-white/20" />
                  {[
                    { top: "15%", left: "20%" }, { top: "30%", left: "78%" },
                    { top: "70%", left: "15%" }, { top: "65%", left: "72%" },
                  ].map((pos, i) => (
                    <span key={i} className="absolute w-2 h-2 rounded-full bg-white/60"
                      style={{ ...pos, animation: `scandot 2.5s ease-in-out infinite ${i * 0.5}s` }} />
                  ))}
                </div>
              </div>
              {/* Badge — top left like Vichy */}
              <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm px-4 py-2.5">
                <p className="text-[8px] font-bold tracking-[0.25em] uppercase text-[#9D6E6B] leading-none mb-0.5">Maavie</p>
                <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#231F20] leading-none">
                  <span className="text-[#590515]">AI</span> Skin Consult
                </p>
              </div>
            </div>

            {/* Right — text */}
            <div className="w-full lg:w-[52%] flex items-center px-8 sm:px-14 lg:px-16 xl:px-20 py-14 sm:py-20">
              <div className="max-w-[480px]">
                <h2 className="font-bold uppercase text-[#231F20] leading-tight mb-5"
                  style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)", letterSpacing: "-0.01em" }}>
                  A Complete Skin Profile
                </h2>
                <p className="text-sm sm:text-base text-[#4F4242] leading-relaxed mb-7">
                  Detect and analyse your skin strengths and areas of focus across 6 different
                  hormonal skin concerns, such as:
                </p>
                <ul className="space-y-2.5 mb-10">
                  {[
                    "Hormonal Pigmentation & Melasma",
                    "Dryness & Barrier Damage",
                    "Hormonal Breakouts",
                    "Sensitivity & Redness",
                    "Fine Lines & Firmness",
                    "Hair Thinning & Scalp Health",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-[#231F20]">
                      <span className="text-[#590515]">·</span> {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={startQuiz}
                  className="bg-[#590515] text-white px-10 py-3.5 text-[11px] font-bold tracking-[0.14em] uppercase hover:bg-[#450110] transition-colors duration-200"
                >
                  Start Now
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. BEHIND THE TECH ── */}
        <section className="bg-white border-t border-[#F0EDED]">
          <div className="flex flex-col lg:flex-row">

            {/* Left — text */}
            <div className="w-full lg:w-[55%] flex items-center px-8 sm:px-14 lg:px-16 xl:px-20 py-16 sm:py-20 lg:py-24">
              <div className="max-w-[480px]">
                <h2 className="font-bold uppercase text-[#231F20] leading-tight mb-6"
                  style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)", letterSpacing: "-0.01em" }}>
                  Behind the Tech
                </h2>
                <p className="text-sm sm:text-base text-[#4F4242] leading-relaxed">
                  Co-created with Indian dermatologists and women&rsquo;s health specialists,
                  Maavie&rsquo;s AI analysis is built on a hormonal skin database covering every stage
                  of womanhood. Our tool matches your profile against clinically researched ingredient
                  combinations to give you an advanced skin analysis in under 2 minutes — with
                  recommendations that are safe across pregnancy, postpartum, perimenopause
                  and menopause.
                </p>
              </div>
            </div>

            {/* Right — portrait image */}
            <div className="relative w-full lg:w-[45%] min-h-[380px] lg:min-h-[480px] bg-[#F8F3EE] overflow-hidden">
              <Image
                src="/images/maavie-ingredients-botanical.png"
                alt="Behind the technology"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>
        </section>

        {/* ── 5. CTA ── */}
        <section className="bg-[#590515] py-16 sm:py-20 px-6 text-center">
          <h2 className="font-bold uppercase text-white leading-tight mb-8"
            style={{ fontSize: "clamp(1.1rem, 2vw, 1.6rem)", letterSpacing: "0.02em" }}>
            Get Your Customised Routine Recommendation
          </h2>
          <button
            onClick={startQuiz}
            className="bg-white text-[#590515] px-10 py-3.5 text-[11px] font-bold tracking-[0.14em] uppercase hover:bg-[#F1E1DD] transition-colors duration-200"
          >
            Start Now
          </button>
        </section>

        {/* ── 6. FAQs ── */}
        <section className="bg-white py-16 sm:py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center font-light text-[#231F20] mb-10"
              style={{ fontSize: "clamp(1.6rem, 2.2vw, 2rem)" }}>
              FAQs
            </h2>
            <div className="border-t border-[#E8DEDA]">
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
