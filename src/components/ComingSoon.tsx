"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ComingSoon({ label }: { label: string }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#1A1209] text-white flex flex-col overflow-hidden relative">

      {/* Background image — subtle, blurred */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/maavie-bottle-glow.png"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-20"
          sizes="100vw"
        />
        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#1A1209_70%)]" />
      </div>

      {/* Thin top bar */}
      <div className="relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-14 flex items-center justify-between">
          <Link href="/" className="text-xl font-light tracking-[0.25em] uppercase text-white hover:text-[#C9963A] transition-colors duration-200">
            maavie
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m15 18-6-6 6-6" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>

      {/* Main content — centered */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">

        {/* Decorative element */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px w-16 bg-[#C9963A]/50" />
          <span className="text-[#C9963A] text-xs tracking-[0.4em] uppercase">Coming Soon</span>
          <div className="h-px w-16 bg-[#C9963A]/50" />
        </div>

        {/* Section label */}
        <p className="text-white/40 text-sm tracking-[0.3em] uppercase mb-4">{label}</p>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mb-6 max-w-2xl">
          Something{" "}
          <em className="italic text-[#E8D5A3]">beautiful</em>
          <br />
          is on its way.
        </h1>

        {/* Sub-copy */}
        <p className="text-white/60 text-lg font-light leading-relaxed max-w-xl mb-14">
          We&rsquo;re crafting something special for you — rooted in nature, backed by science, and
          designed for every stage of womanhood. Be the first to know when it&rsquo;s ready.
        </p>

        {/* Newsletter form */}
        {submitted ? (
          <div className="flex items-center gap-3 bg-white/10 border border-[#C9963A]/40 px-8 py-5 text-sm tracking-wide text-[#E8D5A3]">
            <svg className="w-5 h-5 text-[#C9963A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            You&rsquo;re on the list — we&rsquo;ll let you know first.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/30 px-5 py-4 text-sm focus:outline-none focus:border-[#C9963A] transition-colors duration-200"
            />
            <button
              type="submit"
              className="bg-[#C9963A] text-white px-7 py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#b8832a] transition-colors duration-200 whitespace-nowrap"
            >
              Notify Me
            </button>
          </form>
        )}

        {/* Small reassurance */}
        <p className="text-white/25 text-xs mt-5 tracking-wide">
          No spam, ever. Unsubscribe any time.
        </p>

        {/* Divider */}
        <div className="h-px w-32 bg-white/10 my-14" />

        {/* Quick links */}
        <p className="text-white/30 text-xs tracking-widest uppercase mb-6">
          Explore what&rsquo;s live
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { label: "Homepage", href: "/" },
            { label: "Instagram", href: "https://instagram.com/maavie.in" },
            { label: "WhatsApp Community", href: "https://wa.me/message/maavie" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs tracking-widest uppercase text-white/40 border border-white/15 px-5 py-2.5 hover:text-white hover:border-white/40 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom brand strip */}
      <div className="relative z-10 border-t border-white/10 py-5">
        <p className="text-center text-white/20 text-xs tracking-widest uppercase">
          maavie &nbsp;·&nbsp; nature. science. truth.
        </p>
      </div>

    </div>
  );
}
