/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Form from "./Form";
import logo from "../assets/background.jpg";
import {
  Grid,
  Image,
  ChevronDown,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Phone,
} from "lucide-react";
import { supabase } from "../lib/supabase";

type ProductType = {
  id: string;
  Segment: string;
  SubCategory: string;
  ProductName: string;
  ShortDescription?: string | null;
  Thumbnail_url?: string[] | null;
};


const fetchProducts = async (): Promise<ProductType[]> => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `id, Segment, SubCategory, ProductName, ShortDescription, Thumbnail_url`
    )
    .order("Segment", { ascending: true })
    .order("SubCategory", { ascending: false });


  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }
  return data || [];
};

const getCategoryList = (products: ProductType[]) => {
  const grouped: Record<
    string,
    {
      subs: Set<string>;
      products: {
        id: string;
        name: string;
        subcategory: string;
        description: string;
        image: string | null;
      }[];
    }
  > = {};

  products.forEach((product) => {
    const segment = product.Segment;
    const subCategory = product.SubCategory;

    if (!grouped[segment]) grouped[segment] = { subs: new Set(), products: [] };
    grouped[segment].subs.add(subCategory);
    grouped[segment].products.push({
      id: product.id,
      name: product.ProductName,
      subcategory: subCategory,
      description: product.ShortDescription || "No description available",
      image: product.Thumbnail_url?.[0] || null,
    });
  });

  return Object.entries(grouped).map(([segment, { subs, products }]) => ({
    id: segment,
    name: segment,
    subs: Array.from(subs),
    products,
  }));
};

