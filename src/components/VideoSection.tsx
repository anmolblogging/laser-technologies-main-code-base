import { useState } from 'react';
import { Play, Maximize2, Minimize2 } from 'lucide-react';

export default function VideoSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoUrl = 'https://www.youtube.com/embed/_KN_kmVpKAw';

  return (
    <>
      <section className="py-16 lg:py-24 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                See Our Technology in Action
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Watch how our precision laser systems transform manufacturing processes and deliver exceptional results
              </p>
            </div>

            <div className="relative group">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
                {!isPlaying ? (
                  <div className="relative aspect-video">
                    <img
                      src="https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=1200"
                      alt="Video Thumbnail"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300" />
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-2xl"
                    >
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </button>
                  </div>
                ) : (
                  <div className="relative aspect-video">
                    <iframe
                      className="w-full h-full"
                      src={`${videoUrl}?autoplay=1`}
                      title="Manufacturing Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}

                <button
                  onClick={() => setIsExpanded(true)}
                  className="absolute bottom-4 right-4 bg-white/90 hover:bg-white p-3 rounded-lg transition-all duration-300 shadow-lg group/btn"
                >
                  <Maximize2 className="w-5 h-5 text-gray-700 group-hover/btn:text-red-600" />
                </button>
              </div>

              
            </div>
          </div>
        </div>
      </section>

      {isExpanded && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all duration-300"
          >
            <Minimize2 className="w-6 h-6 text-white" />
          </button>

          <div className="w-full max-w-7xl">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                className="w-full h-full"
                src={`${videoUrl}?autoplay=1`}
                title="Manufacturing Video Expanded"
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
