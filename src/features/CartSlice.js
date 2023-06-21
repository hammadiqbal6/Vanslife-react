import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

const CartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;

      if (state.filter((cartItem) => cartItem.id === item.id).length === 0)
        state = [...state, item];

      return state;
    },
    removeItem: (state, action) =>
      state.filter((item) => item.id !== action.payload.id),
    editItem: (state, action) =>
      state.map((item) =>
        item.id === action.payload.id ? action.payload : item
      ),
  },
  extraReducers: {},
});

export const reducer = CartSlice.reducer;
export const { addItem, removeItem, editItem } = CartSlice.actions;
