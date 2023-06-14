import { useContext } from 'react'
import { color } from '../../../../styles/colors'
import { select } from 'd3'
import { ContextSVG } from '../../context/ContextSVG'
import { getPathData } from 'path-data-polyfill'

export default function Cursor({ animationStart }) {
  const { state } = useContext(ContextSVG)
  const { margin, height, width } = state.constants

  const { coordenadas, parsePath } = state
  const { x, y } = coordenadas

  if (y > margin.bottom && parsePath) {
    parsePath.getPathData().forEach((u, i) => {
      if (x + 2 >= u.values[0] && x - 2 <= u.values[0]) {
        if (y < height - margin.bottom) {
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
        scale={`${animationStart}` ? 1 : 0}
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
      />
      {/* <rect
        x={0}
        y={coordenadas.mouseY - 14}
        fill={color.letters}
        opacity={0.8}
        width={
          y1
            .invert(coordenadas.mouseY)
            .toLocaleString('en-US', { maximumFractionDigits: 0 }).length * 7
        }
        height={18}
      />
      <text
        x={0}
        y={coordenadas.mouseY}
        fontSize={12}
        fill={color.background}
        className='lineY'
      >
        {y1
          .invert(coordenadas.mouseY)
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
      />
    </>
  )
}
