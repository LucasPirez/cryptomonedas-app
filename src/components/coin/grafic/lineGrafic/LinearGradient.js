import { useContextGraficsData } from '../../context/ContextGraficsData'
import { select, easeLinear } from 'd3'
import { color } from '../../../../styles/colors'
import { useEffect } from 'react'

export default function LinearGradient() {
  const { bitcoinGrafic } = useContextGraficsData()

  useEffect(() => {
    select('defs')
      .append('linearGradient')
      .attr('id', 'gradient')
      .attr('x1', '50%')
      .attr('x2', '10%')
    const gradient = select('#gradient')

    gradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', color.lightBlue)
      .attr('stop-opacity', 0.6)

    gradient
      .append('stop')
      .attr('offset', '80%')
      .attr('stop-color', color.reduceBackground)
      .attr('stop-opacity', 0.2)

    if (bitcoinGrafic) {
      gradient
        .transition()
        .duration(1000)
        .attr('y1', '0%')
        .attr('y2', '0%')
        .attr('x1', '0%')
        .attr('x2', '0%')
        .ease(easeLinear)
    } else {
      gradient
        .transition()
        .duration(500)
        .attr('y1', '20%')
        .attr('y2', '100%')
        .attr('x1', '50%')
        .attr('x2', '10%')
        .ease(easeLinear)
    }
  }, [bitcoinGrafic])

  return <defs></defs>
}
