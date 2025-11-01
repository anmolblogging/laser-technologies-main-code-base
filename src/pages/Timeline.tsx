import React, { useRef , useState, useEffect } from 'react';
import { BookOpen , ArrowRight , ChevronLeft, ChevronRight } from 'lucide-react';

// Example API mock. Replace with your real fetch from database later.
const PAGE_SIZE = 5;

// Timeline data
const TIMELINE_DATA = [
  {
    year: 2011,
    title: "A Dream Takes Shape",
    description: "In a small Pune office with just a table, two Neelkamal chairs, and an unshakable vision, Mr. Rakesh Agarwal and Late Mr. Sunil Rangari planted the seed of Laser Technologies Pvt. Ltd.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
  },
  {
    year: 2012,
    title: "First Rays of Light",
    description: "The very first SEI Italy Laser Machine was sold to AVT Leather, Chennai. LTPL participated in its first national exhibition. Ms. Pankti Agarwal joined along with Dhananjay, Nagendra, and two more engineers.",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&fit=crop"
  },
  {
    year: 2013,
    title: "Lasers for the People",
    description: "The mission grew bigger: to take laser technology to the masses. Sold the first Stiefelmayer (Germany) machine for electro-lamination to NFTDC.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop"
  },
  {
    year: 2014,
    title: "A Window to the World",
    description: "Partnership with HSG opened doors to global technology. Installed the first 500W Fiber Laser Cutting Machine at Shri Ganesh Industry, Jaipur.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop"
  },
  {
    year: 2015,
    title: "A Place Called Home",
    description: "From a small rented office to a permanent address — LTPL established new offices in Navi Mumbai and Pune.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop"
  },
  {
    year: 2016,
    title: "First in the Nation",
    description: "Installed India's first 6kW Fiber Laser Cutting Machine at Power Beam Technologies, Mumbai. A milestone that positioned LTPL as a leader in innovation.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=600&fit=crop"
  },
  {
    year: 2017,
    title: "Trust in Action",
    description: "Crossed 50 installations nationwide. Participated in India's biggest industrial exhibition. Supplied the fastest Paper Laser Cutting Machine to Archies, Parksons & Solar Prints.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop"
  },
  {
    year: 2018,
    title: "Spreading Roots",
    description: "Opened offices in Delhi, Ahmedabad, and Bangalore. Surpassed 100+ successful installations.",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop"
  },
  {
    year: 2019,
    title: "A Family Beyond Work",
    description: "The LTPL team grew to 50+ members. Entered a Joint Venture with Alpha Laser (Germany). Installed machines at MAN Energy Solutions, Forbes Marshall & Biesse.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
  },
  {
    year: 2020,
    title: "In the Face of Crisis",
    description: "During the pandemic, LTPL rose to the occasion — creating laser-cut face shields, showing that business can go beyond profit to serve humanity.",
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&h=600&fit=crop"
  },
  {
    year: 2021,
    title: "Powering Ahead",
    description: "Installed India's first 12kW Fiber Laser Cutting Machine at Harsiddh Industries Pvt. Ltd. Growth continued unhindered despite challenges.",
    image: "https://images.unsplash.com/photo-1581092918484-8313e1f7e8d6?w=800&h=600&fit=crop"
  },
  {
    year: 2022,
    title: "Self-Reliance in Action",
    description: "Established India's first Laser Source Repair Center, reducing import dependency. A step forward in supporting Make in India.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop"
  },
  {
    year: 2023,
    title: "Nurturing Knowledge",
    description: "Launched Laser Gurukul — India's first laser training academy. Opened a Customer Experience Center. Celebrated 2000+ installations and a team of 110+ members.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop"
  },
  {
    year: 2024,
    title: "Born in India, Built for the World",
    description: "Ventured into manufacturing homegrown machines under the brand PhotonX. Launched Power Bend – our indigenous CNC Bending Solution.",
    image: "https://images.unsplash.com/photo-1581091870617-f8c1e0d1b8e8?w=800&h=600&fit=crop"
  },
  {
    year: 2025,
    title: "Global Footprints",
    description: "Partnered with Almacam (Software) and launched ReTenX. Partnered with BLMA (Pipe Bending). Exported machines to GTS Qatar, Rasia Germany, Abu Dhabi, and Dubai.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop"
  }
];

