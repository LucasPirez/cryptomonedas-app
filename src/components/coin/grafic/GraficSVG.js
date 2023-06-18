import { useMemo } from 'react'
import { useGrafic } from '../../../hook/useGrafic'
import { color } from '../../../styles/colors'
import * as d3 from 'd3'
import { scaleTime, scaleLinear, min, max } from 'd3'
import Grafic from './lineGrafic/Grafic'
import useCursor from '../../../hook/useCursor'
import CandleGrafic from './candleGrafic'
import { useContextSVG } from '../context/ContextSVG'
import { useContextAnimationCursor } from '../context/ContextAnimationCursor'

export default function GraficSVG({ data, change, dataBitcoin }) {
  const { dispatch: dispatchSVG, state } = useContextSVG()
  const { width, height, margin } = state.constants

  const { dispatch: dispatchAnimation } = useContextAnimationCursor()
  const { getYforX, startTouch, getyforXTouch, stopAnimation } =
    useCursor(dispatchAnimation)

  const { xScale, yScale } = useMemo(() => {
    const X = scaleTime()
      .domain([min(data, (d) => d[0]), max(data, (d) => d[0])])
      .range([margin.left, width])

    const Y = scaleLinear()
      .domain([min(data, (d) => d[1]), max(data, (d) => d[1])])
      .range([height - margin.bottom, margin.top])

    return { xScale: X, yScale: Y }
  }, [data, width])

  const diference = data[data.length - 1][0] - data[0][0]

  const graficD3 = useGrafic(
    (svg) => {
      dispatchSVG({
        type: 'SET_SCALEXANDY',
        payload: { scaleX: xScale, scaleY: yScale }
      })

      const xAxis = (g) =>
        g

          .attr('transform', `translate(0,${height - margin.bottom})`)
          .style('color', `${color.letters}`)
          .style('opacity', '0.8')
          .call(
            d3
              .axisBottom()
              .scale(xScale)

              .ticks(
                8,
                d3.timeFormat(diference > 2629800000 ? '%d/%m/ %Y' : '%d')
              )
          )
          .selectAll('text')
          .style('color', `${color.letters}`)
          .style('opacity', '0.8')

      const y1Axis = (g) =>
        g
          .attr('transform', `translate(${margin.left},0)`)
          .style('color', `${color.letters}`)
          .style('opacity', '0.8')
          .call(d3.axisLeft(yScale).ticks(7).tickSize(0))
          .style('opacity', '0.8')

      const xAxisGrid = d3
        .axisLeft(yScale)
        .tickSize(-width)
        .tickFormat('')
        .ticks(10)

      svg.select('#xxis').call(xAxis)
      svg.select('#yxis').call(y1Axis)

      svg
        .select('#grd')
        .attr('transform', `translate(${margin.left},0)`)
        .attr('class', 'noGrid')
        .style('color', `${color.letters}`)
        .style('opacity', '0.15')
        .call(xAxisGrid)
    },
    [yScale]
  )

  return (
    <>
      <div className='container'>
        <svg
          ref={graficD3}
          style={{
            height,
            width,
            marginRight: '0px',
            marginLeft: '0px',
            cursor: 'crosshair'
          }}
          onMouseMove={getYforX}
          onMouseLeave={stopAnimation}
          onTouchStart={(e) => startTouch(e)}
          onTouchMove={getyforXTouch}
          onTouchEnd={stopAnimation}
        >
          <g id='xxis' />
          <g id='yxis' />
          <g id='grd' />

          {state.scaleXandY.scaleX && (
            <>
              {state.selectGrafic === 'line' ? (
                <Grafic data={data} change={change} dataBitcoin={dataBitcoin} />
              ) : (
                <CandleGrafic data={data} />
              )}
            </>
          )}
        </svg>
      </div>

      <style jsx>{`
        .container {
          width: width;
          height: height;
          position: relative;
        }

        .lineY {
          width: 30;
          height: 30;
          background: black;
        }
      `}</style>
    </>
  )
}
