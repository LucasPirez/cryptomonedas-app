import { select } from 'd3'
import { color } from '../../../../styles/colors'
import * as d3 from 'd3'
import { useContextSVG } from '../../context/ContextSVG'
import { useContextAnimationCursor } from '../../context/ContextAnimationCursor'

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
export default function RectInformation({
  bitcoinPrice,
  bitcoinScale,
  valueYRef
}) {
  const { state } = useContextSVG()
  const { scaleX, scaleY } = state.scaleXandY

  const { state: stateAnimation } = useContextAnimationCursor()
  const { coordenadas, animationStart } = stateAnimation

  let uperDown

  if (coordenadas.x > 200) {
    uperDown = 150
  } else {
    uperDown = -10
  }

  const yDown = coordenadas.y < 100 ? 95 : -10

  select('#rectInformation')
    .attr('x', coordenadas.x - uperDown)
    .attr('y', coordenadas.y - 85 + yDown)
    .transition()
    .ease(d3.easeLinear)
    .duration(300)
    .style('opacity', animationStart ? 1 : 0)

  select('#textPrice')
    .attr('x', coordenadas.x - uperDown + 12)
    .attr('y', coordenadas.y - 42 + yDown)
    .style('opacity', animationStart ? 1 : 0)

  select('#textDate')
    .attr('x', coordenadas.x - uperDown + 12)
    .attr('y', coordenadas.y - 65 + yDown)
    .style('opacity', animationStart ? 1 : 0)

  if (bitcoinScale) {
    select('#textBitcoin')
      .attr('x', coordenadas.x - uperDown + 12)
      .attr('y', coordenadas.y - 22 + yDown)
      .style('opacity', animationStart ? 1 : 0)
  }

  return (
    <>
      <filter id='dropshadow' height='130%'></filter>

      <rect
        id='rectInformation'
        x='0'
        y='0'
        width={135}
        height={85}
        fill={color.letters}
        opacity={0.9}
        stroke={color.letters}
        strokeWidth={1}
      />
      <text
        id='textPrice'
        x={50}
        y={100}
        fontSize={12}
        fill={color.reduceBackground}
        fontWeight={'600'}
      >
        price: $ {trim(scaleY.invert(valueYRef.current))}
      </text>

      <text
        id='textBitcoin'
        x={50}
        y={100}
        fontSize={12}
        fill={color.bitcoin}
        fontWeight={'600'}
        opacity={bitcoinScale ? 1 : 0}
      >
        B {trim(bitcoinScale)}
      </text>

      <text
        id='textDate'
        x={50}
        y={100}
        fontSize={12}
        fontWeight={'600'}
        fill={color.reduceBackground}
      >
        {new Date(scaleX.invert(coordenadas.x)).toLocaleString()}
      </text>

      <style jsx>{`
        rect {
          filter: drop-shadow(3px 3px 2px rgb(25 54 25 / 0.4));
        }
      `}</style>
    </>
  )
}
