import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { ArrowLeft, ArrowRight, Share2, MapPin } from "lucide-react";
import Loading from "../components/Loading";

interface CustomerStoryDetail {
  id: string;
  title: string;
  slug: string;
  client_name: string | null;
  location: string | null;
  industry: string | null;
  summary: string | null;
  content: string;
  hero_image: string | null;
  video_url: string | null;
  created_at: string;
}

const CustomerStoriesTemplate = () => {
  const { slug } = useParams<{ slug: string }>();
  const [story, setStory] = useState<CustomerStoryDetail | null>(null);
  const [nextStory, setNextStory] = useState<{ slug: string; title: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Scroll to top whenever the slug changes (new story loaded)
    window.scrollTo(0, 0);

    const fetchStory = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        // 1. Fetch Current Story
        const { data: currentData, error: currentError } = await supabase
          .from("customer_stories")
          .select("*")
          .eq("slug", slug)
          .single();

        if (currentError) throw currentError;
        setStory(currentData);

        // 2. Fetch Next Story (Sequential Cycle)
        // First try to find the next story created AFTER this one
        const { data: correctNextData } = await supabase
          .from("customer_stories")
          .select("slug, title")
          .gt("created_at", currentData.created_at)
          .order("created_at", { ascending: true })
          .limit(1)
          .maybeSingle();

        if (correctNextData) {
          setNextStory(correctNextData);
        } else {
          // If no "next" story exists (we are at the end), wrap around to the FIRST story
          const { data: firstData } = await supabase
            .from("customer_stories")
            .select("slug, title")
            .order("created_at", { ascending: true })
            .limit(1)
            .maybeSingle();
            
          if (firstData && firstData.slug !== currentData.slug) {
             setNextStory(firstData);
          }
        }

      } catch (err: any) {
        console.error("Error fetching story:", err);
        setError("Story not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share && story) {
      try {
        await navigator.share({
          title: story.title,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    }
  };

  if (loading) {
    return <Loading text="Customer Story" />;
  }

  if (error || !story) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <p className="text-gray-600 mb-6 font-medium">{error || "Story not found"}</p>
        <Link
          to="/customer-stories"
          className="px-6 py-2 bg-black text-white hover:bg-red-600 transition-colors text-sm font-medium"
        >
          Back to Stories
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans pt-16 md:pt-20">
      
      {/* 
         1. SLIM NAV (Not Full Width visually, contained within max-w-7xl)
      */}
      <div className="w-full border-b border-gray-100 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
            <Link 
               to="/customer-stories" 
               className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors"
            >
               <ArrowLeft className="w-4 h-4" />
               Back to Stories
            </Link>
            
            <div className="hidden md:block text-xs font-medium uppercase tracking-wider text-gray-400">
               Customer Success Story
            </div>
            
            {/* Empty div to balance flex spacing since Share button moved */}
            <div className="w-[100px] hidden md:block"></div>
         </div>
      </div>

      {/* 
         2. HEADER SECTION (Split)
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div>
               {story.industry && (
                  <div className="mb-6">
                     <span className="inline-block px-3 py-1 bg-red-50 text-red-600 text-sm font-medium uppercase tracking-wider">
                        {story.industry}
                     </span>
                  </div>
               )}
               <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 leading-tight mb-6">
                  {story.title}
               </h1>
               {story.summary && (
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                     {story.summary}
                  </p>
               )}
               
               {/* Metadata Section - Larger Fonts & Share Button Here */}
               <div className="flex flex-wrap items-center gap-x-12 gap-y-8 pt-4">
                  {story.client_name && (
                     <div>
                        <span className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Client</span>
                        <span className="text-xl font-medium text-gray-900">{story.client_name}</span>
                     </div>
                  )}
                  {story.location && (
                     <div>
                        <span className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Location</span>
                        <div className="flex items-center gap-2">
                           <MapPin className="w-5 h-5 text-gray-400" />
                           <span className="text-xl font-medium text-gray-900">{story.location}</span>
                        </div>
                     </div>
                  )}
                  {/* Share Button Moved Here */}
                  <div>
                     <span className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Share</span>
                     <button 
                        onClick={handleShare}
                        className="flex items-center p-2 rounded-sm text-white gap-2 text-xl font-medium hover:text-white transition-colors"
                     >
                        <Share2 className="w-5 h-5" />
                        <span className="text-base underline-offset-4 decoration-red-200 hover:decoration-red-600 transition-all">Share </span>
                     </button>
                  </div>
               </div>
            </div>

            {/* Right: Image */}
            <div className="relative">
               {story.hero_image ? (
                  <div className="aspect-[4/3] w-full  overflow-hidden">
                     <img 
                       src={story.hero_image} 
                       alt={story.title}
                       className="w-full h-full object-contain"
                     />
                  </div>
               ) : (
                  <div className="aspect-[4/3] w-full bg-gray-100 flex items-center justify-center text-gray-400">
                     No Image
                  </div>
               )}
            </div>
         </div>
      </div>

      {/* 
         3. VIDEO SECTION (Above Content, Full Width Container)
      */}
      {story.video_url && (
         <div className="w-full py-12 border-t border-gray-100">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative aspect-video w-full bg-black overflow-hidden shadow-sm">
                   <iframe 
                    src={story.video_url} 
                    title={story.title} 
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen 
                  ></iframe>
                </div>
             </div>
         </div>
      )}

      {/* 
         4. CONTENT BODY (Full Width, Dark Background)
      */}
      <div className="w-full bg-black text-white py-16 md:py-24">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg prose-invert max-w-none 
               prose-headings:font-medium prose-headings:text-white 
               prose-p:text-gray-300 prose-p:leading-loose
               prose-a:text-red-500 prose-a:no-underline hover:prose-a:underline
               prose-img:shadow-sm prose-img:my-10
               prose-blockquote:border-l-4 prose-blockquote:border-red-600 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-200
            ">
               <div dangerouslySetInnerHTML={{ __html: story.content }} />
            </div>
         </div>
      </div>

      {/* 
         5. FOOTER (Simple Next/Prev)
      */}
      <div className="bg-white border-t border-gray-100 py-16">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
               <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">Read Next</h3>
               {nextStory ? (
                  <Link 
                     to={`/customer-stories/${nextStory.slug}`}
                     className="group max-w-2xl"
                  >
                     <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-6 group-hover:text-red-600 transition-colors">
                        {nextStory.title}
                     </h2>
                     <span className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-sm font-medium text-gray-900 hover:border-red-600 hover:text-red-600 transition-all">
                        View Story <ArrowRight className="w-4 h-4" />
                     </span>
                  </Link>
               ) : (
                  <Link 
                     to="/customer-stories"
                     className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-sm font-medium text-gray-900  hover:bg-red-50 hover:border-red-600 transition-all"
                  >
                     Back to Stories
                  </Link>
               )}
            </div>
         </div>
      </div>

    </div>
  );
};

export default CustomerStoriesTemplate;
