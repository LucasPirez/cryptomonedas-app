import React, { useState } from 'react'
import { color } from '../../../styles/colors'
import useGraficContext from '../../../context/GraficContext'
import ChevronDown from '../../Icons/ChevrowDown'

export default function HeaderGeneralGrafic() {
  const { fetch7Days, time, setTime, dateNow } = useGraficContext()
  const [vista, setVista] = useState(false)

  const fecha = (e) => {
    const dateSelect = Math.round(new Date(e.target.value).getTime() / 1000)
    const res = Math.round((dateNow - dateSelect) / 86400)

    setTime(() => res)
  }

  return (
    <>
      <div className='container'>
        <div className='sub_container'>
          <button
            className={time === 1 ? 'select' : ''}
            onClick={(e) => fetch7Days(1, e)}
          >
            1D
          </button>
          <button
            className={time === 7 ? 'select' : ''}
            onClick={(e) => fetch7Days(7, e)}
          >
            7D
          </button>
          <button
            className={time === 14 ? 'select' : ''}
            onClick={(e) => fetch7Days(14, e)}
          >
            14D
          </button>
          <button
            className={time === 30 ? 'select' : ''}
            onClick={(e) => fetch7Days(30, e)}
          >
            1M
          </button>
          <button
            className={time === 90 ? 'select' : ''}
            onClick={(e) => fetch7Days(90, e)}
          >
            3M
          </button>
          <button
            className={time === 180 ? 'select' : ''}
            onClick={(e) => fetch7Days(180, e)}
          >
            6M
          </button>
          <button
            className={time === 360 ? 'select' : ''}
            onClick={(e) => fetch7Days(360, e)}
          >
            1Y
          </button>
          <div className='container_icon' onClick={() => setVista(!vista)}>
            <ChevronDown />
          </div>
          <div className={`container_input ${vista && 'select_input'}`}>
            <input
              type='date'
              onChange={fecha}
              max={new Date().toISOString().split('T')[0]}
            />
            <button onClick={(e) => fetch7Days(time, e)}>send</button>
          </div>
        </div>
      </div>
      <style jsx>{`
        button {
          padding: 4.5px 10px;
          border-radius: 5px;
          border: none;
          transition: background 0.3s;
          font-weight: bold;
          opacity: 0.8;
          margin: 1.3px;
          color: ${color.lightBlue};
          cursor: pointer;
          background: ${color.letters};
        }
        button:hover {
          background: ${color.lightBlue};
          color: ${color.letters};
        }
        button:active {
box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
        }
        .select {
          background: ${color.lightBlue};
          color: ${color.letters};
        }
        input {
          background: ${color.letters};
          color: ${color.lightBlue};
          cursor: pointer;
        }

        .container {
          position: relative;
          display: flex;
          height: 32px;
          justify-content: center;
          align-items: center;
          margin-bottom: 15px;
          cursor: pointer;
        }
        .sub_container {
          display: inline-flex;
          background: ${color.letters};
          padding: 3px 10px;
          border-radius: 5px;
        }

        .container_icon {
          color: ${color.background};
          padding: 2px 5px 0 10px;
          transform: scale(1.2);
          display: none;
        }

        .container_input {
          display: flex;
          transition: all 2.3s;
        }
        @media screen and (max-width: 500px) {
          .container_icon {
            display: block;
          }
          .container_input {
            display: none;
          }

          .select_input {
            position: absolute;
            display: block;
            background: ${color.letters};
            padding: 1rem 0;
            top: 32px;
            right: 8px;
            border-radius: 0 0 5px 5px;
            z-index: 999;
          }
        }
        @keyframes{
          0%{
            ba
          }
        }
      `}</style>
    </>
  )
}