export default function Product(): JSX.Element {
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [enquiryInitialData, setEnquiryInitialData] = useState<
    Record<string, string>
  >({});
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [categoryId, setCategoryId] = useState<string>("");
  const [sub, setSub] = useState<string>("");
  const [mobileCatOpen, setMobileCatOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const PRODUCTS_PER_PAGE = 9;

  const productsRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  // ✅ prevents unwanted scroll on reload
  const userTriggeredScroll = useRef(false);

  useEffect(() => {
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const CATEGORIES = useMemo(() => getCategoryList(products), [products]);

  useEffect(() => {
  if (!loading && CATEGORIES.length > 0) {
    // Try to find 'laser cutting' category
    const defaultCat = CATEGORIES.find(
      c => c.name.toLowerCase() === "laser cutting"
    );
    // If 'laser cutting' found, try to select 'sheet cutting Machine' sub
    let defaultSub = "";
    if (defaultCat) {
      defaultSub =
        defaultCat.subs.find(
          s => s.toLowerCase() === "sheet cutting machine"
        ) || defaultCat.subs[0];
      setCategoryId(defaultCat.id);
      setSub(defaultSub);
    } else {
      // fallback to first
      setCategoryId(CATEGORIES[0].id);
      setSub(CATEGORIES[0].subs[0]);
    }
    setCurrentPage(1);
  }
}, [loading, CATEGORIES]);

  const category = useMemo(
    () => CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0],
    [categoryId, CATEGORIES]
  );

  const filteredProducts = useMemo(
    () =>
      category ? category.products.filter((p) => p.subcategory === sub) : [],
    [category, sub]
  );

  // ✅ FINAL FIXED SCROLL EFFECT
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Only scroll when user triggers (NOT on reload)
    if (!userTriggeredScroll.current) return;
    userTriggeredScroll.current = false;

    // Scroll + Reset page
    setCurrentPage(1);

    setTimeout(() => {
      productsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }, [sub, categoryId]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;

    userTriggeredScroll.current = true;
    setCurrentPage(page);

    setTimeout(() => {
      productsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  if (loading) return <Loading text="Products" />;

  return (
    <section
      id="products"
      className="min-h-screen py-12 lg:py-16 my-16 bg-gradient-to-br from-neutral-950 via-neutral-900 to-zinc-900 relative"
      // style={{
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   backgroundRepeat: "no-repeat",
      // }}
      // style={{ backgroundImage: `url(${logo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div
        ref={productsRef}
        className="max-w-[1600px] mx-auto px-4 sm:px-6 pt-16"
      >
        {/* HEADER */}
        <div className="text-center mb-12 lg:mb-16" id="#products">
          <div className="inline-flex bg-whiteBgButtonBg bg-opacity-20 text-whiteBgButtonBg items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-950/50 to-black/50 border border-red-900/30 rounded-full mb-4 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 " />
            <span className="font-normal">Premium Collection</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-normal font-primary text-darkBgText mb-5 tracking-tight">
            Industrial Equipment Catalog
          </h2>

          <p className="text-darkBgText opacity-60 text-lg md:text-xl max-w-2xl mx-auto font-secondary">
            Explore our complete range of laser cutting, welding, marking, and
            automation systems.
          </p>
        </div>

        {/* CATEGORY PILLS (DESKTOP) */}
        <div className="hidden lg:flex justify-center font-primary gap-3 mb-12 ">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                userTriggeredScroll.current = true;
                setCategoryId(c.id);
                setSub(c.subs[0]);
                setCurrentPage(1);
              }}
              className={`px-8 py-3.5 font-medium  transition-all duration-300 border ${
                c.id === categoryId
                  ? "bg-whiteBgButtonBg hover:bg-whiteBgButtonBg hover:bg-opacity-20 bg-opacity-20 text-darkBgText border-red-800 shadow-lg shadow-red-950/50"
                  : "bg-black/40 text-darkBgText text-opacity-80 hover:text-darkBgText hover:bg-black/60 border-zinc-800 hover:border-zinc-700 backdrop-blur-sm"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* MOBILE CATEGORY DROPDOWNS */}
        <div className="lg:hidden mb-8 flex flex-col gap-3 font-secondary">
          {/* Category Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMobileCatOpen(!mobileCatOpen)}
              className="w-full px-5 py-4 bg-whiteBgButtonBg bg-opacity-40 bg-black/40 border border-zinc-800 text-darkBgText font-semibold flex justify-between items-center hover:border-zinc-700 transition-all backdrop-blur-sm"
            >
              <span className="flex items-center gap-2">
                <Grid className="w-5 h-5 text-whiteBgButtonBg" />
                {category.name}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${
                  mobileCatOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {mobileCatOpen && (
              <div className="absolute z-20 w-full mt-2 bg-zinc-900 border border-zinc-800 shadow-2xl max-h-64 overflow-y-auto backdrop-blur-xl">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      userTriggeredScroll.current = true; // ✅
                      setCategoryId(c.id);
                      setSub(c.subs[0]);
                      setMobileCatOpen(false);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-5 py-4 transition-all border-b border-zinc-800 last:border-b-0 ${
                      c.id === categoryId
                        ? "bg-whiteBgButtonBg bg-opacity-30 text-darkBgText font-semibold"
                        : "hover:bg-zinc-800/50 text-darkBgText text-opacity-80"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Subcategory Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMobileSubOpen(!mobileSubOpen)}
              className="w-full px-5 py-4 bg-black/40 border border-zinc-800 text-white font-semibold flex justify-between items-center hover:border-zinc-700 transition-all backdrop-blur-sm"
            >
              <span>{sub}</span>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${
                  mobileSubOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {mobileSubOpen && (
              <div className="absolute z-20 w-full mt-2 bg-zinc-900 border border-zinc-800 shadow-2xl max-h-64 overflow-y-auto backdrop-blur-xl">
                {category.subs.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      userTriggeredScroll.current = true; // ✅
                      setSub(s);
                      setMobileSubOpen(false);
                      setCurrentPage(1);
                    }}
                    className="w-full text-left px-5 py-4 transition-all border-b border-zinc-800 last:border-b-0 bg-whiteBgButtonBg bg-opacity-30 text-darkBgText font-semibold"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden lg:grid grid-cols-5 gap-6 pb-16">
          {/* SIDEBAR */}
          <aside className="bg-gradient-to-b from-zinc-900 to-black p-6 shadow-2xl border border-zinc-800 h-[600px] flex flex-col sticky top-24">
            <h4 className="text-xl font-medium mb-6 font-primary text-darkBgText text-opacity-80 flex items-center gap-3 pb-4 border-b border-zinc-800">
              <div className="p-2 bg-red-950/50 border border-red-900/30">
                <Grid className="w-5 h-5 text-red-500" />
              </div>
              <span>Sub Categories</span>
            </h4>

            <nav className="flex flex-col gap-2 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
              {category.subs.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    userTriggeredScroll.current = true; // ✅
                    setSub(s);
                    setCurrentPage(1);
                  }}
                  className={`group w-full text-left px-4 py-3.5 font-semibold transition-all duration-200 flex items-center justify-between ${
                    s === sub
                      ? "bg-whiteBgButtonBg hover:bg-whiteBgButtonBg hover:bg-opacity-40 text-opacity-60 bg-opacity-40 text-darkBgTextHover shadow-lg"
                      : "text-darkBgTextHover text-opacity-80 bg-whiteBgButtonBg hover:bg-whiteBgButtonBg bg-opacity-40 hover:text-darkBgTextHover hover:bg-opacity-40"
                  }`}
                >
                  <span>{s}</span>
                  <ArrowRight
                    className={`w-10 h-10 transition-transform ${
                      s === sub
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </button>
              ))}
            </nav>
          </aside>

          {/* PRODUCT CARDS */}
          <main className="lg:col-span-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedProducts.length === 0 && (
                <div className="col-span-full text-center py-24">
                  <div className="inline-flex flex-col items-center gap-4">
                    <div className="p-6 bg-zinc-900 rounded-full border border-zinc-800">
                      <ShoppingBag className="w-12 h-12 text-gray-600" />
                    </div>
                    <p className="text-gray-500 text-lg font-medium">
                      No products found in this sub category
                    </p>
                  </div>
                </div>
              )}

              {paginatedProducts.map((p, index) => (
                <div
                  key={p.id}
                  className="group bg-gradient-to-b from-zinc-900 to-black overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-500 hover:shadow-2xl hover:shadow-red-950/20"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-80 bg-zinc-950 overflow-hidden">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="object-fit w-full h-full transition-transform duration-700 group-hover:scale-105 bg-white"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-700">
                        <Image className="w-16 h-16" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-3xl font-primary font-medium text-darkBgText mb-2 group-hover:text-white transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-md text-darkBgText text-opacity-70 font-secondary mb-5 leading-relaxed line-clamp-2">
                      {p.description}
                    </p>

                    <div className="flex w-full gap-3 mt-2 font-secondary">
                      <button
                        onClick={() => navigate(`/product/${p.id}`)}
                        className="flex-1 px-6 py-3.5 text-opacity-90 hover:border-red-900 font-semibold transition-all duration-300 border border-red-900 flex items-center justify-center gap-2 shadow-sm hover:shadow-md bg-whiteBgButtonBg hover:bg-whiteBgButtonBg bg-opacity-40 hover:bg-opacity-40 text-darkBgTextHover"
                      >
                        <span>View</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>

                      <button
                        onClick={() => {
                          // open enquiry form with product context
                          setEnquiryInitialData({
                            segment: category.name,
                            subcategory: p.subcategory,
                            product: p.name,
                          });
                          setShowEnquiryForm(true);
                        }}
                        className="flex-1 px-6 py-3.5 text-opacity-90 hover:border-red-900 font-semibold transition-all duration-300 border border-red-900 flex items-center justify-center gap-2 shadow-sm hover:shadow-md bg-whiteBgButtonBg hover:bg-whiteBgButtonBg bg-opacity-40 hover:bg-opacity-40 text-darkBgTextHover"
                      >
                        <Phone className="w-4 h-4 transition-transform group-hover:scale-110" />
                        <span>Enquire</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-3 mt-12 font-secondary">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-zinc-700 rounded-md bg-black/50 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-4 py-2 border rounded-md ${
                        page === currentPage
                          ? "bg-whiteBgButtonBg bg-opacity-30 border-red-700 text-darkBgText font-semibold"
                          : "border-zinc-700 text-white hover:bg-whiteBgButtonBg hover:bg-opacity-10"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-zinc-700 rounded-md bg-black/50 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>

        {/* MOBILE GRID */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center py-20">
              <div className="inline-flex flex-col items-center gap-4">
                <div className="p-6 bg-zinc-900 border border-zinc-800">
                  <ShoppingBag className="w-10 h-10 text-gray-600" />
                </div>
                <p className="text-gray-500 font-medium">No products found</p>
              </div>
            </div>
          )}

          {paginatedProducts.map((p, index) => (
            <div
              key={p.id}
              className="group bg-gradient-to-b from-zinc-900 to-black overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-56 bg-zinc-950 overflow-hidden">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="object-cover bg-white w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-700">
                    <Image className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              </div>

              <div className="p-5">
                <h3 className="text-2xl font-medium text-white mb-2">
                  {p.name}
                </h3>
                <p className="text-md text-gray-400 mb-4">{p.description}</p>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => navigate(`/product/${p.id}`)}
                    className="flex-1 max-w-[180px] px-5 py-3 bg-gradient-to-r from-red-900 to-red-950 text-white font-medium hover:from-red-800 hover:to-red-900 transition-all duration-300 border border-red-900 flex items-center justify-center gap-2"
                  >
                    <span>View</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setEnquiryInitialData({
                        segment: category.name,
                        subcategory: p.subcategory,
                        product: p.name,
                      });
                      setShowEnquiryForm(true);
                    }}
                    className="flex-1 max-w-[180px] px-5 py-3 bg-gradient-to-r from-red-900 to-red-950 text-white font-medium hover:from-red-800 hover:to-red-900 transition-all duration-300 border border-red-900 flex items-center justify-center gap-2"
                  >
                    <span>Enquire</span>
                    <Phone className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enquiry form modal */}
      {showEnquiryForm && (
        <Form
          type="PRODUCT_ENQUIRY"
          onClose={() => setShowEnquiryForm(false)}
          initialData={enquiryInitialData}
        />
      )}
    </section>
  );
}
