import { select } from 'd3'
import { color } from '../../../../styles/colors'
import * as d3 from 'd3'
import { useContextSVG } from '../../context/ContextSVG'
import { useContextAnimationCursor } from '../../context/ContextAnimationCursor'
import { useEffect, useRef } from 'react'
import { useContextGraficsData } from '../../context/ContextGraficsData'

export const trim = (val) => {
  if (val) {
    if ((val && val > 9) || val < -9) {
      return val.toFixed(2)
    } else {
      return val.toFixed(5)
    }
  } else {
    return 0
  }
}
export default function RectInformation({ valueYRef }) {
  const { state } = useContextSVG()
  const { scaleX, scaleY } = state.scaleXandY

  const { bitcoinGrafic, symbolRef } = useContextGraficsData()

  const { state: stateAnimation } = useContextAnimationCursor()
  const { coordenadas, animationStart, bitcoinScale } = stateAnimation

  const ref = useRef()

  useEffect(() => {
    console.log('holar render')
    const selectRef = select(ref.current)

    if (!selectRef.select('defs')._groups[0][0]) {
      const filterId = self.crypto.randomUUID()

      selectRef
        .append('defs')
        .append('filter')
        .attr('height', '130%')
        .attr('id', filterId)
        .append('feDropShadow')
        .attr('dx', '0')
        .attr('dy', '4')
        .attr('stdDeviation', '4')
        .attr('flood-color', 'rgba(0, 0, 0, 0.35)')

      selectRef
        .append('rect')
        .attr('width', 190)
        .attr('height', 110)
        .attr('rx', 8)
        .attr('ry', 8)
        .style('fill', color.letters)
        .style('opacity', 0.9)
        .style('filter', `url(#${filterId})`)

      selectRef
        .append('text')
        .attr('x', 65)
        .attr('y', 20)
        .attr('name', 'textDateGrafic')
        .style('font-size', 13)
        .style('fill', color.background)
        .style('opacity', 0.8)

      selectRef
        .append('circle')
        .attr('cy', 45)
        .attr('cx', 10)
        .attr('r', 3.5)
        .style('fill', '#09f')

      selectRef
        .append('text')
        .attr('x', 23)
        .attr('y', 48)
        .attr('name', 'textPriceCoin')
        .style('fontSize', 13)
        .style('fill', color.background)

      selectRef
        .append('circle')
        .attr('cy', 82)
        .attr('cx', 10)
        .attr('class', 'gBitcoinDataVisualization')
        .attr('r', 3.5)
        .style('fill', color.bitcoin)

      selectRef
        .append('text')
        .attr('x', 23)
        .attr('y', 85)
        .attr('class', 'gBitcoinDataVisualization')
        .attr('name', 'textPriceBitcoin')
        .style('fontSize', 13)
        .style('fill', color.background)
        .style('opacity', 0.9)
    }
  }, [])

  useEffect(() => {
    const selectRef = select(ref.current)

    if (bitcoinGrafic) {
      selectRef.select('rect').attr('height', 115)
      selectRef.select('.gBitcoinDataVisualization').style('opacity', 1)
    } else {
      selectRef.select('rect').attr('height', 85)
      selectRef.select('.gBitcoinDataVisualization').style('opacity', 0)
    }
  }, [bitcoinGrafic])

  let uperDown

  if (coordenadas.x > 200) {
    uperDown = 210
  } else {
    uperDown = -20
  }
  const yDown = coordenadas.y < 100 ? 95 : -10

  select(ref.current)
    .transition()
    .ease(d3.easeLinear)
    .duration(200)
    .attr(
      'transform',
      `translate(${coordenadas.x - uperDown}, ${coordenadas.y - 85 + yDown})`
    )
    .style('opacity', animationStart ? 1 : 0)

  select('[name=textPriceCoin]').text(
    `Price (${symbolRef.current.toUpperCase()}): $${trim(
      scaleY.invert(valueYRef.current)
    )}`
  )

  select('[name=textDateGrafic]').text(
    `${new Date(scaleX.invert(coordenadas.x)).toLocaleString()}`
  )
  if (bitcoinGrafic) {
    select('[name=textPriceBitcoin]').text(`Price (BTC): ${trim(bitcoinScale)}`)
  } else {
    select('[name=textPriceBitcoin]').text('')
  }
  return <g ref={ref}></g>
}
