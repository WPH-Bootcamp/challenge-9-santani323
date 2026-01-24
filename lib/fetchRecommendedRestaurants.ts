import { RestaurantApiResponse } from "@/lib/types";

/**
 * Helper untuk membangun query string dari object
 */
function buildQuery(params: Record<string, string | number | undefined>) {
  return new URLSearchParams(
    Object.entries(params)
      .filter(([, v]) => v !== undefined && v !== "")
      .map(([k, v]) => [k, String(v)]),
  ).toString();
}

/**
 * Fetch daftar restoran rekomendasi
 */
export async function fetchRecommendedRestaurants({
  location,
  range,
  priceMin,
  priceMax,
  rating,
  category,
  page = 1,
  limit = 12,
}: {
  location?: string;
  range?: string;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  category?: string;
  page?: number;
  limit?: number;
}): Promise<RestaurantApiResponse> {
  const query = buildQuery({
    location,
    range,
    priceMin,
    priceMax,
    rating,
    category,
    page,
    limit,
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}resto?${query}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch recommended restaurants");
  }

  return res.json();
}

/**
 * Fetch detail restoran + menu + review
 */
export async function fetchRecommendedRestaurantsDetail({
  id,
  limitMenu,
  limitReview,
}: {
  id: string;
  limitMenu?: number;
  limitReview?: number;
}): Promise<RestaurantApiResponse> {
  if (!id) {
    throw new Error("Restaurant ID is required");
  }

  const query = buildQuery({
    limitMenu,
    limitReview,
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}resto/${id}?${query}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch recommended restaurant details");
  }

  return res.json();
}
