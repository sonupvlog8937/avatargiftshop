import { useState } from 'react';
import { Gift } from 'lucide-react';

interface Props {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

/** Shows an elegant branded placeholder if the image fails to load. */
export default function ImageWithFallback({ src, alt, className = '', loading = 'lazy' }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-br from-softpink via-cream to-gold/40 ${className}`}
      >
        <Gift className="h-10 w-10 text-burgundy/50" />
      </div>
    );
  }
  return <img src={src} alt={alt} loading={loading} onError={() => setFailed(true)} className={className} />;
}
