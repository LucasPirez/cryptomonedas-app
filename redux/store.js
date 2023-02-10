import React from "react";

import { coinTableReducer } from "./reducer";
import { configureStore } from "@reduxjs/toolkit";
import criptoSliceReducer from "./features/listCriptos";
import pagination from "./features/pagination";

export const store = configureStore({
  reducer: {
    criptoList: criptoSliceReducer,
    pagination,
  },
});
