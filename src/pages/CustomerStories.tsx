import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2, Quote } from "lucide-react";
import Loading from "../components/Loading";

interface CustomerStory {
  id: string;
  title: string;
  slug: string;
  client_name: string | null;
  summary: string | null;
  hero_image: string | null;
  industry: string | null;
}

const PAGE_SIZE = 6;
const logo = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/dark_BACKGROUND.jpg';

const CustomerStories = () => {
  const [stories, setStories] = useState<CustomerStory[]>([]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  
  // Separate loading states for better UX
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStories = async (pageNumber: number) => {
    try {
      if (pageNumber === 0) setLoadingInitial(true);
      else setLoadingMore(true);


      if (pageNumber === 0) {
        const { count, error: countError } = await supabase
          .from("customer_stories")
          .select("id", { count: "exact", head: true });
        
        if (countError) throw countError;
        setTotalCount(count || 0);
      }

      const from = pageNumber * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;


      const { data, error } = await supabase
        .from("customer_stories")
        .select("id, title, slug, client_name, summary, hero_image, industry")
        .order("created_at", { ascending: true })
        .range(from, to);

      if (error) throw error;

      if (data) {
        setStories(prev => pageNumber === 0 ? data : [...prev, ...data]);
      }
    } catch (err: any) {
      console.error("Error fetching stories:", err);

      if (pageNumber === 0) {
        setError("Failed to load customer stories. Please try again later.");
      }
    } finally {
      if (pageNumber === 0) setLoadingInitial(false);
      else setLoadingMore(false);
    }
  };


  useEffect(() => {
    fetchStories(0);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchStories(nextPage);
  };

  const hasMore = stories.length < totalCount;

  if (loadingInitial) {
    return <Loading text="Customer Stories" />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <p className="text-red-600 mb-4 font-medium">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-black text-white hover:bg-red-600 transition-colors uppercase tracking-wider text-sm font-medium rounded-none"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50">
      {/* Hero Header Section */}
      <header
        className="relative mt-16 md:mt-20 bg-black overflow-hidden"
        style={{
          backgroundImage: `url(${logo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center space-y-6">
            <div className="inline-flex rounded-full items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20">
              <Quote className="text-white" size={20} />
              <span className="text-white text-sm font-medium tracking-wide first-letter:uppercase uppercase">
                SUCCESS STORIES
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-tight">
              Innovation in <br />
              <span className="text-red-500">Action</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Real stories of transformation, efficiency, and growth from our valued partners across the globe.
            </p>
          </div>
        </div>
      </header>

      {/* Stories Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {stories.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <p>No stories found. Check back soon!</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {stories.map((story) => (
                  <Link 
                    to={`/customer-stories/${story.slug}`}
                    key={story.id}
                    className="group block h-full focus:outline-none"
                  >
                    <article 
                      className="bg-white border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                        {story.hero_image ? (
                          <img 
                            src={story.hero_image} 
                            alt={story.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                            <Quote className="w-16 h-16 opacity-20" />
                          </div>
                        )}
                        
                        {/* Dark overlay on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
                        
                        {story.industry && (
                          <span className="absolute top-0 left-0 bg-red-600 text-white text-xs font-semibold uppercase tracking-widest px-4 py-2">
                            {story.industry}
                          </span>
                        )}
                      </div>
                      
                      <div className="p-8 flex flex-col flex-grow">
                        {story.client_name && (
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-[2px] bg-red-500"></div>
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                              {story.client_name}
                            </p>
                          </div>
                        )}
                        
                        {/* Changed from h2 > Link to just h2 since the whole card is a link */}
                        <h2 className="text-2xl font-medium text-gray-900 mb-4 leading-tight group-hover:text-red-600 transition-colors">
                          {story.title}
                        </h2>
                      {/* summary in the card  */}
                        {/* <p className="text-gray-600 text-base leading-relaxed line-clamp-3 mb-8 flex-grow font-light">
                          {story.summary}
                        </p> */}
                        
                        {/* Changed Link to div/span since wrapped by Link */}
                        <div 
                          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-gray-900 group-hover:text-red-600 transition-colors mt-auto"
                        >
                          Read Case Study
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
              
              {/* Pagination Controls */}
              <div className="mt-16 flex flex-col items-center">
                 {/* Count Status */}

                  {/* <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                     Showing {stories.length} of {totalCount} Stories 
                 </div>  */}

                 {/* Load More Button */}
                 {hasMore ? (
                   <button
                     onClick={handleLoadMore}
                     disabled={loadingMore}
                     className="group relative px-8 py-4 bg-black text-white text-sm font-bold uppercase tracking-widest hover:bg-black/90 transition-all rounded-none min-w-[200px] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                   >
                      {loadingMore ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Loading...</span>
                        </>
                      ) : (
                        <>
                          <span>Load More Stories</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                      <span className="absolute bottom-0 left-0 w-full h-1 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                   </button>
                 ) : (
                   <div className="flex items-center gap-2 text-gray-500">
                      <div className="w-12 h-px bg-gray-200"></div>
                      <span className="text-sm font-semibold uppercase tracking-widest">End of List</span>
                      <div className="w-12 h-px bg-gray-200"></div>
                   </div>
                 )}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default CustomerStories;
