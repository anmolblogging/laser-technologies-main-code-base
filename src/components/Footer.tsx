import { Mail, Phone, MapPin, Linkedin, Twitter, Github, ArrowRight, ExternalLink } from 'lucide-react';
import { memo, useState, ChangeEvent } from 'react';

// Types
interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

interface SocialIconProps {
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  href: string;
  label: string;
}

interface NavigationItem {
  name: string;
  href: string;
}

interface NavigationSection {
  company: NavigationItem[];
  solutions: NavigationItem[];
  resources: NavigationItem[];
  legal: NavigationItem[];
}

interface SocialLink {
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  href: string;
  label: string;
}

// Memoized link component for performance
const FooterLink = memo<FooterLinkProps>(({ href, children, external = false }) => (
  <a
    href={href}
    className="group flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors duration-200"
    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
  >
    <span>{children}</span>
    {external && <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
  </a>
));

FooterLink.displayName = 'FooterLink';

// Memoized social icon component
const SocialIcon = memo<SocialIconProps>(({ Icon, href, label }) => (
  <a
    href={href}
    aria-label={label}
    className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/50 hover:bg-red-600 text-gray-400 hover:text-white transition-all duration-200 hover:scale-105"
  >
    <Icon className="h-4 w-4" strokeWidth={2} />
  </a>
));

SocialIcon.displayName = 'SocialIcon';

// Main footer component
export default function Footer() {
  const [email, setEmail] = useState<string>('');
  const year: number = new Date().getFullYear();

  const navigation: NavigationSection = {
    company: [
      { name: 'About', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Blog', href: '#' },
    ],
    solutions: [
      { name: 'Laser Cutting', href: '#' },
      { name: 'Engraving', href: '#' },
      { name: 'Welding', href: '#' },
      { name: 'Marking', href: '#' },
    ],
    resources: [
      { name: 'Documentation', href: '#' },
      { name: 'Support', href: '#' },
      { name: 'API Reference', href: '#' },
      { name: 'Training', href: '#' },
    ],
    legal: [
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' },
      { name: 'Cookies', href: '#' },
      { name: 'Licenses', href: '#' },
    ],
  };

  const socialLinks: SocialLink[] = [
    { Icon: Twitter, href: '#', label: 'Twitter' },
    { Icon: Linkedin, href: '#', label: 'LinkedIn' },
    { Icon: Github, href: '#', label: 'GitHub' },
  ];

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handleSubscribe = (): void => {
    if (email && email.includes('@')) {
      alert('Thank you for subscribing!');
      setEmail('');
    } else if (email) {
      alert('Please enter a valid email address');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSubscribe();
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-950 to-black border-t border-gray-900">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="col-span-2 space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-sm transform rotate-45" />
              </div>
              <span className="text-xl font-bold text-white">LaserTech</span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Leading the future of laser technology with precision engineering and innovative solutions for industrial applications.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:hello@lasertech.com" className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-800/50 group-hover:bg-red-600/10 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <span>hello@lasertech.com</span>
              </a>
              
              <a href="tel:+18005551234" className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-800/50 group-hover:bg-red-600/10 transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <span>+1 (800) 555-1234</span>
              </a>
              
              <div className="flex items-start gap-3 text-sm text-gray-400">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-800/50 mt-0.5">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="leading-relaxed">
                  Silicon Valley, CA<br />United States
                </span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <nav className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Company</h3>
            <ul className="space-y-3">
              {navigation.company.map((item: NavigationItem) => (
                <li key={item.name}>
                  <FooterLink href={item.href}>{item.name}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Solutions Links */}
          <nav className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Solutions</h3>
            <ul className="space-y-3">
              {navigation.solutions.map((item: NavigationItem) => (
                <li key={item.name}>
                  <FooterLink href={item.href}>{item.name}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources Links */}
          <nav className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Resources</h3>
            <ul className="space-y-3">
              {navigation.resources.map((item: NavigationItem) => (
                <li key={item.name}>
                  <FooterLink href={item.href}>{item.name}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal Links */}
          <nav className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3">
              {navigation.legal.map((item: NavigationItem) => (
                <li key={item.name}>
                  <FooterLink href={item.href}>{item.name}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-900">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-md">
              <h3 className="text-base font-semibold text-white mb-2">Stay Updated</h3>
              <p className="text-sm text-gray-400">Get the latest updates on laser technology and industry insights.</p>
            </div>
            
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                onKeyPress={handleKeyPress}
                className="flex-1 md:w-64 px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
              />
              <button
                onClick={handleSubscribe}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 flex items-center gap-2 whitespace-nowrap"
              >
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-gray-500">
              © {year} LaserTech. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ Icon, href, label }: SocialLink) => (
                <SocialIcon key={label} Icon={Icon} href={href} label={label} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}