import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';

const Clients = () => {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  const PAGE_SIZE = 20; // fetch enough logos to split in two distinct sets
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch clients from Supabase once (20 logos)
  const fetchClients = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('clients')
      .select('id, name, image_url')
      .order('id', { ascending: true })
      .limit(PAGE_SIZE);

    setLoading(false);
    if (error) {
      console.error('Error fetching clients:', error);
      return;
    }
    if (data) {
      setClients(data);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Split into two halves without overlap for marquee rows
  const mid = Math.ceil(clients.length / 2);
  const row1 = clients.slice(0, mid);
  const row2 = clients.slice(mid, clients.length);

  // Pause/resume marquee animation on hover
  useEffect(() => {
    const handleMouseEnter = (ref: React.RefObject<any>) => {
      if (ref.current) {
        ref.current.style.animationPlayState = 'paused';
      }
    };
    const handleMouseLeave = (ref: React.RefObject<any>) => {
      if (ref.current) {
        ref.current.style.animationPlayState = 'running';
      }
    };

    const row1Element = row1Ref.current;
    const row2Element = row2Ref.current;

    if (row1Element) {
      row1Element.addEventListener('mouseenter', () => handleMouseEnter(row1Ref));
      row1Element.addEventListener('mouseleave', () => handleMouseLeave(row1Ref));
    }
    if (row2Element) {
      row2Element.addEventListener('mouseenter', () => handleMouseEnter(row2Ref));
      row2Element.addEventListener('mouseleave', () => handleMouseLeave(row2Ref));
    }

    return () => {
      if (row1Element) {
        row1Element.removeEventListener('mouseenter', () => handleMouseEnter(row1Ref));
        row1Element.removeEventListener('mouseleave', () => handleMouseLeave(row1Ref));
      }
      if (row2Element) {
        row2Element.removeEventListener('mouseenter', () => handleMouseEnter(row2Ref));
        row2Element.removeEventListener('mouseleave', () => handleMouseLeave(row2Ref));
      }
    };
  }, []);

  if (loading) return <div>
    <svg className="animate-spin h-8 w-8 text-gray-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
    </svg>
  </div>;
  if (clients.length === 0) return <div>No clients found</div>;

  return (
    <section className="relative py-12 mb-20 my-10 bg-gray-50 overflow-hidden" aria-label="Our Clients">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-medium font-primary text-gray-900 mb-3 sm:mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Join hundreds of companies that rely on our solutions
          </p>
        </div>

        {/* Top Marquee - Left to Right */}
        <div className="relative mb-6 sm:mb-8 lg:mb-10">
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div ref={row1Ref} className="flex gap-4 sm:gap-6 lg:gap-8 animate-marquee-left will-change-transform">
              {[...row1, ...row1, ...row1].map((client, idx) => (
                <div
                  key={`row1-${idx}`}
                  className="group flex-shrink-0 w-36 h-16 sm:w-44 sm:h-18 lg:w-52 lg:h-20 bg-white rounded-xl shadow-sm hover:shadow-xl flex items-center justify-center p-3 sm:p-4 transition-all duration-500 ease-out transform hover:scale-110 hover:-translate-y-1 border border-gray-100"
                  style={{ transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)' }}
                  onMouseEnter={e => (e.currentTarget.style.filter = 'grayscale(0%)')}
                  onMouseLeave={e => (e.currentTarget.style.filter = 'grayscale(100%)')}
                >
                  <img
                    src={client.image_url || ""}
                    alt={`${client.name} logo`}
                    className="max-w-full max-h-full object-contain"
                    loading="lazy"
                    width="200"
                    height="80"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Marquee - Right to Left */}
        <div className="relative">
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div ref={row2Ref} className="flex gap-4 sm:gap-6 lg:gap-8 animate-marquee-right will-change-transform">
              {[...row2, ...row2, ...row2].map((client, idx) => (
                <div
                  key={`row2-${idx}`}
                  className="group flex-shrink-0 w-36 h-16 sm:w-44 sm:h-18 lg:w-52 lg:h-20 bg-white rounded-xl shadow-sm hover:shadow-xl flex items-center justify-center p-3 sm:p-4 transition-all duration-500 ease-out transform hover:scale-110 hover:-translate-y-1 border border-gray-100"
                  style={{ transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)' }}
                  onMouseEnter={e => (e.currentTarget.style.filter = 'grayscale(0%)')}
                  onMouseLeave={e => (e.currentTarget.style.filter = 'grayscale(100%)')}
                >
                  <img
                    src={client.image_url || ""}
                    alt={`${client.name} logo`}
                    className="max-w-full max-h-full object-contain"
                    loading="lazy"
                    width="200"
                    height="80"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 20px) scale(1.05); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 45s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 45s linear infinite;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        .will-change-transform {
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-left,
          .animate-marquee-right,
          .animate-blob,
          .animate-fade-in-up {
            animation: none;
          }
        }
        .animate-marquee-left,
        .animate-marquee-right {
          backface-visibility: hidden;
          perspective: 1000px;
          transform: translateZ(0);
        }
      `}</style>
    </section>
  );
};

export default Clients;
