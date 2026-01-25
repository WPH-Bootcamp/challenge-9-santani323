"use client";

import { useSearchParams } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchCart } from "@/lib/redux/features/cartSlice";

import { useEffect, useState } from "react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { formatRupiah } from "@/lib/utils/formatRupiah";


export default function CartPage() {
  const dispatch = useAppDispatch();
  const [openResto, setOpenResto] = useState<number[]>([0, 1]);
  const { items, loading, loadingAdd } = useAppSelector((state) => state.cart);
    console.log("CartPage",items);
    
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch, loadingAdd]);

  const toggleResto = (index: number) => {
    setOpenResto((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation scrolled={true} />

      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-semibold text-gray-900">My Cart</h1>

        {items?.cart?.map((item, restoIndex) => {
          const isOpen = openResto.includes(restoIndex);

          return (
            <div
              key={restoIndex}
              className="mb-6 rounded-2xl bg-white p-5 shadow-sm"
            >
              {/* ===== Restaurant Header ===== */}
              <button
                onClick={() => toggleResto(restoIndex)}
                className="flex w-full items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">🍔</span>
                  <span className="font-semibold text-gray-900">
                    {item.restaurant?.name || " "}
                  </span>
                </div>

                <span
                  className={`text-gray-400 transition-transform ${
                    isOpen ? "rotate-90" : ""
                  }`}
                >
                  ❯
                </span>
              </button>

              {/* ===== Accordion Content ===== */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="mt-4">
                  {/* Items */}
                  {item?.items.map((menu, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="mb-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={menu.menu?.image || " "}
                          alt="Food"
                          className="h-16 w-16 rounded-lg object-cover"
                        />

                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {menu.menu?.name || " "}
                          </p>
                          <p className="text-sm text-gray-600">Rp{formatRupiah(menu.menu?.price)}</p>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center gap-3">
                        <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600">
                          −
                        </button>
                        <span className="text-sm font-medium">{menu.quantity || "1"}</span>
                        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white">
                          +
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Divider */}
                  <div className="my-4 border-t border-dashed" />

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="text-base font-semibold text-gray-900">
                        {formatRupiah(item?.subtotal || "0")}
                      </p>
                    </div>

                    <button className="rounded-full bg-red-600 px-8 py-2 text-sm font-medium text-white hover:bg-red-700">
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </main>

      <Footer />
    </div>
  );
}
