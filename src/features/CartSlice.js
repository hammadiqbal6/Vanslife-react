import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existing = state.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        existing.days += 1;
        return;
      }
      state.push({ ...item, days: 1 });
    },
    removeItem: (state, action) =>
      state.filter((item) => item.id !== action.payload.id),
    setDays: (state, action) => {
      const { id, days } = action.payload;
      const item = state.find((cartItem) => cartItem.id === id);
      if (item) {
        item.days = Math.max(1, Number(days) || 1);
      }
    },
    clearCart: () => [],
  },
});

export const reducer = CartSlice.reducer;
export const { addItem, removeItem, setDays, clearCart } = CartSlice.actions;
