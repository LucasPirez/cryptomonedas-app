import { useState, useEffect, useRef } from 'react'
import { graficDays, graficRange } from '../../client/client'
import { useSelector } from 'react-redux'
import ContainerGrafic from './ContainerGrafic'
import { useContextGraficsData } from './context/ContextGraficsData'

export default function DataGraficFetcher({ id }) {
  const [dataBitcoin, setDataBitcoin] = useState(null)
  const { currencySelect } = useSelector((state) => state.criptoList)
  const rangeMin = useRef({ min: null, time: null })

  const { data, rangeGrafic, time, bitcoinGrafic } = useContextGraficsData()

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
      if (data && time && bitcoinGrafic && rangeMin.current.time !== time) {
        rangeMin.current.time = time

        const response = await graficDays(
          'bitcoin',
          time,
          currencySelect.currency
        )

        reduceBitcoin(response.prices)
      }
    })()
  }, [time, bitcoinGrafic])

  useEffect(() => {
    if (bitcoinGrafic && rangeGrafic.min !== rangeMin.current.min) {
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
  }, [rangeGrafic, bitcoinGrafic])

  return <ContainerGrafic dataBitcoin={dataBitcoin} id={id} />
}
