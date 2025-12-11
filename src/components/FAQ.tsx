import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Why should I choose you to be my photographer?",
    answer: "Every wedding photographer out there has their own unique style and way of running their business. Over the years, I have learned how I like to shoot and edit my photos in a way that I feel is very real and true to life. Instead of posing, I prefer to direct in a way that is natural and effortless, because that is when the camera melts away and the true emotions come out. I want you to look at these pictures years down the line and remember the joy and sweetness from the day you married, and not hours of being posed around. I don’t want your day to be centered around the photos but rather the photos be the byproduct of your day. If you have looked at my work and liked what you saw, and all of the above resonates with you, then we might be the perfect fit! "
  },
  {
    question: "Do you travel for weddings?",
    answer: "Absolutely! I love exploring new places. While I'm based in Arizona, I'm available for weddings nationwide and worldwide. Travel fees are custom quoted based on location."
  },
  {
    question: "How many photos will we receive?",
    answer: "For a full 8-hour wedding day, you can expect between 600-800 fully edited, high-resolution images. I believe in quality over quantity, but I never cap the number of good photos I deliver."
  },
  {
    question: "What is your turnaround time?",
    answer: "For weddings, my turnaround time is typically 6-8 weeks. For engagement sessions and smaller shoots, it's usually 2-3 weeks. I always send a few sneak peeks within 48 hours of your big day!"
  },
  {
    question: "Do you offer second shooters?",
    answer: "Yes! My 'All Day Weddings' package includes a second photographer. Having two perspectives ensures we capture every candid moment, reaction, and angle."
  },
  {
    question: "How do we book you?",
    answer: "Typically I require a $375 non-refundable deposit for in-state and $775 deposit for out of state upon booking. This ensures your date in my calendar and helps offset overhead costs. The remainder can be paid anytime after and is due 10 days before your wedding date."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="scroll-mt-16 py-20 bg-stone-50">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif text-text-main">Frequently Asked Questions</h2>
          <p className="text-text-muted">Common questions about the process and what to expect.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className={`border rounded-sm overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? 'bg-white shadow-md border-champagne/50'
                  : 'bg-white border-stone-200 hover:border-champagne/30'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className={`text-lg font-serif pr-8 transition-colors duration-300 ${
                  openIndex === index ? 'text-champagne-dark' : 'text-text-main'
                }`}>
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className={`shrink-0 transition-colors duration-300 ${
                    openIndex === index ? 'text-champagne-dark' : 'text-stone-400'
                  }`} />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                    id={`faq-answer-${index}`}
                  >
                    <motion.div
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.2, delay: 0.05 }}
                      className="p-6 pt-0 text-text-muted leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
