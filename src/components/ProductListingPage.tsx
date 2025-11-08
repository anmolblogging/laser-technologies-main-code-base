import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, Mail } from "lucide-react";

import { supabase } from "../lib/supabase";
import Loading from './Loading';
import Form from './Form';

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

const BRAND = {
  primary: '#f31524',
  hover: '#f31524',
  light: '#fef2f2',
  border: 'rgba(107,15,15,0.15)',
  gradient: 'linear-gradient(135deg, #6b0f0f 0%, #4f0b0b 100%)',
};

const ProductListingPage: React.FC = () => {
  const { segment, subcategory } = useParams<{ segment?: string; subcategory?: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [allSubcategories, setAllSubcategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [enquiryInitialData, setEnquiryInitialData] = useState<Record<string,string>>({});

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
          .eq('SubCategory', decodedSubcategory)
          .order('ProductName', { ascending: true });

        if (productsError) throw productsError;

        const { data: subcategoriesData, error: subcategoriesError } = await supabase
          .from('products')
          .select('SubCategory')
          .eq('Segment', decodedSegment);

        if (subcategoriesError) throw subcategoriesError;

        const uniqueSubcategories = [...new Set(subcategoriesData?.map(item => item.SubCategory) ?? [])];

        setProducts(productsData || []);
        setAllSubcategories(uniqueSubcategories);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (decodedSegment && decodedSubcategory) {
      fetchData();
    }
  }, [decodedSegment, decodedSubcategory]);

  // page scroll
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [decodedSegment, decodedSubcategory]);

  // Auto scroll active subcategory button into view on mobile nav
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
    // open enquiry form with context (if product provided, prefill name)
    setEnquiryInitialData({
      segment: decodedSegment,
      subcategory: decodedSubcategory,
      product: product?.ProductName ?? '',
    });
    setShowEnquiryForm(true);
  };

  if (loading) {
    return <Loading text='Products'/>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50">
      <header className="relative mt-16 md:mt-20 pb-4 bg-black" style={{ backgroundImage: `url(${logo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
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
          <div className="text-center space-y-8 ">
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-white leading-tight tracking-tight">
              {decodedSegment}
            </h1>
            <div className="space-y-4">
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl py-4  mx-auto leading-relaxed font-light">
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

      {showEnquiryForm && (
        <Form
          type="PRODUCT_ENQUIRY"
          onClose={() => setShowEnquiryForm(false)}
          initialData={enquiryInitialData}
        />
      )}

      {/* Subcategory Navigation */}
      {allSubcategories.length > 1 && (
        <div className="bg-white shadow-sm border-b sticky top-20 z-40">
          <div className="container mx-auto px-4 py-6">
            <h2 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">Browse <strong>{decodedSubcategory}</strong> Categories</h2>
            <div
              ref={navContainerRef}
              className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
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
      <div className="container mx-auto px-4 py-12 md:py-16 ">
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
                              <svg className="w-3 h-3 mr-2 flex-shrink-0 " fill="currentColor" viewBox="0 0 20 20">
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
