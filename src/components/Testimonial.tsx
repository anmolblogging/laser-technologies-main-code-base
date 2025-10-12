import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  videoUrl: string;
  header: string;
  description: string;
}

const testimonialsData: Testimonial[] = [
  {
    videoUrl: "https://www.youtube.com/embed/zBtSQtSgc6s",
    header: "Success Story with the HSG G3015C Laser Cutting Machine",
    description:
      "Radhe Laser, a leading laser cutting service provider in Rajkot, upgraded to the HSG G3015C Laser Cutting Machine from Laser Technologies. With enhanced precision, speed, and efficiency, they now deliver top-quality metal-cutting solutions across various industries without compromise. This upgrade allowed them to expand capacity, serve more clients, and maintain superior quality standards at all times.",
  },
  {
    videoUrl: "https://www.youtube.com/embed/kqtebpOcFpo",
    header: "Mr Shripad Gaikwad's Journey with Laser Technologies",
    description:
      "Under CEO Shripad Gaikwad's leadership, Ashok Laser has thrived with Laser Technologies' custom solutions. Their precision laser cutting machines have enhanced efficiency and productivity, backed by exceptional service support that ensures seamless operations and drives substantial business growth in the competitive manufacturing industry.",
  },
  {
    videoUrl: "https://www.youtube.com/embed/xTBliB06QG4",
    header:
      "Laser Fab Engineers' Journey to Excellence with HSG Fiber Laser Machines",
    description:
      "Hello, my name is Shaheer Umrao Balashankar. I am the owner of Laser Fab Engineers, a business I have managed for over 12 years in Rabale. At Laser Fab Engineers, we specialize in laser cutting, fabrication, bending, and laser welding, offering top-notch services for a range of industries. Upgrading to HSG Fiber Laser Machines allowed us to improve precision, speed, and cost-efficiency for our clients.",
  },
];

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonialsData.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === testimonialsData.length - 1 ? 0 : prev + 1
    );
  };

  const goToSlide = (index: number) => setCurrentIndex(index);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-4xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Clients Love Us
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Real stories from businesses transformed by our precision laser
            systems.
          </p>
        </div>

        {/* Slider Wrapper */}
        <div className="relative max-w-7xl mx-auto">
          {/* Desktop Arrows - Outside */}
          <button
            onClick={prevSlide}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 rounded-full bg-white border-2 border-gray-200 text-gray-700 p-3 hover:border-red-600 hover:text-red-600 transition-all duration-200 z-10 shadow-sm"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 rounded-full bg-white border-2 border-gray-200 text-gray-700 p-3 hover:border-red-600 hover:text-red-600 transition-all duration-200 z-10 shadow-sm"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slider Content */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonialsData.map((testimonial, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-full"
                >
                  <div className="  shadow-sm overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-0">
                      {/* Video Section */}
                      <div className="relative w-full bg-gray-900 order-1 lg:order-1">
                        <div className="relative pt-[56.25%] lg:pt-0 lg:h-full lg:min-h-[400px]">
                          <iframe
                            className="absolute inset-0 w-full h-full"
                            src={testimonial.videoUrl}
                            title={testimonial.header}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12 order-2 lg:order-2 ">
                        <div className="space-y-6">
                          <div>
                            <div className="w-12 h-1 bg-red-600 mb-4"></div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                              {testimonial.header}
                            </h3>
                          </div>
                          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                            {testimonial.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Arrows - Below content */}
          <div className="flex lg:hidden justify-center gap-4 mt-6">
            <button
              onClick={prevSlide}
              className="bg-white border-2 border-gray-200 rounded-full text-gray-700 p-3 hover:border-red-600 hover:text-red-600 transition-all duration-200 shadow-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-white border-2 rounded-full border-gray-200 text-gray-700 p-3 hover:border-red-600 hover:text-red-600 transition-all duration-200 shadow-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonialsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`transition-all duration-300 ${
                currentIndex === idx
                  ? "w-8 h-2 bg-red-600"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}