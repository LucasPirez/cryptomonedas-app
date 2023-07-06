import { useEffect, useContext, useMemo } from 'react'
import { select, line } from 'd3'
import { color } from '../../../../styles/colors'
import Cursor from './Cursor'
import { ContextSVG } from '../../context/ContextSVG'
import BitcoinFetcher from './BitcoinFetcher'
import LinearGradient from './LinearGradient'
import { useContextGraficsData } from '../../context/ContextGraficsData'

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
      .attr('stroke', `${color.blue}80`)
      .attr('stroke-width', 2)
      .attr('fill', 'none')

    dispatch({ type: 'SET_PARSE_PATH', payload: path.node() })
  }, [])

  return (
    <>
      <BitcoinFetcher />
      <path
        name='pathSelect'
        d={`${valueLine}L ${width + margin.left} ${height - margin.bottom} L ${
          margin.left
        } ${height - margin.bottom} `}
      />
      <LinearGradient
        name={'pathSelect'}
        colorProp={color.lightBlue}
        visibility={bitcoinGrafic}
      />
      <Cursor />
    </>
  )
}
