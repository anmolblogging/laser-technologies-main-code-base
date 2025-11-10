import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ChevronRight, ShoppingCart } from "lucide-react";
import { supabase } from "../lib/supabase";

const Logo = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/logo.png';

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

  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [mobileExpandedSegment, setMobileExpandedSegment] = useState<string | null>(null);
  const [mobileExpandedMore, setMobileExpandedMore] = useState(false);
  const [mobileExpandedAbout, setMobileExpandedAbout] = useState(false);
  const [mobileExpandedProducts, setMobileExpandedProducts] = useState(false);

  const [productData, setProductData] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const moreContainerRef = useRef<HTMLDivElement | null>(null);

  const navigationStructure = [
    { type: "link", name: "Home", href: "/" },
    { type: "dropdown", name: "Product", key: "products" },
    { type: "dropdown", name: "About", key: "about" },
    { type: "link", name: "CSR", href: "/csr" },
    { type: "link", name: "Contact", href: "/contact" },
    { type: "dropdown", name: "Knowledge", key: "Knowledge" },
  ];
  
  const KnowledgeItems = [
    { name: "Laser Gurukul", href: "/laserGurukul" },
    { name: "Laser University", href: "/laser-university" },
    { name: "Articles", href: "/articles" },
  ];

  const aboutItems = [
    { name: "About Company", href: "/about/company" },
    { name: "Milestone", href: "/about/milestone" },
    { name: "Awards & Accolades", href: "/awards" },
    { name: "Careers", href: "/careers" },
    { name: "News & Media", href: "/news" },
    { name: "Our Partners", href: "/partners" },
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
        const organized: Record<string, Set<string>> = {};
        data.forEach((product: any) => {
          if (!organized[product.Segment]) {
            organized[product.Segment] = new Set();
          }
          organized[product.Segment].add(product.SubCategory);
        });
        const final: Record<string, string[]> = {};
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

  const renderDesktopNav = () => {
    return navigationStructure.map((item) => {
      if (item.type === "link") {
        return (
          <a
            key={item.name}
            href={item.href}
            className="px-4 py-2 font-medium transition-all duration-200 relative group"
            style={{ color: COLORS.whiteBgText }}
          >
            {item.name}
            <span
              className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
              style={{ backgroundColor: COLORS.whiteBgTextHover }}
            ></span>
          </a>
        );
      }

      if (item.type === "dropdown" && item.key === "products") {
        return (
          <div
            key={item.name}
            className="relative"
            ref={containerRef}
            onMouseEnter={() => setIsProductsOpen(true)}
            onMouseLeave={(e) => {
              const related = e.relatedTarget || (e.nativeEvent && e.nativeEvent.relatedTarget);
              if (related && containerRef.current && containerRef.current.contains(related)) return;
              setIsProductsOpen(false);
              setHoveredSegment(null);
            }}
          >
            <button
              className="px-4 py-2 bg-transparent hover:bg-transparent font-medium flex items-center gap-1 transition-all duration-200 relative group"
              style={{ color: COLORS.whiteBgText }}
            >
              {item.name}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${isProductsOpen ? "rotate-180" : ""}`}
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
                        backgroundColor: hoveredSegment === segment ? "rgba(243, 21, 36, 0.05)" : "transparent",
                        color: hoveredSegment === segment ? COLORS.whiteBgTextHover : COLORS.whiteBgText,
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
                      style={{ borderBottom: `1px solid ${COLORS.border}`, color: COLORS.whiteBgText }}
                    >
                      {hoveredSegment}
                    </div>

                    {productData[hoveredSegment]?.map((subCategory) => (
                      <a
                        key={subCategory}
                        href={`/products/${encodeURIComponent(hoveredSegment)}/${encodeURIComponent(subCategory)}`}
                        className="block px-4 py-2.5 text-sm transition-all duration-150 font-medium"
                        style={{ color: COLORS.whiteBgText }}
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
        );
      }

      if (item.type === "dropdown" && item.key === "about") {
        return (
          <div
            key={item.name}
            className="relative"
            onMouseEnter={() => setIsAboutOpen(true)}
            onMouseLeave={() => setIsAboutOpen(false)}
          >
            <button
              className="px-4 py-2 bg-transparent hover:bg-transparent font-medium flex items-center gap-1 transition-all duration-200 relative group"
              style={{ color: COLORS.whiteBgText }}
            >
              {item.name}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${isAboutOpen ? "rotate-180" : ""}`}
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
                {aboutItems.map((aboutItem) => (
                  <a
                    key={aboutItem.name}
                    href={aboutItem.href}
                    className="block px-4 py-2.5 text-sm transition-all duration-200 font-medium"
                    style={{ color: COLORS.whiteBgText }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = COLORS.whiteBgTextHover;
                      e.currentTarget.style.backgroundColor = "rgba(243, 21, 36, 0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = COLORS.whiteBgText;
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    {aboutItem.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        );
      }

      if (item.type === "dropdown" && item.key === "Knowledge") {
        return (
          <div
            key={item.name}
            className="relative"
            ref={moreContainerRef}
            onMouseEnter={() => setIsMoreOpen(true)}
            onMouseLeave={(e) => {
              const related = e.relatedTarget || (e.nativeEvent && e.nativeEvent.relatedTarget);
              if (related && moreContainerRef.current && moreContainerRef.current.contains(related)) return;
              setIsMoreOpen(false);
            }}
          >
            <button
              className="px-4 py-2 bg-transparent hover:bg-transparent font-medium flex items-center gap-1 transition-all duration-200 relative group"
              style={{ color: COLORS.whiteBgText }}
            >
              {item.name}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${isMoreOpen ? "rotate-180" : ""}`}
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
                {KnowledgeItems.map((moreItem) => (
                  <a
                    key={moreItem.name}
                    href={moreItem.href}
                    className="block px-4 py-2.5 text-sm transition-all duration-200 font-medium"
                    style={{ color: COLORS.whiteBgText }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = COLORS.whiteBgTextHover;
                      e.currentTarget.style.backgroundColor = "rgba(243, 21, 36, 0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = COLORS.whiteBgText;
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    {moreItem.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        );
      }

      return null;
    });
  };

  const renderMobileNav = () => {
    return navigationStructure.map((item) => {
      if (item.type === "link") {
        return (
          <a
            key={item.name}
            href={item.href}
            className="block px-4 py-3 font-medium"
            style={{ color: COLORS.whiteBgText }}
            onClick={() => setIsMenuOpen(false)}
          >
            {item.name}
          </a>
        );
      }

      if (item.type === "dropdown" && item.key === "products") {
        return (
          <div key={item.name}>
            <button
              onClick={() => setMobileExpandedProducts(!mobileExpandedProducts)}
              className="flex items-center justify-between bg-transparent w-full px-4 py-3 font-primary text-black font-medium"
            >
              <span>{item.name}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${mobileExpandedProducts ? "rotate-180" : ""}`}
              />
            </button>

            {mobileExpandedProducts && !loading && (
              <div
                className="mx-4 mt-2 mb-3 rounded-lg overflow-hidden"
                style={{ border: `1px solid ${COLORS.border}`, backgroundColor: 'rgba(6,12,42,0.02)' }}
              >
                <div className="max-h-[60vh] overflow-y-auto">
                  {Object.keys(productData).map((segment, segmentIndex) => (
                    <div
                      key={segment}
                      style={{
                        borderBottom: segmentIndex !== Object.keys(productData).length - 1 ? `1px solid ${COLORS.border}` : 'none',
                      }}
                    >
                      <button
                        onClick={() =>
                          setMobileExpandedSegment(
                            mobileExpandedSegment === segment ? null : segment
                          )
                        }
                        className="flex items-center justify-between bg-transparent w-full px-4 py-3 font-primary text-black hover:text-black font-medium hover:bg-white/30 "
                      >
                        <span>{segment}</span>
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform ${
                            mobileExpandedSegment === segment ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {mobileExpandedSegment === segment && (
                        <div className="bg-white/30" style={{ borderTop: `1px solid ${COLORS.border}` }}>
                          {productData[segment].map((subCategory, subIndex) => (
                            <a
                              key={subCategory}
                              href={`/products/${encodeURIComponent(segment)}/${encodeURIComponent(subCategory)}`}
                              className="block px-6 py-2.5 text-sm text-black font-medium hover:bg-white/30 "
                              style={{ borderBottom: subIndex !== productData[segment].length - 1 ? `1px solid ${COLORS.border}` : 'none' }}
                              onClick={() => {
                                setIsMenuOpen(false);
                                setMobileExpandedProducts(false);
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
              </div>
            )}
          </div>
        );
      }

      if (item.type === "dropdown" && item.key === "about") {
        return (
          <div key={item.name}>
            <button
              onClick={() => setMobileExpandedAbout(!mobileExpandedAbout)}
              className="flex items-center justify-between bg-transparent w-full px-4 py-3 font-primary text-black font-medium"
            >
              <span>{item.name}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${mobileExpandedAbout ? "rotate-180" : ""}`}
              />
            </button>

            {mobileExpandedAbout && (
              <div
                className="mx-4 mt-2 mb-3 rounded-lg overflow-hidden"
                style={{ border: `1px solid ${COLORS.border}`, backgroundColor: 'rgba(6,12,42,0.02)' }}
              >
                {aboutItems.map((aboutItem, index) => (
                  <a
                    key={aboutItem.name}
                    href={aboutItem.href}
                    className="block px-6 py-2.5 text-sm font-medium hover:bg-white/80 transition-colors"
                    style={{ color: COLORS.whiteBgText, borderBottom: index !== aboutItems.length - 1 ? `1px solid ${COLORS.border}` : 'none' }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {aboutItem.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        );
      }

      if (item.type === "dropdown" && item.key === "Knowledge") {
        return (
          <div key={item.name}>
            <button
              onClick={() => setMobileExpandedMore(!mobileExpandedMore)}
              className="flex items-center justify-between bg-transparent w-full px-4 py-3 font-primary text-black font-medium"
            >
              <span>{item.name}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${mobileExpandedMore ? "rotate-180" : ""}`}
              />
            </button>

            {mobileExpandedMore && (
              <div
                className="mx-4 mt-2 mb-3 rounded-lg overflow-hidden"
                style={{ border: `1px solid ${COLORS.border}`, backgroundColor: 'rgba(6,12,42,0.02)' }}
              >
                {KnowledgeItems.map((moreItem, index) => (
                  <a
                    key={moreItem.name}
                    href={moreItem.href}
                    className="block px-6 py-2.5 text-sm font-medium hover:bg-white/80 transition-colors"
                    style={{ color: COLORS.whiteBgText, borderBottom: index !== KnowledgeItems.length - 1 ? `1px solid ${COLORS.border}` : 'none' }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {moreItem.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        );
      }

      return null;
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <a href="/">
              <img src={Logo} alt="Logo" className="h-12 w-auto" />
            </a>
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center space-x-1">
            {renderDesktopNav()}
            {/* Shop Now Button Desktop */}
            <a
              href="https://www.laserconsumable.co.in/" target="_blank" rel="noopener noreferrer"
              className="ml-4 px-5 py-2 rounded flex items-center gap-2 text-white hover:text-white font-medium transition-colors duration-200"
              style={{ backgroundColor: COLORS.whiteBgButtonBg }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = COLORS.whiteBgTextHover;
                const icon = (e.currentTarget.querySelector('svg') as HTMLElement);
                if (icon) icon.style.transform = "rotate(360deg)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = COLORS.whiteBgButtonBg;
                const icon = (e.currentTarget.querySelector('svg') as HTMLElement);
                if (icon) icon.style.transform = "rotate(0deg)";
              }}
            >
              Shop Now
              <ShoppingCart className="transition-transform duration-300" />
            </a>
          </nav>

          {/* MOBILE HAMBURGER */}
          <button
            className="lg:hidden p-2 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4" style={{ borderTop: `1px solid ${COLORS.border}` }}>
            {renderMobileNav()}
            {/* Shop Now Button Mobile */}
            <a
              href="https://www.laserconsumable.co.in/" target="_blank" rel="noopener noreferrer"
              className=" mt-4 mx-4 px-4 py-3 rounded text-center bg-red-600 text-white hover:text-white font-semibold flex items-center justify-center gap-2"
              onClick={() => setIsMenuOpen(false)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = COLORS.whiteBgTextHover;
                const icon = e.currentTarget.querySelector('svg') as HTMLElement;
                if (icon) icon.style.transform = "rotate(360deg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = COLORS.whiteBgButtonBg;
                const icon = e.currentTarget.querySelector('svg') as HTMLElement;
                if (icon) icon.style.transform = "rotate(0deg)";
              }}
            >
              Shop Now
              <ShoppingCart className="transition-transform duration-300" />
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
