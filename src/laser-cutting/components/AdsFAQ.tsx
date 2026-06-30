import { useState } from "react";
import { motion, AnimatePresence, type Transition } from "motion/react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    q: "What is a laser cutting machine?",
    a: "A laser cutting machine is an industrial system that uses a focused, high-powered laser beam to cut metal sheets, pipes, tubes, and profiles with precision and speed. The laser beam melts, burns, or vaporises the material along a programmed cutting path, producing clean edges with minimal material waste. Laser cutting machines are used across automotive, aerospace, sheet metal fabrication, electrical, HVAC, and heavy manufacturing industries as the primary method for high-accuracy metal cutting at industrial scale.",
  },
  {
    q: "What is a CNC laser cutting machine?",
    a: "A CNC laser cutting machine uses a computer-controlled high-powered laser beam to cut metal sheets, pipes, and profiles with precision. The CNC system automates the cutting path, ensuring consistent accuracy, repeatability, and minimal material waste across every production run.",
  },
  {
    q: "What types of laser cutting machines does Laser Technologies manufacture?",
    a: "Laser Technologies manufactures five categories of CNC laser cutting machines: Sheet Laser Cutting Machines, Tube and Pipe Laser Cutting Machines, Sheet and Tube Laser Cutting Machines, Fully Automatic Sheet Laser Cutting Machines, and Electrolamination Sheet Laser Cutting Machines. Each is engineered for specific industrial applications and material types.",
  },
  {
    q: "What materials can a fiber laser cutting machine cut?",
    a: "Fiber laser cutting machines can cut mild steel, stainless steel, aluminium, copper, brass, galvanised iron, electrical steel, and titanium alloys. The cutting thickness varies by material type and laser power, ranging from thin gauge sheet metal up to 25mm for mild steel at higher power configurations.",
  },
  {
    q: "What is the difference between a fiber laser cutting machine and a CO2 laser cutting machine?",
    a: "Fiber laser cutting machines use a solid-state laser source delivered through optical fiber, offering higher energy efficiency, faster cutting speeds, and superior performance on reflective metals like aluminium, copper, and brass. CO2 lasers use a gas-based source suited for non-metallic materials. For industrial metal cutting, fiber laser is the preferred and more cost-effective technology.",
  },
  {
    q: "Which laser cutting machine is best for sheet metal fabrication?",
    a: "For flat sheet metal fabrication, a sheet laser cutting machine is the primary choice. For operations that also process pipes and tubes, a sheet and tube laser cutting machine offers dual capability in a single system. The right choice depends on your material mix, production volume, and floor space availability.",
  },
  {
    q: "How do I choose the right laser cutting machine for my production requirement?",
    a: "The right CNC laser cutting machine depends on three factors: the material you cut, the thickness range you work with, and your production volume. Sheet cutting machines suit flat metal fabrication. Tube laser cutting machines handle hollow profiles. Fully automatic systems suit high-volume, continuous production. Contact Laser Technologies' application team for a recommendation based on your specific requirement.",
  },
  {
    q: "What is the price of a laser cutting machine in India?",
    a: "The price of a CNC laser cutting machine in India varies based on machine type, laser power, bed size, and automation level. Entry-level fiber laser cutting machines start from approximately INR 30 lakhs, while high-power automated systems can exceed INR 1 crore. Contact Laser Technologies for a customised quote based on your exact requirement.",
  },
  {
    q: "Does Laser Technologies provide after-sales service and operator training?",
    a: "Yes. Laser Technologies provides pan-India after-sales service including installation support, spare parts availability, and ongoing technical assistance. Operator training is provided through Laser Gurukul, LT's in-house training programme designed to get production teams up to speed quickly and minimise downtime.",
  },
  {
    q: "Where can I see a Laser Technologies CNC laser cutting machine in operation before buying?",
    a: "Laser Technologies operates application labs and demo facilities where buyers can test cut their own components before making a purchase decision. Contact our team to schedule a demo at the nearest facility.",
  },
];

const ease: Transition = { duration: 0.35, ease: "easeOut" };

export default function AdsFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="bg-white pt-12 md:pt-16 overflow-x-hidden hover:bg-white pb-12" id="faq">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 hover:bg-white">

        {/* Header — sticky, zero extra space when collapsed */}
        <div className="sticky top-0 z-20 bg-white hover:bg-white pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => {
                setIsExpanded(prev => {
                  if (prev) setOpenIndex(null); // reset open item when collapsing
                  return !prev;
                });
              }}
              className="w-full flex flex-wrap items-center justify-center gap-2 sm:gap-4 py-5 sm:py-6 bg-transparent hover:bg-white border-0 cursor-pointer"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl hover:bg-white bg-white font-primary font-medium text-gray-900 leading-tight">
                Frequently
                <span className="text-[#f31524]"> Asked Questions</span>
              </h2>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0"
              >
                <ChevronDown className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-[#f31524]" />
              </motion.div>
            </button>
          </motion.div>
        </div>

        {/* Accordion — only renders + takes space when expanded */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="faq-accordion"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="border border-neutral-200 bg-gray-100 mb-20 mt-6">
                {FAQ_DATA.map((item, index) => {
                  const isOpen = openIndex === index;

                  return (
                    <div
                      key={index}
                      className="border-b border-neutral-200 last:border-b-0"
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className="w-full flex items-center justify-between px-6 sm:px-10 py-6 sm:py-8 text-left bg-gray-50 hover:bg-neutral-50 transition-colors duration-300 border-0 cursor-pointer"
                      >
                        <span className="text-base sm:text-lg md:text-xl font-medium text-[#0f172a] leading-snug pr-4">
                          {item.q}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180 text-[#f31524]" : "text-neutral-400"
                          }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key={`answer-${index}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={ease}
                            className="overflow-hidden bg-white"
                          >
                            <div className="px-6 sm:px-10 pb-6 sm:pb-10">
                              <div className="pl-4 sm:pl-6 mt-4 border-l-2 border-[#f31524]/20">
                                <p className="text-neutral-600 leading-[1.9] text-sm sm:text-base font-medium">
                                  {item.a}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
