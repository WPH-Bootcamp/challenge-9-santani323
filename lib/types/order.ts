export interface CheckoutApiResponse {
  success: boolean;
  message: string;
  data: {
    transaction: Transaction;
  };
}
export interface Transaction {
  id: number;
  transactionId: string;
  paymentMethod: string;
  status: "pending" | "paid" | "done" | "failed";
  deliveryAddress: string;
  phone: string;
  pricing: TransactionPricing;
  restaurants: TransactionRestaurant[];
  createdAt: string; // ISO Date`   1
}
export interface TransactionPricing {
  subtotal: number;
  serviceFee: number;
  deliveryFee: number;
  totalPrice: number;
}
export interface TransactionRestaurant {
  restaurant: {
    id: number;
    name: string;
    logo: string;
  };
  items: TransactionItem[];
  subtotal: number;
}
export interface TransactionItem {
  menuId: number;
  menuName: string;
  price: number;
  quantity: number;
  itemTotal: number;
}

export interface UpdateCartPayload {
  restaurants: {
    restaurantId: number;
    items: {
      menuId: number;
      quantity: number;
    }[];
  }[];
  deliveryAddress: string;
  phone: string;
  paymentMethod: string;
  notes?: string;
}

 
/* ===============================
  END OF CHECKOUT & TRANSACTION TYPES
=============================== */