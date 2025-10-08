import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CATEGORIES } from '../Data'
import { ArrowLeft, ChevronLeft, ChevronRight, Mail, X } from 'lucide-react'
import Navbar from './Navbar'
import Footer from './Footer'


const getYouTubeEmbedUrl = (url) => {
  if (!url) return '';
  const match = url.match(/(?:youtu\.be\/|v=)([^&?/]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : '';
};

function Producttemplate(): JSX.Element {
  const { id } = useParams()
  const navigate = useNavigate()

  const product = useMemo(
    () => CATEGORIES.flatMap((c) => c.products).find((p) => p.id === id),
    [id]
  ) as any
  
  const category = useMemo(
    () => CATEGORIES.find((c) => c.products.some((p) => p.id === id)),
    [id]
  )

  const topRef = useRef<HTMLDivElement | null>(null)
  const touchStartX = useRef<number | null>(null)
  const relatedScrollRef = useRef<HTMLDivElement | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeSection, setActiveSection] = useState<string>('overview')
  const [isImageExpanded, setIsImageExpanded] = useState(false)

  const allImages: string[] = useMemo(
    () => [product?.image, ...(product?.samples || [])].filter(Boolean),
    [product]
  )

  const prev = useCallback(
    () => setSelectedImage((s) => (allImages.length ? (s - 1 + allImages.length) % allImages.length : 0)),
    [allImages.length]
  )
  
  const next = useCallback(
    () => setSelectedImage((s) => (allImages.length ? (s + 1) % allImages.length : 0)),
    [allImages.length]
  )

  const onTouchStart = (e: React.TouchEvent) => (touchStartX.current = e.touches[0].clientX)
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(delta) > 50) (delta > 0 ? prev() : next())
  }

  const scrollRelated = (direction: 'left' | 'right') => {
    if (relatedScrollRef.current) {
      const scrollAmount = 280
      relatedScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  useLayoutEffect(() => {
    setSelectedImage(0)
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'auto', block: 'start' })
    } else if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }, [id])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isImageExpanded) {
        if (e.key === 'Escape') setIsImageExpanded(false)
        if (e.key === 'ArrowLeft') prev()
        if (e.key === 'ArrowRight') next()
      } else {
        if (e.key === 'ArrowLeft') prev()
        if (e.key === 'ArrowRight') next()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next, isImageExpanded])

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current?.disconnect()
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible && visible.target instanceof HTMLElement) {
          setActiveSection(visible.target.dataset.section || 'overview')
        }
      },
      { root: null, threshold: [0.35, 0.6], rootMargin: '-20% 0px -40% 0px' }
    )

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observerRef.current?.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [product, id])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <h2 className="text-2xl font-medium mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>Product not found</h2>
          <p className="text-gray-500 mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>We couldn't find what you're looking for.</p>
          <button 
            onClick={() => navigate(-1)} 
            className="inline-flex items-center gap-2 text-gray-900 hover:gap-3 transition-all"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <ArrowLeft className="w-4 h-4" /> Go back
          </button>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    product.technicalParameters && { id: 'technical', label: 'Specifications' },
    product.reliability && { id: 'reliability', label: 'Reliability' },
    product.safety && { id: 'safety', label: 'Safety' },
    product.video && { id: 'video', label: 'Video' },
    product.samples && product.samples.length && { id: 'samples', label: 'Gallery' },
  ].filter(Boolean) as { id: string; label: string }[]

  const scrollToSection = (secId: string) => {
    const el = sectionRefs.current[secId]
    if (el) {
      const NAV_OFFSET = 100
      const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
      window.scrollTo({ top: y, behavior: 'smooth' })
      setActiveSection(secId)
    }
  }

  const features = product.features || []

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <Navbar />

      <div ref={topRef} className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 sm:pt-32 pb-20">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-12 text-black">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-black transition-colors"
          >
            Back
          </button>
          <span className="text-gray-300">/</span>
          <span className="text-black font-medium">{product.name}</span>
        </div>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-24">
          
          {/* Image Gallery */}
          <div className="space-y-3">
            <div 
              className="relative aspect-[4/3] bg-gray-50 border border-black/10 rounded-xl overflow-hidden group cursor-pointer"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              onClick={() => setIsImageExpanded(true)}
            >
              {allImages[selectedImage] ? (
                <img 
                  src={allImages[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-contain "
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-black">
                  No image
                </div>
              )}

              {allImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prev(); }}
                    className="absolute left-4 rounded-2xl top-1/2 -translate-y-1/2 w-10 h-10 bg-black/10 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); next(); }}
                    className="absolute rounded-2xl right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/10 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 bg-neutral-50 overflow-hidden transition-all ${
                      idx === selectedImage ? 'ring-[0.5px] rounded-2xl ring-black ring-inset' : 'opacity-40 hover:opacity-70'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover overflow-hidden" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between lg:pt-4">
            <div className=''>
              {category?.name && (
                <p className="w-fit p-1.5 -mt-2 rounded-2xl text-xs bg-red-100  tracking-wider uppercase text-black mb-4 ">
                  {category.name}
                </p>
              )}
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6 leading-[1.15]">
                {product.name}
              </h1>
              
              <p className="text-gray-800 leading-[1.75] mb-8 ">
                {product.description}
              </p>

              {features && features.length > 0 && (
                <div className="space-y-2.5 mb-10 pb-10 border-b border-gray-200">
                  <h3 className="text-lg  uppercase text-black mb-4">Key Features</h3>
                  {features.slice(0, 4).map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-black leading-[1.6] ">{feature}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => window.open(`mailto:sales@example.com?subject=Quote%20request%20for%20${encodeURIComponent(product.name)}`)}
              className="group w-fit sm:w-fit rounded-xl inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg text-sm"
            >
              <Mail className="w-4 h-4" />
              <span className="font-semibold">Request Quote</span>
            </button>
          </div>
        </div>

        {/* Related Products Carousel */}
        {category && category.products.length > 1 && (
          <div className="mb-24 relative">
            <h3 className="text-s tracking-wider uppercase text-gray-900 mb-6">Related Products</h3>
            <div className="relative group">
              <div ref={relatedScrollRef} className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide scroll-smooth">
                {category.products
                  .filter((p) => p.id !== id)
                  .map((prod) => (
                    <button
                      key={prod.id}
                      onClick={() => navigate(`/product/${prod.id}`)}
                      className="flex-shrink-0 w-56 group/item text-left"
                    >
                      <div className="aspect-[4/3] bg-neutral-50 overflow-hidden border rounded-lg mb-3">
                        <img 
                          src={prod.image} 
                          alt={prod.name}
                          className="w-full h-full object-contain group-hover/item:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <p className="text-sm text-black font-medium group-hover/item:text-red-600 transition-colors line-clamp-2">
                        {prod.name}
                      </p>
                    </button>
                  ))}
              </div>
              {category.products.length > 3 && (
                <>
                  <button
                    onClick={() => scrollRelated('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => scrollRelated('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Sticky Navigation */}
        <div className="sticky top-16 md:top-20 bg-white/95 backdrop-blur-lg border-b border-gray-200 -mx-5 sm:-mx-8 lg:-mx-12 px-5 sm:px-8 lg:px-12 py-4 z-30 mb-16">
          <div className="flex gap-8 overflow-x-auto scrollbar-hide">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => scrollToSection(t.id)}
                className={`flex-shrink-0 text-sm font-semibold uppercase tracking-wide pb-1 transition-colors ${
                  activeSection === t.id
                    ? 'text-red-600 border-b-2 border-red-600'
                    : 'text-black hover:text-gray-500'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl space-y-16">
          
          <section
            ref={(el) => (sectionRefs.current['overview'] = el || null)}
            data-section="overview"
            id="overview"
            className="bg-white rounded-lg p-8 border border-gray-200"
          >
            <h2 className="text-lg bg-gray-100 rounded-lg  p-2 w-fit uppercase text-gray-700 mb-6 font-semibold">Overview</h2>
            <p className="text-base text-black leading-[1.8] font-normal">
              {product.detailedDescription || product.description}
            </p>
          </section>

          {product.technicalParameters && Object.keys(product.technicalParameters).length > 0 && (
            <section
              ref={(el) => (sectionRefs.current['technical'] = el || null)}
              data-section="technical"
              id="technical"
              className="bg-white p-8 rounded-lg border border-gray-200"
            >
            <h2 className="text-lg bg-gray-100 rounded-lg p-2 w-fit uppercase text-gray-700 mb-6 font-semibold">Specifications</h2>
              <div className="space-y-4">
                {Object.entries(product.technicalParameters as Record<string, string>).map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-8 pb-4 border-b border-gray-200">
                    <span className="text-sm text-gray-700 uppercase tracking-wide font-medium">{k.replace(/_/g, ' ')}</span>
                    <span className="text-sm font-semibold text-black text-right">{String(v)}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {product.reliability && (
            <section
              ref={(el) => (sectionRefs.current['reliability'] = el || null)}
              data-section="reliability"
              id="reliability"
              className="bg-white p-8 rounded-lg border border-gray-200"
            >
            <h2 className="text-lg bg-gray-100 rounded-lg p-2 w-fit uppercase text-gray-700 mb-6 font-semibold">Reliability</h2>
              <p className="text-base text-black leading-[1.8] font-normal">{product.reliability}</p>
            </section>
          )}

          {product.safety && (
            <section
              ref={(el) => (sectionRefs.current['safety'] = el || null)}
              data-section="safety"
              id="safety"
              className="bg-white p-8 rounded-lg border border-gray-200"
            >
            <h2 className="text-lg bg-gray-100 rounded-lg p-2 w-fit uppercase text-gray-700 mb-6 font-semibold">Safety</h2>
              <p className="text-base text-black leading-[1.8] font-normal">{product.safety}</p>
            </section>
          )}

          {product.video && (
            <section
              ref={(el) => (sectionRefs.current['video'] = el || null)}
              data-section="video"
              id="video"
              className="!max-w-none bg-white p-8 rounded-lg border border-gray-200"
            >
            <h2 className="text-lg bg-gray-100 rounded-lg  p-2 w-fit uppercase text-gray-700 mb-6 font-semibold">Video</h2>
            <div className="bg-black aspect-video rounded-lg overflow-hidden">
      <iframe
        src={getYouTubeEmbedUrl(product.video)}
        title={`${product.name} Video`}
        className="w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>


            </section>
          )}

          {allImages.length > 0 && (
            <section
              ref={(el) => (sectionRefs.current['samples'] = el || null)}
              data-section="samples"
              id="samples"
              className="!max-w-none bg-white p-8 rounded-lg border border-gray-200"
            >
            <h2 className="text-lg bg-gray-100 rounded-lg p-2 w-fit uppercase text-gray-700 mb-6 font-semibold">Gallery</h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {allImages.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedImage(i)
                      setIsImageExpanded(true)
                    }}
                    className="aspect-square bg-neutral-50 overflow-hidden hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={src}
                      alt={`${product.name} ${i + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Image Expanded Modal */}
      {isImageExpanded && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setIsImageExpanded(false)}
        >
          <button
            onClick={() => setIsImageExpanded(false)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-6xl w-full">
            <img
              src={allImages[selectedImage]}
              alt={product.name}
              className="w-full h-auto max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur flex items-center justify-center text-white transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur flex items-center justify-center text-white transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/20 backdrop-blur text-white text-sm rounded-full">
                  {selectedImage + 1} / {allImages.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Producttemplate