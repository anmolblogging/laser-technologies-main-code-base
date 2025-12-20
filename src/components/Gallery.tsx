import React, { useState, useRef, useEffect } from "react";
import { X, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "../lib/supabase";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import AwardModal from "./AwardModal";
import FALLBACK_VIDEOS from "./videoURL";

type Video = { url: string; title: string };
type ImageItem = {
  id: string;
  title: string;
  description: string;
  image_url: string[];
  sourceUrl?: string;
};

const sizeHeights = [180, 260, 340, 220, 300];

function getYoutubeVideoId(url: string): string | null {
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];
  const longMatch = url.match(/v=([a-zA-Z0-9_-]{11})/);
  if (longMatch) return longMatch[1];
  const generic = url.match(/\/([a-zA-Z0-9_-]{11})(?:\?|$)/);
  return generic ? generic[1] : null;
}

function getDisplayImageUrl(url?: string) {
  if (!url) return "";
  if (url.includes("drive.google.com")) {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
  }
  return url;
}

const Gallery: React.FC = () => {
  const navigate = useNavigate();

  const [imagesData, setImagesData] = useState<ImageItem[]>([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [videosData, setVideosData] = useState<Video[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const [selectedAwardModal, setSelectedAwardModal] = useState<{ award: ImageItem; imageIndex: number } | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const { data, error } = await supabase
          .from("awards")
          .select("*")
          .eq("home_visibility", true)
          .order("title", { ascending: true });

        if (error) throw error;
        setImagesData(data || []);
      } catch (err) {
        console.error("Error fetching awards:", err);
      } finally {
        setLoadingImages(false);
      }
    };

    fetchAwards();
  }, []);

  useEffect(() => {
    const CHANNEL_ID = "UCvBgJrxw9lcHaw-q7jArtQg";
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
    const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;

    const fetchLatestVideo = async () => {
      try {
        const res = await fetch(rss2jsonUrl);
        if (!res.ok) throw new Error(`rss2json status ${res.status}`);
        const json = await res.json();
        if (json && Array.isArray(json.items) && json.items.length) {
          const parsed = json.items.map((v: any) => ({
            title: v.title ?? "",
            url: v.link ?? "",
          }));
          setVideosData(parsed.slice(0, 7));
          return;
        }
        // if no items, fall back
        setVideosData(FALLBACK_VIDEOS);
      } catch (err) {
        console.warn("rss2json failed, using fallback videos:", err);
        setVideosData(FALLBACK_VIDEOS);
      } finally {
        setLoadingVideos(false);
      }
    };

    fetchLatestVideo();
  }, []);

  useEffect(() => {
    if ((selectedAwardModal || selectedVideo) && closeBtnRef.current) closeBtnRef.current.focus();
  }, [selectedAwardModal, selectedVideo]);

  const openImage = (image: ImageItem) => {
    setSelectedAwardModal({ award: image, imageIndex: 0 });
  };

  const openVideo = (video: Video) => {
    setSelectedVideo(video);
  };

  const closeModal = () => {
    setSelectedAwardModal(null);
    setSelectedVideo(null);
  };

  const handleModalPrev = () => {
    if (selectedAwardModal && selectedAwardModal.imageIndex > 0) {
      setSelectedAwardModal({
        ...selectedAwardModal,
        imageIndex: selectedAwardModal.imageIndex - 1,
      });
    }
  };

  const handleModalNext = () => {
    if (
      selectedAwardModal &&
      selectedAwardModal.award.image_url &&
      selectedAwardModal.imageIndex < selectedAwardModal.award.image_url.length - 1
    ) {
      setSelectedAwardModal({
        ...selectedAwardModal,
        imageIndex: selectedAwardModal.imageIndex + 1,
      });
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = 320;
    const newPosition =
      direction === "left"
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(
            carouselRef.current.scrollWidth - carouselRef.current.clientWidth,
            scrollPosition + scrollAmount
          );

    carouselRef.current.scrollTo({ left: newPosition, behavior: "smooth" });
    setScrollPosition(newPosition);
  };

  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = carouselRef.current
    ? scrollPosition < carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 1
    : false;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 antialiased">
      <div className="max-w-[1400px] mx-auto py-16 px-6">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4">
            Awards & Accolades
          </h1>
        </header>

        <section className="mb-20">
          {loadingImages ? (
            <Loading text="Images" />
          ) : (
            <div className="mx-auto">
              <div
                className="columns-1 sm:columns-2 lg:columns-3 xl:columns-3 gap-6 space-y-6"
                style={{ columnGap: 24 }}
              >
                {imagesData.map((img, idx) => {
                  const h = sizeHeights[idx % sizeHeights.length];
                  const imgUrl = getDisplayImageUrl(img.image_url?.[0]);
                  return (
                    <article
                      key={img.id}
                      className="break-inside-avoid mb-6 relative group cursor-pointer overflow-hidden bg-white "
                      onClick={() => openImage(img)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && openImage(img)}
                    >
                      <div className="relative" style={{ height: `${h}px` }}>
                        <img
                          src={imgUrl}
                          alt={img.title}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-400 will-change-transform"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />
                        <div className="absolute inset-x-0 bottom-0 p-5 z-10">
                          <h3 className="text-white text-lg font-semibold leading-snug drop-shadow-sm">
                            {img.title}
                          </h3>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        <section>
          <div className="flex flex-col pt-12 md:pt-20 sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 ">
            <h2 className="text-4xl font-medium text-gray-900">Follow us on YouTube</h2>
            <div className="flex items-center gap-3">
              <a
                href="https://www.youtube.com/@LaserTechnologiesOfficial"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-whiteBgButtonBg text-whiteBgButtonText hover:text-whiteBgButtonText border border-gray-200 text-md font-medium  transition"
              >
                Subscribe
              </a>
              <div className="flex gap-2">
                <button
                  onClick={() => scroll("left")}
                  disabled={!canScrollLeft}
                  className="p-2 border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 transition-colors"
                >
                  <ChevronLeft size={18} className="text-gray-700" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  disabled={!canScrollRight}
                  className="p-2 border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 transition-colors"
                >
                  <ChevronRight size={18} className="text-gray-700" />
                </button>
              </div>
            </div>
          </div>

          {loadingVideos ? (
            <Loading text="Latest Video" />
          ) : (
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 "
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
            >
              {videosData.map((video) => {
                const id = getYoutubeVideoId(video.url);
                const thumb = id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
                return (
                  <button
                    key={video.url}
                    onClick={() => openVideo(video)}
                    className="group flex-shrink-0 w-96 bg-white hover:bg-white px-2 border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                    type="button"
                  >
                    <div className="relative pt-[56.25%]  ">
                      {thumb && (
                        <img
                          src={thumb}
                          alt={video.title}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 bg-whiteBgButtonBg flex items-center justify-center rounded-full shadow-lg transition-transform group-hover:scale-105">
                          <Play size={20} className="text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4 text-left">
                      <div className="text-sm font-semibold text-gray-900">{video.title}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* Award Modal */}
      {selectedAwardModal && (
        <AwardModal
          awardData={selectedAwardModal}
          onClose={closeModal}
          onPrevImage={handleModalPrev}
          onNextImage={handleModalNext}
          onSelectImageIndex={(idx) =>
            setSelectedAwardModal((prev) => (prev ? { ...prev, imageIndex: idx } : null))
          }
        />
      )}

      {/* Video modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 p-2"
            aria-label="Close video modal"
            ref={closeBtnRef}
          >
            <X size={32} />
          </button>

          <div
            className="relative max-w-7xl w-full aspect-[16/9] bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              title={selectedVideo.title}
              src={`https://www.youtube.com/embed/${getYoutubeVideoId(selectedVideo.url)}?autoplay=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            scroll-behavior: auto !important;
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
};

export default React.memo(Gallery);
