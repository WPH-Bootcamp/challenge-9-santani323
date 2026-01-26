/* =====================================================
 * CART TYPES – COMPLETE & PRODUCTION READY
 * ===================================================== */

/* ===============================
 * Flat Cart Item (legacy / simple)
 * =============================== */

/**
 * 1 item menu di dalam cart (tanpa grouping restoran)
 */
export interface CartItem {
  /** ID cart item (backend) */
  id: number;

  /** ID restoran */
  restaurantId: number | string;

  /** ID menu */
  menuId: number;

  /** Nama menu */
  name: string;

  /** Harga satuan */
  price: number;

  /** Jumlah item */
  quantity: number;

  /** Opsional: gambar menu */
  image?: string;

  /** Opsional: catatan user */
  note?: string;
}

/**
 * Response API cart (flat)
 */
export interface CartApiResponse {
  data: CartItem[];
  message?: string;
}

/* ===============================
 * Payloads
 * =============================== */

/**
 * Payload tambah item ke cart
 */
export interface AddToCartPayload {
  menuId: number;
  quantity: number;
}

/**
 * Payload update quantity cart
 */
export interface UpdateCartPayload {
  id: number;
  quantity: number;
}

/* ===============================
 * Grouped Cart (Per Restaurant)
 * =============================== */

/**
 * Menu data di dalam cart
 */
export interface CartMenu {
  id: number;
  foodName: string;
  price: number;
  type: "food" | "drink" | string;
  image?: string;
}

/**
 * Item cart per menu (di dalam restoran)
 */
export interface CartRestaurantItem {
  /** ID cart item */
  id: number;

  /** Data menu */
  menu: CartMenu;

  /** Quantity */
  quantity: number;

  /** Total harga item (price * quantity) */
  itemTotal: number;
}

/**
 * Data restoran pada cart
 */
export interface CartRestaurant {
  id: number;
  name: string;
  logo?: string;
}

/**
 * Cart per restoran (INI STRUKTUR UTAMA UNTUK UI)
 */
export interface CartByRestaurant {
  /** Informasi restoran */
  restaurant: CartRestaurant;

  /** Daftar item dalam restoran */
  items: CartRestaurantItem[];

  /** Subtotal restoran */
  subtotal: number;
}

/**
 * Response API cart (grouped by restaurant)
 */
export interface CartGroupedApiResponse {
  cart: CartByRestaurant[];
  message?: string;
}

/* ===============================
 * Redux Cart State
 * =============================== */

export interface CartState {
  items: CartGroupedApiResponse | null;
  loading: boolean;
  loadingAdd: boolean;
  error?: string;
}

/* ===============================
 * Optional Helper Types
 * =============================== */

/**
 * Untuk local state / optimistic UI
 */
export type LocalCart = CartByRestaurant[];

/**
 * Enum optional jika ingin strict type
 */
export enum MenuType {
  FOOD = "food",
  DRINK = "drink",
}
