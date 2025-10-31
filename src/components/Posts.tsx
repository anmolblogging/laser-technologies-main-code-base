import { useState, useEffect } from "react";
import { Search, Calendar, Clock, User, Tag, ChevronRight, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";
import Header from "../components/Navbar";
import Loading from "./Loading";

const POSTS_PER_PAGE = 9;

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  // Get category from URL path
  const getCurrentCategory = () => {
    const path = window.location.pathname;
    if (path.includes("/blog")) return "News & Media";
    if (path.includes("/csr")) return "CSR";
    if (path.includes("/article")) return "Article";
    if (path.includes("/knowledge")) return "Knowledge";
    if (path.includes("/laser-gurukul")) return "Laser Gurukul";
    return "All";
  };

  const currentCategory = getCurrentCategory();

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, searchQuery, selectedTag]);

  useEffect(() => {
    updateDisplayedPosts();
  }, [filteredPosts, currentPage]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (currentCategory !== "All") {
        query = query.eq("category", currentCategory);
      }

      const { data, error } = await query;

      if (error) throw error;

      setPosts(data || []);
      
      // Extract unique tags
      const tagsSet = new Set();
      data?.forEach(post => {
        post.tags?.forEach(tag => tagsSet.add(tag));
      });
      setAllTags(Array.from(tagsSet));
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  const filterPosts = () => {
    let filtered = [...posts];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Tag filter
    if (selectedTag) {
      filtered = filtered.filter(post =>
        post.tags?.includes(selectedTag)
      );
    }

    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const updateDisplayedPosts = () => {
    const endIndex = currentPage * POSTS_PER_PAGE;
    const postsToShow = filteredPosts.slice(0, endIndex);
    setDisplayedPosts(postsToShow);
    setHasMore(endIndex < filteredPosts.length);
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    // Simulate network delay for smooth UX
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setLoadingMore(false);
    }, 500);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const handlePostClick = (postId) => {
    window.location.href = `/blog/${postId}`;
  };

  const handleTagSelect = (tag) => {
    setSelectedTag(selectedTag === tag ? null : tag);
    // Scroll to top of results
    setTimeout(() => {
      const resultsSection = document.getElementById('results-section');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSelectedTag(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-14 md:pb-16 bg-gradient-to-br from-whiteBgText to-whiteBgText/90">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4 sm:mb-6">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-whiteBgButtonBg rounded-full animate-pulse"></div>
              <span className="text-white text-xs sm:text-sm font-medium font-primary">
                {currentCategory}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 font-primary px-4">
              {currentCategory === "All" ? "Explore All Content" : currentCategory}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-secondary px-4">
              Discover insights, updates, and stories that matter
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Search and Filter Section */}
      <section className="container mx-auto px-4 -mt-6 sm:-mt-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                <input
                  type="text"
                  placeholder="Search by title, content, or author..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-whiteBgButtonBg focus:border-transparent transition-all font-secondary"
                />
              </div>
              {(searchQuery || selectedTag) && (
                <button
                  onClick={clearSearch}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-100 text-whiteBgText rounded-lg sm:rounded-xl hover:bg-gray-200 transition-all font-primary font-semibold whitespace-nowrap"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Tags Filter */}
            {allTags.length > 0 && (
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <Tag className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-whiteBgButtonBg" />
                  <span className="text-xs sm:text-sm font-semibold text-whiteBgText font-primary">
                    Filter by Tags:
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagSelect(tag)}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all font-secondary ${
                        selectedTag === tag
                          ? "bg-whiteBgButtonBg text-white shadow-lg scale-105"
                          : "bg-gray-100 text-whiteBgText hover:bg-gray-200 active:scale-95"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section id="results-section" className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Results Count */}
          <div className="mb-6 sm:mb-8 px-2">
            <p className="text-sm sm:text-base text-gray-600 font-secondary">
              Showing <span className="font-bold text-whiteBgText">{displayedPosts.length}</span> of <span className="font-bold text-whiteBgText">{filteredPosts.length}</span> {filteredPosts.length === 1 ? 'post' : 'posts'}
              {selectedTag && (
                <span className="ml-1">
                  with tag <span className="font-bold text-whiteBgButtonBg">#{selectedTag}</span>
                </span>
              )}
            </p>
          </div>

          {loading ? (
            // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            //   {[1, 2, 3, 4, 5, 6].map((i) => (
            //     <div key={i} className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg animate-pulse">
            //       <div className="w-full h-40 sm:h-48 bg-gray-200"></div>
            //       <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            //         <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4"></div>
            //         <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2"></div>
            //         <div className="h-16 sm:h-20 bg-gray-200 rounded"></div>
            //       </div>
            //     </div>
            //   ))}
            // </div>
            <Loading text='Posts'/>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16 sm:py-20">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Search className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-whiteBgText mb-2 font-primary">No posts found</h3>
              <p className="text-sm sm:text-base text-gray-600 font-secondary mb-4">Try adjusting your search or filter criteria</p>
              {(searchQuery || selectedTag) && (
                <button
                  onClick={clearSearch}
                  className="px-6 py-2.5 bg-whiteBgButtonBg text-white rounded-xl hover:bg-whiteBgTextHover transition-all font-primary font-semibold"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {displayedPosts.map((post) => (
                  <article
                    key={post.id}
                    onClick={() => handlePostClick(post.id)}
                    className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1 sm:hover:-translate-y-2"
                  >
                    {/* Image */}
                    {post.image && (
                      <div className="relative h-40 sm:h-48 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-4 sm:p-6">
                      {/* Category Badge */}
                      <div className="mb-2 sm:mb-3">
                        <span className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 bg-whiteBgButtonBg/10 text-whiteBgButtonBg text-[10px] sm:text-xs font-bold rounded-full font-primary uppercase tracking-wider">
                          {post.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-lg sm:text-xl font-bold text-whiteBgText mb-2 sm:mb-3 line-clamp-2 group-hover:text-whiteBgButtonBg transition-colors font-primary">
                        {post.title}
                      </h2>

                      {/* Summary */}
                      <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3 font-secondary">
                        {post.summary}
                      </p>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-600 text-[10px] sm:text-xs rounded-md font-secondary"
                            >
                              #{tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-gray-400 text-[10px] sm:text-xs font-secondary">
                              +{post.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Meta Info */}
                      <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-500 font-secondary">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                            <span className="hidden sm:inline">{formatDate(post.created_at)}</span>
                            <span className="sm:hidden">{new Date(post.created_at).toLocaleDateString("en-US", { month: 'short', day: 'numeric' })}</span>
                          </div>
                          {post.read_time && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                              <span>{post.read_time}</span>
                            </div>
                          )}
                        </div>
                        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-whiteBgButtonBg transform group-hover:translate-x-1 transition-transform" />
                      </div>

                      {/* Author */}
                      {post.author && (
                        <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                          {post.author_image ? (
                            <img
                              src={post.author_image}
                              alt={post.author}
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-whiteBgButtonBg/10 flex items-center justify-center">
                              <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-whiteBgButtonBg" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-semibold text-whiteBgText truncate font-secondary">
                              {post.author}
                            </p>
                            {post.designation && (
                              <p className="text-[10px] sm:text-xs text-gray-500 truncate font-secondary">
                                {post.designation}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="flex justify-center mt-8 sm:mt-12">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="group relative px-8 sm:px-10 py-3 sm:py-4 bg-whiteBgButtonBg text-white rounded-xl sm:rounded-2xl hover:bg-whiteBgTextHover transition-all duration-300 font-primary font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loadingMore ? (
                      <Loading text='Posts'/>
                    ) : (
                      <span className="flex items-center gap-2">
                        <span>Load More Posts</span>
                        <span className="inline-block px-2 py-0.5 bg-white/20 rounded-full text-xs sm:text-sm font-semibold">
                          +{Math.min(POSTS_PER_PAGE, filteredPosts.length - displayedPosts.length)}
                        </span>
                      </span>
                    )}
                  </button>
                </div>
              )}

              {/* Pagination Info */}
              {!hasMore && filteredPosts.length > POSTS_PER_PAGE && (
                <div className="text-center mt-8 sm:mt-12 pb-4">
                  <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white rounded-xl sm:rounded-2xl shadow-md">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs sm:text-sm text-gray-600 font-secondary">
                      You've reached the end • <span className="font-bold text-whiteBgText">{filteredPosts.length}</span> posts shown
                    </span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Posts;