import { useContext, useEffect, useRef } from 'react'
import { useGrafic } from '../../../../hook/useGrafic'
import { select, min, axisBottom, timeFormat } from 'd3'
import { color } from '../../../../styles/colors'
import { ContextSVG } from '../../context/ContextSVG'
import { useContextGraficsData } from '../../context/ContextGraficsData'

export default function SvgTime({ dataHistoric, lineGrafic, xScale, yScale }) {
  const { state } = useContext(ContextSVG)
  const { width } = state.constants
  const { data, rangeGraficAction } = useContextGraficsData()
  const refLines = useRef({ left: 0, right: 1 })
  const currentSelect = useRef()

  useEffect(() => {
    refLines.current.left = xScale(data[0][0])
    refLines.current.right = xScale(data[data.length - 1][0])
  }, [width, data])

  useEffect(() => {
    console.log('hola')
  })

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

  const handleDown = (e, str) => {
    e.preventDefault()

    currentSelect.current = str
  }

  const handleUp = (e) => {
    e.preventDefault()
    rangeGraficAction({
      min: new Date(xScale.invert(refLines.current.left)).getTime(),
      max: new Date(xScale.invert(refLines.current.right)).getTime()
    })

    return (currentSelect.current = 'none')
  }

  const dicSelect = {
    RIGHT: 'right',
    LEFT: 'left'
  }

  const handleMove = (e) => {
    e.preventDefault()
    const x = e.nativeEvent.offsetX

    if (currentSelect.current === dicSelect.LEFT) {
      if (x <= refLines.current.right - 10) {
        select('#lineHistoric').attr('x1', x).attr('x2', x)
        refLines.current.left = x
      } else {
        select('#lineHistoric').attr('x1', x).attr('x2', x)
        select('#lineHistoricMax')
          .attr('x1', x + 9)
          .attr('x2', x + 9)
        refLines.current.right = x + 9
        refLines.current.left = x
      }
    }

    if (currentSelect.current === dicSelect.RIGHT) {
      if (x >= refLines.current.left + 10) {
        select('#lineHistoricMax').attr('x1', x).attr('x2', x)
        refLines.current.right = x
      } else {
        select('#lineHistoricMax').attr('x1', x).attr('x2', x)
        select('#lineHistoric')
          .attr('x1', x - 9)
          .attr('x2', x - 9)
        refLines.current.left = x - 9
        refLines.current.right = x
      }
    }
    if (
      currentSelect.current === dicSelect.LEFT ||
      currentSelect.current === dicSelect.RIGHT
    ) {
      select('#rectHistoricMovil')
        .attr('x', refLines.current.left)
        .attr('y', 0)
        .attr('width', Math.abs(refLines.current.right - refLines.current.left))
    }
  }

  return (
    <>
      <svg
        ref={svgD3}
        style={{
          width: '100%',
          height: '100%'
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
