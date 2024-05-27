import { BASE_URL } from '../constants/constants'

let count = 0
export const global = () => {
  console.log('globalFetch')
  ++count
  console.log(count)

  return fetch(`${BASE_URL}/global`)
    .then((data) => data.json())
    .catch((error) => {
      console.log(error)
      throw new Error(error.message)
    })
}

export const lista = () => {
  console.log('listafetch')
  ++count
  console.log(count)
  return fetch(` ${BASE_URL}coins/list`)
    .then((data) => data.json())
    .catch((error) => {
      console.log(error)
    })
}

export const pagination = (id, currency) => {
  console.log('pagination')
  ++count
  console.log(count)
  return fetch(
    `${BASE_URL}coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=${id}&&sparkline=true&price_change_percentage=1h,24h,7d`
  ).then((data) => data.json())
}

export const oneCoin = (id) => {
  console.log('oneCoinfetch')
  ++count
  console.log(count)
  const response = fetch(`${BASE_URL}coins/${id}?sparkline=true`)
    .then((data) => data.json())
    .catch((error) => {
      console.log(error)
    })

  return response
}

export const graficRange = (
  {
    id,
    currency,
    time,
    dateNow = Math.round(new Date().getTime() / 1000)
  },
  signal
) => {
  console.log('graficRange')
  ++count
  console.log(count)
  return fetch(
    `${BASE_URL}coins/${id}/market_chart/range?vs_currency=${currency}&from=${time}&to=${dateNow}`,
    {
      signal,
      method: 'GET',
      headers: { accept: 'application/json' }
    }
  )
}

export const graficDays = (id, days = 7, currency, signal) => {
  console.log('graficDays')
  ++count
  console.log(count)
  return fetch(
    `${BASE_URL}coins/${id}/market_chart?vs_currency=${currency}&days=${days}`,
    {
      signal,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
    .then((data) => {
      if (!data.ok) {
        throw new Error('Error en la solicitud')
      }
      return data.json()
    })
    .catch((error) => {
      console.log(error)
      return null
    })
}

export const exchangesList = (num) => {
  console.log('exchangesList')
  ++count
  console.log(count)
  return fetch(
    `${BASE_URL}/exchanges/?per_page=100&page=${num}`
  ).then((data) => data.json())
}
