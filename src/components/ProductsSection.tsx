/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Form from "./Form";
import {
  Grid,
  Image,
  ChevronDown,
  ShoppingBag,
  ArrowRight,
  Phone,
} from "lucide-react";
import { supabase } from "../lib/supabase";

/* -------------------------------------------------------
   FINAL CATEGORY ORDER
---------------------------------------------------------*/
const CATEGORY_ORDER = [
  "Laser Cutting",
  "Laser Welding",
  "Laser Marking & Engraving",
  "CNC Sheet Bending",
  "Pipe and Tube Bending",
  "Sheet Punching",
];


/* -------------------------------------------------------
   LASER CUTTING SUBCATEGORY ORDER
---------------------------------------------------------*/
const LASER_CUTTING_SUB_ORDER = [
  "Sheet Laser Cutting Machine",
  "Sheet Laser Cutting Machine – C Series",
  "Tube Laser Cutting Machine or Pipe Laser Cutting Machine",
  "Sheet and Tube Laser Cutting Machine",
  "Fully Automatic Sheet Laser Cutting Machine",
  "Electrical Steel / Electrolamination Sheet Laser Cutting Machines",
];

/* -------------------------------------------------------
   LASER WELDING ORDER
---------------------------------------------------------*/
const LASER_WELDING_SUB_ORDER = [
  "Handheld Laser Welding Machine",
  "Air-Cooled Handheld Laser Welding Machine",
  "Robotic Laser Welding Machine",
  "Open Laser Welding Machine",
  "Closed Laser Welding Machine",
  "Pillow Plate Laser Welding Machine",
];

/* -------------------------------------------------------
   MARKING & ENGRAVING ORDER
---------------------------------------------------------*/
const LASER_MARKING_SUB_ORDER = [
  "Fiber Laser Marking Machine",
  "UV Laser Marking Machine",
  "CO₂ Laser Marking Machine",
  "Laser Engraving Machine",
];

/* -------------------------------------------------------
   CNC SHEET BENDING ORDER
---------------------------------------------------------*/
const CNC_BENDING_ORDER = [
  "Smart Bend",
  "Power Bend",
  "CNC Sheet Bending Machine",
  "Pump-Controlled CNC Sheet Bending Machine",
  "NC Sheet Bending Machine",
  "Panel Bender",
  "CNC V-Grooving Machine",
];

/* -------------------------------------------------------
   NORMALIZATION LOGIC
---------------------------------------------------------*/
function normalizeSubcategory(name = "") {
  const n = name.toLowerCase().trim();

  if (n.includes("c series") || n.startsWith("c "))
    return "Sheet Laser Cutting Machine – C Series";

  if (n.includes("electrical") || n.includes("electrolam"))
    return "Electrical Steel / Electrolamination Sheet Laser Cutting Machines";

  if (n.includes("sheet") && n.includes("tube"))
    return "Sheet and Tube Laser Cutting Machine";

  if (n.includes("fully automatic"))
    return "Fully Automatic Sheet Laser Cutting Machine";

  if (n.includes("sheet laser cutting") || n.startsWith("sheet laser"))
    return "Sheet Laser Cutting Machine";

  if (n.includes("tube") || n.includes("pipe"))
    return "Tube Laser Cutting Machine or Pipe Laser Cutting Machine";

  if (n.includes("fiber") && n.includes("mark"))
    return "Fiber Laser Marking Machine";

  if (n.includes("uv") && n.includes("mark"))
    return "UV Laser Marking Machine";

  if ((n.includes("co2") || n.includes("co₂")) && n.includes("mark"))
    return "CO₂ Laser Marking Machine";

  if (n.includes("engraving"))
    return "Laser Engraving Machine";

  return name.trim();
}

/* -------------------------------------------------------
   UNIVERSAL SORTING HELPER
---------------------------------------------------------*/
function sortWithPreferred(items, getKey, orderList) {
  const clean = (s) => s.toLowerCase().trim();
  const indexOf = (val) => {
    const idx = orderList.findIndex((x) => clean(x) === clean(val));
    return idx === -1 ? Number.MAX_SAFE_INTEGER : idx;
  };

  return [...items].sort((a, b) => {
    const ak = getKey(a);
    const bk = getKey(b);
    const ai = indexOf(ak);
    const bi = indexOf(bk);

    if (ai === bi) return ak.localeCompare(bk);
    return ai - bi;
  });
}

/* -------------------------------------------------------
   ⭐ PRODUCT PRIORITY SORTING (C SERIES FIRST)
---------------------------------------------------------*/
function sortProductsByPriority(products) {
  return [...products].sort((a, b) => {
    const aC = a.name.toLowerCase().includes("c series");
    const bC = b.name.toLowerCase().includes("c series");

    if (aC && !bC) return -1;
    if (!aC && bC) return 1;

    return a.name.localeCompare(b.name);
  });
}

