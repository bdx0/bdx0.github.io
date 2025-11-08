import React from 'react';

interface TooltipProps {
  title: string;
  content: string | React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ 
  title, 
  content, 
  children, 
  position = 'top',
  className = '' 
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  
  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };
  
  return (
    <div className={`relative inline-block ${className}`}>
      <div 
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      
      {isVisible && (
        <div 
          className={`
            absolute z-50 w-80 p-4 rounded-md 
            ${positionClasses[position]}
          `}
          style={{
            backgroundColor: '#0a0a0b',
            border: '1px solid rgba(255,255,255, 0.03)',
            boxShadow: '0 8px 28px rgba(0,230,255, 0.08)',
          }}
        >
          <div className="text-[13px] font-semibold text-white mb-2 border-l-2 border-neon-cyan pl-2">
            {title}
          </div>
          <div className="text-sm text-[#C7CED6]">
            {typeof content === 'string' ? <p>{content}</p> : content}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;