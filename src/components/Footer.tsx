import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube, Send, Award, Users, Zap, Globe, Shield } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-300">
      {/* Decorative Top Border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
      
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-red-950/20 via-red-900/10 to-red-950/20 border-b border-red-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">Stay Updated with Latest Innovations</h3>
              <p className="text-gray-400">Subscribe to our newsletter for cutting-edge laser technology insights and exclusive offers</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 w-full md:w-80 transition-all duration-300"
              />
              <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50 whitespace-nowrap">
                Subscribe <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Company Info - Larger Section */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-red-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-red-600 to-red-800 p-3 rounded-xl">
                  <Zap className="h-8 w-8 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">LASER<span className="text-red-600">TECH</span></h3>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Precision & Innovation</p>
              </div>
            </div>
            
            <p className="text-gray-400 leading-relaxed">
              Pioneering the future of laser technology with state-of-the-art solutions for industrial manufacturing, medical applications, and research innovation. Trusted by over 5,000+ companies worldwide.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">25+</div>
                <div className="text-xs text-gray-500">Years</div>
              </div>
              <div className="text-center border-l border-r border-gray-800">
                <div className="text-2xl font-bold text-red-600">5000+</div>
                <div className="text-xs text-gray-500">Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">50+</div>
                <div className="text-xs text-gray-500">Countries</div>
              </div>
            </div>

            {/* Certifications */}
            <div className="flex items-center gap-3 pt-4">
              <Shield className="h-5 w-5 text-red-600" />
              <span className="text-sm text-gray-400">ISO 9001:2015 Certified</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold text-white mb-6 relative inline-block">
              Company
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-red-600"></span>
            </h4>
            <ul className="space-y-3">
              {['About Us', 'Leadership Team', 'Careers', 'News & Media', 'Case Studies', 'Partners', 'Investors'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-400 hover:text-red-600 hover:translate-x-1 inline-block transition-all duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products & Solutions */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold text-white mb-6 relative inline-block">
              Solutions
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-red-600"></span>
            </h4>
            <ul className="space-y-3">
              {['Laser Cutting Systems', 'Laser Engraving', 'Laser Welding', 'Laser Marking', '3D Laser Scanning', 'Medical Lasers', 'R&D Solutions'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-400 hover:text-red-600 hover:translate-x-1 inline-block transition-all duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold text-white mb-6 relative inline-block">
              Resources
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-red-600"></span>
            </h4>
            <ul className="space-y-3">
              {['Documentation', 'White Papers', 'Technical Support', 'Training Center', 'Webinars', 'FAQs', 'Downloads'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-400 hover:text-red-600 hover:translate-x-1 inline-block transition-all duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold text-white mb-6 relative inline-block">
              Contact
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-red-600"></span>
            </h4>
            <ul className="space-y-4">
              <li>
                <div className="flex items-start space-x-3 group">
                  <div className="bg-red-600/10 p-2 rounded-lg group-hover:bg-red-600/20 transition-colors duration-300">
                    <MapPin className="h-4 w-4 text-red-600 flex-shrink-0" />
                  </div>
                  <span className="text-sm text-gray-400">123 Innovation Drive, Silicon Valley, CA 94025, USA</span>
                </div>
              </li>
              <li>
                <div className="flex items-center space-x-3 group">
                  <div className="bg-red-600/10 p-2 rounded-lg group-hover:bg-red-600/20 transition-colors duration-300">
                    <Phone className="h-4 w-4 text-red-600 flex-shrink-0" />
                  </div>
                  <a href="tel:+18005551234" className="text-sm text-gray-400 hover:text-red-600 transition-colors duration-300">
                    +1 (800) 555-1234
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center space-x-3 group">
                  <div className="bg-red-600/10 p-2 rounded-lg group-hover:bg-red-600/20 transition-colors duration-300">
                    <Mail className="h-4 w-4 text-red-600 flex-shrink-0" />
                  </div>
                  <a href="mailto:contact@lasertech.com" className="text-sm text-gray-400 hover:text-red-600 transition-colors duration-300">
                    contact@lasertech.com
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center space-x-3 group">
                  <div className="bg-red-600/10 p-2 rounded-lg group-hover:bg-red-600/20 transition-colors duration-300">
                    <Globe className="h-4 w-4 text-red-600 flex-shrink-0" />
                  </div>
                  <a href="#" className="text-sm text-gray-400 hover:text-red-600 transition-colors duration-300">
                    www.lasertech.com
                  </a>
                </div>
              </li>
            </ul>

            {/* Business Hours */}
            <div className="mt-6 p-4 bg-gradient-to-br from-red-950/20 to-transparent border border-red-900/20 rounded-lg">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Business Hours</p>
              <p className="text-sm text-gray-300">Mon - Fri: 9:00 AM - 6:00 PM</p>
              <p className="text-sm text-gray-300">Sat: 10:00 AM - 4:00 PM</p>
              <p className="text-sm text-red-600">24/7 Emergency Support</p>
            </div>
          </div>
        </div>

        {/* Social Media & Features */}
        <div className="mt-12 pt-8 border-t border-gray-900">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Features */}
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-red-600" />
                <span className="text-sm text-gray-400">Industry Leader</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-red-600" />
                <span className="text-sm text-gray-400">Expert Team</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-red-600" />
                <span className="text-sm text-gray-400">Global Presence</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 mr-2">Follow Us:</span>
              {[
                { Icon: Facebook, href: '#' },
                { Icon: Twitter, href: '#' },
                { Icon: Linkedin, href: '#' },
                { Icon: Instagram, href: '#' },
                { Icon: Youtube, href: '#' }
              ].map(({ Icon, href }, index) => (
                <a 
                  key={index}
                  href={href} 
                  className="bg-gray-900 p-2.5 rounded-lg hover:bg-red-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-600/50 group"
                >
                  <Icon className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-900 bg-gradient-to-r from-black via-gray-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {currentYear} <span className="text-red-600 font-semibold">LaserTech</span>. All rights reserved. | Engineered with precision.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-red-600 transition-colors duration-300">
                Privacy Policy
              </a>
              <span className="text-gray-800">•</span>
              <a href="#" className="text-gray-500 hover:text-red-600 transition-colors duration-300">
                Terms of Service
              </a>
              <span className="text-gray-800">•</span>
              <a href="#" className="text-gray-500 hover:text-red-600 transition-colors duration-300">
                Cookie Policy
              </a>
              <span className="text-gray-800">•</span>
              <a href="#" className="text-gray-500 hover:text-red-600 transition-colors duration-300">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}