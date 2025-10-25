import React, { useState, useEffect, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Zap,
  FileText,
  Wrench,
  Monitor,
  Car,
  Building2,
  Radio,
  AlertTriangle,
  Clapperboard,
  FlaskConical,
  Factory,
  Ship,
} from "lucide-react";

interface IndustryCard {
  title: string;
  icon: React.ReactNode;
}

const industries: IndustryCard[] = [
  { title: "EV Charging Solutions", icon: <Zap className="w-16 h-16" /> },
  { title: "Laboratory Research", icon: <FileText className="w-16 h-16" /> },
  { title: "Hospitality Innovations", icon: <Wrench className="w-16 h-16" /> },
  { title: "Education Solutions", icon: <Monitor className="w-16 h-16" /> },
  {
    title: "Automotive Laser Applications",
    icon: <Car className="w-16 h-16" />,
  },
  {
    title: "High-rise Building Technologies",
    icon: <Building2 className="w-16 h-16" />,
  },
  { title: "Advertising & Branding", icon: <Radio className="w-16 h-16" /> },
  {
    title: "Smart City Infrastructure",
    icon: <AlertTriangle className="w-16 h-16" />,
  },
  {
    title: "Entertainment & Events",
    icon: <Clapperboard className="w-16 h-16" />,
  },
  {
    title: "Chemical Industry Solutions",
    icon: <FlaskConical className="w-16 h-16" />,
  },
  {
    title: "Industrial Manufacturing",
    icon: <Factory className="w-16 h-16" />,
  },
  {
    title: "Marine & Offshore Applications",
    icon: <Ship className="w-16 h-16" />,
  },
];

export default function IndustryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(4);

  const maxIndex = Math.max(0, industries.length - itemsPerView);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 768) setItemsPerView(2);
      else if (window.innerWidth < 1024) setItemsPerView(3);
      else setItemsPerView(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const pauseAndResume = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 4000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    pauseAndResume();
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    pauseAndResume();
  };

  const goToSlide = (index: number) => {
    const clamped = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(clamped);
    pauseAndResume();
  };

  const cardWidthPercent = useMemo(() => 100 / itemsPerView, [itemsPerView]);

  return (
    <section className="py-16 lg:py-24 my-10 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-4">
            Industry Solutions
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
            Tailor-made solutions for different industries and application
            scenarios
          </p>
        </div>

        <div className="relative max-w-10xl mx-auto">
          <div className="overflow-hidden mb-8">
            <div
              className="flex gap-4 sm:gap-6 will-change-transform"
              style={{
                transform: `translateX(-${currentIndex * cardWidthPercent}%)`,
                transition: "transform 700ms cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
            >
              {industries.map((industry, idx) => (
                <div
                  key={idx}
                  className="group relative h-64 sm:h-72 overflow-hidden cursor-pointer bg-black hover:bg-red-600 transition-all duration-500 border border-red-400 hover:border-red-600 shadow-sm hover:shadow-lg"
                  style={{
                    flex: `0 0 calc(${cardWidthPercent}% - ${
                      (itemsPerView - 1) * (24 / itemsPerView)
                    }px)`,
                  }}
                >
                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col items-center justify-center text-center">
                    <div className="transform transition-all duration-500 group-hover:scale-110">
                      <div className="text-white group-hover:text-white transition-colors duration-500 mb-6 flex justify-center">
                        {industry.icon}
                      </div>
                      <h4 className="text-lg sm:text-xl font-medium text-white group-hover:text-white leading-tight transition-colors duration-500">
                        {industry.title}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 sm:gap-6">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="bg-white hover:bg-red-600 text-gray-800 hover:text-white p-2 sm:p-3 transition-all duration-300 border border-gray-300 hover:border-red-600 shadow-sm rounded-full"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Slide Indicators */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`
                              transition-all duration-300 rounded-full
                                      ${
                                        index === currentIndex
                                          ? "bg-red-600 w-2 sm:w-8 h-2 sm:h-1.5"
                                          : "bg-gray-300 hover:bg-gray-400 w-1.5 sm:w-6 h-1.5 sm:h-1.5"
                                      }
                                          `}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="bg-white hover:bg-red-600 text-gray-800 hover:text-white p-2 sm:p-3 transition-all duration-300 border border-gray-300 hover:border-red-600 shadow-sm rounded-full"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