/* -------------------------------------------------------
   FETCH PRODUCTS
---------------------------------------------------------*/
const fetchProducts = async () => {
  const { data, error } = await supabase.from("products").select(`
    id, Segment, SubCategory, ProductName, ShortDescription, Thumbnail_url
  `);

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data || [];
};

/* -------------------------------------------------------
   CATEGORY GROUPING ENGINE
---------------------------------------------------------*/
const getCategoryList = (products) => {
  const grouped = {};

  products.forEach((p) => {
    const seg = p.Segment;
    const sub = normalizeSubcategory(p.SubCategory);

    if (!grouped[seg]) grouped[seg] = { subs: new Set(), products: [] };

    grouped[seg].subs.add(sub);

    grouped[seg].products.push({
      id: p.id,
      name: p.ProductName,
      subcategory: sub,
      description: p.ShortDescription || "",
      image: p.Thumbnail_url?.[0] || null,
    });
  });

  let result = Object.entries(grouped).map(([segment, obj]) => {
    let subs = [...obj.subs];
    const segNorm = segment.toLowerCase();

    if (segNorm === "laser cutting")
      subs = sortWithPreferred(subs, (s) => s, LASER_CUTTING_SUB_ORDER);

    if (segNorm === "laser welding")
      subs = sortWithPreferred(subs, (s) => s, LASER_WELDING_SUB_ORDER);

    if (segNorm === "laser marking & engraving")
      subs = sortWithPreferred(subs, (s) => s, LASER_MARKING_SUB_ORDER);

    if (segNorm === "cnc sheet bending")
      subs = sortWithPreferred(subs, (s) => s, CNC_BENDING_ORDER);

    return {
      id: segment,
      name: segment,
      subs,
      products: obj.products,
    };
  });

  return sortWithPreferred(result, (c) => c.name, CATEGORY_ORDER);
};

