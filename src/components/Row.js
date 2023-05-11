import React, { Suspense } from 'react'
import Image from 'next/image'
import AddDeleteFavorite from './favorites/AddDeleteFavorite'
import { color } from '../styles/colors'
import { useSelector } from 'react-redux'

const GraficRow = React.lazy(() => import('./coin/grafic/GraficRow'))

export default function CoinsRow({ data }) {
  // const [dataGrafic, setDataGrafic] = useState(null);
  const { currencySelect } = useSelector((state) => state.criptoList)

  const {
    marketCapRank,
    image,
    name,
    currentPrice,
    priceChangePercentage24h,
    priceChangePercentage7dInCurrency,
    sparklineIn7d,
    totalVolume,
    marketCap,
    symbol,
    id
  } = data

  return (
    <>
      <td>
        <div className='star'>
          <span>
            <AddDeleteFavorite
              data={id}
              yes={color.bitcoin}
              no={color.background}
            />
          </span>
          <span> {marketCapRank}</span>
        </div>
      </td>
      <td className='sticy__td'>
        <div className='img_name'>
          <div>
            <span>
              <Image src={image} alt='icon' width={15} height={15} />
            </span>

            <span>{name}</span>
          </div>

          <span className='symbol'>{symbol.toUpperCase()}</span>
        </div>
      </td>

      <td className='numbers'>
        <span>{currencySelect.symbol}</span>
        <span>{currentPrice.toLocaleString('en-US')}</span>
      </td>

      <td
        className={
          priceChangePercentage24h > 0
            ? 'price numbers '
            : 'price_danger numbers '
        }
      >
        {priceChangePercentage24h && priceChangePercentage24h.toFixed(2)}%
      </td>
      <td
        className={
          priceChangePercentage7dInCurrency > 0
            ? 'price numbers '
            : 'price_danger numbers '
        }
      >
        {priceChangePercentage7dInCurrency &&
          priceChangePercentage7dInCurrency.toFixed(2)}
        %
      </td>

      <td className='numbers'>${totalVolume.toLocaleString('en-US')}</td>
      <td className='numbers'>${marketCap.toLocaleString('en-US')}</td>
      <td className='tdGrafic'>
        <Suspense fallback={<p>cargando</p>}>
          <GraficRow
            dataGrafic={sparklineIn7d.price}
            graficColor={priceChangePercentage7dInCurrency}
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
