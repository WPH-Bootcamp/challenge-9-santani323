"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchRestoDetail } from "@/lib/redux/features/restoSlice";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { formatRupiah } from "@/lib/utils/formatRupiah";

export default function DetailPage() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { restaurantDetail, loading, error } = useAppSelector(
    (state) => state.resto,
  );
  const { checkoutItem } = useAppSelector((state) => state.cart);
  const [selectedRadio, setSelectedRadio] = useState([]);

  useEffect(() => {
    if (!id) return;

    dispatch(fetchRestoDetail({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    console.log("checkoutItem from cartSlice:", checkoutItem);
    setSelectedRadio(checkoutItem?.items || []);
  }, [checkoutItem, id]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation selalu solid di halaman detail */}
      <Navigation scrolled />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-24 py-8 mt-16">
        <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <div className="bg-white rounded-xl shadow-md p-5 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full" />
                  <h3 className="font-semibold">Delivery Address</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Jl. Sudirman No. 25, Jakarta Pusat, 10220
                </p>
                <p className="text-sm text-gray-600">0812-3456-7890</p>
              </div>

              <button className="rounded-full px-4 py-1 text-sm bg-gray-100 hover:bg-gray-200">
                Change
              </button>
            </div>

            {/* Restaurant & Items */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                 <img
                      src={checkoutItem?.restaurant?.logo}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                  <h3 className="font-semibold">
                    {checkoutItem?.restaurant?.name}
                  </h3>
                </div>

                <button className="rounded-full px-4 py-1 text-sm bg-gray-100 hover:bg-gray-200">
                  Add item
                </button>
              </div>

              {selectedRadio?.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-4 border-t border-gray-200 first:border-t-0"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.menu.image}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium">{item.menu.foodName}</p>
                      <p className="text-sm text-gray-500">
                        {formatRupiah(item.menu.price)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg">
                      −
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-lg">
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-semibold mb-4">Payment Method</h3>

              {[
                "Bank Negara Indonesia",
                "Bank Rakyat Indonesia",
                "Bank Central Asia",
                "Mandiri",
              ].map((bank, i) => (
                <label
                  key={bank}
                  className="flex items-center justify-between py-3 border-t border-gray-200 first:border-t-0 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded" />
                    <span className="text-sm">{bank}</span>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked={i === 0}
                    className="accent-red-500"
                  />
                </label>
              ))}
            </div>

            {/* Payment Summary */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-semibold mb-4">Payment Summary</h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Price (2 items)</span>
                  <span>Rp100.000</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>Rp10.000</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee</span>
                  <span>Rp1.000</span>
                </div>
              </div>

              <div className="flex justify-between font-semibold mt-4 pt-4 border-t border-gray-200">
                <span>Total</span>
                <span>Rp111.000</span>
              </div>

              <button className="w-full mt-5 bg-red-500 hover:bg-red-600 text-white py-3 rounded-full font-semibold shadow-md">
                Buy
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
