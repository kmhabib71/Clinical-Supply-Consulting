"use client";
import { useEffect, useRef, useState, useCallback } from "react";

// Active depot / operation cities — [longitude, latitude, label, pulse duration]
const ACTIVE_NODES: [number, number, string, string][] = [
  [-75.2, 40.0, "Philadelphia", "3.5s"],
  [-87.6, 41.9, "Chicago", "4s"],
  [-122.4, 37.8, "San Francisco", "5s"],
  [-0.1, 51.5, "London", "3s"],
  [8.7, 50.1, "Frankfurt", "4.5s"],
  [21.0, 52.2, "Warsaw", "5s"],
  [55.3, 25.3, "Dubai", "4s"],
  [121.5, 31.2, "Shanghai", "3.5s"],
  [139.7, 35.7, "Tokyo", "4s"],
  [72.9, 19.1, "Mumbai", "5s"],
  [151.2, -33.9, "Sydney", "4.5s"],
  [-46.6, -23.5, "São Paulo", "3.5s"],
  [36.8, -1.3, "Nairobi", "5s"],
];

// Supply lane connections between nodes (indices)
const SUPPLY_LANES = [
  [0, 1], [1, 2], [0, 3], [3, 4], [4, 5],
  [3, 6], [6, 9], [9, 7], [7, 8], [7, 10],
  [0, 11], [3, 12],
];

// Convert geo coords to mercator x,y on our canvas
function geoToXY(lon: number, lat: number, w: number, h: number): [number, number] {
  const x = ((lon + 180) / 360) * w;
  const latRad = (lat * Math.PI) / 180;
  const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const y = h / 2 - (mercN / Math.PI) * (h / 2) * 0.77;
  return [x, y];
}

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

function DotMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 800, h: 400 });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = dims.w;
    const H = dims.h;
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);

    const SPACING = Math.max(6, Math.floor(W / 120));
    const cols = Math.floor(W / SPACING);
    const rows = Math.floor(H / SPACING);

    // We'll draw a dot-grid by testing each point against a world-map image
    // rendered into an offscreen canvas. Use a simplified path-based approach.
    const offscreen = document.createElement("canvas");
    offscreen.width = W;
    offscreen.height = H;
    const offCtx = offscreen.getContext("2d");
    if (!offCtx) return;

    // Draw simplified world continents as filled paths
    offCtx.fillStyle = "#fff";
    offCtx.beginPath();

    // Helper to convert geo to canvas coords
    const g = (lon: number, lat: number): [number, number] => geoToXY(lon, lat, W, H);

    // North America
    const naPoints: [number, number][] = [
      [-170,65],[-168,68],[-162,70],[-152,72],[-140,72],[-130,72],[-120,73],[-105,72],
      [-95,72],[-85,70],[-80,68],[-75,65],[-65,62],[-55,58],[-55,52],[-60,47],
      [-65,44],[-70,42],[-75,40],[-80,38],[-82,30],[-85,29],[-90,29],[-95,28],
      [-98,26],[-100,22],[-105,20],[-108,24],[-115,30],[-118,34],[-122,37],
      [-124,42],[-124,48],[-130,55],[-140,60],[-150,60],[-160,58],[-168,62],[-170,65]
    ];
    offCtx.moveTo(...g(...naPoints[0]));
    naPoints.slice(1).forEach(p => offCtx.lineTo(...g(...p)));
    offCtx.closePath();

    // Greenland
    const glPoints: [number, number][] = [
      [-55,82],[-40,84],[-20,82],[-15,78],[-18,75],[-22,72],[-35,68],
      [-45,68],[-50,72],[-55,76],[-55,82]
    ];
    offCtx.moveTo(...g(...glPoints[0]));
    glPoints.slice(1).forEach(p => offCtx.lineTo(...g(...p)));
    offCtx.closePath();

    // South America
    const saPoints: [number, number][] = [
      [-80,10],[-75,12],[-68,12],[-62,10],[-52,5],[-48,0],[-45,-5],[-40,-10],
      [-38,-15],[-36,-20],[-40,-24],[-48,-28],[-53,-32],[-58,-38],[-65,-42],
      [-68,-52],[-72,-50],[-75,-45],[-72,-38],[-70,-30],[-72,-20],[-75,-12],
      [-78,-2],[-80,5],[-80,10]
    ];
    offCtx.moveTo(...g(...saPoints[0]));
    saPoints.slice(1).forEach(p => offCtx.lineTo(...g(...p)));
    offCtx.closePath();

    // Europe
    const euPoints: [number, number][] = [
      [-10,72],[-5,62],[0,58],[5,52],[0,48],[-5,44],[-5,38],[0,36],
      [5,38],[10,38],[15,40],[20,38],[25,36],[28,38],[30,42],[28,45],
      [25,48],[20,50],[18,54],[20,56],[22,58],[28,60],[30,62],[35,65],
      [40,68],[35,70],[25,72],[15,72],[5,72],[-10,72]
    ];
    offCtx.moveTo(...g(...euPoints[0]));
    euPoints.slice(1).forEach(p => offCtx.lineTo(...g(...p)));
    offCtx.closePath();

    // Africa
    const afPoints: [number, number][] = [
      [-15,36],[-5,36],[5,36],[10,34],[15,32],[25,32],[32,30],[35,28],
      [42,12],[50,12],[52,5],[48,0],[42,-5],[40,-12],[35,-20],[32,-28],
      [28,-32],[25,-34],[20,-35],[15,-30],[12,-22],[8,-5],[5,0],[2,5],
      [-5,12],[-8,10],[-12,12],[-15,15],[-18,20],[-15,28],[-15,36]
    ];
    offCtx.moveTo(...g(...afPoints[0]));
    afPoints.slice(1).forEach(p => offCtx.lineTo(...g(...p)));
    offCtx.closePath();

    // Asia / Russia
    const asPoints: [number, number][] = [
      [30,72],[40,72],[50,72],[60,72],[70,72],[80,72],[90,72],[100,72],
      [110,72],[120,72],[130,70],[140,68],[150,65],[160,62],[170,65],
      [175,60],[170,55],[140,48],[135,45],[130,42],[128,38],[130,32],
      [125,25],[120,22],[115,18],[110,15],[108,8],[105,2],[100,-5],[98,0],
      [95,8],[88,22],[80,28],[75,25],[72,20],[68,25],[62,25],[55,26],
      [50,28],[45,30],[42,32],[40,38],[38,40],[35,42],[32,45],[30,48],
      [28,55],[30,60],[30,65],[30,72]
    ];
    offCtx.moveTo(...g(...asPoints[0]));
    asPoints.slice(1).forEach(p => offCtx.lineTo(...g(...p)));
    offCtx.closePath();

    // India
    const inPoints: [number, number][] = [
      [68,28],[72,32],[75,28],[78,22],[80,18],[82,15],[80,8],[78,8],
      [75,10],[72,15],[68,20],[68,28]
    ];
    offCtx.moveTo(...g(...inPoints[0]));
    inPoints.slice(1).forEach(p => offCtx.lineTo(...g(...p)));
    offCtx.closePath();

    // Japan
    const jpPoints: [number, number][] = [
      [130,34],[132,35],[135,36],[138,38],[140,40],[142,42],[145,45],
      [144,43],[141,40],[139,38],[137,35],[135,33],[132,32],[130,34]
    ];
    offCtx.moveTo(...g(...jpPoints[0]));
    jpPoints.slice(1).forEach(p => offCtx.lineTo(...g(...p)));
    offCtx.closePath();

    // SE Asia / Indonesia
    const seaPoints: [number, number][] = [
      [100,8],[102,5],[105,2],[108,0],[110,-2],[115,-5],[120,-6],
      [125,-8],[130,-5],[128,0],[125,2],[120,5],[115,8],[110,10],
      [105,8],[100,8]
    ];
    offCtx.moveTo(...g(...seaPoints[0]));
    seaPoints.slice(1).forEach(p => offCtx.lineTo(...g(...p)));
    offCtx.closePath();

    // Australia
    const auPoints: [number, number][] = [
      [115,-15],[120,-14],[125,-14],[130,-12],[135,-13],[140,-16],
      [145,-18],[150,-22],[153,-25],[152,-30],[150,-35],[148,-38],
      [145,-40],[140,-38],[135,-35],[130,-32],[125,-34],[120,-34],
      [118,-32],[116,-30],[114,-26],[114,-22],[115,-18],[115,-15]
    ];
    offCtx.moveTo(...g(...auPoints[0]));
    auPoints.slice(1).forEach(p => offCtx.lineTo(...g(...p)));
    offCtx.closePath();

    // UK
    const ukPoints: [number, number][] = [
      [-5,58],[-3,58],[-1,56],[0,52],[-2,50],[-5,50],[-6,52],[-6,55],[-5,58]
    ];
    offCtx.moveTo(...g(...ukPoints[0]));
    ukPoints.slice(1).forEach(p => offCtx.lineTo(...g(...p)));
    offCtx.closePath();

    offCtx.fill();

    // Now read pixel data to determine which dots are land
    const imgData = offCtx.getImageData(0, 0, W, H);
    const isLand = (px: number, py: number): boolean => {
      const ix = Math.round(px);
      const iy = Math.round(py);
      if (ix < 0 || ix >= W || iy < 0 || iy >= H) return false;
      return imgData.data[(iy * W + ix) * 4 + 0] > 128;
    };

    // Draw dots
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cx = col * SPACING + SPACING / 2;
        const cy = row * SPACING + SPACING / 2;
        const land = isLand(cx, cy);

        ctx.beginPath();
        ctx.arc(cx, cy, land ? SPACING * 0.18 : SPACING * 0.1, 0, Math.PI * 2);
        ctx.fillStyle = land ? "rgba(56, 189, 248, 0.55)" : "rgba(30, 58, 82, 0.6)";
        ctx.fill();
      }
    }

    // Draw supply lanes
    SUPPLY_LANES.forEach(([ai, bi]) => {
      const a = ACTIVE_NODES[ai];
      const b = ACTIVE_NODES[bi];
      const [x1, y1] = geoToXY(a[0], a[1], W, H);
      const [x2, y2] = geoToXY(b[0], b[1], W, H);
      ctx.beginPath();
      ctx.setLineDash([4, 5]);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.2)";
      ctx.lineWidth = 1;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // Draw active nodes
    ACTIVE_NODES.forEach(([lon, lat]) => {
      const [x, y] = geoToXY(lon, lat, W, H);
      // Outer glow
      const grad = ctx.createRadialGradient(x, y, 0, x, y, SPACING * 1.5);
      grad.addColorStop(0, "rgba(56, 189, 248, 0.35)");
      grad.addColorStop(1, "rgba(56, 189, 248, 0)");
      ctx.beginPath();
      ctx.arc(x, y, SPACING * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      // Core
      ctx.beginPath();
      ctx.arc(x, y, SPACING * 0.42, 0, Math.PI * 2);
      ctx.fillStyle = "#38bdf8";
      ctx.fill();
      // White center
      ctx.beginPath();
      ctx.arc(x, y, SPACING * 0.18, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.fill();
    });
  }, [dims]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      for (const e of entries) {
        const w = Math.floor(e.contentRect.width);
        const h = Math.max(260, Math.floor(w * 0.48));
        setDims({ w, h });
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div ref={containerRef} className="relative w-full">
      <canvas ref={canvasRef} className="w-full block"/>
    </div>
  );
}

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

          {/* Dot-grid world map (canvas rendered) */}
          <div className="relative rounded-2xl border border-black/[0.07] bg-[#0c1f35] overflow-hidden mb-8">
            <div className="p-4 md:p-6">
              <DotMap />
            </div>
            {/* Legend */}
            <div className="flex items-center gap-5 px-5 py-3 border-t border-white/[0.06]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]"/>
                <span className="text-[11px] text-white/40 font-medium">Active Depot / Operation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-0 border-t border-dashed border-[#38bdf8]/40"/>
                <span className="text-[11px] text-white/40 font-medium">Supply Lane</span>
              </div>
              <span className="ml-auto text-[11px] text-white/25 uppercase tracking-widest hidden sm:inline">80+ Countries of Experience</span>
            </div>
          </div>

          {/* Stats + Regions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
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
