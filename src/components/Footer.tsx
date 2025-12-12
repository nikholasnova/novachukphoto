import { PHOTOGRAPHER_NAME, EMAIL_ADDRESS, INSTAGRAM_HANDLE, PHONE_NUMBER } from '../constants';
import logo from '../assets/white_logo_transparent_background.png'; // Using white logo for footer
import { Instagram, Mail, MessageCircle } from 'lucide-react'; // Import icons

export default function Footer() {
  return (
    <footer className="bg-text-main text-white py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center space-y-8">
        {/* Replaced LOGO_TEXT with img tag */}
        <img src={logo} alt="Novachuk Photography Logo" className="h-20 w-auto mb-4" />
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm uppercase tracking-wide text-stone-400">
           <a href="#about" className="hover:text-white transition-colors">About</a>
           <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
           <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
           <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        
        {/* Social Icons */}
        <div className="flex space-x-6">
          <a 
            href={`https://www.instagram.com/${INSTAGRAM_HANDLE.substring(1)}/?hl=en`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-stone-400 hover:text-white transition-colors"
            aria-label="Instagram Profile"
          >
            <Instagram size={24} />
          </a>
          <a 
            href={`mailto:${EMAIL_ADDRESS}?subject=Inquiry`} 
            className="text-stone-400 hover:text-white transition-colors"
            aria-label="Send an Email"
          >
            <Mail size={24} />
          </a>
          <a 
            href={`sms:${PHONE_NUMBER.replace(/\s/g, '').replace(/-/g, '')}`} 
            className="text-stone-400 hover:text-white transition-colors"
            aria-label="Send a Text Message"
          >
            <MessageCircle size={24} />
          </a>
        </div>

        <p className="text-stone-500 text-xs text-center">
           &copy; {new Date().getFullYear()} {PHOTOGRAPHER_NAME}. All rights reserved.<br/>
           Designed with care.
        </p>
      </div>
    </footer>
  );
}
