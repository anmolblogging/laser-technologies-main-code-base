import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// React Icons
import {
  FaCarSide,
  FaFighterJet,
  FaIndustry,
  FaBolt,
  FaSnowflake,
  FaCouch,
  FaBuilding,
  FaTrain,
  FaOilCan,
  FaStethoscope,
  FaTractor,
  FaUtensils,
  FaBullhorn,
  FaBicycle,
  FaShip,
  FaCogs,
  FaMountain,
  FaHamburger,
  FaMicrochip,
} from "react-icons/fa";

// MAIN BG
const logo =
  "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/dark_BACKGROUND.jpg";

// BACKGROUND IMAGES (Hover-only)
const automotiveAndAutoComponents =
  "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/new-icons-updated-11/12/205/Body%20parts.jpg";

const aerospaceAndDefense =
  "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/new-icons-updated-11/12/205/Aircraft%20components.jpg";

const fabricationAndSheetMetalIndustries =
  "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/new-icons-updated-11/12/205/Contract%20manufacturers.jpg";

const electricalAndElectronics =
  "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/new-icons-updated-11/12/205/Enclosures.jpg";

const hvacAndRefrigeration =
  "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/new-icons-updated-11/12/205/Cooling_heating%20units.jpg";

const furnitureAndInteriorSolutions =
  "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/new-icons-updated-11/12/205/Metal%20furnishings.jpg";

const metalBuildingInfrastructureAndConstruction =
  "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/new-icons-updated-11/12/205/Metal%20doors,%20railings,%20facades.jpg";

const railwaysAndMetro =
  "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/new-icons-updated-11/12/205/Seating%20structures.jpg";

const oilGasEnergyPower =
  "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/new-icons-updated-11/12/205/Pressure%20vessels.jpg";

const medicalAndHealthcareEquipment =
  "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/new-icons-updated-11/12/205/Hospital%20furniture.jpg";

const agricultureEquipmentAndMachinery =
  "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/new-icons-updated-11/12/205/Implements.jpg";

const kitchenEquipmentAndHomeAppliances =
  "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/new-icons-updated-11/12/205/Chimneys,%20cooktops.jpg";

const signageAndAdvertising =
  "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/new-icons-updated-11/12/205/LED%20signboards.jpg";

const bicycleTwoWheelerAndEMobility =
  "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/new-icons-updated-11/12/205/Tubes%20&%20chassis%20parts.jpg";

const marineAndShipbuilding =
  "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/new-icons-updated-11/12/205/Engine%20room%20components.jpg";

const textileMachineryAndIndustrialEquipment =
  "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/new-icons-updated-11/12/205/Automation%20equipment%20parts.jpg";

const miningAndHeavyEarthmovingEquipment =
  "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/new-icons-updated-11/12/205/Buckets,%20blades.jpg";

const foodProcessingEquipment =
  "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/new-icons-updated-11/12/205/Conveyor%20systems.jpg";

const defenceElectronicsAndInstrumentation =
  "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/industry-solutions/new-icons-updated-11/12/205/Weapon%20system%20components.jpg";

// INDUSTRY DATA (ICONS = React Icons, BG = Hover image)
const industries = [
  { title: "Automotive & Auto Components", icon: <FaCarSide />, bgImage: automotiveAndAutoComponents },
  { title: "Aerospace & Defense", icon: <FaFighterJet />, bgImage: aerospaceAndDefense },
  { title: "Fabrication & Sheet Metal", icon: <FaIndustry />, bgImage: fabricationAndSheetMetalIndustries },
  { title: "Electrical & Electronics", icon: <FaBolt />, bgImage: electricalAndElectronics },
  { title: "HVAC & Refrigeration", icon: <FaSnowflake />, bgImage: hvacAndRefrigeration },
  { title: "Furniture & Interior Solutions", icon: <FaCouch />, bgImage: furnitureAndInteriorSolutions },
  { title: "Metal Building & Construction", icon: <FaBuilding />, bgImage: metalBuildingInfrastructureAndConstruction },
  { title: "Railways & Metro", icon: <FaTrain />, bgImage: railwaysAndMetro },
  { title: "Oil / Gas / Power / Energy", icon: <FaOilCan />, bgImage: oilGasEnergyPower },
  { title: "Medical & Healthcare", icon: <FaStethoscope />, bgImage: medicalAndHealthcareEquipment },
  { title: "Agriculture Machinery", icon: <FaTractor />, bgImage: agricultureEquipmentAndMachinery },
  { title: "Kitchen & Home Appliances", icon: <FaUtensils />, bgImage: kitchenEquipmentAndHomeAppliances },
  { title: "Signage & Advertising", icon: <FaBullhorn />, bgImage: signageAndAdvertising },
  { title: "Two-Wheeler & E-Mobility", icon: <FaBicycle />, bgImage: bicycleTwoWheelerAndEMobility },
  { title: "Marine & Shipbuilding", icon: <FaShip />, bgImage: marineAndShipbuilding },
  { title: "Textile Machinery", icon: <FaCogs />, bgImage: textileMachineryAndIndustrialEquipment },
  { title: "Mining & Heavy Earthmoving", icon: <FaMountain />, bgImage: miningAndHeavyEarthmovingEquipment },
  { title: "Food Processing Equipment", icon: <FaHamburger />, bgImage: foodProcessingEquipment },
  { title: "Defence Electronics", icon: <FaMicrochip />, bgImage: defenceElectronicsAndInstrumentation },
];

export default function IndustryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    const updateItemsPerView = () => {
      setItemsPerView(window.innerWidth >= 1024 ? 3 : 1);
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, industries.length - itemsPerView);
  const cardWidthPercent = 100 / itemsPerView;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [maxIndex]);

  const nextSlide = () => setCurrentIndex((p) => (p >= maxIndex ? 0 : p + 1));
  const prevSlide = () => setCurrentIndex((p) => (p <= 0 ? maxIndex : p - 1));

  return (
    <section
      className="py-12 lg:py-16 my-16 relative overflow-hidden"
      style={{
        backgroundImage: `url(${logo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-primary font-medium pt-10 text-white">
            Industry Solutions
          </h2>
          <p className="text-lg text-white/50 max-w-3xl mx-auto">
            Tailor-made solutions for different industries and application scenarios
          </p>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden mb-8">
          <div
            className="flex gap-0 lg:gap-6"
            style={{
              transform: `translateX(-${currentIndex * cardWidthPercent}%)`,
              transition: "transform 700ms cubic-bezier(0.25,0.1,0.25,1)",
            }}
          >
            {industries.map((industry, index) => (
              <div
                key={index}
                className="group relative flex-shrink-0 border border-white/20 cursor-pointer overflow-hidden"
                style={{
                  width: `calc(${cardWidthPercent}% - ${itemsPerView > 1 ? 6 : 0}px)`,
                  height: "18rem",
                }}
              >
                {/* Hover Background */}
                <img
                  src={industry.bgImage}
                  alt={`${industry.title} background`}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="300" 
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-[#ff1a1a] bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />


                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
                  <div className="text-white text-5xl mb-4 transition-transform duration-500 group-hover:scale-110">
                    {industry.icon}
                  </div>
                  <h4 className="text-xl font-medium text-white">
                    {industry.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-4 sm:gap-6">
          <button
            onClick={prevSlide}
            className="bg-white/20 text-white p-3 rounded-full border border-white/30 hover:bg-white/30 transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="hidden sm:flex gap-2 mb-10">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentIndex
                    ? "bg-white w-8"
                    : "bg-white/30 w-6"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="bg-white/20 text-white p-3 rounded-full border border-white/30 hover:bg-white/30 transition"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
