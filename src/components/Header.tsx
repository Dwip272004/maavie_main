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
    label: "Shop by Concern",
    href: "/shop",
    submenu: [
      { label: "Hair Loss & Thinning", href: "/shop/hair-loss" },
      { label: "Dry & Dull Skin", href: "/shop/dry-skin" },
      { label: "Uneven Skin Tone", href: "/shop/skin-tone" },
      { label: "Scalp Health", href: "/shop/scalp" },
      { label: "Anti-Ageing", href: "/shop/anti-ageing" },
      { label: "Stretch Marks & Scars", href: "/shop/scars" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-[#FDFAF5] border-b border-[#E8D5A3]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-2xl font-light tracking-[0.25em] text-[#1A1209] uppercase">
              maavie
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setActiveSubmenu(item.label)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <Link
                  href={item.href}
                  className="nav-link text-sm tracking-wide text-[#1A1209] hover:text-[#C9963A] transition-colors duration-200 py-5 inline-block"
                >
                  {item.label}
                </Link>
                {item.submenu && activeSubmenu === item.label && (
                  <div className="absolute top-full left-0 bg-[#FDFAF5] border border-[#E8D5A3]/60 shadow-xl min-w-[220px] py-3 z-50">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="block px-5 py-2.5 text-sm text-[#1A1209] hover:text-[#C9963A] hover:bg-[#F5EDE0] transition-colors duration-150"
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
            {/* Newsletter */}
            <Link
              href="/newsletter"
              className="hidden lg:block text-xs tracking-widest uppercase text-[#C9963A] border border-[#C9963A] px-3 py-1.5 hover:bg-[#C9963A] hover:text-white transition-colors duration-200"
            >
              10% Off
            </Link>

            {/* Search */}
            <button className="p-1 hover:text-[#C9963A] transition-colors duration-200" aria-label="Search">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            {/* Account */}
            <button className="p-1 hover:text-[#C9963A] transition-colors duration-200" aria-label="Account">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>

            {/* Cart */}
            <button className="p-1 relative hover:text-[#C9963A] transition-colors duration-200" aria-label="Cart">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" x2="21" y1="6" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-[#C9963A] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-1 hover:text-[#C9963A] transition-colors duration-200"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#FDFAF5] border-t border-[#E8D5A3]/60 px-6 py-6">
          {navItems.map((item) => (
            <div key={item.label} className="mb-1">
              <button
                className="w-full text-left py-3 text-base tracking-wide border-b border-[#E8D5A3]/40 flex justify-between items-center"
                onClick={() =>
                  setActiveSubmenu(activeSubmenu === item.label ? null : item.label)
                }
              >
                {item.label}
                {item.submenu && (
                  <span className="text-[#C9963A]">
                    {activeSubmenu === item.label ? "−" : "+"}
                  </span>
                )}
              </button>
              {item.submenu && activeSubmenu === item.label && (
                <div className="pl-4 py-2">
                  {item.submenu.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      className="block py-2 text-sm text-[#7A6A57] hover:text-[#C9963A]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/newsletter"
            className="mt-4 block text-center text-xs tracking-widest uppercase text-[#C9963A] border border-[#C9963A] py-3 hover:bg-[#C9963A] hover:text-white transition-colors"
          >
            Get 10% Off — Join the Newsletter
          </Link>
        </div>
      )}
    </header>
  );
}
