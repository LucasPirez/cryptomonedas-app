import { createSlice } from "@reduxjs/toolkit";

export const paginationSlice = createSlice({
  name: "pagination",
  initialState: { criptos: 1, favorites: 1, exchanges: 1 },
  reducers: {
    incrementCripto: (state, action) => {
      return { ...state, criptos: state.criptos + 1 };
    },
    decrementCripto: (state, action) => {
      return { ...state, criptos: state.criptos - 1 };
    },
    valueCripto: (state, action) => {
      return { ...state, criptos: action.payload };
    },
    incrementExchange: (state, action) => {
      return { ...state, exchanges: state.exchanges + 1 };
    },
    decrementExchange: (state, action) => {
      return { ...state, exchanges: state.exchanges - 1 };
    },
    valueExchanges: (state, action) => {
      return { ...state, exchanges: action.payload };
    },
  },
});

export const {
  incrementCripto,
  decrementCripto,
  incrementExchange,
  decrementExchange,
  valueCripto,
  valueExchanges,
} = paginationSlice.actions;

export default paginationSlice.reducer;
