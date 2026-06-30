import { useState, useEffect } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const BANNER_IMAGE =
  "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/GoogleAds/BannerGoogle.png";

const TERMS = ["CNC Bending Machines", "CNC Press Brakes", "Automatic Panel Benders"];

interface AdsHeroProps {
  onOpenForm: () => void;
}

export default function AdsHero({ onOpenForm }: AdsHeroProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TERMS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[55vh] md:min-h-[65vh] flex items-center bg-gray-900 text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={BANNER_IMAGE}
          alt="CNC Bending Machine Manufacturing Facility"
          className="w-full h-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/30 to-black/10" />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-8 pb-16 md:pt-12 md:pb-24">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-primary font-light leading-[1.15] tracking-tight min-h-[2.5em] md:min-h-0">
            <span className="relative inline-block overflow-hidden h-[1.15em] align-bottom min-w-[280px] sm:min-w-[420px] md:min-w-[580px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute left-0 text-[#f31524] font-normal block w-full whitespace-nowrap"
                >
                  {TERMS[index]}
                </motion.span>
              </AnimatePresence>
            </span>
            <br className="hidden sm:inline" />
            <span className="font-light">Manufacturer in India</span>
          </h1>
          <h2 className="mt-4 mb-6 text-xl md:text-2xl font-medium text-gray-200 font-primary">
            High-Performance CNC Sheet Bending, Panel Bending Machines and Pipe & Tube Bending for Industrial Manufacturing
          </h2>

          <p className="text-base md:text-lg text-gray-350 mb-6 leading-relaxed font-light font-secondary">
           From entry-level NC sheet bending machines to heavy-duty CNC press brakes, automated panel benders, and CNC pipe and tube bending systems, Laser Technologies manufactures India's most comprehensive range of metal bending machines. Built for fabricators, OEMs, and industrial manufacturers who demand repeatable accuracy, strong construction, and production-scale throughput across every bending application.
          </p>

          <p className="text-sm md:text-base text-gray-400 mb-10 font-light italic font-secondary">
            Built for precision. Designed for productivity. Engineered for the long run.

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

