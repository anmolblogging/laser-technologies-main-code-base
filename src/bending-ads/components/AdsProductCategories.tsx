import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, CircleDot, Combine, ChevronDown, CheckCircle2, ArrowRight } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  shortDesc: string;
  specs: string[];
  benefits: string[];
  imageLink?: string;
  modelsList: string[];
  exploreUrl?: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  materials: string;
  bestFor: string;
  capacity?: string;
}

interface AdsProductCategoriesProps {
  onOpenForm: (productName: string, categoryName: string) => void;
}

const CATEGORIES: Category[] = [
  {
    id: 'sheet',
    name: 'CNC Sheet Bending (Press Brake)',
    icon: <Layers className="w-5 h-5" />,
    title: 'CNC Sheet Bending Machine (Press Brake)',
    description: 'For fabricators bending flat sheet metal into precise angles, flanges, and formed profiles, the CNC sheet bending machine, also known as a press brake, is the foundation of every metal bending operation. It presses a punch into a die to form mild steel, stainless steel, aluminium, galvanised iron, copper, and brass across a wide thickness range. Laser Technologies manufactures the most complete press brake range in India, from entry-level NC machines for job shops to heavy-tonnage CNC systems for thick-plate structural work. The Smart Bend leads the range with intelligent controls, German hydraulic valves, and a self-developed back-gauge mechanism that solves scraping and topping during the bend. The Power Bend handles heavy-duty, high-force applications up to 300 tons and 12mm plate. The Pump-Controlled CNC machine uses servo pump technology for lower energy consumption on high-utilisation lines, and the NC Sheet Bending Machine delivers reliable, cost-effective bending for high-variety production.',
    materials: 'Mild steel, stainless steel, aluminium, galvanised iron, copper, brass',
    capacity: 'Up to 800 tons bending force available across a wide range of bending lengths',
    bestFor: 'Sheet metal fabrication, electrical enclosures, automotive panels, furniture frames, HVAC components, structural and heavy-plate bending',
  },
  {
    id: 'tube',
    name: 'Pipe & Tube Bending',
    icon: <CircleDot className="w-5 h-5" />,
    title: 'Pipe and Tube Bending Machine',
    description: 'Where press brakes bend flat sheet, pipe and tube bending machines handle hollow profiles: round pipe, square tube, and rectangular sections. Using rotary draw and mandrel bending techniques, these machines produce smooth, accurate bends without kinking, wrinkling, or collapsing the profile, which manual methods and saw-and-weld fabrication cannot match. Laser Technologies\' CNC pipe and tube bending range covers everything from precision small-diameter tube work to heavy structural pipe, with programmable control for repeatable multi-bend parts and complex geometries. This is the machine for fabricators producing frameworks, railings, exhaust systems, furniture, and any product built from bent tubular stock.',
    materials: 'Mild steel, stainless steel, aluminium, round pipe, square tube, rectangular section',
    bestFor: 'Structural frameworks, furniture manufacturing, automotive chassis and exhaust, handrails and railings, HVAC ducting lines, construction and piping systems',
  },
  {
    id: 'panel-bender',
    name: 'Automatic Panel Bender',
    icon: <Combine className="w-5 h-5" />,
    title: 'Automatic Panel Bender',
    description: 'When part complexity is high, bend counts are many, and labour efficiency matters, the automatic panel bender removes the manual repositioning that limits press brake throughput. Rather than the operator repositioning the sheet between every bend, the panel bender clamps the workpiece once and performs all programmed bends automatically in a single cycle. Laser Technologies\' panel bender runs a professional control system with true 15-axis concurrent linkage, proven across more than 1,000 installations. Servo-controlled hinge tooling prevents deformation, scratches, and accuracy loss, and specially hardened upper-pressure tools with quick-release installation keep changeovers fast. For lines that need full material handling automation, the panel bender integrates robotic loading and unloading for near-continuous, lights-out production.',
    materials: 'Mild steel, stainless steel, aluminium, galvanised sheet',
    capacity: 'Panel sizes up to 3,000mm x 1,500mm; bends sheet up to 3mm thick',
    bestFor: 'Appliance manufacturing, automotive panel fabrication, HVAC duct and component production, furniture, electrical enclosures, high-volume multi-bend parts',
  },
];

