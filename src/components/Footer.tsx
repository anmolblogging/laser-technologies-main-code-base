/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ChevronDown,
} from "lucide-react";
import { supabase } from "../lib/supabase";

const Logo = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/logo-footer.png';
const GreatPlaceToWorkLogo = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/gptw.png';

const PAGE_LIMIT = 20;

const Footer = () => {
  const [productData, setProductData] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedSegment, setExpandedSegment] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const toggleSegment = (segment: string) => {
    setExpandedSegment((prev) => (prev === segment ? null : segment));
  };

  // ✅ Fetch paginated product segments + subcategories
  useEffect(() => {
    const fetchPage = async () => {
      try {
        const from = page * PAGE_LIMIT;
        const to = from + PAGE_LIMIT - 1;

        const { data, error } = await supabase
          .from("products")
          .select("Segment, SubCategory")
          .range(from, to)
          .order("Segment", { ascending: true })
          .order("SubCategory", { ascending: true });

        if (error) throw error;

        if (!data || data.length === 0) {
          setHasMore(false);
          return;
        }

        setProductData((prev) => {
          const updated = { ...prev };
          data.forEach((item) => {
            if (!updated[item.Segment]) updated[item.Segment] = [];
            if (!updated[item.Segment].includes(item.SubCategory)) {
              updated[item.Segment].push(item.SubCategory);
            }
          });
          return updated;
        });
      } catch (err) {
        console.error("Product fetch failed:", err);
      }
    };

    if (hasMore) fetchPage();
  }, [page]);

  useEffect(() => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    if (page === 0) setLoading(false);
    else setLoading(false);
  }, [page]);

  // ✅ Page Links
  const pageLinks = {
    company: [
      { name: "Home", href: "/" },
      { name: "About Company", href: "/about/company" },
      { name: "Milestone", href: "/about/milestone" },
      { name: "Careers", href: "/careers" },
      { name: "Awards", href: "/awards" },
    ],
    resources: [
      { name: "Contact", href: "/contact" },
      { name: "CSR", href: "/csr" },
      { name: "News & Media", href: "/news" },
      { name: "Articles", href: "/articles" },
      { name: "Knowledge", href: "/laser-university" },
      { name: "Laser Gurukul", href: "/laserGurukul" },
    ],
  };

  // ✅ Social
  const socialLinks = [
    { Icon: Facebook, href: "https://www.facebook.com/LaserTechnologiesOfficial", label: "Facebook" },
    { Icon: Instagram, href: "https://www.instagram.com/lasertechnologiesofficial/", label: "Instagram" },
    { Icon: Linkedin, href: "https://www.linkedin.com/company/lasertechnologiesofficial/", label: "LinkedIn" },
    { Icon: Youtube, href: "https://www.youtube.com/@LaserTechnologiesOfficial", label: "YouTube" },
  ];

  // ✅ Contact Info
  const contactInfo = {
    email: "info@lasertechnologies.in",
    phone: "+91 8657412551",
    address: "Laser Technologies Pvt Ltd, Navi Mumbai, Maharashtra, India",
  };

  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Company Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-4 flex-wrap">
              <img src={Logo} alt="Laser Technologies Logo" className="h-12 object-contain" />
              <img src={GreatPlaceToWorkLogo} alt="Great Place to Work Certified" className="h-16 object-contain" />
            </div>

            <div className="space-y-3">
              <a 
                href={`mailto:${contactInfo.email}`} 
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">{contactInfo.email}</span>
              </a>
              <a 
                href={`tel:${contactInfo.phone}`} 
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">{contactInfo.phone}</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{contactInfo.address}</span>
              </div>
            </div>

            <div className="w-full h-48 bg-gray-900 border border-gray-800  overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8447193305805!2d72.8776559!3d19.0759837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzMzLjUiTiA3MsKwNTInMzkuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="LaserTech Office"
              />
            </div>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-white">Company</h3>
            <ul className="space-y-3">
              {pageLinks.company.map((l) => (
                <li key={l.name}>
                  <a 
                    href={l.href} 
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200 inline-block"
                  >
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-white">Resources</h3>
            <ul className="space-y-3">
              {pageLinks.resources.map((l) => (
                <li key={l.name}>
                  <a 
                    href={l.href} 
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200 inline-block"
                  >
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Accordion */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-white">Products</h3>

            {loading && Object.keys(productData).length === 0 ? (
              <p className="text-sm text-gray-400">Loading products...</p>
            ) : (
              <div className="space-y-2">
                {Object.keys(productData).map((segment) => (
                  <div key={segment} className="border border-gray-800 rounded-md overflow-hidden bg-black">
                    <button
                      onClick={() => toggleSegment(segment)}
                      className="w-full flex justify-between items-center px-4 py-3 bg-black hover:bg-gray-900 transition-colors duration-200"
                    >
                      <span className="text-sm text-gray-300 font-semibold">{segment}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                          expandedSegment === segment ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {expandedSegment === segment && (
                      <ul className="bg-black border-t border-gray-800">
                        {Array.isArray(productData[segment]) && productData[segment].map((sub) => (
                          <li key={sub} className="border-b border-gray-900 last:border-b-0">
                            <a
                              href={`/products/${encodeURIComponent(segment)}/${encodeURIComponent(sub)}`}
                              className="block px-4 py-2.5 text-xs text-gray-400 hover:text-white hover:bg-gray-900 transition-colors duration-200"
                            >
                              {sub}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
          
      {/*  Bottom Bar */}
      <div className="border-t border-gray-800 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
            
            {/* Left Section - Copyright & Developer */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              <p className="font-medium text-gray-300 ">
                © {year} LaserTechnologies Pvt Ltd
              </p>
              <span className="text-gray-700">|</span>
              <a href="https://kolacommunications.com/" target="_blank" rel="noopener noreferrer">
              <p className="text-md text-gray-400 pr-1">
                Developed by 
                <span className="text-red-100 px-2 font-medium">
                  Kola Communications
                </span>
              </p>
              </a>
            </div>

            {/* Right Section - Social Links */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 mr-2">Connect with us</span>
              <div className="flex items-center gap-1">
                {socialLinks.map(({ Icon, href, label }) => (
                  <a 
                    key={label} 
                    href={href} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="p-2 rounded-md bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white transition-all duration-200 hover:scale-110"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;