import { motion } from "motion/react";
import { CheckCircle2, Award, Users, Wrench, GraduationCap, Code2 } from "lucide-react";

const REASONS = [
  { icon: Award, title: "15+ Years of Manufacturing Excellence" },
  { icon: Users, title: "5,500+ Machines Deployed Across India" },
  { icon: Wrench, title: "Pan-India Sales and Service Network" },
  { icon: GraduationCap, title: "Operator Training via Laser Gurukul" },
  { icon: Code2, title: "In-House RetenX Nesting Software" },
  { icon: CheckCircle2, title: "Full Application Support & After-Sales" },
];

export default function AdsWhyLT() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
        {/* Left Column */}
        <div className="lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* <h2 className="text-3xl md:text-5xl font-primary font-medium mb-6 text-gray-900 leading-tight">
              Upgrade the Way You <br />
              <span className="text-[#f31524]">Cut, Build, and Scale</span>
            </h2> */}
            <h2 className="text-3xl md:text-5xl font-primary font-medium mb-6 text-gray-900 leading-tight">
              Why{" "}
              <span className="text-[#f31524]">Laser Technologies</span>
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Upgrade the Way You Cut, Build, and Scale
            </p>
          </motion.div>

          <div className="space-y-4">
            {REASONS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  className="flex items-center gap-5 bg-gray-50 p-5 border border-gray-100 hover:shadow-md hover:border-[#f31524]/20 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div className="w-11 h-11 flex-shrink-0 bg-[#f31524]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#f31524]" />
                  </div>
                  <h4 className="text-base md:text-lg font-medium text-gray-900 font-primary leading-snug">
                    {item.title}
                  </h4>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column — Image Card */}
        <div className="lg:w-1/2">
          <motion.div
            className="bg-white p-4 shadow-xl border border-gray-100 rotate-1 hover:rotate-0 transition-transform duration-500"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-100 aspect-[4/3] flex items-center justify-center overflow-hidden">
              <img
                src="https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/banner.png"
                alt="Laser Cutting Machine by Laser Technologies"
                className="w-full h-full object-cover mix-blend-multiply"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-medium text-gray-900 mb-4 font-primary">
                India's Most Trusted Laser Cutting Machine Manufacturer
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                ISO 9001:2015 certified. Great Place to Work recognised. Serving 7,200+ customers
                across 10+ industries nationwide.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
