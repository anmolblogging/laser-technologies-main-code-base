import {
  GraduationCap,
  Clock,
  Award,
  Users,
  ArrowRight,
  CheckCircle,
  Settings,
  Target,
  Briefcase,
  BookOpen,
  Shield,
} from "lucide-react";

const logo = "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/dark_BACKGROUND.jpg";

const TechnicalTraining = () => {
  const trainingFeatures = [
    {
      icon: Clock,
      title: "One-Day Program",
      description: "Comprehensive training delivered in a single day for minimal disruption to your operations.",
    },
    {
      icon: Award,
      title: "Free of Cost",
      description: "Complete operational training provided free for all Laser Technologies customers.",
    },
    {
      icon: Users,
      title: "Hands-On Practice",
      description: "Practical exercises and demonstrations on real equipment for effective learning.",
    },
    {
      icon: Briefcase,
      title: "Placement Support",
      description: "Career support for apprentices who complete the training program successfully.",
    },
  ];

  const curriculum = [
    {
      module: "Laser Fundamentals",
      topics: ["Laser theory basics", "Types of laser sources", "Safety protocols", "PPE requirements"],
    },
    {
      module: "Machine Operation",
      topics: ["Control panel navigation", "Start-up procedures", "Parameter settings", "Emergency protocols"],
    },
    {
      module: "Process Optimization",
      topics: ["Material handling", "Cut quality assessment", "Speed optimization", "Troubleshooting basics"],
    },
    {
      module: "Maintenance Essentials",
      topics: ["Daily checks", "Cleaning procedures", "Lens care", "Preventive measures"],
    },
  ];

  const benefits = [
    "Increase machine productivity and efficiency",
    "Reduce operational errors and downtime",
    "Ensure workplace safety compliance",
    "Extend equipment lifespan",
    "Improve cut quality and consistency",
    "Build operator confidence and competence",
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
              <GraduationCap className="text-white" size={18} />
              <span className="text-white text-xs font-medium tracking-widest uppercase">
                Training Program
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium text-white leading-tight">
              Technical <span className="text-red-500">Training</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto px-4">
              Master laser machine operations with our free, comprehensive one-day training. Enhance skills in laser cutting, welding, and marking efficiently.
            </p>
            <div className="pt-6">
              <a 
                href="/contact"
                className="hover:text-white inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium transition-all"
              >
                Enroll Now
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Introduction */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-6">
              <p className="text-red-600 font-medium uppercase tracking-widest text-xs sm:text-sm">About The Program</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
                Empowering Your Operators for Success
              </h2>
              <div className="space-y-4 text-gray-600 text-base sm:text-lg leading-relaxed">
                <p>
                  Thanks for being a part of Laser Technologies. To ensure the efficient and safe use of your equipment, we provide a <strong>free and complete operational training</strong> of one day.
                </p>
                <p>
                  This operational training features activities and demonstrations designed to familiarize the machine operator with the laser cutting machine. Our trainers focus on the sequence of operation, sub-systems, and their functions.
                </p>
                <p>
                  The attendees will get <strong>hands-on practice</strong> on technical operation methods based on knowledge of the system and its functions.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="hidden lg:block absolute -inset-4 bg-red-100/50 -z-10 -rotate-2"></div>
              <img 
                src="https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/banner.png"
                alt="Training session"
                className="shadow-xl w-full h-64 sm:h-80 md:h-96 lg:h-[450px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Training Features */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <p className="text-red-600 font-medium uppercase tracking-widest text-xs sm:text-sm mb-3">Program Highlights</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
              What Makes Our Training Special
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {trainingFeatures.map((feature, idx) => (
              <div key={idx} className="p-6 sm:p-8 bg-white border border-gray-100 hover:border-red-200 hover:shadow-lg transition-all duration-300 group">
                <div className="p-3 bg-red-50 text-red-600 w-fit mb-4">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <p className="text-red-600 font-medium uppercase tracking-widest text-xs sm:text-sm mb-3">Training Curriculum</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
              Comprehensive Course Modules
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {curriculum.map((item, idx) => (
              <div key={idx} className="p-6 sm:p-8 bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-red-600 text-white flex items-center justify-center font-medium">
                    {idx + 1}
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium text-gray-900">{item.module}</h3>
                </div>
                <ul className="space-y-2">
                  {item.topics.map((topic, tIdx) => (
                    <li key={tIdx} className="flex items-center gap-3 text-sm sm:text-base text-gray-600">
                      <CheckCircle className="text-red-600 flex-shrink-0" size={16} />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-6">
              <p className="text-red-500 font-medium uppercase tracking-widest text-xs sm:text-sm">Training Benefits</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium">
                Why Invest in Operator Training?
              </h2>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                Our goal is to provide a detailed and operational-oriented set of explanations and exercises that will increase the process efficiency of your machine.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-gray-300 text-sm sm:text-base">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="p-4 sm:p-6 bg-white/5 border border-white/10 text-center">
                <Target className="text-red-500 mx-auto mb-3" size={28} />
                <p className="text-white font-medium text-sm sm:text-base">Higher Productivity</p>
              </div>
              <div className="p-4 sm:p-6 bg-white/5 border border-white/10 text-center">
                <Shield className="text-red-500 mx-auto mb-3" size={28} />
                <p className="text-white font-medium text-sm sm:text-base">Safety First</p>
              </div>
              <div className="p-4 sm:p-6 bg-white/5 border border-white/10 text-center">
                <BookOpen className="text-red-500 mx-auto mb-3" size={28} />
                <p className="text-white font-medium text-sm sm:text-base">Expert Knowledge</p>
              </div>
              <div className="p-4 sm:p-6 bg-white/5 border border-white/10 text-center">
                <Settings className="text-red-500 mx-auto mb-3" size={28} />
                <p className="text-white font-medium text-sm sm:text-base">Better Maintenance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apprentice Support */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-100 p-8 sm:p-12 text-center">
            <Briefcase className="mx-auto text-red-600 mb-6" size={40} />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-900 mb-4">
              Support for Aspiring Technicians
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-8 max-w-2xl mx-auto">
              We support apprentices with operator training who are interested in a technical career but couldn't continue due to financial challenges. After completion of this training, we provide <strong>placement support</strong>.
            </p>
            <a 
              href="/contact"
              className="hover:text-white inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-red-600 hover:bg-red-700 text-white font-medium text-sm sm:text-base transition-all"
            >
              Apply for Apprentice Program
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GraduationCap className="mx-auto text-red-600 mb-6" size={40} />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-900 mb-4">
            Ready to Train Your Team?
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-8 max-w-xl mx-auto">
            Schedule a training session for your operators and maximize your machine's potential.
          </p>
          <a 
            href="/contact"
            className="hover:text-white inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-medium transition-all"
          >
            Schedule Training
            <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default TechnicalTraining;
