import { useEffect, useContext, useMemo, useRef } from 'react'
import { select, line } from 'd3'
import { color } from '../../../../styles/colors'
import Cursor from './Cursor'
import { ContextSVG } from '../../context/ContextSVG'
import BitcoinFetcher from './BitcoinFetcher'
import LinearGradient from './LinearGradient'

export default function Grafic({ data }) {
  const { state, dispatch } = useContext(ContextSVG)
  const { width, height, margin } = state.constants
  const refId = useRef()

  const valueLine = useMemo(() => {
    const v = line()
      .x((d) => state.scaleXandY.scaleX(d[0]))
      .y((d) => state.scaleXandY.scaleY(d[1]))
    return v(data)
  }, [state.scaleXandY.scaleX])

  useEffect(() => {
    refId.current = self.crypto.randomUUID()

    const path = select('[name=pathSelect]')
      .style('stroke', `${color.blue}80`)
      .style('stroke-width', 2)
      .style('fill', 'url(#gradient)')

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
      <LinearGradient />
      <Cursor />
    </>
  )
}
