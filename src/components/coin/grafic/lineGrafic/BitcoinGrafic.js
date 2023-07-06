import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'
import { color } from '../../../../styles/colors'
import { useContextSVG } from '../../context/ContextSVG'
import { useContextAnimationCursor } from '../../context/ContextAnimationCursor'

export default function BitcoinGrafic({ dataBitcoin }) {
  const { state } = useContextSVG()
  const { width, height, margin } = state.constants

  const { state: stateAnimation, dispatch } = useContextAnimationCursor()
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
      .select('[name=pathBitcoin]')
      .data([dataBitcoin])
      .attr('class', 'line')
      .attr('d', valueLine)
      .attr('stroke', `${color.bitcoin}`)
      .attr('stroke-width', 2)
      .attr('fill', 'none')

    const parse = path.node()
    setStateBitcoin(parse)
  }, [dataBitcoin, width])

  useEffect(() => {
    if (stateBitcoin) {
      stateBitcoin.getPathData().forEach((u, i) => {
        if (x + 2 >= u.values[0] && x - 2 <= u.values[0]) {
          const eventY = { x: u.values[0], y: u.values[1] }

          d3.select('[name=bitcoinDezlizador]').style(
            'transform',
            `translate(${u.values[0]}px,${u.values[1]}px)`
          )

          const invert = y1.invert(eventY.y)
          dispatch({ type: 'SET_BITCOINSCALE', payload: invert })
        }
      })
    }
  }, [x])

  return (
    <>
      <g />
      <path name='pathBitcoin' />
      <circle
        name='bitcoinDezlizador'
        r='3.4'
        fill={color.bitcoin}
        stroke={color.letters}
        strokeWidth={1.8}
        opacity={dataBitcoin ? 1 : 0}
      />
    </>
  )
}
