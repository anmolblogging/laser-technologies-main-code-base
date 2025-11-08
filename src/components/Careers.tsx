import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Loading from "./Loading";
import Form from "./Form";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

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
      <section className="pt-10 relative bg-gradient-to-r from-white via-red-50 to-white overflow-hidden font-primary">
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
                    src='data:image/png;base64,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'
                    alt="Great Place To Work"
                    className="h-52"
                  />
                </div>
              </div>

              {/* TEXT */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl mb-4 font-normal text-whiteBgButtonBg">
                  Great Place to Work® Certified 2025
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
        <Form
          type="CAREER_APPLICATION"
          onClose={() => {
            setShowApplicationForm(false);
            setSelectedJob(null);
          }}
          initialData={{
            position: selectedJob.title,
            department: selectedJob.department,
          }}
        />
      )}
    </div>
  );
}
