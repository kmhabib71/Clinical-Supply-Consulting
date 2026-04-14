"use client";
import { useEffect, useRef, useState } from "react";

// Dot-grid world map — each pair is [col, row] in a 72×36 grid
// These are real land-mass coordinates derived from mercator projection
const LAND_DOTS: [number, number][] = [
  // North America
  [6,8],[7,8],[8,8],[9,8],[10,8],[11,8],
  [6,9],[7,9],[8,9],[9,9],[10,9],[11,9],[12,9],[13,9],
  [5,10],[6,10],[7,10],[8,10],[9,10],[10,10],[11,10],[12,10],[13,10],[14,10],
  [5,11],[6,11],[7,11],[8,11],[9,11],[10,11],[11,11],[12,11],[13,11],[14,11],[15,11],
  [6,12],[7,12],[8,12],[9,12],[10,12],[11,12],[12,12],[13,12],[14,12],
  [7,13],[8,13],[9,13],[10,13],[11,13],[12,13],[13,13],
  [8,14],[9,14],[10,14],[11,14],[12,14],
  [9,15],[10,15],[11,15],
  // Greenland
  [14,5],[15,5],[16,5],[14,6],[15,6],[16,6],[15,7],
  // Central America
  [10,16],[11,16],[10,17],
  // Caribbean
  [13,15],[14,15],[15,15],
  // South America
  [13,17],[14,17],[15,17],[16,17],
  [12,18],[13,18],[14,18],[15,18],[16,18],[17,18],
  [12,19],[13,19],[14,19],[15,19],[16,19],[17,19],
  [12,20],[13,20],[14,20],[15,20],[16,20],[17,20],
  [13,21],[14,21],[15,21],[16,21],[17,21],
  [13,22],[14,22],[15,22],[16,22],
  [13,23],[14,23],[15,23],
  [14,24],[15,24],
  [14,25],[15,25],
  // UK / Ireland
  [34,9],[35,9],[34,10],[35,10],
  // Europe
  [36,9],[37,9],[38,9],[39,9],[40,9],[41,9],
  [35,10],[36,10],[37,10],[38,10],[39,10],[40,10],[41,10],[42,10],[43,10],
  [35,11],[36,11],[37,11],[38,11],[39,11],[40,11],[41,11],[42,11],[43,11],[44,11],
  [36,12],[37,12],[38,12],[39,12],[40,12],[41,12],[42,12],[43,12],[44,12],[45,12],
  [37,13],[38,13],[39,13],[40,13],[41,13],[42,13],[43,13],[44,13],
  [38,14],[39,14],[40,14],[41,14],[42,14],[43,14],
  // Scandinavia
  [38,7],[39,7],[40,7],[41,7],[42,7],
  [38,8],[39,8],[40,8],[41,8],[42,8],[43,8],
  // Africa
  [36,15],[37,15],[38,15],[39,15],[40,15],[41,15],[42,15],[43,15],
  [35,16],[36,16],[37,16],[38,16],[39,16],[40,16],[41,16],[42,16],[43,16],[44,16],
  [35,17],[36,17],[37,17],[38,17],[39,17],[40,17],[41,17],[42,17],[43,17],[44,17],
  [35,18],[36,18],[37,18],[38,18],[39,18],[40,18],[41,18],[42,18],[43,18],[44,18],
  [35,19],[36,19],[37,19],[38,19],[39,19],[40,19],[41,19],[42,19],[43,19],
  [36,20],[37,20],[38,20],[39,20],[40,20],[41,20],[42,20],[43,20],
  [37,21],[38,21],[39,21],[40,21],[41,21],[42,21],
  [38,22],[39,22],[40,22],[41,22],
  [39,23],[40,23],
  // Middle East
  [44,13],[45,13],[46,13],[47,13],
  [44,14],[45,14],[46,14],[47,14],[48,14],
  [44,15],[45,15],[46,15],[47,15],[48,15],
  // Russia / Central Asia
  [43,8],[44,8],[45,8],[46,8],[47,8],[48,8],[49,8],[50,8],[51,8],[52,8],[53,8],[54,8],[55,8],[56,8],
  [43,9],[44,9],[45,9],[46,9],[47,9],[48,9],[49,9],[50,9],[51,9],[52,9],[53,9],[54,9],[55,9],[56,9],[57,9],
  [44,10],[45,10],[46,10],[47,10],[48,10],[49,10],[50,10],[51,10],[52,10],[53,10],[54,10],[55,10],[56,10],
  [45,11],[46,11],[47,11],[48,11],[49,11],[50,11],[51,11],[52,11],[53,11],[54,11],
  [46,12],[47,12],[48,12],[49,12],[50,12],[51,12],[52,12],[53,12],
  // India
  [48,14],[49,14],[50,14],
  [47,15],[48,15],[49,15],[50,15],
  [48,16],[49,16],[50,16],
  [48,17],[49,17],
  [49,18],
  // South / SE Asia
  [51,13],[52,13],[53,13],[54,13],[55,13],[56,13],
  [51,14],[52,14],[53,14],[54,14],[55,14],[56,14],[57,14],[58,14],
  [52,15],[53,15],[54,15],[55,15],[56,15],[57,15],[58,15],[59,15],
  [54,16],[55,16],[56,16],[57,16],[58,16],[59,16],[60,16],[61,16],
  // China / Japan
  [50,11],[51,11],[52,11],[53,11],[54,11],[55,11],[56,11],[57,11],[58,11],[59,11],[60,11],
  [50,12],[51,12],[52,12],[53,12],[54,12],[55,12],[56,12],[57,12],[58,12],[59,12],[60,12],[61,12],
  [59,10],[60,10],[61,10],[62,10],[63,10],[64,10],
  [62,11],[63,11],[64,11],[65,11],
  [62,12],[63,12],[64,12],
  // Australia
  [57,22],[58,22],[59,22],[60,22],[61,22],[62,22],
  [57,23],[58,23],[59,23],[60,23],[61,23],[62,23],[63,23],
  [57,24],[58,24],[59,24],[60,24],[61,24],[62,24],
  [58,25],[59,25],[60,25],[61,25],
  // New Zealand
  [65,25],[65,26],[66,26],
];

