import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import GalleryEmbed from './GalleryEmbed';
import ResponsiveImage from './ResponsiveImage';
import { portfolioImages } from '../assets/images';

// Image source type for responsive images
interface ImageSource {
  src: string;
  w: number;
}

interface ImageSources {
  webp?: ImageSource[];
  fallback: ImageSource[];
}

// Define the type for our posts
interface BlogPost {
  id: number;
  embedId: string; // The ID from your service (e.g., 682a8a77...)
  slug: string;    // The url part (e.g., -patiencedimitrios)
  title: string;
  description: string;
  thumbnail: ImageSources;
  textContent: string; // The full text content for the embed
}

const portfolioItems: BlogPost[] = [
  {
    id: 5,
    embedId: "693b4d22f21f0bde566a3d26",
    slug: "-oliviaandandrew",
    title: "Olivia & Andrew",
    description: "A beautiful Greek Orthodox wedding at St Katherine's Greek Orthodox Church, full of joy, tradition, and the warmth of family and faith.",
    thumbnail: portfolioImages.olivia,
    textContent: ``
  },
  {
    id: 1,
    embedId: "693b33b67538e1b0110a33f5",
    slug: "-mariannapaul",
    title: "Marianna & Paul",
    description: "A beautiful Russian Orthodox wedding at Holy Ascension Russian Orthodox Church in Sacramento, California. A day filled with grace, tradition, and timeless beauty.",
    thumbnail: portfolioImages.mariannaPaul273,
    textContent: ``
  },
  {
    id: 2,
    embedId: "682a8a77d5a6960e243685cc",
    slug: "-patiencedimitrios",
    title: "Patience & Dimitrios",
    description: "Orthodox weddings have a rhythm and depth I never get tired of photographing, and this one at St. Seraphim's Cathedral in Texas was no exception.",
    thumbnail: portfolioImages.patience,
    textContent: `Patience & Dimitrios
April 27, 2025
Orthodox weddings have a rhythm and depth I never get tired of photographing, and this one at St. Seraphim's Cathedral in Texas was no exception. The beauty of the space, the weight of the prayers, the quiet focus of the ceremony—it all came together in a way that felt grounded and deeply meaningful.

The reception at the Big White Barn in Decatur was full of warmth and celebration. The open space, the evening light, and the joy in every corner made it a perfect setting for the couple and their community to celebrate.

Photographing days like this reminds me why I value this work so much. These aren't just images—they're pieces of memory, emotion, and connection, meant to last long after the day is over.
Vendors
Photographer
NOVACHUK PHOTOGRAPHY

Venue
THE BIG WHITE BARN`
  },
  {
    id: 3,
    embedId: "67b24f7c4d15e91da07dd0b2",
    slug: "-johnannas",
    title: "Anna & John",
    description: "Anna and John's wedding was not just a celebration of their love but a testament to their faith—one that would serve as the foundation of their life together.",
    thumbnail: portfolioImages.anna,
    textContent: `Anna & John Stauffer
December 29, 2024
Anna and John's wedding was not just a celebration of their love but a testament to their faith—one that would serve as the foundation of their life together. In a world that moves quickly, their day was a reminder of what truly matters: love, commitment, and the sacred promise to walk side by side through all seasons of life.

To Anna and John: May your journey together be as beautiful as the day you said "I do," as strong as the faith that binds you, and as filled with love as the moments captured in these photographs.

Vendors
Photographer
NOVACHUK PHOTOGRAPHY

Venue
TRANSFIGURATION GREEK ORTHODOX CHURCH, AUSTIN TX
View Full Gallery`
  },
  {
    id: 4,
    embedId: "664aad73199307212031d61d",
    slug: "-lauratrevor",
    title: "Laura & Trevor",
    description: "A special intimate wedding in Sedona, Arizona. The ceremony at Briar Patch Inn and magical sunset photos at Bell Rock captured the love and joy between the couple.",
    thumbnail: portfolioImages.lauraTrevor,
    textContent: `Laura & Trevor
Wedding
Briar Patch Inn
Hey there! So, I recently had the opportunity to capture such a special intimate wedding in Sedona, Arizona. The ceremony took place at the charming Briar Patch Inn, which is known for its cabin-style accommodations. The setting was so serene and picturesque, with the shade of the trees providing a stunning backdrop for the couple's exchange of vows.

After the ceremony, I whisked the newlyweds away to Bell Rock for some photos at sunset, and let me tell you, the lighting was absolutely magical. The way the colors of the sun reflected off the red rocks created a truly breathtaking scene that perfectly captured the love and joy between the couple.

It's moments like these that remind me why I love being a photographer, especially in a place as beautiful and romantic as Sedona. Each elopement, wedding, or intimate ceremony in this Red Rock paradise is unique and special in its own way, and I feel so lucky to be able to capture these memories for couples to cherish for a lifetime. Here's to more love-filled moments in Sedona!
Vendors
Photographer
NOVACHUK PHOTOGRAPHY

Venue
BRIAR PATCH INN
View Full Gallery`
  },
  // Add more galleries here as needed
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: 0.2
    }
  }
};

