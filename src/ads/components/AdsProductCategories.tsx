import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, CircleDot, Combine, Bot, Zap, ChevronDown, CheckCircle2, ArrowRight } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  shortDesc: string;
  specs: string[];
  benefits: string[];
  imageLink?: string;
  modelsList: string[];
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  materials: string;
  bestFor: string;
  powerRange?: string;
}

interface AdsProductCategoriesProps {
  onOpenForm: (productName: string, categoryName: string) => void;
}

const CATEGORIES: Category[] = [
  {
    id: 'sheet',
    name: 'Sheet Cutting',
    icon: <Layers className="w-5 h-5" />,
    title: 'Sheet Laser Cutting Machine',
    description: 'Designed for high-speed, high-precision cutting of flat metal sheets, the sheet laser cutting machine is the foundation of most metal fabrication operations. It handles mild steel, stainless steel, aluminium, copper, brass, and galvanised iron across a wide range of thicknesses. Laser Technologies offers multiple configurations to match different production requirements, from entry-level single-platform systems to large-format, high-power machines for continuous industrial production. The GX Series features a double exchange platform that keeps production running while one platform loads and the other cuts. The GX Pro steps up to 12kW with a linear drive system for ultra-high-speed cutting and mirror-like surface quality. The GFA and Bevel GFA Series address large-format and bevel-cutting requirements with processing formats up to 24,000 x 5,000mm.',
    materials: 'Mild steel, stainless steel, aluminium, copper, brass, galvanised iron',
    powerRange: '1kW to 30kW+',
    bestFor: 'Laser cutting machine for sheet metal fabrication, automotive components, electrical enclosures, structural parts, HVAC panels',
  },
  {
    id: 'tube',
    name: 'Tube & Pipe',
    icon: <CircleDot className="w-5 h-5" />,
    title: 'Tube Laser Cutting Machine / Pipe Laser Cutting Machine',
    description: "Where sheet cutting machines work on flat stock, tube and pipe laser cutting machines handle hollow profiles: round pipes, square tubes, rectangular sections, and complex custom profiles. Cutting is precise, burr-free, and significantly faster than manual methods or saw cutting, with no secondary finishing required on most profiles. Laser Technologies' tube laser cutting range covers the full spectrum of industrial requirements, from small-diameter precision tube work to ultra-heavy structural pipe cutting. The TS Series with digital chuck technology enables complex tube profiles, the TL500 handles ultra-heavy structural tube work, and the TPS Series adds bevel cutting capability for tube ends requiring V or Y joint preparation.",
    materials: 'Mild steel, stainless steel, aluminium, round pipe, square tube, rectangular section, custom profiles',
    bestFor: 'Structural frameworks, furniture manufacturing, automotive chassis, construction, HVAC ducting, piping systems',
  },
  {
    id: 'sheet-tube',
    name: 'Sheet & Tube',
    icon: <Combine className="w-5 h-5" />,
    title: 'Sheet and Tube Laser Cutting Machine',
    description: 'For manufacturing operations that process both flat sheet metal and tubular profiles, a dedicated sheet and tube laser cutting machine eliminates the need for two separate systems. A single machine handles both applications through an integrated rotary chuck mechanism for tube work and a standard flat cutting bed for sheet processing. This is the practical choice for fabricators whose production mix includes both flat parts and structural profiles, without the capital and floor space cost of running two machines independently.',
    materials: 'Flat metal sheets and hollow profiles including round pipe, square tube, and rectangular section',
    bestFor: 'Multi-product fabrication units, custom manufacturing businesses, operations requiring flexibility without capital investment in two machines',
  },
  {
    id: 'automatic',
    name: 'Fully Automatic',
    icon: <Bot className="w-5 h-5" />,
    title: 'Fully Automatic Sheet Laser Cutting Machine',
    description: 'When production volume, throughput, and labour efficiency become the primary drivers, fully automatic laser cutting systems remove the manual loading and unloading bottleneck entirely. These systems integrate automated material handling directly with the laser cutting process, enabling near-continuous or lights-out operation. Material is fed from a stacking tower, cut, and sorted without operator intervention between cycles. This translates directly into higher machine utilisation rates, lower per-part labour cost, and the ability to run extended shifts or overnight production runs with minimal staffing.',
    materials: 'Mild steel, stainless steel, aluminium, and other flat sheet metals',
    bestFor: 'High-volume OEMs, large industrial fabricators, automotive suppliers, operations running multi-shift or unattended production',
  },
  {
    id: 'electrolamination',
    name: 'Electrolamination',
    icon: <Zap className="w-5 h-5" />,
    title: 'Electrical Steel / Electrolamination Sheet Laser Cutting Machine',
    description: 'Electrical steel and motor lamination components demand dimensional accuracy and edge consistency that standard sheet cutting machines are not optimised to deliver. The electrolamination sheet laser cutting machine is purpose-built for cutting thin electrical steel sheets with tight tolerances, minimal heat-affected zones, and repeatable edge geometry across high-volume lamination stacks. Both series are used in motor manufacturing, transformer production, and EV drivetrain component fabrication where dimensional consistency directly affects the magnetic performance of the finished component.',
    materials: 'Electrical steel, silicon steel, thin gauge specialty metals',
    bestFor: 'Motor lamination manufacturers, transformer core producers, EV component fabricators, precision electrical engineering',
  },
];

