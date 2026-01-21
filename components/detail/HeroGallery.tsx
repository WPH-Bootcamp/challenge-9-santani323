"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface HeroGalleryProps {
  images: string[];
}

export default function HeroGallery({ images }: HeroGalleryProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
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

      {/* Mobile Slider */}
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
  );
}
