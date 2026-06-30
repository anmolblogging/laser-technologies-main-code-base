import { ArrowRight, Phone } from "lucide-react";

const BANNER_IMAGE =
  "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/GoogleAds/BannerGoogle.png";

interface AdsHeroProps {
  onOpenForm: () => void;
}

export default function AdsHero({ onOpenForm }: AdsHeroProps) {
  return (
    <section className="relative min-h-[55vh] md:min-h-[65vh] flex items-center bg-gray-900 text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={BANNER_IMAGE}
          alt="Laser Cutting Machine Manufacturing Facility"
          className="w-full h-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/30 to-black/10" />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-8 pb-16 md:pt-12 md:pb-24">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-primary font-light leading-[1.15] tracking-tight">
            Laser Cutting Machine{" "}
            <span className="text-[#f31524] font-normal">|</span>
            <br />
            Supplier in India
          </h1>

          <h2 className="mt-4 mb-6 text-xl md:text-2xl font-medium text-gray-200 font-primary">
            High-Performance Laser Cutting Machines for Industrial Manufacturing
          </h2>

          <p className="text-base md:text-lg text-gray-350 mb-6 leading-relaxed font-light font-secondary">
            From flat sheet metal fabrication to tube profiling and fully automated production lines,
            Laser Technologies supplies India's most comprehensive range of CNC and metal laser
            cutting machines. Built for the demands of industrial-scale manufacturing across
            automotive, aerospace, sheet metal, and heavy fabrication sectors.
          </p>

          <p className="text-sm md:text-base text-gray-400 mb-10 font-light italic font-secondary">
            Built for scale. Designed for reliability. Engineered for results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <button
              onClick={onOpenForm}
              className="inline-flex items-center justify-center gap-3 bg-[#f31524] text-white px-8 py-4 text-base md:text-lg font-primary font-medium hover:bg-[#d91220] transition-all duration-300 shadow-lg shadow-[#f31524]/20 group"
            >
              <span>Get a Custom Quote</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="tel:9004005151"
              className="inline-flex items-center justify-center gap-3 text-white px-8 py-4 text-base md:text-lg font-primary font-medium border border-white/20 bg-white/5 hover:bg-white/15 hover:border-white transition-all duration-300 backdrop-blur-sm"
            >
              <Phone className="w-5 h-5 text-[#f31524]" />
              <span>Book a Demo</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

