"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const fn = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      hero.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    };
    hero.addEventListener("mousemove", fn);
    return () => hero.removeEventListener("mousemove", fn);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-36"
      style={{ "--mx": "50%", "--my": "40%" } as React.CSSProperties}
    >
      {/* Deep navy background */}
      <div className="absolute inset-0 bg-[#0c2340]" />

      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Glow blobs */}
      <div className="blob-1 absolute top-[-5%] right-[-5%] w-[550px] h-[550px] rounded-full opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, #38bdf8, transparent 70%)" }}/>
      <div className="blob-2 absolute bottom-[-10%] left-[-8%] w-[450px] h-[450px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #f59e0b, transparent 70%)" }}/>

      {/* Mouse spotlight */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{ background: `radial-gradient(500px circle at var(--mx) var(--my), rgba(56,189,248,0.15), transparent 70%)` }}/>

      {/* Fine grid */}
      <div className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}/>

      {/* ── SVG Graphics ── */}

      {/* Right: supply chain / flow network */}
      <svg className="absolute right-0 top-0 h-full w-[44%] pointer-events-none opacity-[0.18]"
        viewBox="0 0 480 800" fill="none" preserveAspectRatio="xMaxYMid slice">
        {/* Flow lines */}
        {[
          ["M400,80 L300,180", "5s"],
          ["M300,180 L420,280", "4s"],
          ["M420,280 L320,390", "6s"],
          ["M320,390 L440,480", "5s"],
          ["M440,480 L330,580", "4.5s"],
          ["M300,180 L180,300", "7s"],
          ["M420,280 L460,160", "5s"],
          ["M320,390 L210,490", "6s"],
          ["M330,580 L440,660", "5s"],
        ].map(([d, dur], i) => (
          <path key={i} d={d as string} stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="5 4">
            <animate attributeName="stroke-dashoffset" from="0" to="-36" dur={dur as string} repeatCount="indefinite"/>
            <animate attributeName="stroke-opacity" values="0.4;0.9;0.4" dur={dur as string} repeatCount="indefinite"/>
          </path>
        ))}
        {/* Secondary dim lines */}
        {[
          "M460,160 L400,80",
          "M210,490 L330,580",
          "M180,300 L210,490",
        ].map((d, i) => (
          <path key={i} d={d} stroke="#7dd3fc" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.35"/>
        ))}

        {/* Nodes */}
        {([
          [400, 80, 9, "0.9", "3.5s"],
          [300, 180, 13, "0.85", "5s"],
          [420, 280, 11, "0.9", "4s"],
          [320, 390, 10, "0.8", "6s"],
          [440, 480, 8, "0.75", "4.5s"],
          [330, 580, 9, "0.8", "5s"],
          [460, 160, 5, "0.6", "4s"],
          [180, 300, 5, "0.55", "6s"],
          [210, 490, 5, "0.6", "5s"],
          [440, 660, 7, "0.7", "5s"],
        ] as [number, number, number, string, string][]).map(([cx, cy, r, op, dur], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={r} fill="#38bdf8" opacity={op}>
              <animate attributeName="r" values={`${r};${r + 2};${r}`} dur={dur} repeatCount="indefinite"/>
            </circle>
            <circle cx={cx} cy={cy} r={r * 2.2} fill="none" stroke="#38bdf8" strokeWidth="0.8" opacity="0.2">
              <animate attributeName="r" values={`${r * 2.2};${r * 3.2};${r * 2.2}`} dur={dur} repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.2;0;0.2" dur={dur} repeatCount="indefinite"/>
            </circle>
          </g>
        ))}

        {/* Travelling particle */}
        <circle r="3.5" fill="#7dd3fc" opacity="0.95">
          <animateMotion dur="9s" repeatCount="indefinite"
            path="M400,80 L300,180 L420,280 L320,390 L440,480 L330,580 L440,660"/>
        </circle>
        <circle r="2.5" fill="#f59e0b" opacity="0.8">
          <animateMotion dur="13s" repeatCount="indefinite" begin="4s"
            path="M460,160 L420,280 L180,300 L210,490 L330,580"/>
        </circle>
      </svg>

      {/* Left: vertical pipeline / process rail */}
      <svg className="absolute left-0 top-[10%] h-[80%] w-[160px] pointer-events-none opacity-[0.12]"
        viewBox="0 0 160 600" fill="none">
        {/* Vertical rail */}
        <line x1="80" y1="0" x2="80" y2="600" stroke="#38bdf8" strokeWidth="1" strokeDasharray="6 6">
          <animate attributeName="stroke-dashoffset" from="0" to="-48" dur="6s" repeatCount="indefinite"/>
        </line>
        {/* Phase markers */}
        {[80, 180, 280, 380, 480].map((y, i) => (
          <g key={i}>
            <circle cx="80" cy={y} r="8" fill="#0c2340" stroke="#38bdf8" strokeWidth="1.5"/>
            <circle cx="80" cy={y} r="3" fill="#38bdf8"/>
            <line x1="80" y1={y} x2="130" y2={y} stroke="#38bdf8" strokeWidth="0.8" opacity="0.5"/>
            <rect x="130" y={y - 10} width="28" height="20" rx="4" fill="#38bdf8" opacity="0.12"/>
          </g>
        ))}
      </svg>

      {/* Bottom-right: globe/grid arc */}
      <svg className="absolute bottom-20 right-10 pointer-events-none opacity-[0.12]"
        width="180" height="180" viewBox="0 0 180 180" fill="none">
        <circle cx="90" cy="90" r="70" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4"/>
        <circle cx="90" cy="90" r="50" stroke="#38bdf8" strokeWidth="0.7" strokeDasharray="3 5" opacity="0.6"/>
        <circle cx="90" cy="90" r="30" stroke="#7dd3fc" strokeWidth="0.7" opacity="0.5"/>
        <line x1="20" y1="90" x2="160" y2="90" stroke="#38bdf8" strokeWidth="0.7" opacity="0.4"/>
        <line x1="90" y1="20" x2="90" y2="160" stroke="#38bdf8" strokeWidth="0.7" opacity="0.4"/>
        <ellipse cx="90" cy="90" rx="70" ry="28" stroke="#38bdf8" strokeWidth="0.6" opacity="0.3"/>
        <circle cx="90" cy="90" r="5" fill="#38bdf8" opacity="0.9"/>
        {/* Country dots */}
        {[[130,60],[55,75],[110,110],[65,115],[145,95],[40,100]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="2.5" fill="#f59e0b" opacity="0.8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur={`${2+i*0.5}s`} repeatCount="indefinite"/>
          </circle>
        ))}
      </svg>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="animate-fade-in inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 border border-[#38bdf8]/25 bg-[#38bdf8]/8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse"/>
          <span className="text-[#bae6fd] text-xs font-semibold tracking-widest uppercase">
            Founded 2018 · Pennsylvania · Phase I–III · 80+ Countries
          </span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up text-5xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
          Senior Expertise.
          <br />
          End-to-End Supply.
          <br />
          <span className="shimmer-blue">No Hand-Offs.</span>
        </h1>

        {/* Sub */}
        <p className="animate-fade-up text-lg md:text-xl text-white/55 max-w-2xl mx-auto leading-relaxed mt-6"
          style={{ animationDelay: "0.15s", opacity: 0 }}>
          Clinical Supply Consulting delivers end-to-end clinical trial supply chain management
          for pharmaceutical and biotech sponsors — from study start-up through GCP-compliant
          close-out. Every engagement is led by a consultant with 10–30 years of sponsor-side experience.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          style={{ animationDelay: "0.3s", opacity: 0 }}>
          <a href="#contact"
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#38bdf8] text-[#0c2340] text-sm font-bold hover:bg-[#7dd3fc] transition-colors duration-200 group">
            Submit an RFP
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-1 transition-transform">
              <path d="M3 7H11M8 4L11 7L8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#services"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white/70 text-sm font-medium hover:border-white/40 hover:text-white transition-all duration-200">
            See Our Services
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25 z-10">
        <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent"/>
        <span className="text-[10px] text-white/50 tracking-widest uppercase">Scroll</span>
      </div>
    </section>
  );
}
