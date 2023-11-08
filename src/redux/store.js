import { configureStore } from '@reduxjs/toolkit'
import criptoSliceReducer from './features/listCriptos'
import exchangesList from './features/listExchanges'
import userData from './features/userData'

export const store = configureStore({
  reducer: {
    criptoList: criptoSliceReducer,
    exchangesList,
    userData
  }
})
