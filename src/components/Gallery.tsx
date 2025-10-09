import React, { useState, useRef, useEffect } from 'react'
import { X, Play } from 'lucide-react'

const ACCENT = '#6b0f0f'

type Video = { url: string; title: string }
type ImageItem = { id: number; url: string; title: string; description: string }
type ModalContent = { type: 'image' | 'video'; payload: ImageItem | Video }

const videosData: Video[] = [
  { url: 'https://youtu.be/_KN_kmVpKAw?si=DJHNr9n1UEKjBx6V', title: 'Video 1' },
  { url: 'https://youtu.be/oW2yL_-I6kQ?si=jCoRkvxn_wEK6ZwA', title: 'Video 2' },
  { url: 'https://youtu.be/vciaokWg0D8?si=rDBnllOnv8cW4zDv', title: 'Video 3' },
  { url: 'https://youtu.be/05p11ZjnR_4?si=uByGWf-kYgkK4g_8', title: 'Video 4' },
  { url: 'https://youtu.be/O8mvsVuaqoQ?si=qw-kLgFdZJPFXWFw', title: 'Video 5' },
  { url: 'https://youtu.be/-eGwzZuRjDQ?si=Wm33pCgZ0DJnnwIY', title: 'Video 6' },
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
  // Handles youtu.be and youtube.com/watch?v= URLs
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/)
  if (shortMatch) return shortMatch[1]
  const longMatch = url.match(/v=([a-zA-Z0-9_-]{11})/)
  if (longMatch) return longMatch[1]
  return null
}

const Gallery: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState<ModalContent | null>(null)
  const [visibleVideos, setVisibleVideos] = useState(2)
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

  const handleLoadMore = () => {
    setVisibleVideos((v) => (v + 2 > videosData.length ? videosData.length : v + 2))
  }

  const renderVideoThumbnail = (video: Video) => {
    const videoId = getYoutubeVideoId(video.url)
    const thumb = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : ''

    return (
      <button
        key={video.url}
        onClick={() => openVideo(video)}
        className="group w-full text-left bg-white border border-gray-200 overflow-hidden relative focus:outline-none focus:ring-2 focus:ring-offset-1"
        aria-label={`Play ${video.title}`}
      >
        <div className="relative pt-[56.25%] bg-gray-50">
          {thumb && (
            <img
              src={thumb}
              alt={video.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
            />
          )}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.0), rgba(0,0,0,0.18))',
            }}
          >
            <div className="flex items-center gap-2 bg-white/90 px-3 py-2 rounded-md shadow-sm group-hover:scale-105 transition-transform">
              <Play size={18} color={ACCENT} />
              <span className="text-sm font-medium text-gray-900">{video.title}</span>
            </div>
          </div>
        </div>
      </button>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex items-center justify-center">
          <h1 className="text-6xl font-semibold text-gray-900 tracking-tight">Gallery</h1>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Videos */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 shadow-sm p-4 space-y-4 max-h-[72vh] overflow-y-auto">
              {videosData.slice(0, visibleVideos).map((video) => renderVideoThumbnail(video))}
              {visibleVideos < videosData.length && (
                <button
                  onClick={handleLoadMore}
                  className="w-full mt-2 py-3 bg-white border border-gray-200 text-gray-900 font-medium hover:bg-gray-50 transition"
                >
                  Load more videos
                </button>
              )}
            </div>
          </div>

          {/* Images */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-5">
            {imagesData.map((img) => (
              <article
                key={img.id}
                className="relative bg-gray-50 border border-gray-200 overflow-hidden group cursor-pointer"
                onClick={() => openImage(img)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openImage(img)}
                aria-label={`${img.title} — open`}
              >
                <div className="relative pt-[66.66%]">
                  <img
                    src={img.url}
                    alt={img.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/55 to-transparent p-3">
                    <h3 className="text-sm text-white font-semibold">{img.title}</h3>
                    <p className="text-xs text-white/90 mt-1 line-clamp-2">{img.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Modal */}
      {showModal && modalContent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          onClick={() => setShowModal(false)}
        >
          <div className="absolute inset-0 bg-black/70" />
          <div
            className="relative max-w-5xl w-full bg-white border border-gray-200 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 border-b border-gray-100">
              <div className="text-sm font-medium text-gray-900">
                {modalContent.type === 'image'
                  ? (modalContent.payload as ImageItem).title
                  : (modalContent.payload as Video).title}
              </div>
              <button
                ref={closeBtnRef}
                onClick={() => setShowModal(false)}
                aria-label="Close"
                className="p-2 text-gray-700 hover:text-gray-900"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4">
              {modalContent.type === 'image' ? (
                <>
                  <img
                    src={(modalContent.payload as ImageItem).url}
                    alt={(modalContent.payload as ImageItem).title}
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                  <div className="mt-4 text-gray-700">
                    <p className="text-base">
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
