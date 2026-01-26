import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import restoReducer from './features/restoSlice';
import cartSlice from './features/cartSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      resto: restoReducer,
      cart: cartSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
