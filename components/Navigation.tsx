"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logoRead from "@/app/assets/logo_read.svg";
import logo from "@/app/assets/logo.svg";
import logoText from "@/app/assets/logo_text.svg";
import logoTextRead from "@/app/assets/logo_text_read.svg";
import { Button } from "@/components/ui/Button";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={isScrolled ? logoRead : logo}
              alt="BurgerHub Logo"
              width={32}
              height={32}
              className="w-8 h-8 md:hidden"
            />
            <Image
              src={isScrolled ? logoTextRead : logoText}
              alt="BurgerHub"
              width={120}
              height={32}
              className="h-8 w-auto hidden md:block"
            />
          </Link>

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
            <Link href="/login">
              <Button
                variant="ghost"
                size="md"
                className={`border-2 bg-transparent px-6 ${
                  isScrolled
                    ? "border-black text-black hover:bg-gray-100"
                    : "border-white text-white hover:bg-white/10"
                }`}
              >
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button
                variant="ghost"
                size="md"
                className={`px-6 ${
                  isScrolled
                    ? "bg-white text-black border-2 border-black hover:bg-gray-100"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
