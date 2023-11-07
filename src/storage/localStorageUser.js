import { STORGA_USER, TOKEN } from '../constants/constants'

export const storageUser = () => {
  if (typeof window === 'undefined') {
    return {
      getData: () => '{}',
      getToken: () => '{}'
    }
  }
  return {
    getData: () => localStorage.getItem(STORGA_USER),
    setData: (data) => {
      const storage = storageUser().getData()

      if (!storage) {
        localStorage.setItem(STORGA_USER, JSON.stringify(data))
      } else {
        localStorage.setItem(
          STORGA_USER,
          JSON.stringify({ ...JSON.parse(storage), ...data })
        )
      }
    },
    getToken: () => localStorage.getItem(TOKEN),
    setToken: (token) => localStorage.setItem(TOKEN, token)
  }
}
