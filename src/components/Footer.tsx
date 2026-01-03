/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ChevronDown,
} from "lucide-react";
import { supabase } from "../lib/supabase";

const Logo =
  "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/logo-footer.png";
const GreatPlaceToWorkLogo =
  "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/gptw.png";

/* -------------------------------------------------------
   NORMALIZATION LOGIC (Copied from ProductsSection/Navbar)
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

  // CHECK: Only normalize to "Cutting" if it actually involves cutting
  if ((n.includes("tube") || n.includes("pipe")) && n.includes("cutting"))
    return "Tube Laser Cutting Machine or Pipe Laser Cutting Machine";

  if (n.includes("fiber") && n.includes("mark"))
    return "Fiber Laser Marking Machine";

  if (n.includes("uv") && n.includes("mark")) return "UV Laser Marking Machine";

  if ((n.includes("co2") || n.includes("co₂")) && n.includes("mark"))
    return "CO₂ Laser Marking Machine";

  if (n.includes("engraving")) return "Laser Engraving Machine";

  return name.trim();
}

const Footer = () => {
  const [productData, setProductData] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedSegment, setExpandedSegment] = useState<string | null>(null);

  const toggleSegment = (segment: string) => {
    setExpandedSegment((prev) => (prev === segment ? null : segment));
  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("products")
          .select("Segment, SubCategory");

        if (error) throw error;

        if (!data || data.length === 0) {
          return;
        }

        const grouped: Record<string, string[]> = {};

        data.forEach((item) => {
          const seg = item.Segment;
          const sub = normalizeSubcategory(item.SubCategory);

          if (!grouped[seg]) grouped[seg] = [];

          // Avoid duplicates
          if (!grouped[seg].includes(sub)) {
            grouped[seg].push(sub);
          }
        });

        // Sort subcategories alphabetically
        Object.keys(grouped).forEach((key) => {
          grouped[key].sort((a, b) => a.localeCompare(b));
        });

        setProductData(grouped);
      } catch (err) {
        console.error("Product fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  //  Page Links
  const pageLinks = {
    company: [
      { name: "Home", href: "/" },
      { name: "About Company", href: "/about/company" },
      { name: "Milestone", href: "/about/milestone" },
      { name: "Careers", href: "/careers" },
      { name: "Awards", href: "/awards" },
      { name: "Customer Stories", href: "/customer-stories" },
    ],
    resources: [
      { name: "Contact", href: "/contact" },
      { name: "CSR", href: "/about/leadership#csr" },
      { name: "News & Media", href: "/news" },
      { name: "Articles", href: "/articles" },
      { name: "Knowledge", href: "/laser-university" },
      { name: "Laser Gurukul", href: "/laserGurukul" },
    ],
    services: [
      { name: "Software", href: "/services/software" },
      { name: "FAQs", href: "/services/faqs" },
      { name: "Out of Warranty", href: "/services/out-of-warranty" },
      { name: "Technical Training", href: "/services/technical-training" },
    ],
  };

  //  Social
  const socialLinks = [
    {
      Icon: Facebook,
      href: "https://www.facebook.com/LaserTechnologiesOfficial",
      label: "Facebook",
    },
    {
      Icon: Instagram,
      href: "https://www.instagram.com/lasertechnologiesofficial/",
      label: "Instagram",
    },
    {
      Icon: Linkedin,
      href: "https://www.linkedin.com/company/lasertechnologiesofficial/",
      label: "LinkedIn",
    },
    {
      Icon: Youtube,
      href: "https://www.youtube.com/@LaserTechnologiesOfficial",
      label: "YouTube",
    },
  ];

  // Contact Info
  const contactInfo = {
    email: "info@lasertechnologies.in",
    phone: "+91 91369 56932",
    address:
      `Laser Technologies Pvt Ltd ,  PAP/, R/406, Rabale Midc Rd, near Dol Electric Company, MIDC Industrial Area, Rabale, Navi Mumbai, Maharashtra 400701, India`,
  };

  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex flex-row items-center gap-4 sm:gap-6 flex-wrap sm:flex-nowrap">
              <img
                src={Logo}
                alt="Laser Technologies Logo"
                width="150"
                height="40"
                className="h-8 sm:h-10 w-auto object-contain"
              />
              <div className="h-8 sm:h-12 w-px bg-gray-800 block"></div>
              <img
                src={GreatPlaceToWorkLogo}
                alt="Great Place to Work Certified"
                width="60"
                height="56"
                className="h-10 sm:h-14 w-auto object-contain"
              />
            </div>

            <div className="space-y-3">
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-200"
              >
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">{contactInfo.email}</span>
              </a>
              <a
                href={`tel:${contactInfo.phone}`}
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-200"
              >
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">{contactInfo.phone}</span>
              </a>
              <div className="flex items-start gap-3 text-gray-300">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{contactInfo.address}</span>
              </div>
            </div>

            <div className="w-full h-48 bg-gray-900 border border-gray-800  overflow-hidden">
              <iframe
                // <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4058.721353123439!2d73.00534672543807!3d19.144330499823457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7bfeb4288ae8d%3A0x8b330290504e58fa!2sLaser%20Technologies%20Pvt%20Ltd!5e1!3m2!1sen!2sus!4v1767449522485!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4058.721353123439!2d73.00534672543807!3d19.144330499823457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7bfeb4288ae8d%3A0x8b330290504e58fa!2sLaser%20Technologies%20Pvt%20Ltd!5e1!3m2!1sen!2sus!4v1767449522485!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Laser Technologies Pvt Ltd Office"
              />
            </div>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-medium uppercase tracking-wider mb-4 text-white">
              Company
            </h3>
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
            <h3 className="text-sm font-medium uppercase tracking-wider mb-4 text-white">
              Resources
            </h3>
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
          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-medium uppercase tracking-wider mb-4 text-white">
              Services
            </h3>
            <ul className="space-y-3">
              {pageLinks.services.map((l) => (
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
          <div className="lg:col-span-3">
            <h3 className="text-sm font-medium uppercase tracking-wider mb-4 text-white">
              Products
            </h3>

            {loading && Object.keys(productData).length === 0 ? (
              <p className="text-sm text-gray-400">Loading products...</p>
            ) : (
              <div className="space-y-2">
                {Object.keys(productData).map((segment) => (
                  <div
                    key={segment}
                    className="border border-gray-800 rounded-md overflow-hidden bg-black"
                  >
                    <button
                      onClick={() => toggleSegment(segment)}
                      className="w-full flex justify-between items-center px-4 py-3 bg-black hover:bg-gray-900 transition-colors duration-200"
                      aria-expanded={expandedSegment === segment}
                    >
                      <span className="text-sm text-gray-300 font-semibold">
                        {segment}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                          expandedSegment === segment ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {expandedSegment === segment && (
                      <ul className="bg-black border-t border-gray-800">
                        {Array.isArray(productData[segment]) &&
                          productData[segment].map((sub) => (
                            <li
                              key={sub}
                              className="border-b border-gray-900 last:border-b-0"
                            >
                              <a
                                href={`/products/${encodeURIComponent(
                                  segment
                                )}/${encodeURIComponent(sub)}`}
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
            </div>

            {/* Right Section - Social Links */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 mr-2">
                Connect with us
              </span>
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
