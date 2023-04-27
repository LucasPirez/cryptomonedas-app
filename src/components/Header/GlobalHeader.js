import React, { useState, useEffect } from 'react'
import { global } from '../../client/client'
import { color } from '../../styles/colors'
import RenderGlobarHeader from './RenderGlobalHeader'

export default function GlobalHeader() {
  const [dataGlobal, setDataGlobal] = useState({
    data: null,
    marketCap: { total: 0, Dominance: null },
  })

  useEffect(() => {
    global().then((dato) => {
      const { total_market_cap, market_cap_percentage } = dato.data
      setDataGlobal({ ...dataGlobal, data: dato })

      const suma = Object.values(total_market_cap).reduce(
        (acc, cva) => acc + cva,
        0
      )
      const arrP = Object.entries(market_cap_percentage)

      setDataGlobal({
        ...dataGlobal,
        marketCap: {
          total: suma,
          Dominance: `${arrP[0][0].toUpperCase()} ${arrP[0][1].toLocaleString(
            'en-US'
          )}%, ${arrP[1][0].toUpperCase()} ${arrP[1][1].toLocaleString()}%`,
        },
      })
    })
  }, [])

  return (
    <>
      <div className='container'>
        <div className='sub_container'>
          {dataGlobal && (
            <RenderGlobarHeader
              dataGlobal={dataGlobal.data}
              marketCap={dataGlobal.marketCap}
            />
          )}
        </div>
      </div>
      <style jsx>
        {`
          .container {
            height: auto;
            width: 100%;
            background: ${color.reduceBackground}50;
          }

          .sub_container {
            width: auto;
            max-width: 800px;
            min-height: 30px;
            height: auto;
            margin: auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            background: ${color.letters};
            border-bottom: 1px solid ${color.letters}70;
          }
        `}
      </style>
    </>
  )
}
