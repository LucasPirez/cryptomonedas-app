import { useState, useEffect } from 'react'
import useConstansGrafic from '../../hook/useConstansGrafic'
import { color } from '../../styles/colors'

export default function Convert({ data, name }) {
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

  return (
    <>
      <div className='container'>
        <h3>Convert ETH to {coinSelected.toUpperCase()} </h3>
        <div className='sub_container'>
          <div>
            <p>{name.toUpperCase()}:</p>
          </div>
          <input
            type='number'
            name='input-mount'
            onChange={(e) => setMount(e.target.value)}
          />
        </div>
        <div className='sub_container'>
          <div>
            <select
              name='select'
              onChange={(e) => setCoinSelected(e.target.value)}
              value={coinSelected || 'usd'}
            >
              {Object.keys(data.ath).map((u) => (
                <option value={u} key={u + Math.random()}>
                  {u}
                </option>
              ))}
            </select>
          </div>

          <input
            type='number'
            value={conversion >= 0 && conversion.toFixed(2)}
            readOnly={true}
          />
        </div>
        <h4>1 ETH =${data.current_price.usd}</h4>
      </div>
      <style jsx>{`
        select {
          padding: 0.5em 0.2em;
        }

        h3 {
          color: ${color.letters};
          border-bottom: 1px dashed ${color.letters};
          padding: 0 0 10px 0;
          font-size: 1.3em;
        }

        input {
          padding: 0.7em 1.2em;
          font-size: 1em;
          border: none;
        }

        input:focus {
          outline: 2px solid ${color.blue};
          transform: scale(1.15);
        }

        option {
          font-size: 1.3em;
        }

        h4 {
          text-align: left;
          margin-left: 7%;
        }

        .container {
          width: ${width * 0.45}px;
          max-height: 400px;
          margin: auto;
          background: ${color.reduceBackground}80;
          padding: 15px;
          text-align: center;
          border-radius: 10px;
          box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        }

        .sub_container > div {
          margin: 30px auto 10px auto;
          justify-content: center;
          width: 4.5em;
          justify-content: center;
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
