import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { supabase } from "../lib/supabase";

const PAGE_SIZE = 3;

interface BlogPost {
  id: string;
  title: string | null;
  summary: string | null;
  image: string | null;
  content: Record<string, string> | null;
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
  const [loadedCount, setLoadedCount] = useState(PAGE_SIZE);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("blog_posts")
        .select(
          `id, title, summary, image, content, author, designation, author_image, read_time, category, tags, created_at, updated_at`
        )
        .order("created_at", { ascending: false })
        .limit(loadedCount);

      if (error) {
        console.error("Error fetching blogs:", error);
      } else {
        setBlogs((data as BlogPost[]) || []);
      }
      setLoading(false);
    };
    fetchBlogs();
  }, [loadedCount]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setCardsPerFrame(3);
      else if (window.innerWidth >= 768) setCardsPerFrame(2);
      else setCardsPerFrame(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? blogs.length - cardsPerFrame : prev - 1
    );
  };

  const nextSlide = () => {
    if (currentIndex >= blogs.length - cardsPerFrame) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prev) => prev + 1);
      if (currentIndex + cardsPerFrame >= loadedCount) {
        setLoadedCount((prev) => prev + PAGE_SIZE);
      }
    }
  };

  const handleBlogClick = (blogId: string) => {
    navigate(`/blog/${blogId}`);
  };

  if (loading) {
    return <Loading text="blog" />;
  }

  return (
    <section className="bg-gray-50 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-whiteBgText mb-4 font-primary">
            Our Latest Insights
          </h2>
          <p className="text-base sm:text-lg text-whiteBgText text-opacity-70 max-w-2xl mx-auto font-secondary">
            Stay updated with the latest trends, tips, and innovations in laser technology
          </p>
        </div>

        {/* Carousel Wrapper */}
        <div className="relative">
          {/* Desktop Navigation */}
          <button
            onClick={prevSlide}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 bg-whiteBgButtonBg border-2 border-whiteBgButtonBg text-whiteBgButtonText p-4 rounded-full transition-transform duration-200 z-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-whiteBgButtonBg hover:scale-110"
            aria-label="Previous blogs"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 bg-whiteBgButtonBg border-2 border-whiteBgButtonBg text-whiteBgButtonText p-4 rounded-full transition-transform duration-200 z-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-whiteBgButtonBg hover:scale-110"
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
                        className="text-xl sm:text-2xl font-medium text-whiteBgText mb-1 group-hover:text-whiteBgTextHover transition-colors duration-200 cursor-pointer"
                        onClick={() => handleBlogClick(blog.id)}
                      >
                        {blog.title || "Untitled Blog"}
                      </h3>
                      {blog.category && (
                        <p className="text-sm pt-2 text-whiteBgText opacity-70 mb-3 font-semibold font-primary">
                          {blog.category}
                        </p>
                      )}
                      <p className="text-whiteBgText text-sm sm:text-base leading-relaxed flex-1 line-clamp-3">
                        {blog.summary || "No description available."}
                      </p>
                      <button
                        onClick={() => handleBlogClick(blog.id)}
                        className="mt-5 w-full py-3 text-darkBgText hover:text-opacity-90  hover:text-darkBgText text-opacity-90 font-semibold bg-whiteBgButtonBg hover:bg-whiteBgButtonBg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-whiteBgButtonBg focus:ring-offset-2 flex items-center justify-center gap-2"
                      >
                        Read More
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
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
              className="bg-whiteBgButtonBg border-2 border-whiteBgButtonBg text-whiteBgButtonText p-4 rounded-full transition-transform duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-whiteBgButtonBg hover:scale-110"
              aria-label="Previous blogs"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-whiteBgButtonBg border-2 border-whiteBgButtonBg text-whiteBgButtonText p-4 rounded-full transition-transform duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-whiteBgButtonBg hover:scale-110"
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
