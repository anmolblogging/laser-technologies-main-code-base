import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Service", href: "#service" },
    { name: "Products", href: "#products" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-border ">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl md:text-2xl font-heading font-bold">
              <span className="text-primary">LASER</span>{" "}
              <span className="text-secondary">TECHNOLOGIES</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          {/* <div className="hidden md:flex items-center space-x-4">
            <button className="font-medium bg-transparent hover:bg-muted rounded-md px-4 py-2 transition-colors duration-200">
              Purchase
            </button>
            <button className="bg-transparent hover:bg-muted rounded-md px-2 py-2 transition-colors duration-200">
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div> */}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden bg-transparent hover:bg-muted rounded-md p-2 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-3 border-t border-border animate-fade-in">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            {/* <div className="flex items-center space-x-2 px-4 pt-2">
              <button className="flex-1 bg-white border border-border rounded-md px-4 py-2 font-medium transition-colors hover:bg-muted">
                Purchase
              </button>
              <button className="border border-border bg-white rounded-md px-2 py-2 transition-colors hover:bg-muted">
                <ShoppingCart className="h-5 w-5" />
              </button>
            </div> */}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
