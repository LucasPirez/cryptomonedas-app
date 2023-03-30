import { useEffect, useState } from 'react'
import BarChartIcon from '../Icons/BarChartIcon'
import lineChart from '../Icons/line-chart.png'
import Expand from '../Icons/Expand'
import Minimizar from '../Icons/Minimizar'
import Image from 'next/image'
import { color } from '../../styles/colors'
import Button from '../Button'

export default function ButtonsSelectGrafic({
  setPortalState,
  portalState,
  setCandleGrafic,
  candleGrafic,
  setChange,
  name,
}) {
  return (
    <>
      <div className='container_buttons'>
        {name !== 'bitcoin' && (
          <>
            <input
              className={candleGrafic ? 'disabled' : ''}
              type='checkbox'
              onClick={() => setChange((change) => !change)}
            />
            <span className={candleGrafic ? 'disabled' : ''}>BTC</span>
          </>
        )}

        <Button select={candleGrafic} onClick={() => setCandleGrafic(true)}>
          <BarChartIcon />
        </Button>
        <Button select={!candleGrafic} onClick={() => setCandleGrafic(false)}>
          <Image src={lineChart} alt='chart-line' width={20} height={20} />
        </Button>

        {!portalState ? (
          <Button onClick={() => setPortalState(true)}>
            <Expand />
          </Button>
        ) : (
          <Button onClick={() => setPortalState(false)}>
            <Minimizar />
          </Button>
        )}
      </div>
      <style jsx>{`
        input {
          cursor: pointer;
          transform: scale(1.23);
        }
        span {
          font-weight: 600;
          font-size: 1.2em;
          color: ${color.bitcoin};
          margin-right: 1em;
        }

        .disabled {
          pointer-events: none;
          opacity: 0.5;
        }

        .container_buttons {
          position: absolute;
          right: 20px;
          z-index: 99;
        }
      `}</style>
    </>
  )
}
