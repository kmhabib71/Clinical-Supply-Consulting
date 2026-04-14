"use client";
import { useEffect, useRef, useState } from "react";

const points = [
  {
    title: "The Expert You Hire Is the Expert Who Works Your Trial",
    body: "No junior associates. No account managers who relay your questions. CSC's consultants are the people who built and ran clinical supply operations at Janssen, Merck, ICON, Almac, and Astellas. When a supply issue surfaces at 11pm before a Monday shipment, you have a direct line to someone who has solved that exact problem before.",
    accent: "#38bdf8",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="7" r="4" stroke="#38bdf8" strokeWidth="1.5"/>
        <path d="M3 18C3 14.69 6.13 12 10 12C13.87 12 17 14.69 17 18" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="15" cy="6" r="2" fill="#38bdf8" opacity="0.5"/>
      </svg>
    ),
  },
  {
    title: "20+ Years of Experience Means Fewer Surprises",
    body: "CSC's team has collectively managed hundreds of trials across 80+ countries. They've seen the vendor that disappears during peak enrollment. They know which depots have reliable cold chain. They know import permit lead times by country. That knowledge changes the risk profile of every program they touch.",
    accent: "#0ea5e9",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L18 6V10C18 14 14.5 17.5 10 19C5.5 17.5 2 14 2 10V6L10 2Z" stroke="#0ea5e9" strokeWidth="1.5" fill="rgba(14,165,233,0.08)"/>
        <path d="M7 10L9 12L13 8" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Therapeutic Breadth Across 20+ Areas",
    body: "Oncology, rare disease, CNS, infectious disease, cardiovascular, immunology — CSC's team has covered the breadth of clinical development. Supply chain complexity differs significantly by therapeutic area. You benefit from a team that doesn't have to learn your disease area from scratch.",
    accent: "#38bdf8",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="#38bdf8" strokeWidth="1.5"/>
        <path d="M3 10H17M10 3C10 3 7.5 6 7.5 10C7.5 14 10 17 10 17M10 3C10 3 12.5 6 12.5 10C12.5 14 10 17 10 17" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Boutique Speed. Enterprise Credibility.",
    body: "CSC moves faster than a large CRO because decisions don't travel through approval layers. But sponsors get the compliance rigour, GCP documentation, and regulatory defensibility of a firm whose founders built their careers inside the largest pharma companies in the world.",
    accent: "#f59e0b",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 15L7 9L11 12L15 5" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="15" cy="5" r="2.5" fill="#f59e0b" opacity="0.8"/>
        <path d="M3 18H17" stroke="#f59e0b" strokeWidth="1" opacity="0.3" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const credentials = [
  "Janssen", "Merck", "ICON", "Almac", "Astellas", "20+ Therapeutic Areas"
];

export default function WhySenior() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVis, setTitleVis] = useState(false);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [cardsVis, setCardsVis] = useState<boolean[]>([false, false, false, false]);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTitleVis(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    cardsRef.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { setCardsVis(p => { const n = [...p]; n[i] = true; return n; }); obs.disconnect(); } },
        { threshold: 0.2 }
      );
      obs.observe(el);
    });
  }, []);

  return (
    <section id="why-csc" className="relative py-28 px-6 bg-[#071525] overflow-hidden">
      {/* Blobs */}
      <div className="blob-1 absolute top-0 right-0 w-96 h-96 rounded-full opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, #38bdf8, transparent 70%)" }}/>
      <div className="blob-2 absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-6 pointer-events-none"
        style={{ background: "radial-gradient(circle, #f59e0b, transparent 70%)" }}/>

      <div className="relative max-w-6xl mx-auto">
        <div ref={titleRef}
          style={{
            opacity: titleVis ? 1 : 0,
            transform: titleVis ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
          className="mb-16">
          <span className="pill bg-[#38bdf8]/12 text-[#38bdf8] border border-[#38bdf8]/25 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"/>
            Why CSC
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Senior Expertise Is
            <br />
            <span className="shimmer-blue">Not a Marketing Claim.</span>
            <br />
            <span className="text-white/30">It&apos;s the Entire Model.</span>
          </h2>
          {/* Credential badges */}
          <div className="flex flex-wrap gap-2 mt-6">
            {credentials.map((c) => (
              <span key={c}
                className="text-[11px] font-semibold px-3 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] text-white/50 tracking-wide">
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {points.map((p, i) => (
            <div key={i}
              ref={el => { cardsRef.current[i] = el; }}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-7 hover:bg-white/[0.05] transition-colors duration-200"
              style={{
                opacity: cardsVis[i] ? 1 : 0,
                transform: cardsVis[i] ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
              }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${p.accent}15`, border: `1px solid ${p.accent}25` }}>
                  {p.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-2 leading-snug">{p.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{p.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
