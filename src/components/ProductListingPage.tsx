import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, Mail, X, User, Mail as MailIcon, Phone, Building2, CheckCircle, Loader2, Tag, Layers } from "lucide-react";

import { supabase } from "../lib/supabase";
import Loading from './Loading';

const logo = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/dark_BACKGROUND.jpg';

interface Product {
  id: string;
  ProductName: string;
  Segment: string;
  SubCategory: string;
  Thumbnail_url?: string[];
  ShortDescription?: string;
  Features?: string[];
}

interface EnquiryProduct {
  name: string;
  subcategory: string;
  segment: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

const BRAND = {
  primary: '#f31524',
  hover: '#f31524',
  light: '#fef2f2',
  border: 'rgba(107,15,15,0.15)',
  gradient: 'linear-gradient(135deg, #6b0f0f 0%, #4f0b0b 100%)',
};

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

  if ((n.includes("tube") || n.includes("pipe")) && n.includes("cutting"))
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
   PRODUCT ENQUIRY MODAL  (identical UI to CalendarSection)
---------------------------------------------------------*/
function ProductEnquiryModal({
  product,
  onClose,
}: {
  product: EnquiryProduct;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\+?[\d\s\-()]{7,15}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid phone number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/product-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          product_name: product.name,
          product_subcategory: product.subcategory,
          product_segment: product.segment,
        }),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const inputClass = (error?: string) =>
    `w-full pl-10 pr-4 py-3 text-sm text-gray-800 bg-white border outline-none
     transition-colors duration-150 placeholder:text-gray-400 font-primary
     ${
       error
         ? "border-red-400 focus:border-red-600"
         : "border-gray-200 focus:border-gray-800"
     }`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-lg bg-white overflow-hidden shadow-2xl"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* Red top stripe */}
        <div className="h-[3px] w-full bg-red-600" />

        {/* Header */}
        <div className="px-8 pt-7 pb-5 border-b border-gray-100">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold text-red-600 tracking-[0.2em] uppercase mb-2 font-primary">
                Product Enquiry
              </p>
              <h2 className="text-xl font-semibold text-gray-900 leading-snug font-primary">
                {product.name}
              </h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2.5">
                <span className="flex items-center gap-1.5 text-xs text-gray-400 font-primary">
                  <Layers className="w-3.5 h-3.5 flex-shrink-0" />
                  {product.segment}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-400 font-primary">
                  <Tag className="w-3.5 h-3.5 flex-shrink-0" />
                  {product.subcategory}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-1.5 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success state */}
        {status === "success" ? (
          <div className="px-8 py-14 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-red-50 flex items-center justify-center mb-5">
              <CheckCircle className="w-7 h-7 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 font-primary">
              Enquiry Submitted!
            </h3>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed font-primary">
              We've received your enquiry for{" "}
              <span className="font-medium text-gray-700">{product.name}</span>.
              Our team will get back to you shortly.
            </p>
            <button
              onClick={onClose}
              className="mt-8 px-8 py-3 bg-red-600 text-white text-sm font-semibold
                         hover:bg-red-700 transition-colors font-primary"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="px-8 py-7">
            <div className="space-y-5">

              {/* Name */}
              <div>
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-[0.15em] mb-1.5 font-primary">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange("name")}
                    className={inputClass(errors.name)}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-500 font-primary">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-[0.15em] mb-1.5 font-primary">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={handleChange("email")}
                    className={inputClass(errors.email)}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500 font-primary">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-[0.15em] mb-1.5 font-primary">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={handleChange("phone")}
                    className={inputClass(errors.phone)}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1.5 text-xs text-red-500 font-primary">{errors.phone}</p>
                )}
              </div>

              {/* Company */}
              <div>
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-[0.15em] mb-1.5 font-primary">
                  Company{" "}
                  <span className="text-gray-300 font-normal normal-case tracking-normal">
                    (optional)
                  </span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input
                    type="text"
                    placeholder="Your company name"
                    value={form.company}
                    onChange={handleChange("company")}
                    className={inputClass()}
                  />
                </div>
              </div>
            </div>

            {/* Error banner */}
            {status === "error" && (
              <div className="mt-5 px-4 py-3 bg-red-50 border border-red-200">
                <p className="text-sm text-red-600 font-primary">
                  Something went wrong. Please try again or contact us directly.
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-6 w-full py-3.5 bg-red-600 hover:bg-red-700 disabled:opacity-60
                         text-white text-sm font-semibold transition-colors font-primary
                         flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting…
                </>
              ) : (
                "Submit Enquiry"
              )}
            </button>

            <p className="mt-4 text-center text-xs text-gray-400 font-primary">
              Our team will reach out to you shortly.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   MAIN PAGE COMPONENT