const PaginatedTimeline = () => {
  const [currentTimelineIndex, setCurrentTimelineIndex] = useState(0);

  useEffect(() => {
    setCurrentTimelineIndex(0);
  }, []);

  return (
    <>
      {/* Custom Header */}
      <header className="relative mt-16 md:mt-20 bg-black overflow-hidden">
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
    <div className="text-center space-y-6">
      <div className="inline-flex rounded-full items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20">
        <BookOpen className="text-white" size={20} />
        <span className="text-white text-sm font-medium tracking-wide">
          MILESTONES
        </span>
      </div>

      <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-tight">
        Our Journey’s Key Milestones
      </h1>

      <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
        Celebrating the defining moments that shaped our legacy and tech excellence.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
        <button
          className="group px-8 py-4 bg-whiteBgButtonBg text-whiteBgButtonText font-semibold hover:bg-whiteBgTextHover transition-all duration-300 flex items-center gap-2"
          aria-label="Start your journey"
        >
          <span>Start Your Journey</span>
          <ArrowRight
            className="group-hover:translate-x-1 transition-transform"
            size={20}
          />
        </button>
      </div>
    </div>
  </div>
</header>


      {/* Timeline Section */}
      <section className="py-28 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Mobile Year Scroll (visible only on mobile) */}
          <div className="md:hidden mb-6 overflow-x-auto">
            <div className="flex gap-4 text-gray-400 text-lg font-semibold">
              {TIMELINE_DATA.map((item, idx) => (
                <button
                  key={item.year}
                  onClick={() => setCurrentTimelineIndex(idx)}
                  className={`px-4 py-2 whitespace-nowrap rounded-md cursor-pointer ${
                    currentTimelineIndex === idx
                      ? 'text-red-500 border-b-2 border-red-500'
                      : 'hover:text-red-400'
                  }`}
                  aria-label={`Jump to year ${item.year}`}
                >
                  {item.year}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline Card */}
          <div className="relative mb-16">
            {/* Card Content */}
            <div className="bg-gradient-to-br from-gray-800 rounded-sm to-gray-900 overflow-hidden border border-white/50">
              <div className="grid md:grid-cols-2">
                {/* Left */}
                <div className="p-12 flex flex-col justify-center space-y-8">
                  <div>
                    <div className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-700 tracking-tight drop-shadow-xl">
                      {TIMELINE_DATA[currentTimelineIndex].year}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-white mb-6 leading-tight">
                      {TIMELINE_DATA[currentTimelineIndex].title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {TIMELINE_DATA[currentTimelineIndex].description}
                    </p>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() =>
                        setCurrentTimelineIndex(
                          (currentTimelineIndex - 1 + TIMELINE_DATA.length) %
                            TIMELINE_DATA.length
                        )
                      }
                      className="p-4 bg-red-600 hover:bg-red-500 rounded-sm transition-all transform hover:scale-110 shadow-md focus:outline-none"
                    >
                      <ChevronLeft size={24} className="text-white" />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentTimelineIndex(
                          (currentTimelineIndex + 1) % TIMELINE_DATA.length
                        )
                      }
                      className="p-4 bg-red-600 hover:bg-red-500 rounded-sm transition-all transform hover:scale-110 shadow-md focus:outline-none"
                    >
                      <ChevronRight size={24} className="text-white" />
                    </button>
                    {/* <div className="flex items-center ml-4 text-gray-400 text-base font-mono">
                      <span className="font-semibold">{currentTimelineIndex + 1}</span>
                      <span className="mx-2">/</span>
                      <span>{TIMELINE_DATA.length}</span>
                    </div> */}
                  </div>
                </div>
                {/* Right */}
                <div className="relative h-[440px] md:h-auto">
                  <img
                    src={TIMELINE_DATA[currentTimelineIndex].image}
                    alt={TIMELINE_DATA[currentTimelineIndex].title}
                    className="w-full h-full object-cover scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Clickable Progress Bar */}
          <div className="relative px-8">
            <div
              className="relative h-3 bg-gray-800 rounded-xl overflow-hidden mb-3 cursor-pointer"
              onClick={e => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const clickedIdx = Math.floor(
                  (x / rect.width) * TIMELINE_DATA.length
                );
                setCurrentTimelineIndex(clickedIdx);
              }}
              aria-label="Timeline progress bar"
            >
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-600 rounded-xl shadow-lg"
                style={{
                  width: `${((currentTimelineIndex + 1) / TIMELINE_DATA.length) * 100}%`,
                }}
              ></div>
            </div>
            {/* Timeline Dots/Items */}
            <div className="hidden md:flex justify-between items-end mt-4 space-x-2">
              {TIMELINE_DATA.map((item, index) => {
                const isActive = index === currentTimelineIndex;
                return (
                  <div
                    key={index}
                    className="relative group flex flex-col items-center w-full cursor-pointer"
                    style={{ minWidth: '40px' }}
                    onClick={() => setCurrentTimelineIndex(index)}
                    aria-label={`Jump to year ${item.year}`}
                  >
                    {/* Line */}
                    <div
                      className={`absolute left-1/2 w-0.5 bg-black`}
                      style={{
                        height: isActive ? '52px' : '36px',
                        top: isActive ? '-52px' : '-36px',
                        transform: 'translateX(-50%)',
                        zIndex: 0,
                      }}
                    ></div>
                    {/* Dot */}
                    <div
                      className={`rounded-full transition-all duration-300`}
                      style={{
                        width: isActive ? 18 : 12,
                        height: isActive ? 18 : 12,
                        backgroundColor: isActive ? '#ef4444' : '#374151',
                        boxShadow: isActive ? '0 0 22px #ef4444' : 'none',
                        zIndex: 1,
                      }}
                    ></div>
                    {/* Year */}
                    <div
                      className={`text-center mt-2 ${
                        isActive
                          ? 'text-red-500 text-lg font-bold'
                          : 'text-black text-base group-hover:text-red-400 transition-all'
                      }`}
                    >
                      {item.year}
                    </div>
                    {/* Text for active
                    {isActive && (
                      <div className="text-xs text-gray-400 mt-1 max-w-[100px] whitespace-pre-line">
                        {item.title}
                      </div>
                    )} */}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaginatedTimeline;