import {
  ArrowRight,
  TrendingUp,
  Zap,
  Maximize,
  Quote,
  Cpu,
  Layers,
  BarChart3,
  ChevronRight,
  Settings,
} from "lucide-react";
const image_banner = "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/services/Retenx-web.webp"
const logo = "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/dark_BACKGROUND.jpg";

const Software = () => {
  const featureCards = [
    {
      icon: Cpu,
      title: "Advanced 2D CAD/CAM",
      advantage: "Unmatched 2D part design & 3D import with automatic unfolding.",
      benefit: "Slashes design time by 60% and eliminates geometry errors.",
    },
    {
      icon: Layers,
      title: "Intelligent Nesting",
      advantage: "State-of-the-art algorithms developed over 45 years by AlmaCAM.",
      benefit: "Increases sheet utilization by up to 15%, directly reducing scrap costs.",
    },
    {
      icon: BarChart3,
      title: "Precision Estimation",
      advantage: "Hyper-accurate quoting tools based on real-world cutting parameters.",
      benefit: "Win more bids with competitive, data-driven quoting.",
    },
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-red-100 selection:text-red-900">
      {/* Hero Section - Aligned with Standard UI Patterns */}
      <header
        className="relative mt-16 md:mt-20 bg-black overflow-hidden"
        style={{
          backgroundImage: `url(${logo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center space-y-6">
            <div className="inline-flex rounded-full  items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20">
              <Settings className="text-white" size={20} />
              <span className="text-white text-sm font-medium tracking-wide">
                POWERED BY ALMACAM
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-tight font-primary">
              ReTenX <span className="text-red-600">Software</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-primary">
              Revolutionizing Production Efficiency. Unlock advanced nesting technology for seamless, high-yield cutting operations.
            </p>
            
            <div className="pt-8">
              <a 
                href="/contact"
                className="inline-flex  items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 transition-all font-medium text-lg text-white hover:text-white group"
              >
                Request a Demo
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Intro Section - Editorial Layout */}
      <section className="py-16 sm:py-20 md:py-28 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            <div className="w-full lg:w-1/2 space-y-8 lg:space-y-10">
              <div className="space-y-4">
                <p className="text-red-600 font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm font-primary">The Synergy</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900 font-primary leading-tight">
                  A Collaboration for <br className="hidden sm:block" /> Industrial Excellence
                </h2>
              </div>
              
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-600 leading-relaxed font-primary">
                <p>
                  Laser Technologies Pvt Ltd is proud to introduce <strong>ReTenX</strong>, a state-of-the-art nesting software developed in strategic collaboration with <strong>AlmaCAM</strong>, the global gold standard in CAD/CAM solutions.
                </p>
                <p>
                  With <strong>45+ years of legacy</strong>, AlmaCAM's innovation is now accessible through a localized, high-performance interface. ReTenX is engineered to transform production workflows, optimizing every square millimeter of your material.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 sm:gap-8 pt-4 sm:pt-6">
                <div className="space-y-2 border-l-4 border-red-600 pl-4 sm:pl-6">
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">45+</p>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium">Years of Innovation</p>
                </div>
                <div className="space-y-2 border-l-4 border-red-600 pl-4 sm:pl-6">
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">Global</p>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium">Standard Solutions</p>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 relative group">
              <div className="hidden lg:block absolute -top-10 -right-10 w-64 h-64 bg-red-50 -z-10 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500"></div>
              <div className="hidden lg:block absolute -bottom-10 -left-10 w-64 h-64 bg-gray-50 -z-10 group-hover:-translate-x-4 group-hover:translate-y-4 transition-transform duration-500"></div>
              <img 
                src={image_banner}
                alt="ReTenX Dashboard"
                className="shadow-xl lg:shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 object-cover w-full h-64 sm:h-80 md:h-96 lg:h-[500px]"
              />
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 bg-black p-4 sm:p-6 lg:p-8 text-white">
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">100%</p>
                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400">Machine Agnostic</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features - Bento-ish Grid */}
      <section className="py-16 sm:py-20 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6 md:gap-8">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-3xl sm:text-4xl font-medium font-primary">Features & Advantages</h2>
              <p className="text-gray-600 max-w-xl text-sm sm:text-base font-primary">Beyond simple nesting. ReTenX provides an end-to-end ecosystem for sheet metal fabrication efficiency.</p>
            </div>
            <a href="/contact" className="text-red-600 font-bold flex items-center gap-2 group border-b-2 border-red-600 pb-1 text-sm sm:text-base">
              Request Demo <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-1">
            {featureCards.map((feat, idx) => (
              <div key={idx} className="bg-white p-6 sm:p-8 lg:p-12 space-y-6 lg:space-y-8 hover:bg-gray-900 hover:text-white transition-all duration-500 group border border-gray-100 lg:border-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-red-600 flex items-center justify-center text-white">
                  <feat.icon size={28} className="sm:hidden" />
                  <feat.icon size={32} className="hidden sm:block" />
                </div>
                <div className="space-y-4 lg:space-y-6">
                  <h3 className="text-xl sm:text-2xl font-bold font-primary">{feat.title}</h3>
                  <div className="space-y-3 sm:space-y-4 text-sm leading-relaxed">
                    <p className="text-gray-500 group-hover:text-gray-400 font-medium">
                      <span className="text-red-600 font-bold uppercase tracking-wider block mb-1 text-xs">The Advantage</span>
                      {feat.advantage}
                    </p>
                    <p className="text-gray-500 group-hover:text-gray-400 font-medium">
                      <span className="text-red-600 font-bold uppercase tracking-wider block mb-1 text-xs">The Benefit</span>
                      {feat.benefit}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Section - Data Driven Dark Module */}
      <section className="py-16 sm:py-24 md:py-32 bg-black text-white relative overflow-hidden">
        <div className="hidden md:block absolute top-0 right-0 w-[600px] lg:w-[800px] h-[600px] lg:h-[800px] bg-red-600/10 rounded-full blur-[100px] lg:blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-12 sm:mb-16 md:mb-20 space-y-4 sm:space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium font-primary leading-tight">Tangible ROI <br className="hidden sm:block" /> within 12 Months</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 font-primary">
              ReTenX isn't an expense—it's a capital investment that pays for itself through unmatched material intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            <div className="p-6 sm:p-8 md:p-10 border border-white/10 bg-white/5 space-y-4 sm:space-y-6">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-red-600">10X</div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-400">Yield on Investment in 1 Year</p>
            </div>
            <div className="p-6 sm:p-8 md:p-10 border border-white/10 bg-white/5 space-y-4 sm:space-y-6">
              <TrendingUp size={32} className="text-red-600 sm:w-10 sm:h-10" />
              <h4 className="text-lg sm:text-xl font-bold">Cost Savings</h4>
              <p className="text-xs sm:text-sm text-gray-400">Hyper-accurate quoting and scrap reduction.</p>
            </div>
            <div className="p-6 sm:p-8 md:p-10 border border-white/10 bg-white/5 space-y-4 sm:space-y-6">
              <Zap size={32} className="text-red-600 sm:w-10 sm:h-10" />
              <h4 className="text-lg sm:text-xl font-bold">Faster Cycles</h4>
              <p className="text-xs sm:text-sm text-gray-400">Automated workflows slash lead times.</p>
            </div>
            <div className="p-6 sm:p-8 md:p-10 border border-white/10 bg-white/5 space-y-4 sm:space-y-6">
              <Maximize size={32} className="text-red-600 sm:w-10 sm:h-10" />
              <h4 className="text-lg sm:text-xl font-bold">Scalability</h4>
              <p className="text-xs sm:text-sm text-gray-400">Adapts to complex manufacturing needs.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Final CTA Section instead of Form */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-6xl font-medium font-primary">Ready to Transform Your Production?</h2>
            <p className="text-xl text-gray-600 font-primary">
              Experience the power of ReTenX first-hand. Join 100+ manufacturers who have optimized their quoting and nesting operations.
            </p>
            <div className="pt-8">
              <a 
                href="/contact"
                className="inline-flex hover:text-white items-center gap-3 px-12 py-6 bg-red-600 hover:bg-red-700 transition-all font-bold text-lg text-white group"
              >
                Book a Demo Now
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Software;
