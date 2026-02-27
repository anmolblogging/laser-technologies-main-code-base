import React, { useState, useEffect, useCallback, useMemo } from "react";
const logo = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/dark_BACKGROUND.jpg';
import {
  BookOpen,
  Scissors,
  Zap,
  Tag,
  Users,
  Laptop,
  Building2,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import GururkulFormModal from "../components/GururkulFormModal";

const LaserGurukul: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [showRegForm, setShowRegForm] = useState(false);
  const [initialModule, setInitialModule] = useState("");

  const carouselImages = useMemo(
    () => [
      {
        url: "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/laser-gurukul/laser_gurukul_slider_1.jpg",
        alt: "Modern laser cutting facility",
      },
      {
        url: "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/laser-gurukul/laser_gurukul_slider_2.jpg",
        alt: "Professional laser technology training",
      },
      {
        url: 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/laser-gurukul/laser_gurukul_slider_3.jpg',
        alt: "Career opportunities in laser technology",
      },
      {
        url: 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/laser-gurukul/laser_gurukul_slider_4.jpg',
        alt: "Career opportunities in laser technology",
      },
    ],
    []
  );

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  }, [carouselImages.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  }, [carouselImages.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const modules = useMemo(
    () => [
      {
        icon: Scissors,
        title: "Laser Cutting Module",
        image:
          'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/laser-gurukul/laser_tech_laser_cutting.jpg',
        duration: "12 Weeks",
        level: "Beginner to Advanced",
        description:
          "Master the complete spectrum of laser cutting technology from fundamentals to advanced industrial applications.",
        points: [
          "Learn the fundamentals of laser cutting technology and physics",
          "Understand different types of laser cutting machines and their applications",
          "Hands-on training on operating and maintaining laser cutters",
          "Unlock advanced techniques for precision cutting and material optimization",
        ],
      },
      {
        icon: Zap,
        title: "Laser Welding Module",
        image:
          'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/laser-gurukul/laser_tech_gurukul_welding.jpg',
        duration: "10 Weeks",
        level: "Intermediate to Advanced",
        description:
          "Dive deep into laser welding principles and master techniques used across automotive, aerospace, and manufacturing industries.",
        points: [
          "Explore the principles of laser welding and its significance in various industries",
          "Master the art of laser welding for different materials and thicknesses",
          "Gain insights into quality control and troubleshooting during the welding process",
          "Enhance your skills with practical projects and real-world applications",
        ],
      },
      {
        icon: Tag,
        title: "Laser Marking Module",
        image:
          'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/laser-gurukul/laser_tech_laser_marking.jpg',
        duration: "8 Weeks",
        level: "Beginner to Intermediate",
        description:
          "Learn to create permanent, high-quality marks on diverse materials with precision and clarity using advanced laser systems.",
        points: [
          "Get introduced to laser marking and its wide-ranging applications",
          "Learn about laser marking systems and their integration with different materials",
          "Develop expertise in creating permanent marks with precision and clarity",
          "Dive into advanced marking techniques like annealing and coloration",
        ],
      },
    ],
    []
  );

  const navigate = useNavigate();

  const moduleNames = useMemo(() => modules.map((m) => m.title), [modules]);

  const features = useMemo(
    () => [
      {
        icon: Users,
        title: "Industry Experts as Instructors",
        description:
          "Our courses are crafted and delivered by seasoned professionals with many years of experience in the laser industry. They bring practical insights and real-world scenarios to the classroom and accelerate your learnings.",
      },
      {
        icon: Laptop,
        title: "Hands-on Learning",
        description:
          "We believe in learning by doing. With our in-house machine facility you can have hands-on sessions to ensure you gain confidence in operating laser machines effectively.",
      },
      {
        icon: Building2,
        title: "Cutting-edge Infrastructure",
        description:
          "Laser Gurukul boasts state-of-the-art facilities and the latest laser technology to provide an immersive learning experience.",
      },
      {
        icon: Briefcase,
        title: "Job Placement Assistance",
        description:
          "We assist our students in securing rewarding careers by connecting them with our extensive network of industry partners.",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Header */}
      <header className="relative mt-16 md:mt-20  overflow-hidden"
        style={{ backgroundImage: `url(${logo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center space-y-6">
            <div className="inline-flex rounded-full items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20">
              <BookOpen className="text-white" size={20} />
              <span className="text-white  text-sm font-medium tracking-wide">
                KNOWLEDGE CENTER
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-tight">
              Laser Gurukul
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Transform Your Career with World-Class Laser Technology Training
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            </div>
          </div>
        </div>
      </header>

      {/* Introduction Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gray-50">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-gray-50 to-transparent"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-whiteBgButtonBg blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 blur-[120px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="intro-content"
            data-animate
            className={`text-center max-w-5xl mx-auto transition-all duration-1000 ${
              isVisible["intro-content"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20"
            }`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-whiteBgText mb-8 leading-tight">
              Nurturing Minds, Shaping Futures:
              <br />
              <div className="pb-4"></div>
              <span className="text-whiteBgButtonBg">Welcome to Gurukul!</span>
            </h2>

            <div className="w-24 h-1 bg-whiteBgButtonBg mx-auto mb-10"></div>

            <p className="text-lg md:text-xl text-whiteBgText/80 leading-relaxed mb-12">
              We at Laser Gurukul are passionate about empowering industry
              enthusiasts and students in building successful careers in
              Operations, Maintenance and any service associated with
              functionality of Laser Machines. Our platform offers comprehensive
              modules that provide in-depth knowledge of Laser Cutting, Laser
              Welding, and Laser Marking. Whether you are a beginner or seeking
              advanced knowledge, our courses are designed to cater to all
              levels of expertise.
            </p>

            <button
              onClick={() => {
                setInitialModule("");
                setShowRegForm(true);
              }}
              className="px-10 py-5 bg-whiteBgButtonBg text-whiteBgButtonText font-bold text-lg hover:bg-whiteBgTextHover transition-all duration-300 transform hover:scale-105"
            >
              REGISTER NOW
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-12 pb-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-whiteBgText mb-6">
              Why Choose{" "}
              <span className="text-whiteBgButtonBg">Laser Gurukul?</span>
            </h2>
            <div className="w-24 h-1 bg-whiteBgButtonBg mx-auto mb-6"></div>
            <p className="text-xl text-whiteBgText/70 max-w-3xl mx-auto">
              Experience the difference with our world-class training approach
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                id={`feature-${index}`}
                data-animate
                className={`group bg-white p-8 md:p-10 border-l-4 border-whiteBgButtonBg shadow-lg hover:shadow-2xl transition-all duration-500 ${
                  isVisible[`feature-${index}`]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-start gap-6">
                  <div className="p-5 bg-gradient-to-br from-whiteBgButtonBg to-whiteBgTextHover flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="text-white" size={40} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-whiteBgText mb-4">
                      {feature.title}
                    </h3>

                    <p className="text-whiteBgText/80 text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 pt-10 md:pb-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-whiteBgText mb-6">
              Our Laser Modules
            </h2>
            <div className="w-24 h-1 bg-whiteBgButtonBg mx-auto mb-6"></div>
            <p className="text-xl text-whiteBgText/70 max-w-3xl mx-auto">
              Comprehensive training programs designed by industry experts
            </p>
          </div>

          <div className="space-y-24 md:space-y-32">
            {modules.map((module, index) => (
              <div
                key={index}
                id={`module-${index}`}
                data-animate
                className={`grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center transition-all duration-1000 ${
                  isVisible[`module-${index}`]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-20"
                }`}
              >
                {/* Image - Left for odd, Right for even */}
                <div
                  className={`relative ${
                    index % 2 === 0 ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-whiteBgButtonBg/20 to-transparent transform translate-x-4 translate-y-4 -z-10"></div>
                  <img
                    src={module.image}
                    alt={`${module.title} training facility`}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover shadow-2xl"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <div className="flex items-center gap-3 text-white">
                      {React.createElement(module.icon, {
                        className: "text-whiteBgButtonBg",
                        size: 32,
                      })}
                      <div>
                        <div className="text-sm opacity-80">
                          {module.duration}
                        </div>
                        <div className="text-sm opacity-80">{module.level}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content - Right for odd, Left for even */}
                <div
                  className={`space-y-6 ${
                    index % 2 === 0 ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-whiteBgButtonBg/10 border-l-4 border-whiteBgButtonBg">
                      {React.createElement(module.icon, {
                        className: "text-whiteBgButtonBg",
                        size: 48,
                      })}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-whiteBgText">
                      {module.title}
                    </h3>
                  </div>

                  <p className="text-lg md:text-xl text-whiteBgText/80 leading-relaxed border-l-4 border-whiteBgButtonBg pl-6">
                    {module.description}
                  </p>

                  <ul className="space-y-4 pt-4">
                    {module.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-4 group">
                        <CheckCircle
                          className="text-whiteBgButtonBg flex-shrink-0 mt-1 group-hover:scale-110 transition-transform"
                          size={24}
                        />
                        <span className="text-whiteBgText/80 text-base md:text-lg leading-relaxed">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => {
                      setInitialModule(module.title);
                      setShowRegForm(true);
                    }}
                    className="mt-8 px-8 py-4 bg-whiteBgButtonBg text-white font-semibold hover:bg-whiteBgTextHover transition-all duration-300 inline-flex items-center gap-2 border-2 border-whiteBgButtonBg hover:border-whiteBgTextHover"
                  >
                    <span>Enroll in This Module</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section
        className="relative h-[400px] md:h-[600px] bg-gray-50 overflow-hidden"
        aria-label="Training facility showcase"
      >
        <div className="relative h-full">
          {carouselImages.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img
                src={slide.url}
                alt={slide.alt}
                loading="lazy"
                draggable={false}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute rounded-full left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-4 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeft className="text-white" size={28} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 rounded-full md:right-8 top-1/2 -translate-y-1/2 z-30 p-4 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
          aria-label="Next slide"
        >
          <ChevronRight className="text-white" size={28} />
        </button>

        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3"
          role="tablist"
        >
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 transition-all duration-300 ${
                index === currentSlide ? "bg-white w-12" : "bg-white/40 w-8"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              role="tab"
              aria-selected={index === currentSlide}
            />
          ))}
        </div>
      </section>

      {/* Registration modal */}
      {showRegForm && (
        <GururkulFormModal
          modules={moduleNames}
          initialModule={initialModule}
          onClose={() => setShowRegForm(false)}
        />
      )}
    </div>
  );
};

export default LaserGurukul;