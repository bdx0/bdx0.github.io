import type { MDXComponents } from 'mdx/types';
import { CodeBlock } from '@/components/CodeBlock';
import MarkdownImage from '@/components/MarkdownImage';

// Define custom MDX components following Cyberpunk HUD style guide
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // Enhance heading elements following cyberpunk typography
    h1: ({ children, ...props }) => (
      <h1 
        className="text-[48px] leading-[56px] font-bold tracking-[0.02em] mt-0 mb-[0.8888889em] text-white font-display"
        style={{ fontFamily: 'var(--font-display)' }}
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="text-[18px] md:text-[20px] font-bold mt-[2em] mb-[1em] text-white font-display" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="text-[var(--neon-cyan)] font-semibold mt-[1.6em] mb-[0.6em] text-white font-display" {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 className="font-semibold mt-[1.5em] mb-[0.5em] text-white" {...props}>
        {children}
      </h4>
    ),
    // Enhance paragraph with cyberpunk typography
    p: ({ children, ...props }) => (
      <p className="mb-[0.75em] text-white leading-[1.75] font-body" style={{ fontSize: '13px', fontWeight: 400 }} {...props}>
        {children}
      </p>
    ),
    // Enhanced lists with cyberpunk styling
    ul: ({ children, ...props }) => (
      <ul className="list-disc mt-[1.25em] mb-[1.25em] pl-[1.625em] text-white font-body" style={{ fontSize: '13px' }} {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="list-decimal mt-[1.25em] mb-[1.25em] pl-[1.625em] text-white font-body" style={{ fontSize: '13px' }} {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="pl-[0.375em] text-white" style={{ fontSize: '13px' }} {...props}>
        {children}
      </li>
    ),
    // Enhanced blockquotes with neon accent
    blockquote: ({ children, ...props }) => (
      <blockquote 
        className="mt-[1.6em] mb-[1.6em] pl-[1.05em] border-l-[0.25em] border-[var(--neon-cyan)] italic text-[var(--muted)] font-body"
        style={{ fontSize: '13px' }}
        {...props}
      >
        {children}
      </blockquote>
    ),
    // Enhanced inline code elements
    code: ({ children, ...props }) => {
      // Check if this is inline code or a code block
      const isInline = !('className' in props) || !props.className?.toString().includes('language-');
      
      if (isInline) {
        return (
          <code 
            className="bg-[#1a1d23] text-[var(--accent-primary)] font-bold text-[0.875em] px-[0.4em] py-[0.2em] rounded-[4px] font-mono"
            {...props}
          >
            {children}
          </code>
        );
      } else {
        // This is a code block within a pre tag, so we return it as is for the pre component to handle
        return <code {...props}>{children}</code>;
      }
    },
    // Enhanced preformatted blocks with cyberpunk styling
    pre: ({ children, ...props }) => {
      const className = props.className?.toString() || '';
      const matches = className.match(/language-(\w+)/);
      const language = matches ? matches[1] : '';
      
      // Check if this contains a code element with language class
      if (language) {
        // Extract the code content from the children
        let codeContent = '';
        if (typeof children === 'string') {
          codeContent = children;
        } else if (React.isValidElement(children)) {
          // If children is a code element, extract its children
          if (children.type === 'code') {
            codeContent = children.props.children || '';
          }
        }
        
        return (
          <div className="my-[1rem] bg-[var(--panel-bg)] p-[16px] rounded-[4px] border border-[rgba(255,255,255,0.04)]">
            <CodeBlock className={className}>
              {codeContent}
            </CodeBlock>
          </div>
        );
      }
      
      // For non-highlighted code blocks
      return (
        <pre 
          className={`bg-[var(--panel-bg)] text-[var(--strong)] rounded-[4px] overflow-x-auto p-[16px] m-[1rem] border border-[rgba(255,255,255,0.04)] ${className}`}
          style={{ fontSize: '13px' }}
          {...props}
        >
          {children}
        </pre>
      );
    },
    // Enhanced image component with cyberpunk styling
    img: ({ src, alt, ...props }) => (
      <MarkdownImage 
        src={src || ''} 
        alt={alt || ''} 
        className="rounded-[4px] border border-[rgba(255,255,255,0.04)]"
        {...props as any}
      />
    ),
    // Enhanced links with cyberpunk colors and neon glow effects
    a: ({ children, href, ...props }) => {
      const isExternal = href?.startsWith('http');
      return (
        <a 
          href={href} 
          className={`text-[var(--neon-cyan)] hover:text-[var(--neon-magenta)] underline font-medium hover:neon-cyan-glow transition-all duration-300 ${isExternal ? 'external-link' : ''}`}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          {...props}
        >
          {children}
        </a>
      );
    },
    // Enhanced emphasis and strong elements
    em: ({ children, ...props }) => (
      <em className="italic text-[var(--muted)]" {...props}>{children}</em>
    ),
    strong: ({ children, ...props }) => (
      <strong className="font-bold text-white" {...props}>{children}</strong>
    ),
    // Enhanced tables with cyberpunk styling
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto my-6 bg-[var(--panel-bg)] p-[4px] rounded-[4px] border border-[rgba(255,255,255,0.04)]">
        <table className="min-w-full border-collapse" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th className="border border-[var(--ui-line)] px-[16px] py-[8px] bg-[rgba(10,12,16,0.5)] font-bold text-left text-white" style={{ fontSize: '12px', fontWeight: 500 }}>
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="border border-[var(--ui-line)] px-[16px] py-[8px] text-white" style={{ fontSize: '12px' }} {...props}>
        {children}
      </td>
    ),
  };
}

// Helper component to make React available for the type checking above
import React from 'react';