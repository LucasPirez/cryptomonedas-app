import { useRef } from 'react'
import { color } from '../../../../styles/colors'
import { select } from 'd3'
import { useContextSVG } from '../../context/ContextSVG'
import RectInformation from '../lineGrafic/RectInformation'
import { getPathData } from 'path-data-polyfill'
import { useContextAnimationCursor } from '../../context/ContextAnimationCursor'

export default function Cursor({ bitcoinPrice, bitcoinScale }) {
  const { state } = useContextSVG()
  const { margin, height, width } = state.constants
  const { parsePath } = state

  const { state: stateAnimation } = useContextAnimationCursor()
  const { x, y } = stateAnimation.coordenadas

  const valueYRef = useRef()

  if (y > margin.bottom && parsePath) {
    parsePath.getPathData().forEach((u, i) => {
      if (x + 2 >= u.values[0] && x - 2 <= u.values[0]) {
        if (y < height - margin.bottom) {
          valueYRef.current = u.values[1]
          select('[name=circle]')
            .attr('cy', u.values[1])
            .attr('cx', u.values[0])

          select('[name=lineUpdate]')
            .attr('x1', margin.left)
            .attr('y1', u.values[1])
            .attr('x2', width)
            .attr('y2', u.values[1])

          select('[name=lineVerticalUpdate]')
            .attr('x1', x)
            .attr('y1', margin.top)
            .attr('x2', x)
            .attr('y2', height - margin.bottom)
        }
      }
    })
  }

  return (
    <>
      <circle
        cx='187.476'
        cy='214.443'
        r='3.4'
        name='circle'
        fill={color.lineGrafic}
        stroke={color.letters}
        transform={`scale(${stateAnimation.animationStart ? 1 : 0})`}
      />
      <line
        className='cursor'
        name='lineUpdate'
        x1='0'
        y1='30'
        x2='300'
        y2='30'
        fill={color.letters}
        stroke={color.letters}
        strokeDasharray={2}
        strokeOpacity={0.5}
        transform={`scale(${stateAnimation.animationStart ? 1 : 0})`}
      />
      {/* <rect
        x={0}
        y={coordenadas.y - 14}
        fill={color.letters}
        opacity={0.8}
        width={
          y1
            .invert(coordenadas.y)
            .toLocaleString('en-US', { maximumFractionDigits: 0 }).length * 7
        }
        height={18}
      />
      <text
        x={0}
        y={coordenadas.y}
        fontSize={12}
        fill={color.background}
        className='lineY'
      >
        {y1
          .invert(coordenadas.y)
          .toLocaleString('en-US', { maximumFractionDigits: 0 })}
      </text> */}
      <line
        className='cursor'
        name='lineVerticalUpdate'
        x1='0'
        y1='30'
        x2='300'
        y2='30'
        fill={color.letters}
        stroke={color.letters}
        strokeDasharray={2}
        strokeOpacity={0.5}
        transform={`scale(${stateAnimation.animationStart ? 1 : 0})`}
      />

      <RectInformation
        bitcoinPrice={bitcoinPrice}
        bitcoinScale={bitcoinScale}
        valueYRef={valueYRef}
      />
    </>
  )
}
