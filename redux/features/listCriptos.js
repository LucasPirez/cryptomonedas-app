import { createSlice } from "@reduxjs/toolkit";

export const criptoSlice = createSlice({
  name: "criptos",
  initialState: [],
  reducers: {
    coinReduceTable: (state = [], action) => {
      return action.payload;
    },
  },
});
export const { coinReduceTable } = criptoSlice.actions;

export default criptoSlice.reducer;
