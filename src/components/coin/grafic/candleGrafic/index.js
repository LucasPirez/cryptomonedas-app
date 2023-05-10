import useConstansGrafic from '../../../../hook/useConstansGrafic'
import { scaleLinear, scaleTime, min, max } from 'd3'
import Grafic from './Grafic'

export default function CandleGrafic({ data }) {
  const { width, height, margin } = useConstansGrafic()
  const divisor = data.length / 10

  const x1 = scaleTime()
    .domain([min(data, (d) => d[0]), max(data, (d) => d[0])])
    .range([margin.left, width])

  const y1 = scaleLinear()
    .domain([min(data, (d) => d[1]), max(data, (d) => d[1])])
    .range([height - margin.bottom, margin.top])

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
      promedio: y1((u.maximo + u.minimo) / 2),
      posX: x1(u.date) - 2.5,
      maximo: y1(u.maximo),
      minimo: y1(u.minimo),
      open: y1(u.open),
      close: y1(u.close)
    }
  })

  return (
    <>
      <div className='container'>
        <Grafic
          dataObj={obj()}
          dataScale={dataScale}
          x1={x1}
          y1={y1}
          stateData={data}
        />
      </div>
      <style jsx>{`
        .container {
          width: width;
          height: height;
          position: relative;
        }
      `}</style>
    </>
  )
}
