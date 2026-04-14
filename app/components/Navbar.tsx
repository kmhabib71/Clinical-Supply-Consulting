"use client";
import { useState, useEffect } from "react";

const links = [
  { label: "Services", href: "#services" },
  { label: "UAT Services", href: "#uat" },
  { label: "Global Reach", href: "#global" },
  { label: "Why CSC", href: "#why-csc" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? "bg-[#f4f6fa]/95 backdrop-blur-xl shadow-sm border-b border-black/[0.06] py-3"
        : "bg-transparent py-5"
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
            scrolled ? "bg-[#0c2340]" : "bg-white/12 border border-white/25"
          }`}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="5" height="5" rx="1" fill="#38bdf8" opacity="0.9"/>
              <rect x="9" y="2" width="5" height="5" rx="1" fill="#38bdf8" opacity="0.5"/>
              <rect x="2" y="9" width="5" height="5" rx="1" fill="#38bdf8" opacity="0.5"/>
              <rect x="9" y="9" width="5" height="5" rx="1" fill="#38bdf8" opacity="0.9"/>
            </svg>
          </div>
          <div>
            <span className={`text-sm font-bold tracking-tight leading-none block transition-colors duration-500 ${scrolled ? "text-[#0c2340]" : "text-white"}`}>
              Clinical Supply
            </span>
            <span className={`text-[10px] tracking-widest uppercase leading-none transition-colors duration-500 ${scrolled ? "text-[#0c2340]/50" : "text-white/50"}`}>
              Consulting
            </span>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a key={l.href} href={l.href}
              className={`text-sm font-medium transition-colors duration-300 ${
                scrolled ? "text-[#0d1b2a]/55 hover:text-[#0c2340]" : "text-white/75 hover:text-white"
              }`}>
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a href="#contact"
          className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
            scrolled
              ? "bg-[#0c2340] text-white hover:bg-[#163a5f]"
              : "bg-white/15 text-white border border-white/30 hover:bg-white/25"
          }`}>
          Submit an RFP
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6H9.5M7 3.5L9.5 6L7 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <div className={`w-5 h-0.5 mb-1.5 transition-colors duration-300 ${scrolled ? "bg-[#0c2340]" : "bg-white"}`}/>
          <div className={`w-5 h-0.5 mb-1.5 transition-colors duration-300 ${scrolled ? "bg-[#0c2340]" : "bg-white"}`}/>
          <div className={`w-3 h-0.5 transition-colors duration-300 ${scrolled ? "bg-[#0c2340]" : "bg-white"}`}/>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#f4f6fa] border-t border-black/[0.06] px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-[#0d1b2a]/70 hover:text-[#0c2340]">{l.label}</a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#0c2340] text-white text-sm font-semibold">
            Submit an RFP
          </a>
        </div>
      )}
    </nav>
  );
}
