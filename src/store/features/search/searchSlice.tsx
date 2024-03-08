import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  text: string;
}
const initialState: SearchState = {
  text: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addSearchText: (state, action) => {
      state.text = action.payload.text;
    },
  },
});

export const { addSearchText } = searchSlice.actions;
export default searchSlice.reducer;
