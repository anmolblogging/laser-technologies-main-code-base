import { useState, useEffect } from 'react';
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

  // Handle responsive items per view
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

  // Auto-slide effect
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % industries.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % industries.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + industries.length) % industries.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < itemsPerView; i++) {
      const index = (currentIndex + i) % industries.length;
      items.push(industries[index]);
    }
    return items;
  };

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

        {/* <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getVisibleItems().map((industry, index) => (
              <div
                key={`${currentIndex}-${index}`}
                className="group relative h-80  overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105"
                style={{ animation: 'fadeIn 0.5s ease-in-out' }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${industry.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 group-hover:from-red-900/90 group-hover:via-red-800/50 transition-all duration-500" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white transform transition-all duration-500">
                  <div className="transform transition-all duration-500 group-hover:-translate-y-4">
                    <div className="text-red-500 group-hover:text-white transition-colors duration-500 mb-4">{industry.icon}</div>
                    <h4 className="text-xl font-bold leading-tight">{industry.title}</h4>
                  </div>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500  transition-all duration-500" />
              </div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 bg-black/10 hover:bg-red-600 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 bg-black/10 hover:bg-red-600 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 border border-white/20"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div> */}

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

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {getVisibleItems().map((industry, index) => (
        <div
          key={`${currentIndex}-${index}`}
          className="group relative h-80 overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105"
          style={{ animation: 'fadeIn 0.5s ease-in-out' }}
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
          {industries.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-8 bg-red-600' : 'w-2 bg-gray-600 hover:bg-gray-500'
              }`}
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
