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
const Logo = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/footer-logo.png'

const PAGE_LIMIT = 60;

const Footer = () => {
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);
  const [expandedSegment, setExpandedSegment] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const toggleSegment = (segment) => {
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
      { name: "Knowledge", href: "/knowledge" },
      { name: "Laser Gurukul", href: "/laserGurukul" },
    ],
  };

  // ✅ Social
  const socialLinks = [
    { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { Icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  ];

  // ✅ Contact Info
  const contactInfo = {
    email: "info@lasertechnologies.in",
    phone: "+91 22 6666 6666",
    address: "Laser Technologies Pvt Ltd, Mumbai, Maharashtra, India",
  };

  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* ✅ Company Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex  items-center gap-3">
              <img src={Logo} alt="" />
            </div>

            <div className="space-y-3">
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 text-gray-400 hover:text-white">
                <Mail className="h-5 w-5" />
                <span className="text-sm">{contactInfo.email}</span>
              </a>
              <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-3 text-gray-400 hover:text-white">
                <Phone className="h-5 w-5" />
                <span className="text-sm">{contactInfo.phone}</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="h-5 w-5 mt-0.5" />
                <span className="text-sm">{contactInfo.address}</span>
              </div>
            </div>

            <div className="w-full h-48 bg-gray-900 border border-gray-800 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18..."  
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="LaserTech Office"
              />
            </div>
          </div>

          {/* ✅ Company Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase mb-4">Company</h3>
            <ul className="space-y-3">
              {pageLinks.company.map((l) => (
                <li key={l.name}>
                  <a href={l.href} className="text-sm text-gray-400 hover:text-white">{l.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* ✅ Resources */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase mb-4">Resources</h3>
            <ul className="space-y-3">
              {pageLinks.resources.map((l) => (
                <li key={l.name}>
                  <a href={l.href} className="text-sm text-gray-400 hover:text-white">{l.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* ✅ Products Accordion */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-bold uppercase mb-4">Products</h3>

            {loading && Object.keys(productData).length === 0 ? (
              <p className="text-sm text-gray-400">Loading products...</p>
            ) : (
              <div className="space-y-3">
                {Object.keys(productData).map((segment) => (
                  <div key={segment} className="rounded-md overflow-hidden">
                    <button
                      onClick={() => toggleSegment(segment)}
                      className="w-full flex justify-between items-center px-4 py-3 bg-black hover:bg-gray-800"
                    >
                      <span className="text-sm  text-gray-400 font-semibold">{segment}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          expandedSegment === segment ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {expandedSegment === segment && (
                      <ul className="bg-black border-t border-gray-800">
                        {productData[segment].map((sub) => (
                          <li key={sub} className="border-b border-gray-900">
                            <a
                              href={`/products/${encodeURIComponent(segment)}/${encodeURIComponent(sub)}`}
                              className="block px-4 py-2.5 text-xs text-gray-400 hover:text-white hover:bg-gray-900"
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

      {/* ✅ Bottom Bar */}
      <div className="border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row md:justify-between gap-4">
          <p className="text-sm text-gray-500">© {year} LaserTech. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {socialLinks.map(({ Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
