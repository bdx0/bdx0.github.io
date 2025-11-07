import React from 'react';

interface InventoryItemProps {
  icon: string;
  name: string;
  qty?: number;
  equipped?: boolean;
  onClick?: () => void;
  className?: string;
}

const InventoryItem: React.FC<InventoryItemProps> = ({ 
  icon, 
  name, 
  qty, 
  equipped = false, 
  onClick,
  className = ''
}) => {
  return (
    <div 
      className={`
        w-20 h-20 p-2 rounded-sm relative 
        ${className}
      `}
      style={{
        backgroundColor: 'rgba(12,14,18,0.85)',
        border: '1px solid rgba(255,255,255, 0.04)',
        ...(equipped 
          ? { 
              outline: '2px solid rgba(0,230,255, 0.7)', 
              boxShadow: '0 8px 28px rgba(0,230,255, 0.08)'
            } 
          : {})
      }}
      onClick={onClick}
    >
      {qty !== undefined && qty > 1 && (
        <div className="absolute top-1 right-1 text-[11px] px-1 rounded-full bg-[rgba(0,0,0,0.6)] text-[#C7CED6]">
          {qty}
        </div>
      )}
      <div className="flex items-center justify-center h-full">
        <img src={icon} alt={name} className="max-w-[60%] max-h-[60%] object-contain" />
      </div>
      <div className="absolute left-2 bottom-1 text-xs text-[#C7CED6] truncate w-[calc(100%-16px)]">
        {name}
      </div>
    </div>
  );
};

interface InventoryGridProps {
  items: InventoryItemProps[];
  onItemSelect?: (item: InventoryItemProps, index: number) => void;
}

const InventoryGrid: React.FC<InventoryGridProps> = ({ items, onItemSelect }) => {
  return (
    <div className="grid grid-cols-6 gap-2">
      {items.map((item, index) => (
        <InventoryItem
          key={index}
          {...item}
          onClick={() => onItemSelect && onItemSelect(item, index)}
        />
      ))}
    </div>
  );
};

export { InventoryItem, InventoryGrid };