import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartVisible: true, notification: null },
  reducers: {
    toggle(state) {
      state.cartVisible = !state.cartVisible;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

const uiReducer = uiSlice.reducer;

export const uiActions = uiSlice.actions;

export default uiReducer;
