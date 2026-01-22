import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Restaurant, RestaurantApiResponse } from "@/lib/types";
import { fetchRecommendedRestaurants } from "@/lib/fetchRecommendedRestaurants";

export interface RestoState {
  restaurants: Restaurant[];
  loading: boolean;
  error: string | null;
}

const initialState: RestoState = {
  restaurants: [],
  loading: false,
  error: null,
};

export const fetchResto = createAsyncThunk<RestaurantApiResponse>(
  "resto/fetchResto",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchRecommendedRestaurants({});
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch data");
    }
  }
);

const restoSlice = createSlice({
  name: "resto",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResto.fulfilled, (state, action: PayloadAction<RestaurantApiResponse>) => {
        state.loading = false;
        state.restaurants = action.payload.data.restaurants;
      })
      .addCase(fetchResto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default restoSlice.reducer;
