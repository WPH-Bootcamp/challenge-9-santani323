import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface RestaurantInfoProps {
  name: string;
  logo: string;
  rating: number;
  location: string;
  distance: string;
}

export default function RestaurantInfo({
  name,
  logo,
  rating,
  location,
  distance,
}: RestaurantInfoProps) {
  return (
    <section className="bg-white rounded-xl shadow p-6 lg:p-8 mb-8">
      <div className="flex gap-4 items-start justify-between">
        <div className="flex gap-4">
          <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Image src={logo} alt="Logo" width={40} height={40} />
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{name}</h1>

            <div className="flex items-center gap-1 mt-1">
              <span className="text-yellow-400">★</span>
              <span className="font-semibold">{rating}</span>
            </div>
            
            <p className="text-sm text-gray-600">
              {location} · {distance}
            </p>
          </div>
        </div>

        {/* Share Button */}
        <Button
          variant="ghost"
          size="md"
          className="border border-gray-300 text-gray-700 hover:bg-gray-50"
          leftIcon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          }
        >
          Share
        </Button>
      </div>
    </section>
  );
}
