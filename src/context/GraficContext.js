import { useState, useEffect, useContext, createContext } from 'react'
import { useRouter } from 'next/router'
import { graficDays, graficRange } from '../client/client'
import { useSelector } from 'react-redux'

export const GraficContext = createContext(null)

export function GraficContextProvider({ children }) {
  const { currencySelect } = useSelector((state) => state.criptoList)
  const router = useRouter()
  const { id } = router.query
  const [time, setTime] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [rangeGrafic, setRangeGrafic] = useState({ min: null, max: null })

  const dateNow = Math.round(new Date().getTime() / 1000)

  function rangeGraficAction({ min, max }) {
    const twoentyDays = 1728000000
    if (
      min < rangeGrafic.min - twoentyDays ||
      min > rangeGrafic.min + twoentyDays ||
      max < rangeGrafic.max - twoentyDays ||
      max > rangeGrafic.max + twoentyDays ||
      rangeGrafic.min === null
    ) {
      setLoading(true)
      graficRange({
        id,
        currency: currencySelect.currency,
        time: min / 1000,
        dateNow: max / 1000
      })
        .then((data) => data.json())
        .then((data) => {
          setData(data.prices)
          setLoading(false)
          setTime(null)
          setRangeGrafic({ min, max })
        })
    } else {
      return null
    }
  }

  function fetch7Days(tiempo, e) {
    e && e.preventDefault()

    setLoading(true)
    graficDays(id, tiempo, currencySelect.currency).then((datos) => {
      setData((data) => datos.prices)
      setLoading(false)
      setTime(tiempo)
    })
  }

  useEffect(() => {
    setLoading(true)
    graficDays(id, 7, currencySelect.currency).then((datos) => {
      setData(() => datos.prices)
      setLoading(false)
      setTime(7)
    })
  }, [])

  const dataContext = {
    data,
    setData,
    fetch7Days,
    time,
    setTime,
    dateNow,
    rangeGraficAction,
    rangeGrafic,
    loading
  }

  return (
    <GraficContext.Provider value={dataContext}>
      {children}
    </GraficContext.Provider>
  )
}

export default function useGraficContext() {
  const context = useContext(GraficContext)

  if (!context) {
    console.error('Error deploying App Context!!!')
  }

  return context
}
