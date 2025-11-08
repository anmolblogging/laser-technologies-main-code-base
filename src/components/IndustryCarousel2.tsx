import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
const logo = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/dark_BACKGROUND.jpg';

const AdvertisingBrandingIcon = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/icons/Advertising%20&%20Branding.png'
const AutomotiveLaserIcon = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/icons/Automotive%20Laser%20Applications.png'
const ChemicalIndustryIcon = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/icons/Chemical%20Industry%20Solutions.png' ;
const EducationSolutionsIcon = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/icons/Education%20Solutions.png'
const EntertainmentEventsIcon = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/icons/Entertainment%20&%20Events.png'
const EVChargingIcon = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/icons/EV%20Charging%20Solutions.png'
const HighRiseBuildingIcon = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/icons/High-rise%20Building%20Technologies.png'
const HospitalityInnovationsIcon = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/icons/Hospitality%20Innovations.png'
const IndustrialManufacturingIcon = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/icons/Industrial%20Manufacturing.png'
const LaboratoryResearchIcon = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/icons/Laboratory%20Research.png'
const MarineOffshoreIcon = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/icons/Marine%20&%20Offshore%20Applications.png' ;
const SmartCityIcon = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/icons/Smart%20City%20Infrastructure.png'

const AdvertisingBrandingBg = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/icons-bg-image/Advertising%20&%20Branding.webp'
const AutomotiveLaserBg = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/icons-bg-image/Automotive%20Laser%20Applications.jpeg'
const ChemicalIndustryBg = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/icons-bg-image/Chemical%20Industry%20Solutions.webp'
const EducationSolutionsBg = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/icons-bg-image/Education%20Solutions.avif'
const EntertainmentEventsBg = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/icons-bg-image/Entertainment%20&%20Events.jpeg'
const EVChargingBg = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/icons-bg-image/EV%20Charging%20Solutions.jpeg'
const HighRiseBuildingBg = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/icons-bg-image/High-rise%20Building%20Technologies.jpg'
const HospitalityInnovationsBg = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/icons-bg-image/Hospitality%20Innovations.jpeg'
const IndustrialManufacturingBg = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/icons-bg-image/Industrial%20Manufacturing.jpg'
const LaboratoryResearchBg = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/icons-bg-image/Laboratory%20Research.jpg'
const MarineOffshoreBg = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/icons-bg-image/Marine%20&%20Offshore%20Applications.jpg'
const SmartCityBg  = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/icons-bg-image/Smart%20City%20Infrastructure.jpg'
const industries = [
  {
    title: "Advertising & Branding",
    icon: (
      <img
        src={AdvertisingBrandingIcon}
        alt="Advertising & Branding"
        className="w-16 h-16"
      />
    ),
    bgImage: AdvertisingBrandingBg,
  },
  {
    title: "Automotive Laser Applications",
    icon: (
      <img
        src={AutomotiveLaserIcon}
        alt="Automotive Laser Applications"
        className="w-16 h-16"
      />
    ),
    bgImage: AutomotiveLaserBg,
  },
  {
    title: "Chemical Industry Solutions",
    icon: (
      <img
        src={ChemicalIndustryIcon}
        alt="Chemical Industry Solutions"
        className="w-16 h-16"
      />
    ),
    bgImage: ChemicalIndustryBg,
  },
  {
    title: "Education Solutions",
    icon: (
      <img
        src={EducationSolutionsIcon}
        alt="Education Solutions"
        className="w-16 h-16"
      />
    ),
    bgImage: EducationSolutionsBg,
  },
  {
    title: "Entertainment & Events",
    icon: (
      <img
        src={EntertainmentEventsIcon}
        alt="Entertainment & Events"
        className="w-16 h-16"
      />
    ),
    bgImage: EntertainmentEventsBg,
  },
  {
    title: "EV Charging Solutions",
    icon: (
      <img
        src={EVChargingIcon}
        alt="EV Charging Solutions"
        className="w-16 h-16"
      />
    ),
    bgImage: EVChargingBg,
  },
  {
    title: "High-rise Building Technologies",
    icon: (
      <img
        src={HighRiseBuildingIcon}
        alt="High-rise Building Technologies"
        className="w-16 h-16"
      />
    ),
    bgImage: HighRiseBuildingBg,
  },
  {
    title: "Hospitality Innovations",
    icon: (
      <img
        src={HospitalityInnovationsIcon}
        alt="Hospitality Innovations"
        className="w-16 h-16"
      />
    ),
    bgImage: HospitalityInnovationsBg,
  },
  {
    title: "Industrial Manufacturing",
    icon: (
      <img
        src={IndustrialManufacturingIcon}
        alt="Industrial Manufacturing"
        className="w-16 h-16"
      />
    ),
    bgImage: IndustrialManufacturingBg,
  },
  {
    title: "Laboratory Research",
    icon: (
      <img
        src={LaboratoryResearchIcon}
        alt="Laboratory Research"
        className="w-16 h-16"
      />
    ),
    bgImage: LaboratoryResearchBg,
  },
  {
    title: "Marine & Offshore Applications",
    icon: (
      <img
        src={MarineOffshoreIcon}
        alt="Marine & Offshore Applications"
        className="w-16 h-16"
      />
    ),
    bgImage: MarineOffshoreBg,
  },
  {
    title: "Smart City Infrastructure",
    icon: (
      <img
        src={SmartCityIcon}
        alt="Smart City Infrastructure"
        className="w-16 h-16"
      />
    ),
    bgImage: SmartCityBg,
  },
];

