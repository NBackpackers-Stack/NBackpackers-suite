"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  if (pathname === '/auth/login' || pathname === '/auth/signup' || pathname === '/mess/QRCodeform') {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // If scrolling down and we're past the top 50px, hide the navbar
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-4 left-4 right-4 z-50 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isVisible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-[150%] opacity-0 scale-95'
          }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-20 bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-xl shadow-black/5 rounded-2xl px-4 md:px-6">

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-3 group">
                <Image
                  src="/backpackers.png"
                  alt="Backpackers Logo"
                  width={240}
                  height={80}
                  className="h-16 w-auto object-contain transition-transform duration-300 ease-out group-hover:scale-105"
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center space-x-2">
              {['Home', 'About', 'Future Additions', 'Branches', 'Contact', 'Automations'].map((item) => (
                <Link
                  key={item}
                  href={item === 'Home' ? '/' : `#${item.toLowerCase()}`}
                  className="relative px-3 py-2 text-[15px] font-bold text-slate-700 hover:text-blue-600 transition-colors duration-300 group"
                >
                  {item}
                  <span className="absolute left-3 right-3 bottom-1 h-0.5 bg-blue-600 transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 rounded-full opacity-0 group-hover:opacity-100"></span>
                </Link>
              ))}
            </nav>

            {/* Action Button & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <button className="hidden md:flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-[15px] transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 active:scale-95">
                Get Started
              </button>

              <button
                className="md:hidden p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl transition-colors active:scale-95"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Menu */}
      <div
        className={`fixed inset-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] md:hidden flex flex-col justify-center ${isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-8'
          }`}
      >
        <div className="flex flex-col items-center justify-center space-y-8 p-6">
          {['Home', 'About', 'Future Additions', 'Branches', 'Contact', 'Automations'].map((item, index) => (
            <Link
              key={item}
              href={item === 'Home' ? '/' : `#${item.toLowerCase()}`}
              className="text-4xl font-extrabold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
              style={{
                transitionDelay: isMenuOpen ? `${index * 75}ms` : '0ms',
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMenuOpen ? 1 : 0,
                transition: 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)'
              }}
            >
              {item}
            </Link>
          ))}
          <button
            className="mt-8 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl font-bold text-lg w-full max-w-xs shadow-xl active:scale-95"
            style={{
              transitionDelay: isMenuOpen ? '300ms' : '0ms',
              transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: isMenuOpen ? 1 : 0,
              transition: 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)'
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}