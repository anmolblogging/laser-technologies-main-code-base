import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { supabase } from "../lib/supabase";

const PAGE_SIZE = 6;

interface BlogPost {
  id: string;
  title: string | null;
  image: string | null;
  category: string | null;
}

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
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

  // Fetch blogs by pagination using .range()
  const fetchBlogs = async () => {
    setLoading(true);
    const from = 0;
    const to = loadedCount - 1; // range is inclusive
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`id, title, image, category`)
      .order("created_at", { ascending: false })
      .range(from, to);

    setLoading(false);
    setIsLoadingMore(false);

    if (error) {
      console.error("Error fetching blogs:", error);
    } else {
      setBlogs(data || []);
    }
  };

  // Fetch when loadedCount changes (pagination)
  useEffect(() => {
    fetchBlogs();
  }, [loadedCount]);

  // Update cards per frame on resize
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

  // Slide navigation handlers
  const prevSlide = () => {
    if (isLoadingMore) return;
    setCurrentIndex((prev) =>
      prev === 0 ? blogs.length - cardsPerFrame : prev - 1
    );
  };

  const nextSlide = () => {
    if (isLoadingMore) return;

    // Check if near end of loaded blogs to preload next page
    if (currentIndex >= blogs.length - cardsPerFrame - 1) {
      if (blogs.length >= loadedCount && !isLoadingMore) {
        // Preload next batch
        setIsLoadingMore(true);
        setLoadedCount((prev) => prev + PAGE_SIZE);
      } else {
        // No more blogs, loop slider to start
        setCurrentIndex(0);
        return;
      }
    }

    setCurrentIndex((prev) => (prev + 1) % blogs.length);
  };

  const handleBlogClick = (blogId: string) => {
    navigate(`/blog/${blogId}`);
  };

  if (loading) {
    return <Loading text="blog" />;
  }

  return (
    <section className="bg-gray-50 py-12 sm:py-20 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl pt-10 font-medium text-whiteBgText mb-4 font-primary">
            Our Latest Insights
          </h2>
          <p className="text-base sm:text-lg text-whiteBgText text-opacity-70 max-w-2xl mx-auto font-secondary">
            Stay updated with the latest trends, tips, and innovations in laser
            technology
          </p>
        </div>

        {/* Carousel Wrapper */}
        <div className="relative">
          {/* Desktop Navigation */}
          <button
            onClick={prevSlide}
            className="rounded-full hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white hover:bg-white border border-gray-200  hover:text-black shadow-lg p-2 z-30 text-black transition-transform"
            aria-label="previous event"
            style={{ marginLeft: "-60px" }}
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 transition-transform duration-300 hover:translate-x-[-4px]" />
          </button>
          <button
            onClick={nextSlide}
            className="rounded-full hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white hover:bg-white border border-gray-200  hover:text-black shadow-lg p-2 z-30 text-black transition-transform"
            aria-label="Next blogs"
            style={{ marginRight: "-60px" }}
          >
            <ChevronRight className="w-6 h-6 text-gray-700 transition-transform duration-300 hover:translate-x-1" />
          </button>

          {/* Slides */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  (100 / cardsPerFrame) * currentIndex
                }%)`,
              }}
            >
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-3 sm:px-4"
                >
                  <article className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col group overflow-hidden">
                    <div
                      className="relative overflow-hidden cursor-pointer"
                      onClick={() => handleBlogClick(blog.id)}
                    >
                      <img
                        src={
                          blog.image ||
                          "https://via.placeholder.com/600x400?text=No+Image"
                        }
                        alt={blog.title || "Blog image"}
                        loading="lazy"
                        className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-5 sm:p-6 flex-1 flex flex-col">
                      <h3
                        className="text-xl sm:text-2xl font-medium text-whiteBgText mb-1 transition-colors duration-200 cursor-pointer line-clamp-3"
                        onClick={() => handleBlogClick(blog.id)}
                        title={blog.title || "Untitled Blog"} // optional full title tooltip
                      >
                        {blog.title || "Untitled Blog"}
                      </h3>
                      {blog.category && (
                        <p className="text-md py-2  text-whiteBgButtonBg opacity-70 mb-4 font-semibold font-primary">
                          {blog.category}
                        </p>
                      )}

                      <button
                        onClick={() => handleBlogClick(blog.id)}
                        className="mt-auto py-3 w-full text-[#060C2A] bg-opacity-20 bg-whiteBgButtonBg hover:bg-opacity-20 hover:bg-whiteBgButtonBg hover:text-[#060C2A] font-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-whiteBgButtonBg focus:ring-offset-2 flex items-center justify-center gap-2"
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