export default function IndustryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(1);
      }
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, industries.length - itemsPerView);
  const cardWidthPercent = 100 / itemsPerView;

  // Auto slide
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(intervalId);
  }, [maxIndex]);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));

  return (
    <section className="py-12 lg:py-16 my-16   relative overflow-hidden" style={{ backgroundImage: `url(${logo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-primary font-medium pt-10 text-darkBgText mb-4">
            Industry Solutions
          </h2>
          <p className="text-base sm:text-lg text-darkBgText text-opacity-50 max-w-3xl mx-auto font-secondary">
            Tailor-made solutions for different industries and application
            scenarios
          </p>
        </div>

        <div className="overflow-hidden mb-8">
          <div
            className={`flex will-change-transform gap-0 lg:gap-6`} // gap 0 on mobile, gap 6 (1.5rem) on desktop and above
            style={{
              transform: `translateX(-${currentIndex * cardWidthPercent}%)`,
              transition: "transform 700ms cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}
          >
            {industries.map((industry, idx) => (
              <div
                key={idx}
                className="group relative flex-shrink-0 cursor-pointer border border-whiteBgButtonBg overflow-hidden"
                style={{
                  width: `calc(${cardWidthPercent}% - ${
                    itemsPerView > 1 ? 6 : 0
                  }px)`,
                  height: "18rem",
                }}
              >
                {/* Background image overlay */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundImage: `url(${industry.bgImage})` }}
                />
                <div className="absolute inset-0 bg-whiteBgButtonBg bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center transition-colors duration-500 group-hover:text-whiteBgTextHover">
                  <div className="transition-transform duration-500 transform group-hover:scale-110">
                    <div className="mb-6 flex justify-center">
                      {industry.icon}
                    </div>
                    <h4 className="text-lg sm:text-xl text-darkBgText font-medium font-primary leading-tight">
                      {industry.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={prevSlide}
            className="bg-whiteBgButtonBg text-whiteBgButtonText p-2 mb-10 sm:p-3 border border-whiteBgButtonBg shadow-sm rounded-full"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="hidden sm:flex items-center justify-center gap-1.5 sm:gap-2 mb-10">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "bg-whiteBgButtonBg w-8 h-1.5"
                    : "bg-darkBgButtonBg w-6 h-1.5"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="bg-whiteBgButtonBg text-whiteBgButtonText p-2 sm:p-3 border mb-10 border-whiteBgButtonBg shadow-sm rounded-full"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
