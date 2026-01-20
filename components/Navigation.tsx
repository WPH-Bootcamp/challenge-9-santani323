'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-sm"></div>
            <span className={`text-xl font-bold transition-colors ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>BurgerHub</span>
          </div>
          
          {/* <div className="hidden md:flex items-center gap-8">
            <Link href="/" className={`font-medium transition-colors ${
              isScrolled ? 'text-gray-900 hover:text-red-600' : 'text-white hover:text-red-200'
            }`}>
              Home
            </Link>
            <Link href="#menu" className={`transition-colors ${
              isScrolled ? 'text-gray-600 hover:text-red-600' : 'text-white/90 hover:text-red-200'
            }`}>
              Menu
            </Link>
            <Link href="#about" className={`transition-colors ${
              isScrolled ? 'text-gray-600 hover:text-red-600' : 'text-white/90 hover:text-red-200'
            }`}>
              About
            </Link>
            <Link href="#contact" className={`transition-colors ${
              isScrolled ? 'text-gray-600 hover:text-red-600' : 'text-white/90 hover:text-red-200'
            }`}>
              Contact
            </Link>
          </div> */}

          <div className="flex items-center gap-4">
            <button className={`relative p-2 transition-colors ${
              isScrolled ? 'text-gray-600 hover:text-red-600' : 'text-white hover:text-red-200'
            }`}>
              {/* <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span> */}
            </button>
            <Link
              href="/login"
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-red-600' : 'text-white hover:text-red-200'
              }`}
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
