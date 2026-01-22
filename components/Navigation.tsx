"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import {
  FiShoppingBag,
  FiUser,
  FiMapPin,
  FiFileText,
  FiLogOut,
} from "react-icons/fi";

/* =========================
   NAVIGATION
========================= */

export default function Navigation({
  scrolled = false,
}: {
  scrolled?: boolean;
}) {
  const [isScrolled, setIsScrolled] = useState(scrolled);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const t = localStorage.getItem("token");
      setToken(t);

      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          setUser(JSON.parse(userStr));
        } catch {
          setUser(null);
        }
      }
    }

    const handleScroll = () => {
      setIsScrolled(scrolled ? true : window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={isScrolled ? "/logo_read.svg" : "/logo.svg"}
              alt="BurgerHub Logo"
              width={32}
              height={32}
              className="w-8 h-8 md:hidden"
            />
            <Image
              src={isScrolled ? "/logo_text_read.svg" : "/logo_text.svg"}
              alt="BurgerHub"
              width={120}
              height={32}
              className="h-8 w-auto hidden md:block"
            />
          </Link>

          {/* RIGHT ACTION */}
          <div className="flex items-center gap-4">
            {token ? (
              <>
                {/* CART */}
                <Link href="/cart">
                  <span
                    className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                      isScrolled
                        ? "bg-black/10 hover:bg-black/20"
                        : "bg-white/20 hover:bg-white/30"
                    }`}
                  >
                    <FiShoppingBag
                      size={24}
                      color={isScrolled ? "black" : "white"}
                    />
                  </span>
                </Link>

                {/* USER DROPDOWN */}
                <UserDropdown user={user} isScrolled={isScrolled} />
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

/* =========================
   USER DROPDOWN
========================= */

function UserDropdown({
  user,
  isScrolled,
}: {
  user: any;
  isScrolled: boolean;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest(".user-dropdown-trigger") &&
        !target.closest(".user-dropdown-menu")
      ) {
        setOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="relative">
      <button
        className="user-dropdown-trigger focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-label="User menu"
      >
        {user?.avatar ? (
          <Image
            src={user.avatar}
            alt={user?.name || "User"}
            width={40}
            height={40}
            className="rounded-full w-10 h-10 object-cover"
          />
        ) : (
          <span
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              isScrolled ? "bg-black/10" : "bg-white/20"
            }`}
          >
            <FiUser size={20} color={isScrolled ? "black" : "white"} />
          </span>
        )}
      </button>

      {open && (
        <div className="user-dropdown-menu absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl z-50 p-5">
          <div className="flex items-center gap-4 mb-4">
            <FiUser size={32} className="text-gray-700" />
            <div>
              <p className="font-semibold text-gray-900">
                {user?.name || "User"}
              </p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>

          <hr className="mb-3" />

          <MenuItem icon={<FiMapPin />} label="Delivery Address" />
          <MenuItem icon={<FiFileText />} label="My Orders" />

          <MenuItem
            icon={<FiLogOut />}
            label="Logout"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.reload();
            }}
          />
        </div>
      )}
    </div>
  );
}

/* =========================
   DROPDOWN ITEM
========================= */

function MenuItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-100 text-left"
    >
      <span className="text-gray-700">{icon}</span>
      <span className="text-gray-800">{label}</span>
    </button>
  );
}
