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
  image: string;
}

const industries: IndustryCard[] = [
  { title: "EV Charging Solutions", icon: <Zap className="w-12 h-12" />, image: "https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "Laboratory Research", icon: <FileText className="w-12 h-12" />, image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "Hospitality Innovations", icon: <Wrench className="w-12 h-12" />, image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "Education Solutions", icon: <Monitor className="w-12 h-12" />, image: "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "Automotive Laser Applications", icon: <Car className="w-12 h-12" />, image: "https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "High-rise Building Technologies", icon: <Building2 className="w-12 h-12" />, image: "https://images.pexels.com/photos/936722/pexels-photo-936722.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "Advertising & Branding", icon: <Radio className="w-12 h-12" />, image: "https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "Smart City Infrastructure", icon: <AlertTriangle className="w-12 h-12" />, image: "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "Entertainment & Events", icon: <Clapperboard className="w-12 h-12" />, image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "Chemical Industry Solutions", icon: <FlaskConical className="w-12 h-12" />, image: "https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "Industrial Manufacturing", icon: <Factory className="w-12 h-12" />, image: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { title: "Marine & Offshore Applications", icon: <Ship className="w-12 h-12" />, image: "https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg?auto=compress&cs=tinysrgb&w=800" },
];

export default function IndustryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Update items per view on resize
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

  const maxIndex = Math.max(0, industries.length - itemsPerView);
  const cardWidthPercent = useMemo(() => 100 / itemsPerView, [itemsPerView]);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 2500); // faster autoplay
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

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-black mb-4">
            Industry Solutions
          </h2>
          <p className="sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Tailor-made solutions for different industries and application scenarios
          </p>
        </div>

        <div className="relative max-w-8xl mx-auto">
          <div className="overflow-hidden mb-8">
            <div
              className="flex gap-4 sm:gap-6 will-change-transform"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                transition: "transform 600ms cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
            >
              {industries.map((industry, idx) => (
                <div
                  key={idx}
                  className="group relative h-72 sm:h-80 md:h-96 overflow-hidden cursor-pointer bg-white shadow-md"
                  style={{ flex: `0 0 calc(${cardWidthPercent}% - ${itemsPerView > 1 ? 1.5 : 0}rem)` }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${industry.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end">
                    <div className="transform transition-all duration-500">
                      <div className="text-red-600 group-hover:text-white transition-colors duration-500 mb-2">
                        {industry.icon}
                      </div>
                      <h4 className="text-lg sm:text-xl font-medium text-white leading-tight">
                        {industry.title}
                      </h4>
                    </div>
                  </div>
                  <div className="absolute inset-0 border border-transparent group-hover:border-red-600 transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={prevSlide}
              className="bg-white hover:bg-red-600 text-gray-800 hover:text-white p-2 sm:p-3 transition-all duration-300 border border-gray-300 hover:border-red-600 shadow-sm rounded-full"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex items-center justify-center gap-1.5 sm:gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? "bg-red-600 w-3 sm:w-8 h-3 sm:h-1.5"
                      : "bg-gray-300 hover:bg-gray-400 w-2 sm:w-6 h-2 sm:h-1.5"
                  }`}
                />
              ))}
            </div>

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
