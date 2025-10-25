import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;

}

const blogs: BlogPost[] = [
  {
    id: 1,
    title: "Mastering React in 2025",
    description:
      "Learn modern React patterns, hooks, and best practices for building scalable apps.",
    image:
      "https://images.unsplash.com/photo-1759224005115-cc3c38202a9d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",

  },
  {
    id: 2,
    title: "TailwindCSS for Professionals",
    description:
      "Create stunning and responsive UIs quickly using TailwindCSS in React projects. Make your designs scalable and professional with best practices.",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",

  },
  {
    id: 3,
    title: "TypeScript Deep Dive",
    description:
      "Write safer, scalable TypeScript code with advanced tips and best practices for modern web apps.",
    image:
      "https://images.unsplash.com/photo-1759520054142-c723a30f7716?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",

  },
  {
    id: 4,
    title: "Next.js 2025 Update",
    description:
      "Discover the latest features and improvements in Next.js for high-performance apps.",
    image:
      "https://images.unsplash.com/photo-1743764179699-d3038d1a93e7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",

  },
  {
    id: 5,
    title: "Advanced Tailwind Techniques",
    description:
      "Enhance your UI designs with advanced TailwindCSS tricks and patterns for modern responsive design.",
    image:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80",

  },
];

const Blog: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerFrame, setCardsPerFrame] = useState(
    typeof window !== 'undefined' 
      ? window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1
      : 3
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setCardsPerFrame(3);
      else if (window.innerWidth >= 768) setCardsPerFrame(2);
      else setCardsPerFrame(1);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? blogs.length - cardsPerFrame : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev >= blogs.length - cardsPerFrame ? 0 : prev + 1
    );
  };

  const totalSlides = Math.ceil(blogs.length / cardsPerFrame);
  const currentSlide = Math.floor(currentIndex / cardsPerFrame);

  return (
    <section className="bg-gray-50 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 mb-4">
            Our Latest Insights
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest trends, tips, and innovations in laser technology
          </p>
        </div>

        {/* Carousel Wrapper */}
        <div className="relative">
          {/* Desktop Navigation - Outside */}
          <button
            onClick={prevSlide}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 bg-white border-2 border-gray-200 text-gray-700 p-4 rounded-full hover:border-red-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 z-10 shadow-sm"
            aria-label="Previous blogs"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 bg-white border-2 border-gray-200 text-gray-700 p-4 rounded-full hover:border-red-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 z-10 shadow-sm"
            aria-label="Next blogs"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slides Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${(100 / cardsPerFrame) * currentIndex}%)`,
              }}
            >
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-3 sm:px-4"
                >
                  <article className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col group overflow-hidden">
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        loading="lazy"
                        className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col">
                      <h3 className="text-xl sm:text-2xl font-medium text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-200">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed flex-1 line-clamp-3">
                        {blog.description}
                      </p>
                      <button className="mt-5 w-full py-3 bg-red-600 text-white font-medium hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                        Read More
                      </button>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation - Below content */}
          <div className="flex lg:hidden justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="bg-white border-2 border-gray-200 text-gray-700 p-4 rounded-full hover:border-red-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 shadow-sm"
              aria-label="Previous blogs"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-white border-2 border-gray-200 text-gray-700 p-4 rounded-full hover:border-red-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 shadow-sm"
              aria-label="Next blogs"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>


      </div>
    </section>
  );
};

export default Blog;