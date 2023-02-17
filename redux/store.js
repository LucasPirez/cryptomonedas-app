import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import criptoSliceReducer from './features/listCriptos'
import pagination from './features/pagination'
import exchangesList from './features/listExchanges'

export const store = configureStore({
  reducer: {
    criptoList: criptoSliceReducer,
    pagination,
    exchangesList,
  },
})
