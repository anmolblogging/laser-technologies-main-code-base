import { motion } from "motion/react";
import { ArrowRight, Phone } from "lucide-react";

interface AdsMidCTAProps {
  onOpenForm: () => void;
}

export default function AdsMidCTA({ onOpenForm }: AdsMidCTAProps) {
  return (
    <section className="relative py-24 md:py-28 text-white overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/dark_BACKGROUND.jpg")',
        }}
      />
      <div className="absolute inset-0 z-0 bg-black/70" />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.h2
          className="text-3xl md:text-5xl font-primary font-medium mb-6 text-white leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Not Sure Which Bending Machine Fits Your{" "}
          <span className="text-[#f31524]">Requirement?</span>
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Our application team works with fabricators and manufacturers across India to identify the right CNC press brake, panel bender, or pipe bending machine for their specific material, thickness, bend complexity, and production volume. Tell us what you need and we will come back with a clear recommendation.

        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <button
            onClick={onOpenForm}
            className="inline-flex items-center justify-center gap-3 bg-[#f31524] text-white hover:bg-white hover:text-[#f31524] px-10 py-5 text-lg font-primary font-medium border border-[#f31524] shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            Get a Free Consultation
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="tel:9004005151"
            className="inline-flex items-center justify-center gap-3 bg-transparent text-white hover:bg-white hover:text-gray-900 px-10 py-5 text-lg font-primary font-medium border border-white/40 hover:border-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Phone className="w-5 h-5" />
            Call: 9004005151
          </a>
        </motion.div>
      </div>
    </section>
  );
}
