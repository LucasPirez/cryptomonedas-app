import { useContext, createContext, useState, useEffect } from 'react'
import { graficDays, graficRange } from '../../../client/client'
import { useSelector } from 'react-redux'
import { getSessionStorageBitcoin } from '../../../storage/sessionStorageBitcoin'

const ContextGraficsData = createContext(null)

const initialState = {
  data: null,
  dataHistoric: null,
  dataBitcoin: getSessionStorageBitcoin(),
  time: null,
  loading: null,
  rangeGrafic: null,
  bitcoinGrafic: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload, loading: false }
    case 'SET_DATAHISTORIC':
      return { ...state, dataHistoric: action.payload, loading: false }
    case 'SET_TIME':
      return { ...state, time: action.payload }
    case 'SET_RANGEGRAFIC':
      return { ...state, rangeGrafic: action.payload }
    case 'LOADING':
      return { ...state, loading: true }
    case 'TOGGLE_BITCOIN_GRAFIC':
      return { ...state, bitcoinGrafic: !state.bitcoinGrafic }
    default:
      throw new Error('ContextGraficsData reducer action.type is not exist')
  }
}

export default function ContextGraficsDataProvide({ children, id }) {
  const [bitcoinGrafic, setBitcoinGrafic] = useState(false)
  const { currencySelect } = useSelector((state) => state.criptoList)
  const [dataHistoric, setDataHistoric] = useState(null)
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
      setData(datos.prices)
      setLoading(false)
      setTime(tiempo)
    })
  }

  useEffect(() => {
    setLoading(true)
    graficDays(id, 7, currencySelect.currency).then((datos) => {
      setData(datos.prices)
      setLoading(false)
      setTime(7)
    })
  }, [])

  useEffect(() => {
    const abortController = new AbortController()

    graficRange({ id, currency: 'usd', time: 1022577232 }, abortController)
      .then((data) => data.json())
      .then((data) => {
        setDataHistoric(data.prices)
      })
      .catch((error) => {
        console.log(error)
        return null
      })

    return () => {
      abortController.abort()
    }
  }, [])

  const value = {
    dataHistoric,
    data,
    setData,
    fetch7Days,
    time,
    setTime,
    dateNow,
    rangeGraficAction,
    rangeGrafic,
    loading,
    bitcoinGrafic,
    setBitcoinGrafic
  }

  return (
    <ContextGraficsData.Provider value={value}>
      {children}
    </ContextGraficsData.Provider>
  )
}

export function useContextGraficsData() {
  const context = useContext(ContextGraficsData)

  if (!context) {
    throw new Error('El contexto debe usarse dentro del provider')
  }
  return context
}
