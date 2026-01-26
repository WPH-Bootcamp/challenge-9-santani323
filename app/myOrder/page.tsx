"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ShoppingBag, Search } from "lucide-react";
import ProfileSidebar from "@/components/ProfileSidebar";

export default function CartPage() {
  const [activeStatus, setActiveStatus] = useState("Done");

  // Data dummy untuk list order
  const orders = [
    { id: 1, resto: "Burger King", item: "Whopper Jr. Cheese", price: 50000, qty: 2, image: "https://via.placeholder.com/80" },
    { id: 2, resto: "Pizza Hut", item: "Meat Lovers Pizza", price: 120000, qty: 1, image: "https://via.placeholder.com/80" },
  ];

  const statusFilters = [
    "Preparing",
    "On the Way",
    "Delivered",
    "Done",
    "Canceled",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation scrolled />

      {/* Container utama dengan margin top untuk kompensasi fixed Navbar */}
      <main className="mx-auto max-w-6xl px-4 py-6 md:py-12 flex flex-row gap-8 mt-16 md:mt-24">
        
        {/* SIDEBAR: Hidden di mobile, muncul di md (768px) ke atas */}
        <aside className="hidden md:block w-1/4">
          <ProfileSidebar userName="John Doe" activeMenu="orders" />
        </aside>

        {/* CONTENT: Lebar penuh di mobile, mengambil sisa space di desktop */}
        <section className="w-full md:flex-1">
          <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">My Orders</h1>

          <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm border border-gray-50">
            
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full pl-12 pr-4 py-2.5 md:py-3 bg-gray-50 border border-gray-100 rounded-full focus:outline-none focus:ring-1 focus:ring-red-500 text-sm transition-all"
              />
            </div>

            {/* Status Tabs: Bisa di-scroll horizontal di mobile */}
            <div className="flex gap-2 md:gap-3 mb-8 items-center overflow-x-auto pb-3 -mx-2 px-2 md:mx-0 md:px-0 scrollbar-hide">
              <span className="font-bold text-gray-700 mr-2 text-sm hidden md:block">Status</span>
              {statusFilters.map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  className={`px-5 py-2 rounded-full border transition-all text-xs md:text-sm font-medium whitespace-nowrap ${
                    activeStatus === status
                      ? "border-red-500 text-red-500 bg-red-50/50"
                      : "border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Order Cards */}
            <div className="space-y-4 md:space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-100 rounded-2xl p-4 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-gray-200 transition-colors"
                >
                  {/* Resto Info */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-orange-100 p-1.5 rounded-lg text-orange-600">
                      <ShoppingBag size={14} />
                    </div>
                    <span className="font-bold text-gray-800 text-sm">
                      {order.resto}
                    </span>
                  </div>

                  {/* Item Info */}
                  <div className="flex gap-4 mb-6">
                    <img
                      src={order.image}
                      alt={order.item}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover bg-gray-100"
                    />
                    <div className="flex flex-col justify-center">
                      <p className="text-xs text-gray-500 mb-1">{order.item}</p>
                      <p className="font-bold text-gray-800 text-sm md:text-base">
                        {order.qty} x Rp{order.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>

                  {/* Footer Card: Responsif Stack di mobile */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-gray-100 gap-4">
                    <div>
                      <p className="text-[10px] md:text-xs text-gray-400 mb-0.5 uppercase tracking-wider font-semibold">Total Pesanan</p>
                      <p className="font-black text-gray-900 text-base md:text-lg">
                        Rp{(order.qty * order.price).toLocaleString("id-ID")}
                      </p>
                    </div>
                    <button className="w-full sm:w-auto bg-[#BF261B] text-white px-8 py-2.5 rounded-full text-sm font-bold hover:bg-red-700 active:scale-95 transition-all shadow-md shadow-red-100">
                      Give Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Empty State (Opsional) */}
            {orders.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-gray-400">No orders found in this status.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}