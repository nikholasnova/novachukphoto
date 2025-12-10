import { PHOTOGRAPHER_NAME } from '../constants';
import logo from '../assets/white_logo_transparent_background.png'; // Using white logo for footer

export default function Footer() {
  return (
    <footer className="bg-text-main text-white py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center space-y-8">
        {/* Replaced LOGO_TEXT with img tag */}
        <img src={logo} alt="Novachuk Photography Logo" className="h-20 w-auto mb-4" />
        <div className="flex space-x-6 text-sm uppercase tracking-wide text-stone-400">
           <a href="#about" className="hover:text-white transition-colors">About</a>
           <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
           <a href="#services" className="hover:text-white transition-colors">Services</a>
           <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        <p className="text-stone-500 text-xs text-center">
           &copy; {new Date().getFullYear()} {PHOTOGRAPHER_NAME}. All rights reserved.<br/>
           Designed with care.
        </p>
      </div>
    </footer>
  );
}
