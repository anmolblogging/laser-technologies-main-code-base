import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";

interface TestimonialStory {
  id: string;
  title: string;
  summary: string;
  video_url: string;
  slug: string;
}

export default function TestimonialSlider() {
  const [stories, setStories] = useState<TestimonialStory[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from("customer_stories")
          .select("id, title, summary, video_url, slug")
          .not("video_url", "is", null) // Filter where video_url is NOT null
          .neq("video_url", "")       // Also ensure it's not empty string
          .order("created_at", { ascending: true })
          .limit(6); // Pagination limit as requested

        if (error) throw error;
        
        if (data) {
          setStories(data);
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? stories.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === stories.length - 1 ? 0 : prev + 1
    );
  };

  const goToSlide = (index: number) => setCurrentIndex(index);

  if (loading) {
     return (
        <section className="py-20 bg-gray-50 flex justify-center">
           <Loader2 className="w-8 h-8 animate-spin text-red-600" />
        </section>
     );
  }

  if (stories.length === 0) return null;

  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-whiteBgText mb-4 font-primary">
            Our Clients Love Us
          </h2>
          <p className="text-base sm:text-lg text-whiteBgText text-opacity-70">
            Real stories from businesses transformed by our precision laser
            systems.
          </p>
        </div>

        {/* Slider Wrapper */}
        <div className="relative max-w-7xl mx-auto">
          {/* Desktop Arrows - Outside */}
          <button
            onClick={prevSlide}
            className="rounded-full hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white hover:bg-white border border-gray-200  hover:text-black shadow-lg p-2 z-30 text-black transition-transform"
            aria-label="Previous testimonial"
            style={{ marginLeft: "-60px" }}
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 transition-transform duration-300 hover:translate-x-1" />
          </button>

          <button
            onClick={nextSlide}
            className="rounded-full hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white hover:bg-white border border-gray-200  hover:text-black shadow-lg p-2 z-30 text-black transition-transform"
            aria-label="Next testimonial"
            style={{ marginRight: "-60px" }}
          >
            <ChevronRight className="w-6 h-6 text-gray-700 transition-transform duration-300 hover:translate-x-1" />
          </button>

          {/* Slider Content */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {stories.map((story) => (
                <div key={story.id} className="flex-shrink-0 w-full">
                  <div className="shadow-sm overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-0">
                      {/* Video Section */}
                      <div className="relative w-full bg-gray-900 order-1 lg:order-1">
                        <div className="relative pt-[56.25%] lg:pt-0 lg:h-full lg:min-h-[400px]">
                          <iframe
                            className="absolute inset-0 w-full h-full"
                            src={story.video_url}
                            title={story.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="flex flex-col justify-center pt-8 p-2 md:p-10 lg:p-12 md:pt-0 lg:pt-0 order-2 lg:order-2">
                        <div className="space-y-6">
                          <div>
                            <div className="w-12 h-1 bg-whiteBgButtonBg mb-4"></div>
                            <h3 className="text-xl sm:text-2xl font-semibold text-whiteBgText leading-tight">
                              {story.title}
                            </h3>
                          </div>
                          <p className="text-whiteBgText leading-relaxed text-sm sm:text-base line-clamp-4">
                            {story.summary}
                          </p>
                          
                          <Link 
                            to={`/customer-stories/${story.slug}`}
                            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-red-600 hover:text-red-700 transition-colors"
                          >
                            Read Full Story
                            <ArrowRight className="w-4 h-4" />
                          </Link>
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
              className="bg-whiteBgButtonBg border-2 border-whiteBgButtonBg rounded-full text-whiteBgButtonText p-3 transition-transform duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-whiteBgButtonBg hover:scale-110"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-whiteBgButtonBg border-2 border-whiteBgButtonBg rounded-full text-whiteBgButtonText p-3 transition-transform duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-whiteBgButtonBg hover:scale-110"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8 ">
          {stories.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === idx
                  ? "w-8 h-2 bg-whiteBgButtonBg"
                  : "w-2 h-2 bg-gray-300 hover:bg-darkBgTextHover"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
