import { createSlice } from '@reduxjs/toolkit'
import {
  getLocalStorageCurrency,
  setLocalStorageCurrency,
} from '../../util/localStorageCurrency'

export const criptoSlice = createSlice({
  name: 'criptos',
  initialState: {
    criptoList: [],
    currencySelect: getLocalStorageCurrency(),
    page: 1,
  },
  reducers: {
    coinReduceTable: (state = [], action) => {
      return { ...state, criptoList: action.payload }
    },
    currencySelectReducer: (state = [], action) => {
      setLocalStorageCurrency(action.payload)
      return { ...state, currencySelect: action.payload }
    },
  },
})
export const { coinReduceTable, currencySelectReducer } = criptoSlice.actions

export default criptoSlice.reducer
