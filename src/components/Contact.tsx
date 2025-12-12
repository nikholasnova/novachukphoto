import { useState } from 'react';
import { motion } from 'framer-motion';
import { EMAIL_ADDRESS, INSTAGRAM_HANDLE, PHONE_NUMBER } from '../constants';

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    parish: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      const response = await fetch("https://formsubmit.co/ajax/nikholas@novachukphoto.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', phone: '', date: '', parish: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <section id="contact" className="scroll-mt-16 py-20 bg-stone-100/30">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-text-main mb-4">Let's Create Something Beautiful</h2>
          <p className="text-text-muted">
            Tell me your story. I can't wait to hear from you.
          </p>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-stone-50 p-8 md:p-12 shadow-sm rounded-sm"
        >
          {formStatus === 'success' ? (
            <div className="text-center py-12 space-y-4">
              <h3 className="text-2xl font-serif text-text-main">Message Sent!</h3>
              <p className="text-text-muted">Thank you for reaching out. I'll get back to you as soon as possible.</p>
              <button 
                onClick={() => setFormStatus('idle')}
                className="mt-6 px-8 py-3 border border-text-main text-text-main uppercase tracking-widest text-sm hover:bg-stone-100 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs uppercase tracking-widest text-text-muted">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-stone-100/50 border border-stone-200 p-3 focus:outline-none focus:border-champagne-dark transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-widest text-text-muted">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-stone-100/50 border border-stone-200 p-3 focus:outline-none focus:border-champagne-dark transition-colors"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label htmlFor="date" className="text-xs uppercase tracking-widest text-text-muted">Event Date</label>
                   <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full bg-stone-100/50 border border-stone-200 p-3 focus:outline-none focus:border-champagne-dark transition-colors"
                   />
                </div>
                <div className="space-y-2">
                   <label htmlFor="parish" className="text-xs uppercase tracking-widest text-text-muted">Parish / Church</label>
                   <input
                      type="text"
                      id="parish"
                      name="parish"
                      placeholder="e.g. St. Katherine's Greek Orthodox"
                      value={formData.parish}
                      onChange={handleChange}
                      className="w-full bg-stone-100/50 border border-stone-200 p-3 focus:outline-none focus:border-champagne-dark transition-colors placeholder:text-stone-400"
                   />
                </div>
              </div>

              <div className="space-y-2">
                 <label htmlFor="phone" className="text-xs uppercase tracking-widest text-text-muted">Phone Number</label>
                 <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-stone-100/50 border border-stone-200 p-3 focus:outline-none focus:border-champagne-dark transition-colors"
                 />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs uppercase tracking-widest text-text-muted">Tell me about your day</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-stone-100/50 border border-stone-200 p-3 focus:outline-none focus:border-champagne-dark transition-colors"
                ></textarea>
              </div>

              {formStatus === 'error' && (
                <div role="alert" className="text-red-500 text-sm text-center">
                  Something went wrong. Please try again or email me directly.
                </div>
              )}

              <button 
                type="submit" 
                disabled={formStatus === 'submitting'}
                className="w-full py-4 bg-text-main text-white uppercase tracking-widest text-sm hover:bg-text-muted transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}

          <div className="mt-12 pt-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center text-text-muted text-sm gap-4">
             <a href={`mailto:${EMAIL_ADDRESS}`} className="hover:text-text-main transition-colors">{EMAIL_ADDRESS}</a>
             <span className="hidden md:inline">•</span>
             <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="hover:text-text-main transition-colors">{PHONE_NUMBER}</a>
             <span className="hidden md:inline">•</span>
             <a 
               href={`https://www.instagram.com/${INSTAGRAM_HANDLE.substring(1)}/?hl=en`} 
               target="_blank" 
               rel="noopener noreferrer"
               className="hover:text-text-main transition-colors"
             >
               {INSTAGRAM_HANDLE}
             </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
