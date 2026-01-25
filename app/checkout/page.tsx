"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchRestoDetail } from "@/lib/redux/features/restoSlice";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { formatRupiah } from "@/lib/utils/formatRupiah";

interface CheckoutItem {
  menu: {
    foodName: string;
    price: number;
    image: string;
  };
  quantity: number;
}

export default function DetailPage() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { checkoutItem } = useAppSelector((state) => state.cart);
  const [items, setItems] = useState<CheckoutItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("BNI");

  useEffect(() => {
    if (id) dispatch(fetchRestoDetail({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (checkoutItem?.items) setItems(checkoutItem.items);
  }, [checkoutItem]);

  const deliveryFee = 10_000;
  const serviceFee = 1_000;

  const subtotal = useMemo(
    () =>
      items.reduce((total, item) => total + item.menu.price * item.quantity, 0),
    [items],
  );

  const total = subtotal + deliveryFee + serviceFee;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation scrolled />

      <main className="max-w-7xl mx-auto px-6 py-10 mt-16">
        <h1 className="text-2xl font-semibold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ================= LEFT ================= */}
          <div className="lg:col-span-2 space-y-6">
            {/* Address */}
            <div className="bg-white rounded-2xl shadow-sm p-6 flex justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-3 h-3 bg-red-500 rounded-full" />
                  <h3 className="font-semibold">Delivery Address</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Jl. Sudirman No. 25, Jakarta Pusat, 10220
                </p>
                <p className="text-sm text-gray-600">0812-3456-7890</p>
              </div>
              <button className="h-fit px-4 py-1 rounded-full border text-sm">
                Change
              </button>
            </div>

            {/* Restaurant & Items */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <img
                    src={checkoutItem?.restaurant?.logo}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <h3 className="font-semibold">
                    {checkoutItem?.restaurant?.name}
                  </h3>
                </div>
                <button className="px-4 py-1 rounded-full border text-sm">
                  Add item
                </button>
              </div>

              <div className="space-y-6">
                {items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.menu.image}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div>
                        <p className="font-medium">{item.menu.foodName}</p>
                        <p className="text-sm font-semibold">
                          {formatRupiah(item.menu.price)}
                        </p>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-3">
                      <button className="w-8 h-8 rounded-full border flex items-center justify-center">
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center">
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="space-y-6">
            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-semibold mb-4">Payment Method</h3>

              {[
                { id: "BNI", label: "Bank Negara Indonesia" },
                { id: "BRI", label: "Bank Rakyat Indonesia" },
                { id: "BCA", label: "Bank Central Asia" },
                { id: "MANDIRI", label: "Mandiri" },
              ].map((bank, index, arr) => (
                <label
                  key={bank.id}
                  className={`flex justify-between items-center py-3 cursor-pointer
        ${
          index !== arr.length - 1
            ? "border-b border-solid border-gray-300"
            : ""
        }
      `}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded" />
                    <span className="text-sm">{bank.label}</span>
                  </div>

                  <input
                    type="radio"
                    checked={paymentMethod === bank.id}
                    onChange={() => setPaymentMethod(bank.id)}
                    className="accent-red-500"
                  />
                </label>
              ))}
            </div>

            {/* Payment Summary */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-semibold mb-4">Payment Summary</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Price ({items.length} items)</span>
                  <span>{formatRupiah(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>{formatRupiah(deliveryFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee</span>
                  <span>{formatRupiah(serviceFee)}</span>
                </div>
              </div>

              <div className="flex justify-between font-semibold mt-5 pt-5 border-t">
                <span>Total</span>
                <span>{formatRupiah(total)}</span>
              </div>

              <button className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-semibold">
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
