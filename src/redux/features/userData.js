import { createSlice } from '@reduxjs/toolkit'
import { storageUser } from '../../storage/localStorageUser'

const initialState = {
  alerts: [],
  email: null,
  firstName: null,
  lastName: null,
  userDataId: null,
  token: null
}

const storage = storageUser().getData()

const userSlice = createSlice({
  name: 'userData',
  initialState: storage ? JSON.parse(storage) : initialState,
  reducers: {
    setUserData: (state, action) => {
      const { userData, token } = action.payload
      storageUser().setData(userData)
      storageUser().setToken(token)
      return { ...userData, token }
    },
    deleteData: () => {
      storageUser().deleteData()
      return initialState
    }
  }
})

export const { setUserData, deleteData } = userSlice.actions

export default userSlice.reducer
