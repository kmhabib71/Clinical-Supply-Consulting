export default function Footer() {
  return (
    <footer className="bg-[#071525] border-t border-white/[0.06] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#0c2340] border border-[#38bdf8]/25 flex items-center justify-center">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="5" height="5" rx="1" fill="#38bdf8" opacity="0.9"/>
              <rect x="9" y="2" width="5" height="5" rx="1" fill="#38bdf8" opacity="0.5"/>
              <rect x="2" y="9" width="5" height="5" rx="1" fill="#38bdf8" opacity="0.5"/>
              <rect x="9" y="9" width="5" height="5" rx="1" fill="#38bdf8" opacity="0.9"/>
            </svg>
          </div>
          <span className="text-sm font-bold text-white">Clinical Supply Consulting</span>
        </div>

        <p className="text-xs text-white/20 text-center">
          © 2024 Clinical Supply Consulting, LLC · Pennsylvania · End-to-End Clinical Trial Supply Chain · Phase I–III · 80+ Countries
        </p>

        <div className="flex items-center gap-5 text-xs text-white/25">
          <a href="mailto:info@clinicalsupplyconsulting.com" className="hover:text-white/60 transition-colors">
            Contact
          </a>
          <a href="https://www.clinicalsupplyconsulting.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">
            clinicalsupplyconsulting.com
          </a>
        </div>
      </div>
    </footer>
  );
}
