'use client';

import React from 'react';
import styles from '@/app/cyberpunk-styles.module.css';

interface HUDTitleProps {
  children: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  style?: React.CSSProperties;
}

const HUDTitle: React.FC<HUDTitleProps> = ({ 
  children, 
  className = '', 
  level = 1, 
  style 
}) => {
  const TitleComponent = `h${level}` as keyof JSX.IntrinsicElements;

  const getStyle = () => {
    const baseStyle = {
      color: '#E8EEF2',
      fontWeight: '600',
    };

    let levelStyle = {};
    if (level === 1) {
      levelStyle = {
        ...baseStyle,
        fontSize: '48px',
        lineHeight: '56px',
        letterSpacing: '0.02em',
        fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
        color: '#00E6FF',
      };
    } else if (level === 2) {
      levelStyle = {
        ...baseStyle,
        fontSize: '18px',
        fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
        color: '#00E6FF',
      };
    } else {
      levelStyle = {
        ...baseStyle,
        fontSize: '1.125rem',
      };
    }

    return {
      ...levelStyle,
      ...style,
    };
  };

  return (
    <TitleComponent style={getStyle()} className={className}>
      {children}
    </TitleComponent>
  );
};

export default HUDTitle;