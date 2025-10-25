import React, { useState, useRef, useEffect, useMemo } from 'react'
import { X, Play, ChevronLeft, ChevronRight } from 'lucide-react'

type Video = { url: string; title: string }
type ImageItem = { id: number; url: string; title: string; description: string; sourceUrl?: string }
type ModalContent = { type: 'image' | 'video'; payload: ImageItem | Video }

const sizeHeights = [180, 260, 340, 220, 300]
const getHeightForId = (id: number) => sizeHeights[id % sizeHeights.length]

function getYoutubeVideoId(url: string): string | null {
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/)
  if (shortMatch) return shortMatch[1]
  const longMatch = url.match(/v=([a-zA-Z0-9_-]{11})/)
  if (longMatch) return longMatch[1]
  const generic = url.match(/\/([a-zA-Z0-9_-]{11})(?:\?|$)/)
  return generic ? generic[1] : null
}

const Gallery: React.FC = () => {
  const imagesData = useMemo<ImageItem[]>(
    () => [
      { id: 1, url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop', title: 'Advanced Laser Cutting', description: 'State-of-the-art laser cutting — Unsplash' },
      { id: 2, url: 'https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=1600', title: 'Industrial Automation', description: 'Automated laser systems — Pexels' },
      { id: 3, url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1400&auto=format&fit=crop', title: 'Precision Engineering', description: 'High-precision engineering — Unsplash' },
      { id: 4, url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1800&auto=format&fit=crop', title: 'Quality Assurance', description: 'Quality control processes — Unsplash' },
      { id: 5, url: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1200&auto=format&fit=crop', title: 'Material Testing', description: 'Rigorous material testing — Unsplash' },
      { id: 6, url: 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1600', title: 'Factory Floor', description: 'Modern factory floor — Pexels' },
      { id: 7, url: 'https://images.unsplash.com/photo-1474511320723-4242c5b51e0e?q=80&w=1500&auto=format&fit=crop', title: 'R&D', description: 'Research & development — Unsplash' },
      { id: 8, url: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=1400&auto=format&fit=crop', title: 'Assembly Line', description: 'Automated assembly — Unsplash' },
      { id: 9, url: 'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=1600', title: 'Prototype Work', description: 'Prototyping with lasers — Pexels' },
      { id: 10, url: 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1600&auto=format&fit=crop', title: 'Finishing Touches', description: 'Surface finishing — Unsplash' },
    ],
    []
  )

  const [videosData, setVideosData] = useState<Video[]>([])
  const [loadingVideos, setLoadingVideos] = useState(true)

  useEffect(() => {
    const CHANNEL_ID = 'UCvBgJrxw9lcHaw-q7jArtQg' 

    const fetchYouTubeRSS = async () => {
      try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`)
        const data = await response.json()

        if (data && data.items) {
          const parsedVideos = data.items.map((v: any) => ({
            title: v.title,
            url: v.link,
          }))
          setVideosData(parsedVideos)
        }
      } catch (err) {
        console.error('Error fetching YouTube feed:', err)
      } finally {
        setLoadingVideos(false)
      }
    }

    fetchYouTubeRSS()
  }, [])

  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState<ModalContent | null>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (showModal && closeBtnRef.current) closeBtnRef.current.focus()
  }, [showModal])

  const openImage = (image: ImageItem) => {
    setModalContent({ type: 'image', payload: image })
    setShowModal(true)
  }

  const openVideo = (video: Video) => {
    setModalContent({ type: 'video', payload: video })
    setShowModal(true)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return
    const scrollAmount = 320
    const newPosition =
      direction === 'left'
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(carouselRef.current.scrollWidth - carouselRef.current.clientWidth, scrollPosition + scrollAmount)

    carouselRef.current.scrollTo({ left: newPosition, behavior: 'smooth' })
    setScrollPosition(newPosition)
  }

  const canScrollLeft = scrollPosition > 0
  const canScrollRight = carouselRef.current
    ? scrollPosition < carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 1
    : false

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 antialiased">
      <div className="max-w-[1400px] mx-auto py-16 px-6">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4">Gallery</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our portfolio of cutting-edge laser technology and manufacturing solutions
          </p>
        </header>

        <section className="mb-20">
          <div className="mx-auto">
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-3 gap-6 space-y-6" style={{ columnGap: 24 }}>
              {imagesData.map((img) => {
                const h = getHeightForId(img.id)
                return (
                  <article
                    key={img.id}
                    className="break-inside-avoid mb-6 relative group cursor-pointer overflow-hidden bg-white rounded-xl"
                    onClick={() => openImage(img)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && openImage(img)}
                  >
                    <div className="relative" style={{ height: `${h}px` }}>
                      <img
                        src={img.url}
                        alt={img.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-400 will-change-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />
                      <div className="absolute inset-x-0 bottom-0 p-5 z-10">
                        <h3 className="text-white text-lg font-semibold leading-snug drop-shadow-sm">{img.title}</h3>
                        <p className="text-white/90 text-sm mt-1 line-clamp-2">{img.description}</p>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <h2 className="text-4xl font-medium text-gray-900">Follow us on Youtube</h2>
            <div className="flex items-center gap-3">
              <a
                href="https://www.youtube.com/@LaserTechnologiesOfficial"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white border border-gray-200 text-md font-medium hover:bg-gray-700 transition"
              >
                Subscribe
              </a>
              <div className="flex gap-2">
                <button
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                  className="p-2 border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 transition-colors"
                >
                  <ChevronLeft size={18} className="text-gray-700" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                  className="p-2 border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 transition-colors"
                >
                  <ChevronRight size={18} className="text-gray-700" />
                </button>
              </div>
            </div>
          </div>

          {loadingVideos ? (
            <p className="text-center text-gray-500">Loading latest videos...</p>
          ) : (
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
            >
              {videosData.map((video) => {
                const id = getYoutubeVideoId(video.url)
                const thumb = id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : ''
                return (
                  <button
                    key={video.url}
                    onClick={() => openVideo(video)}
                    className="group flex-shrink-0 w-96 bg-white border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative pt-[56.25%] bg-gray-100">
                      {thumb && (
                        <img src={thumb} alt={video.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 bg-[rgba(107,15,15,0.9)] flex items-center justify-center rounded-full shadow-lg transition-transform group-hover:scale-105">
                          <Play size={20} className="text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4 text-left">
                      <div className="text-sm font-semibold text-gray-900">{video.title}</div>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </section>
      </div>

      {showModal && modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative max-w-6xl w-full bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="text-base font-semibold text-gray-900">
                {modalContent.type === 'image'
                  ? (modalContent.payload as ImageItem).title
                  : (modalContent.payload as Video).title}
              </h3>
              <button ref={closeBtnRef} onClick={() => setShowModal(false)} className="p-2 text-gray-500 hover:text-gray-900 transition-colors">
                <X size={22} />
              </button>
            </div>
            <div className="p-6">
              {modalContent.type === 'image' ? (
                <>
                  <img
                    src={(modalContent.payload as ImageItem).url}
                    alt={(modalContent.payload as ImageItem).title}
                    className="w-full h-auto max-h-[75vh] object-contain"
                  />
                  <div className="mt-6 text-gray-700">
                    <p className="text-base leading-relaxed">{(modalContent.payload as ImageItem).description}</p>
                  </div>
                </>
              ) : (
                <div className="relative pt-[56.25%]">
                  <iframe
                    title={(modalContent.payload as Video).title}
                    src={`https://www.youtube.com/embed/${getYoutubeVideoId(
                      (modalContent.payload as Video).url
                    )}?autoplay=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        @media (prefers-reduced-motion: reduce) {
          * { scroll-behavior: auto !important; transition: none !important; animation: none !important; }
        }
      `}</style>
    </main>
  )
}

export default React.memo(Gallery)
