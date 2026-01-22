import { RestaurantApiResponse } from "@/lib/types";

export async function fetchRecommendedRestaurants({
  location = "",
  range = "",
  priceMin = "",
  priceMax = "",
  rating = "",
  category = "",
  page = 1,
  limit = 12,
}: {
  location?: string;
  range?: string;
  priceMin?: string;
  priceMax?: string;
  rating?: string;
  category?: string;
  page?: number;
  limit?: number;
}): Promise<RestaurantApiResponse> {
  const params = new URLSearchParams({
    ...(location && { location }),
    ...(range && { range }),
    ...(priceMin && { priceMin }),
    ...(priceMax && { priceMax }),
    ...(rating && { rating }),
    ...(category && { category }),
    page: String(page),
    limit: String(limit),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}resto?${params.toString()}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch recommended restaurants");
  return res.json();
}
