"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/Card";

const images = [
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
  "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80",
  "https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?w=800&q=80",
  "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&q=80",
];

export default function DetailPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation scrolled />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-24 py-8 mt-16">
        {/* ================= HERO / GALLERY ================= */}
        <section className="mb-8">
          {/* Desktop */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src={images[0]}
                alt="Main Image"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {images.slice(1).map((img, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl overflow-hidden ${
                    i === 2 ? "col-span-2 h-44" : "h-44"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Gallery ${i + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Slider (NO ARROWS) */}
          <div className="lg:hidden">
            {/* Image */}
            <div className="relative h-64 rounded-2xl overflow-hidden">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Slide ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Dots BELOW IMAGE */}
            <div className="flex justify-center gap-2 mt-4">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? "bg-red-600 w-6"
                      : "bg-gray-300 w-2 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ================= RESTAURANT INFO ================= */}
        <section className="bg-white rounded-xl shadow p-6 lg:p-8 mb-8">
          <div className="flex gap-4">
            <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center">
              <Image src="/Burger.svg" alt="Logo" width={40} height={40} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">Burger King</h1>
              <p className="text-sm text-gray-600">Jakarta Selatan · 2.4 km</p>

              <div className="flex items-center gap-1 mt-1">
                <span className="text-yellow-400">★</span>
                <span className="font-semibold">4.9</span>
              </div>

              <p className="mt-3 text-gray-600">
                Burger King terkenal dengan flame-grilled burger dan menu
                andalannya seperti Whopper.
              </p>
            </div>
          </div>
        </section>

        {/* ================= MENU ================= */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Popular Menu</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: 1, name: "Whopper", price: 45000 },
              { id: 2, name: "Cheese Burger", price: 38000 },
              { id: 3, name: "Chicken Burger", price: 40000 },
              { id: 4, name: "Double Whopper", price: 55000 },
              { id: 5, name: "Fish Burger", price: 39000 },
              { id: 6, name: "Crispy Chicken", price: 42000 },
            ].map((item) => (
              <Card key={item.id} className="p-4 hover:shadow-lg">
                <div className="flex gap-4">
                  <div className="bg-orange-100 w-20 h-20 rounded-xl flex items-center justify-center">
                    <Image
                      src="/Burger.svg"
                      alt={item.name}
                      width={50}
                      height={50}
                    />
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <p className="text-red-600 font-bold">
                      Rp {item.price.toLocaleString("id-ID")}
                    </p>
                    <button className="mt-2 px-4 py-1.5 bg-red-600 text-white rounded hover:bg-red-700">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Card>
            ))}
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
