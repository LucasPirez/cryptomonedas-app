import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { exchangesList } from '../../client/client'

export const exchanges = createAsyncThunk(
  'exchanges/exchanges',
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
  page: null,
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
    updatePage: (state, action) => {
      return { ...state, page: action.payload }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(exchanges.pending, (state, action) => {
        state.loading = true
      })
      .addCase(exchanges.fulfilled, (state, action) => {
        state.loading = false
        state.dataExchanges = action.payload.response
        state.page = action.payload.page
      })
      .addCase(exchanges.rejected, (state, action) => {
        state.error = action.error.message
      })
  },
})

export const { exchangeReducer, updateBitcoin, updatePage } =
  exchangesSlice.actions

export default exchangesSlice.reducer
