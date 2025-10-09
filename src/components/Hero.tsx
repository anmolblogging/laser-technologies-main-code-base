import React from "react";
import Banner from "../assets/banner.png";

const HeroBanner: React.FC = () => (
  <section className="relative min-h-screen flex flex-col justify-center overflow-visible bg-black mt-[81px]">
    {/* Banner Background & Overlay */}
    <div className="absolute inset-0 z-0">
      <img
        src={Banner}
        alt="Manufacturing facility"
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-red-800/60 mix-blend-multiply" />
      <div className="absolute inset-0 bg-hero-gradient mix-blend-multiply" />
    </div>

    {/* Centered Banner Content */}
    <div className="relative z-10 container mx-auto px-4 pt-24 pb-48 flex flex-col items-center text-center space-y-8">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold font-heading text-white leading-tight">
        Sharper. Faster. Smarter Manufacturing.
      </h1>
      <p className="text-xl md:text-2xl lg:text-3xl text-white max-w-3xl mx-auto font-light">
        Boost productivity and precision with our state-of-the-art laser machines 
        and automation solutions designed for your success.
      </p>
      <button
        type="button"
        className="bg-white text-secondary hover:bg-white/90 px-12 py-6 text-lg font-semibold  transition-all duration-300 mt-2 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
      >
        Explore Products
      </button>
    </div>

    {/*  Video Section */}
    <div className="relative z-20 flex justify-center -mb-44 md:-mb-64 lg:-mb-64">
      <div className="w-full max-w-6xl px-4">
        <div className=" overflow-hidden shadow-2xl  bg-gradient-to-br from-black via-gray-900 to-gray-800"
            style={{
              height: '620px',
              boxShadow:
                "0 16px 48px rgba(0,0,0,0.65)",
            }}>
          <iframe
            title="Laser Technologies Introduction"
            className="w-full h-full"
            src="https://www.youtube.com/embed/KR5fWm6JBds"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            // style={{
            //   borderRadius: '18px',
            // }}
          />
        </div>
      </div>
    </div>

    {/* Bottom Shape Divider */}
    <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
      <svg
        className="w-full h-24 md:h-32"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        fill="white"
      >
        <polygon points="0 10, 100 10, 100 0, 0 0" />
      </svg>
    </div>

    {/* Extra padding for video overflow */}
    <div className="pb-44 md:pb-56 lg:pb-64" />
  </section>
);

export default HeroBanner;
