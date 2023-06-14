import { scaleLinear, scaleTime, line, extent } from 'd3'
import SvgTime from './SvgTime'
import { useContextGraficHistoric } from '../../context/ContextGraficsData'
import { useContext } from 'react'
import { ContextSVG } from '../../context/ContextSVG'

export default function ContainerTimeGrafic() {
  const { state } = useContext(ContextSVG)
  const { width, margin } = state.constants
  const { dataHistoric: data } = useContextGraficHistoric()

  const xScale = scaleTime()
    .domain(extent(data, (d) => d[0]))
    .range([margin.left, width])

  const yScale = scaleLinear()
    .domain(extent(data, (d) => d[1]))
    .range([76, 4])

  const lineGrafic = line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]))

  return (
    <>
      <div
        style={{
          width: `${width}px`,
          height: '80px'
        }}
      >
        <SvgTime
          lineGrafic={lineGrafic}
          xScale={xScale}
          yScale={yScale}
          dataHistoric={data}
        />
      </div>
    </>
  )
}
