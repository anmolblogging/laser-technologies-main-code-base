import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Menu, X, Linkedin, Twitter, Mail, X as CloseIcon } from 'lucide-react';

const BRAND = {
  primary: '#6b0f0f',
  hover: '#4f0b0b',
  light: '#fef2f2',
  border: 'rgba(107,15,15,0.15)',
};

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

// Client logos data
const CLIENTS_DATA = [
  { name: "Mahindra", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop" },
  { name: "Tata Motors", logo: "https://images.unsplash.com/photo-1611095564532-1f5d6e3f92f3?w=200&h=100&fit=crop" },
  { name: "Reliance", logo: "https://images.unsplash.com/photo-1611095790189-1ddb47f6dd0c?w=200&h=100&fit=crop" },
  { name: "L&T", logo: "https://images.unsplash.com/photo-1611095970649-2b3d4e0b9d1f?w=200&h=100&fit=crop" },
  { name: "Bosch", logo: "https://images.unsplash.com/photo-1611095973362-f8f9e7f8c3a8?w=200&h=100&fit=crop" },
  { name: "Godrej", logo: "https://images.unsplash.com/photo-1611095564532-1f5d6e3f92f3?w=200&h=100&fit=crop" },
  { name: "Ashok Leyland", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop" },
  { name: "Forbes Marshall", logo: "https://images.unsplash.com/photo-1611095790189-1ddb47f6dd0c?w=200&h=100&fit=crop" }
];

// Company gallery images
const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=800&fit=crop",
  "https://images.unsplash.com/photo-1581092918484-8313e1f7e8d6?w=1200&h=800&fit=crop"
];

// Leadership team data
const LEADERSHIP_DATA = [
  {
    name: "Mr. Rakesh Agarwal",
    title: "Founder & Managing Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
    bio: "Rakesh Agarwal is the founder of Laser Technologies. With an aim to make laser machines accessible to everyone in India, Mr. Agarwal founded this organization in 2011. He was the brain behind the \"Laser Tech 2010\", the biggest exhibition on laser technology in India.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "rakesh@lasertechnologies.co.in"
    }
  },
  {
    name: "Ms. Pankti Agarwal",
    title: "Co-Founder & Executive Director",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop",
    bio: "Ms. Pankti Agarwal is the Director of Operations at Laser Technologies. She oversees all the behind-the-scenes operations happening at the office of Laser Technologies. She has been selected for Top 30 Business Women to Watch in 2020 by the CEO Magazine.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "pankti@lasertechnologies.co.in"
    }
  },
  {
    name: "Mr. Rana Pratap Singh",
    title: "Vice President - Sales",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=600&fit=crop",
    bio: "Mr. Rana Pratap Singh is the Vice President - Sales at Laser Technologies. He is responsible for developing and executing strategic plans to achieve the sales targets and expand our customer base.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "rana@lasertechnologies.co.in"
    }
  }
];

