"use client";

import React, { useState } from 'react';

interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function ExpandableSection({ title, children }: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-4 border border-ui-line rounded-md overflow-hidden">
      <button
        className="w-full text-left p-4 bg-panel-bg hover:bg-gray-800 focus:outline-none flex justify-between items-center transition-all duration-200 ease-in-out"
        onClick={toggleExpanded}
      >
        <h3 className="text-2xl font-semibold text-neutral-strong">{title}</h3>
        <span className="text-xl text-neon-cyan font-mono">
          {isExpanded ? '[-]' : '[+]'}
        </span>
      </button>
      {isExpanded && (
        <div className="p-4 border-t border-ui-line bg-bg-900">
          {children}
        </div>
      )}
    </div>
  );
}