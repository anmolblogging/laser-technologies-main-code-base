import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { supabase } from "../lib/supabase";

const BRAND = {
  primary: "#6b0f0f",
  hover: "#4f0b0b",
  light: "#fef2f2",
  border: "rgba(107,15,15,0.15)",
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [mobileExpandedSegment, setMobileExpandedSegment] = useState(null);
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Awards", href: "/awards" },
    { name: "Careers", href: "/careers" },
    { name: "Service", href: "/service" },
    { name: "Knowledge", href: "/knowledge" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("Segment, SubCategory")
          .order("Segment", { ascending: true })
          .order("SubCategory", { ascending: true });

        if (error) throw error;
        const organized = {};
        data.forEach((product) => {
          if (!organized[product.Segment]) {
            organized[product.Segment] = new Set();
          }
          organized[product.Segment].add(product.SubCategory);
        });
        const final = {};
        Object.keys(organized).forEach((segment) => {
          final[segment] = Array.from(organized[segment]);
        });
        setProductData(final);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90  shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo placeholder */}
          <div className="flex items-center">
            <a href="/">
              <img
                src="https://www.lasertechnologies.co.in/images/footer/footer-logo-large.png"
                alt="Logo"
                className="h-12 w-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {/* Home Button */}
            <a
              href="/"
              className="px-4 py-2 text-gray-700 font-medium transition-all duration-200"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = BRAND.primary;
                e.currentTarget.style.backgroundColor = BRAND.light;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#374151";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Home
            </a>

            {/* Products Dropdown */}
            <div
              className="relative"
              ref={containerRef}
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={(e) => {
                const related =
                  e.relatedTarget ||
                  (e.nativeEvent && e.nativeEvent.relatedTarget);
                if (
                  related &&
                  containerRef.current &&
                  containerRef.current.contains(related)
                )
                  return;
                setIsProductsOpen(false);
                setHoveredSegment(null);
              }}
            >
              <button
                className="px-4 py-2 text-gray-700 font-medium flex items-center gap-1 transition-all duration-200"
                style={
                  isProductsOpen
                    ? {
                        color: BRAND.primary,
                        backgroundColor: BRAND.light,
                      }
                    : {}
                }
              >
                Products
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isProductsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isProductsOpen && !loading && (
                <div
                  className="absolute top-full left-0 flex z-40"
                  style={{ border: `1px solid ${BRAND.border}` }}
                >
                  {/* Segments */}
                  <div className="bg-white shadow-xl py-2 px-2 min-w-[200px]">
                    {Object.keys(productData).map((segment) => (
                      <div
                        key={segment}
                        onMouseEnter={() => setHoveredSegment(segment)}
                        className="px-4 py-3 text-sm font-medium cursor-pointer flex items-center justify-between transition-all duration-150"
                        style={{
                          backgroundColor:
                            hoveredSegment === segment
                              ? BRAND.light
                              : "transparent",
                          color:
                            hoveredSegment === segment
                              ? BRAND.primary
                              : "#374151",
                        }}
                      >
                        <span>{segment}</span>
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    ))}
                  </div>

                  {/* Subcategories */}
                  {hoveredSegment && (
                    <div
                      className="bg-white shadow-xl px-2 py-2 ml-2 min-w-[220px] max-h-[70vh] overflow-y-auto"
                      style={{ border: `1px solid ${BRAND.border}` }}
                    >
                      <div
                        className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider mb-2"
                        style={{ borderBottom: `1px solid ${BRAND.border}` }}
                      >
                        {hoveredSegment}
                      </div>
                      {productData[hoveredSegment].map((subCategory) => (
                        <a
                          key={subCategory}
                          href={`/products/${encodeURIComponent(
                            hoveredSegment
                          )}/${encodeURIComponent(subCategory)}`}
                          className="block px-4 py-2.5 text-sm transition-all duration-150 font-medium"
                          style={{ color: "#374151" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = BRAND.light;
                            e.currentTarget.style.color = BRAND.primary;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                            e.currentTarget.style.color = "#374151";
                          }}
                        >
                          {subCategory}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Other Nav Items */}
            {navItems
              .filter((item) => item.name !== "Home")
              .map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-gray-700 font-medium transition-all duration-200"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = BRAND.primary;
                    e.currentTarget.style.backgroundColor = BRAND.light;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#374151";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {item.name}
                </a>
              ))}
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = BRAND.light;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav
            className="md:hidden py-4"
            style={{ borderTop: `1px solid ${BRAND.border}` }}
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-3 text-gray-700 transition-all duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = BRAND.light;
                  e.currentTarget.style.color = BRAND.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#374151";
                }}
              >
                {item.name}
              </a>
            ))}

            {/* Mobile Products Accordion */}
            <div>
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-gray-700 transition-all duration-200 font-medium"
                style={
                  isProductsOpen
                    ? { backgroundColor: BRAND.light, color: BRAND.primary }
                    : {}
                }
              >
                <span>Products</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isProductsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isProductsOpen && !loading && (
                <div className="mt-2 max-h-[60vh] overflow-y-auto space-y-1">
                  {Object.keys(productData).map((segment) => (
                    <div
                      key={segment}
                      className="ml-4"
                      style={{ borderLeft: `2px solid ${BRAND.border}` }}
                    >
                      <button
                        onClick={() =>
                          setMobileExpandedSegment(
                            mobileExpandedSegment === segment ? null : segment
                          )
                        }
                        className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium transition-colors duration-200"
                        style={
                          mobileExpandedSegment === segment
                            ? { color: BRAND.primary }
                            : {}
                        }
                      >
                        <span>{segment}</span>
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform duration-200 ${
                            mobileExpandedSegment === segment
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </button>
                      {mobileExpandedSegment === segment && (
                        <div className="space-y-0.5 pb-2">
                          {productData[segment].map((subCategory) => (
                            <a
                              key={subCategory}
                              href={`/products/${encodeURIComponent(
                                segment
                              )}/${encodeURIComponent(subCategory)}`}
                              className="block px-6 py-2 text-sm text-gray-600 transition-all duration-200 font-medium"
                              onClick={() => {
                                setIsMenuOpen(false);
                                setIsProductsOpen(false);
                                setMobileExpandedSegment(null);
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  BRAND.light;
                                e.currentTarget.style.color = BRAND.primary;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  "transparent";
                                e.currentTarget.style.color = "#4b5563";
                              }}
                            >
                              {subCategory}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
