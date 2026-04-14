"use client";
import { useEffect, useRef, useState } from "react";

const useCases = [
  "Clinical supply strategy & study start-up",
  "IRT/RTSM oversight during trial conduct",
  "UAT script authoring & RTSM validation",
  "Global supply chain management (Phase I–III)",
  "GCP-compliant close-out & drug accountability",
  "Supply chain SOP development & consulting",
];

export default function Contact() {
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
    <section id="contact" className="relative py-28 px-6 bg-[#0c2340] overflow-hidden">
      {/* Blobs */}
      <div className="blob-1 absolute top-0 right-0 w-[500px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #38bdf8, transparent 70%)" }}/>
      <div className="blob-2 absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, #f59e0b, transparent 70%)" }}/>
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}/>

      <div ref={ref}
        className="relative max-w-6xl mx-auto"
        style={{
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div>
            <span className="pill bg-[#38bdf8]/12 text-[#38bdf8] border border-[#38bdf8]/25 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"/>
              Work With CSC
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-5">
              Ready to Talk About
              <br />
              <span className="shimmer-blue">Your Program?</span>
            </h2>
            <p className="text-white/45 text-base leading-relaxed mb-8">
              Submit an RFP or reach out directly. A senior consultant will respond —
              not a sales team. We engage early, when supply chain decisions still matter most.
            </p>

            <div>
              <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">
                Common Engagement Types
              </p>
              <ul className="space-y-2.5">
                {useCases.map((u, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-[#38bdf8]/20 border border-[#38bdf8]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4L3 5.5L6.5 2" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-sm text-white/55">{u}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — contact card */}
          <div className="bg-[#f4f6fa] rounded-2xl p-8">
            <h3 className="text-lg font-bold text-[#0d1b2a] mb-2">Get In Touch</h3>
            <p className="text-sm text-[#0d1b2a]/50 mb-7">
              A senior CSC consultant responds to every inquiry directly — no intake coordinator, no delay.
            </p>

            <div className="space-y-4 mb-8">
              <a href="mailto:info@clinicalsupplyconsulting.com"
                className="flex items-center gap-4 p-4 rounded-xl border border-black/[0.06] bg-white hover:border-[#0284c7]/30 hover:bg-[#f0f9ff] transition-all duration-200 group">
                <div className="w-10 h-10 rounded-xl bg-[#e0f2fe] flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="2" y="4" width="14" height="10" rx="2" stroke="#0284c7" strokeWidth="1.4"/>
                    <path d="M2 6.5L9 10.5L16 6.5" stroke="#0284c7" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-[#0d1b2a]/40 mb-0.5 uppercase tracking-wide font-semibold">Email</div>
                  <div className="text-sm font-semibold text-[#0d1b2a] group-hover:text-[#0284c7] transition-colors truncate">
                    info@clinicalsupplyconsulting.com
                  </div>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="ml-auto flex-shrink-0 text-[#0d1b2a]/20 group-hover:text-[#0284c7] transition-colors">
                  <path d="M3 7H11M8 4L11 7L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              <a href="https://www.clinicalsupplyconsulting.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-black/[0.06] bg-white hover:border-[#0284c7]/30 hover:bg-[#f0f9ff] transition-all duration-200 group">
                <div className="w-10 h-10 rounded-xl bg-[#e0f2fe] flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="6.5" stroke="#0284c7" strokeWidth="1.4"/>
                    <path d="M2.5 9H15.5M9 2.5C9 2.5 7 5.5 7 9C7 12.5 9 15.5 9 15.5M9 2.5C9 2.5 11 5.5 11 9C11 12.5 9 15.5 9 15.5" stroke="#0284c7" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-[#0d1b2a]/40 mb-0.5 uppercase tracking-wide font-semibold">Website</div>
                  <div className="text-sm font-semibold text-[#0d1b2a] group-hover:text-[#0284c7] transition-colors">
                    clinicalsupplyconsulting.com
                  </div>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="ml-auto flex-shrink-0 text-[#0d1b2a]/20 group-hover:text-[#0284c7] transition-colors">
                  <path d="M3 7H11M8 4L11 7L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            <div className="pt-6 border-t border-black/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0c2340] flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1L13 4V7C13 10.3 10.2 13.1 7 14C3.8 13.1 1 10.3 1 7V4L7 1Z" stroke="#38bdf8" strokeWidth="1.3" fill="rgba(56,189,248,0.12)"/>
                    <path d="M4.5 7L6 8.5L9.5 5.5" stroke="#38bdf8" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-[11px] text-[#0d1b2a]/40 leading-relaxed">
                  Pennsylvania-based · Founded 2018 · Senior consultants only · 80+ countries · GCP compliant
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
