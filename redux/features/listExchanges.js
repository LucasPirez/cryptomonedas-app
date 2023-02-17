import { createSlice } from '@reduxjs/toolkit'

export const exchangesList = createSlice({
  name: 'exchanges',
  initialState: { dataExchanges: null, bitcoin: null },
  reducers: {
    exchangeReducer: (state = [], action) => {
      return { ...state, dataExchanges: action.payload }
    },
    updateBitcoin: (state, action) => {
      return { ...state, bitcoin: action.payload }
    },
  },
})

export const { exchangeReducer, updateBitcoin } = exchangesList.actions

export default exchangesList.reducer
