import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Use your set of images or replace/add more as needed
const GALLERY_IMAGES = [
  'https://mehtautsav.com/wp-content/uploads/2025/09/about-us-5-2048x875.png',
  'https://mehtautsav.com/wp-content/uploads/2025/09/about-group-2048x875.png',
  "https://mehtautsav.com/wp-content/uploads/2025/09/about-us-3-2048x868.png",
  "https://mehtautsav.com/wp-content/uploads/2025/09/about-us-4-2048x875.png",
];

export default function GalleryPeekModernCarousel() {
  const [galleryIndex, setGalleryIndex] = useState(0);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevGallery();
      if (e.key === 'ArrowRight') nextGallery();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const prevGallery = useCallback(() => {
    setGalleryIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  }, []);

  const nextGallery = useCallback(() => {
    setGalleryIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  }, []);

  // Get visible slides for peek effect
  const getVisibleSlides = () => {
    const prevIndex = (galleryIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    const nextIndex = (galleryIndex + 1) % GALLERY_IMAGES.length;
    return [prevIndex, galleryIndex, nextIndex];
  };

  return (
    <section className="w-full bg-white py-10" aria-label="Gallery Carousel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full backdrop-blur-sm mb-6" >
            <div className="w-2 h-2 bg-red-800 rounded-full " ></div>
            <span className="text-sm font-medium text-red-800">OUR FACILITIES</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-medium mb-4 text-black">
            State-of-the-Art Infrastructure
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto pb-10">
            Explore our world-class facilities and cutting-edge technology
          </p>
        </div>
      </div>
      {/* Carousel Track */}
      <div className="relative w-full flex justify-center items-center select-none pb-2">
        <div className="
          flex 
          items-center 
          justify-center
          h-[220px] xs:h-[280px] sm:h-[350px] md:h-[460px] 
          gap-2 xs:gap-4 md:gap-8
          w-full
          transition-transform duration-700 ease-in-out
        ">
          {getVisibleSlides().map((slideIdx, i) => (
            <div
              key={slideIdx}
              className={`
                relative 
                shadow-lg 
                overflow-hidden
                transition-all duration-700 ease-in-out
                flex-shrink-0
                bg-black
                ${i === 1 ? 'z-10' : 'z-0'}
              `}
              style={{
                width: i === 1 ? '70%' : '15%',
                height: '100%',
                boxShadow: i === 1 
                  ? '0 0 36px 0 rgba(0,0,0,0.45), 0 1px 0 #F40021'
                  : '0 0 8px 0 rgba(0,0,0,0.16)',
              }}
            >
              <img
                src={GALLERY_IMAGES[slideIdx]}
                alt={`Gallery image ${slideIdx + 1}`}
                className="w-full h-full object-cover object-center"
                draggable={false}
                loading={i === 1 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Dots and buttons below */}
      <div className="flex justify-center items-center gap-4 mt-4 mb-2">
        <button
          onClick={prevGallery}
          className="bg-white/90 hover:bg-white p-2 transition-colors shadow-lg border border-gray-400"
          aria-label="Previous"
          style={{ borderRadius: '6px' }}
        >
          <ChevronLeft className="w-5 h-5 text-red-700" />
        </button>
        <div className="flex gap-2">
          {GALLERY_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setGalleryIndex(idx)}
              className={`transition-all ${
                idx === galleryIndex
                  ? 'w-8 h-2.5 bg-[#F40021]'
                  : 'w-2 h-2.5 bg-black hover:bg-gray-400/80'
              }`}
              style={{ borderRadius: '6px', opacity: idx === galleryIndex ? 1 : 0.7 }}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
        <button
          onClick={nextGallery}
          className="bg-white/90 hover:bg-white p-2 transition-colors shadow-lg border border-gray-400"
          aria-label="Next"
          style={{ borderRadius: '6px' }}
        >
          <ChevronRight className="w-5 h-5 text-red-700" />
        </button>
      </div>
      <div className="text-center mt-2 text-gray-400 text-sm">
        <span className="font-medium text-gray-400">{galleryIndex + 1}</span> / {GALLERY_IMAGES.length}
      </div>
    </section>
  );
}