/* -------------------------------------------------------
   MAIN PRODUCT COMPONENT
---------------------------------------------------------*/
export default function Product() {
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [enquiryInitialData, setEnquiryInitialData] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [categoryId, setCategoryId] = useState("");
  const [sub, setSub] = useState("");
  const [mobileCatOpen, setMobileCatOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const PRODUCTS_PER_PAGE = 9;
  const productsRef = useRef(null);
  const triggeredScroll = useRef(false);
  const isInitial = useRef(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const CATEGORIES = useMemo(() => getCategoryList(products), [products]);

  useEffect(() => {
    if (!loading && CATEGORIES.length > 0) {
      setCategoryId(CATEGORIES[0].id);
      setSub(CATEGORIES[0].subs[0]);
    }
  }, [loading, CATEGORIES]);

  const category = useMemo(
    () => CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0],
    [categoryId, CATEGORIES]
  );

  /* -------------------------------------------------------
     ⭐ FILTER + SORT PRODUCTS (C SERIES FIRST)
  ---------------------------------------------------------*/
  const filteredProducts = useMemo(() => {
    if (!category) return [];
    const items = category.products.filter((p) => p.subcategory === sub);
    return sortProductsByPriority(items);
  }, [category, sub]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  function goToPage(p) {
    if (p < 1 || p > totalPages) return;
    triggeredScroll.current = true;
    setCurrentPage(p);

    setTimeout(() => {
      productsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  }

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }
    if (!triggeredScroll.current) return;

    triggeredScroll.current = false;

    setTimeout(() => {
      productsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  }, [sub, categoryId]);

  if (loading) return <Loading text="Products" />;

  /* -------------------------------------------------------
     UI BELOW IS COMPLETELY UNCHANGED
  ---------------------------------------------------------*/

  return (
    <section
      id="products"
      className="min-h-screen py-12 lg:py-16 my-16 bg-gradient-to-br from-neutral-950 via-neutral-900 to-zinc-900 relative"
    >
      <div ref={productsRef} className="max-w-[1600px] mx-auto px-4 sm:px-6 pt-16">

        {/* HEADER */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl lg:text-6xl font-normal font-primary text-darkBgText mb-5 tracking-tight">
            Industrial Equipment Catalog
          </h2>
          <p className="text-darkBgText opacity-60 text-lg md:text-xl max-w-2xl mx-auto font-secondary">
            Explore our complete range of laser cutting, welding, marking, and automation systems.
          </p>
        </div>

        {/* CATEGORY PILLS */}
        <div className="hidden lg:flex justify-center font-primary gap-3 mb-12">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                triggeredScroll.current = true;
                setCategoryId(c.id);
                setSub(c.subs[0]);
                setCurrentPage(1);
              }}
              className={`px-8 py-3.5 font-medium transition-all duration-300 border border-white/20 ${
                c.id === categoryId
                  ? "bg-red-600 text-darkBgText shadow-lg hover:bg-red-800"
                  : "bg-black/40 text-darkBgText text-opacity-80 hover:text-darkBgText hover:bg-black/60"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* MOBILE CATEGORY DROPDOWN */}
        <div className="lg:hidden mb-8 flex flex-col gap-3 font-secondary">
          <div className="relative">
            <button
              onClick={() => setMobileCatOpen(!mobileCatOpen)}
              className="w-full px-5 py-4 bg-black/40 border border-zinc-800 text-darkBgText font-semibold flex justify-between items-center"
            >
              <span className="flex items-center gap-2">
                <Grid className="w-5 h-5 text-red-400" />
                {category.name}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  mobileCatOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {mobileCatOpen && (
              <div className="absolute z-20 w-full mt-2 bg-zinc-900 border border-zinc-800 shadow-2xl max-h-64 overflow-y-auto">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      triggeredScroll.current = true;
                      setCategoryId(c.id);
                      setSub(c.subs[0]);
                      setMobileCatOpen(false);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-5 py-4 border-b border-zinc-800 ${
                      c.id === categoryId
                        ? "bg-red-600 text-darkBgText shadow-lg"
                        : "bg-black/40 text-darkBgText text-opacity-80 hover:bg-black/60"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* SUBCATEGORY */}
          <div className="relative">
            <button
              onClick={() => setMobileSubOpen(!mobileSubOpen)}
              className="w-full px-5 py-4 bg-black/40 border border-zinc-800 text-white font-semibold flex justify-between items-center"
            >
              <span>{sub}</span>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  mobileSubOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {mobileSubOpen && (
              <div className="absolute z-20 w-full mt-2 bg-zinc-900 border border-zinc-800 shadow-2xl max-h-64 overflow-y-auto">
                {category.subs.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      triggeredScroll.current = true;
                      setSub(s);
                      setMobileSubOpen(false);
                      setCurrentPage(1);
                    }}
                    className="w-full text-left px-5 py-4 border-b border-zinc-800 bg-red-600 bg-opacity-30 text-darkBgText font-semibold"
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
          <aside className="bg-gradient-to-b from-zinc-900 to-black p-6 border border-zinc-800 h-[600px] sticky top-24 flex flex-col shadow-2xl">
            <h4 className="text-xl mb-6 font-primary text-darkBgText text-opacity-80 flex items-center gap-3 pb-4 border-b border-zinc-800">
              <div className="p-2 bg-red-950/50 border border-red-600/30">
                <Grid className="w-5 h-5 text-red-600" />
              </div>
              <span>Sub Categories</span>
            </h4>

            <nav className="flex flex-col gap-2 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-700">
              {category.subs.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    triggeredScroll.current = true;
                    setSub(s);
                    setCurrentPage(1);
                  }}
                  className={`group w-full text-left px-4 py-3.5 font-semibold transition-all flex items-center justify-between ${
                    s === sub
                      ? "bg-red-600 text-darkBgText shadow-lg hover:bg-red-800"
                      : "bg-black/40 text-darkBgText text-opacity-80 hover:bg-black/60"
                  }`}
                >
                  <span>{s}</span>
                  <ArrowRight
                    className={`w-10 h-10 transition-all ${
                      s === sub ? "opacity-100" : "opacity-0 group-hover:opacity-100"
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
                  className="group bg-gradient-to-b from-zinc-900 to-black overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all hover:shadow-2xl hover:shadow-red-950/20"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-3xl font-primary font-medium text-darkBgText mb-2 group-hover:text-white">
                      {p.name}
                    </h3>
                    <p className="text-md text-darkBgText text-opacity-70 font-secondary mb-5 leading-relaxed line-clamp-2">
                      {p.description}
                    </p>

                    <div className="flex w-full gap-3 mt-2 font-secondary">
                      <button
                        onClick={() => navigate(`/product/${p.id}`)}
                        className="flex-1 px-6 py-3.5 font-semibold border border-white/40 bg-red-600 hover:bg-red-800 text-darkBgTextHover flex items-center justify-center gap-2"
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
                        className="flex-1 px-6 py-3.5 font-semibold border border-white/40 bg-red-600 hover:bg-red-800 text-darkBgTextHover flex items-center justify-center gap-2"
                      >
                        <Phone className="w-4 h-4" />
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
                  className="px-4 py-2 border border-zinc-700 rounded-md bg-black/50 text-white disabled:opacity-50"
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
                  className="px-4 py-2 border border-zinc-700 rounded-md bg-black/50 text-white disabled:opacity-50"
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
              className="group bg-gradient-to-b from-zinc-900 to-black overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all"
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
                <h3 className="text-2xl font-medium text-white mb-2">
                  {p.name}
                </h3>
                <p className="text-md text-gray-400 mb-4">{p.description}</p>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => navigate(`/product/${p.id}`)}
                    className="flex-1 max-w-[180px] px-5 py-3 bg-red-600 text-white font-medium hover:bg-red-800 transition-all border border-white/40 flex items-center justify-center gap-2"
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
                    className="flex-1 max-w-[180px] px-5 py-3 bg-red-600 text-white font-medium hover:bg-red-800 transition-all border border-white/40 flex items-center justify-center gap-2"
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
