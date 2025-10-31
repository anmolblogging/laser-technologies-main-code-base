import React, { useEffect, useRef } from 'react';

// Client logos data - easily maintainable
import img1 from '../assets/customer-logos/_22jayna.jpg';
import img2 from '../assets/customer-logos/0.png';
import img3 from '../assets/customer-logos/5f0d6afe3ef4695dfa599e6f_Logo.png';
import img4 from '../assets/customer-logos/1280px-Foxconn_logo.svg.png';
import img5 from '../assets/customer-logos/2351_profilepicture.png';
import img6 from '../assets/customer-logos/2560px-Sartorius.svg.png';
import img7 from '../assets/customer-logos/250436blob.png';
import img8 from '../assets/customer-logos/1630503679499.jpg';
import img9 from '../assets/customer-logos/1638102548202.jpg';
import img10 from '../assets/customer-logos/ALF.jpg';
import img11 from '../assets/customer-logos/amex-logo.png';
import img12 from '../assets/customer-logos/APT.jpg';
import img13 from '../assets/customer-logos/Archies, Delhi.png';
import img14 from '../assets/customer-logos/av-thomas-leather-and-allied-products-squarelogo-1507725755501.webp';
import img15 from '../assets/customer-logos/banner.jpg';
import img16 from '../assets/customer-logos/Biess Manufacturing, Bangalore.png';
import img17 from '../assets/customer-logos/biesse-vector-logo.png';
import img18 from '../assets/customer-logos/CEERI PILANI LOGO-2.png';
import img19 from '../assets/customer-logos/Coiltech_2018_thumb_750x99999.jpg';
import img20 from '../assets/customer-logos/coiltech_logo260en.jpg';
import img21 from '../assets/customer-logos/CRISH METAL WORKS.png';
import img22 from '../assets/customer-logos/CS-Electric.jpg';
import img23 from '../assets/customer-logos/d-s-tech (1).pdf'; // PDF can't be image, may need special handling
import img24 from '../assets/customer-logos/d-s-tech.pdf'; // ditto
import img25 from '../assets/customer-logos/d9825f3501ec36f157497d07dfa057f7.jpg';
import img26 from '../assets/customer-logos/dst- DS TECH.jpg';
import img27 from '../assets/customer-logos/forbes-marshall-logo.jpg';
import img28 from '../assets/customer-logos/garware.jpg';
import img29 from '../assets/customer-logos/genie-auto-.jpg';
import img30 from '../assets/customer-logos/Godrej_Logo.svg.png';
import img31 from '../assets/customer-logos/hindustan-hydraulics_india_clients_RailTech.jpg';
import img32 from '../assets/customer-logos/Huphen Electromech, nashik.jpg';
import img33 from '../assets/customer-logos/Huphen logo.jpg';
import img34 from '../assets/customer-logos/IIID LOGO 3.png';
import img35 from '../assets/customer-logos/iit bombay.png';
import img36 from '../assets/customer-logos/images (1).png';
import img37 from '../assets/customer-logos/images (2).png';
import img38 from '../assets/customer-logos/images (3).png';
import img39 from '../assets/customer-logos/images (4).png';
import img40 from '../assets/customer-logos/images (5).png';
import img41 from '../assets/customer-logos/images (6).png';
import img42 from '../assets/customer-logos/images (7).png';
import img43 from '../assets/customer-logos/images.jpg';
import img44 from '../assets/customer-logos/images.png';
import img45 from '../assets/customer-logos/Jabil_Circuit_Logo.svg.png';
import img46 from '../assets/customer-logos/Kass Fab, Delhi.png';
import img47 from '../assets/customer-logos/KILOSKAR LOGO-4.png';
import img48 from '../assets/customer-logos/logo (1).png';
import img49 from '../assets/customer-logos/logo (2).png';
import img50 from '../assets/customer-logos/logo-normal.png';
const Clients = () => {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);


