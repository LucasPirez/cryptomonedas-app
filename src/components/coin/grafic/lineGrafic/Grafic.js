import { useEffect, useState } from 'react'
import * as d3 from 'd3'
import { scaleLinear, select, scaleTime } from 'd3'
import { useGrafic } from '../../../../hook/useGrafic'
import BitcoinGrafic from './BitcoinGrafic'
import RectInformation from './RectInformation'
import useConstansGrafic from '../../../../hook/useConstansGrafic'
import { color } from '../../../../styles/colors'
import useCursor from '../../../../hook/useCursor'

export default function Grafic({ data, change, dataBitcoin }, {} = {}) {
  const [datosLine, setDatosLine] = useState(null)
  const {
    getYforX,
    getyforXTouch,
    startTouch,
    coordenadas,
    animationStart,
    stopAnimation
  } = useCursor(datosLine)
  const [bitcoinPrice, setBitcoinPrice] = useState(null)
  const [bitcoinScale, setBitcoinScale] = useState(null)

  const { width, height, margin } = useConstansGrafic()

  const diference = data[data.length - 1][0] - data[0][0]

  const x1 = scaleTime()
    .domain([d3.min(data, (d) => d[0]), d3.max(data, (d) => d[0])])
    .range([margin.left, width])

  const y1 = scaleLinear()
    .domain([d3.min(data, (d) => d[1]), d3.max(data, (d) => d[1])])
    .range([height - margin.bottom, margin.top])

  const valueLine = d3
    .line()
    .x((d) => x1(d[0]))
    .y((d) => y1(d[1]))

  const graficD3 = useGrafic(
    (svg) => {
      const xAxis = (g) =>
        g

          .attr('transform', `translate(0,${height - margin.bottom})`)
          .style('color', `${color.letters}`)
          .style('opacity', '0.8')
          .call(
            d3
              .axisBottom()
              .scale(x1)

              .ticks(
                8,
                d3.timeFormat(diference > 2629800000 ? '%d/%m/ %Y' : '%d')
              )
          )
          .selectAll('text')
          .style('color', `${color.letters}`)
          .style('opacity', '0.8')

      const y1Axis = (g) =>
        g
          .attr('transform', `translate(${margin.left},0)`)
          .style('color', `${color.letters}`)
          .style('opacity', '0.8')
          .call(d3.axisLeft(y1).ticks(7).tickSize(0))
          .style('opacity', '0.8')

      const xAxisGrid = d3
        .axisLeft(y1)
        .tickSize(-width)
        .tickFormat('')
        .ticks(10)

      svg.select('#x-axis').call(xAxis)
      svg.select('#y-axis').call(y1Axis)

      svg
        .select('#grid')
        .attr('transform', `translate(${margin.left},0)`)
        .attr('class', 'noGrid')
        .style('color', `${color.letters}`)
        .style('opacity', '0.15')
        .call(xAxisGrid)

      const path = d3
        .select('#pathSelect')
        .style('stroke', `${color.blue}80`)
        .style('stroke-width', 1.8)
        .style('fill', 'url(#gradient)')

      const parseD = path.node()

      setDatosLine(parseD)
    },
    [data, width]
  )

  useEffect(() => {
    if (coordenadas.x !== 0) {
      animationStart &&
        select('#dezlizador')
          .attr('cx', coordenadas.x)
          .attr('cy', coordenadas.y)

      bitcoinPrice &&
        change &&
        select('#bitcoinDezlizador')
          .attr('cx', bitcoinPrice.x)
          .attr('cy', bitcoinPrice.y)

      select('#lineUpdate')
        .attr('x1', margin.left)
        .attr('y1', coordenadas.mouseY)
        .attr('x2', width)
        .attr('y2', coordenadas.mouseY)

      select('#lineVerticalUpdate')
        .attr('x1', coordenadas.x)
        .attr('y1', margin.top)
        .attr('x2', coordenadas.x)
        .attr('y2', height - margin.bottom)
    }
  }, [coordenadas])

  return (
    <>
      <div className='container'>
        <svg
          ref={graficD3}
          style={{
            height,
            width,
            marginRight: '0px',
            marginLeft: '0px',
            cursor: 'crosshair'
          }}
          onMouseMove={getYforX}
          onMouseLeave={stopAnimation}
          onTouchStart={(e) => startTouch(e)}
          onTouchMove={getyforXTouch}
          onTouchEnd={stopAnimation}
        >
          <g id='x-axis' />
          <g id='y-axis' />
          <g id='grid' />

          {change && dataBitcoin && (
            <BitcoinGrafic
              dataBitcoin={dataBitcoin}
              setBitcoinPrice={setBitcoinPrice}
              coordenadas={coordenadas}
              setBitcoinScale={setBitcoinScale}
            />
          )}
          <path
            id='pathSelect'
            d={`${valueLine(data)}L ${width + margin.left} ${
              height - margin.bottom
            } L ${margin.left} ${height - margin.bottom} `}
          />
          {animationStart && (
            <circle
              id='dezlizador'
              cx='187.476'
              cy='214.443'
              r='3.4'
              fill={color.lineGrafic}
              stroke={color.letters}
              scale={`${animationStart}` ? 1 : 0}
            />
          )}

          {change && (
            <circle
              className='cursor'
              id='bitcoinDezlizador'
              cx='187.476'
              cy='214.443'
              r='2.5'
              fill={color.bitcoin}
              stroke={color.blue}
              opacity={dataBitcoin ? 1 : 0}
            />
          )}

          <line
            className='cursor'
            id='lineUpdate'
            x1='0'
            y1='30'
            x2='300'
            y2='30'
            fill={color.letters}
            stroke={color.letters}
            strokeDasharray={2}
            strokeOpacity={0.5}
          />
          <rect
            x={0}
            y={coordenadas.mouseY - 14}
            fill={color.letters}
            opacity={0.8}
            width={
              y1
                .invert(coordenadas.mouseY)
                .toLocaleString('en-US', { maximumFractionDigits: 0 }).length *
              7
            }
            height={18}
          />
          <text
            x={0}
            y={coordenadas.mouseY}
            fontSize={12}
            fill={color.background}
            className='lineY'
          >
            {y1
              .invert(coordenadas.mouseY)
              .toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </text>
          <line
            className='cursor'
            id='lineVerticalUpdate'
            x1='0'
            y1='30'
            x2='300'
            y2='30'
            fill={color.letters}
            stroke={color.letters}
            strokeDasharray={2}
            strokeOpacity={0.5}
          />

          {!change && (
            <defs>
              <linearGradient
                id='gradient'
                x1='50%'
                y1='20%'
                x2='10%'
                y2='100%'
              >
                <stop
                  offset='0%'
                  stopColor={color.lightBlue}
                  stopOpacity={0.6}
                />
                <stop
                  offset='80%'
                  stopOpacity={0.2}
                  stopColor={color.reduceBackground}
                />
              </linearGradient>
            </defs>
          )}

          {coordenadas.x !== 0 && (
            <RectInformation
              coordenadas={coordenadas}
              x1={x1}
              y1={y1}
              bitcoinPrice={bitcoinPrice}
              bitcoinScale={bitcoinScale}
              animationStart={animationStart}
            />
          )}
        </svg>
      </div>

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
