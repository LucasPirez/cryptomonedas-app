import { useEffect, useContext, useMemo } from 'react'
import * as d3 from 'd3'
import { color } from '../../../../styles/colors'
import Cursor from './Cursor'
import { ContextSVG } from '../../context/ContextSVG'
import { useContextGraficsData } from '../../context/ContextGraficsData'
import BitcoinFetcher from './BitcoinFetcher'

export default function Grafic({ data }) {
  const { state, dispatch } = useContext(ContextSVG)
  const { animationStart } = state
  const { width, height, margin } = state.constants

  const { bitcoinGrafic } = useContextGraficsData()

  const valueLine = useMemo(() => {
    const v = d3
      .line()
      .x((d) => state.scaleXandY.scaleX(d[0]))
      .y((d) => state.scaleXandY.scaleY(d[1]))
    return v(data)
  }, [state.scaleXandY.scaleX])

  useEffect(() => {
    const path = d3
      .select('[name=pathSelect]')
      .style('stroke', `${color.blue}80`)
      .style('stroke-width', 1.8)
      .style('fill', 'url(#gradient)')

    dispatch({ type: 'SET_PARSE_PATH', payload: path.node() })
  }, [])

  return (
    <>
      {bitcoinGrafic && <BitcoinFetcher />}
      <path
        name='pathSelect'
        d={`${valueLine}L ${width + margin.left} ${height - margin.bottom} L ${
          margin.left
        } ${height - margin.bottom} `}
      />
      <Cursor />
      {!bitcoinGrafic && (
        <defs>
          <linearGradient id='gradient' x1='50%' y1='20%' x2='10%' y2='100%'>
            <stop offset='0%' stopColor={color.lightBlue} stopOpacity={0.6} />
            <stop
              offset='80%'
              stopOpacity={0.2}
              stopColor={color.reduceBackground}
            />
          </linearGradient>
        </defs>
      )}
      <style jsx>{`
        .container {
          width: width;
          height: height;
          position: relative;
        }
        .cursor {
          transform: ${animationStart ? 'scale(1)' : 'scale(0)'};
        }
        .lineY {
          width: 30;
          height: 30;
          background: black;
        }
      `}</style>
    </>
  )
}
