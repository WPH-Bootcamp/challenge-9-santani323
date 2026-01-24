"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchRestoDetail } from "@/lib/redux/features/restoSlice";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroGallery from "@/components/detail/HeroGallery";
import RestaurantInfo from "@/components/detail/RestaurantInfo";
import MenuSection from "@/components/detail/MenuSection";
import ReviewSection from "@/components/detail/ReviewSection";

export default function DetailPage() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { restaurantDetail, loading, error } = useAppSelector(
    (state) => state.resto
  );

  useEffect(() => {
    if (!id) return;

    dispatch(fetchRestoDetail({ id }));
  }, [dispatch, id]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation selalu solid di halaman detail */}
      <Navigation scrolled />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-24 py-8 mt-16">
        {/* ===== LOADING STATE ===== */}
        {loading && (
          <p className="text-center text-gray-500">Loading restaurant...</p>
        )}

        {/* ===== ERROR STATE ===== */}
        {error && (
          <p className="text-center text-red-500">
            Gagal memuat data restoran
          </p>
        )}

        {/* ===== CONTENT ===== */}
        {!loading && !error && restaurantDetail && (
          <>
            {/* ================= HERO ================= */}
            <HeroGallery images={restaurantDetail.images ?? []} />

            {/* ================= RESTAURANT INFO ================= */}
            <RestaurantInfo
              name={restaurantDetail.name}
              logo={restaurantDetail.logo}
              rating={restaurantDetail.star ?? 0}
              location={restaurantDetail.place}
              distance="2.4 km"
            />

            {/* ================= MENU ================= */}
            <section className="mt-10">
              <MenuSection menuItems={restaurantDetail.menus ?? []} />
            </section>

            {/* ================= REVIEWS ================= */}
            <section className="mt-14">
              <ReviewSection
                reviews={restaurantDetail.reviews ?? []}
                averageRating={restaurantDetail.star ?? 0}
                totalReviews={restaurantDetail.reviews?.length ?? 0}
              />
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
