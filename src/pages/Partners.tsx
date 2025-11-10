
import { Globe,Handshake , ExternalLink, MapPin, Calendar, TrendingUp, Trophy, Target, Zap, ArrowRight } from 'lucide-react';

const Partners = () => {
  const logo = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/dark_BACKGROUND.jpg';

  const partners = [
    {
      name: "HSG Laser",
      location: "China",
      established: "2006",
      description: "A hi-tech enterprise focusing on R&D, production and sales of laser equipment, dedicated to serve global customers with intelligent metal forming solutions. HSG Laser has expanded its service network to 100+ countries and regions, established 2 R&D centers in Foshan, China and Chiba, Japan (9 R&D laboratories in total), 5 industry-university-research bases and applied for 316 authorized patents after 15 years of wing-footed development.",
      specialization: "Intelligent Metal Forming Solutions",
      website: "https://www.hsglaser.com",
      image: "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/partners-logo/HSG%20LOGO.png",
      achievements: [
        { icon: Globe, text: "100+ Countries", color: "text-red-800" },
        { icon: Trophy, text: "316 Patents", color:"text-red-800" },
        { icon: Target, text: "9 R&D Labs", color: "text-red-800"}
      ]
    },
    {
      name: "GCC Laser",
      location: "Taiwan",
      established: "1989",
      description: "A global manufacturing company producing a broad range of quality products including cutting plotters, laser engravers, laser markers, laser cutters, UV-curable inkjet printers, and digital finish equipment for various applications such as signage & advertising, personalization & identification, gifts & promotions, apparel and electronics industries. GCC is based in Taiwan but has its offices in the United States, Europe and China.",
      specialization: "Laser Engraving & Cutting Equipment",
      website: "https://www.gcclaser.com",
      image: "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/partners-logo/GCC%20LOGO.png",
      achievements: [
        { icon: Calendar, text: "Since 1989", color: "text-red-800" },
        { icon: Globe, text: "Global Presence", color: "text-red-800" },
        { icon: TrendingUp, text: "Market Leader", color: "text-red-800" }
      ]
    },
    {
      name: "Alpha Laser",
      location: "Germany",
      established: "N/A",
      description: "Alpha Laser GmbH is an owner-operated medium-sized company specializing in the development and manufacture of laser systems for welding, cutting, and hardening metals. As a pioneer in mobile welding, Alpha Laser offers a wide range of laser systems for flexible and mobile use.",
      specialization: "Mobile Laser Welding Systems",
      website: "https://www.alphalaser.de",
      image: "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/partners-logo/ALPHA%20LOGO.png",
      achievements: [
        { icon: Zap, text: "Mobile Pioneer", color: "text-red-800" },
        { icon: Trophy, text: "German Precision", color: "text-red-800" },
        { icon: Target, text: "Metal Expert", color:"text-red-800" }
      ]
    },
    {
      name: "Stiefelmayer Lasertechnik",
      location: "Germany",
      established: "18th Century",
      description: "Stiefelmayer offers an unprecedented level of precision and dynamics in both the 2-D and 3-D areas and leads to production results that meet the highest quality requirements. Stiefelmayer started its operations in the 18th century with the first measuring tools and callipers - and also in the 20th century with its 3D measuring machines.",
      specialization: "Precision Laser Systems",
      website: "https://www.stiefelmayer-lasertechnik.de",
      image: "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/partners-logo/STIEFELMAYER%20LOGO.png",
      achievements: [
        { icon: Calendar, text: "300+ Years", color: "text-red-800" },
        { icon: Trophy, text: "Precision Leader", color: "text-red-800" },
        { icon: Target, text: "3D Innovation",color: "text-red-800"  }
      ]
    },
    {
      name: "SEI Laser",
      location: "Italy",
      established: "N/A",
      description: "One of the most dynamic and innovative companies in the world of laser technology, Sei laser provides a complete range of laser systems to satisfy the needs of customers in a variety of markets, including dedicated machines for textiles, leather, digital converting and more.",
      specialization: "Textile & Leather Laser Systems",
      website: "https://www.seilaser.com",
      image: "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/partners-logo/SEI%20LOGO.png",
      achievements: [
        { icon: Zap, text: "Innovation Hub", color: "text-red-800" },
        { icon: Target, text: "Textile Specialist",color: "text-red-800"  },
        { icon: TrendingUp, text: "Dynamic Growth", color: "text-red-800" }
      ]
    },
    {
      name: "Centricut",
      location: "USA",
      established: "N/A",
      description: "With Centricut consumables for CO2 & fiber optic laser cutting system, you get the same quality as OEM parts, but at a lower cost. They offer more than 3000 part numbers - one of the largest inventories anywhere including OEM quality laser optics, nozzles, nozzle holders & accessories. All are precision manufactured and come with a seal of approval.",
      specialization: "Laser Consumables & Parts",
      website: "https://www.hypertherm.com/resources/training/",
      image: "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/partners-logo/CENTRICUT%20LOGO.png",
      achievements: [
        { icon: Trophy, text: "3000+ Parts", color: "text-red-800" },
        { icon: Target, text: "OEM Quality", color: "text-red-800" },
        { icon: Globe, text: "Largest Stock", color: "text-red-800"}
      ]
    },
    {
      name: "GHBM",
      location: "China",
      established: "N/A",
      description: "GHBM is a national high-tech enterprise dedicated to providing intelligent bending equipment for users around the world. It has always focused on manufacturing intelligent bending equipment. It has a professional and independent core R&D team for CNC Press Brake.",
      specialization: "Intelligent Bending Equipment",
      website: "http://www.fsghkj.com/en/",
      image: "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/partners-logo/GHBM%20LOGO.png",
      achievements: [
        { icon: Zap, text: "Hi-Tech Certified", color: "text-red-800"},
        { icon: Target, text: "CNC Focus", color: "text-red-800" },
        { icon: TrendingUp, text: "Worldwide", color: "text-red-800" }
      ]
    },
    {
      name: "Rodomach",
      location: "Netherlands",
      established: "1997",
      description: "Rodomach was founded in 1997 by Roel Doornebosch. The company has developed into an innovative machine builder which focuses on the development, construction and supply of specialized machinery, robotic welding and robotic handling systems. The company offers its customers the benefits of high end (welding) machines and installations with a focus on reliability, flexibility, process- and product quality, efficiency and cost-effective solutions!",
      specialization: "Robotic Welding Systems",
      website: "https://www.rodomach.nl",
      image: "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/partners-logo/Rodomach%20logo.png",
      achievements: [
        { icon: Trophy, text: "Robotic Expert", color:"text-red-800"},
        { icon: Target, text: "Custom Built", color: "text-red-800" },
        { icon: TrendingUp, text: "Quality Driven", color: "text-red-800" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
 <header
        className="relative mt-16 md:mt-20 bg-black overflow-hidden"
        style={{ backgroundImage: `url(${logo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center space-y-6">
            <div className="inline-flex rounded-full items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20">
              <Handshake className="text-white" size={20} />
              <span className="text-white text-sm font-medium tracking-wide">
                PARTNERSHIPS
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-tight">
              The Partners Behind<br />Our Innovation
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              We've partnered with some of the finest laser technology manufacturers worldwide. Each brings unique expertise and proven track records.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <button
              onClick={() => {
                const timelineSection = document.querySelector('#partners-grid');
                if (timelineSection) {
                  timelineSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
                className="group px-8 py-4 bg-whiteBgButtonBg text-whiteBgButtonText font-semibold hover:bg-whiteBgTextHover transition-all duration-300 flex items-center gap-2"
                aria-label="View Partners "
              >
                <span>View Partners</span>
                <ArrowRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Partners Section */}
      <section id="partners-grid" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="space-y-16 md:space-y-24">
            {partners.map((partner, index) => (
              <article 
                key={index}
                className="group border bg-gray-50 border-black/10 p-4 rounded-lg md:p-10"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                  {/* Image */}
                  <div className={`relative overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="aspect-[4/3] relative p-2 bg-white rounded-lg">
                      <img 
                        src={partner.image}
                        alt={partner.name}
                        className="w-full h-full p-2 object-contain "
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-3xl md:text-6xl font-bold text-gray-900 mb-4">
                          {partner.name}
                        </h3>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            {partner.location}
                          </span>
                          {partner.established !== "N/A" && (
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" />
                              Established {partner.established}
                            </span>
                          )}
                        </div>

                        {/* Achievements */}
                        <div className="flex flex-wrap gap-2.5 mb-6">
                          {partner.achievements.map((achievement, idx) => {
                            const Icon = achievement.icon;
                            return (
                              <div 
                                key={idx} 
                                className="inline-flex items-center gap-2 px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-full hover:border-gray-300 transition-colors"
                              >
                                <Icon className={`w-4 h-4 ${achievement.color}`} />
                                <span className="text-xs font-semibold text-gray-700">
                                  {achievement.text}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <p className="text-gray-700 font-medium text-md leading-relaxed">
                        {partner.description}
                      </p>

                      <a 
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-2 px-6 py-3 bg-red-200 hover:text-black text-gray-900 font-semibold hover:shadow-md transition-all duration-300"
                      >
                        <span>Visit Website</span>
                        <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Divider - except for last item
                {index < partners.length - 1 && (
                  <div className="mt-16 md:mt-24 border-t border-gray-200"></div>
                )} */}
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;