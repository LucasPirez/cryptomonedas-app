import { useEffect, useContext, useMemo } from 'react'
import { select, line } from 'd3'
import { color } from '../../../../styles/colors'
import Cursor from './Cursor'
import { ContextSVG } from '../../context/ContextSVG'
import { useContextGraficsData } from '../../context/ContextGraficsData'
import BitcoinFetcher from './BitcoinFetcher'
import LinearGradient from './LinearGradient'

export default function Grafic({ data }) {
  const { state, dispatch } = useContext(ContextSVG)
  const { width, height, margin } = state.constants

  const { bitcoinGrafic } = useContextGraficsData()

  const valueLine = useMemo(() => {
    const v = line()
      .x((d) => state.scaleXandY.scaleX(d[0]))
      .y((d) => state.scaleXandY.scaleY(d[1]))
    return v(data)
  }, [state.scaleXandY.scaleX])

  useEffect(() => {
    const path = select('[name=pathSelect]')
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
      <LinearGradient />
      <Cursor />
    </>
  )
}
