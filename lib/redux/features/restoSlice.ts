import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Restaurant, RestaurantApiResponse } from "@/lib/types";
import * as RestaurantAPI from "@/lib/fetchRecommendedRestaurants";

export interface RestoState {
  restaurants: Restaurant[];
  restaurantDetail: Restaurant | null;
  loading: boolean;
  error: string | null;
}

const initialState: RestoState = {
  restaurants: [],
  restaurantDetail: null,
  loading: false,
  error: null,
};

/**
 * Fetch list restoran
 */
export const fetchResto = createAsyncThunk<
  RestaurantApiResponse,
  void,
  { rejectValue: string }
>("resto/fetchResto", async (_, { rejectWithValue }) => {
  try {
    return await RestaurantAPI.fetchRecommendedRestaurants({});
  } catch (error) {
    console.error(error);
    return rejectWithValue("Failed to fetch restaurant list");
  }
});

/**
 * Fetch detail restoran
 */
export const fetchRestoDetail = createAsyncThunk<
  RestaurantApiResponse,
  { id: string; limitMenu?: number; limitReview?: number },
  { rejectValue: string }
>("resto/fetchRestoDetail", async (payload, { rejectWithValue }) => {
  try {
    return await RestaurantAPI.fetchRecommendedRestaurantsDetail(payload);
  } catch (error) {
    console.error(error);
    return rejectWithValue("Failed to fetch restaurant detail");
  }
});

const restoSlice = createSlice({
  name: "resto",
  initialState,
  reducers: {
    clearRestaurantDetail(state) {
      state.restaurantDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // =====================
      // FETCH LIST
      // =====================
      .addCase(fetchResto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResto.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload?.data?.restaurants ?? [];
      })
      .addCase(fetchResto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      })

      // =====================
      // FETCH DETAIL
      // =====================
      .addCase(fetchRestoDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestoDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurantDetail = action.payload?.data ?? null;
      })
      .addCase(fetchRestoDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export const { clearRestaurantDetail } = restoSlice.actions;
export default restoSlice.reducer;