---------------------------------------------------------*/
const ProductListingPage: React.FC = () => {
  const { segment, subcategory } = useParams<{ segment?: string; subcategory?: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [allSubcategories, setAllSubcategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [enquiryProduct, setEnquiryProduct] = useState<EnquiryProduct | null>(null);

  const navContainerRef = useRef<HTMLDivElement>(null);
  const activeButtonRef = useRef<HTMLButtonElement>(null);

  const decodedSegment = decodeURIComponent(segment || '');
  const decodedSubcategory = decodeURIComponent(subcategory || '');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .eq('Segment', decodedSegment)
          .order('ProductName', { ascending: true });

        if (productsError) throw productsError;

        const filteredProducts: Product[] = [];
        const subMap = new Set<string>();

        (productsData || []).forEach((p) => {
          const normSub = normalizeSubcategory(p.SubCategory);
          subMap.add(normSub);

          if (normSub === decodedSubcategory) {
            filteredProducts.push(p);
          }
        });

        setProducts(filteredProducts);
        setAllSubcategories([...subMap].sort());
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (decodedSegment) {
      fetchData();
    }
  }, [decodedSegment, decodedSubcategory]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [decodedSegment, decodedSubcategory]);

  useEffect(() => {
    if (activeButtonRef.current && navContainerRef.current) {
      activeButtonRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [decodedSubcategory, allSubcategories]);

  const handleViewProduct = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleEnquire = (product?: Product) => {
    setEnquiryProduct({
      name: product?.ProductName ?? '',
      subcategory: decodedSubcategory,
      segment: decodedSegment,
    });
  };

  if (loading) {
    return <Loading text='Products' />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50">
      <header
        className="relative mt-16 md:mt-20 pb-4 bg-black"
        style={{ backgroundImage: `url(${logo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-8 pb-4">
            <button
              onClick={() => navigate('/')}
              className="group inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/30 text-white transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="font-medium text-sm tracking-wide">Back to Home</span>
            </button>
          </div>
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-white leading-tight tracking-tight">
              {decodedSegment}
            </h1>
            <div className="space-y-4">
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl py-4 mx-auto leading-relaxed font-light">
                Explore our curated collection of premium products
              </p>
            </div>
            <div className="flex items-center justify-center gap-4 pt-8">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 pb-4 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
      </header>

      {/* Subcategory Navigation */}
      {allSubcategories.length > 1 && (
        <div className="bg-white shadow-sm border-b sticky top-20 z-40">
          <div className="container mx-auto px-4 py-6">
            <h2 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">
              Browse <strong>{decodedSubcategory}</strong> Categories
            </h2>

            {/* Mobile Dropdown */}
            <div className="block sm:hidden">
              <select
                value={decodedSubcategory}
                onChange={(e) =>
                  navigate(`/products/${encodeURIComponent(decodedSegment)}/${encodeURIComponent(e.target.value)}`)
                }
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Select subcategory"
              >
                {allSubcategories.map((subcat) => (
                  <option key={subcat} value={subcat}>
                    {subcat}
                  </option>
                ))}
              </select>
            </div>

            {/* Scrollable buttons for tablet+ */}
            <div
              ref={navContainerRef}
              className="hidden sm:flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            >
              {allSubcategories.map((subcat) => {
                const isActive = subcat === decodedSubcategory;
                return (
                  <button
                    key={subcat}
                    ref={isActive ? activeButtonRef : null}
                    onClick={() =>
                      navigate(`/products/${encodeURIComponent(decodedSegment)}/${encodeURIComponent(subcat)}`)
                    }
                    className="px-4 py-2 text-sm mt-2 font-medium transition-all duration-200 whitespace-nowrap"
                    style={{
                      backgroundColor: isActive ? BRAND.primary : 'white',
                      color: isActive ? 'white' : '#374151',
                      border: `2px solid ${isActive ? BRAND.primary : BRAND.border}`,
                      boxShadow: isActive ? '0 4px 12px rgba(107,15,15,0.2)' : 'none',
                      outline: 'none',
                      borderRadius: '0',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = BRAND.light;
                        e.currentTarget.style.borderColor = BRAND.primary;
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(107,15,15,0.15)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.borderColor = BRAND.border;
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }
                    }}
                  >
                    {subcat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h3>
            <p className="text-gray-600 text-lg mb-6">We couldn't find any products in this category.</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 font-medium transition-all duration-200"
              style={{ backgroundColor: BRAND.primary, color: 'white' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = BRAND.hover;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = BRAND.primary;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Browse All Products
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8 flex justify-between items-center">
              <p className="text-sm text-gray-500 font-medium">
                Showing <span className="font-semibold text-gray-900">{products.length}</span> result{products.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {products.map((product, index) => (
                <article
                  key={product.id}
                  className="bg-white border border-black/10 flex flex-col justify-between overflow-hidden"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <div className="h-[250px] md:h-[300px] bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden flex-shrink-0">
                    {product.Thumbnail_url && product.Thumbnail_url[0] ? (
                      <img
                        src={product.Thumbnail_url[0]}
                        alt={product.ProductName}
                        className="w-full h-full object-fit transition-transform duration-500 hover:scale-110"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <h3 className="text-2xl font-primary font-medium text-[#060C2A] mb-2 line-clamp-2">{product.ProductName}</h3>
                    {product.ShortDescription && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.ShortDescription}</p>
                    )}
                    {product.Features && product.Features.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-semibold uppercase mb-2" style={{ color: BRAND.primary }}>Key Features</p>
                        <ul className="text-xs space-y-1 list-inside list-disc pl-2 text-gray-600">
                          {product.Features.slice(0, 2).map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <svg className="w-3 h-3 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span className="line-clamp-1">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="flex items-center gap-3 mt-auto">
                      <button
                        onClick={() => handleViewProduct(product.id)}
                        className="flex-1 py-3 px-4 text-[#060C2A] bg-opacity-20 bg-whiteBgButtonBg hover:bg-opacity-20 hover:bg-whiteBgButtonBg hover:text-[#060C2A] font-secondary font-semibold flex items-center justify-center gap-2 shadow-md transition-transform duration-200 hover:scale-105"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <Eye className="h-4 w-4" /> View
                      </button>
                      <button
                        onClick={() => handleEnquire(product)}
                        className="flex-1 py-3 px-4 text-[#060C2A] bg-opacity-20 bg-whiteBgButtonBg hover:bg-opacity-20 hover:bg-whiteBgButtonBg hover:text-[#060C2A] font-secondary font-semibold flex items-center justify-center gap-2 shadow-md transition-transform duration-200 hover:scale-105"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(107,15,15,0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <Mail className="h-4 w-4" /> Enquire
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Product Enquiry Modal */}
      {enquiryProduct && (
        <ProductEnquiryModal
          product={enquiryProduct}
          onClose={() => setEnquiryProduct(null)}
        />
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
        button, article, div {
          border-radius: 0 !important;
        }
      `}</style>
    </div>
  );
};

export default ProductListingPage;