interface PortfolioProps {
  onGalleryStateChange?: (isOpen: boolean) => void;
}

export default function Portfolio({ onGalleryStateChange }: PortfolioProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handleOpenPost = (post: BlogPost) => {
    setSelectedPost(post);
    if (onGalleryStateChange) onGalleryStateChange(true);
  };

  const handleClosePost = () => {
    setSelectedPost(null);
    if (onGalleryStateChange) onGalleryStateChange(false);
  };

  return (
    <section id="portfolio" className="scroll-mt-16 py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif text-text-main">Featured Stories</h2>
          <p className="text-text-muted">
            Each story is a unique journey, beautifully told through my lens. Click to view the full gallery.
          </p>
        </div>

        {/* Grid of Thumbnails */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {portfolioItems.map((post) => (
            <div
              key={post.id}
              onClick={() => handleOpenPost(post)}
              className="group cursor-pointer bg-stone-50 p-6 rounded-sm shadow-sm hover:shadow-lg transition-all duration-300 border border-transparent hover:border-champagne/30"
            >
              <div className="aspect-[4/3] w-full overflow-hidden mb-4 rounded-sm bg-stone-200">
                <ResponsiveImage
                  sources={post.thumbnail}
                  alt={post.title}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-serif mb-2 text-text-main group-hover:text-champagne-dark transition-colors">{post.title}</h3>
              <p className="text-text-muted text-sm line-clamp-3">{post.description}</p>
              <button className="mt-4 text-xs uppercase tracking-widest border-b border-text-main pb-1 group-hover:text-champagne-dark group-hover:border-champagne-dark transition-all">
                View Gallery
              </button>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Full Screen Modal for Gallery Embed */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 bg-stone-50/95 backdrop-blur-md"
          >
            {/* Close Button */}
            <button 
              onClick={handleClosePost}
              className="absolute top-6 right-6 p-2 rounded-full bg-white shadow-md hover:bg-stone-100 transition-colors z-[70]"
            >
              <X size={32} className="text-text-main" />
            </button>

            {/* Scrollable Container */}
            <div className="w-full h-full max-w-6xl overflow-y-auto bg-white shadow-2xl rounded-sm">
               <div className="p-4 md:p-12 min-h-full">
                  <div className="max-w-4xl mx-auto">
                    {/* Header inside Modal */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-serif mb-4">{selectedPost.title}</h2>
                        <p className="text-text-muted uppercase tracking-widest text-sm">Gallery Preview</p>
                    </div>
                    
                    {/* The Embed */}
                    <GalleryEmbed 
                      id={selectedPost.embedId} 
                      slug={selectedPost.slug} 
                      textContent={selectedPost.textContent} 
                    />
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}