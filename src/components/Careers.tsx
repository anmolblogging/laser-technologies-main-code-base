import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Loading from "./Loading";

interface JobPosition {
  id: string;
  title: string;
  description: string;
  experience: string;
  apply_link: string;
  is_active: boolean;
  created_at: string;
}

export default function Careers() {
  const [openPositions, setOpenPositions] = useState<JobPosition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOpenPositions();
  }, []);

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

  if (loading) {
    return <Loading text="Careers" />;
  }

  return (
    <div className="min-h-screen bg-white font-secondary">
      {/* Hero Section - Full Width Impact */}
      <section className="pt-10 relative bg-gradient-to-r from-white via-red-50 to-white overflow-hidden font-primary">
        {/* <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-whiteBgButtonBg opacity-70"></div>
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] rounded-full bg-whiteBgButtonBg opacity-70"></div>
        </div> */}
        {/* <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl mb-8 leading-none text-whiteBgButtonBg font-light tracking-tight">
              Shape the Future of<br/>
              <span className="font-semibold">Laser Technology</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              Join world-class engineers and designers revolutionizing industries through precision, innovation, and excellence.
            </p>
            <button 
              onClick={() => document.getElementById('positions')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-3 px-10 py-5 text-white text-lg bg-whiteBgButtonBg font-normal transition-all duration-300 hover:shadow-2xl"
            >
              View Open Roles
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div> */}
        <div className="relative overflow-hidden mt-10 bg-black">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center">
              {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm mb-6">
              <span className="text-white text-sm font-medium">
                Knowledge Center
              </span>
            </div> */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6">
                Shape the Future of
                <br />
                <span className="font-semibold">Laser Technology</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join world-class engineers and designers revolutionizing
                industries through precision, innovation, and excellence.
              </p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() =>
                  document
                    .getElementById("positions")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center gap-3 px-10 py-5 text-white text-lg bg-whiteBgButtonBg font-normal transition-all duration-300 hover:shadow-2xl"
              >
                View Open Roles
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
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
            {[
              { value: "500+", label: "Global Team Members" },
              { value: "15+", label: "Countries" },
              { value: "2024", label: "Great Place to Work®" },
              { value: "20+", label: "Years of Innovation" },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-5xl md:text-6xl mb-3 text-whiteBgText">
                  {stat.value}
                </div>
                <div className="text-gray-600 uppercase text-sm tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Showcase */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT CONTENT */}
            <div className="space-y-8">
              <div>
                <div className="inline-block px-4 py-2 rounded-full mb-6 text-sm uppercase tracking-widest bg-opacity-15 bg-whiteBgTextHover text-whiteBgTextHover font-normal">
                  Our Culture
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 font-medium text-whiteBgText tracking-tight">
                  Where Innovation
                  <br />
                  Meets Excellence
                </h2>

                <p className="text-xl text-gray-600 leading-relaxed font-light">
                  At Laser Technologies, we've created an environment where the
                  world's brightest minds collaborate to push the boundaries of
                  what's possible in laser technology.
                </p>
              </div>

              <div className="space-y-6">
                {[
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
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div
                      className="flex-shrink-0 w-1.5 rounded-full mt-2 bg-whiteBgButtonBg"
                      style={{ height: "40px" }}
                    ></div>

                    <div>
                      <h3 className="text-xl mb-2 text-whiteBgButtonBg font-normal">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT IMAGES */}
            <div className="relative">
              {/* BIG MAIN IMAGE */}
              <img
                src="https://www.lasertechnologies.co.in/images/career/slider-1.webp"
                alt=""
                className="w-full h-auto rounded-xl object-cover"
              />

              {/* SMALL OVERLAY IMAGE (BOTTOM RIGHT) */}
              <img
                src="https://www.lasertechnologies.co.in/images/career/slider-2.webp"
                alt=""
                className="absolute bottom-4 right-4 w-40 h-28 object-cover rounded-lg shadow-xl border-2 border-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Great Place to Work */}
      <section className="py-20 bg-gray-50">
  <div className="max-w-5xl mx-auto px-6">
    <div className="bg-white p-12 md:p-16 shadow-sm">
      <div className="flex flex-col md:flex-row gap-8 items-center">

        {/* LOGO BOX */}
        <div className="flex-shrink-0">
          <div className=" flex items-center justify-center  rounded-lg overflow-hidden">
            <img
              src="data:image/png;base64,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"
              alt="Great Place To Work"
             
            />
          </div>
        </div>

        {/* TEXT */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-3xl mb-4 font-normal text-whiteBgButtonBg">
            Great Place to Work® Certified 2024
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed font-light">
            We're proud to be recognized as a Great Place to Work, a testament to our
            commitment to fostering a positive and empowering workplace culture where
            every team member thrives.
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
            <div className="inline-block px-4 py-2 rounded-full mb-6 text-sm uppercase tracking-widest bg-opacity-15 bg-whiteBgTextHover text-whiteBgTextHover  font-normal">
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
              <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center bg-whiteBgButtonBg">
                <svg
                  className="w-10 h-10 text-whiteBgText"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-3xl mb-4 font-normal text-whiteBgButtonBg">
                No current openings
              </h3>
              <p className="text-gray-600 mb-8 font-light">
                We're not actively hiring right now, but we're always interested
                in connecting with exceptional talent.
              </p>
              <button className="px-8 py-4 rounded-full border-2 transition-all duration-300 hover:bg-gray-50 border-whiteBgButtonBg text-whiteBgButtonBg font-normal">
                Submit Your Resume
              </button>
            </div>
          ) : (
            <div className="space-y-6 max-w-5xl mx-auto">
              {openPositions.map((job, idx) => (
                <div
                  key={job.id}
                  className="group bg-white border-2 p-8 md:p-10 transition-all duration-300  border-black/10"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <h3 className="text-2xl md:text-3xl font-normal text-whiteBgButtonBg">
                          {job.title}
                        </h3>
                        <span className="px-4 py-1.5 rounded-full text-xs uppercase tracking-widest bg-gray-100 text-gray-600 font-normal">
                          {job.experience}
                        </span>
                      </div>
                      <p className="text-lg text-gray-600 leading-relaxed mb-6 font-light break-all">
  {job.description}
</p>

                    </div>
                    <div className="flex lg:flex-col gap-3">
                      <a
                        href={job.apply_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="flex-1 lg:flex-none px-8 py-4 text-darkBgText hover:text-darkBgText bg-whiteBgButtonBg transition-all duration-300 hover:shadow-lg font-normal whitespace-nowrap">
                          Apply Now
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-whiteBgButtonBg bg-opacity-40 text-white relative overflow-hidden font-primary">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-black font-light tracking-tight">
            Don't see the right role?
          </h2>
          <p className="text-xl md:text-2xl text-black mb-12 leading-relaxed font-light">
            We're always looking for exceptional talent. Share your resume and
            let's explore how you can contribute to our mission.
          </p>
          <button className="inline-flex items-center gap-3 px-10 py-5 bg-white  hover:bg-white hover:text-whiteBgButtonBg text-lg transition-all duration-300 font-primary text-whiteBgButtonBg">
            Get in Touch
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* Location */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl mb-6 font-light text-whiteBgText">
                Visit Our Headquarters
              </h2>
              <div className="space-y-4 text-gray-600 font-light">
                <p className="flex items-start gap-3 text-lg">
                  <svg
                    className="w-6 h-6 mt-1 flex-shrink-0 text-whiteBgButtonBg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>
                    Plot No. PAP/R/406, MIDC Rabale TTC Industrial Area
                    <br />
                    Rabale, Navi Mumbai - 400701, Maharashtra, India
                  </span>
                </p>
              </div>
            </div>
            <div className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  className="w-20 h-20 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
