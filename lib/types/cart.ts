/**
 * Cart Item (1 menu di dalam cart)
 */
export interface CartItem {
  /** ID cart item (dari backend) */
  id: number;

  /** ID restoran */
  restaurantId: string;

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
 * Response API untuk Cart
 */
export interface CartApiResponse {
  data: CartItem[];
  message?: string;
}

/**
 * Payload tambah cart
 */
export interface AddToCartPayload {
  menuId: number;
  quantity: number;
}

/**
 * Payload update cart
 */
export interface UpdateCartPayload {
  id: number;
  quantity: number;
}
