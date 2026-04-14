"use client";
import { useEffect, useRef, useState } from "react";

const regions = [
  { name: "North America", detail: "US, Canada, Mexico — primary depot hub", dot: [38, 42] },
  { name: "Europe", detail: "EU, UK, Switzerland — full regulatory coverage", dot: [48, 32] },
  { name: "Asia-Pacific", detail: "Japan, Australia, Singapore, South Korea", dot: [74, 42] },
  { name: "Latin America", detail: "Brazil, Argentina, Colombia — import expertise", dot: [32, 60] },
  { name: "Middle East & Africa", detail: "UAE, Israel, South Africa coverage", dot: [56, 50] },
  { name: "Eastern Europe", detail: "Poland, Czech Republic, Ukraine experience", dot: [52, 30] },
];

const capabilities = [
  { label: "80+", desc: "Countries of operational experience" },
  { label: "20+", desc: "Therapeutic areas covered globally" },
  { label: "Phase I–III", desc: "Full lifecycle global supply support" },
  { label: "GCP", desc: "Compliant across all major regulatories" },
];

export default function GlobalReach() {
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
    <section id="global" className="relative py-28 px-6 bg-[#f4f6fa] overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full opacity-[0.06] pointer-events-none blob-1"
        style={{ background: "radial-gradient(circle, #38bdf8, transparent 70%)" }}/>

      <div className="max-w-6xl mx-auto">
        <div ref={ref}
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div>
              <span className="pill bg-[#e0f2fe] text-[#0369a1] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]"/>
                Global Operations
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#0d1b2a] tracking-tight leading-tight mb-5">
                80+ Countries.
                <br />
                <span className="shimmer-blue">One Accountable Team.</span>
              </h2>
              <p className="text-[#0d1b2a]/50 text-base leading-relaxed mb-8">
                Clinical supply chain complexity scales with geography. Import permits,
                cold chain requirements, customs clearance timelines, depot reliability —
                each country adds variables that derail programs managed by teams without
                direct experience. CSC has that experience, built over decades of global operations.
              </p>

              {/* Capability stats */}
              <div className="grid grid-cols-2 gap-3">
                {capabilities.map((c, i) => (
                  <div key={i}
                    className="bg-[#0c2340] rounded-xl p-4"
                    style={{
                      opacity: vis ? 1 : 0,
                      transition: `opacity 0.5s ease ${0.2 + i * 0.1}s`,
                    }}>
                    <div className="text-xl font-extrabold text-[#38bdf8] mb-1">{c.label}</div>
                    <div className="text-xs text-white/50 leading-relaxed">{c.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — SVG world map suggestion + regions */}
            <div>
              {/* Abstract world SVG */}
              <div className="relative rounded-2xl border border-black/[0.06] bg-white overflow-hidden mb-5 p-6">
                <svg viewBox="0 0 400 200" fill="none" className="w-full opacity-80">
                  {/* Simplified continent outlines */}
                  {/* North America */}
                  <path d="M60 40 C55 35,50 38,48 45 C42 60,38 75,45 85 C50 90,58 95,65 88 C72 80,78 70,80 60 C82 50,72 42,60 40Z"
                    fill="#e0f2fe" stroke="#0284c7" strokeWidth="0.8"/>
                  {/* South America */}
                  <path d="M78 105 C72 100,65 105,62 115 C58 128,60 142,68 150 C74 155,82 152,86 144 C90 135,92 120,88 110 C85 104,82 106,78 105Z"
                    fill="#e0f2fe" stroke="#0284c7" strokeWidth="0.8"/>
                  {/* Europe */}
                  <path d="M170 30 C165 28,160 32,158 38 C155 45,158 52,164 55 C170 57,178 54,180 48 C182 40,176 32,170 30Z"
                    fill="#bae6fd" stroke="#0284c7" strokeWidth="0.8"/>
                  {/* Africa */}
                  <path d="M168 68 C162 65,156 70,154 80 C150 95,152 115,160 125 C166 132,175 130,180 122 C186 112,186 95,182 82 C178 70,174 70,168 68Z"
                    fill="#e0f2fe" stroke="#0284c7" strokeWidth="0.8"/>
                  {/* Asia */}
                  <path d="M195 25 C190 22,184 25,182 32 C176 45,180 65,190 75 C198 82,215 82,228 75 C242 67,250 52,245 38 C240 24,228 18,215 18 C206 18,200 22,195 25Z"
                    fill="#bae6fd" stroke="#0284c7" strokeWidth="0.8"/>
                  {/* Australia */}
                  <path d="M295 120 C288 116,280 120,278 130 C275 142,280 155,290 158 C300 160,310 154,312 144 C315 132,308 122,295 120Z"
                    fill="#e0f2fe" stroke="#0284c7" strokeWidth="0.8"/>
                  {/* Grid lines */}
                  {[50,100,150].map(y => (
                    <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#38bdf8" strokeWidth="0.3" opacity="0.3"/>
                  ))}
                  {[80,160,240,320].map(x => (
                    <line key={x} x1={x} y1="0" x2={x} y2="200" stroke="#38bdf8" strokeWidth="0.3" opacity="0.3"/>
                  ))}
                  {/* Active location dots */}
                  {([
                    [65,62,"#38bdf8","3s"],
                    [170,42,"#38bdf8","4s"],
                    [178,95,"#f59e0b","3.5s"],
                    [75,125,"#f59e0b","5s"],
                    [218,48,"#38bdf8","4.5s"],
                    [295,138,"#38bdf8","3s"],
                    [185,35,"#7dd3fc","4s"],
                    [228,68,"#7dd3fc","5s"],
                  ] as [number,number,string,string][]).map(([x,y,c,dur],i) => (
                    <g key={i}>
                      <circle cx={x} cy={y} r="3.5" fill={c} opacity="0.9">
                        <animate attributeName="opacity" values="0.5;1;0.5" dur={dur} repeatCount="indefinite"/>
                      </circle>
                      <circle cx={x} cy={y} r="7" fill="none" stroke={c} strokeWidth="0.8" opacity="0.4">
                        <animate attributeName="r" values="4;9;4" dur={dur} repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="0.4;0;0.4" dur={dur} repeatCount="indefinite"/>
                      </circle>
                    </g>
                  ))}
                </svg>
                <p className="text-[11px] text-[#0d1b2a]/30 text-center mt-2 tracking-wide uppercase">
                  Active supply chain experience — 80+ countries
                </p>
              </div>

              {/* Region list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {regions.map((r, i) => (
                  <div key={i}
                    className="flex items-start gap-3 bg-white rounded-xl p-4 border border-black/[0.06]"
                    style={{
                      opacity: vis ? 1 : 0,
                      transition: `opacity 0.5s ease ${0.3 + i * 0.08}s`,
                    }}>
                    <div className="w-2 h-2 rounded-full bg-[#38bdf8] flex-shrink-0 mt-1.5"/>
                    <div>
                      <div className="text-xs font-bold text-[#0d1b2a] mb-0.5">{r.name}</div>
                      <div className="text-[11px] text-[#0d1b2a]/40 leading-relaxed">{r.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
