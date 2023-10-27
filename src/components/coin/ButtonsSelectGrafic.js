import BarChartIcon from '../Icons/BarChartIcon'
import lineChart from '../Icons/line-chart.png'
import Expand from '../Icons/Expand'
import Minimizar from '../Icons/Minimizar'
import Image from 'next/image'
import { color } from '../../styles/colors'
import Button from '../Button'
import { selectorGrafic, useContextSVG } from './context/ContextSVG'
import { useContextGraficsData } from './context/ContextGraficsData'

export default function ButtonsSelectGrafic({
  setPortalState,
  portalState,
  name
}) {
  const { dispatch, state } = useContextSVG()
  const { selectGrafic } = state
  const { LINE, CANDLE } = selectorGrafic

  const { setBitcoinGrafic } = useContextGraficsData()

  return (
    <>
      <div className='container_buttons'>
        {name !== 'bitcoin' && (
          <button
            onClick={() => setBitcoinGrafic((prev) => !prev)}
            className={selectGrafic === CANDLE ? 'disabled' : ''}
          >
            BTC
          </button>
        )}

        <Button
          select={selectGrafic === CANDLE}
          onClick={() => dispatch({ type: 'CANDLE_GRAPH' })}
        >
          <BarChartIcon />
        </Button>
        <Button
          select={selectGrafic === LINE}
          onClick={() => dispatch({ type: 'LINE_GRAPH' })}
        >
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
        button {
          font-weight: 600;
          font-size: 1.2em;
          padding:0.4rem 0.6rem;
          color: ${color.bitcoin};
          margin-right: 0.5em;
          cursor:pointer;
          border:none;
          background:transparent
        }

        .disabled {
          pointer-events: none;
          opacity: 0.5;
        }

        button:active{
          transform:scale(0.95);
        }

        .container_buttons {
          position: absolute;
          right: 20px;
          z-index: 99;
        }

     
        .
      `}</style>
    </>
  )
}
