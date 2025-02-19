import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    isLogon(state) {
      state.isAuthenticated = true;
    },
    isLogoff(state) {
      state.isAuthenticated = false;
    },
  },
});

const authReducer = authSlice.reducer;

export const authActions = authSlice.actions;

export default authReducer;
