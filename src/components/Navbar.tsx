import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out px-6 md:px-10 py-4", 
        scrolled ? "bg-slate-darker/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="/" className="flex items-center group">
          <img 
            src="/lovable-uploads/logo 123.png" 
            alt="Slate Designers Logo" 
            className="h-8 md:h-10 transition-transform duration-500 group-hover:rotate-12"
            style={{ objectFit: 'contain', objectPosition: 'left' }}
          />
          <span className="font-jost font-bold text-white text-xl hidden sm:block">Slate Designers</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavLinks />
          <a 
            href="#contact" 
            className="button-hover bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-full font-medium transition-all"
          >
            Get In Touch
          </a>
        </div>

        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-slate-darker/95 backdrop-blur-md z-40 md:hidden transition-all duration-300 ease-in-out pt-20",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center gap-8 p-8 stagger-animation">
          <NavLinks mobile setIsMenuOpen={setIsMenuOpen} />
          <a 
            href="#contact" 
            className="button-hover w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded-full font-medium transition-all animate-fade-in"
            onClick={() => setIsMenuOpen(false)}
          >
            Get In Touch
          </a>
        </div>
      </div>
    </nav>
  );
};

interface NavLinksProps {
  mobile?: boolean;
  setIsMenuOpen?: (open: boolean) => void;
}

const NavLinks = ({ mobile, setIsMenuOpen }: NavLinksProps) => {
  const links = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
  ];

  return (
    <>
      {links.map((link) => (
        <a 
          key={link.name} 
          href={link.href}
          className={cn(
            "relative font-medium transition-all",
            mobile ? "text-2xl py-4 animate-fade-in" : "text-white hover:text-slate-accent",
            "after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-slate-accent after:left-0 after:bottom-[-4px] after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
          )}
          onClick={() => setIsMenuOpen && setIsMenuOpen(false)}
        >
          {link.name}
        </a>
      ))}
    </>
  );
};

export default Navbar;
