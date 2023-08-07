import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LoginState {
  status: any;
}

const initialState: LoginState = {
  status: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    logout: (state) => {
      state.status = "";
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
