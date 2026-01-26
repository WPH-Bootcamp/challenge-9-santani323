"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { MapPin, ShoppingBag, LogOut } from "lucide-react";
import { fetchProfile, logout } from "@/lib/redux/features/authSlice"; // Pastikan nama fungsi sesuai slice
import { useRouter } from "next/navigation";

interface ProfileSidebarProps {
  activeMenu?: "address" | "orders" | "logout";
}

export default function ProfileSidebar({
  activeMenu = "orders",
}: ProfileSidebarProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  // Ambil data user langsung dari Redux state
  const { user, isLoading } = useAppSelector((state) => state.auth);
    console.log("user di sidebar", user);
    
  useEffect(() => {
    // Hanya fetch jika data user belum ada
    if (!user) {
      dispatch(fetchProfile( ));
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  // Fallback avatar menggunakan inisial jika avatar null
  const userAvatar = user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || "User"}&background=DB2777&color=fff`;

  return (
    /* Responsive Note: 
       - Di Mobile: Lebar penuh (w-full)
       - Di Desktop: Lebar tetap (md:w-72)
    */
    <aside className="w-full md:w-72 flex-shrink-0">
      <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100 sticky top-24">
        
        {/* User Profile Section */}
        <div className="flex items-center gap-3 mb-8 md:mb-10 pb-6 border-b border-gray-50 md:border-none">
          <div className="relative w-12 h-12 flex-shrink-0">
            <img
              src={userAvatar}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-2 border-gray-50"
            />
          </div>
          <div className="flex flex-col overflow-hidden">
            <h3 className="font-bold text-gray-800 truncate leading-tight">
              {isLoading ? "Loading..." : user?.name || "Guest User"}
            </h3>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex flex-row md:flex-col gap-2 md:gap-6 overflow-x-auto md:overflow-visible no-scrollbar">
          {/* Address Menu */}
          <button
            onClick={() => router.push("/address")}
            className={`flex items-center gap-3 px-4 py-2 md:p-0 rounded-full md:rounded-none whitespace-nowrap transition ${
              activeMenu === "address"
                ? "text-[#BF261B] bg-red-50 md:bg-transparent"
                : "text-gray-500 hover:text-[#BF261B]"
            }`}
          >
            <MapPin size={20} className="flex-shrink-0" />
            <span className={`text-sm ${activeMenu === "address" ? "font-bold" : "font-medium"}`}>
              Delivery Address
            </span>
          </button>

          {/* Orders Menu */}
          <button
            onClick={() => router.push("/orders")}
            className={`flex items-center gap-3 px-4 py-2 md:p-0 rounded-full md:rounded-none whitespace-nowrap transition ${
              activeMenu === "orders"
                ? "text-[#BF261B] bg-red-50 md:bg-transparent"
                : "text-gray-600 hover:text-[#BF261B]"
            }`}
          >
            <ShoppingBag size={20} className="flex-shrink-0" />
            <span className={`text-sm ${activeMenu === "orders" ? "font-bold" : "font-medium"}`}>
              My Orders
            </span>
          </button>

          {/* Logout - Hidden on mobile row, visible on desktop or at the end */}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 md:p-0 md:pt-4 md:border-t md:border-gray-50 text-gray-500 hover:text-red-600 transition whitespace-nowrap"
          >
            <LogOut size={20} className="flex-shrink-0" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </nav>
      </div>
    </aside>
  );
}