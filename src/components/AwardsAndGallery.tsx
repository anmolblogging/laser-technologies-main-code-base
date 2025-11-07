import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Award } from "lucide-react";
import { supabase } from "../lib/supabase";
import Loading from "./Loading";
import AwardModal from "./AwardModal";
const logo = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/dark_BACKGROUND.jpg' ;
const ITEMS_PER_PAGE = 6;

interface Award {
  id: string;
  title: string;
  description: string | null;
  image_url: string[] | null;
  created_at: string;
  updated_at: string;
  home_visibility: boolean;
}

const Awards = () => {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAward, setSelectedAward] = useState<{ award: Award; imageIndex: number } | null>(null);
  const [carouselIndices, setCarouselIndices] = useState<{ [key: string]: number }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const imageRefs = useRef<{ [key: string]: HTMLImageElement | null }>({});

  useEffect(() => {
    fetchAwards();
  }, [currentPage]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;
            if (src) {
              img.src = src;
              img.removeAttribute("data-src");
              observerRef.current?.unobserve(img);
            }
          }
        });
      },
      { rootMargin: "50px" }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const fetchAwards = async () => {
    try {
      setLoading(true);

      const { count } = await supabase.from("awards").select("*", { count: "exact", head: true });

      const { data, error } = await supabase
        .from("awards")
        .select("*")
        .order("created_at", { ascending: false })
        .range((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE - 1);

      if (error) throw error;

      setAwards(data || []);
      setTotalCount(count || 0);

      const indices: { [key: string]: number } = {};
      data?.forEach((award) => {
        indices[award.id] = 0;
      });
      setCarouselIndices(indices);
    } catch (error) {
      console.error("Error fetching awards:", error);
    } finally {
      setLoading(false);
    }
  };

  const registerImage = useCallback((id: string, element: HTMLImageElement | null) => {
    if (element) {
      imageRefs.current[id] = element;
      observerRef.current?.observe(element);
    }
  }, []);

  const handlePrevImage = (awardId: string, imageCount: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCarouselIndices((prev) => ({
      ...prev,
      [awardId]: prev[awardId] === 0 ? imageCount - 1 : prev[awardId] - 1,
    }));
  };

  const handleNextImage = (awardId: string, imageCount: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCarouselIndices((prev) => ({
      ...prev,
      [awardId]: prev[awardId] === imageCount - 1 ? 0 : prev[awardId] + 1,
    }));
  };

  const openModal = (award: Award, imageIndex: number) => {
    setSelectedAward({ award, imageIndex });
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedAward(null);
    document.body.style.overflow = "unset";
  };

  const handleModalPrev = () => {
    if (selectedAward && selectedAward.imageIndex > 0) {
      setSelectedAward({ ...selectedAward, imageIndex: selectedAward.imageIndex - 1 });
    }
  };

  const handleModalNext = () => {
    if (
      selectedAward &&
      selectedAward.award.image_url &&
      selectedAward.imageIndex < selectedAward.award.image_url.length - 1
    ) {
      setSelectedAward({ ...selectedAward, imageIndex: selectedAward.imageIndex + 1 });
    }
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  if (loading && currentPage === 1) {
    return <Loading text="Awards" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50 mt-16 md:mt-20">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-black" style={{ backgroundImage: `url(${logo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
              <Award className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium tracking-wide">Recognition & Excellence</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-6xl font-medium text-white mb-6 tracking-tight">
              Awards & Accolades
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-200 mb-4 max-w-3xl mx-auto leading-relaxed">
              Celebrating a decade of innovation and excellence
            </p>
            
            <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto px-8 py-4">
              Recognized for dedication, integrity, and pioneering achievements in laser technology
            </p>

            
          </div>
        </div>
      </header>

      {/* Awards Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {awards.length === 0 ? (
          <div className="text-center py-20">
            <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No awards to display yet.</p>
          </div>
        ) : (
          <>
            {/* Awards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {awards.map((award) => {
                const currentIndex = carouselIndices[award.id] || 0;
                const images = award.image_url || [];
                const currentImage = images[currentIndex];
                
                return (
                  <div
                    key={award.id}
                    className="group bg-white  shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-red-200 flex flex-col"
                  >
                    {/* Image Section */}
                    {images.length > 0 && (
                      <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                        <img
                          ref={(el) => registerImage(`${award.id}-${currentIndex}`, el)}
                          data-src={currentImage}
                          alt={award.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        

                        
                        {/* Carousel Controls */}
                        {images.length > 1 && (
                          <>
                            <button
                              onClick={(e) => handlePrevImage(award.id, images.length, e)}
                              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm text-gray-800 p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-xl"
                              aria-label="Previous image"
                            >
                              <ChevronLeft size={18} strokeWidth={2.5} />
                            </button>
                            
                            <button
                              onClick={(e) => handleNextImage(award.id, images.length, e)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm text-gray-800 p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-xl"
                              aria-label="Next image"
                            >
                              <ChevronRight size={18} strokeWidth={2.5} />
                            </button>
                            
                            {/* Dots Indicator */}
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/60 backdrop-blur-md px-3 py-2 rounded-full">
                              {images.map((_, idx) => (
                                <div
                                  key={idx}
                                  className={`h-1.5 rounded-full transition-all duration-300 ${
                                    idx === currentIndex 
                                      ? "bg-white w-8" 
                                      : "bg-white/50 w-1.5 hover:bg-white/75"
                                  }`}
                                />
                              ))}
                            </div>
                          </>
                        )}

                      </div>
                    )}

                    {/* Content Section */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors duration-300">
                        {award.title}
                      </h3>
                      
                      {award.description && (
                        <p className="text-gray-600 leading-relaxed text-sm mb-4 line-clamp-3 flex-grow">
                          {award.description}
                        </p>
                      )}

                      
                      <button
                        onClick={() => openModal(award, currentIndex)}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 hover:text-black bg-whiteBgButtonBg bg-opacity-40 hover:bg-opacity-40 hover:bg-whiteBgButtonBg text-black font-medium transition-all duration-300  self-start"
                      >
                        Read More
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center gap-6">
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => {
                      setCurrentPage((p) => Math.max(1, p - 1));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2.5 border-2 border-gray-300 rounded-lg text-gray-700 font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all duration-300 disabled:hover:bg-transparent disabled:hover:border-gray-300"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={18} />
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-2">
                    {[...Array(totalPages)].map((_, idx) => {
                      const pageNum = idx + 1;
                      const isActive = pageNum === currentPage;

                      if (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNum}
                            onClick={() => {
                              setCurrentPage(pageNum);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={`min-w-[44px] h-11 rounded-lg font-semibold transition-all duration-300 ${
                              isActive
                                ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg scale-110"
                                : "bg-white border-2 border-gray-300 text-gray-700 hover:bg-red-50 hover:border-red-300 hover:text-red-700"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                        return (
                          <span key={pageNum} className="px-2 text-gray-400 font-bold">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => {
                      setCurrentPage((p) => Math.min(totalPages, p + 1));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-4 py-2.5 border-2 border-gray-300 rounded-lg text-gray-700 font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all duration-300 disabled:hover:bg-transparent disabled:hover:border-gray-300"
                    aria-label="Next page"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* Page Info */}
                <div className="text-sm text-gray-600 font-medium">
                  Page <span className="font-bold text-red-600">{currentPage}</span> of <span className="font-bold">{totalPages}</span>
                  <span className="mx-2">•</span>
                  Showing <span className="font-bold">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{" "}
                  <span className="font-bold">{Math.min(currentPage * ITEMS_PER_PAGE, totalCount)}</span> of{" "}
                  <span className="font-bold">{totalCount}</span> awards
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <AwardModal
        awardData={selectedAward}
        onClose={closeModal}
        onPrevImage={handleModalPrev}
        onNextImage={handleModalNext}
        onSelectImageIndex={(idx) => setSelectedAward((prev) => (prev ? { ...prev, imageIndex: idx } : null))}
      />
    </div>
  );
};

export default Awards;