"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

// Define a type for the navigation links for better type-checking
interface NavLink {
  href: string;
  label: string;
}

// Navigation links data
const navLinks: NavLink[] = [
  { href: "/", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" }, // Link to the new resume page
  { href: "/design-system", label: "Design System" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

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
            {navLinks.map((link) => ( // Simplified mapping for top-level links only
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
            ))}
  
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
  