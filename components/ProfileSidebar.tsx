"use client";

import { MapPin, ShoppingBag, LogOut } from "lucide-react";

interface ProfileSidebarProps {
  userName?: string;
  userImage?: string;
  activeMenu?: "address" | "orders" | "logout";
}

export default function ProfileSidebar({ 
  userName = "John Doe", 
  userImage = "https://via.placeholder.com/40",
  activeMenu = "orders" 
}: ProfileSidebarProps) {
  
  return (
    <aside className="w-full md:w-64 flex-shrink-0">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        {/* User Profile Section */}
        <div className="flex items-center gap-3 mb-10">
          <img 
            src={userImage} 
            alt="Profile" 
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-bold text-gray-800">{userName}</span>
        </div>

        {/* Navigation Section */}
        <nav className="space-y-6">
          <div className={`flex items-center gap-3 cursor-pointer transition ${
            activeMenu === "address" ? "text-red-500" : "text-gray-600 hover:text-red-500"
          }`}>
            <MapPin size={20} />
            <span className={`text-sm ${activeMenu === "address" ? "font-bold" : "font-medium"}`}>
              Delivery Address
            </span>
          </div>

          <div className={`flex items-center gap-3 cursor-pointer transition ${
            activeMenu === "orders" ? "text-red-500" : "text-gray-600 hover:text-red-500"
          }`}>
            <ShoppingBag size={20} />
            <span className={`text-sm ${activeMenu === "orders" ? "font-bold" : "font-medium"}`}>
              My Orders
            </span>
          </div>

          <div className="flex items-center gap-3 text-gray-600 cursor-pointer hover:text-red-500 transition pt-4 border-t border-gray-50">
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </div>
        </nav>
      </div>
    </aside>
  );
}