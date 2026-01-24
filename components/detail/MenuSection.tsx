"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { useAppDispatch } from "@/lib/redux/hooks";
import {
  addToCart,
  fetchCart,
} from "@/lib/redux/features/cartSlice";

/* =========================
   TYPES
========================= */

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: "food" | "drink";
  image: string;
}

interface MenuSectionProps {
  menuItems: MenuItem[];
}

/* =========================
   COMPONENT
========================= */

export default function MenuSection({ menuItems }: MenuSectionProps) {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  // Ambil restaurantId dari URL (?id=298)
  const restaurantId = Number(searchParams.get("id"));

  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "food" | "drink"
  >("all");

  const [quantities, setQuantities] = useState<Record<number, number>>({});

  /* =========================
     FILTER MENU
  ========================= */

  const filteredItems =
    selectedCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  /* =========================
     QUANTITY HANDLER
  ========================= */

  const handleAdd = (menuId: number) => {
    setQuantities((prev) => ({ ...prev, [menuId]: 1 }));
  };

  const handleIncrease = (menuId: number) => {
    setQuantities((prev) => ({
      ...prev,
      [menuId]: (prev[menuId] || 1) + 1,
    }));
  };

  const handleDecrease = (menuId: number) => {
    setQuantities((prev) => {
      const newQty = (prev[menuId] || 0) - 1;

      if (newQty <= 0) {
        const { [menuId]: _, ...rest } = prev;
        return rest;
      }

      return { ...prev, [menuId]: newQty };
    });
  };

  /* =========================
     ADD TO CART (FINAL)
  ========================= */

  const handleAddToCart = async (menuId: number) => {
    if (!restaurantId) return;

    try {
      await dispatch(
        addToCart({
          restaurantId,
          menuId,
          quantity: quantities[menuId] ?? 1,
        })
      ).unwrap();

      // ✅ hanya jalan jika addToCart sukses
      dispatch(fetchCart());
    } catch (error) {
      console.error("Add to cart failed:", error);
      // optional: toast error
    }
  };

  /* =========================
     RENDER
  ========================= */

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-6">Menu</h2>

      {/* CATEGORY FILTER */}
      <div className="flex gap-3 mb-6">
        {["all", "food", "drink"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat as any)}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              selectedCategory === cat
                ? "bg-red-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {cat === "all"
              ? "All Menu"
              : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* MENU GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          >
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-3">
              <div className="flex items-end justify-between gap-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-lg font-bold text-gray-900">
                    Rp{item.price.toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  {quantities[item.id] ? (
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => handleDecrease(item.id)}
                        className="w-7 h-7 flex items-center justify-center bg-white rounded hover:bg-gray-200"
                      >
                        −
                      </button>

                      <span className="font-bold min-w-[20px] text-center">
                        {quantities[item.id]}
                      </span>

                      <button
                        onClick={() => handleIncrease(item.id)}
                        className="w-7 h-7 flex items-center justify-center bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      className="px-6"
                      onClick={() => {
                        handleAdd(item.id);
                        handleAddToCart(item.id);
                      }}
                    >
                      Add
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SHOW MORE */}
      <div className="flex justify-center mt-8">
        <button className="px-8 py-3 border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-50">
          Show More
        </button>
      </div>
    </section>
  );
}
