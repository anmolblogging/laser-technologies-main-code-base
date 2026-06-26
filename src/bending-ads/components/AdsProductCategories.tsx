import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface BendingCard {
  id: string;
  name: string;
  title: string;
  description: string;
  machinesAvailable: string[];
  materials: string;
  capacity?: string;
  bestFor: string;
  ctaText: string;
  exploreUrl: string;
  imageLink: string;
}

interface AdsProductCategoriesProps {
  onOpenForm: (productName: string, categoryName: string) => void;
}

const CARDS: BendingCard[] = [
  {
    id: 'sheet',
    name: 'CNC Sheet Bending Machine (Press Brake)',
    title: 'CNC Sheet Bending Machine (Press Brake)',
    description: "For fabricators bending flat sheet metal into precise angles, flanges, and formed profiles, the CNC sheet bending machine, also known as a press brake, is the foundation of every metal bending operation. It presses a punch into a die to form mild steel, stainless steel, aluminium, galvanised iron, copper, and brass across a wide thickness range. Laser Technologies manufactures the most complete press brake range in India, from entry-level NC machines for job shops to heavy-tonnage CNC systems for thick-plate structural work. The Smart Bend leads the range with intelligent controls, German hydraulic valves, and a self-developed back-gauge mechanism that solves scraping and topping during the bend. The Power Bend handles heavy-duty, high-force applications up to 300 tons and 12mm plate. The Pump-Controlled CNC machine uses servo pump technology for lower energy consumption on high-utilisation lines, and the NC Sheet Bending Machine delivers reliable, cost-effective bending for high-variety production.",
    machinesAvailable: [
      'NC Upstroke Pressbrake',
      'CNC Single Servo Pressbrake',
      'CNC Dual Servo (Hybrid) Pressbrake',
      'Full Electric Pressbrake'
    ],
    materials: 'Mild steel, stainless steel, aluminium, galvanised iron, copper, brass',
    capacity: 'Up to 800 tons bending force available across a wide range of bending lengths',
    bestFor: 'Sheet metal fabrication, electrical enclosures, automotive panels, furniture frames, HVAC components, structural and heavy-plate bending',
    ctaText: 'Explore CNC Sheet Bending Machines',
    exploreUrl: 'https://www.lasertechnologies.co.in/products/Bending/CNC%20Bending%20Machine',
    imageLink: 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/banner.png'
  },
  {
    id: 'tube',
    name: 'Pipe and Tube Bending Machine',
    title: 'Pipe and Tube Bending Machine',
    description: "Where press brakes bend flat sheet, pipe and tube bending machines handle hollow profiles: round pipe, square tube, and rectangular sections. Using rotary draw and mandrel bending techniques, these machines produce smooth, accurate bends without kinking, wrinkling, or collapsing the profile, which manual methods and saw-and-weld fabrication cannot match. Laser Technologies' CNC pipe and tube bending range covers everything from precision small-diameter tube work to heavy structural pipe, with programmable control for repeatable multi-bend parts and complex geometries. This is the machine for fabricators producing frameworks, railings, exhaust systems, furniture, and any product built from bent tubular stock.",
    machinesAvailable: [
      'NC Pipe Bending Machine',
      'CNC Pipe Bending Machine'
    ],
    materials: 'Mild steel, stainless steel, aluminium, round pipe, square tube, rectangular section',
    capacity: 'Precision small-diameter tube work to heavy structural pipe',
    bestFor: 'Structural frameworks, furniture manufacturing, automotive chassis and exhaust, handrails and railings, HVAC ducting lines, construction and piping systems',
    ctaText: 'Explore Pipe and Tube Bending Machines',
    exploreUrl: 'https://www.lasertechnologies.co.in/products/Bending/CNC%20Bending%20Machine',
    imageLink: 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/banner.png'
  },
  {
    id: 'panel-bender',
    name: 'Automatic Panel Bender',
    title: 'Automatic Panel Bender',
    description: "When part complexity is high, bend counts are many, and labour efficiency matters, the automatic panel bender removes the manual repositioning that limits press brake throughput. Rather than the operator repositioning the sheet between every bend, the panel bender clamps the workpiece once and performs all programmed bends automatically in a single cycle. Laser Technologies' panel bender runs a professional control system with true 15-axis concurrent linkage, proven across more than 1,000 installations. Servo-controlled hinge tooling prevents deformation, scratches, and accuracy loss, and specially hardened upper-pressure tools with quick-release installation keep changeovers fast. For lines that need full material handling automation, the panel bender integrates robotic loading and unloading for near-continuous, lights-out production.",
    machinesAvailable: [
      'Automatic Panel Bender',
      'Panel Bender with Automation (integrated robotic loading and unloading)'
    ],
    materials: 'Mild steel, stainless steel, aluminium, galvanised sheet',
    capacity: 'Panel sizes up to 3,000mm x 1,500mm; bends sheet up to 3mm thick',
    bestFor: 'Appliance manufacturing, automotive panel fabrication, HVAC duct and component production, furniture, electrical enclosures, high-volume multi-bend parts',
    ctaText: 'Explore Automatic Panel Bender',
    exploreUrl: 'https://www.lasertechnologies.co.in/products/Bending/CNC%20Bending%20Machine',
    imageLink: 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/banner.png'
  }
];

