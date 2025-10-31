/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight, Mail, X, Maximize2 } from 'lucide-react'
import Loading from './Loading';
import { supabase } from "../lib/supabase";

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

  const [rawProduct, setRawProduct] = useState<any | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [previewIndex, setPreviewIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSource, setModalSource] = useState<'preview' | 'gallery'>('preview')
  const [modalIndex, setModalIndex] = useState(0)

  const [activeSection, setActiveSection] = useState<string>('description')
  const topRef = useRef<HTMLDivElement | null>(null)
  const touchStartX = useRef<number | null>(null)
  const relatedScrollRef = useRef<HTMLDivElement | null>(null)
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    if (!id) return
    setLoading(true)
    const fetchData = async () => {
      try {
        const { data: prodData, error: prodError } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single()

        if (prodError || !prodData) {
          setRawProduct(null)
          setRelatedProducts([])
          setLoading(false)
          return
        }

        setRawProduct(prodData)

        const { data: related, error: relatedError } = await supabase
          .from('products')
          .select('id, ProductName, Thumbnail_url, SubCategory, Segment')
          .eq('Segment', prodData.Segment)
          .eq('SubCategory', prodData.SubCategory)
          .neq('id', prodData.id)

        setRelatedProducts(related || [])
      } catch (err) {
        console.error('Fetch product error', err)
        setRawProduct(null)
        setRelatedProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const product = useMemo(() => {
    const p = rawProduct
    if (!p) return null

    const thumbnailCandidates = [
      p.Thumbnail_url,
      p.ThumbnailURL,
      p.thumbnail_url,
      p.thumbnail,
      p.Thumbnail,
    ]
    const thumbnail = thumbnailCandidates.find(Boolean) || null

    let samplesRaw = p.CuttingSamplesURL ?? p.Cutting_Samples_URL ?? p.cutting_samples_url ?? p.cuttingSamplesUrl ?? p.CuttingSamples ?? null
    if (typeof samplesRaw === 'string') {
      try { samplesRaw = JSON.parse(samplesRaw) } catch { /* keep string */ }
    }

    let technicalRaw = p.TechnicalSpecifications ?? p.technical_specifications ?? p.technicalSpecifications ?? p.TechnicalSpecs ?? p.Technical_Specs ?? null
    if (typeof technicalRaw === 'string') {
      try { technicalRaw = JSON.parse(technicalRaw) } catch { /* keep string */ }
    }

    let featuresRaw: string[] = []
    if (Array.isArray(p.Features)) featuresRaw = p.Features
    else if (typeof p.Features === 'string') {
      const s = p.Features.trim()
      try {
        const parsed = JSON.parse(s)
        if (Array.isArray(parsed)) featuresRaw = parsed.map(String)
        else featuresRaw = s.replace(/^\[|\]$/g, '').split(',').map((x:string)=>x.trim()).filter(Boolean)
      } catch {
        featuresRaw = s.replace(/^\[|\]$/g, '').split(',').map((x:string)=>x.trim()).filter(Boolean)
      }
    } else if (Array.isArray(p.features)) featuresRaw = p.features
    else featuresRaw = []

    const rawVideo = p.ProductVideoURL ?? p.product_video_url ?? p.youtube ?? p.youtube_url ?? p.video ?? null

    return {
      __raw: p,
      id: p.id,
      segment: p.Segment ?? p.segment ?? '',
      subcategory: p.SubCategory ?? p.Subcategory ?? p.sub_category ?? p.SubCategory ?? '',
      name: (p.ProductName ?? p.product_name ?? p.name ?? '').toString(),
      shortDescription: (p.ShortDescription ?? p.short_description ?? p.Short_Description ?? p.shortDescription ?? '').toString(),
      descriptionRaw: p.Description ?? p.description ?? p.ProductDescription ?? p.product_description ?? null,
      features: featuresRaw,
      thumbnail,
      samplesRaw,
      technicalRaw,
      rawVideo,
    }
  }, [rawProduct])

  const galleryImages: string[] = useMemo(() => {
    if (!product?.samplesRaw) return []
    const raw = product.samplesRaw
    try {
      const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw
      return Array.isArray(parsed) ? parsed.filter(Boolean) : []
    } catch {
      if (typeof raw === 'string') return raw.split(',').map((s:string) => s.trim()).filter(Boolean)
      return Array.isArray(raw) ? raw.filter(Boolean) : []
    }
  }, [product?.samplesRaw])

  const previewImages = useMemo(() => {
    const arr: string[] = []
    if (product?.thumbnail) arr.push(product.thumbnail)
    return arr.filter(Boolean)
  }, [product?.thumbnail])

  const features = useMemo<string[]>(() => (Array.isArray(product?.features) ? product!.features : []), [product])

  const technicalTable = useMemo(() => {
    const raw = product?.technicalRaw
    if (!raw) return null
    let parsed: any = raw
    try { parsed = typeof raw === 'string' ? JSON.parse(raw) : raw } catch {}
    if (Array.isArray(parsed) && parsed.length > 0 && parsed.every(item => item && typeof item === 'object' && !Array.isArray(item))) {
      const headers = Array.from(new Set(parsed.flatMap((o: any) => Object.keys(o))))
      const rows = parsed.map((obj: any) => headers.map((h: string) => {
        const v = obj[h]
        if (Array.isArray(v)) return v.join(', ')
        if (v === null || v === undefined) return ''
        return String(v)
      }))
      return { type: 'matrix' as const, headers, rows }
    }
    if (Array.isArray(parsed)) {
      return { type: 'kv' as const, rows: parsed.map((v: any, i: number) => [`Item ${i+1}`, String(v)]) }
    }
    if (parsed && typeof parsed === 'object') {
      return { type: 'kv' as const, rows: Object.entries(parsed).map(([k, v]) => [k.replace(/_/g, ' '), Array.isArray(v) ? v.join(', ') : String(v ?? '')]) }
    }
    return { type: 'kv' as const, rows: [['Specification', String(parsed)]] }
  }, [product?.technicalRaw])

  const descriptionSections: { title: string; content: string }[] = useMemo(() => {
    try {
      const raw = product?.descriptionRaw
      if (!raw) return []
      const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw
      if (!parsed || typeof parsed !== 'object') return []
      return Object.entries(parsed).filter(([_, v]) => v !== null && v !== undefined && String(v).trim() !== '').map(([key, val]) => ({ title: key, content: String(val) }))
    } catch {
      return []
    }
  }, [product?.descriptionRaw])

  const videoEmbed = useMemo(() => getYouTubeEmbedUrl(product?.rawVideo), [product?.rawVideo])

  const tabs = useMemo(() => {
    const t: { id: string; label: string }[] = []
    if (descriptionSections.length > 0) t.push({ id: 'description', label: 'Description' })
    if (technicalTable !== null) t.push({ id: 'technical', label: 'Technical Specification' })
    if (product?.rawVideo) t.push({ id: 'video', label: 'Video' })
    if (galleryImages.length > 0) t.push({ id: 'samples', label: 'Cutting Sample' })
    return t
  }, [descriptionSections, technicalTable, product?.rawVideo, galleryImages.length])

  const activeCount = useCallback((source: 'preview' | 'gallery') => (source === 'preview' ? previewImages.length : galleryImages.length), [previewImages.length, galleryImages.length])

  const prev = useCallback(() => {
    if (modalOpen) {
      const len = activeCount(modalSource)
      setModalIndex((s) => (len ? (s - 1 + len) % len : 0))
    } else {
      const len = previewImages.length
      setPreviewIndex((s) => (len ? (s - 1 + len) % len : 0))
    }
  }, [modalOpen, modalSource, previewImages.length, galleryImages.length, activeCount])

  const next = useCallback(() => {
    if (modalOpen) {
      const len = activeCount(modalSource)
      setModalIndex((s) => (len ? (s + 1) % len : 0))
    } else {
      const len = previewImages.length
      setPreviewIndex((s) => (len ? (s + 1) % len : 0))
    }
  }, [modalOpen, modalSource, previewImages.length, galleryImages.length, activeCount])

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

  const scrollToSection = (sectionId: string) => {
    const el = sectionRefs.current[sectionId]
    if (el) {
      const offset = 140
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
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


  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180 
      
      let currentSection = 'description'
      

      Object.entries(sectionRefs.current).forEach(([id, element]) => {
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY
          const elementBottom = elementTop + rect.height
          
          // If scroll position is within this section
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            currentSection = id
          }
        }
      })
      
      setActiveSection(currentSection)
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [tabs])

  if (loading) {
    return <Loading text='product'/>
  }

  if (product === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
            <X className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold mb-3 text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Product not found
          </h2>
          <p className="text-gray-600 mb-8 text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            We couldn't find what you're looking for.
          </p>
          <button 
            onClick={() => navigate(-1)} 
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 hover:border-gray-300 transition-all hover:shadow-md font-semibold text-gray-900" 
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <ArrowLeft className="w-5 h-5" /> Go back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900" >

      {/* Enhanced sidebar */}
      <aside className="hidden lg:block fixed left-6 top-28 z-50 max-h-[calc(100vh-7rem)]" aria-label="Related products">
        <div className="w-64 bg-white overflow-hidden text-sm text-gray-900 shadow-lg border border-gray-100 transition-shadow hover:shadow-xl" style={{ borderRadius: '2px' }}>
          <div className="h-14 flex items-center justify-between px-5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
            <div className="text-xs font-bold tracking-wider text-whiteBgButtonBg" style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {product.subcategory}
            </div>
          </div>

          <div className="px-4 py-4 max-h-[calc(100vh-20rem)] overflow-y-auto">
            <nav className="flex flex-col gap-1">
              {relatedProducts.map((rp: any) => (
                <button 
                  key={rp.id} 
                  onClick={() => navigate(`/product/${rp.id}`)} 
                  title={rp.ProductName} 
                  className="group w-full text-left flex items-start gap-3 px-3 py-3 bg-white hover:bg-gray-50 transition-all duration-200 rounded-sm"
                >
                  <div style={{ minWidth: 8, height: 8, marginTop: 6, opacity: 0.6 }} className="group-hover:opacity-100 bg-whiteBgTextHover transition-opacity" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-800 group-hover:text-gray-900 transition-colors" style={{ lineHeight: '1.3' }}>
                      {rp.ProductName}
                    </div>
                  </div>
                  <div className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </button>
              ))}
            </nav>
          </div>

          <div className="px-4 py-4 border-t border-gray-100 bg-gray-50 flex items-center gap-3">
            <button 
              onClick={() => window.open(`mailto:sales@example.com?subject=Quote%20request%20for%20${encodeURIComponent(product.name)}`)} 
              className="flex-1 inline-flex items-center bg-whiteBgButtonBg justify-center gap-2 text-sm font-bold px-4 py-2.5 text-white transition-all duration-200 hover:shadow-md active:scale-95" 

            >
              <Mail className="w-4 h-4" />
              Quote
            </button>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              title="Back to top" 
              className="w-11 h-11 flex items-center justify-center border border-gray-200 bg-white hover:bg-gray-50 transition-all hover:shadow-sm active:scale-95" 
              style={{ borderRadius: '2px' }}
            >
              <ArrowLeft className="w-4 h-4 rotate-90 text-gray-700" />
            </button>
          </div>
        </div>
      </aside>

      <div ref={topRef} className="mx-auto px-5 sm:px-8 pt-24 sm:pt-32 pb-20 lg:ml-80 lg:pl-8 lg:pr-8 xl:pr-16" style={{ maxWidth: '1800px' }}>
        {/* Enhanced breadcrumb */}
        <div className="flex items-center gap-3 text-sm mb-8 text-gray-600">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 bg-transparent hover:bg-transparent text-gray-500 hover:text-gray-900 transition-colors font-medium group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium font-secondary">{product.name}</span>
        </div>

        {/* Enhanced hero section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 mb-16 items-start">
          {/* Enhanced gallery */}
          <div className="space-y-5">
            <div 
              className="relative bg-white overflow-hidden border-2 aspect-[4/3] group cursor-pointer transition-all duration-300 hover:shadow-xl" 
              onTouchStart={onTouchStart} 
              onTouchEnd={onTouchEnd} 
              onClick={() => { if (previewImages.length) { setModalSource('preview'); setModalIndex(previewIndex); setModalOpen(true) } }} 
              style={{ borderColor: BRAND.border, borderRadius: '4px' }}
            >
              {previewImages[previewIndex] ? (
                <>
                  <img src={previewImages[previewIndex]} alt={product.name} className="w-full h-full object-contain bg-white transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                    <Maximize2 className="w-5 h-5 text-gray-700" />
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <X className="w-12 h-12 mx-auto mb-2 opacity-30" />
                    <p>No image available</p>
                  </div>
                </div>
              )}

              {previewImages.length > 1 && (
                <>
                  <button 
                    onClick={(e) => { e.stopPropagation(); prev() }} 
                    aria-label="previous" 
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/95 backdrop-blur-sm border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110 shadow-lg" 
                    style={{ borderRadius: '50%' }}
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-800" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); next() }} 
                    aria-label="next" 
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/95 backdrop-blur-sm border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110 shadow-lg" 
                    style={{ borderRadius: '50%' }}
                  >
                    <ChevronRight className="w-5 h-5 text-gray-800" />
                  </button>
                </>
              )}
            </div>

            {/* Enhanced thumbnail preview */}
            <div className="flex gap-3">
              <div className="w-36 h-24 bg-white overflow-hidden border-2 transition-all hover:shadow-md" style={{ borderColor: BRAND.border, borderRadius: '4px' }}>
                {product.thumbnail ? (
                  <button
                    onClick={() => { setModalSource('preview'); setModalIndex(0); setModalOpen(true) }}
                    className="w-full bg-white hover:bg-white h-full flex items-center justify-center hover:opacity-80 transition-opacity"
                    aria-label="Open thumbnail preview"
                  >
                    <img src={product.thumbnail} alt={`${product.name} thumbnail`} className="w-full h-full object-contain" />
                  </button>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No thumbnail</div>
                )}
              </div>

              {previewImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 flex-1">
                  {previewImages.slice(1).map((img, idx) => (
                    <button 
                      key={idx + 1} 
                      onClick={() => setPreviewIndex(idx + 1)} 
                      className={`flex-shrink-0 w-20 h-20 bg-white overflow-hidden border-2 transition-all hover:shadow-md ${idx + 1 === previewIndex ? 'ring-2 ring-[#6b0f0f] ring-offset-2' : ''}`} 
                      style={{ borderColor: BRAND.border, borderRadius: '4px' }}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Enhanced product info */}
          <div className="flex flex-col space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 leading-tight mb-4 tracking-tight">
                {product.name}
              </h1>
              <p className="text-gray-700 text-xl leading-relaxed">{product.shortDescription}</p>
            </div>

            {features && features.length > 0 && (
              <div className=" p-6 border border-gray-200 shadow-sm ">
                <h3 className="text-sm uppercase text-gray-600 mb-4 font-bold tracking-wider">Key Features</h3>
                <ul className="grid grid-cols-1 gap-3">
                  {features.map((f: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-800 group">
                      <span 
                        className="mt-1.5 w-2 h-2  bg-whiteBgButtonBg bg-opacity-50 flex-shrink-0 transition-transform group-hover:scale-125" 

                      />
                      <span className="leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => window.open(`mailto:sales@example.com?subject=Quote%20request%20for%20${encodeURIComponent(product.name)}`)} 
                className="flex-1 bg-whiteBgButtonBg inline-flex items-center justify-center gap-3 text-white px-8 py-4 text-base font-bold transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 active:scale-95" 

              >
                <Mail className="w-5 h-5" />
                Request Quote
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced sticky section nav */}
        <div className="w-full  bg-white/40 backdrop-blur-md border-y border-gray-200 z-30 mb-10 shadow-sm" style={{ position: 'sticky', top: '80px' }}>
          <div className="flex justify-center">
            <div className="flex gap-8 overflow-x-auto py-4 px-6">
              {tabs.map(t => (
                <button
                  key={t.id}
                  onClick={() => scrollToSection(t.id)}
                  className={`text-sm bg-transparent hover:bg-transparent font-bold uppercase tracking-wider pb-2 transition-all whitespace-nowrap relative ${
                    activeSection === t.id ? 'text-black' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t.label}
                  {activeSection === t.id && (
                    <span 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" 
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full space-y-8">
          {descriptionSections.length > 0 && (
            <section 
              ref={el => (sectionRefs.current['description'] = el || null)} 
              data-section="description" 
              id="description" 
              className="bg-white border border-gray-200 shadow-sm"
              
            >
              <div className="p-8 border-b border-gray-200">
                <h2 className="text-4xl md:text-4xl font-medium text-gray-900 mb-2">Product Description</h2>
                <p className="text-gray-600">Comprehensive details about {product.name}</p>
              </div>
              
              <div className="p-8">
                <div className="space-y-8">
                  {descriptionSections.map((section, idx) => (
                    <div key={idx} className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-6 bg-black"></div>
                        <h3 className="text-2xl bg-gray-50 p-2 rounded-lg font-medium text-gray-900">{section.title}</h3>
                      </div>
                      <p className="text-black  text-lg leading-relaxed pl-4 whitespace-pre-wrap">
                        {section.content}
                      </p>
                      {idx < descriptionSections.length - 1 && (
                        <div className="pt-6">
                          <div className="w-full h-px bg-gray-100"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* FIXED: Technical specs with horizontal layout */}
          {technicalTable && (
            <section
              ref={el => (sectionRefs.current['technical'] = el || null)}
              data-section="technical"
              id="technical"
              className="bg-white border border-gray-200 shadow-sm overflow-auto"
            >
              <div className="p-8 border-b border-gray-100">
                <h2 className="text-4xl font-medium text-gray-900 mb-2">Technical Specifications</h2>
                <p className="text-gray-600">Detailed technical information</p>
              </div>

              <div className="p-8">
                {technicalTable.type === 'matrix' ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full table-auto text-sm border-collapse">
                      <thead>
                        <tr className="bg-gray-900 text-white">
                          <th className="py-4 px-5 text-left font-bold uppercase text-xs tracking-wider border border-gray-700">
                            Specification
                          </th>
                          {technicalTable.rows.map((_, idx) => (
                            <th key={idx} className="py-4 px-5 text-left font-semibold uppercase text-xs tracking-wider border border-gray-700">
                              Option {idx + 1}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {technicalTable.headers.map((header, hIdx) => (
                          <tr key={hIdx} className={`${hIdx % 2 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}>
                            <td className="py-4 px-5 font-bold text-gray-800 uppercase text-xs tracking-wider border border-gray-200">
                              {header.toString().replace(/_/g, ' ')}
                            </td>
                            {technicalTable.rows.map((row, rIdx) => (
                              <td key={rIdx} className="py-4 px-5 text-sm text-gray-900 whitespace-pre-wrap border border-gray-200">
                                {row[hIdx]}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : technicalTable.type === 'kv' ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <tbody>
                        {technicalTable.rows.map(([k, v], i) => (
                          <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="py-4 pr-8 align-top text-sm text-gray-700 uppercase tracking-wider font-bold" style={{ width: '40%' }}>
                              {k}
                            </td>
                            <td className="py-4 pl-8 text-sm font-semibold text-gray-900 whitespace-pre-wrap">{v}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-600">Technical specifications are not available for this product.</p>
                )}
              </div>
            </section>
          )}

          {videoEmbed ? (
            <section 
              ref={el => (sectionRefs.current['video'] = el || null)} 
              data-section="video" 
              id="video" 
              className="bg-white border border-gray-200 shadow-sm"
            >
              <div className="p-8 border-b border-gray-100">
                <h2 className="text-4xl font-medium text-gray-900 mb-2">Product Video</h2>
                <p className="text-gray-600">Watch our product in action</p>
              </div>
              
              <div className="p-8">
                <div className="bg-black aspect-video overflow-hidden shadow-lg" >
                  <iframe 
                    src={videoEmbed} 
                    title={`${product.name} Video`} 
                    className="w-full h-full" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen 
                  />
                </div>
              </div>
            </section>
          ) : null}

          {galleryImages.length > 0 && (
            <section 
              ref={el => (sectionRefs.current['samples'] = el || null)} 
              data-section="samples" 
              id="samples" 
              className="bg-white border border-gray-200 shadow-sm"
            >
              <div className="p-8 border-b border-gray-100">
                <h2 className="text-4xl font-medium text-gray-900 mb-2">Cutting Samples</h2>
                <p className="text-gray-600">View our sample gallery</p>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {galleryImages.map((src, i) => (
                    <button 
                      key={i} 
                      onClick={() => { setModalSource('gallery'); setModalIndex(i); setModalOpen(true) }} 
                      className="aspect-square bg-white overflow-hidden border-2 border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all group relative" 
                    >
                      <img src={src} alt={`${product.name} ${i + 1}`} className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                        <Maximize2 className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Mobile related products - ABOVE FOOTER */}
      {relatedProducts && relatedProducts.length > 1 && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-sm mx-5 mb-8" style={{ borderRadius: '4px' }}>
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-md uppercase text-gray-700 font-medium tracking-wider">Related Products</h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => scrollRelated('left')} 
                  className="w-9 h-9 flex items-center justify-center border border-gray-200 bg-white hover:bg-gray-50 transition-all hover:shadow-sm" 
                  aria-label="scroll left" 
                  style={{ borderRadius: '4px' }}
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
                <button 
                  onClick={() => scrollRelated('right')} 
                  className="w-9 h-9 flex items-center justify-center border border-gray-200 bg-white hover:bg-gray-50 transition-all hover:shadow-sm" 
                  aria-label="scroll right" 
                  style={{ borderRadius: '4px' }}
                >
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div ref={relatedScrollRef} className="flex gap-3 overflow-x-auto pb-2">
              {relatedProducts.filter((p: any) => p.id !== product.id).map((prod: any) => (
                <button 
                  key={prod.id} 
                  onClick={() => navigate(`/product/${prod.id}`)} 
                  className="flex-shrink-0 w-48 border border-gray-200 p-4 text-left bg-white hover:shadow-md transition-all hover:-translate-y-1" 
                  style={{ borderRadius: '4px' }}
                >
                  <div className="text-sm font-semibold text-gray-900 leading-snug">{prod.ProductName}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced image modal */}
      {modalOpen && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm" 
          onClick={() => setModalOpen(false)}
        >
          <button 
            onClick={() => setModalOpen(false)} 
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 border border-white/20" 
            aria-label="close" 
            style={{ borderRadius: '50%' }}
          >
            <X className="w-6 h-6 text-white" />
          </button>
          
          <div className="relative max-w-6xl w-full" onClick={e => e.stopPropagation()}>
            {modalSource === 'gallery' ? (
              <img 
                src={galleryImages[modalIndex]} 
                alt={`${product.name} image ${modalIndex + 1}`} 
                className="w-full h-auto max-h-[85vh] object-contain shadow-2xl" 
              />
            ) : (
              <img 
                src={previewImages[modalIndex]} 
                alt={`${product.name} preview ${modalIndex + 1}`} 
                className="w-full h-auto max-h-[85vh] object-contain shadow-2xl" 
              />
            )}

            {activeCount(modalSource) > 1 && (
              <>
                <button 
                  onClick={(e) => { e.stopPropagation(); prev() }} 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center text-black bg-white hover:bg-white/20  hover:text-white backdrop-blur-md transition-all hover:scale-110 border border-white/20" 
                  style={{ borderRadius: '50%' }}
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); next() }} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-white text-black hover:bg-white/20 hover:text-white backdrop-blur-md transition-all hover:scale-110 border border-white/20" 
                  style={{ borderRadius: '50%' }}
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
                <div 
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-2 bg-white  backdrop-blur-md text-sm font-semibold text-black border border-white/20" 
                  style={{ borderRadius: '20px' }}
                >
                  {modalIndex + 1} / {activeCount(modalSource)}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* <Footer /> */}
    </div>
  )
}

export default Producttemplate