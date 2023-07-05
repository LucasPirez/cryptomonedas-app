import { useContextGraficsData } from '../../context/ContextGraficsData'
import { select, easeLinear } from 'd3'
import { color } from '../../../../styles/colors'
import { useEffect, useRef } from 'react'

export default function LinearGradient({ name }) {
  const { bitcoinGrafic } = useContextGraficsData()
  const idGradient = useRef('a' + self.crypto.randomUUID())

  useEffect(() => {
    const linear = select('defs')
      .append('linearGradient')
      .attr('id', idGradient.current)
      .attr('y1', '0%')
      .attr('y2', '100%')
      .attr('x1', '50%')
      .attr('x2', '10%')
    linear
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', color.lightBlue)
      .attr('stop-opacity', 0.6)

    linear
      .append('stop')
      .attr('offset', '80%')
      .attr('stop-color', color.reduceBackground)
      .attr('stop-opacity', 0.2)

    select(`[name=${name}]`).style('fill', `url(#${idGradient.current})`)
  }, [])

  useEffect(() => {
    const gradient = select(`#${idGradient.current}`)

    if (bitcoinGrafic) {
      gradient
        .transition()
        .duration(500)
        .attr('y1', '-100%')
        .attr('y2', '0%')
        .attr('x1', '-50%')
        .attr('x2', '-90%')
        .ease(easeLinear)
    } else {
      gradient
        .transition()
        .duration(500)
        .attr('y1', '0%')
        .attr('y2', '100%')
        .attr('x1', '50%')
        .attr('x2', '10%')
        .ease(easeLinear)
    }
  }, [bitcoinGrafic])

  return <defs></defs>
}
