import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'

import { color } from '../../../../styles/colors'
import { useContextSVG } from '../../context/ContextSVG'
import { useContextAnimationCursor } from '../../context/ContextAnimationCursor'

export default function BitcoinGrafic({ dataBitcoin, setBitcoinScale }) {
  const { state } = useContextSVG()
  const { width, height, margin } = state.constants

  const { state: stateAnimation } = useContextAnimationCursor()
  const { x } = stateAnimation.coordenadas

  const [stateBitcoin, setStateBitcoin] = useState(null)

  const y1 = d3
    .scaleLinear()
    .domain([
      d3.min(dataBitcoin, (d) => d[1]),
      d3.max(dataBitcoin, (d) => d[1])
    ])
    .range([height - margin.bottom, margin.top])

  useEffect(() => {
    const x1 = d3
      .scaleTime()
      .domain([
        d3.min(dataBitcoin, (d) => d[0]),
        d3.max(dataBitcoin, (d) => d[0])
      ])
      .range([margin.left, width])

    const valueLine = d3
      .line()
      .x((d) => x1(d[0]))
      .y((d) => y1(d[1]))

    const path = d3
      .select('#pathBitcoin')
      .data([dataBitcoin])
      .attr('class', 'line')
      .attr('d', valueLine)
      .style('stroke', `${color.bitcoin}`)
      .style('fill', 'transparent')
      .style('stroke-width', 1.4)

    const parse = path.node()
    setStateBitcoin(parse)
  }, [dataBitcoin, width])

  useEffect(() => {
    if (stateBitcoin) {
      stateBitcoin.getPathData().forEach((u, i) => {
        if (x + 2 >= u.values[0] && x - 2 <= u.values[0]) {
          const eventY = { x: u.values[0], y: u.values[1] }

          d3.select('[name=bitcoinDezlizador]')
            .attr('cx', u.values[0])
            .attr('cy', u.values[1])
          // setBitcoinPrice(eventY)
          setBitcoinScale(y1.invert(eventY.y))
        }
      })
    }
  }, [x])

  return (
    <>
      <g id='axisBitcoin' />
      <path id='pathBitcoin' />

      <circle
        className='cursor'
        name='bitcoinDezlizador'
        cx='187.476'
        cy='214.443'
        r='2.5'
        fill={color.bitcoin}
        stroke={color.blue}
        opacity={dataBitcoin ? 1 : 0}
      />
    </>
  )
}
