import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../lib/supabase";

const BRAND = {
  primary: '#6b0f0f',
  hover: '#4f0b0b',
  light: '#fef2f2',
  border: 'rgba(107,15,15,0.15)',
};

interface BlogPost {
  id: string; // uuid string
  title: string | null;
  summary: string | null;
  image: string | null;
  content: Record<string, string> | null; // JSONB parsed as object with {header: paragraph}
  author: string | null;
  designation: string | null;
  author_image: string | null;
  read_time: string | null;
  category: string | null;
  tags: string[] | null;
  created_at: string | null;
  updated_at: string | null;
}

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerFrame, setCardsPerFrame] = useState(
    typeof window !== "undefined"
      ? window.innerWidth >= 1024
        ? 3
        : window.innerWidth >= 768
        ? 2
        : 1
      : 3
  );

  const navigate = useNavigate();

  // Fetch blogs from Supabase
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("blog_posts")
        .select(
          `id, title, summary, image, content, author, designation, author_image, read_time, category, tags, created_at, updated_at`
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching blogs:", error);
      } else {
        // supabase gives string[] for tags, content as json string parsed automatically, safe to cast as object
        setBlogs((data as BlogPost[]) || []);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

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

  const handleBlogClick = (blogId: string) => {
    navigate(`/blog/${blogId}`);
  };

  if (loading) {
    return (
      <section className="py-20 text-center text-gray-500">
        Loading blogs...
      </section>
    );
  }

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
          {/* Desktop Navigation */}
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

          {/* Slides */}
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
                  className={`flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-3 sm:px-4`}
                >
                  <article className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col group overflow-hidden">
                    <div
                      className="relative overflow-hidden cursor-pointer"
                      onClick={() => handleBlogClick(blog.id)}
                    >
                      <img
                        src={blog.image || "https://via.placeholder.com/600x400?text=No+Image"}
                        alt={blog.title || "Blog image"}
                        loading="lazy"
                        className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-5 sm:p-6 flex-1 flex flex-col">
                      <h3
                        className="text-xl sm:text-2xl font-medium text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-200 cursor-pointer"
                        onClick={() => handleBlogClick(blog.id)}
                      >
                        {blog.title || "Untitled Blog"}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed flex-1 line-clamp-3">
                        {blog.summary || "No description available."}
                      </p>
                      <button
                        onClick={() => handleBlogClick(blog.id)}
                        className="mt-5 w-full py-3  text-white font-medium hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" style={{backgroundColor : BRAND.primary}}
                      >
                        Read More
                      </button>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Nav */}
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
