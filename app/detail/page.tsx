"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroGallery from "@/components/detail/HeroGallery";
import RestaurantInfo from "@/components/detail/RestaurantInfo";
import MenuSection from "@/components/detail/MenuSection";
import ReviewSection from "@/components/detail/ReviewSection";

const images = [
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
  "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80",
  "https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?w=800&q=80",
  "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&q=80",
];

const menuItems = [
  {
    id: 1,
    name: "Food Name",
    price: 50000,
    category: "food",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
  },
  {
    id: 2,
    name: "Food Name",
    price: 50000,
    category: "food",
    image:
      "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=80",
  },
  {
    id: 3,
    name: "Food Name",
    price: 50000,
    category: "food",
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80",
  },
  {
    id: 4,
    name: "Food Name",
    price: 50000,
    category: "food",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
  },
  {
    id: 5,
    name: "Food Name",
    price: 50000,
    category: "food",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80",
  },
  {
    id: 6,
    name: "Drink Name",
    price: 30000,
    category: "drink",
    image:
      "https://images.unsplash.com/photo-1546173159-315724a31696?w=400&q=80",
  },
  {
    id: 7,
    name: "Food Name",
    price: 50000,
    category: "food",
    image:
      "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&q=80",
  },
  {
    id: 8,
    name: "Food Name",
    price: 50000,
    category: "food",
    image:
      "https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?w=400&q=80",
  },
];

const reviews = [
  {
    id: 1,
    name: "Sanrio Avelino",
    date: "2 hari lalu",
    rating: 5,
    comment: "Burger yang sangat lezat! Dagingnya juicy dan bumbunya pas banget. Pelayanannya juga cepat dan ramah. Recommended!",
    avatar: "SA"
  },
  {
    id: 2,
    name: "Budi Santoso",
    date: "3 hari lalu",
    rating: 5,
    comment: "Whopper favorit saya! Selalu fresh dan porsinya besar. Tempatnya juga bersih dan nyaman.",
    avatar: "BS"
  },
  {
    id: 3,
    name: "Maya Putri",
    date: "5 hari lalu",
    rating: 5,
    comment: "Menu chicken burgernya enak banget, kentangnya crispy. Harga terjangkau dengan kualitas premium!",
    avatar: "MP"
  },
  {
    id: 4,
    name: "Rudi Hermawan",
    date: "1 minggu lalu",
    rating: 5,
    comment: "Suka banget sama burger king! Rasanya konsisten dan selalu memuaskan. Minumannya juga enak.",
    avatar: "RH"
  },
  {
    id: 5,
    name: "Siti Nurhaliza",
    date: "1 minggu lalu",
    rating: 5,
    comment: "Pelayanan sangat memuaskan, makanannya enak, tempatnya bersih. Worth it banget!",
    avatar: "SN"
  },
  {
    id: 6,
    name: "Ahmad Fauzi",
    date: "2 minggu lalu",
    rating: 5,
    comment: "Double beef burgernya mantap! Daging tebal dan sausnya creamy. Pasti balik lagi!",
    avatar: "AF"
  },
];

export default function DetailPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation scrolled />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-24 py-8 mt-16">
        {/* ================= HERO ================= */}
        <HeroGallery images={images} />

        {/* ================= RESTAURANT INFO ================= */}
        <RestaurantInfo
          name="Burger King"
          logo="/Burger.svg"
          rating={4.9}
          location="Jakarta Selatan"
          distance="2.4 km"
        />

        {/* ================= MENU ================= */}
        <section className="mt-10">
          <MenuSection menuItems={menuItems} />
        </section>

        {/* ================= REVIEWS ================= */}
        <section className="mt-14">
          <ReviewSection 
            reviews={reviews}
            averageRating={4.9}
            totalReviews={24}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
