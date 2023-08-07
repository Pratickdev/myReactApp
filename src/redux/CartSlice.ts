import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  data: [],
};

export const CartSlice = createSlice({
  name: "CartData",
  initialState,
  reducers: {
    cartData: (state: { data: any; }, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export const {cartData} =CartSlice.actions;
export default CartSlice.reducer;