const PRODUCTS: Record<string, Product[]> = {
  'sheet': [
    {
      id: 'pressbrake-smart',
      name: 'Smart Bend CNC Press Brake',
      shortDesc: 'Intelligent controllers, German hydraulic valves, and advanced back-gauge mechanism.',
      specs: [
        'Advanced self-developed back-gauge',
        'High positioning repeatability',
        'Anti-scraping and anti-topping features',
        'CNC dynamic deflection compensation'
      ],
      benefits: [
        'German hydraulic system reliability',
        'Fast and easy operator setups',
        'Exceptional angle accuracy on long sheets'
      ],
      modelsList: ['CNC Single Servo Pressbrake', 'CNC Dual Servo (Hybrid) Pressbrake'],
      imageLink: 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/banner.png',
      exploreUrl: 'https://www.lasertechnologies.co.in/products/Bending/CNC%20Bending%20Machine'
    },
    {
      id: 'pressbrake-power',
      name: 'Power Bend Heavy-Duty Press Brake',
      shortDesc: 'High-tonnage and high-force sheet metal forming for heavy industrial work.',
      specs: [
        'Bending force: up to 800 tons',
        'Handles up to 12mm thick structural plate',
        'Robust, torsion-free welded frame',
        'Synchronized dual cylinder design'
      ],
      benefits: [
        'Handles extreme bending forces with ease',
        'Long life even under full-load operation',
        'Designed for structural metal parts'
      ],
      modelsList: ['CNC Heavy Duty Pressbrake', 'CNC Custom High Tonnage Pressbrake'],
      imageLink: 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/banner.png',
      exploreUrl: 'https://www.lasertechnologies.co.in/products/Bending/CNC%20Bending%20Machine'
    },
    {
      id: 'pressbrake-pump',
      name: 'Pump-Controlled Servo / Full Electric Press Brake',
      shortDesc: 'Servo pump technology for high-utilization lines with lower energy consumption.',
      specs: [
        'Servo motor driven pump / Full electric',
        'Energy consumption reduced up to 50%',
        'Low noise operation and minimal heat build-up',
        'Fast cycle speeds and high duty cycles'
      ],
      benefits: [
        'Significant operational cost savings',
        'Environmentally friendly oil-saving hybrid tech',
        'Ideal for high-utilization automated cells'
      ],
      modelsList: ['Full Electric Pressbrake', 'CNC Dual Servo (Hybrid) Pressbrake'],
      imageLink: 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/banner.png',
      exploreUrl: 'https://www.lasertechnologies.co.in/products/Bending/CNC%20Bending%20Machine'
    },
    {
      id: 'pressbrake-nc',
      name: 'NC Sheet Bending Machine',
      shortDesc: 'Reliable, cost-effective bending solution for job shops and high-variety lines.',
      specs: [
        'Simple numeric control sequence storage',
        'Sturdy torsion bar synchronization',
        'Manual or motorized back-gauge setup',
        'Easy tool changeover setup'
      ],
      benefits: [
        'Low initial investment cost',
        'Simple operation requiring minimal training',
        'Highly reliable mechanical architecture'
      ],
      modelsList: ['NC Upstroke Pressbrake', 'NC Downstroke Pressbrake'],
      imageLink: 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/banner.png',
      exploreUrl: 'https://www.lasertechnologies.co.in/products/Bending/CNC%20Bending%20Machine'
    }
  ],
  'tube': [
    {
      id: 'tube-nc',
      name: 'NC Pipe Bending Machine',
      shortDesc: 'Cost-effective rotary draw bending for standard pipe and framework tubing.',
      specs: [
        'Hydraulic rotary draw bending',
        'Digital angle programmer controls',
        'Easy manual loading & clamp sequence',
        'Smooth bend profile output'
      ],
      benefits: [
        'Very cost-effective for medium volume run',
        'Durable mechanical construction',
        'Quick tooling setup for standard diameters'
      ],
      modelsList: ['NC Pipe Bending Machine'],
      imageLink: 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/banner.png',
      exploreUrl: 'https://www.lasertechnologies.co.in/products/Bending/CNC%20Bending%20Machine'
    },
    {
      id: 'tube-cnc',
      name: 'CNC Pipe Bending Machine',
      shortDesc: 'Multi-axis programmable control for repeatable multi-bend tubes and complex geometries.',
      specs: [
        'Mandrel bending avoids kinking and collapsing',
        'Multi-axis concurrent servo coordinates',
        'Suitable for complex 3D pipe profiles',
        'Automatic springback calculation database'
      ],
      benefits: [
        'Perfect high-quality wrinkle-free bends',
        'Replaces saw-and-weld joints completely',
        'Highly repeatable for automotive/exhaust lines'
      ],
      modelsList: ['CNC Pipe Bending Machine'],
      imageLink: 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/banner.png',
      exploreUrl: 'https://www.lasertechnologies.co.in/products/Bending/CNC%20Bending%20Machine'
    }
  ],
  'panel-bender': [
    {
      id: 'panel-automatic',
      name: 'Automatic Panel Bender',
      shortDesc: '15-axis concurrent linkage for fast, manual-free multi-bend cycles.',
      specs: [
        'Concurrent linkage axis controller',
        'Servo-controlled hinge mechanism tools',
        'Hardened upper pressure tools',
        'No operator material repositioning needed'
      ],
      benefits: [
        'Extremely fast cycle times for complex panels',
        'Zero operator hazard during bending sequences',
        'Maintains high surface quality on sheet metal'
      ],
      modelsList: ['Automatic Panel Bender'],
      imageLink: 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/banner.png',
      exploreUrl: 'https://www.lasertechnologies.co.in/products/Bending/CNC%20Bending%20Machine'
    },
    {
      id: 'panel-automated-line',
      name: 'Panel Bender with Automation',
      shortDesc: 'Robotic loading and unloading integration for lights-out production lines.',
      specs: [
        'Integrated robotic handling arm systems',
        'Automatic centering and positioning tables',
        'Continuous feed-in and stacker outputs',
        'Coordinated lights-out manufacturing cell'
      ],
      benefits: [
        'Maximum utilization and near-continuous uptime',
        'Minimizes physical human effort and labor cost',
        'Seamless integration into factory logistics'
      ],
      modelsList: ['Panel Bender with Automation'],
      imageLink: 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/banner.png',
      exploreUrl: 'https://www.lasertechnologies.co.in/products/Bending/CNC%20Bending%20Machine'
    }
  ]
};

