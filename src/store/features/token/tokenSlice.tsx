import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  access_token: string;
  refresh_token: string;
  authenticated: boolean;
}
const initialState: SearchState = {
  access_token: "",
  refresh_token: "",
  authenticated: false,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.authenticated = true;
    },
    removeToken: (state) => {
      state.access_token = "";
      state.refresh_token = "";
      state.authenticated = false;
    },
  },
});

export const { addToken, removeToken } = tokenSlice.actions;
export default tokenSlice.reducer;
