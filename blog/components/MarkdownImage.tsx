'use client';

import NextImage, { ImageProps } from 'next/image';
import { useState } from 'react';

interface MarkdownImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  alt: string;
}

const MarkdownImage = ({ src, alt, ...props }: MarkdownImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  // If src starts with http, it's an external image, otherwise it's local
  const isExternal = src.startsWith('http');

  return (
    <div className="my-6 rounded-[4px] overflow-hidden border border-[rgba(255,255,255,0.04)]">
      {isExternal ? (
        // For external images, use a regular img tag with responsive styles
        <img
          src={src}
          alt={alt}
          className={`w-full h-auto object-contain rounded-[4px] ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
          onLoad={() => setIsLoading(false)}
          {...(props as any)}
        />
      ) : (
        // For local images, use Next.js Image with optimization
        <NextImage
          src={src}
          alt={alt}
          className={`w-full h-auto object-contain rounded-[4px] ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
          onLoadingComplete={() => setIsLoading(false)}
          {...props}
        />
      )}
      {isLoading && (
        <div className="animate-pulse bg-[#1a1d23] rounded-[4px] w-full" style={{ paddingTop: '56.25%' }} />
      )}
      {alt && (
        <p className="text-sm text-center text-[var(--muted)] mt-2 font-body">{alt}</p>
      )}
    </div>
  );
};

export default MarkdownImage;