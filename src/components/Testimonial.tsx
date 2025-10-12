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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our Clients Love Us
          </h2>
          <p className="text-lg text-gray-600">
            Real stories from businesses transformed by our precision laser
            systems.
          </p>
        </div>

        {/* Slider Wrapper with Arrows Outside */}
        <div className="flex items-center justify-center gap-4">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="flex-shrink-0 bg-black/70 text-white p-3 rounded-full hover:bg-red-700 transition"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Slider Content */}
          <div className="overflow-hidden w-full">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonialsData.map((testimonial, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-full lg:flex lg:flex-row flex-col items-stretch gap-6 overflow-hidden p-6 lg:p-8 transform transition-transform hover:-translate-y-1"
                >
                  {/* Video */}
                  <div className="lg:flex-1 relative w-full h-64 lg:h-auto lg:min-h-[350px] bg-gray-100 overflow-hidden">
                    <iframe
                      className="absolute inset-0 w-full h-full object-cover"
                      src={testimonial.videoUrl}
                      title={testimonial.header}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  {/* Content */}
                  <div className="lg:flex-1 flex flex-col justify-center p-2 pl-6 md:mt-0 mt-10">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 relative after:block after:w-12 after:h-1 after:bg-red-600 after:rounded mt-2">
                      {testimonial.header}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {testimonial.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="flex-shrink-0 bg-black/70 text-white p-3 rounded-full hover:bg-red-700 transition"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-6">
          {testimonialsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? "bg-red-600 w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
