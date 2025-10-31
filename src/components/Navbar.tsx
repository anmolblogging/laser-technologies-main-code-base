import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { supabase } from "../lib/supabase";
import Logo from '../assets/logo.png';

const COLORS = {
  whiteBgText: "#060C2A",
  whiteBgTextHover: "#f31524",
  whiteBgButtonBg: "#f31524",
  whiteBgButtonText: "#ffffff",
  darkBgText: "#ffffff",
  darkBgTextHover: "#ffffff",
  darkBgButtonBg: "#f2f2f2",
  darkBgButtonText: "#1d1d1d",
  border: "rgba(6,12,42,0.1)",
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [mobileExpandedSegment, setMobileExpandedSegment] = useState(null);
  const [mobileExpandedMore, setMobileExpandedMore] = useState(false);
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const moreContainerRef = useRef(null);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Awards", href: "/awards" },
    { name: "Careers", href: "/careers" },
  ];

  const navItemsOrder = ["Home", "Product", "About", "Contact", "Awards", "Careers"];

  const moreItems = [
    { name: "CSR", href: "/csr" },
    { name: "News & Media (Blog)", href: "/blog" },
    { name: "Article", href: "/article" },
    { name: "Knowledge", href: "/knowledge" },
    { name: "Laser Gurukul", href: "/laser-gurukul" },
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/">
              <img
                src={Logo}
                alt="Logo"
                className="h-12 w-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <a
              href="/"
              className="px-4 py-2 font-medium transition-all duration-200 relative group"
              style={{
                color: COLORS.whiteBgText,
                fontFamily: "'Titillium Web', sans-serif",
              }}
            >
              Home
              <span
                className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: COLORS.whiteBgTextHover }}
              ></span>
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
                className="px-4 py-2 bg-transparent hover:bg-transparent font-medium flex items-center gap-1 transition-all duration-200 relative group"
                style={{
                  color: COLORS.whiteBgText,
                  fontFamily: "'Titillium Web', sans-serif",
                }}
              >
                Product
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isProductsOpen ? "rotate-180" : ""
                  }`}
                />
                <span
                  className="absolute bottom-0 left-0 h-0.5 transition-all duration-300"
                  style={{
                    width: isProductsOpen ? '100%' : '0',
                    backgroundColor: COLORS.whiteBgTextHover
                  }}
                ></span>
              </button>

              {isProductsOpen && !loading && (
                <div
                  className="absolute top-full left-0 flex z-40"
                  style={{ border: `1px solid ${COLORS.border}` }}
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
                              ? "rgba(243, 21, 36, 0.05)"
                              : "transparent",
                          color:
                            hoveredSegment === segment
                              ? COLORS.whiteBgTextHover
                              : COLORS.whiteBgText,
                          fontFamily: "'Mulish', sans-serif",
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
                      style={{ border: `1px solid ${COLORS.border}` }}
                    >
                      <div
                        className="px-4 py-2 text-xs font-medium uppercase tracking-wider mb-2"
                        style={{ 
                          borderBottom: `1px solid ${COLORS.border}`,
                          color: COLORS.whiteBgText,
                          fontFamily: "'Mulish', sans-serif",
                        }}
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
                          style={{ 
                            color: COLORS.whiteBgText,
                            fontFamily: "'Mulish', sans-serif",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(243, 21, 36, 0.05)";
                            e.currentTarget.style.color = COLORS.whiteBgTextHover;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.color = COLORS.whiteBgText;
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

            {navItems.filter(item => item.name !== "Home").map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 py-2 font-medium transition-all duration-200 relative group"
                style={{
                  color: COLORS.whiteBgText,
                  fontFamily: "'Titillium Web', sans-serif",
                }}
              >
                {item.name}
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: COLORS.whiteBgTextHover }}
                ></span>
              </a>
            ))}

            {/* More Dropdown */}
            <div
              className="relative"
              ref={moreContainerRef}
              onMouseEnter={() => setIsMoreOpen(true)}
              onMouseLeave={(e) => {
                const related =
                  e.relatedTarget ||
                  (e.nativeEvent && e.nativeEvent.relatedTarget);
                if (
                  related &&
                  moreContainerRef.current &&
                  moreContainerRef.current.contains(related)
                )
                  return;
                setIsMoreOpen(false);
              }}
            >
              <button
                className="px-4 py-2 bg-transparent hover:bg-transparent font-medium flex items-center gap-1 transition-all duration-200 relative group"
                style={{
                  color: COLORS.whiteBgText,
                  fontFamily: "'Titillium Web', sans-serif",
                }}
              >
                More
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isMoreOpen ? "rotate-180" : ""
                  }`}
                />
                <span
                  className="pt-0 absolute bottom-0 left-0 h-0.5 transition-all duration-300"
                  style={{
                    width: isMoreOpen ? '100%' : '0',
                    backgroundColor: COLORS.whiteBgTextHover
                  }}
                ></span>
              </button>

              {isMoreOpen && (
                <div
                  className="absolute top-full right-0 p-2 bg-white shadow-xl py-2 min-w-[220px] z-40"
                  style={{ border: `1px solid ${COLORS.border}` }}
                >
                  {moreItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm transition-all duration-200 font-medium"
                      style={{
                        color: COLORS.whiteBgText,
                        fontFamily: "'Mulish', sans-serif",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = COLORS.whiteBgTextHover;
                        e.currentTarget.style.backgroundColor = "rgba(243, 21, 36, 0.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = COLORS.whiteBgText;
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(243, 21, 36, 0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" style={{ color: COLORS.whiteBgText }} />
            ) : (
              <Menu className="h-6 w-6" style={{ color: COLORS.whiteBgText }} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav
            className="lg:hidden py-4"
            style={{ borderTop: `1px solid ${COLORS.border}` }}
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-3 transition-all duration-200 font-medium"
                style={{
                  color: COLORS.whiteBgText,
                  fontFamily: "'Mulish', sans-serif",
                }}
                onClick={() => setIsMenuOpen(false)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(243, 21, 36, 0.05)";
                  e.currentTarget.style.color = COLORS.whiteBgTextHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = COLORS.whiteBgText;
                }}
              >
                {item.name}
              </a>
            ))}

            {/* Mobile Products Accordion */}
            <div>
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="flex items-center bg-transparent hover:bg-transparent justify-between w-full px-4 py-3 transition-all duration-200 font-medium"
                style={{
                  color: isProductsOpen ? COLORS.whiteBgTextHover : COLORS.whiteBgText,
                  fontFamily: "'Mulish', sans-serif",
                }}
              >
                <span>Product</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isProductsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isProductsOpen && !loading && (
                <div className="mt-2 max-h-[60vh]  overflow-y-auto space-y-1">
                  {Object.keys(productData).map((segment) => (
                    <div
                      key={segment}
                      className="ml-4"
                      style={{ borderLeft: `2px solid ${COLORS.border}` }}
                    >
                      <button
                        onClick={() =>
                          setMobileExpandedSegment(
                            mobileExpandedSegment === segment ? null : segment
                          )
                        }
                        className="flex bg-transparent items-center justify-between w-full px-4 py-2.5 text-sm font-medium transition-colors duration-200"
                        style={{
                          color: mobileExpandedSegment === segment ? COLORS.whiteBgTextHover : COLORS.whiteBgText,
                          fontFamily: "'Mulish', sans-serif",
                        }}
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
                              className="block bg-transparent px-6 py-2 text-sm transition-all duration-200 font-medium"
                              style={{
                                color: COLORS.whiteBgText,
                                fontFamily: "'Mulish', sans-serif",
                              }}
                              onClick={() => {
                                setIsMenuOpen(false);
                                setIsProductsOpen(false);
                                setMobileExpandedSegment(null);
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "rgba(243, 21, 36, 0.05)";
                                e.currentTarget.style.color = COLORS.whiteBgTextHover;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent";
                                e.currentTarget.style.color = COLORS.whiteBgText;
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

            {/* Mobile More Accordion */}
            <div>
              <button
                onClick={() => setMobileExpandedMore(!mobileExpandedMore)}
                className="flex items-center justify-between w-full px-4 py-3 transition-all duration-200 font-medium"
                style={{
                  color: mobileExpandedMore ? COLORS.whiteBgTextHover : COLORS.whiteBgText,
                  backgroundColor: mobileExpandedMore ? "rgba(243, 21, 36, 0.05)" : "transparent",
                  fontFamily: "'Mulish', sans-serif",
                }}
              >
                <span>More</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    mobileExpandedMore ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileExpandedMore && (
                <div className="space-y-0.5 pb-2">
                  {moreItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-8 py-2 text-sm transition-all duration-200 font-medium"
                      style={{
                        color: COLORS.whiteBgText,
                        fontFamily: "'Mulish', sans-serif",
                      }}
                      onClick={() => {
                        setIsMenuOpen(false);
                        setMobileExpandedMore(false);
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(243, 21, 36, 0.05)";
                        e.currentTarget.style.color = COLORS.whiteBgTextHover;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = COLORS.whiteBgText;
                      }}
                    >
                      {item.name}
                    </a>
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