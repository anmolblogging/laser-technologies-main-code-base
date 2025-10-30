import { useState, useEffect } from 'react';
import { supabase } from "../lib/supabase";
import Loading from './Loading';
import Navbar from './Navbar';
import Footer from './Footer';

const BRAND = {
  primary: '#6b0f0f',
  hover: '#4f0b0b',
  light: '#fef2f2',
  border: 'rgba(107,15,15,0.15)',
};

// fix the redline error

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
  const [openPositions, setOpenPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOpenPositions();
  }, []);

  const fetchOpenPositions = async () => {
    try {
      const { data, error } = await supabase
        .from('careers')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOpenPositions(data || []);
    } catch (error) {
      console.error('Error fetching positions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading text="Careers" />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section - Full Width Impact */}
      <section className="pt-10 relative bg-gradient-to-r from-white via-red-50 to-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full" style={{ background: `radial-gradient(circle, ${BRAND.primary} 0%, transparent 70%)` }}></div>
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] rounded-full" style={{ background: `radial-gradient(circle, ${BRAND.primary} 0%, transparent 70%)` }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl mb-8 leading-none" 
                style={{ color: BRAND.primary, fontWeight: 300, letterSpacing: '-0.02em' }}>
              Shape the Future of<br/>
              <span style={{ fontWeight: 500 }}>Laser Technology</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto" style={{ fontWeight: 300, lineHeight: '1.6' }}>
              Join world-class engineers and designers revolutionizing industries through precision, innovation, and excellence.
            </p>
            <button 
              onClick={() => document.getElementById('positions')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-3 px-10 py-5 text-white text-lg  transition-all duration-300 hover:shadow-2xl"
              style={{ backgroundColor: BRAND.primary, fontWeight: 400 }}>
              View Open Roles
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-20 border-b" style={{ borderColor: BRAND.border }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12">
            {[
              { value: '500+', label: 'Global Team Members' },
              { value: '15+', label: 'Countries' },
              { value: '2024', label: 'Great Place to Work®' },
              { value: '20+', label: 'Years of Innovation' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl md:text-6xl mb-3" style={{ color: BRAND.primary }}>
                  {stat.value}
                </div>
                <div className="text-gray-600 uppercase text-sm tracking-widest" >
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
            <div className="space-y-8">
              <div>
                <div className="inline-block px-4 py-2 rounded-full mb-6 text-sm uppercase tracking-widest" 
                     style={{ backgroundColor: BRAND.light, color: BRAND.primary, fontWeight: 400 }}>
                  Our Culture
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 font-medium" 
                    style={{ color: BRAND.primary, letterSpacing: '-0.01em' }}>
                  Where Innovation<br/>Meets Excellence
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed" style={{ fontWeight: 300 }}>
                  At Laser Technologies, we've created an environment where the world's brightest minds collaborate to push the boundaries of what's possible in laser technology.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { title: 'Innovation First', desc: 'Work on cutting-edge projects that define the future of the laser industry' },
                  { title: 'Global Impact', desc: 'Your work reaches customers and partners across 15+ countries worldwide' },
                  { title: 'Continuous Growth', desc: 'Access world-class training, mentorship, and career development programs' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-1.5 rounded-full mt-2" 
                         style={{ backgroundColor: BRAND.primary, height: '40px' }}></div>
                    <div>
                      <h3 className="text-xl mb-2" style={{ color: BRAND.primary, fontWeight: 400 }}>
                        {item.title}
                      </h3>
                      <p className="text-gray-600" style={{ fontWeight: 350 }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-24 h-24 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <p className="text-gray-400 text-sm" style={{ fontWeight: 300 }}>Office Environment Photo</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 rounded-3xl opacity-10" 
                   style={{ backgroundColor: BRAND.primary }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Great Place to Work */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white  p-12 md:p-16 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0">
                <div className="w-24 h-24  flex items-center justify-center" 
                     style={{ backgroundColor: BRAND.light }}>
                  <svg className="w-12 h-12" style={{ color: BRAND.primary }} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl mb-4" style={{ color: BRAND.primary, fontWeight: 400 }}>
                  Great Place to Work® Certified 2024
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed" style={{ fontWeight: 300 }}>
                  We're proud to be recognized as a Great Place to Work, a testament to our commitment to fostering a positive and empowering workplace culture where every team member thrives.
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
            <div className="inline-block px-4 py-2 rounded-full mb-6 text-sm uppercase tracking-widest" 
                 style={{ backgroundColor: BRAND.light, color: BRAND.primary, fontWeight: 400 }}>
              Opportunities
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6" 
                style={{ color: BRAND.primary, fontWeight: 350, letterSpacing: '-0.01em' }}>
              Open Positions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto" style={{ fontWeight: 300 }}>
              Find your perfect role and start making an impact from day one.
            </p>
          </div>

          {openPositions.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center py-16">
              <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" 
                   style={{ backgroundColor: BRAND.light }}>
                <svg className="w-10 h-10" style={{ color: BRAND.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-3xl mb-4" style={{ color: BRAND.primary, fontWeight: 400 }}>
                No current openings
              </h3>
              <p className="text-gray-600 mb-8" style={{ fontWeight: 350 }}>
                We're not actively hiring right now, but we're always interested in connecting with exceptional talent.
              </p>
              <button className="px-8 py-4 rounded-full border-2 transition-all duration-300 hover:bg-gray-50"
                      style={{ borderColor: BRAND.border, color: BRAND.primary, fontWeight: 400 }}>
                Submit Your Resume
              </button>
            </div>
          ) : (
            <div className="space-y-6 max-w-5xl mx-auto">
              {openPositions.map((job, idx) => (
                <div
                  key={job.id}
                  className="group bg-white border-2  p-8 md:p-10 transition-all duration-300 hover:shadow-xl"
                  style={{ borderColor: BRAND.border }}>
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <h3 className="text-2xl md:text-3xl" style={{ color: BRAND.primary, fontWeight: 400 }}>
                          {job.title}
                        </h3>
                        <span className="px-4 py-1.5 rounded-full text-xs uppercase tracking-widest bg-gray-100 text-gray-600" 
                              style={{ fontWeight: 400 }}>
                          {job.experience}
                        </span>
                      </div>
                      <p className="text-lg text-gray-600 leading-relaxed mb-6" style={{ fontWeight: 300 }}>
                        {job.description}
                      </p>

                    </div>
                    
                    <div className="flex lg:flex-col gap-3">
                        <a 
                        href={job.apply_link} target="_blank" rel="noopener noreferrer"
                        >
                            <button 
                            className="flex-1 lg:flex-none px-8 py-4  text-white transition-all duration-300 hover:shadow-lg whitespace-nowrap"
                            style={{ backgroundColor: BRAND.primary, fontWeight: 400 }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = BRAND.hover}
                            onMouseLeave={(e) => e.target.style.backgroundColor = BRAND.primary}>
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
      <section className="py-24 md:py-32 bg-gradient-to-br from-red-950 via-red-900 to-red-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6" style={{ fontWeight: 300, letterSpacing: '-0.01em' }}>
            Don't see the right role?
          </h2>
          <p className="text-xl md:text-2xl text-red-100 mb-12 leading-relaxed" style={{ fontWeight: 300 }}>
            We're always looking for exceptional talent. Share your resume and let's explore how you can contribute to our mission.
          </p>
          <button 
            className="inline-flex items-center gap-3 px-10 py-5 bg-white rounded-full text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
            style={{ color: BRAND.primary, fontWeight: 400 }}>
            Get in Touch
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </section>

      {/* Location */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl mb-6" style={{ color: BRAND.primary, fontWeight: 300 }}>
                Visit Our Headquarters
              </h2>
              <div className="space-y-4 text-gray-600" style={{ fontWeight: 300 }}>
                <p className="flex items-start gap-3 text-lg">
                  <svg className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: BRAND.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>
                    Plot No. PAP/R/406, MIDC Rabale TTC Industrial Area<br/>
                    Rabale, Navi Mumbai - 400701, Maharashtra, India
                  </span>
                </p>
              </div>
            </div>
            <div className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}