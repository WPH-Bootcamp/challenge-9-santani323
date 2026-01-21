"use client";

import Image from "next/image";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import HeroGallery from "@/components/detail/HeroGallery";
import RestaurantInfo from "@/components/detail/RestaurantInfo";

const images = [
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
  "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80",
  "https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?w=800&q=80",
  "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&q=80",
];

const menuItems = [
  { id: 1, name: "Food Name", price: 50000, category: "food", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80" },
  { id: 2, name: "Food Name", price: 50000, category: "food", image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=80" },
  { id: 3, name: "Food Name", price: 50000, category: "food", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80" },
  { id: 4, name: "Food Name", price: 50000, category: "food", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80" },
  { id: 5, name: "Food Name", price: 50000, category: "food", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80" },
  { id: 6, name: "Food Name", price: 50000, category: "drink", image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=400&q=80" },
  { id: 7, name: "Food Name", price: 50000, category: "food", image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&q=80" },
  { id: 8, name: "Food Name", price: 50000, category: "food", image: "https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?w=400&q=80" },
];

export default function DetailPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const filteredItems = selectedCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const handleAdd = (id: number) => {
    setQuantities(prev => ({ ...prev, [id]: 1 }));
  };

  const handleIncrease = (id: number) => {
    setQuantities(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleDecrease = (id: number) => {
    setQuantities(prev => {
      const newQty = (prev[id] || 0) - 1;
      if (newQty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newQty };
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation scrolled />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-24 py-8 mt-16">
        <HeroGallery images={images} />
        
        <RestaurantInfo
          name="Burger King"
          logo="/Burger.svg"
          rating={4.9}
          location="Jakarta Selatan"
          distance="2.4 km"
        />

        {/* ================= MENU ================= */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Menu</h2>

          {/* Category Tabs */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              All Menu
            </button>
            <button
              onClick={() => setSelectedCategory("food")}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === "food"
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Food
            </button>
            <button
              onClick={() => setSelectedCategory("drink")}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === "drink"
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Drink
            </button>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-40 bg-gray-900">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-sm font-semibold text-gray-900 mb-3">
                    Rp{item.price.toLocaleString("id-ID")}
                  </p>
                  
                  {quantities[item.id] ? (
                    <div className="flex items-center justify-between bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => handleDecrease(item.id)}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <span className="text-xl font-bold text-gray-700">−</span>
                      </button>
                      <span className="font-bold text-gray-900">{quantities[item.id]}</span>
                      <button
                        onClick={() => handleIncrease(item.id)}
                        className="w-8 h-8 flex items-center justify-center bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <span className="text-xl font-bold text-white">+</span>
                      </button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleAdd(item.id)}
                      variant="primary"
                      size="sm"
                      className="w-full"
                    >
                      Add
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Show More Button */}
          <div className="flex justify-center mt-8">
            <button className="px-8 py-3 border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-50 transition-colors">
              Show More
            </button>
          </div>
        </section>

        {/* ================= REVIEWS ================= */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

          <div className="space-y-4">
            {[
              { id: 1, name: "John Doe", comment: "Amazing burgers!" },
              { id: 2, name: "Jane Smith", comment: "Great service & taste." },
              { id: 3, name: "Mike Johnson", comment: "Whopper is the best!" },
            ].map((review) => (
              <Card key={review.id} className="p-4">
                <strong className="block">{review.name}</strong>
                <p className="text-sm text-gray-600">{review.comment}</p>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
