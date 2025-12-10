import { useEffect, useRef } from 'react';

interface GalleryEmbedProps {
  id: string;
  slug: string; // e.g., "-patiencedimitrios"
  textContent: string; // The text content inside the backticks
}

export default function GalleryEmbed({ id, slug, textContent }: GalleryEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Set the global variable required by the script
    // The script looks for window.searchread_ID
    const varName = `searchread_${id}`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any)[varName] = textContent;

    // 2. Check if script already exists to prevent duplicate loading
    const scriptId = `pt-script-${id}`;
    if (document.getElementById(scriptId)) return;

    // 3. Create and append the script
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://www.novachukphoto.gallery/${slug}/slideswebcomponentembed.js/${id}?features=lightbox,pinterest&filtertags=`;
    script.type = 'text/javascript';
    script.setAttribute('data-pt-scriptslideshowid', id);
    script.async = true;

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    // Cleanup function
    return () => {
      // We generally don't remove the script because these 3rd party embeds 
      // often attach global event listeners that might break if removed abruptly,
      // but we can clean up the global variable.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any)[varName];
    };
  }, [id, slug, textContent]);

  return (
    <div ref={containerRef} className="w-full min-h-[500px] bg-white">
      {/* The script replaces this template tag with the gallery */}
      <template 
        data-pt-type="blog" 
        data-pt-slideshowid={id} 
      />
    </div>
  );
}
