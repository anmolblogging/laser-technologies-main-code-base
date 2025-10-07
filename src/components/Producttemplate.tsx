import { useNavigate, useParams } from 'react-router-dom'
import { CATEGORIES } from '../Data'
import { ArrowLeft, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'

import Footer from './Footer'

function Producttemplate() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(0)
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const touchStartX = useRef<number | null>(null)

  const product = CATEGORIES.flatMap((c) => c.products).find((p) => p.id === id)
  const category = CATEGORIES.find((c) => c.products.some((p) => p.id === id))

  useEffect(() => {
    setSelectedImage(0)
    // ensure we land at the top of the product page when navigating between products
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' }) // use 'smooth' if you want animated scroll
    }
  }, [id])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedImage])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Product not found</h2>
          <button onClick={() => navigate(-1)} className="text-red-600 hover:underline">
            Go back
          </button>
        </div>
      </div>
    )
  }

  const p: any = product as any
  const allImages = [product.image, ...(p.samples || [])].filter(Boolean)

  const prev = useCallback(() => {
    setSelectedImage((s) => (s - 1 + allImages.length) % allImages.length)
  }, [allImages.length])

  const next = useCallback(() => {
    setSelectedImage((s) => (s + 1) % allImages.length)
  }, [allImages.length])

  // basic swipe handlers for mobile
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(delta) > 50) {
      if (delta > 0) prev()
      else next()
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header / Back */}
      <div className="border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-black p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-200"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back</span>
          </button>

          <div className="ml-2">
            <h1 className="text-lg md:text-2xl font-semibold leading-tight">
              {product.name}
            </h1>
            <div className="text-xs text-gray-500">{category?.name}</div>
          </div>
        </div>
      </div>

      {/* More from category (responsive chips) */}
      {category && (
        <div className="bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <h3 className="text-sm text-gray-500 mb-3">More from {category.name}</h3>

            <div className="relative">
              {/* mobile horizontal */}
              <div className="flex gap-3 overflow-x-auto pb-2 md:hidden" style={{ WebkitOverflowScrolling: 'touch' }}>
                {category.products.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => navigate(`/product/${prod.id}`)}
                    aria-current={prod.id === id ? 'true' : undefined}
                    className={`flex-none w-[220px] px-3 py-3 rounded-lg border transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-200 ${
                      prod.id === id ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium leading-tight" title={prod.name}>{prod.name}</div>
                        <div className="text-xs text-gray-400 truncate" title={prod.category || ''}>{prod.category || ''}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* desktop grid */}
              <div className="hidden md:grid md:grid-cols-4 gap-4">
                {category.products.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => navigate(`/product/${prod.id}`)}
                    aria-current={prod.id === id ? 'true' : undefined}
                    className={`w-full text-left px-4 py-4 rounded-xl border transition transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-200 ${
                      prod.id === id ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-800 border-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold truncate" title={prod.name}>{prod.name}</div>
                        <div className="text-xs text-gray-400 truncate mt-1" title={prod.category || ''}>{prod.category || ''}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Carousel / Images */}
          <div>
            <div
              ref={carouselRef}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              className="relative rounded-xl overflow-hidden bg-gray-100"
            >
              {/* Image */}
              <div className="aspect-[4/3] md:aspect-square bg-gray-100">
                {allImages[selectedImage] ? (
                  <img src={allImages[selectedImage]} alt={p.name} className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
                )}
              </div>

              {/* Prev / Next */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-red-200"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={next}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-red-200"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* indicator dots */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-2">
                    {allImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        aria-label={`Go to image ${idx + 1}`}
                        className={`w-2 h-2 rounded-full ${selectedImage === idx ? 'bg-red-600' : 'bg-white/80'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* thumbnails */}
            {allImages.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-14 rounded-md overflow-hidden border ${selectedImage === idx ? 'border-red-600' : 'border-gray-200'}`}
                  >
                    <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-4">{product.name}</h2>
            <p className="text-gray-600 text-base md:text-lg mb-6">{product.description}</p>

            {/* features */}
            {p.features && p.features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Features</h3>
                <ul className="grid gap-2">
                  {p.features.map((f: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <Check className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                      <span className="font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* technical parameters */}
            {p.technicalParameters && Object.keys(p.technicalParameters).length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Technical parameters</h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                  {Object.entries(p.technicalParameters as Record<string, string>).map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-gray-600">{k.replace(/_/g, ' ')}</span>
                      <span className="font-medium text-gray-900">{String(v)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-6">
              <button className="w-full md:w-auto bg-red-600 text-white py-3 px-6 rounded-xl hover:bg-red-700 transition font-medium">
                Contact Sales
              </button>
            </div>
          </div>
        </div>

        {/* About / Description */}
        <div className="border-t pt-16 pb-12">
          <div className="max-w-3xl">
            <h3 className="text-2xl font-semibold mb-4">About this product</h3>
            <div className="text-gray-700 leading-relaxed space-y-4">
              {p.detailedDescription ? <p>{p.detailedDescription}</p> : <p>{p.description}</p>}
            </div>
          </div>
        </div>

        {/* Video */}
        {p.video && (
          <div className="border-t pt-12">
            <h3 className="text-2xl font-semibold mb-6">See it in action</h3>
            <div className="max-w-4xl">
              <div className="bg-black rounded-lg overflow-hidden">
                <video controls className="w-full h-[420px] bg-black">
                  <source src={p.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Producttemplate