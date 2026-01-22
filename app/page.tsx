"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import { Card } from "@/components/ui/Card";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchResto } from "@/lib/redux/features/restoSlice";

const features = [
  { id: 1, title: "All Restaurant", image: "/AllFood.svg" },
  { id: 2, title: "Nearby", image: "/Location.svg" },
  { id: 3, title: "Discount", image: "/Discount.svg" },
  { id: 4, title: "Best Seller", image: "/BestSeller.svg" },
  { id: 5, title: "Delivery", image: "/Delivery.svg" },
  { id: 6, title: "Lunch", image: "/Lunch.svg" },
];

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { restaurants, loading, error } = useAppSelector(
    (state) => state.resto
  );

  useEffect(() => {
    dispatch(fetchResto());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="max-w-7xl mx-auto">
        <HeroSection />

        {/* FEATURES */}
        <section className="py-16 bg-white">
          <div className="px-4 sm:px-6 lg:px-16 xl:px-24">
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-8">
              {features.map((feature) => (
                <div key={feature.id} className="text-center space-y-3">
                  <Card
                    variant="elevated"
                    hover
                    className="p-4 lg:p-8 transition-transform hover:scale-105"
                  >
                    <div className="flex justify-center">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={64}
                        height={64}
                        className="w-12 h-12 lg:w-16 lg:h-16 object-contain"
                      />
                    </div>
                  </Card>

                  <h3 className="text-xs lg:text-lg font-bold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RECOMMENDED */}
        <section id="recommended" className="py-16 bg-white">
          <div className="px-4 sm:px-6 lg:px-16 xl:px-24">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Recommended
              </h2>
              <button className="text-red-600 hover:text-red-700 font-medium">
                See All
              </button>
            </div>

            {loading && (
              <div className="text-center py-10">Loading...</div>
            )}

            {error && (
              <div className="text-center text-red-500 py-10">
                {error}
              </div>
            )}

            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {restaurants.map((item) => (
                  <Link key={item?.id} href={`/detail?id=${item?.id}`}>
                    <Card
                      variant="default"
                      hover
                      className="p-4 transition-shadow hover:shadow-lg cursor-pointer"
                    >
                      <div className="flex gap-4">
                        <div className="bg-orange-100 rounded-2xl p-3 w-16 h-16 flex items-center justify-center">
                          <Image
                            src={item?.logo ??  "/Burger.svg"}
                            alt={item?.name}
                            width={48}
                            height={48}
                            className="object-contain"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 truncate">
                            {item?.name}
                          </h3>

                          <div className="flex items-center gap-1 text-sm">
                            <svg
                              className="w-4 h-4 text-yellow-400 fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                            <span className="font-medium text-gray-700">
                              {item?.star}
                            </span>
                          </div>

                          <p className="text-xs text-gray-500">
                            {item?.place} · {item?.distance} km
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}

            <div className="flex justify-center mt-10">
              <button className="px-8 py-3 border rounded-full text-gray-700 hover:bg-gray-100 transition">
                Show More
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
