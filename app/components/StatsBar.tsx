"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "20+", label: "Years Founded On", sub: "Sponsor-side & CRO experience per consultant", accent: "#38bdf8" },
  { value: "80+", label: "Countries", sub: "Global supply chain operations", accent: "#7dd3fc" },
  { value: "Phase I–III", label: "Full Coverage", sub: "Study start-up through close-out", accent: "#38bdf8" },
  { value: "12", label: "Senior Consultants", sub: "Avg. 10–30 yrs each, no juniors", accent: "#f59e0b" },
];

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="relative bg-[#071525] px-6 py-0">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.07] border border-white/[0.07] rounded-2xl overflow-hidden -translate-y-8 shadow-2xl"
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? "translateY(-32px)" : "translateY(-16px)",
            transition: "opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s",
          }}
        >
          {stats.map((s, i) => (
            <div key={i}
              className="bg-[#071525] px-6 py-7 text-center hover:bg-[#0c2340] transition-colors duration-200 relative group"
              style={{ opacity: vis ? 1 : 0, transition: `opacity 0.5s ease ${0.5 + i * 0.08}s` }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] rounded-full transition-all duration-300 group-hover:w-14"
                style={{ background: s.accent }}/>
              <div className="text-xl md:text-2xl font-extrabold mb-1.5 tabular-nums leading-tight"
                style={{ color: s.accent }}>{s.value}</div>
              <div className="text-xs font-semibold text-white/80 mb-0.5">{s.label}</div>
              <div className="text-[11px] text-white/30 leading-relaxed">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
