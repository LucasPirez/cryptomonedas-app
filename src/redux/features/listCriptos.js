import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getLocalStorageCurrency,
  setLocalStorageCurrency
} from '../../util/localStorageCurrency'
import { pagination } from '../../client/client'

export const fetchByPage = createAsyncThunk(
  'coin/fetchByPage',
  async ({ numPage, currency }) => {
    const response = await pagination(numPage, currency)
    return { response, page: numPage }
  }
)

export const criptoSlice = createSlice({
  name: 'criptos',
  initialState: {
    criptoList: [],
    currencySelect: getLocalStorageCurrency(),
    page: null,
    loading: false,
    error: null
  },
  reducers: {
    coinReduceTable: (state = [], action) => {
      return { ...state, criptoList: action.payload }
    },
    currencySelectReducer: (state = [], action) => {
      setLocalStorageCurrency(action.payload)
      return { ...state, currencySelect: action.payload }
    },
    currencyUpdatePage: (state, action) => {
      return { ...state, page: action.payload }
    }
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
      state.error = 'Ha ocurrido un Error intente mas Tarde.'
    })
  }
})
export const { coinReduceTable, currencySelectReducer, currencyUpdatePage } =
  criptoSlice.actions

export default criptoSlice.reducer