const clients = [
  { id: 1, name: '_22jayna', url: img1 },
  { id: 2, name: '0', url: img2 },
  { id: 3, name: '5f0d6afe3ef4695dfa599e6f_Logo', url: img3 },
  { id: 4, name: 'Foxconn_logo', url: img4 },
  { id: 5, name: '2351_profilepicture', url: img5 },
  { id: 6, name: 'Sartorius', url: img6 },
  { id: 7, name: '250436blob', url: img7 },
  { id: 8, name: '1630503679499', url: img8 },
  { id: 9, name: '1638102548202', url: img9 },
  { id: 10, name: 'ALF', url: img10 },
  { id: 11, name: 'amex-logo', url: img11 },
  { id: 12, name: 'APT', url: img12 },
  { id: 13, name: 'Archies Delhi', url: img13 },
  { id: 14, name: 'av-thomas-leather-and-allied-products', url: img14 },
  { id: 15, name: 'banner', url: img15 },
  { id: 16, name: 'Biess Manufacturing Bangalore', url: img16 },
  { id: 17, name: 'biesse-vector-logo', url: img17 },
  { id: 18, name: 'CEERI PILANI LOGO', url: img18 },
  { id: 19, name: 'Coiltech 2018 thumb', url: img19 },
  { id: 20, name: 'coiltech_logo260en', url: img20 },
  { id: 21, name: 'CRISH METAL WORKS', url: img21 },
  { id: 22, name: 'CS-Electric', url: img22 },
  // PDFs omitted as normally not images
  { id: 23, name: 'd9825f3501ec36f157497d07dfa057f7', url: img25 },
  { id: 24, name: 'dst- DS TECH', url: img26 },
  { id: 25, name: 'forbes-marshall-logo', url: img27 },
  { id: 26, name: 'garware', url: img28 },
  { id: 27, name: 'genie-auto', url: img29 },
  { id: 28, name: 'Godrej_Logo', url: img30 },
  { id: 29, name: 'hindustan-hydraulics_india_clients_RailTech', url: img31 },
  { id: 30, name: 'Huphen Electromech nashik', url: img32 },
  { id: 31, name: 'Huphen logo', url: img33 },
  { id: 32, name: 'IIID LOGO 3', url: img34 },
  { id: 33, name: 'iit bombay', url: img35 },
  { id: 34, name: 'images (1)', url: img36 },
  { id: 35, name: 'images (2)', url: img37 },
  { id: 36, name: 'images (3)', url: img38 },
  { id: 37, name: 'images (4)', url: img39 },
  { id: 38, name: 'images (5)', url: img40 },
  { id: 39, name: 'images (6)', url: img41 },
  { id: 40, name: 'images (7)', url: img42 },
  { id: 41, name: 'images', url: img43 },
  { id: 42, name: 'images', url: img44 },
  { id: 43, name: 'Jabil Circuit Logo', url: img45 },
  { id: 44, name: 'Kass Fab Delhi', url: img46 },
  { id: 45, name: 'KILOSKAR LOGO', url: img47 },
  { id: 46, name: 'logo (1)', url: img48 },
  { id: 47, name: 'logo (2)', url: img49 },
  { id: 48, name: 'logo-normal', url: img50 },
];


  // Split clients into two rows
  const mid = Math.ceil(clients.length / 2);
  const row1 = clients.slice(0, mid);
  const row2 = clients.slice(mid);

  useEffect(() => {
    const handleMouseEnter = (ref) => {
      if (ref.current) {
        ref.current.style.animationPlayState = 'paused';
      }
    };

    const handleMouseLeave = (ref) => {
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

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 my-10 bg-gray-50 overflow-hidden" aria-label="Our Clients">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with animation */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-medium font-primary text-gray-900 mb-3 sm:mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Join hundreds of companies that rely on our solutions
          </p>
        </div>
        
        {/* First Marquee - Left to Right */}
        <div className="relative mb-6 sm:mb-8 lg:mb-10">
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div 
              ref={row1Ref}
              className="flex gap-4 sm:gap-6 lg:gap-8 animate-marquee-left will-change-transform"
            >
              {[...row1, ...row1, ...row1].map((client, idx) => (
                <div
                  key={`row1-${idx}`}
                  className="group flex-shrink-0 w-36 h-16 sm:w-44 sm:h-18 lg:w-52 lg:h-20 bg-white rounded-xl shadow-sm hover:shadow-xl flex items-center justify-center p-3 sm:p-4 transition-all duration-500 ease-out transform hover:scale-110 hover:-translate-y-1 border border-gray-100"
                  style={{
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'grayscale(0%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'grayscale(100%)';
                  }}
                >
                  <img
                    src={client.url}
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

        {/* Second Marquee - Right to Left */}
        <div className="relative">
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div 
              ref={row2Ref}
              className="flex gap-4 sm:gap-6 lg:gap-8 animate-marquee-right will-change-transform"
            >
              {[...row2, ...row2, ...row2].map((client, idx) => (
                <div
                  key={`row2-${idx}`}
                  className="group flex-shrink-0 w-36 h-16 sm:w-44 sm:h-18 lg:w-52 lg:h-20 bg-white rounded-xl shadow-sm hover:shadow-xl flex items-center justify-center p-3 sm:p-4 transition-all duration-500 ease-out transform hover:scale-110 hover:-translate-y-1 border border-gray-100"
                  style={{
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'grayscale(0%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'grayscale(100%)';
                  }}
                >
                  <img
                    src={client.url}
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
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes marquee-right {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -20px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(20px, 20px) scale(1.05);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-marquee-left {
          animation: marquee-left 25s linear infinite;
        }

        .animate-marquee-right {
          animation: marquee-right 25s linear infinite;
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

        /* Performance optimizations */
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-left,
          .animate-marquee-right,
          .animate-blob,
          .animate-fade-in-up {
            animation: none;
          }
        }

        /* Hardware acceleration */
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