// Active depot / operation cities — [col, row, label, pulse duration]
const ACTIVE_NODES: [number, number, string, string][] = [
  [9, 11, "Philadelphia", "3.5s"],   // Pennsylvania HQ
  [8, 10, "Chicago", "4s"],
  [5, 11, "San Francisco", "5s"],
  [36, 10, "London", "3s"],
  [38, 10, "Frankfurt", "4.5s"],
  [40, 10, "Warsaw", "5s"],
  [44, 13, "Dubai", "4s"],
  [56, 12, "Shanghai", "3.5s"],
  [63, 11, "Tokyo", "4s"],
  [48, 15, "Mumbai", "5s"],
  [59, 23, "Sydney", "4.5s"],
  [13, 18, "São Paulo", "3.5s"],
  [37, 16, "Nairobi", "5s"],
];

const COLS = 72;
const ROWS = 36;
const DOT_R = 1.4;
const SPACING = 8;
const W = COLS * SPACING;
const H = ROWS * SPACING;

const landSet = new Set(LAND_DOTS.map(([c, r]) => `${c},${r}`));

const regions = [
  { name: "North America", detail: "US, Canada, Mexico — primary depot hub" },
  { name: "Europe", detail: "EU, UK, Switzerland — full regulatory coverage" },
  { name: "Asia-Pacific", detail: "Japan, Australia, Singapore, South Korea" },
  { name: "Latin America", detail: "Brazil, Argentina, Colombia — import expertise" },
  { name: "Middle East & Africa", detail: "UAE, Israel, South Africa coverage" },
  { name: "Eastern Europe", detail: "Poland, Czech Republic, Ukraine experience" },
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
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="global" className="relative py-28 px-6 bg-[#f4f6fa] overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full opacity-[0.05] pointer-events-none blob-1"
        style={{ background: "radial-gradient(circle, #38bdf8, transparent 70%)" }}/>

      <div className="max-w-6xl mx-auto">
        <div ref={ref}
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}>

          {/* Header */}
          <div className="mb-12">
            <span className="pill bg-[#e0f2fe] text-[#0369a1] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]"/>
              Global Operations
            </span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#0d1b2a] tracking-tight leading-tight">
                80+ Countries.
                <br />
                <span className="shimmer-blue">One Accountable Team.</span>
              </h2>
              <p className="text-[#0d1b2a]/45 text-sm max-w-sm leading-relaxed">
                Import permits, cold chain, customs timelines, depot reliability — CSC has navigated
                every complexity, built over decades of direct global operations.
              </p>
            </div>
          </div>

          {/* ── Dot-grid world map ── */}
          <div className="relative rounded-2xl border border-black/[0.07] bg-[#0c1f35] overflow-hidden mb-8">
            <div className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
              }}/>

            <div className="overflow-x-auto">
              <svg
                viewBox={`0 0 ${W} ${H}`}
                width="100%"
                style={{ minWidth: "560px", display: "block" }}
                fill="none"
              >
                {/* Ocean dots */}
                {Array.from({ length: ROWS }, (_, r) =>
                  Array.from({ length: COLS }, (_, c) => {
                    const isLand = landSet.has(`${c},${r}`);
                    if (isLand) return null;
                    return (
                      <circle
                        key={`o-${c}-${r}`}
                        cx={c * SPACING + SPACING / 2}
                        cy={r * SPACING + SPACING / 2}
                        r={DOT_R * 0.6}
                        fill="#1e3a52"
                      />
                    );
                  })
                )}

                {/* Land dots */}
                {LAND_DOTS.map(([c, r]) => (
                  <circle
                    key={`l-${c}-${r}`}
                    cx={c * SPACING + SPACING / 2}
                    cy={r * SPACING + SPACING / 2}
                    r={DOT_R}
                    fill="#2d6a9f"
                    opacity="0.7"
                  />
                ))}

                {/* Active depot nodes */}
                {ACTIVE_NODES.map(([c, r, , dur], i) => {
                  const cx = c * SPACING + SPACING / 2;
                  const cy = r * SPACING + SPACING / 2;
                  return (
                    <g key={`n-${i}`}>
                      {/* Pulse ring */}
                      <circle cx={cx} cy={cy} r="6" fill="none" stroke="#38bdf8" strokeWidth="1" opacity="0.5">
                        <animate attributeName="r" values="4;10;4" dur={dur} repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="0.5;0;0.5" dur={dur} repeatCount="indefinite"/>
                      </circle>
                      {/* Core dot */}
                      <circle cx={cx} cy={cy} r="3.5" fill="#38bdf8">
                        <animate attributeName="opacity" values="0.7;1;0.7" dur={dur} repeatCount="indefinite"/>
                      </circle>
                      <circle cx={cx} cy={cy} r="1.5" fill="white" opacity="0.9"/>
                    </g>
                  );
                })}

                {/* Connection lines between key hubs */}
                {([
                  [ACTIVE_NODES[0], ACTIVE_NODES[1]],
                  [ACTIVE_NODES[1], ACTIVE_NODES[2]],
                  [ACTIVE_NODES[0], ACTIVE_NODES[3]],
                  [ACTIVE_NODES[3], ACTIVE_NODES[4]],
                  [ACTIVE_NODES[3], ACTIVE_NODES[5]],
                  [ACTIVE_NODES[4], ACTIVE_NODES[7]],
                  [ACTIVE_NODES[7], ACTIVE_NODES[8]],
                ] as [[number,number,string,string],[number,number,string,string]][]).map(([a, b], i) => {
                  const x1 = a[0] * SPACING + SPACING / 2;
                  const y1 = a[1] * SPACING + SPACING / 2;
                  const x2 = b[0] * SPACING + SPACING / 2;
                  const y2 = b[1] * SPACING + SPACING / 2;
                  return (
                    <line key={`line-${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke="#38bdf8" strokeWidth="0.6" strokeDasharray="4 4" opacity="0.25">
                      <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="4s" repeatCount="indefinite"/>
                    </line>
                  );
                })}
              </svg>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-5 px-5 py-3 border-t border-white/[0.06]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]"/>
                <span className="text-[11px] text-white/40 font-medium">Active Depot / Operation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-0.5 bg-[#38bdf8] opacity-40" style={{ borderTop: "1px dashed #38bdf8" }}/>
                <span className="text-[11px] text-white/40 font-medium">Supply Lane</span>
              </div>
              <span className="ml-auto text-[11px] text-white/25 uppercase tracking-widest">80+ Countries of Experience</span>
            </div>
          </div>

          {/* Stats + Regions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Stat blocks */}
            <div className="grid grid-cols-2 gap-3">
              {capabilities.map((c, i) => (
                <div key={i}
                  className="bg-[#0c2340] rounded-xl p-5"
                  style={{
                    opacity: vis ? 1 : 0,
                    transition: `opacity 0.5s ease ${0.3 + i * 0.1}s`,
                  }}>
                  <div className="text-2xl font-extrabold text-[#38bdf8] mb-1">{c.label}</div>
                  <div className="text-xs text-white/45 leading-relaxed">{c.desc}</div>
                </div>
              ))}
            </div>

            {/* Regions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {regions.map((r, i) => (
                <div key={i}
                  className="flex items-start gap-3 bg-white rounded-xl p-4 border border-black/[0.06]"
                  style={{
                    opacity: vis ? 1 : 0,
                    transition: `opacity 0.5s ease ${0.4 + i * 0.08}s`,
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
    </section>
  );
}
