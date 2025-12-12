import { motion } from 'framer-motion';

const services = [
  {
    title: "All Day Weddings",
    description: "Full day coverage for your big celebration.",
    price: "Starting at $3,500", // Explicitly added "Starting at"
    features: ["8 Hours Coverage", "Includes second photographer", "Online Gallery", "Travel included in state"]
  },
  {
    title: "Small Weddings",
    description: "Smaller weddings with only ceremonies.", // Description updated
    price: "Starting at $1,200",
    features: ["2 Hours Coverage", "Location Scouting", "Online Gallery", "Travel included in state"]
  },
  {
    title: "Engagements",
    description: "Just the two of you, having fun.",
    price: "Starting at $400", // Price updated
    features: ["1 Hour Session", "2 Outfits", "Online Gallery", "Travel included in state"] // Session length updated
  }
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-16 py-20 bg-stone-100/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif text-text-main">The Experience</h2>
          <p className="text-text-muted">
            Specializing in Orthodox weddings, I understand the importance of capturing every sacred moment of the service without interruption. 
            Investment is more than just a price tag—it's about preserving your legacy.
            Below are some examples of package configurations and pricing. Each situation is unique, and I'll do my best to work within your budget to create something perfect for your special day.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.a
              href="#contact"
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-stone-50 p-8 rounded-sm shadow-sm hover:shadow-lg transition-shadow duration-300 border border-transparent hover:border-champagne/30 block cursor-pointer"
            >
              <h3 className="text-2xl font-serif mb-3 text-text-main">{service.title}</h3>
              <p className="text-text-muted mb-6 text-sm">
                {service.title === "All Day Weddings" 
                  ? "Full day coverage including getting ready, the Crowning ceremony, and reception." 
                  : service.description}
              </p>
              <div className="text-lg font-medium text-champagne-dark mb-6">{service.price}</div>
              <ul className="space-y-3">
                {service.features.map((feature, i) => (
                  <li key={i} className="text-sm text-text-main flex items-start">
                    <span className="mr-2 text-champagne-dark">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
