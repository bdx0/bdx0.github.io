"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

// Define a type for the navigation links for better type-checking
interface NavLink {
  href: string;
  label: string;
  sublinks?: NavLink[];
}

// Navigation links data
const navLinks: NavLink[] = [
  { href: "/", label: "Blog" },
  {
    href: "/about",
    label: "About",
    sublinks: [
      { href: "/about/me", label: "Resume" },
      { href: "/about/projects", label: "Projects" },
    ],
  },
];

export default function Navbar() {
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleAboutDropdown = () => {
    setIsAboutDropdownOpen(!isAboutDropdownOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsAboutDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  if (!mounted) return null;

  return (
    <nav 
      className="border-b p-4"
      style={{
        backgroundColor: 'rgba(10,12,16,0.8)',
        borderColor: 'rgba(255,255,255, 0.04)',
      }}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side: Logo */}
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold" style={{ color: '#00E6FF' }}>
            BDX0
          </Link>
        </div>

        {/* Right side: Menu items and Theme Toggle */}
        <div className="flex items-center space-x-6">
          {navLinks.map((link) => {
            if (link.sublinks) {
              return (
                <div key={link.href} className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleAboutDropdown}
                    className="text-[#C7CED6] text-lg font-semibold focus:outline-none relative group"
                    style={{ transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#00E6FF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#C7CED6')}
                    aria-haspopup="true"
                    aria-expanded={isAboutDropdownOpen}
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#00E6FF' }}></span>
                  </button>
                  {isAboutDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-48 rounded-sm shadow-lg z-50" style={{ backgroundColor: 'rgba(10,12,16,0.95)', border: '1px solid rgba(255,255,255, 0.04)' }}>
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        {link.sublinks.map((sublink) => (
                          <Link
                            key={sublink.href}
                            href={sublink.href}
                            className="block px-4 py-2 text-sm text-[#C7CED6]"
                            style={{ 
                              transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgba(0,230,255,0.1)';
                              e.currentTarget.style.color = '#00E6FF';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '';
                              e.currentTarget.style.color = '#C7CED6';
                            }}
                            role="menuitem"
                            onClick={() => setIsAboutDropdownOpen(false)} // Close dropdown on link click
                          >
                            {sublink.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#C7CED6] text-lg font-semibold relative group"
                style={{ transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#00E6FF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#C7CED6')}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#00E6FF' }}></span>
              </Link>
            );
          })}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="focus:outline-none"
            style={{ color: '#C7CED6', transition: 'color 0.2s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#00E6FF')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#C7CED6')}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? <Sun className="w-5 h-5" style={{color: '#C7CED6'}} /> : <Moon className="w-5 h-5" style={{color: '#C7CED6'}} />}
          </button>
        </div>
      </div>
    </nav>
  );
}