export default function AdsProductCategories({ onOpenForm }: AdsProductCategoriesProps) {
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  const handleFlip = (cardId: string) => {
    setFlippedCard(flippedCard === cardId ? null : cardId);
  };

  const handleCtaClick = (e: React.MouseEvent, card: BendingCard) => {
    e.stopPropagation();
    if (card.exploreUrl) {
      window.open(card.exploreUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    onOpenForm(card.name, 'Bending Machines');
  };

  return (
    <section className="py-24 md:pb-32 md:pt-24 bg-gray-50/50">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-primary font-medium text-gray-900 leading-tight">
            Which CNC Bending Machine is{" "}
            <span className="text-[#f31524]">Right for You?</span>
          </h2>
          <p className="text-base md:text-lg text-gray-500 max-w-4xl mx-auto mt-4 font-light leading-relaxed font-secondary">
            Not every bending application calls for the same machine. The right choice depends on what you bend (flat sheet or hollow profile), the thickness and length involved, the complexity of your parts, and the production volumes you run. Laser Technologies manufactures three distinct categories of CNC bending machines, each engineered for a specific job. Here is what sets each type apart.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-start justify-center">
          {CARDS.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-[740px] perspective-1000 w-full"
              onClick={() => handleFlip(card.id)}
            >
              <div
                className={`relative w-full h-[740px] transition-transform duration-700 transform-style-3d cursor-pointer ${
                  flippedCard === card.id ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT */}
                <div className="absolute w-full h-[740px] backface-hidden bg-white border border-gray-200 hover:border-[#f31524]/40 transition-all duration-500 shadow-sm hover:shadow-xl group overflow-hidden flex flex-col justify-between">
                  <div className="flex flex-col">
                    <div className="h-48 relative overflow-hidden bg-gray-100 flex-shrink-0 animate-pulse-slow">
                      <img
                        src={card.imageLink}
                        alt={card.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="p-6 flex flex-col gap-4">
                      {/* Title - Fixed height for vertical alignment symmetry */}
                      <div className="h-16 flex items-start">
                        <h3 className="text-2xl font-primary font-medium text-gray-900 leading-tight group-hover:text-[#f31524] transition-colors line-clamp-2">
                          {card.name}
                        </h3>
                      </div>
                      
                      {/* Description - Fixed height and line clamp for vertical alignment symmetry */}
                      <div className="h-[140px] overflow-hidden">
                        <p className="text-gray-500 text-xs md:text-sm  font-black line-clamp-6">
                          {card.description}
                        </p>
                      </div>

                      {/* Specs List - Equalized heights to make bullets symmetrical */}
                      <div className="space-y-3 h-[180px] flex flex-col justify-start">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#f31524] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-655 text-xs leading-relaxed font-secondary line-clamp-2">
                            <strong>Materials:</strong> {card.materials}
                          </span>
                        </div>
                        {card.capacity && (
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#f31524] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-655 text-xs leading-relaxed font-secondary line-clamp-2">
                              <strong>Capacity:</strong> {card.capacity}
                            </span>
                          </div>
                        )}
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#f31524] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-655 text-xs leading-relaxed font-secondary line-clamp-3">
                            <strong>Best for:</strong> {card.bestFor}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-4 border-t border-gray-100 flex-shrink-0 bg-gray-50/50 flex items-center justify-between">
                    <span className="text-gray-400 text-xs font-medium font-secondary">Click to see available models</span>
                    <div className="w-8 h-8 bg-[#f31524]/10 flex items-center justify-center group-hover:bg-[#f31524] transition-colors">
                      <ArrowRight className="w-4 h-4 text-[#f31524] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </div>

                {/* BACK */}
                <div className="absolute w-full h-[740px] backface-hidden rotate-y-180 bg-white border-2 border-[#f31524] shadow-xl overflow-hidden">
                  <div className="h-full overflow-y-auto p-6 flex flex-col justify-between bg-gray-50/10">
                    <div>
                      <div className="mb-4 pb-3 border-b border-gray-100 h-16 flex items-start">
                        <h3 className="text-lg md:text-xl font-primary font-medium text-gray-900 leading-tight line-clamp-2">
                          {card.name}
                        </h3>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-xs font-semibold text-[#f31524] mb-3 uppercase tracking-wider font-primary">
                          Machines Available
                        </h4>
                        <div className="flex flex-col gap-2 min-h-[140px]">
                          {card.machinesAvailable.map((machine, idx) => (
                            <div key={idx} className="flex items-center gap-3 bg-white p-3 border border-gray-100 shadow-sm rounded-sm">
                              <span className="w-2 h-2 bg-[#f31524] rounded-full flex-shrink-0" />
                              <span className="text-gray-800 text-xs font-medium font-secondary">{machine}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <p className="text-gray-500 text-xs leading-relaxed font-secondary mb-4">
                        {card.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-150 mt-auto">
                      <button
                        onClick={(e) => handleCtaClick(e, card)}
                        className="w-full px-4 py-3 bg-[#f31524] text-white font-medium hover:bg-[#d91220] transition-all text-xs md:text-sm flex items-center justify-center gap-2 group shadow-md hover:shadow-lg font-primary"
                      >
                        {card.ctaText}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </section>
  );
}
