import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Loading from "./Loading";
import CareerFormModal from "./CareerFormModal";

const logo = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/dark_BACKGROUND.jpg';

interface JobPosition {
  id: string;
  title: string;
  description: string;
  experience: string;
  apply_link: string;
  is_active: boolean;
  created_at: string;
}

const currentYear = new Date().getFullYear();
const features = [
    {
      title: "Innovation First",
      desc: "Work on cutting-edge projects that define the future of the laser industry",
    },
    {
      title: "Global Impact",
      desc: "Your work reaches customers and partners across 15+ countries worldwide",
    },
    {
      title: "Continuous Growth",
      desc: "Access world-class training, mentorship, and career development programs",
    },
  ];

const stats = [
  { value: "500+", label: "Global Team Members" },
  { value: "15+", label: "Countries" },
  { value: `${currentYear}` , label: "Great Place to Work®" },
  { value: "20+", label: "Years of Innovation" },
];

const parseNumber = (str: string) => {
  const num = parseInt(str.replace(/[^0-9]/g, ""), 10);
  return isNaN(num) ? 0 : num;
};

const formatValue = (val: number, original: string) => {
  return original.includes("+") ? `${val}+` : `${val}`;
};

const AnimatedCounter: React.FC<{ value: string }> = ({ value }) => {
  const targetNumber = parseNumber(value);
  const [count, setCount] = useState(10);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1000;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const progressRatio = Math.min(progress / duration, 1);
      const currentCount = Math.floor(progressRatio * targetNumber);
      setCount(currentCount);
      if (progress < duration) {
        window.requestAnimationFrame(step);
      } else {
        setCount(targetNumber);
      }
    };

    window.requestAnimationFrame(step);
  }, [targetNumber]);

  return <>{formatValue(count, value)}</>;
};

export default function Careers() {
  const [openPositions, setOpenPositions] = useState<JobPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState<{ title: string; department: string } | null>(null);

  const fetchOpenPositions = async () => {
    try {
      const { data, error } = await supabase
        .from("careers")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOpenPositions(data || []);
    } catch (error) {
      console.error("Error fetching positions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpenPositions();
  }, []);

  if (loading) {
    return <Loading text="Careers" />;
  }

  return (
    <div className="min-h-screen bg-white font-secondary">
      {/* Hero Section */}
      <section className="pt-6 md:pt-10 relative bg-gradient-to-r from-white via-red-50 to-white overflow-hidden font-primary">
        <div
          className="relative overflow-hidden mt-10 bg-black"
          style={{
            backgroundImage: `url(${logo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6">
                Shape the Future of
                <br />
                <span className="font-medium">Laser Technology</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join world-class engineers and designers revolutionizing
                industries through precision, innovation, and excellence.
              </p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() =>
                  document.getElementById("positions")?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center gap-3 px-10 py-5 text-white text-lg bg-whiteBgButtonBg font-normal transition-all duration-300 hover:shadow-2xl"
              >
                View Open Roles
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-20 border-b border-whiteBgButtonBg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 text-center">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <div className="text-5xl md:text-6xl mb-3 text-whiteBgText">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-gray-600 uppercase text-sm tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <span className="inline-block px-4 py-2 rounded-full text-sm uppercase tracking-wider bg-red-100 text-red-600 font-smeibold">
                  Our Culture
                </span>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 leading-tight">
                  Where Innovation
                  <br />
                  Meets Excellence
                </h2>
                
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
                  At Laser Technologies, we've created an environment where the
                  world's brightest minds collaborate to push the boundaries of
                  what's possible in laser technology.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-6 pt-4">
                {features.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-1 h-12 rounded-full bg-red-200 mt-1" />
                    <div className="space-y-1">
                      <h3 className="text-lg md:text-2xl font-medium text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Images */}
            <div className="relative order-first lg:order-last">
              <div className="relative">
                <img
                  src="https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/careers/laser_tech_careers_main%20image.jpg"
                  alt="Laser Technologies workplace"
                  draggable="false"
                  className="w-full h-auto shadow-lg object-cover"
                />
                <img
                  src="https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/careers/laser_tech_careers_small_image.jpg"
                  alt="Team collaboration"
                  draggable="false"
                  className="absolute bottom-4 right-4 w-48 h-32 md:w-52 md:h-36 object-cover shadow-2xl border-2 border-white"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Great Place to Work */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white p-12 md:p-16 shadow-sm">
            <div className="flex flex-col gap-8 md:flex-row items-center">
              {/* LOGO BOX */}
              <div className="flex-shrink-0">
                <div className=" flex items-center justify-center  overflow-hidden">
                  <img
                    src="https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/Grate%20place%20to%20work.png"
                    alt="Great Place To Work"
                    className="h-52"
                  />
                </div>
              </div>

              {/* TEXT */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl mb-4 font-normal text-whiteBgButtonBg">
                  Great Place to Work® Certified 2026
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed font-light">
                  We're proud to be recognized as a Great Place to Work, a
                  testament to our commitment to fostering a positive and
                  empowering workplace culture where every team member thrives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full mb-6 text-sm uppercase tracking-widest bg-opacity-15 bg-whiteBgTextHover text-whiteBgTextHover font-normal">
              Opportunities
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 font-light tracking-tight text-whiteBgText">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Find your perfect role and start making an impact from day one.
            </p>
          </div>

          {openPositions.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center py-16">
              <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center bg-red-200">
                <svg className="w-10 h-10 text-whiteBgText" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-3xl mb-4 font-normal text-whiteBgButtonBg">
                No current openings
              </h3>
              <p className="text-gray-600 mb-8 font-light">
                We're not actively hiring right now, but we're always interested
                in connecting with exceptional talent.
              </p>
            </div>
          ) : (
            <div className="space-y-6 max-w-5xl mx-auto">
              {openPositions.map((job) => (
                <div key={job.id} className="group bg-white border-2 p-8 md:p-10 transition-all duration-300 border-black/10">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <h3 className="text-2xl md:text-3xl font-normal text-whiteBgButtonBg">
                          {job.title}
                        </h3>
                        <span className="px-5 py-1.5 rounded-full text-sm uppercase tracking-widest bg-gray-100 text-gray-800 font-medium">
                          {job.experience}
                        </span>
                      </div>
                      <p className="text-lg text-gray-600 leading-relaxed mb-6 font-light break-all">
                        {job.description}
                      </p>
                    </div>
                    <div className="flex lg:flex-col gap-3">
                      {job.apply_link ? (
                        <a href={job.apply_link} target="_blank" rel="noopener noreferrer">
                          <button className="w-full lg:w-auto font-medium px-8 py-4 text-darkBgText hover:text-darkBgText bg-whiteBgButtonBg transition-all duration-300 hover:shadow-lg whitespace-nowrap">
                            Apply Now
                          </button>
                        </a>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedJob({ title: job.title, department: job.experience || "" });
                            setShowApplicationForm(true);
                          }}
                          className="w-full lg:w-auto px-8 py-4 text-darkBgText hover:text-darkBgText bg-whiteBgButtonBg transition-all duration-300 hover:shadow-lg font-medium whitespace-nowrap"
                        >
                          Apply Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Application Form Modal */}
      {showApplicationForm && selectedJob && (
        <CareerFormModal
          job={selectedJob}
          onClose={() => {
            setShowApplicationForm(false);
            setSelectedJob(null);
          }}
        />
      )}
    </div>
  );
}