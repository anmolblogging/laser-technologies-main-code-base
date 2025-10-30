import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Navbar from './Navbar';
import Footer from './Footer';
import Loading from './Loading';

const BRAND = {
  primary: '#6b0f0f',
  hover: '#4f0b0b',
  light: '#fef2f2',
  border: 'rgba(107,15,15,0.15)',
};

const ITEMS_PER_PAGE = 8;

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
    // Lazy loading observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;
            if (src) {
              img.src = src;
              img.removeAttribute('data-src');
              observerRef.current?.unobserve(img);
            }
          }
        });
      },
      { rootMargin: '50px' }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedAward) return;
      
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        handleModalPrev();
      } else if (e.key === 'ArrowRight') {
        handleModalNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAward]);

  const fetchAwards = async () => {
    try {
      setLoading(true);
      
      const { count } = await supabase
        .from('awards')
        .select('*', { count: 'exact', head: true });

      const { data, error } = await supabase
        .from('awards')
        .select('*')
        .order('created_at', { ascending: false })
        .range((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE - 1);

      if (error) throw error;

      setAwards(data || []);
      setTotalCount(count || 0);
      
      const indices: { [key: string]: number } = {};
      data?.forEach(award => {
        indices[award.id] = 0;
      });
      setCarouselIndices(indices);
    } catch (error) {
      console.error('Error fetching awards:', error);
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
    setCarouselIndices(prev => ({
      ...prev,
      [awardId]: prev[awardId] === 0 ? imageCount - 1 : prev[awardId] - 1
    }));
  };

  const handleNextImage = (awardId: string, imageCount: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCarouselIndices(prev => ({
      ...prev,
      [awardId]: prev[awardId] === imageCount - 1 ? 0 : prev[awardId] + 1
    }));
  };

  const openModal = (award: Award, imageIndex: number) => {
    setSelectedAward({ award, imageIndex });
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedAward(null);
    document.body.style.overflow = 'unset';
  };

  const handleModalPrev = () => {
    if (selectedAward && selectedAward.imageIndex > 0) {
      setSelectedAward({
        ...selectedAward,
        imageIndex: selectedAward.imageIndex - 1
      });
    }
  };

  const handleModalNext = () => {
    if (selectedAward && selectedAward.award.image_url && selectedAward.imageIndex < selectedAward.award.image_url.length - 1) {
      setSelectedAward({
        ...selectedAward,
        imageIndex: selectedAward.imageIndex + 1
      });
    }
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  if (loading && currentPage === 1) {
    return <Loading text='Awards' />
  }

  return (
    <div className="min-h-screen md:pt-10 bg-gradient-to-br from-gray-50 to-red-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-medium mb-4 text-gray-900">
            Awards & Accolades
          </h1>
          <div className="w-20 h-1 mb-6" style={{ backgroundColor: BRAND.primary }}></div>
          <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
            Laser Technologies has been a pioneer in the laser community for the past 10 years. 
            We have been rewarded for our dedication, hard work and integrity. Have a look at our achievements.
          </p>
        </div>

        {/* Awards Grid */}
        {awards.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No awards to display yet.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {awards.map((award) => {
                const currentIndex = carouselIndices[award.id] || 0;
                const images = award.image_url || [];
                const currentImage = images[currentIndex];

                return (
                  <div
                    key={award.id}
                    className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col"
                  >
                    {/* Image Carousel */}
                    {images.length > 0 && (
                      <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                        <img
                          ref={(el) => registerImage(`${award.id}-${currentIndex}`, el)}
                          data-src={currentImage}
                          alt={award.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        
                        {/* Carousel Controls */}
                        {images.length > 1 && (
                          <>
                            <button
                              onClick={(e) => handlePrevImage(award.id, images.length, e)}
                              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white shadow-lg"
                              aria-label="Previous image"
                            >
                              <ChevronLeft size={20} />
                            </button>
                            <button
                              onClick={(e) => handleNextImage(award.id, images.length, e)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white shadow-lg"
                              aria-label="Next image"
                            >
                              <ChevronRight size={20} />
                            </button>
                            
                            {/* Dots Indicator */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-full">
                              {images.map((_, idx) => (
                                <div
                                  key={idx}
                                  className={`h-1.5 rounded-full transition-all duration-300 ${
                                    idx === currentIndex
                                      ? 'bg-white w-6'
                                      : 'bg-white/60 w-1.5'
                                  }`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-medium mb-3 text-gray-900">
                        {award.title}
                      </h3>
                      {award.description && (
                        <div className="flex-grow">
                          <p className="text-gray-600 leading-relaxed text-[15px] line-clamp-3">
                            {award.description}
                          </p>
                        </div>
                      )}
                      <button
                        onClick={() => openModal(award, currentIndex)}
                        className="mt-4 text-sm font-medium transition-colors self-start hover:underline"
                        style={{ color: BRAND.primary }}
                      >
                        Read More →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-16">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={20} />
                </button>
                
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
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-4 py-2 border rounded transition-colors ${
                          isActive
                            ? 'border-transparent text-white'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                        style={isActive ? { backgroundColor: BRAND.primary } : {}}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (
                    pageNum === currentPage - 2 ||
                    pageNum === currentPage + 2
                  ) {
                    return <span key={pageNum} className="px-2 text-gray-400">...</span>;
                  }
                  return null;
                })}
                
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  aria-label="Next page"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Enhanced Modal - Desktop: Image Left, Text Right */}
      {selectedAward && (
        <div
          className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 p-2"
            aria-label="Close modal"
          >
            <X size={32} />
          </button>
          
          {/* Image counter */}
          <div className="absolute top-4 left-4 text-white text-sm bg-black/50 backdrop-blur-sm px-3 py-2 rounded-full z-10">
            {selectedAward.imageIndex + 1} / {selectedAward.award.image_url?.length || 0}
          </div>

          <div 
            className="max-w-7xl w-full h-[90vh] bg-gray-50 rounded-lg overflow-hidden flex flex-col lg:flex-row relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Section - Left on Desktop, Top on Mobile */}
            <div className="relative lg:w-1/2 h-64 lg:h-full bg-black flex items-center justify-center">
              <img
                src={selectedAward.award.image_url?.[selectedAward.imageIndex] || ''}
                alt={selectedAward.award.title}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Buttons for Images */}
              {selectedAward.award.image_url && selectedAward.award.image_url.length > 1 && (
                <>
                  {selectedAward.imageIndex > 0 && (
                    <button
                      onClick={handleModalPrev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full hover:bg-white transition-colors shadow-lg"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} />
                    </button>
                  )}
                  
                  {selectedAward.imageIndex < selectedAward.award.image_url.length - 1 && (
                    <button
                      onClick={handleModalNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-full hover:bg-white transition-colors shadow-lg"
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} />
                    </button>
                  )}
                  
                  {/* Dots Indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                    {selectedAward.award.image_url.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedAward({ ...selectedAward, imageIndex: idx })}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === selectedAward.imageIndex
                            ? 'bg-white w-8'
                            : 'bg-white/60 w-2 hover:bg-white/80'
                        }`}
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Text Section - Right on Desktop, Bottom on Mobile (Scrollable) */}
            <div className="lg:w-1/2 overflow-y-auto flex-1">
              <div className="p-8 lg:p-12">
                <h2 className="text-3xl lg:text-4xl font-medium mb-6 leading-tight  p-2" style={{color : BRAND.primary}}>
                  {selectedAward.award.title}
                </h2>
                {selectedAward.award.description && (
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed text-base lg:text-lg whitespace-pre-wrap">
                      {selectedAward.award.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>


        </div>
      )}

      <Footer />
    </div>
  );
};

export default Awards;