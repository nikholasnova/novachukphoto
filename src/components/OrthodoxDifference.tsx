import { motion } from 'framer-motion';

export default function OrthodoxDifference() {
  return (
    <section className="py-24 bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left side - Large decorative quote */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -top-8 -left-4 text-[12rem] md:text-[16rem] font-serif text-champagne/10 leading-none select-none">
              "
            </div>
            <blockquote className="relative z-10 text-2xl md:text-3xl font-serif text-text-main leading-relaxed">
              The best photos are felt, not just seen.
            </blockquote>
            <div className="mt-6 w-16 h-1 bg-champagne"></div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-text-main">
              Rooted in the Faith
            </h2>

            <div className="space-y-4 text-text-muted leading-relaxed">
              <p>
                Your special day shouldn't be centered around the photos, I photograph in a way that the photos are a by-product of the joy and love shared on your special day. From the Crowning to the Dance of Isaiah to the partaking of Holy Communion, I aim to capture the raw tears and smiles shared as well as the reverence of the Holy Mystery.
              </p>
              <p>
                As an Orthodox Christian myself, I have learned the rhythm of the wedding service. I follow the Priest's lead and capture the weight of the moment.
              </p>
            </div>

            <a
              href="#contact"
              className="inline-block mt-4 text-sm uppercase tracking-widest border-b-2 border-champagne text-text-main pb-1 hover:text-champagne-dark transition-colors"
            >
              Start the Conversation
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
