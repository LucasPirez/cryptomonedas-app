import { STORAGE_USER, TOKEN } from '../constants/constants'

export const storageUser = () => {
  if (typeof window === 'undefined') {
    return {
      getData: () => '{}',
      getToken: () => '{}'
    }
  }
  return {
    getData: () => localStorage.getItem(STORAGE_USER),
    setData: (data) => {
      const storage = storageUser().getData()

      if (!storage) {
        localStorage.setItem(STORAGE_USER, JSON.stringify(data))
      } else {
        localStorage.setItem(
          STORAGE_USER,
          JSON.stringify({ ...JSON.parse(storage), ...data })
        )
      }
    },
    deleteData: () => localStorage.removeItem(STORAGE_USER),
    getToken: () => localStorage.getItem(TOKEN),
    setToken: (token) => localStorage.setItem(TOKEN, token)
  }
}
