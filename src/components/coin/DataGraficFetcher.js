import { useState, useEffect, useRef } from 'react'
import { graficDays, graficRange } from '../../client/client'
import { useSelector } from 'react-redux'
import ContainerGrafic from './ContainerGrafic'
import { useContextGraficsData } from './context/ContextGraficsData'

export default function DataGraficFetcher({ id }) {
  const [dataBitcoin, setDataBitcoin] = useState(null)
  const { currencySelect } = useSelector((state) => state.criptoList)
  const rangeMin = useRef({ min: null, time: null })
  const [change, setChange] = useState(false)
  const { data, rangeGrafic, time } = useContextGraficsData()

  function reduceBitcoin(value) {
    const arr = value.map((u, i) => {
      if (i < data.length) {
        return [u[0], data[i][1] / u[1]]
      }
    })
    setDataBitcoin(arr)
  }

  useEffect(() => {
    ;(async () => {
      if (data && time && change && rangeMin.current.time !== time) {
        rangeMin.current.time = time

        const response = await graficDays(
          'bitcoin',
          time,
          currencySelect.currency
        )

        reduceBitcoin(response.prices)
      }
    })()
  }, [time, change])

  useEffect(() => {
    if (change && rangeGrafic.min !== rangeMin.current.min) {
      rangeMin.current.min = rangeGrafic.min

      graficRange({
        id: 'bitcoin',
        currency: currencySelect.currency,
        time: rangeGrafic.min / 1000,
        dateNow: rangeGrafic.max / 1000
      })
        .then((datos) => datos.json())
        .then((datos) => {
          reduceBitcoin(datos.prices)
        })
    }
  }, [rangeGrafic, change])

  return (
    <ContainerGrafic
      dataBitcoin={dataBitcoin}
      id={id}
      change={change}
      setChange={setChange}
    />
  )
}
