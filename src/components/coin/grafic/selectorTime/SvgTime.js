import { useState, useEffect, useRef } from 'react'
import { useGrafic } from '../../../../hook/useGrafic'
import useConstansGrafic from '../../../../hook/useConstansGrafic'
import {
  extent,
  scaleLinear,
  scaleTime,
  line,
  select,
  min,
  invert,
  remove,
  axisBottom,
  timeFormat,
  selectAll,
  count,
} from 'd3'
import { color } from '../../../../styles/colors'
import useGraficContext from '../../../../context/GraficContext'

export default function SvgTime({ dataHistoric, lineGrafic, xScale, yScale }) {
  const { width, margin } = useConstansGrafic()
  const { data, rangeGraficAction } = useGraficContext()
  const ref1 = useRef(0)
  const ref2 = useRef(1)

  useEffect(() => {
    ref1.current = xScale(data[0][0])
    ref2.current = xScale(data[data.length - 1][0])
  }, [width, data])

  const svgD3 = useGrafic(
    (svg) => {
      select('#rectHistoricMovil').remove()
      select('#pathHistoric').remove()

      const bottomAxis = axisBottom()
        .tickSize(20)
        .scale(xScale)
        .ticks(4, [timeFormat('%Y')])
      svg
        .select('#idG')
        .style('opacity', 0.9)
        .style('color', `${color.lightBlue}`)
        .call(bottomAxis)
        .selectAll('text')
        .style('color', `${color.candleRed}`)
        .style('transform', 'translate(20px,-12px)')

      svg
        .append('path')
        .attr('id', 'pathHistoric')
        .data([dataHistoric])
        .attr('d', lineGrafic)
        .style('stroke', color.lightBlue)
        .style('strokeWidth', 1)
        .style('fill', 'transparent')

      // svg
      //   .select("#rectHistoric")
      //   .attr("x", margin.left)
      //   .attr("y", 0)
      //   .attr("width", Math.abs(width - margin.left))
      //   .attr("height", 80)
      //   .style("fill", "transparent")
      //   .style("stroke", `${color.lightBlue}`)
      //   .style("strokeWidth", 2);

      svg
        .select('#idG')
        .append('rect')
        .attr('id', 'rectHistoricMovil')
        .attr('x', xScale(data[0][0]))
        .attr('y', 0)
        .attr('width', xScale(data[data.length - 1][0]) - xScale(data[0][0]))
        .attr('height', 80)
        .style('fill', color.lightBlue)
        .style('opacity', 0.2)
    },

    [dataHistoric, width, data]
  )

  let bool = ''

  const handleDown = (e, str) => {
    e.preventDefault()
    return (bool = str)
  }

  const handleUp = (e) => {
    e.preventDefault()
    rangeGraficAction({
      min: new Date(xScale.invert(ref1.current)).getTime(),
      max: new Date(xScale.invert(ref2.current)).getTime(),
    })

    return (bool = 'none')
  }

  const handleMove = (e) => {
    e.preventDefault()

    const x = e.nativeEvent.offsetX

    if (bool === 'left') {
      if (x <= ref2.current - 10) {
        select('#lineHistoric').attr('x1', x).attr('x2', x)
        ref1.current = x
      } else {
        select('#lineHistoric').attr('x1', x).attr('x2', x)
        select('#lineHistoricMax')
          .attr('x1', x + 9)
          .attr('x2', x + 9)
        ref2.current = x + 9
        ref1.current = x
      }
    }

    if (bool === 'right') {
      if (x >= ref1.current + 10) {
        select('#lineHistoricMax').attr('x1', x).attr('x2', x)
        ref2.current = x
      } else {
        select('#lineHistoricMax').attr('x1', x).attr('x2', x)
        select('#lineHistoric')
          .attr('x1', x - 9)
          .attr('x2', x - 9)
        ref1.current = x - 9
        ref2.current = x
      }
    }
    if (bool === 'left' || bool === 'right') {
      console.log(ref1, ref2)
      select('#rectHistoricMovil')
        .attr('x', ref1.current)
        .attr('y', 0)
        .attr('width', Math.abs(ref2.current - ref1.current))
    }
  }

  return (
    <>
      <svg
        ref={svgD3}
        style={{
          width: '100%',
          height: '100%',
        }}
        onMouseUp={handleUp}
        onMouseMove={handleMove}
      >
        {/* <rect id="rectHistoric" /> */}

        <g id='idG' onMouseDown={(e) => handleDown(e, 'g')}></g>

        <line
          style={{ cursor: 'ew-resize' }}
          id={'lineHistoricMax'}
          x1={xScale(data[data.length - 1][0]) - 2}
          y={0}
          x2={xScale(data[data.length - 1][0]) - 2}
          y2={80}
          stroke={`${color.candleRed}40`}
          strokeWidth={4}
          onMouseDown={(e) => handleDown(e, 'right')}
          onMouseUp={handleUp}
        />
        {data && (
          <line
            style={{ cursor: 'ew-resize' }}
            id={'lineHistoric'}
            x1={xScale(min(data, (d) => d[0]))}
            y={0}
            x2={xScale(min(data, (d) => d[0]))}
            y2={80}
            stroke={`${color.lightBlue}40`}
            strokeWidth={4}
            onMouseDown={(e) => handleDown(e, 'left')}
            onMouseUp={handleUp}
          />
          // <rect x1={} />
        )}
      </svg>
    </>
  )
}
