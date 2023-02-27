import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import criptoSliceReducer from './features/listCriptos'
import exchangesList from './features/listExchanges'

export const store = configureStore({
  reducer: {
    criptoList: criptoSliceReducer,
    exchangesList,
  },
})
