import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50 selection:bg-champagne selection:text-white">
      <Navbar isHidden={isGalleryOpen} />
      <Hero />
      <Portfolio onGalleryStateChange={setIsGalleryOpen} />
      <About />
      <Services />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;