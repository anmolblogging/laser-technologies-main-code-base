import { useState, useEffect, useRef } from 'react';
import { Play, Maximize2, Minimize2 } from 'lucide-react';

export default function VideoSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scale, setScale] = useState(1);

  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoUrl = 'https://www.youtube.com/embed/_KN_kmVpKAw';

  // Scroll-based scaling
  useEffect(() => {
    const handleScroll = () => {
      if (!videoContainerRef.current) return;

      const rect = videoContainerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start at scale 1, grow up to 1.3
      let newScale = 1;
      if (rect.top < windowHeight && rect.bottom > 0) {
        const visibleRatio = 1 - rect.top / windowHeight;
        newScale = 1 + Math.min(0.3, visibleRatio * 0.3); // max scale 1.3
      }

      setScale(newScale);
    };

    const onScroll = () => requestAnimationFrame(handleScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Professional Header */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Witness Precision in Action
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Explore how our cutting-edge laser systems redefine manufacturing efficiency and quality.
            </p>
          </div>

          {/* Video Container */}
          <div
            ref={videoContainerRef}
            className="relative rounded-2xl overflow-hidden shadow-2xl mx-auto max-w-[90vw] max-h-[70vh] transition-transform duration-500"
            style={{ transform: `scale(${scale})` }}
          >
            {!isPlaying ? (
              <div className="relative aspect-video">
                {/* Lazy-loaded Thumbnail */}
                <img
                  src="https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Video Thumbnail"
                  className="w-full h-full object-cover rounded-2xl"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300" />
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-xl"
                  aria-label="Play video"
                >
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </button>
              </div>
            ) : (
              <div className="relative aspect-video">
                <iframe
                  className="w-full h-full rounded-2xl"
                  src={`${videoUrl}?autoplay=1&rel=0`}
                  title="Manufacturing Technology Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {/* Expand Button */}
            <button
              onClick={() => setIsExpanded(true)}
              className="absolute bottom-4 right-4 bg-white/90 hover:bg-white p-3 rounded-lg transition-all duration-300 shadow-lg flex items-center justify-center"
              aria-label="Expand video"
            >
              <Maximize2 className="w-5 h-5 text-gray-700 hover:text-red-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Expanded Fullscreen Modal */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4">
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all duration-300"
            aria-label="Close expanded video"
          >
            <Minimize2 className="w-6 h-6 text-white" />
          </button>
          <div className="w-full max-w-7xl">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                className="w-full h-full rounded-2xl"
                src={`${videoUrl}?autoplay=1&rel=0`}
                title="Manufacturing Technology Video Expanded"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
