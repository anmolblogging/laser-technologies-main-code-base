import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Zap, FileText, Wrench, Monitor, Car, Building2, Radio, AlertTriangle, Clapperboard, FlaskConical, Factory, Ship } from 'lucide-react';

interface IndustryCard {
  title: string;
  icon: React.ReactNode;
  image: string;
}

const industries: IndustryCard[] = [
  { title: 'EV Charging Solutions', icon: <Zap className="w-12 h-12" />, image: 'https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { title: 'Laboratory Research', icon: <FileText className="w-12 h-12" />, image: 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { title: 'Hospitality Innovations', icon: <Wrench className="w-12 h-12" />, image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { title: 'Education Solutions', icon: <Monitor className="w-12 h-12" />, image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { title: 'Automotive Laser Applications', icon: <Car className="w-12 h-12" />, image: 'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { title: 'High-rise Building Technologies', icon: <Building2 className="w-12 h-12" />, image: 'https://images.pexels.com/photos/936722/pexels-photo-936722.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { title: 'Advertising & Branding', icon: <Radio className="w-12 h-12" />, image: 'https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { title: 'Smart City Infrastructure', icon: <AlertTriangle className="w-12 h-12" />, image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { title: 'Entertainment & Events', icon: <Clapperboard className="w-12 h-12" />, image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { title: 'Chemical Industry Solutions', icon: <FlaskConical className="w-12 h-12" />, image: 'https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { title: 'Industrial Manufacturing', icon: <Factory className="w-12 h-12" />, image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { title: 'Marine & Offshore Applications', icon: <Ship className="w-12 h-12" />, image: 'https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg?auto=compress&cs=tinysrgb&w=800' }
];

export default function IndustryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Compute max index so we don't translate into empty space
  const maxIndex = Math.max(0, industries.length - itemsPerView);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-slide (uses the clamped next behavior)
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const pauseAndResume = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
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
    // clamp index so we never translate into empty area
    const clamped = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(clamped);
    pauseAndResume();
  };

  // Precompute card width percentage for transform math
  const cardWidthPercent = useMemo(() => 100 / itemsPerView, [itemsPerView]);

  return (
    <section className="py-16 lg:py-20 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-black mb-4">Industry Solutions</h2>
          <p className="text-lg text-black max-w-2xl mx-auto">
            Tailor-made solutions for different industries and application scenarios
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-4">
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="flex-shrink-0 bg-black/10 hover:bg-red-600 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Track container */}
            <div className="w-full overflow-hidden">
              <div
                className="flex gap-6 will-change-transform"
                style={{
                  transform: `translateX(-${currentIndex * cardWidthPercent}%)`,
                  transition: 'transform 650ms cubic-bezier(0.2, 0.8, 0.2, 1)',
                  // total width is industries.length * cardWidthPercent%, but flex items will handle widths
                }}
              >
                {industries.map((industry, idx) => (
                  <div
                    key={idx}
                    className="group relative h-80 overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105"
                    style={{ flex: `0 0 ${cardWidthPercent}%` }}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${industry.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 group-hover:from-red-900/90 group-hover:via-red-800/50 transition-all duration-500" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end text-white transform transition-all duration-500">
                      <div className="transform transition-all duration-500 group-hover:-translate-y-4">
                        <div className="text-red-500 group-hover:text-white transition-colors duration-500 mb-4">
                          {industry.icon}
                        </div>
                        <h4 className="text-xl font-bold leading-tight">{industry.title}</h4>
                      </div>
                    </div>
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500 transition-all duration-500" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="flex-shrink-0 bg-black/10 hover:bg-red-600 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-red-600' : 'w-2 bg-gray-600 hover:bg-gray-500'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
