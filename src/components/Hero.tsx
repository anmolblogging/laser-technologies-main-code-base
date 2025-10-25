import { memo } from "react";
import Banner from "../assets/banner.png";

const HeroBanner = () => {
  return (
    <section
      id="hero-banner"
      aria-labelledby="hero-heading"
      className="relative bg-gray-50 mt-[75px] mb-[200px] md:mb-200 lg:mb-0"
    >
      {/* Hero Content with Background */}
      <div className="relative h-[700px] md:min-h-[900px] flex items-center pb-0 lg:pb-64 xl:pb-80">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={Banner}
            alt="Advanced laser manufacturing facility"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/50"
          />
        </div>

        {/* Hero Text Content */}
        <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 py-10 lg:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-10 md:space-y-8">
            <div className="space-y-6 md:space-y-4">
              <h1
                id="hero-heading"
                className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight md:leading-snug"
              >
                Sharper. Faster.
                <span className="block mt-2 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                  Smarter Manufacturing.
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto font-normal md:text-[1.35rem] md:leading-relaxed">
                Boost productivity and precision with state-of-the-art laser
                machines and automation solutions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 md:pt-2">
              <a
                href="/products"
                className="bg-red-600 text-white px-10 py-4 text-base font-medium hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
              >
                Explore Products
              </a>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="my-[-20px] lg:my-0 block absolute bottom-0 left-0 right-0 z-20 transform translate-y-1/2 px-6 lg:px-12 md:translate-y-[35%]">
          <div className="container mx-auto">
            <div className="max-w-5xl mx-auto">
              <div className="aspect-video bg-black overflow-hidden shadow-2xl  ">
                <iframe
                  title="Laser Technologies Introduction Video"
                  src="https://www.youtube.com/embed/KR5fWm6JBds?rel=0&modestbranding=1"
                  className="w-full h-full"
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

      {/* Feature Pills Section (kept for layout spacing consistency) */}
      <div className="relative bg-gray-50 pt-0 lg:pt-64 xl:pt-80" />
    </section>
  );
};

export default memo(HeroBanner);
