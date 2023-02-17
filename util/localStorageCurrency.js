const CURRENCY_SELECT = 'currencySelect'

export const getLocalStorageCurrency = () => {
  const storage =
    typeof window !== 'undefined' &&
    window.localStorage.getItem(CURRENCY_SELECT)

  if (!storage) {
    return { currency: 'USD', symbol: '$' }
  }

  const { currency, symbol } = JSON.parse(storage)

  return { currency, symbol }
}

export const setLocalStorageCurrency = (value) => {
  window && window.localStorage.setItem(CURRENCY_SELECT, JSON.stringify(value))
}