export default function AboutUsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTimelineIndex, setCurrentTimelineIndex] = useState(0);
  const [clientsStartIndex, setClientsStartIndex] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [selectedLeader, setSelectedLeader] = useState(null);

  const nextTimeline = () => {
    setCurrentTimelineIndex((prev) => (prev + 1) % TIMELINE_DATA.length);
  };

  const prevTimeline = () => {
    setCurrentTimelineIndex((prev) => (prev - 1 + TIMELINE_DATA.length) % TIMELINE_DATA.length);
  };

  const nextClients = () => {
    setClientsStartIndex((prev) => (prev + 4) % CLIENTS_DATA.length);
  };

  const prevClients = () => {
    setClientsStartIndex((prev) => (prev - 4 + CLIENTS_DATA.length) % CLIENTS_DATA.length);
  };

  const nextGallery = () => {
    setGalleryIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  };

  const prevGallery = () => {
    setGalleryIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  const visibleClients = [
    ...CLIENTS_DATA.slice(clientsStartIndex, clientsStartIndex + 4),
    ...CLIENTS_DATA.slice(0, Math.max(0, (clientsStartIndex + 4) - CLIENTS_DATA.length))
  ];

  return (
    <div className="min-h-screen bg-white pt-20">


      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-br overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.hover} 100%)` }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&h=900&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-medium text-white mb-6 leading-tight">About Laser Technologies</h1>
            <p className="text-2xl text-white opacity-95 font-light">Empowering Industries, Inspiring Generations</p>
            <div className="mt-8 flex gap-4">
              <div className="text-white">
                <div className="text-4xl font-bold">₹300Cr+</div>
                <div className="text-sm opacity-90">Enterprise Value</div>
              </div>
              <div className="w-px bg-white opacity-30"></div>
              <div className="text-white">
                <div className="text-4xl font-bold">7200+</div>
                <div className="text-sm opacity-90">Customers</div>
              </div>
              <div className="w-px bg-white opacity-30"></div>
              <div className="text-white">
                <div className="text-4xl font-bold">150+</div>
                <div className="text-sm opacity-90">Employees</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="group">
              <div className="relative overflow-hidden rounded-2xl shadow-xl mb-6 h-72">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop" 
                  alt="Our Mission"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h2 className="text-3xl font-bold text-white">Our Mission</h2>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Our mission is to make technology accessible to the masses, and we are grateful for the support of our partners and customers who have helped us grow into a leading player in the market.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our focus on quality, innovation, and customer service has enabled us to build lasting relationships with our clients, who trust us to deliver the best laser solutions in the industry.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="group">
              <div className="relative overflow-hidden rounded-2xl shadow-xl mb-6 h-72">
                <img 
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=600&fit=crop" 
                  alt="Our Vision"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h2 className="text-3xl font-bold text-white">Our Vision</h2>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Laser Technologies wants to be a global leader in delivering cost-effective solutions to global businesses and make India a superpower in the international laser market.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Since the inception of Laser Technologies, our goal has been to ensure every Indian business in the laser community gets access to state-of-the-art laser machines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-24" style={{ backgroundColor: BRAND.light }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: BRAND.primary }}>About Laser Technologies</h2>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: BRAND.primary }}></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                At Laser Technologies Pvt Ltd, we understand that every industry has unique needs and challenges. That's why we offer a wide range of laser solutions that cater to diverse industries, including manufacturing, automotive, aerospace, and more.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                We believe that customer satisfaction is the key to our success. Our team of experts works closely with customers to understand their specific needs and requirements, and we provide customized solutions that meet their unique demands.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                Our Laser Source repairing center and head repairing center are equipped with state-of-the-art technology to handle all kinds of repair and maintenance needs.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl opacity-20" style={{ backgroundColor: BRAND.primary }}></div>
              <img 
                src="https://images.unsplash.com/photo-1581092918484-8313e1f7e8d6?w=800&h=600&fit=crop" 
                alt="About Company"
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Carousel */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Our Facilities</h2>
            <p className="text-gray-400">State-of-the-art infrastructure and technology</p>
          </div>

          <div className="relative">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={GALLERY_IMAGES[galleryIndex]} 
                alt={`Gallery ${galleryIndex + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            <button
              onClick={prevGallery}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all transform hover:scale-110"
              style={{ color: BRAND.primary }}
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={nextGallery}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all transform hover:scale-110"
              style={{ color: BRAND.primary }}
            >
              <ChevronRight size={28} />
            </button>

            <div className="flex justify-center gap-3 mt-8">
              {GALLERY_IMAGES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setGalleryIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === galleryIndex ? 'w-8' : 'w-2'
                  }`}
                  style={{ 
                    backgroundColor: index === galleryIndex ? BRAND.primary : '#fff',
                    opacity: index === galleryIndex ? 1 : 0.5
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6" style={{ color: BRAND.primary }}>The Torchbearers</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Here's presenting the trinity of Laser Technologies who are striving to come up with the best and innovative solutions. With their unwavering commitment, guidance and strong leadership, Laser Technologies has been able to capture the attention of the Indian laser community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {LEADERSHIP_DATA.map((leader, index) => (
              <div 
                key={index} 
                className="group cursor-pointer"
                onClick={() => setSelectedLeader(leader)}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-xl mb-6 aspect-square">
                  <img 
                    src={leader.image} 
                    alt={leader.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <p className="text-sm font-medium mb-2">Click to learn more</p>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-opacity-80 transition-colors" style={{ color: BRAND.primary }}>
                  {leader.name}
                </h3>
                <p className="text-gray-600 font-medium">{leader.title}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 p-10 rounded-2xl shadow-xl relative overflow-hidden" style={{ backgroundColor: BRAND.light }}>
            <div className="absolute top-0 left-0 w-2 h-full" style={{ backgroundColor: BRAND.primary }}></div>
            <p className="text-gray-700 italic leading-relaxed text-lg mb-6">
              "Since the inception of Laser Technologies, our goal has been to ensure every Indian business in the laser community gets access to state-of-the-art laser machines. The Laser Technologies team aspires to solve the growing demand for laser cutting and marking machines through our modernistic approach. Welcome to Laser Technologies."
            </p>
            <p className="text-right font-bold text-xl" style={{ color: BRAND.primary }}>
              - Pankti Agarwal, Co-Founder & Executive Director
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6" style={{ color: BRAND.primary }}>Our Inspirational Journey</h2>
            <p className="text-gray-600 text-xl">From Vision to Victory</p>
            <div className="w-32 h-1 mx-auto mt-6 rounded-full" style={{ backgroundColor: BRAND.primary }}></div>
          </div>

          {/* Timeline Visualization */}
          <div className="relative mb-20">
            {/* Timeline Line */}
            <div className="absolute left-0 right-0 top-8 h-1 bg-gradient-to-r" style={{ 
              background: `linear-gradient(to right, ${BRAND.primary}, ${BRAND.hover}, ${BRAND.primary})` 
            }}></div>

            {/* Timeline Points */}
            <div className="relative flex justify-between items-start">
              {TIMELINE_DATA.map((item, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => setCurrentTimelineIndex(index)}
                  style={{ width: `${100 / TIMELINE_DATA.length}%` }}
                >
                  <div 
                    className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-white shadow-lg transform transition-all duration-300 ${
                      index === currentTimelineIndex 
                        ? 'scale-125 ring-4 ring-white shadow-2xl' 
                        : 'group-hover:scale-110'
                    }`}
                    style={{ 
                      backgroundColor: index === currentTimelineIndex ? BRAND.primary : BRAND.hover,
                      zIndex: index === currentTimelineIndex ? 20 : 10
                    }}
                  >
                    {item.year.toString().slice(-2)}
                  </div>
                  <div className="mt-4 text-center">
                    <div className={`text-sm font-bold transition-colors ${
                      index === currentTimelineIndex ? 'text-lg' : ''
                    }`} style={{ color: index === currentTimelineIndex ? BRAND.primary : '#6b7280' }}>
                      {item.year}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Content Display */}
          <div className="relative">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative group">
                <div className="absolute -inset-4 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity" style={{ backgroundColor: BRAND.primary }}></div>
                <div className="relative overflow-hidden rounded-3xl shadow-2xl h-[500px]">
                  <img 
                    src={TIMELINE_DATA[currentTimelineIndex].image} 
                    alt={TIMELINE_DATA[currentTimelineIndex].title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div className="inline-block px-6 py-2 rounded-full text-white font-bold text-xl" style={{ backgroundColor: BRAND.primary }}>
                  {TIMELINE_DATA[currentTimelineIndex].year}
                </div>
                <h3 className="text-4xl font-bold text-gray-900 leading-tight">
                  {TIMELINE_DATA[currentTimelineIndex].title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {TIMELINE_DATA[currentTimelineIndex].description}
                </p>
                
                <div className="flex gap-4 pt-6">
                  <button
                    onClick={prevTimeline}
                    className="p-4 rounded-xl border-2 hover:shadow-lg transition-all transform hover:-translate-x-1"
                    style={{ borderColor: BRAND.border, color: BRAND.primary }}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextTimeline}
                    className="p-4 rounded-xl border-2 hover:shadow-lg transition-all transform hover:translate-x-1"
                    style={{ borderColor: BRAND.border, color: BRAND.primary }}
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Journey Summary */}
          <div className="mt-24 p-12 bg-white " >
            <h3 className="text-3xl font-bold mb-6" style={{ color: BRAND.primary }}>Today & Beyond</h3>
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              From two dreamers in a small Pune office to a ₹300 Crore enterprise with 7200+ customers and 150+ employees, Laser Technologies' story is more than milestones — it is a journey of belief, resilience, and the courage to dream big.
            </p>
            <div className="flex items-center gap-4 text-2xl font-bold" style={{ color: BRAND.primary }}>
              <span className="text-4xl">💡</span>
              <span>Laser Technologies – From Vision to Victory, Empowering Industries, Inspiring Generations.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Esteemed Clients Section */}
      <section className="py-24" style={{ backgroundColor: BRAND.light }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6" style={{ color: BRAND.primary }}>Our Esteemed Clients</h2>
            <p className="text-gray-600 text-lg">Trusted by industry leaders across the nation</p>
            <div className="w-32 h-1 mx-auto mt-6 rounded-full" style={{ backgroundColor: BRAND.primary }}></div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {visibleClients.map((client, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-center p-10 bg-white rounded-2xl border-2 hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300"
                  style={{ borderColor: BRAND.border }}
                >
                  <img 
                    src={client.logo} 
                    alt={client.name}
                    className="w-full h-24 object-contain grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4 mt-16">
              <button
                onClick={prevClients}
                className="p-4 bg-white rounded-full border-2 hover:shadow-xl transition-all transform hover:scale-110"
                style={{ borderColor: BRAND.border, color: BRAND.primary }}
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={nextClients}
                className="p-4 bg-white rounded-full border-2 hover:shadow-xl transition-all transform hover:scale-110"
                style={{ borderColor: BRAND.border, color: BRAND.primary }}
              >
                <ChevronRight size={28} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: BRAND.primary }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&h=900&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-white mb-8">Ready to Transform Your Business?</h2>
          <p className="text-xl text-white opacity-95 mb-12 max-w-3xl mx-auto leading-relaxed">
            Partner with us for innovative industrial laser solutions that drive growth and efficiency. Let's build the future together.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="https://www.lasertechnologies.co.in/book-a-laser-demo"
              className="px-12 py-4 text-lg font-semibold bg-white rounded-xl transition-all transform hover:scale-105 hover:shadow-2xl"
              style={{ color: BRAND.primary }}
            >
              Schedule A Demo
            </a>
            <a 
              href="#"
              className="px-12 py-4 text-lg font-semibold text-white border-3 rounded-xl transition-all transform hover:scale-105 hover:bg-white"
              style={{ borderWidth: '3px', borderColor: 'white' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = BRAND.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'white';
              }}
            >
              Request A Quote
            </a>
          </div>
        </div>
      </section>


      {/* Leader Modal */}
      {selectedLeader && (
        <div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedLeader(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button 
                onClick={() => setSelectedLeader(null)}
                className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
                style={{ color: BRAND.primary }}
              >
                <CloseIcon size={24} />
              </button>
              
              <div className="grid md:grid-cols-5 gap-8 p-8">
                <div className="md:col-span-2">
                  <div className="sticky top-8">
                    <div className="rounded-2xl overflow-hidden shadow-xl mb-6">
                      <img 
                        src={selectedLeader.image} 
                        alt={selectedLeader.name}
                        className="w-full aspect-square object-cover"
                      />
                    </div>
                    <div className="flex gap-4 justify-center">
                      <a 
                        href={selectedLeader.social.linkedin}
                        className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
                        style={{ backgroundColor: BRAND.light, color: BRAND.primary }}
                      >
                        <Linkedin size={20} />
                      </a>
                      <a 
                        href={selectedLeader.social.twitter}
                        className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
                        style={{ backgroundColor: BRAND.light, color: BRAND.primary }}
                      >
                        <Twitter size={20} />
                      </a>
                      <a 
                        href={`mailto:${selectedLeader.social.email}`}
                        className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
                        style={{ backgroundColor: BRAND.light, color: BRAND.primary }}
                      >
                        <Mail size={20} />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-3 space-y-6">
                  <div>
                    <h3 className="text-4xl font-bold mb-3" style={{ color: BRAND.primary }}>
                      {selectedLeader.name}
                    </h3>
                    <p className="text-xl text-gray-600 font-medium">
                      {selectedLeader.title}
                    </p>
                  </div>
                  
                  <div className="h-1 w-20 rounded-full" style={{ backgroundColor: BRAND.primary }}></div>
                  
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {selectedLeader.bio}
                  </p>
                  
                  <div className="pt-6">
                    <a 
                      href={`mailto:${selectedLeader.social.email}`}
                      className="inline-block px-8 py-4 text-white font-semibold rounded-xl transition-all transform hover:scale-105 hover:shadow-xl"
                      style={{ backgroundColor: BRAND.primary }}
                    >
                      Get in Touch
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}