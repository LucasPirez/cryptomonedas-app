export const getSessionStorageBitcoin = () => {
  const storage =
    typeof window !== 'undefined' && window.sessionStorage.getItem('bitcoin')

  return storage
}

export const setSessionStorageBitcoin = (value) => {
  window && window.sessionStorage.setItem('bitcoin', JSON.stringify(value))
}
