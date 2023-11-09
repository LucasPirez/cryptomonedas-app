import { useState, useEffect } from 'react'
import useConstansGrafic from '../../hook/useConstansGrafic'
import { color } from '../../styles/colors'
import { useContextGraficsData } from './context/ContextGraficsData'
import { Dropdown } from 'primereact/dropdown'

export default function Convert({ data, name }) {
  const { symbolRef } = useContextGraficsData()
  const [coinSelected, setCoinSelected] = useState('usd')
  const [mount, setMount] = useState(null)
  const [conversion, setConversion] = useState(0)
  const arr = Object.entries(data.current_price)
  const width = useConstansGrafic()

  useEffect(() => {
    for (const [val, price] of arr) {
      if (val === coinSelected) {
        return setConversion(price * +mount)
      }
    }
  }, [mount, coinSelected, arr])

  const arrAth = Object.keys(data.ath)

  return (
    <>
      <div className='container'>
        <h3>
          Convert <span>{symbolRef.current.toUpperCase()}</span> to
          <span> {coinSelected.toUpperCase()}</span>
        </h3>
        <div className='sub_container'>
          <div>
            <p className='coinName'>{name.toUpperCase()}:</p>
          </div>
          <input
            type='number'
            name='input-mount'
            onChange={(e) => setMount(e.target.value)}
          />
        </div>
        <div className='sub_container'>
          <div>
            <Dropdown
              name='select'
              onChange={(e) => setCoinSelected(e.value)}
              value={coinSelected || 'usd'}
              options={arrAth}
            ></Dropdown>
          </div>

          <input
            type='number'
            value={conversion >= 0 && conversion.toFixed(2)}
            readOnly={true}
          />
        </div>
        <p className='result'>
          1 <strong>{symbolRef.current.toUpperCase()}</strong> = $
          {data.current_price.usd}
        </p>
      </div>
      <style jsx>{`
        select {
          padding: 0.5em 0.2em;
        }

        h3 {
          color: var(--text-color);
          border-bottom: 1px dashed ${color.letters};
          padding: 0 0 10px 0;
          font-size: 1.3em;
          opacity: 0.9;
        }

        h3 span,
        .coinName {
          color: var(--bitcoin-dark);
          font-weight: bold;
        }

        h3:lastchild {
          color: red;
        }

        input {
          padding: 0.7em 1.2em;
          max-width: 400px;

          font-size: 1em;
          border: none;
          outline: 1px solid #00000040;
          box-shadow: rgba(0, 0, 0, 0.36) 0px 0px 2px inset;
          border-radius: 5px;
        }

        input:focus {
          box-shadow: var(--primary-color) 0 0 4px 1px;
        }

        option {
          font-size: 1.3em;
        }

        .container {
          width: ${width * 0.45}px;
          max-height: 400px;
          margin: auto;
          background: ${color.background};
          padding: 15px;
          text-align: center;
          border-radius: 10px;
          box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        }

        .sub_container > div {
          margin: 30px auto 10px auto;
          justify-content: center;
          gap: 30px;
          width: 4.5em;
          justify-content: center;
        }

        .result {
          font-size: 1.3rem;
        }
        .result strong {
          color: var(--bitcoin-dark);
        }

        @media (max-width: 1100px) {
          input {
            width: 70%;
            margin: 0 0 0 2em;
          }
          .container {
            width: 95%;
            margin: 30px;
          }
          .sub_container > div {
            display: inline-block;
            margin: 10px auto 5px auto;
            justify-content: center;
            width: 4.5em;
            justify-content: center;
          }
        }
      `}</style>
    </>
  )
}
