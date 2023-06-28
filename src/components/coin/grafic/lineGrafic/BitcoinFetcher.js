import { useEffect, useRef, useState } from 'react'
import { useContextGraficsData } from '../../context/ContextGraficsData'
import BitcoinGrafic from './BitcoinGrafic'
import { useSelector } from 'react-redux'
import { graficDays, graficRange } from '../../../../client/client'

export default function BitcoinFetcher({ setBitcoinScale }) {
  const [dataBitcoin, setDataBitcoin] = useState([])
  const { currencySelect } = useSelector((state) => state.criptoList)
  const { data, rangeGrafic, time, bitcoinGrafic } = useContextGraficsData()
  const rangeMin = useRef({ min: null, time: null })

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

  return (
    <BitcoinGrafic
      dataBitcoin={dataBitcoin}
      setBitcoinScale={setBitcoinScale}
    />
  )
}
