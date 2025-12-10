import { motion } from 'framer-motion';
import { ABOUT_TEXT, CITY_REGION, PHOTOGRAPHER_NAME } from '../constants';
import photographerImg from '../assets/Novachuk Photographer.jpg';

export default function About() {
  return (
    <section id="about" className="scroll-mt-16 py-20 md:py-32 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* Text */}
          <div className="order-2 md:order-1 space-y-6">
            <h2 className="text-3xl md:text-5xl font-serif text-text-main">
              About {PHOTOGRAPHER_NAME}
            </h2>
            <h3 className="text-xl text-champagne-dark font-serif italic">
              Authentic, candid & effortless storytelling.
            </h3>
            <div className="text-text-muted leading-relaxed space-y-4">
              <p>{ABOUT_TEXT}</p>
              <p>
                Originally from California, I moved to Arizona with my parents in 2010. Their Russian roots, paired with a community of Greek friends, developed my multilingual background in English, Russian, and Greek. We all live incredibly special lives, and I find it amazing to capture and share the real, pure feelings in those moments. As I believe, the best photos are felt, not just seen. I'd love to hear your story and create something beautiful together!
              </p>
            </div>
            
            <ul className="space-y-3 pt-4">
               {[
                 "Documentary-style coverage focused on real moments",
                 "Gentle guidance, never stiff posing",
                 `Based in ${CITY_REGION}, Traveling Nationwide`
               ].map((item, i) => (
                 <li key={i} className="flex items-center text-text-main">
                   <span className="w-1.5 h-1.5 bg-champagne-dark rounded-full mr-3" />
                   {item}
                 </li>
               ))}
            </ul>
          </div>

          {/* Image */}
          <div className="order-1 md:order-2">
            <div className="relative">
              <div className="absolute inset-0 border-2 border-champagne translate-x-4 translate-y-4 rounded-sm" />
              <div className="relative aspect-square w-full bg-stone-200 overflow-hidden rounded-sm shadow-md">
                <img 
                  src={photographerImg} 
                  alt="Photographer Portrait" 
                  className="w-full h-full object-cover grayscale-[10%]" 
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
