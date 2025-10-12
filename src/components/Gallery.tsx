import React, { useState, useRef, useEffect } from 'react'
import { X, Play, ChevronLeft, ChevronRight } from 'lucide-react'



type Video = { url: string; title: string }
type ImageItem = { id: number; url: string; title: string; description: string }
type ModalContent = { type: 'image' | 'video'; payload: ImageItem | Video }

const videosData: Video[] = [
  { url: 'https://youtu.be/_KN_kmVpKAw?si=DJHNr9n1UEKjBx6V', title: 'Laser Cutting Demo' },
  { url: 'https://youtu.be/oW2yL_-I6kQ?si=jCoRkvxn_wEK6ZwA', title: 'Industrial Automation' },
  { url: 'https://youtu.be/vciaokWg0D8?si=rDBnllOnv8cW4zDv', title: 'Precision Engineering' },
  { url: 'https://youtu.be/05p11ZjnR_4?si=uByGWf-kYgkK4g_8', title: 'Manufacturing Process' },
  { url: 'https://youtu.be/O8mvsVuaqoQ?si=qw-kLgFdZJPFXWFw', title: 'Quality Control' },
  { url: 'https://youtu.be/-eGwzZuRjDQ?si=Wm33pCgZ0DJnnwIY', title: 'Advanced Technology' },
]

const imagesData: ImageItem[] = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&h=1200&fit=crop&q=80',
    title: 'Advanced Laser Cutting',
    description: 'State-of-the-art laser cutting technology for precision manufacturing.',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&h=1200&fit=crop&q=80',
    title: 'Industrial Automation',
    description: 'Automated laser systems designed for high-volume production environments.',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&h=1200&fit=crop&q=80',
    title: 'Precision Engineering',
    description: 'Advanced engineering solutions utilizing cutting-edge laser technology.',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1600&h=1200&fit=crop&q=80',
    title: 'Quality Assurance',
    description: 'Rigorous quality control processes ensuring the highest standards.',
  },
]

const getYoutubeVideoId = (url: string): string | null => {
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/)
  if (shortMatch) return shortMatch[1]
  const longMatch = url.match(/v=([a-zA-Z0-9_-]{11})/)
  if (longMatch) return longMatch[1]
  return null
}

const Gallery: React.FC = () => {
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
    const newPosition = direction === 'left' 
      ? scrollPosition - scrollAmount 
      : scrollPosition + scrollAmount
    
    carouselRef.current.scrollTo({ left: newPosition, behavior: 'smooth' })
    setScrollPosition(newPosition)
  }

  const canScrollLeft = scrollPosition > 0
  const canScrollRight = carouselRef.current 
    ? scrollPosition < carouselRef.current.scrollWidth - carouselRef.current.clientWidth 
    : false

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-16 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4">Gallery</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our portfolio of cutting-edge laser technology and manufacturing solutions
          </p>
        </header>

        {/* Images Grid - 2x2 */}
        <section className="mb-20">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {imagesData.map((img) => (
              <article
                key={img.id}
                className="relative bg-gray-100 overflow-hidden group cursor-pointer border border-gray-200 hover:border-gray-300 transition-colors"
                onClick={() => openImage(img)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openImage(img)}
                aria-label={`${img.title} — open`}
              >
                <div className="relative pt-[75%]">
                  <img
                    src={img.url}
                    alt={img.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-lg font-semibold text-white mb-1">{img.title}</h3>
                    <p className="text-sm text-white/90 line-clamp-2">{img.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Videos Carousel */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">Video Showcase</h2>
            <div className="flex gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className="p-2 border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} className="text-gray-700" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className="p-2 border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight size={20} className="text-gray-700" />
              </button>
            </div>
          </div>

          <div 
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
          >
            {videosData.map((video) => {
              const videoId = getYoutubeVideoId(video.url)
              const thumb = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : ''

              return (
                <button
                  key={video.url}
                  onClick={() => openVideo(video)}
                  className="group flex-shrink-0 w-80 bg-white border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label={`Play ${video.title}`}
                >
                  <div className="relative pt-[56.25%] bg-gray-100">
                    {thumb && (
                      <img
                        src={thumb}
                        alt={video.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 bg-red-600 group-hover:bg-red-700 flex items-center justify-center transition-colors shadow-lg">
                        <Play size={24} className="text-white ml-1" fill="white" />
                      </div>
                    </div>
                  </div>

                </button>
              )
            })}
          </div>
        </section>
      </div>

      {/* Modal */}
      {showModal && modalContent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div className="absolute inset-0 bg-black/80" />
          <div
            className="relative max-w-5xl w-full bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-base font-semibold text-gray-900">
                {modalContent.type === 'image'
                  ? (modalContent.payload as ImageItem).title
                  : (modalContent.payload as Video).title}
              </h3>
              <button
                ref={closeBtnRef}
                onClick={() => setShowModal(false)}
                aria-label="Close"
                className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
              >
                <X size={22} />
              </button>
            </div>

            <div className="p-6">
              {modalContent.type === 'image' ? (
                <>
                  <img
                    src={(modalContent.payload as ImageItem).url}
                    alt={(modalContent.payload as ImageItem).title}
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                  <div className="mt-6 text-gray-700">
                    <p className="text-base leading-relaxed">
                      {(modalContent.payload as ImageItem).description}
                    </p>
                  </div>
                </>
              ) : (
                <div className="relative pt-[56.25%]">
                  <iframe
                    title={(modalContent.payload as Video).title}
                    src={`https://www.youtube.com/embed/${
                      getYoutubeVideoId((modalContent.payload as Video).url)
                    }?autoplay=1`}
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
    </main>
  )
}

export default Gallery