"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchCart } from "@/lib/redux/features/cartSlice";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { formatRupiah } from "@/lib/utils/formatRupiah";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { items, loadingAdd } = useAppSelector((state) => state.cart);

  const [openResto, setOpenResto] = useState<number[]>([0]);
  const [localCart, setLocalCart] = useState<any[]>([]);

  /* ===============================
   * Sync redux cart → local state
   * =============================== */
  useEffect(() => {
    if (items?.cart) {
      setLocalCart(items.cart);
    }
  }, [items]);

  /* ===============================
   * Fetch cart (after add)
   * =============================== */
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch, loadingAdd]);

  const toggleResto = (index: number) => {
    setOpenResto((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index],
    );
  };

  /* ===============================
   * Update Qty (Visual Only)
   * =============================== */
  const updateQty = (
    restoIndex: number,
    itemIndex: number,
    type: "inc" | "dec",
  ) => {
    setLocalCart((prev) =>
      prev.map((resto, rIdx) => {
        if (rIdx !== restoIndex) return resto;

        const updatedItems = resto.items.map((item, iIdx) => {
          if (iIdx !== itemIndex) return item;

          const newQty =
            type === "inc"
              ? item.quantity + 1
              : Math.max(1, item.quantity - 1);

          return { ...item, quantity: newQty };
        });

        const subtotal = updatedItems.reduce(
          (sum, it) => sum + it.quantity * it.menu.price,
          0,
        );

        return { ...resto, items: updatedItems, subtotal };
      }),
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation scrolled />

      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-semibold">My Cart</h1>

        {localCart.map((item, restoIndex) => {
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
                <span className="font-semibold">
                  {item.restaurant?.name}
                </span>
                <span
                  className={`transition-transform ${
                    isOpen ? "rotate-90" : ""
                  }`}
                >
                  ❯
                </span>
              </button>

              {/* ===== Accordion ===== */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? "max-h-[1000px]" : "max-h-0"
                }`}
              >
                <div className="mt-4">
                  {item.items.map((menu, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="mb-4 flex items-center justify-between"
                    >
                      <div className="flex gap-4">
                        <img
                          src={menu.menu.image}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium">
                            {menu.menu.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Rp{formatRupiah(menu.menu.price)}
                          </p>
                        </div>
                      </div>

                      {/* ===== Quantity Control ===== */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQty(restoIndex, itemIndex, "dec")
                          }
                          className="h-8 w-8 rounded-full border"
                        >
                          −
                        </button>

                        <span className="font-medium">
                          {menu.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQty(restoIndex, itemIndex, "inc")
                          }
                          className="h-8 w-8 rounded-full bg-red-600 text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="my-4 border-t border-dashed" />

                  {/* ===== Total ===== */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="text-lg font-semibold">
                        Rp{formatRupiah(item.subtotal)}
                      </p>
                    </div>

                    <button className="rounded-full bg-red-600 px-6 py-2 text-white">
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
