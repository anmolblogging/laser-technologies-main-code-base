import {
  CheckCircle,
  Users,
  Wrench,
  Clock,
  ShieldCheck,
  Settings,
  ClipboardList,
  GraduationCap,
  MapPin,
  ArrowRight,
  Monitor,
  Search,
} from "lucide-react";

const BRAND = {
  primary: "#6b0f0f",
  hover: "#4f0b0b",
  light: "#fef2f2",
  accent: "#f31524",
};

const logo = "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/dark_BACKGROUND.jpg";

const TechSupport = () => {
  const promises = [
    {
      icon: Clock,
      title: "Quick Turnaround Time",
      desc: "We promise the fastest response and resolution times in the industry.",
    },
    {
      icon: MapPin,
      title: "Support All Over India",
      desc: "Our support network extends across the entire nation, ensuring help is always near.",
    },
    {
      icon: Users,
      title: "Customer Oriented",
      desc: "Our services are designed with your business continuity as our top priority.",
    },
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
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center rounded-full gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20">
              <Settings className="text-white" size={20} />
              <span className="text-white text-sm font-medium tracking-wide">
                SERVICE & SUPPORT
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-tight">
              Tech Support
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              The LTPL team wants to make laser technology accessible across the nation. 
              Our customer service executives are equipped to handle all queries including pre-sale 
              and after-sales service. From site inspection to personnel training, we take care of all.
            </p>
          </div>
        </div>
      </header>

      {/* Promises Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {promises.map((promise, index) => (
              <div
                key={index}
                className="p-6 sm:p-8 border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-2xl transition-all duration-300 group"
              >
                <div 
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mb-4 sm:mb-6 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: BRAND.light, color: BRAND.primary }}
                >
                  <promise.icon size={28} className="sm:hidden" />
                  <promise.icon size={32} className="hidden sm:block" />
                </div>
                <h3 className="text-xl sm:text-2xl font-medium mb-3 sm:mb-4 text-gray-900">{promise.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {promise.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-sales Service */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-center">
            <div className="w-full lg:flex-1 space-y-6 sm:space-y-8">
              <div className="inline-flex rounded-full items-center gap-2 px-4 py-2" style={{ backgroundColor: BRAND.light }}>
                <div className="w-2 h-2" style={{ backgroundColor: BRAND.primary }}></div>
                <span className="text-xs sm:text-sm font-medium" style={{ color: BRAND.primary }}>PRE-SALES SERVICE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
                Pre-sales Technical Consultation
              </h2>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex gap-4 p-4 sm:p-6 bg-white shadow-sm">
                  <div className="p-2 sm:p-3 bg-red-50 text-red-600 h-fit">
                    <Monitor size={20} className="sm:hidden" />
                    <Monitor size={24} className="hidden sm:block" />
                  </div>
                  <div>
                    <h4 className="font-medium text-base sm:text-lg mb-1 sm:mb-2">Guidance & Solutions</h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      We provide product information, technical consultation, and customized professional laser processing solutions via website, phone, email, social media, and site visits.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 sm:p-6 bg-white shadow-sm">
                  <div className="p-2 sm:p-3 bg-red-50 text-red-600 h-fit">
                    <Search size={20} className="sm:hidden" />
                    <Search size={24} className="hidden sm:block" />
                  </div>
                  <div>
                    <h4 className="font-medium text-base sm:text-lg mb-1 sm:mb-2">Technical Reception</h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Our reception team provides on-site visiting, inspection, machine testing, sample proofing, and sample mailing at any time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:flex-1">
              <div className="relative">
                <div className="hidden lg:block absolute -inset-4 bg-red-100/50 -z-10 rotate-3"></div>
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
                  alt="Pre-sales Service"
                  className="shadow-xl lg:shadow-2xl w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* During Service */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <div className="rounded-full inline-flex items-center gap-2 px-4 py-2 mb-4 sm:mb-6" style={{ backgroundColor: BRAND.light }}>
              <div className="w-2 h-2" style={{ backgroundColor: BRAND.primary }}></div>
              <span className="text-xs sm:text-sm font-medium" style={{ color: BRAND.primary }}>DURING SERVICE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
              Assisting customers & planning
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="p-6 sm:p-8 border border-gray-100 space-y-3 sm:space-y-4 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="p-2 sm:p-3 bg-red-50 text-red-600 w-fit">
                <ShieldCheck size={24} className="sm:hidden" />
                <ShieldCheck size={28} className="hidden sm:block" />
              </div>
              <h3 className="text-lg sm:text-xl font-medium">Honesty & Transparency</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                We abide by principles of honesty and fairness. Every client receives complete transparency regardless of their location.
              </p>
            </div>
            <div className="p-6 sm:p-8 border border-gray-100 space-y-3 sm:space-y-4 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="p-2 sm:p-3 bg-red-50 text-red-600 w-fit">
                <ClipboardList size={24} className="sm:hidden" />
                <ClipboardList size={28} className="hidden sm:block" />
              </div>
              <h3 className="text-lg sm:text-xl font-medium">Quality Inspection</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Every device undergoes multiple strictly implemented quality inspections to meet all standards before delivery.
              </p>
            </div>
            <div className="p-6 sm:p-8 border border-gray-100 space-y-3 sm:space-y-4 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="p-2 sm:p-3 bg-red-50 text-red-600 w-fit">
                <MapPin size={24} className="sm:hidden" />
                <MapPin size={28} className="hidden sm:block" />
              </div>
              <h3 className="text-lg sm:text-xl font-medium">Site Planning</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                We assist in designing production sites ensuring water, electricity, and gas requirements are perfectly met.
              </p>
            </div>
            <div className="p-6 sm:p-8 border border-gray-100 space-y-3 sm:space-y-4 shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="p-2 sm:p-3 bg-red-50 text-red-600 w-fit">
                <Wrench size={24} className="sm:hidden" />
                <Wrench size={28} className="hidden sm:block" />
              </div>
              <h3 className="text-lg sm:text-xl font-medium">Complete Manuals</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Every delivery includes installation, maintenance, unloading, and training guides for seamless operation.
              </p>
            </div>
            <div className="p-6 sm:p-8 border border-gray-100 space-y-3 sm:space-y-4 shadow-sm hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-2 bg-white">
              <div className="p-2 sm:p-3 bg-red-50 text-red-600 w-fit">
                <GraduationCap size={24} className="sm:hidden" />
                <GraduationCap size={28} className="hidden sm:block" />
              </div>
              <h3 className="text-lg sm:text-xl font-medium">Free Specialized Training</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                We provide free training at our center covering theory, safety, operation, and maintenance. Pass the training to receive your certificate of completion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* After-Sales Service */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-900 text-white overflow-hidden relative">
        <div className="hidden md:block absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-red-600/10 blur-[80px] sm:blur-[100px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="inline-flex rounded-full items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm">
                <div className="w-2 h-2 bg-red-500"></div>
                <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-white">After-Sales Service</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium">Timely Service & Maintenance</h2>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex gap-4 sm:gap-6">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-red-600 flex items-center justify-center">
                    <CheckCircle size={20} className="sm:hidden" />
                    <CheckCircle size={24} className="hidden sm:block" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-medium mb-1 sm:mb-2">Rapid Response</h4>
                    <p className="text-gray-400 text-sm sm:text-base">We respond to queries at the earliest and assist in your challenges immediately.</p>
                  </div>
                </div>
                <div className="flex gap-4 sm:gap-6">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-red-600 flex items-center justify-center">
                    <Users size={20} className="sm:hidden" />
                    <Users size={24} className="hidden sm:block" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-medium mb-1 sm:mb-2">Expert Engineers</h4>
                    <p className="text-gray-400 text-sm sm:text-base">Professionally trained engineers provide support services worldwide through all means.</p>
                  </div>
                </div>
                <div className="flex gap-4 sm:gap-6">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-red-600 flex items-center justify-center">
                    <Search size={20} className="sm:hidden" />
                    <Search size={24} className="hidden sm:block" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-medium mb-1 sm:mb-2">Technical Inspections</h4>
                    <p className="text-gray-400 text-sm sm:text-base">During warranty, we conduct technical inspections and routine maintenance visits periodically.</p>
                  </div>
                </div>
              </div>
              <div className="pt-4 sm:pt-8">
                <a 
                  href="/contact" 
                  className="hover:text-white inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-red-600 hover:bg-red-700 transition-all font-medium text-base sm:text-lg group text-white"
                >
                  Request Support
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="hidden lg:block absolute -inset-10 bg-red-600/20 blur-[50px] -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800"
                alt="After-sales support"
                className="shadow-xl lg:shadow-2xl border border-white/10 w-full h-64 sm:h-80 md:h-96 lg:h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechSupport;
