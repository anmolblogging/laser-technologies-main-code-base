import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CATEGORIES } from '../Data'
import { ArrowLeft, ChevronLeft, ChevronRight, Mail, X } from 'lucide-react'
import Navbar from './Navbar'
import Footer from './Footer'

const BRAND = {
  primary: '#6b0f0f', // reddish-black accent
  hover: '#4f0b0b',
  border: 'rgba(107,15,15,0.08)',
}

const getYouTubeEmbedUrl = (url: string | undefined) => {
  if (!url) return ''
  const match = url.match(/(?:youtu\.be\/|v=)([^&?/]+)/)
  return match ? `https://www.youtube.com/embed/${match[1]}` : ''
}

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

  const allImages: string[] = useMemo(() => [product?.image, ...(product?.samples || [])].filter(Boolean), [product])

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
      const scrollAmount = 240
      relatedScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
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
          <h2 className="text-2xl font-medium mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Product not found
          </h2>
          <p className="text-gray-500 mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            We couldn't find what you're looking for.
          </p>
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

  // fixed sidebar width -> main content padding must match sidebar width (w-60 = 15rem)
  const mainLeftPaddingClass = 'lg:pl-60'

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
    <div className="min-h-screen bg-gray-50 text-gray-900" style={{ fontFamily: 'Inter, Montserrat, sans-serif' }}>
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <Navbar />
      </div>

      {/* Desktop sidebar - fixed width, height auto up to viewport, no rounded corners, light themed */}
      <aside
        className="hidden lg:block fixed left-6 top-28 z-50 max-h-[calc(100vh-7rem)]"
        aria-label="Related products"
      >
        <div
          className="w-60 bg-white overflow-hidden text-sm text-gray-900"
          style={{
            border: `1px solid ${BRAND.border}`,
            boxShadow: '0 6px 18px rgba(16,24,40,0.06)',
            borderRadius: 0,
          }}
        >
          <div
            className="h-12 flex items-center justify-between px-4"
            style={{
              background: '#fff',
              color: BRAND.primary,
              fontWeight: 700,
              borderBottom: `1px solid ${BRAND.border}`,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            {/* <div className="text-xs">Related Products</div> */}
            <div className="text-s ">{category?.name || ''}</div>
          </div>

          <div className="px-3 py-3">
            <nav className="flex flex-col gap-2">
              {category?.products
                .filter((p) => p.id !== id)
                .map((prod: any) => (
                  <button
                    key={prod.id}
                    onClick={() => navigate(`/product/${prod.id}`)}
                    title={prod.name}
                    className="group w-full text-left flex items-start gap-3 px-2 py-2 hover:bg-gray-50 transition"
                    style={{ alignItems: 'flex-start', borderRadius: 0 }}
                  >
                    {/* removed serial number; small square indicator instead */}
                    <div
                      style={{
                        minWidth: 10,
                        height: 10,
                        background: prod.id === id ? BRAND.primary : '#e6e6e6',
                        marginTop: 8,
                        border: `1px solid ${BRAND.border}`,
                      }}
                    />

                    <div className="flex-1 min-w-0" style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                      <div className="text-sm font-medium" style={{ lineHeight: '1.15', color: '#111827' }}>{prod.name}</div>
                      {/* <div className="text-xs text-gray-500 mt-0.5" style={{ lineHeight: '1.1' }}>{prod.subcategory || ''}</div> */}
                    </div>

                    <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className={`w-4 h-4 ${prod.id === id ? 'text-gray-700' : 'text-gray-400'}`} />
                    </div>
                  </button>
                ))}
            </nav>
          </div>

          <div className="px-3 py-3 border-t flex items-center gap-2" style={{ borderTop: `1px solid ${BRAND.border}`, background: '#fff' }}>
            <button
              onClick={() => window.open(`mailto:sales@example.com?subject=Quote%20request%20for%20${encodeURIComponent(product.name)}`)}
              className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-semibold"
              style={{
                background: BRAND.primary,
                color: '#fff',
                padding: '8px 10px',
                border: `1px solid ${BRAND.border}`,
                borderRadius: 0,
                fontWeight: 700,
              }}
            >
              <Mail className="w-4 h-4" />
              Quote
            </button>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              title="Top"
              className="w-10 h-10 flex items-center justify-center"
              style={{ border: `1px solid ${BRAND.border}`, background: '#fff' }}
            >
              <ArrowLeft className="w-4 h-4 rotate-90 text-gray-600" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div ref={topRef} className={`max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 sm:pt-32 pb-20 ${mainLeftPaddingClass}`}>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6 text-gray-700">
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-800 transition-colors">
            Back
          </button>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>

        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-12 items-start">
          {/* Gallery */}
          <div className="space-y-4">
            <div
              className="relative bg-white overflow-hidden border aspect-[4/3] group cursor-pointer"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              onClick={() => setIsImageExpanded(true)}
              style={{ borderColor: BRAND.border, borderRadius: 0 }}
            >
              {allImages[selectedImage] ? (
                <img src={allImages[selectedImage]} alt={product.name} className="w-full h-full object-contain bg-white" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">No image</div>
              )}

              {allImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prev()
                    }}
                    aria-label="previous"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 border flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                    style={{ borderColor: BRAND.border, borderRadius: 0 }}
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      next()
                    }}
                    aria-label="next"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 border flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                    style={{ borderColor: BRAND.border, borderRadius: 0 }}
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                </>
              )}
            </div>

            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 bg-white overflow-hidden border ${idx === selectedImage ? '' : 'opacity-60 hover:opacity-90'}`}
                    style={{ borderColor: BRAND.border, borderRadius: 0 }}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="flex flex-col">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">{product.name}</h1>

            <p className="text-gray-700 mb-6 text-lg leading-relaxed">{product.description}</p>

            {features && features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm uppercase text-gray-600 mb-3 font-semibold">Key Features</h3>
                <ul className="grid grid-cols-1 gap-2">
                  {features.slice(0, 6).map((f: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-800">
                      <span style={{ marginTop: 6, width: 8, height: 8, background: BRAND.primary, display: 'inline-block' }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-auto flex flex-wrap gap-3">
              <button
                onClick={() =>
                  window.open(`mailto:sales@example.com?subject=Quote%20request%20for%20${encodeURIComponent(product.name)}`)
                }
                className="inline-flex w-full justify-center items-center gap-2 text-white px-5 py-3"
                style={{
                  background: BRAND.primary,
                  border: `1px solid ${BRAND.border}`,
                  fontWeight: 700,
                  borderRadius: 0,
                }}
              >
                <Mail className="w-4 h-4" />
                Request Quote
              </button>

              {/* "Learn more" removed as requested */}
            </div>
          </div>
        </div>

        {/* Mobile related products - card scroller with arrows */}
        {category && category.products.length > 1 && (
          <div className="lg:hidden mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs uppercase text-gray-700 font-semibold">Related</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => scrollRelated('left')}
                  className="w-9 h-9 flex items-center justify-center border bg-white"
                  aria-label="scroll left"
                  style={{ borderColor: BRAND.border }}
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => scrollRelated('right')}
                  className="w-9 h-9 flex items-center justify-center border bg-white"
                  aria-label="scroll right"
                  style={{ borderColor: BRAND.border }}
                >
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div ref={relatedScrollRef} className="flex gap-3 overflow-x-auto pb-2">
              {category.products
                .filter((p) => p.id !== id)
                .map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => navigate(`/product/${prod.id}`)}
                    className="flex-shrink-0 w-44 border p-3 text-left"
                    style={{ borderColor: BRAND.border, background: '#fff' }}
                  >
                    <div className="text-sm font-semibold text-gray-900 leading-tight" style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{prod.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{prod.subcategory || ''}</div>
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Sticky section nav */}
        <div className="sticky top-16 md:top-20 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-30 mb-8">
          <div className="flex justify-center">
            <div className="flex gap-6 overflow-x-auto py-3 px-4">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => scrollToSection(t.id)}
                  className={`text-sm font-semibold uppercase tracking-wide pb-1 transition ${
                    activeSection === t.id ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-800 hover:text-gray-600'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="w-full space-y-12">
          <section
            ref={(el) => (sectionRefs.current['overview'] = el || null)}
            data-section="overview"
            id="overview"
            className="bg-white p-6 border"
            style={{ borderColor: BRAND.border, borderRadius: 0 }}
          >
            <h2 className="text-lg uppercase text-gray-700 mb-4 font-semibold">Overview</h2>
            <p className="text-base text-gray-800 leading-relaxed">{product.detailedDescription || product.description}</p>
          </section>

          {product.technicalParameters && Object.keys(product.technicalParameters).length > 0 && (
            <section
              ref={(el) => (sectionRefs.current['technical'] = el || null)}
              data-section="technical"
              id="technical"
              className="bg-white p-6 border"
              style={{ borderColor: BRAND.border, borderRadius: 0 }}
            >
              <h2 className="text-lg uppercase text-gray-700 mb-4 font-semibold">Specifications</h2>
              <div className="space-y-3">
                {Object.entries(product.technicalParameters as Record<string, string>).map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-4">
                    <span className="text-sm text-gray-700 uppercase tracking-wide font-medium">{k.replace(/_/g, ' ')}</span>
                    <span className="text-sm font-semibold text-gray-900 text-right">{String(v)}</span>
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
              className="bg-white p-6 border"
              style={{ borderColor: BRAND.border, borderRadius: 0 }}
            >
              <h2 className="text-lg uppercase text-gray-700 mb-4 font-semibold">Reliability</h2>
              <p className="text-base text-gray-800 leading-relaxed">{product.reliability}</p>
            </section>
          )}

          {product.safety && (
            <section
              ref={(el) => (sectionRefs.current['safety'] = el || null)}
              data-section="safety"
              id="safety"
              className="bg-white p-6 border"
              style={{ borderColor: BRAND.border, borderRadius: 0 }}
            >
              <h2 className="text-lg uppercase text-gray-700 mb-4 font-semibold">Safety</h2>
              <p className="text-base text-gray-800 leading-relaxed">{product.safety}</p>
            </section>
          )}

          {product.video && (
            <section
              ref={(el) => (sectionRefs.current['video'] = el || null)}
              data-section="video"
              id="video"
              className="bg-white p-6 border"
              style={{ borderColor: BRAND.border, borderRadius: 0 }}
            >
              <h2 className="text-lg uppercase text-gray-700 mb-4 font-semibold">Video</h2>
              <div className="bg-black aspect-video overflow-hidden">
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
              className="bg-white p-6 border"
              style={{ borderColor: BRAND.border, borderRadius: 0 }}
            >
              <h2 className="text-lg uppercase text-gray-700 mb-4 font-semibold">Gallery</h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {allImages.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedImage(i)
                      setIsImageExpanded(true)
                    }}
                    className="aspect-square bg-white overflow-hidden border hover:shadow-sm transition"
                    style={{ borderColor: BRAND.border }}
                  >
                    <img src={src} alt={`${product.name} ${i + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Image modal */}
      {isImageExpanded && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setIsImageExpanded(false)}>
          <button
            onClick={() => setIsImageExpanded(false)}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center"
            aria-label="close"
            style={{ background: '#fff', border: `1px solid ${BRAND.border}` }}
          >
            <X className="w-5 h-5 text-gray-800" />
          </button>
          <div className="relative max-w-6xl w-full">
            <img src={allImages[selectedImage]} alt={product.name} className="w-full h-auto max-h-[85vh] object-contain" onClick={(e) => e.stopPropagation()} />
            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    prev()
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center"
                  style={{ background: '#fff', border: `1px solid ${BRAND.border}` }}
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    next()
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center"
                  style={{ background: '#fff', border: `1px solid ${BRAND.border}` }}
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-sm text-gray-800" style={{ border: `1px solid ${BRAND.border}` }}>
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