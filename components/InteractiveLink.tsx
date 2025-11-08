'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from '@/app/cyberpunk-styles.module.css';

interface InteractiveLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const InteractiveLink: React.FC<InteractiveLinkProps> = ({ 
  href, 
  children, 
  className = '', 
  style 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const finalStyle = {
    ...style,
    color: isHovered ? '#FF2D6A' : (style?.color || '#00E6FF'),
    transition: 'color 0.2s ease'
  };

  return (
    <Link
      href={href}
      className={`${className} ${styles.hoverTextNeonMagenta}`}
      style={finalStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Link>
  );
};

export default InteractiveLink;