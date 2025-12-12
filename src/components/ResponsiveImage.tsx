interface ImageSource {
  src: string;
  w: number;
}

interface ResponsiveImageProps {
  sources: {
    avif?: ImageSource[];
    webp?: ImageSource[];
    fallback: ImageSource[];
  };
  alt: string;
  sizes: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
}

function generateSrcSet(sources: ImageSource[]): string {
  return sources.map(({ src, w }) => `${src} ${w}w`).join(', ');
}

export default function ResponsiveImage({
  sources,
  alt,
  sizes,
  className = '',
  loading = 'lazy',
  decoding = 'async',
  fetchPriority = 'auto',
}: ResponsiveImageProps) {
  const fallbackSrc = sources.fallback[sources.fallback.length - 1]?.src || '';

  return (
    <picture className="contents">
      {sources.avif && (
        <source
          type="image/avif"
          srcSet={generateSrcSet(sources.avif)}
          sizes={sizes}
        />
      )}
      {sources.webp && (
        <source
          type="image/webp"
          srcSet={generateSrcSet(sources.webp)}
          sizes={sizes}
        />
      )}
      <source
        type="image/jpeg"
        srcSet={generateSrcSet(sources.fallback)}
        sizes={sizes}
      />
      <img
        src={fallbackSrc}
        alt={alt}
        className={className}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
      />
    </picture>
  );
}
