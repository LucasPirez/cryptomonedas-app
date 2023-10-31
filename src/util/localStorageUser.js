import { STORGA_USER, TOKEN } from '../constants/constants'

export const storageUser = {
  getData: () => {
    return localStorage.getItem(STORGA_USER)
  },
  setData: (data) => {
    const storage = storageUser.getData()

    if (!storage) {
      localStorage.setItem(STORGA_USER, JSON.stringify(data))
    } else {
      localStorage.setItem(
        STORGA_USER,
        JSON.stringify({ ...JSON.parse(storageUser.getData()), ...data })
      )
    }
  },
  getToken: () => {
    return localStorage.getItem(TOKEN)
  },
  setToken: (token) => {
    localStorage.setItem(TOKEN, token)
  }
}
