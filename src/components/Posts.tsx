import { useState, useEffect } from "react";
import { Search, ChevronRight, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";
const logo = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/dark_BACKGROUND.jpg' ;
import Loading from "./Loading";

import { Helmet } from "react-helmet-async";

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
    if (path.includes("/news")) return "News & Media";
    if (path.includes("/csr")) return "CSR";
    if (path.includes("/articles")) return "Articles";
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

  const handlePostClick = (postId:any) => {
    window.location.href = `/blog/${postId}`;
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50">
      {currentCategory === "Articles" && (
      <Helmet>
        <link rel="canonical" href="https://www.lasertechnologies.co.in/articles/" />
      </Helmet>
    )}
    
      {/* <Header /> */}
      
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 mt-16 md:mt-20  md:pt-32 pb-12 sm:pb-14 md:pb-16 bg-black" style={{ backgroundImage: `url(${logo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto py-10 text-center">
            {/* <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4 sm:mb-6">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-whiteBgButtonBg rounded-full animate-pulse"></div>
              <span className="text-white text-xs sm:text-sm font-medium font-primary">
                {currentCategory}
              </span>
            </div> */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-4 sm:mb-6 font-primary px-4">
              {currentCategory === "All" ? "Explore All Content" : currentCategory}
            </h1>
            <p className="text-base pb-4 sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-secondary px-4 ">
              Discover insights, updates, and stories that matter
            </p>
          </div>
        </div>
        {/* <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-t from-gray-50 to-transparent"></div> */}
      </section>


      {/* Posts Grid */}
      <section id="results-section" className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Results Count */}
          <div className="mb-6 sm:mb-8 px-2">
            <p className="text-sm sm:text-base text-gray-600 font-secondary">
              {/* Showing <span className="font-bold text-whiteBgText">{displayedPosts.length}</span> of <span className="font-bold text-whiteBgText">{filteredPosts.length}</span> {filteredPosts.length === 1 ? 'post' : 'posts'} */}
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
                    className="bg-white  overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1 sm:hover:-translate-y-2"
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
                        <span className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 bg-whiteBgButtonBg/10 text-whiteBgButtonBg text-[10px] sm:text-xs font-bold  font-primary uppercase tracking-wider">
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
                      {/* {post.tags && post.tags.length > 0 && (
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
                      )} */}

                      {/* Meta Info */}
                      <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-500 font-secondary">
                            Read More
                        </div>
                        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-whiteBgButtonBg transform group-hover:translate-x-1 transition-transform" />
                      </div>

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
                    className="group relative px-8 py-4 bg-black text-white text-sm font-bold uppercase tracking-widest hover:bg-black/90 transition-all rounded-none min-w-[200px] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Loading...</span>
                      </>
                    ) : (
                      <>
                        <span>Load More Posts</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </button>
                </div>
              )}

              {/* Pagination Info */}
              {!hasMore && filteredPosts.length > POSTS_PER_PAGE && (
                <div className="text-center mt-8 sm:mt-12 pb-4">
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 shadow-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs sm:text-sm text-gray-600 font-secondary uppercase tracking-wider">
                      You've reached the end • <span className="font-bold text-black">{filteredPosts.length}</span> posts shown
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