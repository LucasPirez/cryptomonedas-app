import React, { useContext, useEffect, useState } from 'react'
import { select } from 'd3'
import RectLine from '../RectLine'
import { color } from '../../../../styles/colors'
import HeaderGrafic from './HeaderGrafic'
import { ContextSVG } from '../../context/ContextSVG'

export default function Grafic({ dataObj, dataScale }) {
  const [stateRect, setStateRect] = useState({
    x: null,
    y: null,
    open: null,
    close: null,
    hight: null,
    low: null
  })
  const [theme, setTheme] = useState(null)
  const [marginCandles, setMarginCandles] = useState(null)
  const { state } = useContext(ContextSVG)
  const { coordenadas } = state
  const { animationStart } = state
  const { scaleY } = state.scaleXandY
  const { width, height, margin } = state.constants

  useEffect(() => {
    const calc = Math.round(
      (width - margin.left - margin.right) / dataObj.length
    )
    const marginCan = calc > 47 ? 47 : calc
    setMarginCandles(marginCan)
  }, [width])

  useEffect(() => {
    if (coordenadas.y > margin.top && coordenadas.y < height - margin.bottom) {
      select('[name=lineUpdate]')
        .attr('x1', margin.left)
        .attr('y1', coordenadas.y)
        .attr('x2', width)
        .attr('y2', coordenadas.y)

      select('[name=rectPriceY]')
        .attr('x', 10)
        .attr('y', coordenadas.y - 9)

      select('[name=textPriceY]')
        .attr('x', 12)
        .attr('y', coordenadas.y + 3)
    }

    dataScale.forEach((u, i) => {
      if (
        i < dataScale.length - 1 &&
        coordenadas.x > u.posX &&
        coordenadas.x < dataScale[i + 1].posX
      ) {
        setStateRect({
          x: u.posX + 2.5,
          y: u.promedio,
          open: u.open,
          close: u.close,
          hight: u.maximo,
          low: u.minimo
        })
        const t = u.open - u.close < 0 ? color.candleRed : color.candleGreen
        setTheme(t)
      }
    })
  }, [coordenadas])

  return (
    <>
      {marginCandles && (
        <RectLine
          dataScale={dataScale}
          marginCandles={marginCandles}
          color={color}
          width={width}
        />
      )}

      <line
        x1={stateRect.x + marginCandles / 2 - 3}
        y1={margin.top}
        x2={stateRect.x + marginCandles / 2 - 3}
        y2={height - margin.bottom}
        stroke={color.letters}
        strokeOpacity={0.46}
        transform={animationStart ? 'scale(1)' : 'scale(0)'}
      />
      <line
        name='lineUpdate'
        x1='100'
        y1='0'
        x2='0'
        y2='47'
        fill={color.letters}
        stroke={color.letters}
        strokeDasharray={4}
        strokeOpacity={0.5}
        transform={animationStart ? 'scale(1)' : 'scale(0)'}
      />
      <rect
        name='rectPriceY'
        width={30}
        height={18}
        fill={color.letters}
        opacity={animationStart ? '0.8' : '0'}
      />
      <text name='textPriceY' fontSize={11} fill={color.background}>
        {scaleY.invert(coordenadas.y).toFixed(0)}
      </text>
      <HeaderGrafic stateRect={stateRect} y1={scaleY} theme={theme} />
    </>
  )
}
