import { scaleLinear, extent, line } from 'd3'
import { color } from '../../../styles/colors'

function GraficRow({ dataGrafic, graficColor, width = 220 }) {
  const height = 65
  const margin = { horizontal: 2, vertical: 4 }

  const x1 = scaleLinear()
    .domain([0, 168])
    .range([margin.horizontal, width - margin.horizontal])

  const y1 = scaleLinear()
    .domain(extent(dataGrafic, (d) => d))
    .range([height - margin.vertical, margin.vertical])

  const valueLine = line()
    .x((d, i) => x1(i))
    .y((d) => y1(d))

  return (
    <svg
      style={{
        width,
        height
      }}
    >
      <path
        d={valueLine(dataGrafic)}
        fill={'transparent'}
        stroke={graficColor > -0.5 ? color.candleGreen : color.candleRed}
        strokeWidth={1.7}
      />
    </svg>
  )
}
export default GraficRow
