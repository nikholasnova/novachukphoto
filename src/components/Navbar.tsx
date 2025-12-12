import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import logo from '../assets/logo_transparent_background.png'; // Assuming logo is here

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Services', href: '#services' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ isHidden = false }: { isHidden?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 z-[100] transition-all duration-300 ease-out ${isHidden ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'} ${scrolled ? 'top-4 w-[95%] left-[2.5%] bg-stone-50/0 backdrop-blur-md backdrop-brightness-110 backdrop-saturate-200 shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/20 rounded-full py-2' : 'top-0 left-0 w-full bg-transparent border border-transparent rounded-none py-2'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center md:justify-between relative z-[100] min-h-[56px]">
          <div className="flex-grow text-center md:flex-grow-0 md:text-left"> {/* Container for logo */}
            <a href="#" className="inline-block text-2xl font-serif tracking-widest uppercase text-text-main">
              <img src={logo} alt="Novachuk Photography Logo" className="h-[52px] md:h-[68px] w-auto" />
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm uppercase tracking-wide text-text-main hover:text-champagne-dark transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-text-main focus:outline-none absolute right-4 top-1/2 -translate-y-1/2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay - Moved outside of nav to avoid z-index/transform clipping */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 bg-stone-50/95 backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] z-[90] flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-3xl font-serif text-text-main hover:text-champagne-dark transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}