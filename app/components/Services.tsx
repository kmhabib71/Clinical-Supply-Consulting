"use client";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    title: "Study Start-Up & Supply Strategy",
    body: "We build supply strategies that hold up across the full trial lifecycle — demand forecasting, depot selection, label strategy, and import/export planning from day one. No scrambling when enrollment accelerates.",
    tags: ["Forecasting", "Depot Planning", "Label Strategy"],
    accent: "#38bdf8",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="3" width="16" height="16" rx="3" stroke="#38bdf8" strokeWidth="1.5"/>
        <path d="M7 11L10 14L15 8" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 7H15" stroke="#38bdf8" strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "IRT / RTSM Oversight & Management",
    body: "Full oversight of IRT/RTSM systems throughout trial conduct — configuration review, site training, randomisation management, resupply trigger monitoring, and issue escalation. We've seen every IRT failure mode. We prevent them.",
    tags: ["IRT Oversight", "RTSM", "Randomisation"],
    accent: "#0ea5e9",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8" stroke="#0ea5e9" strokeWidth="1.5"/>
        <path d="M11 7V11L14 13" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="11" cy="11" r="2" fill="#0ea5e9" opacity="0.5"/>
      </svg>
    ),
  },
  {
    title: "Trial Conduct Supply Management",
    body: "Continuous supply chain management throughout trial conduct — enrollment monitoring, site-level inventory tracking, expiry management, resupply execution, and depot coordination across 80+ countries.",
    tags: ["Trial Conduct", "Inventory", "Global Depots"],
    accent: "#38bdf8",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 15L8 9L12 12L16 5" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="2" y="2" width="18" height="18" rx="3" stroke="#38bdf8" strokeWidth="1.5"/>
        <circle cx="8" cy="9" r="1.5" fill="#38bdf8"/>
        <circle cx="12" cy="12" r="1.5" fill="#38bdf8"/>
        <circle cx="16" cy="5" r="1.5" fill="#38bdf8"/>
      </svg>
    ),
  },
  {
    title: "UAT Services — IRT/RTSM Validation",
    body: "Script authoring, end-to-end testing, and exploratory testing for IRT/RTSM validation. Led by Krisanne Flynn and a team with deep IRT system experience. Structured, protocol-driven, GCP-compliant — delivered faster than any generalist QA vendor.",
    tags: ["UAT Scripts", "IRT Validation", "RTSM Testing"],
    accent: "#f59e0b",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="4" width="16" height="14" rx="2.5" stroke="#f59e0b" strokeWidth="1.5"/>
        <path d="M7 9H15M7 12H12" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M3 8H19" stroke="#f59e0b" strokeWidth="1" opacity="0.3"/>
        <circle cx="16" cy="16" r="4" fill="#f59e0b" stroke="#f4f6fa" strokeWidth="1.5"/>
        <path d="M14.5 16L15.5 17L17.5 15" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "GCP-Compliant Close-Out",
    body: "Methodical clinical supply close-out — drug accountability reconciliation, returns and destruction coordination, import/export documentation, and regulatory-ready close-out reports. Clean, documented, audit-ready.",
    tags: ["Drug Accountability", "GCP", "Close-Out"],
    accent: "#38bdf8",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3L18 6.5V11C18 15 14.5 18.5 11 20C7.5 18.5 4 15 4 11V6.5L11 3Z" stroke="#38bdf8" strokeWidth="1.5" fill="rgba(56,189,248,0.08)"/>
        <path d="M8 11L10 13L14 9" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Supply Chain Consulting & SOP Development",
    body: "Strategic supply chain consulting — vendor selection, comparator sourcing, SOP authoring, supply chain risk assessment, and operational readiness reviews. We build the infrastructure your clinical ops team needs to move faster.",
    tags: ["SOPs", "Vendor Management", "Risk Assessment"],
    accent: "#0ea5e9",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="7" r="3" stroke="#0ea5e9" strokeWidth="1.5"/>
        <circle cx="5" cy="16" r="2.5" stroke="#0ea5e9" strokeWidth="1.5"/>
        <circle cx="17" cy="16" r="2.5" stroke="#0ea5e9" strokeWidth="1.5"/>
        <path d="M8.5 9.5L6 13.5M13.5 9.5L16 13.5M7.5 16H14.5" stroke="#0ea5e9" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

function ServiceCard({ svc, index }: { svc: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref}
      className="card-lift bg-white rounded-2xl p-7 border border-black/[0.06]"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${index * 0.09}s, transform 0.65s ease ${index * 0.09}s`,
      }}>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
        style={{ background: `${svc.accent}15`, border: `1px solid ${svc.accent}25` }}>
        {svc.icon}
      </div>
      <h3 className="text-base font-bold text-[#0d1b2a] leading-snug mb-3">{svc.title}</h3>
      <p className="text-sm text-[#0d1b2a]/50 leading-relaxed mb-5">{svc.body}</p>
      <div className="flex flex-wrap gap-1.5">
        {svc.tags.map((t) => (
          <span key={t} className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
            style={{ background: `${svc.accent}12`, color: svc.accent }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVis, setTitleVis] = useState(false);

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

  return (
    <section id="services" className="relative py-28 px-6 bg-[#f4f6fa]">
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef}
          style={{
            opacity: titleVis ? 1 : 0,
            transform: titleVis ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
          className="mb-16">
          <span className="pill bg-[#e0f2fe] text-[#0369a1] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]"/>
            Our Services
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0d1b2a] tracking-tight leading-tight mb-4">
            End-to-End Clinical Supply.
            <br />
            <span className="text-[#0d1b2a]/30">Phase I Through Close-Out.</span>
          </h2>
          <p className="text-[#0d1b2a]/50 text-base max-w-xl leading-relaxed">
            Every service line is delivered by consultants with 10–30 years of direct sponsor-side and CRO
            experience. No junior staff. No account manager in the middle. The expert you hire is the expert
            who works your program.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => <ServiceCard key={i} svc={s} index={i}/>)}
        </div>
      </div>
    </section>
  );
}
