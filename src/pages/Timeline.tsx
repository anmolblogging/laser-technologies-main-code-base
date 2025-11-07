import React, { useState, useEffect } from 'react';
import { BookOpen, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from "../lib/supabase";

const logo = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/dark_BACKGROUND.jpg';


const PAGE_SIZE = 5;

const PaginatedTimeline = () => {
  const [currentTimelineIndex, setCurrentTimelineIndex] = useState(0);
  const [timelineData, setTimelineData] = useState([]);

  useEffect(() => {
    async function fetchTimelineData() {
      const { data, error } = await supabase
        .from('milestone')
        .select('year, title, content, image_url')
        .order('year', { ascending: true });
      if (error) {
        console.error('Error fetching timeline data:', error);
        setTimelineData([]);
      } else {
        // Map database fields to app's expected shape
        const mappedData = data.map(item => ({
          year: item.year,
          title: item.title,
          description: item.content,
          image: item.image_url,
        }));
        setTimelineData(mappedData);
        setCurrentTimelineIndex(0);
      }
    }

    fetchTimelineData();
  }, []);

  if (!timelineData.length) {
    return <div>Loading timeline...</div>;
  }

  return (
    <>
      {/* Custom Header */}
      <header className="relative mt-16 md:mt-20 bg-black overflow-hidden" style={{ backgroundImage: `url(${logo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
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
              {timelineData.map((item, idx) => (
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
            <div className="bg-gradient-to-br from-gray-800 rounded-sm to-gray-900 overflow-hidden border border-white/50">
              <div className="grid md:grid-cols-2">
                <div className="p-12 flex flex-col justify-center space-y-8">
                  <div>
                    <div className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-700 tracking-tight drop-shadow-xl">
                      {timelineData[currentTimelineIndex].year}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-white mb-6 leading-tight">
                      {timelineData[currentTimelineIndex].title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {timelineData[currentTimelineIndex].description}
                    </p>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() =>
                        setCurrentTimelineIndex(
                          (currentTimelineIndex - 1 + timelineData.length) %
                            timelineData.length
                        )
                      }
                      className="p-4 bg-red-600 hover:bg-red-500 rounded-sm transition-all transform hover:scale-110 shadow-md focus:outline-none"
                    >
                      <ChevronLeft size={24} className="text-white" />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentTimelineIndex(
                          (currentTimelineIndex + 1) % timelineData.length
                        )
                      }
                      className="p-4 bg-red-600 hover:bg-red-500 rounded-sm transition-all transform hover:scale-110 shadow-md focus:outline-none"
                    >
                      <ChevronRight size={24} className="text-white" />
                    </button>
                  </div>
                </div>
                <div className="relative h-[440px] md:h-auto">
                  <img
                    src={timelineData[currentTimelineIndex].image}
                    alt={timelineData[currentTimelineIndex].title}
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
                  (x / rect.width) * timelineData.length
                );
                setCurrentTimelineIndex(clickedIdx);
              }}
              aria-label="Timeline progress bar"
            >
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-600 rounded-xl shadow-lg"
                style={{
                  width: `${((currentTimelineIndex + 1) / timelineData.length) * 100}%`,
                }}
              ></div>
            </div>
            <div className="hidden md:flex justify-between items-end mt-4 space-x-2">
              {timelineData.map((item, index) => {
                const isActive = index === currentTimelineIndex;
                return (
                  <div
                    key={index}
                    className="relative group flex flex-col items-center w-full cursor-pointer"
                    style={{ minWidth: '40px' }}
                    onClick={() => setCurrentTimelineIndex(index)}
                    aria-label={`Jump to year ${item.year}`}
                  >
                    <div
                      className={`absolute left-1/2 w-0.5 bg-black`}
                      style={{
                        height: isActive ? '52px' : '36px',
                        top: isActive ? '-52px' : '-36px',
                        transform: 'translateX(-50%)',
                        zIndex: 0,
                      }}
                    ></div>
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
                    <div
                      className={`text-center mt-2 ${
                        isActive
                          ? 'text-red-500 text-lg font-bold'
                          : 'text-black text-base group-hover:text-red-400 transition-all'
                      }`}
                    >
                      {item.year}
                    </div>
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
