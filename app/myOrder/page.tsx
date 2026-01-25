"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
// Sesuaikan import sesuai kebutuhan Anda
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { MapPin, ShoppingBag, LogOut, Search } from "lucide-react"; // Gunakan icon library seperti Lucide
import ProfileSidebar from "@/components/ProfileSidebar";

export default function CartPage() {
  const [activeStatus, setActiveStatus] = useState("Done");

  // Contoh data dummy untuk list order
  const orders = [
    { id: 1, resto: "Burger King", item: "Food Name", price: 50000, qty: 2 },
    { id: 2, resto: "Burger King", item: "Food Name", price: 50000, qty: 2 },
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

      <main className="mx-auto max-w-6xl px-4 py-12 flex gap-8 mt-16">
        {/* SIDEBAR LEFT */}
        <ProfileSidebar userName="John Doe" activeMenu="orders" />

        {/* CONTENT RIGHT */}
        <section className="flex-1">
          <h1 className="text-2xl font-bold mb-6 text-gray-900">My Orders</h1>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-50">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-full focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>

            {/* Status Tabs */}
            <div className="flex gap-3 mb-8 items-center overflow-x-auto pb-2">
              <span className="font-bold text-gray-700 mr-2">Status</span>
              {statusFilters.map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  className={`px-6 py-2 rounded-full border transition-all text-sm whitespace-nowrap ${
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
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-100 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-orange-100 p-1.5 rounded-lg text-orange-600">
                      <ShoppingBag size={16} />
                    </div>
                    <span className="font-bold text-gray-800 text-sm">
                      {order.resto}
                    </span>
                  </div>

                  <div className="flex gap-4 mb-6">
                    <img
                      src="https://via.placeholder.com/80"
                      alt="Food"
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <div className="flex flex-col justify-center">
                      <p className="text-xs text-gray-500 mb-1">{order.item}</p>
                      <p className="font-bold text-gray-800 text-sm">
                        {order.qty} x Rp{order.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Total</p>
                      <p className="font-black text-gray-900">
                        Rp{(order.qty * order.price).toLocaleString("id-ID")}
                      </p>
                    </div>
                    <button className="bg-[#BF261B] text-white px-8 py-2.5 rounded-full text-sm font-semibold hover:bg-red-700 transition">
                      Give Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
