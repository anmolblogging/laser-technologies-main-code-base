import { useMemo, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Grid, Image, ChevronDown, Sparkles, ShoppingBag, ArrowRight } from "lucide-react";
import  {CATEGORIES}  from "../Data"; 
// import { Link } from "react-router-dom";


export default function Product(): JSX.Element {
  const [categoryId, setCategoryId] = useState<string>(CATEGORIES[0].id);
  const [sub, setSub] = useState<string>(CATEGORIES[0].subs[0]);
  const [mobileCatOpen, setMobileCatOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);

  const category = useMemo(
    () => CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0],
    [categoryId]
  );

  const products = useMemo(
    () => category.products.filter((p) => p.subcategory === sub),
    [category, sub]
  );
  const navigate = useNavigate()

  return (
    <section className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-zinc-900 py-12 lg:py-20" >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16" id="#products">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-950/50 to-black/50 border border-red-900/30 rounded-full mb-4 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-red-400">Premium Collection</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight">
            Industrial Equipment Catalog
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto" >
            Explore our complete range of laser cutting, welding, marking, and automation systems designed for diverse industries.
          </p>
        </div>

        {/* Category Pills - Desktop */}
        <div className="hidden lg:flex justify-center gap-3 mb-12">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => { setCategoryId(c.id); setSub(c.subs[0]); }}
              className={`px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 border ${
                c.id === categoryId 
                  ? "bg-gradient-to-r from-red-900 to-red-950 text-white border-red-800 shadow-lg shadow-red-950/50" 
                  : "bg-black/40 text-gray-300 hover:text-white hover:bg-black/60 border-zinc-800 hover:border-zinc-700 backdrop-blur-sm"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* MOBILE DROPDOWNS */}
        <div className="lg:hidden mb-8 flex flex-col gap-3">
          <div className="relative">
            <button
              onClick={() => setMobileCatOpen(!mobileCatOpen)}
              className="w-full px-5 py-4 bg-black/40 border border-zinc-800 rounded-xl text-white font-semibold flex justify-between items-center hover:border-zinc-700 transition-all backdrop-blur-sm"
            >
              <span className="flex items-center gap-2">
                <Grid className="w-5 h-5 text-red-500" />
                {category.name}
              </span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${mobileCatOpen ? "rotate-180" : "rotate-0"}`} />
            </button>
            {mobileCatOpen && (
              <div className="absolute z-20 w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl max-h-64 overflow-y-auto backdrop-blur-xl">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => { setCategoryId(c.id); setSub(c.subs[0]); setMobileCatOpen(false); }}
                    className={`w-full text-left px-5 py-4 transition-all border-b border-zinc-800 last:border-b-0 ${
                      c.id === categoryId 
                        ? "bg-gradient-to-r from-red-900 to-red-950 text-white font-semibold" 
                        : "hover:bg-zinc-800/50 text-gray-300"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setMobileSubOpen(!mobileSubOpen)}
              className="w-full px-5 py-4 bg-black/40 border border-zinc-800 rounded-xl text-white font-semibold flex justify-between items-center hover:border-zinc-700 transition-all backdrop-blur-sm"
            >
              <span>{sub}</span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${mobileSubOpen ? "rotate-180" : "rotate-0"}`} />
            </button>
            {mobileSubOpen && (
              <div className="absolute z-20 w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl max-h-64 overflow-y-auto backdrop-blur-xl">
                {category.subs.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setSub(s); setMobileSubOpen(false); }}
                    className={`w-full text-left px-5 py-4 transition-all border-b border-zinc-800 last:border-b-0 ${
                      s === sub 
                        ? "bg-gradient-to-r from-red-900 to-red-950 text-white font-semibold" 
                        : "hover:bg-zinc-800/50 text-gray-300"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden lg:grid grid-cols-5 gap-6">
          {/* SIDEBAR - Fixed Height with Scroll */}
          <aside className="bg-gradient-to-b from-zinc-900 to-black rounded-2xl p-6 shadow-2xl border border-zinc-800 h-[600px] flex flex-col sticky top-6">
            <h4 className="text-lg font-bold mb-6 text-white flex items-center gap-3 pb-4 border-b border-zinc-800">
              <div className="p-2 bg-red-950/50 rounded-lg border border-red-900/30">
                <Grid className="w-5 h-5 text-red-500" />
              </div>
              <span>Sub Categories</span>
            </h4>
            <nav className="flex flex-col gap-2 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
              {category.subs.map((s) => (
                <button
                  key={s}
                  onClick={() => setSub(s)}
                  className={`group w-full text-left px-4 py-3.5 rounded-lg font-light transition-all duration-200 flex items-center justify-between ${
                    s === sub 
                      ? "bg-gradient-to-r from-red-900 to-red-950 text-white shadow-lg" 
                      : "text-gray-400 hover:text-white hover:bg-zinc-800/50"
                  }`}
                >
                  <span>{s}</span>
                  <ArrowRight className={`w-10 h-10 transition-transform ${s === sub ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
                </button>
              ))}
            </nav>
          </aside>

          {/* PRODUCTS */}
          <main className="lg:col-span-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.length === 0 && (
                <div className="col-span-full text-center py-24">
                  <div className="inline-flex flex-col items-center gap-4">
                    <div className="p-6 bg-zinc-900 rounded-full border border-zinc-800">
                      <ShoppingBag className="w-12 h-12 text-gray-600" />
                    </div>
                    <p className="text-gray-500 text-lg font-medium">No products found in this sub category</p>
                  </div>
                </div>
              )}
              {products.map((p, index) => (
                <div
                  key={p.id}
                  className="group bg-gradient-to-b from-zinc-900 to-black rounded-2xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-500 hover:shadow-2xl hover:shadow-red-950/20"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-80 bg-zinc-950 overflow-hidden">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="object-contain w-full h-full transition-transform duration-700 group-hover:scale-105 bg-white"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-700">
                        <Image className="w-16 h-16" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-5 leading-relaxed">{p.description}</p>
                    <button
                      onClick={() => navigate(`/product/${p.id}`)}
                      className="w-full px-6 py-3.5 rounded-lg bg-gradient-to-r from-red-900 to-red-950 text-white font-semibold hover:from-red-800 hover:to-red-900 transition-all duration-300 border border-red-900 hover:border-red-800 flex items-center justify-center gap-2 group/btn"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>

        {/* Mobile Product Grid */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
          {products.length === 0 && (
            <div className="col-span-full text-center py-20">
              <div className="inline-flex flex-col items-center gap-4">
                <div className="p-6 bg-zinc-900 rounded-full border border-zinc-800">
                  <ShoppingBag className="w-10 h-10 text-gray-600" />
                </div>
                <p className="text-gray-500 font-medium">No products found</p>
              </div>
            </div>
          )}
          {products.map((p, index) => (
            <div
              key={p.id}
              className="group bg-gradient-to-b from-zinc-900 to-black rounded-2xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-56 bg-zinc-950 overflow-hidden">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-700">
                    <Image className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-2">{p.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{p.description}</p>
                <button
                  onClick={() => navigate(`/product/${p.id}`)}
                  className="w-full px-5 py-3 rounded-lg bg-gradient-to-r from-red-900 to-red-950 text-white font-semibold hover:from-red-800 hover:to-red-900 transition-all duration-300 border border-red-900 flex items-center justify-center gap-2"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}