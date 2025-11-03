import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { supabase } from "../lib/supabase";
import Logo from "../assets/logo.png";

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
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [mobileExpandedSegment, setMobileExpandedSegment] = useState(null);
  const [mobileExpandedMore, setMobileExpandedMore] = useState(false);
  const [mobileExpandedAbout, setMobileExpandedAbout] = useState(false);
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);

  const containerRef = useRef(null);
  const moreContainerRef = useRef(null);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact" },
    { name: "Laser Gurukul", href: "/laserGurukul" },
    { name: "CSR", href: "/csr" },
  ];

  const moreItems = [

    { name: "Articles", href: "/articles" },
    { name: "Knowledge", href: "/knowledge" },
    { name: "Careers", href: "/careers" },
  ];

  const aboutItems = [
    { name: "About Company", href: "/about/company" },
    { name: "Milestone", href: "/about/milestone" },
    { name: "Awards", href: "/awards" },
    { name: "News & Media ", href: "/news" },
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
          <div className="flex items-center">
            <a href="/">
              <img src={Logo} alt="Logo" className="h-12 w-auto" />
            </a>
          </div>

          <nav className="hidden lg:flex items-center space-x-1">
            {/* HOME */}
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

            {/* PRODUCTS DROPDOWN (UNCHANGED) */}
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
                    width: isProductsOpen ? "100%" : "0",
                    backgroundColor: COLORS.whiteBgTextHover,
                  }}
                ></span>
              </button>

              {isProductsOpen && !loading && (
                <div
                  className="absolute top-full left-0 flex z-40"
                  style={{ border: `1px solid ${COLORS.border}` }}
                >
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
                            e.currentTarget.style.backgroundColor =
                              "rgba(243, 21, 36, 0.05)";
                            e.currentTarget.style.color =
                              COLORS.whiteBgTextHover;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
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

            {/* ✅ ABOUT DROPDOWN (ONLY NEW CHANGE, ALL STYLE SAME) */}
            <div
              className="relative"
              onMouseEnter={() => setIsAboutOpen(true)}
              onMouseLeave={() => setIsAboutOpen(false)}
            >
              <button
                className="px-4 py-2 bg-transparent hover:bg-transparent font-medium flex items-center gap-1 transition-all duration-200 relative group"
                style={{
                  color: COLORS.whiteBgText,
                  fontFamily: "'Titillium Web', sans-serif",
                }}
              >
                About
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isAboutOpen ? "rotate-180" : ""
                  }`}
                />
                <span
                  className="absolute bottom-0 left-0 h-0.5 transition-all duration-300"
                  style={{
                    width: isAboutOpen ? "100%" : "0",
                    backgroundColor: COLORS.whiteBgTextHover,
                  }}
                ></span>
              </button>

              {isAboutOpen && (
                <div
                  className="absolute top-full left-0 p-2 bg-white shadow-xl py-2 min-w-[220px] z-40"
                  style={{ border: `1px solid ${COLORS.border}` }}
                >
                  {aboutItems.map((item) => (
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
                        e.currentTarget.style.backgroundColor =
                          "rgba(243, 21, 36, 0.05)";
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

            {/* REST OF NAV ITEMS (UNCHANGED) */}
            {navItems
              .filter((item) => item.name !== "Home" && item.name !== "About")
              .map((item) => (
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

            {/* MORE DROPDOWN (UNCHANGED) */}
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
                  fontFamily: `'Titillium Web', sans-serif`,
                }}
              >
                More
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isMoreOpen ? "rotate-180" : ""
                  }`}
                />
                <span
                  className="absolute bottom-0 left-0 h-0.5 transition-all duration-300"
                  style={{
                    width: isMoreOpen ? "100%" : "0",
                    backgroundColor: COLORS.whiteBgTextHover,
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
                        fontFamily: `'Mulish', sans-serif`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = COLORS.whiteBgTextHover;
                        e.currentTarget.style.backgroundColor =
                          "rgba(243, 21, 36, 0.05)";
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

          {/* MOBILE HAMBURGER */}
          <button
            className="lg:hidden p-2 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" style={{ color: COLORS.whiteBgText }} />
            ) : (
              <Menu className="h-6 w-6" style={{ color: COLORS.whiteBgText }} />
            )}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <nav
            className="lg:hidden py-4"
            style={{ borderTop: `1px solid ${COLORS.border}` }}
          >
            {/* MOBILE HOME, ABOUT, CONTACT, etc. */}
            {navItems
              .filter((item) => item.name !== "About")
              .map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 font-medium"
                  style={{
                    color: COLORS.whiteBgText,
                    fontFamily: `'Mulish', sans-serif`,
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}

            {/* MOBILE ABOUT ACCORDION */}
            <div>
              <button
                onClick={() => setMobileExpandedAbout(!mobileExpandedAbout)}
                className="flex items-center justify-between bg-transparent w-full px-4 py-3 font-primary text-black font-medium"
              >
                <span>About</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    mobileExpandedAbout ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileExpandedAbout && (
                <div className="space-y-0.5 pb-2">
                  {aboutItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block bg-transparent px-8 py-2 text-sm font-medium"
                      style={{
                        color: COLORS.whiteBgText,
                        fontFamily: `'Mulish', sans-serif`,
                      }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* MOBILE PRODUCTS ACCORDION  */}
            <div>
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="flex items-center justify-between bg-transparent w-full px-4 py-3 font-primary text-black font-medium"
              >
                <span>Product</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
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
                      style={{ borderLeft: `2px solid ${COLORS.border}` }}
                    >
                      <button
                        onClick={() =>
                          setMobileExpandedSegment(
                            mobileExpandedSegment === segment ? null : segment
                          )
                        }
                        className="flex items-center justify-between bg-transparent w-full px-4 py-3 font-primary text-black font-medium"
                      >
                        <span>{segment}</span>
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform ${
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
                              className="flex items-center justify-between bg-transparent w-full px-4 py-3 font-primary text-black font-medium"
                              onClick={() => {
                                setIsMenuOpen(false);
                                setIsProductsOpen(false);
                                setMobileExpandedSegment(null);
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

            {/* MOBILE MORE ACCORDION (UNCHANGED) */}
            <div>
              <button
                onClick={() => setMobileExpandedMore(!mobileExpandedMore)}
                className="flex items-center justify-between bg-transparent w-full px-4 py-3 font-primary text-black font-medium"
              >
                <span>More</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    mobileExpandedMore ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileExpandedMore && (
                <div className=" ">
                  {moreItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center border justify-between bg-transparent w-full px-4 py-3 font-primary text-black font-medium"
                      onClick={() => setIsMenuOpen(false)}
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