const PRODUCTS: Record<string, Product[]> = {
  'sheet': [
    {
      id: 'sheet-entry',
      name: 'Single Platform Sheet Laser',
      shortDesc: 'Entry-level and high-precision single bed systems for general metal fabrication.',
      specs: [
        'Power options: 1kW to 6kW',
        'Work area: 3000mm × 1500mm',
        'Positioning accuracy: ±0.03mm',
        'Ideal for small-to-medium batches',
      ],
      benefits: [
        'Low capital investment',
        'High cutting precision & edge quality',
        'Minimal floor space required',
      ],
      modelsList: ['C Series', 'GA Series'],
      imageLink: 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/products/sheet_cutting/c%20series/C%20Series%207.jpg',
    },
    {
      id: 'sheet-mid',
      name: 'Exchange Platform Sheet Laser',
      shortDesc: 'Continuous-cycle dual platform systems built for high-throughput job shops.',
      specs: [
        'Power options: 3kW to 12kW',
        'Exchange table swap: <15 seconds',
        'Heavy-duty integrated frame',
        'Enhanced safety enclosure',
      ],
      benefits: [
        'Zero downtime during load/unload',
        'Massively boosted daily production capacity',
        'Continuous automation-ready interface',
      ],
      modelsList: ['GX Series', 'GT Pro Series'],
      imageLink: 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/products/sheet_cutting/gx%20series/GX%20Series%201.jpg',
    },
    {
      id: 'sheet-high',
      name: 'Ultra High-Power & Format Laser',
      shortDesc: 'Flagship linear drive systems for thick sheets and large format beveling.',
      specs: [
        'Laser power options: 12kW to 30kW+',
        'Formats up to 24,000 × 5,000mm',
        'Bevel cutting: ±45° V/Y prep joints',
        'Vibration-dampened frame design',
      ],
      benefits: [
        'Mirror-like surface finish on thick plates',
        'Fast linear motor acceleration',
        'Eliminates separate edge welding prep',
      ],
      modelsList: ['GX Pro Series', 'GFA Series', 'Bevel GFA Series'],
      imageLink: 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/products/sheet_cutting/gh%20series/GH%20Series%201.jpg',
    },
  ],
  'tube': [
    {
      id: 'tube-standard',
      name: 'Standard Tube Laser Cutting',
      shortDesc: 'Highly efficient systems for standard hollow profiles and tubing lines.',
      specs: [
        'Tube diameter capability: Ø20-220mm',
        'Max profile length: 6500mm',
        'Self-centering pneumatic chucks',
        'Multi-axis coordinate cutting',
      ],
      benefits: [
        'Completely clean, burr-free cuts',
        'Replaces manual saws/drills instantly',
        'Excellent ROI for general fabrication',
      ],
      modelsList: ['R1 Series', 'R2 Series', 'R3 and R3 Plus Series', 'R5 and R5 II Series'],
      imageLink: 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/products/sheet_cutting/r2/R2%201.jpg',
    },
    {
      id: 'tube-heavy',
      name: 'Heavy-Duty & Custom Profile Laser',
      shortDesc: 'Professional multi-chuck tube laser cutters with digital chuck technology.',
      specs: [
        'High-capacity digital chuck system',
        'Supports complex custom hollow shapes',
        'Anti-vibration support blocks',
        'High structural load capacity',
      ],
      benefits: [
        'Zero material tailing waste technology',
        'Maintains high concentricity on heavy tubes',
        'Intelligent nesting path planning',
      ],
      modelsList: ['TX Series', 'TX Plus Series', 'TS Series'],
      imageLink: 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/products/sheet_cutting/tx3r/TX3R%201.jpg',
    },
    {
      id: 'tube-heavy-bevel',
      name: 'Ultra-Heavy & Bevel Tube Laser',
      shortDesc: 'Heavy-duty structural profile laser cutters with integrated tube beveling.',
      specs: [
        'TPS bevel cutting for V/Y weld joints',
        'TL500 structural pipe framework',
        'Extra large diameter capacities',
        'Multi-chuck synchronized movement',
      ],
      benefits: [
        'Ideal for structural construction profiles',
        'Direct beveling cuts down assembly steps',
        'Processes ultra-thick and heavy-walled pipe',
      ],
      modelsList: ['TL350 Series', 'TL500 Series', 'TPS Series (Bevel Tube)'],
      imageLink: 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/products/sheet_cutting/t2/T2%201.jpg',
    },
  ],
  'sheet-tube': [
    {
      id: 'combo-entry',
      name: 'Versatile Sheet & Tube Combination',
      shortDesc: 'Process both sheets and hollow tubes on a single, space-saving layout.',
      specs: [
        'Integrated rotary chuck: up to Ø200mm',
        'Flat sheet bed: 3000mm × 1500mm',
        'Double-duty CNC system control',
        'Pneumatic centering tube support',
      ],
      benefits: [
        'Two distinct functions, one footprint',
        'Optimizes factory space requirements',
        'Reduces setup capital budget costs',
      ],
      modelsList: ['GB Series', 'GXE Series'],
      imageLink: 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/products/sheet_cutting/gb/GB%201.jpg',
    },
    {
      id: 'combo-heavy',
      name: 'Heavy-Duty Multi-Use Laser',
      shortDesc: 'High-power combination systems with exchange table functions.',
      specs: [
        'Laser power options: 3kW to 12kW',
        'Exchange table + heavy rotary axis',
        'Reinforced structure design',
        'High weight capacity loading',
      ],
      benefits: [
        'Maximizes workshop capability',
        'Rapid sheet-to-tube process toggle',
        'Professional grade components throughout',
      ],
      modelsList: ['GTE Pro Series', 'GHE 35HQ Pro Series', 'GE IV Series'],
      imageLink: 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/products/sheet_cutting/r3-r3plus/R3_R3%20PLUS%20Series%201.jpg',
    },
  ],
  'automatic': [
    {
      id: 'auto-tower',
      name: 'Tower Loading Automated System',
      shortDesc: 'Smart storage tower systems for hands-off sheet feeding and retrieval.',
      specs: [
        'Automated multi-level sheet tower',
        '3000kg load capacity per shelf',
        'Suction loader + unloading fork',
        'Vibration separation sheet sensor',
      ],
      benefits: [
        'Enables lights-out shift operations',
        'Reduces labor overhead by up to 70%',
        'Consistent and predictable production output',
      ],
      modelsList: ['ALG Series'],
      imageLink: 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/products/sheet_cutting/ALG-loading-unloading/ALG%20(Loading%20and%20Unloading).jpg',
    },
    {
      id: 'auto-robotic',
      name: 'Robotic Line Automation System',
      shortDesc: 'Fully integrated robot arms and conveyors for high-volume parts sorting.',
      specs: [
        'Robotic manipulator arm integration',
        'Continuous scrap conveyor system',
        'Vite/CNC synchronized pathing',
        'High-speed sorting algorithms',
      ],
      benefits: [
        'Minimizes operator material handling risk',
        'Continuous 24/7 machine operations',
        'Maximized efficiency and material yield',
      ],
      modelsList: ['ALF Series'],
      imageLink: 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/products/sheet_cutting/ALG-loading-unloading/ALG%20(Loading%20and%20Unloading).jpg',
    },
  ],
  'electrolamination': [
    {
      id: 'lamination-precision',
      name: 'Effective Silicon Steel Laser',
      shortDesc: 'Specialized lamination cutting for motors, stators, and transformers.',
      specs: [
        'Thin material processing: <0.5mm',
        'Tight dimensional tolerance design',
        'Micro-joint laser pathing',
        'Sub-micron positioning scale',
      ],
      benefits: [
        'Zero edge distortion or micro-burrs',
        'Extremely tiny heat-affected zone (HAZ)',
        'Maintains high magnetic permeability',
      ],
      modelsList: ['Effective-S', 'Effective-L'],
      imageLink: 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/products/sheet_cutting/c%20series/C%20Series%207.jpg',
    },
  ],
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
            Which Laser Cutting Machine is{" "}
            <span className="text-[#f31524]">Right for You?</span>
          </h2>
          <p className="text-base md:text-lg text-gray-500 max-w-3xl mx-auto mt-4 font-light leading-relaxed font-secondary">
            Not all laser cutting machines are built for the same job. The right choice depends on what you cut, how your production is structured, and the volumes you operate at.
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
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 font-light font-secondary">
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
            {currentCatDetail.powerRange && (
              <div className="md:col-span-2">
                <span className="font-semibold text-gray-800 block mb-1">Available Power Range:</span>
                <span className="text-gray-500 leading-relaxed block">{currentCatDetail.powerRange}</span>
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
                          <Zap className="w-16 h-16 text-gray-300" />
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
                          Get Quote for {product.modelsList[0]}
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
