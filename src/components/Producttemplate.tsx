/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { data as rawData } from '../Data'
import { ArrowLeft, ChevronLeft, ChevronRight, Mail, X } from 'lucide-react'
import Navbar from './Navbar'
import Footer from './Footer'

const BRAND = {
  primary: '#6b0f0f',
  hover: '#4f0b0b',
  border: 'rgba(107,15,15,0.08)',
}

/** Normalize many possible YouTube URL shapes to an embed URL. */
const getYouTubeEmbedUrl = (input?: string) => {
  if (!input) return ''
  const s = input.trim()
  if (s.includes('youtube.com/embed/')) {
    const m = s.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/)
    return m ? `https://www.youtube.com/embed/${m[1]}` : s
  }
  let m = s.match(/[?&]v=([a-zA-Z0-9_-]{11})/)
  if (m && m[1]) return `https://www.youtube.com/embed/${m[1]}`
  m = s.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/)
  if (m && m[1]) return `https://www.youtube.com/embed/${m[1]}`
  m = s.match(/\/(?:v|vi|embed)\/([a-zA-Z0-9_-]{11})/)
  if (m && m[1]) return `https://www.youtube.com/embed/${m[1]}`
  if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return `https://www.youtube.com/embed/${s}`
  return ''
}

function Producttemplate(): JSX.Element {
  const { id } = useParams()
  const navigate = useNavigate()

  // Build normalized product list from Data shape
  const allProducts = useMemo(() => {
    const out: any[] = []
    Object.entries(rawData || {}).forEach(([segment, subCategories]) => {
      Object.entries(subCategories || {}).forEach(([subCategory, products]) => {
        ;(products || []).forEach((p: any) => {
          const pid = (p.ProductName || p.product_name || p.name || '')
            .toString()
            .replace(/\s+/g, '-')
            .toLowerCase()
          out.push({
            __raw: p,
            id: pid,
            segment,
            subcategory: subCategory,
            name: p.ProductName || p.product_name || p.name || '',
            shortDescription: p.ShortDescription ?? p.short_description ?? '',
            description: p.ProductDescription ?? p.product_description ?? '',
            features:
              p.Features && typeof p.Features === 'string'
                ? p.Features.replace(/^\[|\]$/g, '').split(',').map((s: string) => s.trim()).filter(Boolean)
                : p.features || [],
            thumbnail: p.ThumbnailURL || p.thumbnail_url || p.Thumbnail || null,
            samplesRaw: p.CuttingSamplesURL || p.cutting_samples_url || p.samples || null,
            technicalRaw: p.TechnicalSpecifications || p.technical_specifications || p.technicalSpecifications || null,
            rawVideo: p.ProductVideoURL || p.product_video_url || p.youtube || p.youtube_url || p.video || null,
          })
        })
      })
    })
    return out
  }, [])

  // find product by id (id param expected to be slugified ProductName)
  const product = useMemo(() => allProducts.find(p => p.id === id) ?? null, [allProducts, id])

  // category / related products
  const segmentCategory = useMemo(() => {
    if (!product) return null
    return rawData[product.segment] || null
  }, [product])

  const subCategoryProducts = useMemo(() => {
    if (!product || !segmentCategory) return []
    return (segmentCategory[product.subcategory] || []).map((p: any) => ({
      id: (p.ProductName || '').toString().replace(/\s+/g, '-').toLowerCase(),
      ProductName: p.ProductName,
      ThumbnailURL: p.ThumbnailURL || p.Thumbnail || null,
    }))
  }, [product, segmentCategory])

  // parse gallery images array (CuttingSamplesURL is stored as JSON string in Data)
  const galleryImages: string[] = useMemo(() => {
    if (!product?.samplesRaw) return []
    const raw = product.samplesRaw
    try {
      const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw
      return Array.isArray(parsed) ? parsed.filter(Boolean) : []
    } catch {
      if (typeof raw === 'string') return raw.split(',').map(s => s.trim()).filter(Boolean)
      return []
    }
  }, [product])

  // PREVIEW IMAGES: only main/thumbnail image(s) — EXCLUSIVE from gallery
  const previewImages = useMemo(() => {
    const arr: string[] = []
    if (product?.thumbnail) arr.push(product.thumbnail)
    // optionally add other dedicated preview fields (e.g. product.image) if available:
    // if (product?.image && !arr.includes(product.image)) arr.push(product.image)
    return arr.filter(Boolean)
  }, [product])

  const topRef = useRef<HTMLDivElement | null>(null)
  const touchStartX = useRef<number | null>(null)
  const relatedScrollRef = useRef<HTMLDivElement | null>(null)

  // preview index (for hero thumbnails) and modal state (can open preview or gallery)
  const [previewIndex, setPreviewIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSource, setModalSource] = useState<'preview' | 'gallery'>('preview')
  const [modalIndex, setModalIndex] = useState(0)

  // track which content section is active (used by sticky tab nav)
  const [activeSection, setActiveSection] = useState<string>('description')
  
  const activeCount = (source: 'preview' | 'gallery') => (source === 'preview' ? previewImages.length : galleryImages.length)

  const prev = useCallback(() => {
    if (modalOpen) {
      const len = activeCount(modalSource)
      setModalIndex((s) => (len ? (s - 1 + len) % len : 0))
    } else {
      const len = previewImages.length
      setPreviewIndex((s) => (len ? (s - 1 + len) % len : 0))
    }
  }, [modalOpen, modalSource, previewImages.length, galleryImages.length])

  const next = useCallback(() => {
    if (modalOpen) {
      const len = activeCount(modalSource)
      setModalIndex((s) => (len ? (s + 1) % len : 0))
    } else {
      const len = previewImages.length
      setPreviewIndex((s) => (len ? (s + 1) % len : 0))
    }
  }, [modalOpen, modalSource, previewImages.length, galleryImages.length])

  const onTouchStart = (e: React.TouchEvent) => (touchStartX.current = e.touches[0].clientX)
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(delta) > 50) (delta > 0 ? prev() : next())
  }

  const scrollRelated = (direction: 'left' | 'right') => {
    if (!relatedScrollRef.current) return
    const el = relatedScrollRef.current
    const scrollAmount = el.clientWidth * 0.7 || 240
    el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
  }

  useLayoutEffect(() => {
    setPreviewIndex(0)
    setModalIndex(0)
    if (topRef.current) topRef.current.scrollIntoView({ behavior: 'auto', block: 'start' })
    else if (typeof window !== 'undefined') window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [id])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (modalOpen) {
        if (e.key === 'Escape') setModalOpen(false)
        if (e.key === 'ArrowLeft') prev()
        if (e.key === 'ArrowRight') next()
      } else {
        if (e.key === 'ArrowLeft') prev()
        if (e.key === 'ArrowRight') next()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next, modalOpen])

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current?.disconnect()
    observerRef.current = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible && visible.target instanceof HTMLElement) setActiveSection(visible.target.dataset.section || 'description')
      },
      { root: null, threshold: [0.35, 0.6], rootMargin: '-20% 0px -40% 0px' }
    )
    Object.values(sectionRefs.current).forEach(el => { if (el) observerRef.current?.observe(el) })
    return () => observerRef.current?.disconnect()
  }, [product, id])

  if (product === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <h2 className="text-2xl font-medium mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Product not found
          </h2>
          <p className="text-gray-500 mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            We couldn't find what you're looking for.
          </p>
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-gray-900 hover:gap-3 transition-all" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <ArrowLeft className="w-4 h-4" /> Go back
          </button>
        </div>
      </div>
    )
  }

  if (!product) return null // still loading

  // Build technical table structure:
  const technicalTable = useMemo(() => {
    const raw = product.technicalRaw
    if (!raw) return null
    let parsed: any = raw
    try { parsed = typeof raw === 'string' ? JSON.parse(raw) : raw } catch { /* keep raw */ }

    // If array of plain objects with common keys -> matrix table
    if (Array.isArray(parsed) && parsed.length > 0 && parsed.every(item => item && typeof item === 'object' && !Array.isArray(item))) {
      const headers = Array.from(new Set(parsed.flatMap((o: any) => Object.keys(o))))
      const rows = parsed.map((obj: any) => headers.map(h => obj[h] ?? ''))
      return { type: 'matrix' as const, headers, rows }
    }

    // If object -> key/value list
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      const rows = Object.entries(parsed).map(([k, v]) => [k.toString().replace(/_/g, ' '), String(v ?? '')])
      return { type: 'kv' as const, rows }
    }

    // fallback: array of primitives or single primitive -> kv rows
    if (Array.isArray(parsed)) {
      const rows = parsed.map((v: any, idx: number) => [`Item ${idx + 1}`, String(v)])
      return { type: 'kv' as const, rows }
    }

    return { type: 'kv' as const, rows: [['Specification', String(parsed)]] }
  }, [product.technicalRaw])

  // Tabs (always show these items in this order)
  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'technical', label: 'Technical Specification' },
    { id: 'video', label: 'Video' },
    { id: 'samples', label: 'Gallery' },
  ] as { id: string; label: string }[]

  const scrollToSection = (secId: string) => {
    const el = sectionRefs.current[secId]
    if (!el) return
    const NAV_OFFSET = 100
    const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
    window.scrollTo({ top: y, behavior: 'smooth' })
    setActiveSection(secId)
  }

  // embed url for video
  const videoEmbed = useMemo(() => getYouTubeEmbedUrl(product.rawVideo), [product.rawVideo])

  const features = product.features || []

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900" style={{ fontFamily: 'Inter, Montserrat, sans-serif' }}>
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <Navbar />
      </div>

      <aside className="hidden lg:block fixed left-6 top-28 z-50 max-h-[calc(100vh-7rem)]" aria-label="Related products">
        <div className="w-60 bg-white overflow-hidden text-sm text-gray-900" style={{ border: `1px solid ${BRAND.border}`, boxShadow: '0 6px 18px rgba(16,24,40,0.06)', borderRadius: 0 }}>
          <div className="h-12 flex items-center justify-between px-4" style={{ background: '#fff', color: BRAND.primary, fontWeight: 700, borderBottom: `1px solid ${BRAND.border}`, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            <div className="text-s ">{product.subcategory}</div>
          </div>

          <div className="px-3 py-3">
            <nav className="flex flex-col gap-2">
              {subCategoryProducts.filter((p: any) => p.id !== id).map((prod: any) => (
                <button key={prod.id} onClick={() => navigate(`/product/${prod.id}`)} title={prod.ProductName} className="group w-full text-left flex items-start gap-3 px-2 py-2 hover:bg-gray-50 transition" style={{ alignItems: 'flex-start', borderRadius: 0 }}>
                  <div style={{ minWidth: 10, height: 10, background: prod.id === id ? BRAND.primary : '#e6e6e6', marginTop: 8, border: `1px solid ${BRAND.border}` }} />
                  <div className="flex-1 min-w-0" style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                    <div className="text-sm font-medium" style={{ lineHeight: '1.15', color: '#111827' }}>{prod.ProductName}</div>
                  </div>
                  <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className={`w-4 h-4 ${prod.id === id ? 'text-gray-700' : 'text-gray-400'}`} />
                  </div>
                </button>
              ))}
            </nav>
          </div>

          <div className="px-3 py-3 border-t flex items-center gap-2" style={{ borderTop: `1px solid ${BRAND.border}`, background: '#fff' }}>
            <button onClick={() => window.open(`mailto:sales@example.com?subject=Quote%20request%20for%20${encodeURIComponent(product.name)}`)} className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-semibold" style={{ background: BRAND.primary, color: '#fff', padding: '8px 10px', border: `1px solid ${BRAND.border}`, borderRadius: 0, fontWeight: 700 }}>
              <Mail className="w-4 h-4" />
              Quote
            </button>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} title="Top" className="w-10 h-10 flex items-center justify-center" style={{ border: `1px solid ${BRAND.border}`, background: '#fff' }}>
              <ArrowLeft className="w-4 h-4 rotate-90 text-gray-600" />
            </button>
          </div>
        </div>
      </aside>

      <div ref={topRef} className={`max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 sm:pt-32 pb-20 lg:pl-60`}>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6 text-gray-700">
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-800 transition-colors">Back</button>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>

        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-12 items-start">
          {/* Gallery (preview only) */}
          <div className="space-y-4 bg-gray-50">
            <div className="relative bg-white overflow-hidden border aspect-[4/3] group cursor-pointer" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onClick={() => { if (previewImages.length) { setModalSource('preview'); setModalIndex(previewIndex); setModalOpen(true) } }} style={{ borderColor: BRAND.border, borderRadius: 0 }}>
              {previewImages[previewIndex] ? (
                <img src={previewImages[previewIndex]} alt={product.name} className="w-full h-full object-contain bg-white" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">No image</div>
              )}

              {previewImages.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); prev() }} aria-label="previous" className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 border flex items-center justify-center opacity-0 group-hover:opacity-100 transition" style={{ borderColor: BRAND.border, borderRadius: 0 }}>
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); next() }} aria-label="next" className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 border flex items-center justify-center opacity-0 group-hover:opacity-100 transition" style={{ borderColor: BRAND.border, borderRadius: 0 }}>
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail-only preview box (always shows the product thumbnail and is exclusive to gallery) */}
            <div className="mt-3">
              <div className="inline-block w-36 h-24 bg-white overflow-hidden border" style={{ borderColor: BRAND.border, borderRadius: 0 }}>
                {product.thumbnail ? (
                  <button
                    onClick={() => { setModalSource('preview'); setModalIndex(0); setModalOpen(true) }}
                    className="w-full h-full flex items-center justify-center"
                    aria-label="Open thumbnail preview"
                  >
                    <img src={product.thumbnail} alt={`${product.name} thumbnail`} className="w-full h-full object-contain" />
                  </button>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">No thumbnail</div>
                )}
              </div>
            </div>

            {previewImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {previewImages.map((img, idx) => (
                  <button key={idx} onClick={() => setPreviewIndex(idx)} className={`flex-shrink-0 w-20 h-20 bg-white overflow-hidden border ${idx === previewIndex ? '' : 'hover:opacity-90'}`} style={{ borderColor: BRAND.border, borderRadius: 0 }}>
                    <img src={img} alt="" className="w-full h-full bg-white  object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="flex flex-col">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">{product.shortDescription}</p>

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
              <button onClick={() => window.open(`mailto:sales@example.com?subject=Quote%20request%20for%20${encodeURIComponent(product.name)}`)} className="inline-flex w-full justify-center items-center gap-2 text-white px-5 py-3" style={{ background: BRAND.primary, border: `1px solid ${BRAND.border}`, fontWeight: 700, borderRadius: 0 }}>
                <Mail className="w-4 h-4" />
                Request Quote
              </button>
            </div>
          </div>
        </div>

        {/* Mobile related products - arrows + scroller */}
        {subCategoryProducts && subCategoryProducts.length > 1 && (
          <div className="lg:hidden mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs uppercase text-gray-700 font-semibold">Related</h3>
              <div className="flex gap-2">
                <button onClick={() => scrollRelated('left')} className="w-9 h-9 flex items-center justify-center border bg-white" aria-label="scroll left" style={{ borderColor: BRAND.border }}>
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
                <button onClick={() => scrollRelated('right')} className="w-9 h-9 flex items-center justify-center border bg-white" aria-label="scroll right" style={{ borderColor: BRAND.border }}>
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div ref={relatedScrollRef} className="flex gap-3 overflow-x-auto pb-2">
              {subCategoryProducts.filter((p: any) => p.id !== id).map((prod: any) => (
                <button key={prod.id} onClick={() => navigate(`/product/${prod.id}`)} className="flex-shrink-0 w-44 border p-3 text-left" style={{ borderColor: BRAND.border, background: '#fff' }}>
                  <div className="text-sm font-semibold text-gray-900 leading-tight" style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{prod.ProductName}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sticky section nav */}
        <div className="sticky top-16 md:top-20 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-30 mb-8">
          <div className="flex justify-center">
            <div className="flex gap-6 overflow-x-auto py-3 px-4">
              {tabs.map(t => (
                <button key={t.id} onClick={() => scrollToSection(t.id)} className={`text-sm font-semibold uppercase tracking-wide pb-1 transition ${activeSection === t.id ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-800 hover:text-gray-600'}`}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="w-full space-y-12">
          <section ref={el => (sectionRefs.current['description'] = el || null)} data-section="description" id="description" className="bg-white p-6 border" style={{ borderColor: BRAND.border, borderRadius: 0 }}>
            <h2 className="text-lg uppercase text-gray-700 mb-4 font-semibold">Description</h2>
            <p className="text-base text-gray-800 leading-relaxed">{product.description || product.shortDescription}</p>
          </section>

          <section ref={el => (sectionRefs.current['technical'] = el || null)} data-section="technical" id="technical" className="bg-white p-6 border overflow-auto" style={{ borderColor: BRAND.border, borderRadius: 0 }}>
            <h2 className="text-lg uppercase text-gray-700 mb-4 font-semibold">Technical Specification</h2>

            {/* matrix table for objects with same headers */}
            {technicalTable?.type === 'matrix' ? (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      {technicalTable.headers.map((h, i) => (
                        <th key={i} className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">{h.toString().replace(/_/g, ' ')}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {technicalTable.rows.map((row, rIdx) => (
                      <tr key={rIdx} className={rIdx % 2 ? 'bg-white' : 'bg-white'}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="py-3 px-4 align-top text-sm text-gray-900 whitespace-pre-wrap">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : technicalTable?.type === 'kv' ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <tbody>
                    {technicalTable.rows.map(([k, v], i) => (
                      <tr key={i} className="border-t border-gray-100">
                        <td className="py-3 pr-6 align-top text-sm text-gray-700 uppercase tracking-wide font-medium" style={{ width: '40%' }}>{k}</td>
                        <td className="py-3 pl-6 text-sm font-semibold text-gray-900 whitespace-pre-wrap">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600">Technical specifications are not available for this product.</p>
            )}
          </section>

          {videoEmbed ? (
            <section ref={el => (sectionRefs.current['video'] = el || null)} data-section="video" id="video" className="bg-white p-6 border" style={{ borderColor: BRAND.border, borderRadius: 0 }}>
              <h2 className="text-lg uppercase text-gray-700 mb-4 font-semibold">Product Video</h2>
              <div className="bg-black aspect-video overflow-hidden">
                <iframe src={videoEmbed} title={`${product.name} Video`} className="w-full h-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
            </section>
          ) : null}

          {galleryImages.length > 0 && (
            <section ref={el => (sectionRefs.current['samples'] = el || null)} data-section="samples" id="samples" className="bg-white p-6 border" style={{ borderColor: BRAND.border, borderRadius: 0 }}>
              <h2 className="text-lg uppercase text-gray-700 mb-4 font-semibold">Cutting Samples</h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {galleryImages.map((src, i) => (
                  <button key={i} onClick={() => { setModalSource('gallery'); setModalIndex(i); setModalOpen(true) }} className="aspect-square bg-white overflow-hidden border hover:shadow-sm transition" style={{ borderColor: BRAND.border }}>
                    <img src={src} alt={`${product.name} ${i + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Image modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-white/90 z-50 flex items-center justify-center p-4" onClick={() => setModalOpen(false)}>
          <button onClick={() => setModalOpen(false)} className="absolute bg-black top-6 right-6 w-10 h-10 flex items-center justify-center" aria-label="close" style={{ border: `1px solid ${BRAND.border}` }}>
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="relative max-w-6xl w-full" onClick={e => e.stopPropagation()}>
            {modalSource === 'gallery' ? (
              <img src={galleryImages[modalIndex]} alt={`${product.name} image ${modalIndex + 1}`} className="w-full h-auto max-h-[85vh] object-contain" />
            ) : (
              <img src={previewImages[modalIndex]} alt={`${product.name} preview ${modalIndex + 1}`} className="w-full h-auto max-h-[85vh] object-contain" />
            )}

            {activeCount(modalSource) > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); prev() }} className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black" style={{  border: `1px solid ${BRAND.border}` }}>
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); next() }} className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black" style={{ border: `1px solid ${BRAND.border}` }}>
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black text-sm text-white" style={{ border: `1px solid ${BRAND.border}` }}>
                  {modalIndex + 1} / {activeCount(modalSource)}
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
