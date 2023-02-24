import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getLocalStorageCurrency,
  setLocalStorageCurrency,
} from '../../util/localStorageCurrency'
import { pagination } from '../../client/client'

export const fetchByPage = createAsyncThunk('coin/fetchByPage', async (num) => {
  const response = await pagination(num, 'usd')
  console.log(response)
  return { response, page: num }
})

export const criptoSlice = createSlice({
  name: 'criptos',
  initialState: {
    criptoList: [],
    currencySelect: getLocalStorageCurrency(),
    page: 1,
    loading: false,
    error: null,
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
  extraReducers: (builder) => {
    builder.addCase(fetchByPage.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(fetchByPage.fulfilled, (state, action) => {
      state.loading = false
      state.criptoList = action.payload.response
      state.page = action.payload.page
    })
    builder.addCase(fetchByPage.rejected, (state, action) => {
      state.error = action.error.message
    })
  },
})
export const { coinReduceTable, currencySelectReducer } = criptoSlice.actions

export default criptoSlice.reducer
