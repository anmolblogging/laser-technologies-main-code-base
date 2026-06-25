import { Phone, Clock, Award } from "lucide-react";

const LOGO_URL =
  "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/logo-nav.png";

export default function AdsNavbar() {
  return (
    <header className="w-full sticky top-0 z-50">
      <div
        className="relative bg-white/95 backdrop-blur-md border-b border-gray-100"
        style={{ boxShadow: "0 1px 0 0 rgba(0,0,0,0.06), 0 4px 24px -4px rgba(0,0,0,0.08)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20 pt-[3px]">

            {/* ── Logo ── */}
            <div className="flex-shrink-0">
              <img
                src={LOGO_URL}
                alt="Laser Technologies Logo"
                className="h-9 sm:h-10 lg:h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fb = e.currentTarget.nextElementSibling as HTMLElement | null;
                  if (fb) fb.style.display = "block";
                }}
              />
              <span
                className="text-2xl font-medium text-[#f31524] tracking-tight"
                style={{ display: "none" }}
              >
                LT
              </span>
            </div>

            {/* ── Info pointers — desktop ── */}
            <div className="hidden md:flex items-center">
              {/* ISO Certified */}
              <div className="flex items-center gap-2.5 px-5 lg:px-6 border-r border-gray-150">
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                  <Award className="w-4 h-4 text-[#f31524]" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-0.5">Certified</span>
                  <span className="text-sm font-medium text-gray-800">ISO 9001:2015</span>
                </div>
              </div>

              {/* Toll Free */}
              <a
                href="tel:9004005151"
                className="group flex items-center gap-2.5 px-5 lg:px-6 border-r border-gray-150 hover:bg-red-50/60 transition-colors duration-200 h-full py-3"
              >
                <div className="w-8 h-8 rounded-full bg-red-50 group-hover:bg-[#f31524] flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                  <Phone className="w-4 h-4 text-[#f31524] group-hover:text-white transition-colors duration-200" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-0.5">Toll Free</span>
                  <span className="text-sm font-medium text-gray-800 group-hover:text-[#f31524] transition-colors duration-200">
                    9004005151
                  </span>
                </div>
              </a>

              {/* 24×7 Support */}
              <div className="flex items-center gap-2.5 px-5 lg:px-6">
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-[#f31524]" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-0.5">Support</span>
                  <span className="text-sm font-medium text-gray-800">24 × 7</span>
                </div>
              </div>
            </div>

            {/* ── Mobile: compact pill strip ── */}
            <div className="flex md:hidden items-center gap-2">
              <a
                href="tel:9004005151"
                className="flex items-center gap-1.5 bg-[#f31524] text-white text-xs font-medium px-3 py-2 rounded-full"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>9004005151</span>
              </a>
              <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 text-gray-600 text-[11px] font-medium px-2.5 py-2 rounded-full">
                <Clock className="w-3 h-3 text-[#f31524]" />
                <span>24×7</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
