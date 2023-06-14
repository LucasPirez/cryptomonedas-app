import Grafic from './Grafic'
import { useContext } from 'react'
import { ContextSVG } from '../../context/ContextSVG'

export default function CandleGrafic({ data }) {
  const { state } = useContext(ContextSVG)
  const { scaleX, scaleY } = state.scaleXandY
  const divisor = data.length / 10

  const obj = () => {
    const long = Math.round(data.length / divisor)
    const newarr = []

    for (let i = 0; i < data.length - long + 1; i += long) {
      const arr = []
      for (let j = i; j < i + long; j++) {
        arr.push(data[j][1])
      }

      const close = arr[arr.length - 1]

      if (newarr.length === 0) {
        newarr.push({
          date: data[i][0],
          minimo: Math.min(...arr),
          maximo: Math.max(...arr),
          open: arr[0],
          close
        })
      } else {
        newarr.push({
          date: data[i][0],
          minimo: Math.min(...arr),
          maximo: Math.max(...arr),
          open: newarr[newarr.length - 1].close,
          close
        })
      }
    }

    return newarr
  }

  const dataScale = obj().map((u) => {
    return {
      promedio: scaleY((u.maximo + u.minimo) / 2),
      posX: scaleX(u.date) - 2.5,
      maximo: scaleY(u.maximo),
      minimo: scaleY(u.minimo),
      open: scaleY(u.open),
      close: scaleY(u.close)
    }
  })

  return (
    <Grafic
      dataObj={obj()}
      dataScale={dataScale}
      x1={scaleX}
      y1={scaleY}
      stateData={data}
    />
  )
}
