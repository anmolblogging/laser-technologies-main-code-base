import {
  Wrench,
  Phone,
  Video,
  Clock,
  ShieldCheck,
  ArrowRight,
  CheckCircle,
  Settings,
  Users,
  Package,
  Headphones,
} from "lucide-react";

const logo = "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/dark_BACKGROUND.jpg";

const OutOfWarranty = () => {
  const supportOptions = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Get immediate technical guidance from our expert engineers over phone calls for quick troubleshooting.",
      highlight: "24/7 Available",
    },
    {
      icon: Video,
      title: "Video Call Support",
      description: "Schedule a video consultation for detailed visual guidance and step-by-step machine diagnostics.",
      highlight: "Visual Guidance",
    },
    {
      icon: Users,
      title: "On-Site Service",
      description: "Our trained technicians can visit your facility for hands-on repairs and comprehensive maintenance.",
      highlight: "Expert Technicians",
    },
  ];

  const benefits = [
    "Expert maintenance services for all laser machine brands",
    "Genuine spare parts with quality assurance",
    "Flexible service packages tailored to your needs",
    "Quick turnaround time for repairs",
    "Preventive maintenance programs",
    "Performance optimization consultations",
  ];



  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header
        className="relative mt-16 md:mt-20 bg-black overflow-hidden"
        style={{
          backgroundImage: `url(${logo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-28 text-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
              <Wrench className="text-white" size={18} />
              <span className="text-white text-xs font-medium tracking-widest uppercase">
                Service & Support
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium text-white leading-tight">
              Out of Warranty <br className="hidden sm:block" />
              <span className="text-red-500">Services</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto px-4">
              Expert maintenance and technical support to restore and optimize your machine's performance, even after warranty.
            </p>
            <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact"
                className="hover:text-white inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium border border-white/20 transition-all"
              >
                Request Service
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Support Options */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <p className="text-red-600 font-medium uppercase tracking-widest text-xs sm:text-sm mb-3">Support Options</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
              Multiple Ways to Get Help
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {supportOptions.map((option, idx) => (
              <div key={idx} className="p-6 sm:p-8 bg-gray-50 border border-gray-100 hover:border-red-200 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-red-50 text-red-600">
                    <option.icon size={24} />
                  </div>
                  <span className="text-xs font-medium text-red-600 bg-red-50 px-3 py-1">
                    {option.highlight}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {option.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {option.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <p className="text-red-600 font-medium uppercase tracking-widest text-xs sm:text-sm mb-3">Why Choose Us</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
                  Trusted Service Beyond Warranty
                </h2>
              </div>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Your machine's warranty may have ended, but our commitment to your success hasn't. Laser Technologies provides comprehensive out-of-warranty services to keep your production running at peak performance.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-gray-700 text-sm sm:text-base">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="hidden lg:block absolute -inset-4 bg-red-100/50 -z-10 rotate-2"></div>
              <img 
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800"
                alt="Technical service"
                className="shadow-xl w-full h-64 sm:h-80 md:h-96 lg:h-[450px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Spare Parts CTA */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <div className="rounded-full inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm mb-4">
                <Package size={16} className="text-red-500" />
                <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-white">Spare Parts</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-white mb-4">
                Need Genuine Spare Parts?
              </h2>
              <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-6 max-w-xl">
                Visit our dedicated spare parts portal for genuine components, consumables, and accessories for all laser machines.
              </p>
              <a 
                href="https://www.laserconsumable.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-red-600 hover:bg-red-700 text-white font-medium text-sm sm:text-base transition-all"
              >
                Buy Spare Parts
                <ArrowRight size={18} />
              </a>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4 sm:gap-6">
              <div className="p-4 sm:p-6 bg-white/5 border border-white/10 text-center">
                <Settings className="text-red-500 mx-auto mb-3" size={28} />
                <p className="text-white font-medium text-sm sm:text-base">Nozzles & Lenses</p>
              </div>
              <div className="p-4 sm:p-6 bg-white/5 border border-white/10 text-center">
                <Wrench className="text-red-500 mx-auto mb-3" size={28} />
                <p className="text-white font-medium text-sm sm:text-base">Accessories</p>
              </div>
              <div className="p-4 sm:p-6 bg-white/5 border border-white/10 text-center">
                <ShieldCheck className="text-red-500 mx-auto mb-3" size={28} />
                <p className="text-white font-medium text-sm sm:text-base">Quality Assured</p>
              </div>
              <div className="p-4 sm:p-6 bg-white/5 border border-white/10 text-center">
                <Clock className="text-red-500 mx-auto mb-3" size={28} />
                <p className="text-white font-medium text-sm sm:text-base">Fast Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default OutOfWarranty;
