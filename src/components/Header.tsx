"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  {
    label: "All Products",
    href: "/products",
    submenu: [
      { label: "Hanbang Hair Genesis Serum", href: "/products/hair-genesis-serum" },
      { label: "Golden Body Oil", href: "/products/golden-body-oil" },
      { label: "Radiance Face Elixir", href: "/products/radiance-face-elixir" },
      { label: "Mugwort Mist", href: "/products/mugwort-mist" },
      { label: "Scalp Revival Oil", href: "/products/scalp-revival-oil" },
      { label: "Centella Calm Serum", href: "/products/centella-calm-serum" },
    ],
  },
  { label: "Bundles", href: "/bundles" },
  { label: "Gifts", href: "/gifts" },
  {
    label: "Shop by Lifestage",
    href: "/shop",
    submenu: [
      { label: "Trying to Conceive", href: "/shop/ttc" },
      { label: "Pregnancy & Postpartum", href: "/shop/pregnancy" },
      { label: "Perimenopause", href: "/shop/perimenopause" },
      { label: "Menopause", href: "/shop/menopause" },
    ],
  },
  {
    label: "Shop by Concern",
    href: "/shop",
    submenu: [
      { label: "Pigmentation & Melasma", href: "/shop/pigmentation" },
      { label: "Dry & Dull Skin", href: "/shop/dry-skin" },
      { label: "Hair Loss & Thinning", href: "/shop/hair-loss" },
      { label: "Sensitive Skin", href: "/shop/sensitive" },
      { label: "Anti-Ageing", href: "/shop/anti-ageing" },
      { label: "Stretch Marks & Scars", href: "/shop/scars" },
    ],
  },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E8DEDA]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-[64px]">

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <span className="text-[22px] font-bold tracking-[0.18em] text-[#231F20] uppercase">
              maavie
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#231F20] hover:text-[#590515] transition-colors duration-150 py-5 inline-block nav-link"
                >
                  {item.label}
                </Link>

                {item.submenu && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 bg-white border border-[#E8DEDA] shadow-lg min-w-[220px] py-2 z-50">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="block px-5 py-2.5 text-[12px] text-[#231F20] hover:text-[#590515] hover:bg-[#F8F3EE] transition-colors duration-100"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button className="hidden sm:block p-1 text-[#231F20] hover:text-[#590515] transition-colors" aria-label="Search">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            {/* Account */}
            <button className="p-1 text-[#231F20] hover:text-[#590515] transition-colors" aria-label="Account">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>

            {/* Cart */}
            <button className="p-1 text-[#231F20] hover:text-[#590515] transition-colors relative" aria-label="Cart">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" x2="21" y1="6" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="absolute -top-0.5 -right-0.5 bg-[#590515] text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-medium">0</span>
            </button>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-1 text-[#231F20]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[#E8DEDA] px-5 py-4">
          {navItems.map((item) => (
            <div key={item.label} className="border-b border-[#F0EDED] last:border-0">
              <button
                className="w-full text-left py-3.5 text-[11px] font-medium tracking-[0.12em] uppercase text-[#231F20] flex justify-between items-center"
                onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
              >
                {item.label}
                {item.submenu && (
                  <span className="text-[#9D6E6B] text-base leading-none">
                    {mobileExpanded === item.label ? "−" : "+"}
                  </span>
                )}
              </button>
              {item.submenu && mobileExpanded === item.label && (
                <div className="pb-3 pl-3">
                  {item.submenu.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      className="block py-2 text-xs text-[#4F4242] hover:text-[#590515]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
