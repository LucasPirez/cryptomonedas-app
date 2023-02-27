import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { exchangesList } from '../../client/client'

export const exchangesFetch = createAsyncThunk(
  'exchanges/exchangesFetch',
  async (num) => {
    const response = await exchangesList(num)
    return { response, page: num }
  }
)

const initialState = {
  dataExchanges: null,
  bitcoin: null,
  loading: false,
  error: null,
  page: 1,
}

export const exchangesSlice = createSlice({
  name: 'exchanges',
  initialState,
  reducers: {
    exchangeReducer: (state = [], action) => {
      return { ...state, dataExchanges: action.payload }
    },
    updateBitcoin: (state, action) => {
      return { ...state, bitcoin: action.payload }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(exchangesFetch.pending, async (state, action) => {
        state.loading = true
      })
      .addCase(exchangesFetch.fulfilled, async (state, action) => {
        state.loading = false
        state.dataExchanges = action.payload.response
        state.page = action.payload.page
      })
      .addCase(exchangesFetch.rejected, async (state, action) => {
        state.error = action.error.message
      })
  },
})

export const { exchangeReducer, updateBitcoin } = exchangesSlice.actions

export default exchangesSlice.reducer
