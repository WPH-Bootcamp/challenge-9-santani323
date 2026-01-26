export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

// types/user.ts (atau letakkan di file yang sama)

export interface UserProfileResponse {
  success: boolean;
  message: string;
  data: UserData;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string | null; // null jika tidak ada foto
  latitude: number | null;
  longitude: number | null;
  createdAt: string; // ISO Date string
  updatedAt: string;
}
