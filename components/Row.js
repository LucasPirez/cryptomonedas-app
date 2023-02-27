import React, { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { grafic7Days } from '../client/client'
import AddDeleteFavorite from './favorites/AddDeleteFavorite'
import { color } from '../styles/colors'
import IconImage from './utilities/IconImage'
import { useSelector } from 'react-redux'

const GraficRow = React.lazy(() => import('./coin/grafic/GraficRow'))

export default function CoinsRow({ data }) {
  // const [dataGrafic, setDataGrafic] = useState(null);
  const { currencySelect } = useSelector((state) => state.criptoList)

  return (
    <>
      <td>
        <div className='star'>
          <span>
            <AddDeleteFavorite
              data={data.id}
              yes={color.bitcoin}
              no={color.background}
            />
          </span>
          <span> {data.marketCapRank}</span>
        </div>
      </td>
      <td className='sticy__td'>
        <div className='img_name'>
          <div>
            <span>
              <Image src={data.image} alt='icon' width={15} height={15} />
            </span>

            <span>{data.name}</span>
          </div>

          <span className='symbol'>{data.symbol.toUpperCase()}</span>
        </div>
      </td>

      <td className='numbers'>
        <span>{currencySelect.symbol}</span>
        <span>{data.currentPrice.toLocaleString('en-US')}</span>
      </td>

      <td
        className={
          data.priceChangePercentage24h > 0
            ? 'price numbers '
            : 'price_danger numbers '
        }
      >
        {data.priceChangePercentage24h &&
          data.priceChangePercentage24h.toFixed(2)}
        %
      </td>
      <td
        className={
          data.priceChangePercentage7dInCurrency > 0
            ? 'price numbers '
            : 'price_danger numbers '
        }
      >
        {data.priceChangePercentage7dInCurrency &&
          data.priceChangePercentage7dInCurrency.toFixed(2)}
        %
      </td>

      <td className='numbers'>${data.totalVolume.toLocaleString('en-US')}</td>
      <td className='numbers'>${data.marketCap.toLocaleString('en-US')}</td>
      <td className='tdGrafic'>
        <Suspense fallback={<p>cargando</p>}>
          <GraficRow
            dataGrafic={data.sparklineIn7d.price}
            graficColor={data.priceChangePercentage7dInCurrency}
          />
        </Suspense>
      </td>

      <style jsx>
        {`
          td {
            text-align: center;
            width: 180px;
            transition: all 0.3s;
          }
          span {
            margin: 0 10px 0 0;
          }

          td:hover {
            color: ${color.blue};
          }

          .star {
            max-width: 80px;
          }

          .img_name {
            display: flex;
            justify-content: space-between;
            font-weight: 600;
          }
          .image {
            width: 70px;
            margin: 0 10px;
          }

          .price {
            color: green;
          }

          .price_danger {
            color: red;
          }
          .symbol {
            color: ${color.lineGrafic};
          }
          .numbers {
            padding: 0 20px;
          }

          td .tdGrafic {
            position: relative;
            width: 200;
            min-width: 200px;
          }

          @media screen and (max-width: 900px) {
            .img_name {
              width: 100px;

              flex-wrap: wrap;
              justify-content: center;
              background: ${color.background};
              z-index: 9;
            }
            .sticy__td {
              position: sticky;
              left: 0px;
              background: ${color.background};
            }
          }
        `}
      </style>
    </>
  )
}
// @media screen and (max-width: 900px) {
//           .img_name {
//             position: sticky;
//             left: 0px;

//             flex-direction: column;
//             justify-content: space-around;
//             width: 100px;
//             background: ${color.background};
//             z-index: 9;
//           }
//         }