export default function AdsProductCategories({ onOpenForm }: AdsProductCategoriesProps) {
  const [activeCategory, setActiveCategory] = useState<string>('sheet');
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFlip = (cardId: string) => {
    setFlippedCard(flippedCard === cardId ? null : cardId);
  };

  const handleGetQuote = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    if (product.exploreUrl) {
      window.open(product.exploreUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    const cat = CATEGORIES.find(c => c.id === activeCategory);
    onOpenForm(product.name, cat?.name ?? 'General');
  };

  const handleRequestQuote = () => {
    const cat = CATEGORIES.find(c => c.id === activeCategory);
    onOpenForm('Custom Configuration', cat?.name ?? 'General');
  };

  const currentCatDetail = CATEGORIES.find(c => c.id === activeCategory) || CATEGORIES[0];

  return (
    <section className="py-24 md:pb-32 md:pt-24 bg-gray-50/50">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-primary font-medium text-gray-900 leading-tight">
            Which CNC Bending Machine is{" "}
            <span className="text-[#f31524]">Right for You?</span>
          </h2>
          <p className="text-base md:text-lg text-gray-500 max-w-3xl mx-auto mt-4 font-light leading-relaxed font-secondary">
            Not every bending application calls for the same machine. The right choice depends on what you bend (flat sheet or hollow profile), the thickness and length involved, the complexity of your parts, and the production volumes you run. Laser Technologies manufactures three distinct categories of CNC bending machines, each engineered for a specific job. Here is what sets each type apart.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="mb-12">

          {/* Mobile Dropdown */}
          <div className="block lg:hidden">
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-6 py-4 bg-white border border-gray-200 text-gray-900 font-medium flex items-center justify-between hover:shadow-md transition-all duration-300"
              >
                <span className="flex items-center gap-3 font-primary">
                  {CATEGORIES.find(cat => cat.id === activeCategory)?.icon}
                  {CATEGORIES.find(cat => cat.id === activeCategory)?.name}
                </span>
                <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 shadow-xl z-50 overflow-hidden"
                  >
                    {CATEGORIES.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setActiveCategory(category.id);
                          setFlippedCard(null);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full px-6 py-4 flex items-center gap-3 font-medium transition-all duration-200 border-b border-gray-100 last:border-b-0 text-left font-primary ${
                          activeCategory === category.id
                            ? 'bg-[#f31524]/10 text-[#f31524]'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className={activeCategory === category.id ? 'text-[#f31524]' : 'text-gray-400'}>
                          {category.icon}
                        </span>
                        <span>{category.name}</span>
                        {activeCategory === category.id && (
                          <div className="ml-auto w-2 h-2 bg-[#f31524] rounded-full" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Tab Switcher */}
          <div className="hidden lg:flex justify-center gap-3 flex-wrap">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => { setActiveCategory(category.id); setFlippedCard(null); }}
                className={`px-6 py-4 font-primary font-medium transition-all duration-300 border flex items-center justify-center gap-3 ${
                  activeCategory === category.id
                    ? 'bg-[#f31524] text-white border-[#f31524] shadow-lg shadow-[#f31524]/10'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-[#f31524] hover:text-white'
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Category Details Panel */}
        <motion.div
          key={`detail-${activeCategory}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white border border-gray-200 p-6 md:p-8 mb-12 shadow-sm"
        >
          <h3 className="text-xl md:text-2xl font-primary font-medium text-gray-900 mb-3">
            {currentCatDetail.title}
          </h3>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 font-light font-secondary font-light">
            {currentCatDetail.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-6 border-t border-gray-100 text-xs md:text-sm font-secondary">
            <div>
              <span className="font-semibold text-gray-800 block mb-1">Suitable Materials:</span>
              <span className="text-gray-500 leading-relaxed block">{currentCatDetail.materials}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-800 block mb-1">Best Suited For:</span>
              <span className="text-gray-500 leading-relaxed block">{currentCatDetail.bestFor}</span>
            </div>
            {currentCatDetail.capacity && (
              <div className="md:col-span-2">
                <span className="font-semibold text-gray-800 block mb-1">Capacity/Specs:</span>
                <span className="text-gray-500 leading-relaxed block">{currentCatDetail.capacity}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Product Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-start justify-center"
          >
            {PRODUCTS[activeCategory]?.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="h-[520px] perspective-1000 w-full"
                onClick={() => handleFlip(product.id)}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-700 transform-style-3d cursor-pointer ${
                    flippedCard === product.id ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* FRONT */}
                  <div className="absolute w-full h-full backface-hidden bg-white border border-gray-200 hover:border-[#f31524]/40 transition-all duration-500 shadow-sm hover:shadow-xl group overflow-hidden flex flex-col">
                    <div className="h-52 relative overflow-hidden bg-gray-100 flex-shrink-0">
                      {product.imageLink ? (
                        <img
                          src={product.imageLink}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                          <CheckCircle2 className="w-16 h-16 text-gray-300" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="p-6 flex flex-col flex-1 justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-primary font-medium mb-2 text-gray-900 leading-tight group-hover:text-[#f31524] transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-gray-500 text-xs md:text-sm mb-4 leading-relaxed font-secondary">
                          {product.shortDesc}
                        </p>
                        <div className="space-y-2">
                          {product.specs.slice(0, 2).map((spec, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#f31524] mt-0.5 flex-shrink-0" />
                              <span className="text-gray-650 text-xs leading-relaxed font-secondary">{spec}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-100 mt-4 flex-shrink-0">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-xs font-medium font-secondary">Click to explore details & models</span>
                          <div className="w-8 h-8 bg-[#f31524]/10 flex items-center justify-center group-hover:bg-[#f31524] transition-colors">
                            <ArrowRight className="w-4 h-4 text-[#f31524] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* BACK */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white border-2 border-[#f31524] shadow-xl overflow-hidden">
                    <div className="h-full overflow-y-auto p-6 flex flex-col justify-between">
                      <div>
                        <div className="mb-4 pb-3 border-b border-gray-100">
                          <h3 className="text-base md:text-lg font-primary font-medium text-gray-900 leading-tight">
                            {product.name}
                          </h3>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-xs font-semibold text-[#f31524] mb-2 uppercase tracking-wider flex items-center gap-2 font-primary">
                            Models Available
                          </h4>
                          <div className="flex flex-wrap gap-1.5 pl-0.5">
                            {product.modelsList.map((modelName, idx) => (
                              <span
                                key={idx}
                                className="inline-block bg-gray-100 text-gray-800 text-[10px] md:text-xs px-2.5 py-1 font-medium font-secondary border border-gray-200"
                              >
                                {modelName}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-xs font-semibold text-[#f31524] mb-2 uppercase tracking-wider flex items-center gap-2 font-primary">
                            Highlights
                          </h4>
                          <div className="space-y-1.5 pl-0.5">
                            {product.specs.map((spec, idx) => (
                              <div key={idx} className="flex items-start gap-1.5">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0" />
                                <span className="text-gray-700 text-xs leading-relaxed font-secondary">{spec}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-xs font-semibold text-[#f31524] mb-2 uppercase tracking-wider flex items-center gap-2 font-primary">
                            Value Propositions
                          </h4>
                          <div className="space-y-1.5">
                            {product.benefits.slice(0, 3).map((benefit, idx) => (
                              <div key={idx} className="flex items-start gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 text-xs leading-relaxed font-secondary">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-150">
                        <button
                          onClick={(e) => handleGetQuote(e, product)}
                          className="w-full px-4 py-2.5 bg-[#f31524] text-white font-medium hover:bg-[#d91220] transition-all text-xs md:text-sm flex items-center justify-center gap-2 group shadow-md hover:shadow-lg font-primary"
                        >
                          Explore More
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center pt-16"
        >
          <p className="text-gray-500 mb-6 text-lg font-secondary">
            Need a custom configuration or want to talk to our application engineer?
          </p>
          <button
            onClick={handleRequestQuote}
            className="px-10 py-4 bg-[#f31524] text-white font-medium hover:bg-[#d91220] transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-3 group font-primary"
          >
            Explore {currentCatDetail.name} Machines
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
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
