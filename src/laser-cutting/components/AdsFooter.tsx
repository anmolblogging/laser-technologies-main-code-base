import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

const LOGO =
  "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/logo-footer.png";
const GPTW_LOGO =
  "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/Grate%20place%20to%20work.png";

const CONTACT_INFO = {
  email: "info@lasertechnologies.in",
  phone: "+91 91369 56932",
  address:
    "Laser Technologies Pvt Ltd, PAP/, R/406, Rabale Midc Rd, near Dol Electric Company, MIDC Industrial Area, Rabale, Navi Mumbai, Maharashtra 400701, India",
};

const SOCIAL_LINKS = [
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

export default function AdsFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-12">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Logo Section */}
            <div className="flex items-center gap-4 flex-wrap">
              <img
                src={LOGO}
                alt="Laser Technologies Logo"
                width="150"
                height="40"
                className="h-10 w-auto object-contain"
              />
              <div className="w-px h-10 bg-gray-700"></div>
              <img
                src={GPTW_LOGO}
                alt="Great Place to Work Certified"
                width="80"
                height="20"
                className="h-28 w-auto object-contain"
              />
            </div>

            {/* Map */}
            <div className="w-full h-56 bg-gray-900 border border-gray-800 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4058.721353123439!2d73.00534672543807!3d19.144330499823457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7bfeb4288ae8d%3A0x8b330290504e58fa!2sLaser%20Technologies%20Pvt%20Ltd!5e1!3m2!1sen!2sus!4v1767449522485!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: "none" }}
                loading="lazy"
                title="Laser Technologies Pvt Ltd Office Location"
              />
            </div>
          </div>

          {/* Right Column — Contact */}
          <div className="space-y-10">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white mb-6">
                Get in Touch
              </h3>

              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-start gap-4 group cursor-pointer"
              >
                <div className="flex-shrink-0 pt-1">
                  <Mail className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-500 mb-1">Email</p>
                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors duration-200 break-words">
                    {CONTACT_INFO.email}
                  </p>
                </div>
              </a>

              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex items-start gap-4 group cursor-pointer"
              >
                <div className="flex-shrink-0 pt-1">
                  <Phone className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-500 mb-1">Phone</p>
                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors duration-200 break-words">
                    {CONTACT_INFO.phone}
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 pt-1">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-500 mb-1">Address</p>
                  <p className="text-sm text-gray-300 break-words">
                    {CONTACT_INFO.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Social & Copyright */}
            <div className="pt-8 border-t border-gray-800 space-y-6">
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-300">
                  Connect With Us
                </p>
                <div className="flex items-center gap-3">
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={link.label}
                      className="p-2.5 bg-gray-900 text-gray-400 hover:bg-white hover:text-black transition-all duration-300"
                    >
                      <link.Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>

              <p className="text-xs text-gray-500">
                © {year} Laser Technologies Pvt Ltd. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
