import { motion } from 'framer-motion';
import { CITY_REGION, TAGLINE } from '../constants';
import ResponsiveImage from './ResponsiveImage';
import { heroImages } from '../assets/images';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-28 md:pt-32 pb-10 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center w-full">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="order-2 md:order-1 space-y-6"
        >
          <p className="hidden md:block text-sm uppercase tracking-widest text-text-muted">
            Orthodox Wedding Photographer in {CITY_REGION} &bull; Available Nationwide
          </p>
          <h1 className="text-4xl md:text-6xl font-serif leading-tight text-text-main">
            {TAGLINE}
          </h1>
          <p className="text-text-muted text-lg max-w-md leading-relaxed">
            Capturing the raw, unfiltered beauty of your most important moments. Candid, documentary, and deeply emotional.
          </p>
          <div className="pt-4 text-center md:text-left">
            <a
              href="#contact"
              className="inline-block px-8 py-3 bg-black text-white rounded-md hover:bg-stone-800 transition-all duration-300 text-center shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Check Availability
            </a>
          </div>
        </motion.div>

        {/* Image Collage */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[600px] hidden md:block" // This element is hidden on mobile, so its mobile order doesn't explicitly matter
        >
           {/* Placeholder Layout - mimicking a collage */}
           <div className="absolute top-0 right-10 w-64 h-80 bg-stone-200 overflow-hidden rounded-sm shadow-lg z-10">
             <ResponsiveImage
               sources={heroImages.mariannaPaulMain}
               alt="Couple laughing"
               sizes="(max-width: 768px) 100vw, 256px"
               className="w-full h-full object-cover transition-all duration-700"
               loading="eager"
               fetchPriority="high"
             />
           </div>
           <div className="absolute bottom-10 left-20 w-60 h-72 bg-stone-200 overflow-hidden rounded-sm shadow-lg z-20">
             <ResponsiveImage
               sources={heroImages.mariannaPaulSecond}
               alt="Wedding detail"
               sizes="(max-width: 768px) 100vw, 240px"
               className="w-full h-full object-cover transition-all duration-700"
               loading="eager"
               fetchPriority="high"
             />
           </div>
           <div className="absolute top-12 -left-8 w-48 h-64 bg-stone-200 overflow-hidden rounded-sm shadow-lg z-30 opacity-100">
             <ResponsiveImage
               sources={heroImages.charityMatthew}
               alt="Walking together"
               sizes="(max-width: 768px) 100vw, 192px"
               className="w-full h-full object-cover transition-all duration-700"
               loading="eager"
             />
           </div>
        </motion.div>

        {/* Mobile Image (Simplified) */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 md:order-none md:hidden"
        >
            <p className="text-sm uppercase tracking-widest text-text-muted text-center mb-6">
              Orthodox Wedding Photographer in {CITY_REGION} &bull; Available Nationwide
            </p>
            <div className="w-full h-96 bg-stone-200 overflow-hidden rounded-sm shadow-lg">
                <ResponsiveImage
                  sources={heroImages.mariannaPaulMain}
                  alt="Couple laughing"
                  sizes="100vw"
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
            </div>
        </motion.div>
      </div>
    </section>
  );
}
