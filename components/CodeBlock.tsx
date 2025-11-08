'use client';

import React, { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// Using a cyberpunk/dark theme for syntax highlighting
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

const CodeBlock = ({ children, className }: CodeBlockProps) => {
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<string>('text');

  useEffect(() => {
    // Extract the code text and language from the children
    if (typeof children === 'string') {
      setCode(children);
    } else if (React.isValidElement(children)) {
      // If children is a React element, get its text content
      const textContent = getTextContent(children);
      setCode(textContent);
    }

    // Extract language from className
    if (className) {
      const langMatch = className.match(/language-(\w+)/);
      if (langMatch) {
        setLanguage(langMatch[1]);
      }
    }
  }, [children, className]);

  // Helper function to extract text content from React elements
  const getTextContent = (element: React.ReactElement): string => {
    const props = element.props as { children?: React.ReactNode };
    if (typeof props.children === 'string') {
      return props.children;
    } else if (Array.isArray(props.children)) {
      return props.children.map(child =>
        typeof child === 'string' ? child : getTextContent(child as React.ReactElement)
      ).join('');
    } else if (React.isValidElement(props.children)) {
      return getTextContent(props.children);
    }
    return '';
  };

  return (
    <SyntaxHighlighter
      language={language}
      style={atomDark} // Using a dark theme that fits the cyberpunk aesthetic
      customStyle={{
        borderRadius: '4px',
        padding: '16px',
        margin: '0',
        backgroundColor: 'var(--panel-bg)',
        border: '1px solid rgba(255, 255, 255, 0.04)',
        fontSize: '0.875rem',
        lineHeight: '1.5'
      }}
      codeTagProps={{
        style: {
          fontSize: '0.875rem',
          lineHeight: '1.5',
          fontFamily: 'Roboto Mono, Space Mono, JetBrains Mono, ui-monospace, monospace'
        }
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
};

export { CodeBlock };