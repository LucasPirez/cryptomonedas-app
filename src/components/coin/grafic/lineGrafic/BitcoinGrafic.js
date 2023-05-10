import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'
import useConstansGrafic from '../../../../hook/useConstansGrafic'
import { color } from '../../../../styles/colors'

export default function BitcoinGrafic({
  dataBitcoin,
  setBitcoinPrice,
  coordenadas,
  setBitcoinScale
}) {
  const { width, height, margin } = useConstansGrafic()

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

    // const yAxis = d3
    //   .select('#axisBitcoin')
    //   .attr('transform', `translate(${width - margin.left},0)`)
    //   .style('color', 'transparent')
    //   .call(d3.axisRight().scale(y1).ticks(7).tickSize(0))
    //   .selectAll('text')
    //   .style('color', `${color.bitcoin}`)
    //   .style('font-weight', 600)
    //   .style('font-size', 12)

    const parse = path.node()
    setStateBitcoin(parse)
  }, [dataBitcoin, width])

  useEffect(() => {
    if (stateBitcoin) {
      stateBitcoin.getPathData().map((u, i) => {
        const x = coordenadas.x
        if (x + 2 >= u.values[0] && x - 2 <= u.values[0]) {
          const eventY = { x: u.values[0], y: u.values[1] }
          setBitcoinPrice(eventY)
          setBitcoinScale(y1.invert(eventY.y))
        }
      })
    }
  }, [coordenadas])

  return (
    <>
      <g id='axisBitcoin' />
      <path id='pathBitcoin' />
    </>
  )
}
