// blog.tsx
import React, { useState } from "react";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
}

const blogs: BlogPost[] = [
  {
    id: 1,
    title: "Mastering React in 2025",
    description:
      "Learn modern React patterns, hooks, and best practices for building scalable apps.",
    image:
      "https://images.unsplash.com/photo-1759224005115-cc3c38202a9d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
    date: "Oct 7, 2025",
  },
  {
    id: 2,
    title: "TailwindCSS for Professionals",
    description:
      "Create stunning and responsive UIs quickly using TailwindCSS in React projects. Make your designs scalable and professional with best practices.",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
    date: "Oct 5, 2025",
  },
  {
    id: 3,
    title: "TypeScript Deep Dive",
    description:
      "Write safer, scalable TypeScript code with advanced tips and best practices for modern web apps.",
    image:
      "https://images.unsplash.com/photo-1759520054142-c723a30f7716?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
    date: "Oct 1, 2025",
  },
  {
    id: 4,
    title: "Next.js 2025 Update",
    description:
      "Discover the latest features and improvements in Next.js for high-performance apps.",
    image:
      "https://images.unsplash.com/photo-1743764179699-d3038d1a93e7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
    date: "Sep 28, 2025",
  },
  {
    id: 5,
    title: "Advanced Tailwind Techniques",
    description:
      "Enhance your UI designs with advanced TailwindCSS tricks and patterns for modern responsive design.",
    image:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80",
    date: "Sep 25, 2025",
  },
];

const Blog: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cardsPerFrame = window.innerWidth >= 768 ? 3 : 1;

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

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 px-4 md:px-8 lg:px-16 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Our Latest Insights
        </h2>

        <div className="relative overflow-hidden">
          {/* Carousel Slides */}
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${(100 / cardsPerFrame) * currentIndex}%)`,
            }}
          >
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className={`flex-shrink-0 w-full md:w-1/3 px-4`}
              >
                <div className="bg-white dark:bg-black rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 h-full flex flex-col">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    loading="lazy"
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-sm text-gray-400 dark:text-gray-300">
                      {blog.date}
                    </p>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white  mt-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-3 line-clamp-3 flex-1">
                      {blog.description}
                    </p>
                    <button className="mt-5 px-5 py-3 bg-white text-black font-semibold rounded-lg hover:bg-red-700 transition-colors duration-300">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/70 text-white p-3 rounded-full hover:bg-red-700 transition"
          >
            &#10094;
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/70 text-white p-3 rounded-full hover:bg-red-700 transition"
          >
            &#10095;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
