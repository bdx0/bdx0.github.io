'use client';

import React from 'react';
import styles from '@/app/cyberpunk-styles.module.css';

interface PanelProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  variant?: 'default' | 'glow' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  enableHoverEffect?: boolean;
}

const Panel: React.FC<PanelProps> = ({ 
  children, 
  className = '', 
  title, 
  variant = 'default', 
  size = 'md',
  enableHoverEffect = false
}) => {
  const getStyle = () => {
    const baseStyle = {
      borderRadius: '2px',
      border: '1px solid rgba(255,255,255, 0.04)',
    };
    
    let variantStyle = {};
    switch(variant) {
      case 'glow':
        variantStyle = {
          backgroundColor: 'rgba(10,12,16,0.8)',
          boxShadow: '0 0 10px #00E6FF, 0 0 20px rgba(0,230,255,0.4)',
        };
        break;
      case 'accent':
        variantStyle = {
          backgroundColor: 'rgba(10,12,16,0.8)',
          border: '1px solid rgba(0,230,255, 0.5)',
        };
        break;
      default:
        variantStyle = {
          backgroundColor: 'rgba(10,12,16,0.8)',
        };
    }
    
    let sizeStyle = {};
    switch(size) {
      case 'sm':
        sizeStyle = { padding: '8px' };
        break;
      case 'lg':
        sizeStyle = { padding: '24px' };
        break;
      default: // md
        sizeStyle = { padding: '16px' };
    }
    
    return { ...baseStyle, ...variantStyle, ...sizeStyle };
  };

  const panelClass = enableHoverEffect 
    ? `${className} ${styles.hoverNeonCyanGlow}` 
    : className;

  return (
    <div style={getStyle()} className={panelClass}>
      {title && (
        <h2 className={styles.hudPanelTitle} style={{ color: '#00E6FF', marginBottom: '12px' }}>{title}</h2>
      )}
      {children}
    </div>
  );
};

export default Panel;