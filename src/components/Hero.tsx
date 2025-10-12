import React from "react";
import Banner from "../assets/banner.png";

const HeroBanner = () => {
  return (
    <section className="relative bg-white mt-[81px]">
      {/* Hero Content with Background */}
      <div className="relative min-h-screen flex items-center pb-0 lg:pb-64 xl:pb-80">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={Banner}
            alt="Manufacturing facility"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/50" />
        </div>

        <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-24">
          {/* Centered Content */}
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium text-white leading-tight">
                Sharper. Faster.
                <span className="block mt-2 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                  Smarter Manufacturing.
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto font-normal">
                Boost productivity and precision with state-of-the-art laser machines and automation solutions.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                type="button"
                className="bg-red-600 text-white px-10 py-4 text-base font-medium hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
              >
                Explore Products
              </button>

            </div>

            {/* Video - Visible on Mobile/Tablet, Hidden on Desktop */}
            <div className="lg:hidden pt-8">
              <div className="aspect-video bg-black/30 backdrop-blur-sm  overflow-hidden shadow-2xl">
                <iframe
                  title="Laser Technologies Introduction"
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/KR5fWm6JBds"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Overflowing Video Section - Desktop Only */}
        <div className="hidden lg:block absolute bottom-0 left-0 right-0 z-20 transform translate-y-1/2 px-6 lg:px-12">
          <div className="container mx-auto">
            <div className="max-w-5xl mx-auto">
              <div className="aspect-video bg-black overflow-hidden shadow-2xl">
                <iframe
                  title="Laser Technologies Introduction"
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/KR5fWm6JBds"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Pills Section */}
      <div className="relative bg-gray-50 pt-0 lg:pt-64 xl:pt-80">

      </div>
    </section>
  );
};

export default HeroBanner;