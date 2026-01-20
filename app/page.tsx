'use client';

import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const menuItems = [
  {
    id: 1,
    name: 'Classic Burger',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
    category: 'Burger',
  },
  {
    id: 2,
    name: 'Cheese Burger',
    price: 50000,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80',
    category: 'Burger',
  },
  {
    id: 3,
    name: 'Chicken Burger',
    price: 48000,
    image: 'https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?w=400&q=80',
    category: 'Burger',
  },
  {
    id: 4,
    name: 'Crispy Fries',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
    category: 'Sides',
  },
  {
    id: 5,
    name: 'Spicy Wings',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400&q=80',
    category: 'Sides',
  },
  {
    id: 6,
    name: 'Onion Rings',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&q=80',
    category: 'Sides',
  },
  {
    id: 7,
    name: 'Coca Cola',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&q=80',
    category: 'Drinks',
  },
  {
    id: 8,
    name: 'Lemonade',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80',
    category: 'Drinks',
  },
  {
    id: 9,
    name: 'Milkshake',
    price: 30000,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80',
    category: 'Drinks',
  },
];

const categories = ['All', 'Burger', 'Sides', 'Drinks'];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen text-white">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=1920&q=80"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Taste the Premium Quality
              </h1>
              <p className="text-xl md:text-2xl text-gray-200">
                Handcrafted burgers made with the finest ingredients, delivered fresh to your door
              </p>
              <div className="flex gap-4 justify-center">
                <button className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">
                  Order Now
                </button>
                <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-red-600 transition-colors">
                  View Menu
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Fast Delivery</h3>
              <p className="text-gray-600">Get your order in 30 minutes or less</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Fresh Ingredients</h3>
              <p className="text-gray-600">Only the finest and freshest ingredients</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Quality Guaranteed</h3>
              <p className="text-gray-600">100% satisfaction or money back</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Menu</h2>
            <p className="text-xl text-gray-600">Discover our delicious selection</p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full font-medium transition-colors hover:bg-red-600 hover:text-white bg-white text-gray-700 border border-gray-300"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {item.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-red-600">
                      Rp {item.price.toLocaleString('id-ID')}
                    </span>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
