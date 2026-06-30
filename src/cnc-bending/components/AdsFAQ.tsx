import { useState } from "react";
import { motion, AnimatePresence, type Transition } from "motion/react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    q: "What is a CNC bending machine?",
    a: "A CNC bending machine is an industrial machine that uses a computer numerical control system to bend sheet metal, plate, pipe, and tube into precise angles, profiles, and forms. The term covers CNC sheet bending machines (press brakes), automatic panel benders, and pipe and tube bending machines. The CNC system controls positioning, force, and bend sequencing to deliver accurate, repeatable results across every part in a production run. CNC bending machines are used across automotive, HVAC, electrical, furniture, aerospace, and general sheet metal fabrication.",
  },
  {
    q: "What is a CNC sheet bending machine?",
    a: "A CNC sheet bending machine, commonly called a press brake, is a sheet metal bending system that presses a punch into a die to form flat sheet into precise angles and profiles. The CNC controller manages back-gauge positioning, ram stroke depth, and the bending sequence, ensuring consistent bend angles across every part without manual measurement between bends. Laser Technologies manufactures CNC and NC sheet bending machines across a wide range of tonnage and bending lengths.",
  },
  {
    q: "What is the difference between an NC and a CNC sheet bending machine?",
    a: " An NC (Numerical Control) sheet bending machine uses a simpler controller that handles basic positioning and sequencing. It suits straightforward bending and job shops processing a wide variety of parts in smaller batches. A CNC (Computer Numerical Control) machine uses a more advanced controller with full programmability, automatic back-gauge positioning, deflection compensation, and multi-step sequence storage, making it the preferred choice for complex parts, tighter tolerances, and high-volume production.",
  },
  {
    q: "What is the difference between a press brake and a panel bender?",
    a: "A press brake bends sheet metal by pressing a punch into a die while the operator repositions the sheet between each bend. A panel bender clamps the workpiece once and performs all programmed bends automatically in a single cycle. Panel benders are faster for multi-bend parts, need less operator involvement, and deliver high consistency on complex profiles. Press brakes offer greater flexibility across a wider range of part sizes, thicknesses, and tooling setups. The right choice depends on part complexity, production volume, and how your workflow is structured.",
  },
  {
    q: "What types of bending machines does Laser Technologies manufacture?",
    a: "Laser Technologies supplies NC Upstroke Pressbrake, CNC Single Servo Pressbrake, CNC Dual Servo (Hybrid) Pressbrake, Full Electric Pressbrake. Each is engineered for specific production requirements, materials, and throughput levels.",
  },
  {
    q: "What materials can a CNC bending machine bend?",
    a: "CNC bending machines from Laser Technologies bend mild steel, stainless steel, aluminium, galvanised iron, copper, and brass. The achievable thickness range varies by machine type and bending length, from thin gauge sheet used in electronics and appliance manufacturing for heavy structural and equipment fabrication.",
  },
  {
    q: "Which bending machine is best for high-volume production?",
    a: "For the highest volumes with multi-bend part profiles, the automatic panel bender, or the panel bender with automation, delivers the fastest cycle times through single-clamp multi-bend cycles and optional automated material handling. For high-volume press brake production, the CNC sheet bending machines support robotic integration for automated bending. Contact Laser Technologies' application team to match the right system to your throughput requirement.",
  },
  {
    q: "Does Laser Technologies make pipe and tube bending machines?",
    a: "Yes. Alongside its sheet bending range, Laser Technologies manufactures CNC pipe and tube bending machines for round pipe, square tube, and rectangular sections. These machines use rotary draw and mandrel bending to produce smooth, accurate bends for frameworks, railings, exhaust systems, furniture, and structural applications, with programmable control for repeatable multi-bend parts.",
  },
  {
    q: "What is the price of a CNC bending machine in India?",
    a: "The price of a CNC bending machine in India varies based on machine type, bending force or tonnage, working length, control system, and automation level. Entry-level NC sheet bending machines are available at a lower investment, while high-tonnage CNC press brakes and automated panel benders represent a higher capital commitment. Contact Laser Technologies for a customised quote based on your specific tonnage, working length, and application requirements.",
  },
  {
    q: "Does Laser Technologies provide after-sales service and operator training for bending machines?",
    a: " Yes. Laser Technologies provides pan-India after-sales service including installation support, spare parts availability, and ongoing technical assistance. Operator training is provided through Laser Gurukul, LT's in-house training programme, designed to bring production teams up to speed quickly and minimise downtime after installation.",
  },
  {
    q: "Where can I see a Laser Technologies bending machine in operation before buying?",
    a: "Laser Technologies operates application labs and demo facilities where buyers can evaluate machines against their own production requirements before making a purchase decision. Contact our team to schedule a demonstration at the nearest facility.",
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
