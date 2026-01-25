import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CheckoutApiResponse, Transaction,UpdateCartPayload } from "@/lib/types/order";
import { getAuthToken } from "@/lib/utils/auth";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * STATE
 */
interface OrderState {
  items: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  items: [],
  loading: false,
  error: null,
};

/**
 * FETCH CART
 */
export const fetchCart = createAsyncThunk<
  CheckoutApiResponse,
  void,
  { rejectValue: string }
>("order/fetchCart", async (_, { rejectWithValue }) => {
  try {
    const token = getAuthToken();

    const res = await fetch(`${API_URL}cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Fetch cart failed");
    }

    return await res.json();
  } catch (err) {
    return rejectWithValue("Failed to fetch cart");
  }
});

/**
 * CHECKOUT
 */
export const checkout = createAsyncThunk<
  CartItem[], // asumsi API mengembalikan cart terbaru
  UpdateCartPayload,
  { rejectValue: string }
>("cart/checkout", async (payload, { rejectWithValue }) => {
  try {
    const token = getAuthToken();

    const res = await fetch(`${API_URL}order/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        restaurants: payload.restaurants,
        deliveryAddress: payload.deliveryAddress,
        phone: payload.phone,
        paymentMethod: payload.paymentMethod,
        notes: payload.notes,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Update cart failed");
    }

    const data = await res.json();
    return data.data ?? data;
  } catch (error) {
    console.error("updateCartItem error:", error);
    return rejectWithValue("Failed to update cart item");
  }
});

/**
 * SLICE
 */
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearCart(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      /**
       * FETCH CART
       */
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        // state.items = action.payload.data?.transaction ?? [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch cart";
      })

      /**
       * CHECKOUT
       */
      .addCase(checkout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkout.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
      })
      .addCase(checkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Checkout failed";
      });
  },
});

export const { clearCart } = orderSlice.actions;
export default orderSlice.reducer;
