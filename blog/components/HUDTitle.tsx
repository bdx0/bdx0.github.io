'use client';

import React from 'react';
import styles from '@/app/cyberpunk-styles.module.css';

interface HUDTitleProps {
  children: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const HUDTitle: React.FC<HUDTitleProps> = ({ 
  children, 
  className = '', 
  level = 1 
}) => {
  const TitleComponent = `h${level}` as keyof JSX.IntrinsicElements;

  const getStyle = () => {
    const baseStyle = {
      color: '#E8EEF2',
      fontWeight: '600',
    };

    if (level === 1) {
      return { 
        ...baseStyle, 
        fontSize: '48px',
        lineHeight: '56px',
        letterSpacing: '0.02em',
        fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
        color: '#00E6FF',
      };
    } else if (level === 2) {
      return { 
        ...baseStyle, 
        fontSize: '18px',
        fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
        color: '#00E6FF',
      };
    } else {
      return { 
        ...baseStyle, 
        fontSize: '1.125rem',
      };
    }
  };

  return (
    <TitleComponent style={getStyle()} className={className}>
      {children}
    </TitleComponent>
  );
};

export default HUDTitle;