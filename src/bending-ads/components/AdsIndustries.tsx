import React, { useState, useEffect } from "react";
import { Car, Layers, Cpu, Plane, Wind, Building2, Armchair, Dumbbell } from "lucide-react";
import { motion } from "motion/react";

const DARK_BG =
  "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/dark_BACKGROUND.jpg";

interface IndustryItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgImage: string;
}

const INDUSTRIES: IndustryItem[] = [
  {
    title: "Automotive",
    description: "CNC press brakes and panel benders for body panels, brackets, chassis components, seat frames, and high-volume automotive part production lines.",
    icon: <Car className="w-12 h-12" />,
    bgImage: "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/new-icons-updated-11/12/205/Body%20parts.jpg"
  },
  {
    title: "Sheet Metal Fabrication",
    description: "Press brake machines for enclosures, structural profiles, custom brackets, access panels, and high-speed batch bending across varied part geometries.",
    icon: <Layers className="w-12 h-12" />,
    bgImage: "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/new-icons-updated-11/12/205/Contract%20manufacturers.jpg"
  },
  {
    title: "Electrical and Electronics",
    description: "Precision CNC bending machines for switchgear housings, control panel enclosures, DIN rail components, cable trays, and electrical mounting assemblies.",
    icon: <Cpu className="w-12 h-12" />,
    bgImage: "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/new-icons-updated-11/12/205/Enclosures.jpg"
  },
  {
    title: "HVAC and Ducting",
    description: "Panel benders and press brakes for duct sections, flanges, diffuser plates, ventilation profiles, and air handling unit components in galvanised and stainless steel.",
    icon: <Wind className="w-12 h-12" />,
    bgImage: "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/new-icons-updated-11/12/205/Cooling_heating%20units.jpg"
  },
  {
    title: "Furniture Manufacturing",
    description: "Smart Bend CNC press brakes for precision bends on metal furniture frames, shelving systems, cabinet panels, and decorative metalwork profiles.",
    icon: <Armchair className="w-12 h-12" />,
    bgImage: "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/new-icons-updated-11/12/205/Hospital%20furniture.jpg"
  },
  {
    title: "Construction and Infrastructure",
    description: "Heavy-duty press brakes for structural steel profiles, connection plates, railing components, architectural metalwork, and prefabricated building panels.",
    icon: <Building2 className="w-12 h-12" />,
    bgImage: "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/new-icons-updated-11/12/205/Metal%20doors,%20railings,%20facades.jpg"
  },
  {
    title: "Aerospace and Defence",
    description: "High-accuracy bending machines for structural brackets, access panels, fuselage component blanks, and aerospace-grade aluminium assemblies.",
    icon: <Plane className="w-12 h-12" />,
    bgImage: "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/new-icons-updated-11/12/205/Aircraft%20components.jpg"
  },
  {
    title: "Gym and Industrial Equipment",
    description: "CNC bending machines for welded frames, protective guards, enclosures, and structural support panels in gym equipment and industrial machinery.",
    icon: <Dumbbell className="w-12 h-12" />,
    bgImage: "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/new-icons-updated-11/12/205/Tubes%20&%20chassis%20parts.jpg"
  }
];

export default function AdsIndustries() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 640) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, INDUSTRIES.length - itemsPerView);
  const cardWidthPercent = 100 / itemsPerView;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [maxIndex]);

  const nextSlide = () => setCurrentIndex((p) => (p >= maxIndex ? 0 : p + 1));
  const prevSlide = () => setCurrentIndex((p) => (p <= 0 ? maxIndex : p - 1));

  // Swipe handlers
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchEnd(null);
    setTouchStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (touchStart !== null) {
      setTouchEnd(e.clientX);
    }
  };

  const handleMouseUp = () => {
    if (touchStart !== null && touchEnd !== null) {
      const distance = touchStart - touchEnd;
      if (distance > minSwipeDistance) {
        nextSlide();
      } else if (distance < -minSwipeDistance) {
        prevSlide();
      }
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden"
      style={{
        backgroundImage: `url(${DARK_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-primary font-medium text-white leading-tight mb-4">
            Industries{" "}
            <span className="text-[#f31524]">Served</span>
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto font-light font-secondary leading-relaxed">
            Built for Industries Where Bending Accuracy Drives the Final Product
          </p>
        </motion.div>

        {/* Carousel Window */}
        <div
          className="overflow-hidden mb-0 cursor-grab active:cursor-grabbing select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(-${currentIndex * cardWidthPercent}%)`,
            }}
          >
            {INDUSTRIES.map((industry, index) => (
              <div
                key={index}
                className="group relative flex-shrink-0 border border-white/10 cursor-pointer overflow-hidden bg-black/40 backdrop-blur-sm"
                style={{
                  width: `calc(${cardWidthPercent}% - ${itemsPerView > 1 ? 16 : 0}px)`,
                  marginRight: `${itemsPerView > 1 ? 24 : 0}px`,
                  height: "22rem",
                }}
              >
                {/* Hover Background Image */}
                <img
                  src={industry.bgImage}
                  alt={`${industry.title} background`}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-750 ease-in-out"
                  loading="lazy"
                />

                {/* Red Semi-Transparent Overlay */}
                <div className="absolute inset-0 bg-[#f31524]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Content Container */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8">
                  {/* Default State: Icon & Title */}
                  <div className="flex flex-col items-center justify-center transition-transform duration-500 group-hover:-translate-y-6">
                    <div className="text-[#f31524] mb-5 group-hover:text-white transition-colors duration-500">
                      {industry.icon}
                    </div>
                    <h4 className="text-xl font-primary font-medium text-white group-hover:text-white transition-colors">
                      {industry.title}
                    </h4>
                  </div>

                  {/* Hover State: Description */}
                  <p className="absolute bottom-8 left-8 right-8 text-sm text-white/95 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 font-secondary leading-relaxed font-light">
                    {industry.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
