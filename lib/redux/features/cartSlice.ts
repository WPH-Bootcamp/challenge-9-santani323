import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CartItem, CartApiResponse } from "@/lib/types/cart";
import { getAuthToken } from "@/lib/utils/auth";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface CartState {
  items: CartItem[];
  loading: boolean;
  loadingAdd: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  loadingAdd: false,
  error: null,
};

/**
 * Fetch Cart
 */
export const fetchCart = createAsyncThunk<
  CartApiResponse,
  void,
  { rejectValue: string }
>("cart/fetchCart", async (_, { rejectWithValue }) => {
  try {
    const token = getAuthToken();

    const res = await fetch(`${API_URL}cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Fetch cart failed");

    return await res.json();
  } catch (error) {
    console.error(error);
    return rejectWithValue("Failed to fetch cart");
  }
});

/**
 * Add to Cart
 */
export const addToCart = createAsyncThunk<
  CartItem,
  { menuId: number; quantity: number },
  { rejectValue: string }
>("cart/addToCart", async (payload, { rejectWithValue }) => {
  try {
    const token = getAuthToken();

    const res = await fetch(`${API_URL}cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Add to cart failed");

    return await res.json();
  } catch (error) {
    console.error(error);
    return rejectWithValue("Failed to add item to cart");
  }
});

/**
 * Update Cart Item
 */
export const updateCartItem = createAsyncThunk<
  CartItem,
  { id: number; quantity: number },
  { rejectValue: string }
>("cart/updateCartItem", async ({ id, quantity }, { rejectWithValue }) => {
  try {
    const token = getAuthToken();

    const res = await fetch(`${API_URL}/cart/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity }),
    });

    if (!res.ok) throw new Error("Update cart failed");

    return await res.json();
  } catch (error) {
    console.error(error);
    return rejectWithValue("Failed to update cart item");
  }
});

/**
 * Remove Cart Item
 */
export const removeCartItem = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("cart/removeCartItem", async (id, { rejectWithValue }) => {
  try {
    const token = getAuthToken();

    const res = await fetch(`${API_URL}/cart/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Delete cart failed");

    return id;
  } catch (error) {
    console.error(error);
    return rejectWithValue("Failed to remove cart item");
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data ?? [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      })

      // ADD
      .addCase(addToCart.pending, (state) => {
        state.loadingAdd = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loadingAdd = false;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loadingAdd = false;
        state.error = action.payload ?? "Unknown error";
      })

      // UPDATE
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      // DELETE
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
