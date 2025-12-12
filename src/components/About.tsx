import { motion } from 'framer-motion';
import { PHOTOGRAPHER_NAME } from '../constants';
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
              Orthodox Wedding Photographer | Authentic, Candid & Effortless.
            </h3>
            <div className="text-text-muted leading-relaxed space-y-4">
              <p>
                I believe in capturing the in-between moments—the stolen glances, tearful laughs, and quiet pauses. We all live incredibly special lives, and I find it amazing to capture and share the real, pure feelings in those moments. The best photos are felt, not just seen. I'd love to hear your story and create something beautiful together!
              </p>
              <p>
                Originally from California, I moved to Arizona with my parents in 2010. Their Russian roots, paired with a community of Greek friends, developed my multilingual background in English, Russian, and Greek. Having grown up in the church, I understand the sacred beauty of the Divine Liturgy, the Crowning ceremony, and the traditions that make Orthodox weddings so unique.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 md:order-2">
            <div className="relative">
              <div className="absolute inset-0 border-2 border-champagne translate-x-4 translate-y-4 rounded-sm" />
              <div className="relative aspect-square w-full bg-stone-200 overflow-hidden rounded-sm shadow-md">
                <img 
                  src={photographerImg} 
                  alt="Nikholas Novachuk - Arizona Orthodox Wedding Photographer" 
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
