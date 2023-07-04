import Image from 'next/image'
import SubContent from './SubContent'
import SubContentMarket from './SubContentMarket'
import { color } from '../../styles/colors'
import AddDeleteFavorite from '../favorites/AddDeleteFavorite'
import { useSelector } from 'react-redux'

export default function Content({ data }) {
  const { market_cap_rank, image, name, symbol, market_data, links, id } = data
  const { currencySelect } = useSelector((state) => state.criptoList)

  return (
    <>
      <div className='container'>
        <div className='sub_container'>
          <div className='container_price_name'>
            <div>
              <p className='rank'>
                <span>Rank #{market_cap_rank}</span>
              </p>

              <div className='container_name'>
                <Image
                  src={image.small}
                  alt='coin image'
                  width={70}
                  height={70}
                />
                <h2>{name}</h2>
                <div className='container_symbol'>
                  <span> {symbol.toUpperCase()}</span>

                  <AddDeleteFavorite
                    data={id}
                    yes='#09a'
                    no='white'
                    scale={1.3}
                  />
                </div>
              </div>
            </div>

            <p className='price'>
              <span>{currencySelect.symbol}</span>{' '}
              {market_data.current_price[
                currencySelect.currency
              ].toLocaleString('en-US')}
              <strong
                title='price change percentage 24h'
                className={
                  market_data.price_change_percentage_24h > 0 ? 'green' : 'red'
                }
              >
                %
                {market_data.price_change_percentage_24h.toLocaleString(
                  'en-US'
                ) || 0}
              </strong>
            </p>
          </div>

          <div className='container_input'>
            <div>
              <span>
                Low:
                <strong>
                  {market_data.low_24h[currencySelect.currency].toLocaleString(
                    'en-US'
                  )}
                </strong>
              </span>
              <span>
                High:
                <strong>
                  {market_data.high_24h[currencySelect.currency].toLocaleString(
                    'en-US'
                  )}
                </strong>{' '}
              </span>
            </div>
            <input
              type='range'
              min={market_data.low_24h[currencySelect.currency]}
              max={market_data.high_24h[currencySelect.currency]}
              value={market_data.current_price[currencySelect.currency]}
              step='0.0001'
              className='input_range'
              readOnly={true}
            />
          </div>
        </div>
        <div className='content_market'>
          <SubContent data={links} />
          <SubContentMarket data={market_data} />
        </div>
      </div>
      <style jsx>
        {`
          h2 {
            display: inline-block;
          }

          span {
            opacity: 0.85;
          }

          .container {
            margin: 3rem auto;
            position: relative;
            width: 90%;
            height: auto;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
          }
          .sub_container {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: auto;
            min-height: 300px;
            width: 50%;
            min-width: 400px;
            margin-bottom: 20px;
          }

          .container_price_name {
            display: flex;
            height: 200px;
            position: relative;
            justify-content: space-around;
            align-items: center;
          }

          .rank span {
            position: absolute;
            top: 0;
            left: 0;
            padding: 0.3em 0.5rem;
            background: ${color.letters};
            color: ${color.background};
            border-radius: 4px;
          }

          .container_name {
            display: flex;
            position: relative;
            align-items: center;
          }

          .price {
            font-size: 1.5em;
            font-weight: 600;
          }
          .green {
            color: ${color.candleGreen};
            margin-left: 1em;
            font-size: 0.7em;
          }
          .red {
            color: ${color.candleRed};
            margin-left: 1em;
            font-size: 0.7em;
          }
          .container_input {
            position: relative;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .container_input > div {
            width: 90%;
            margin: auto;
            display: flex;
            justify-content: space-between;
          }

          .input_range {
            width: 90%;
            margin: auto;
            background: navy;
          }
          .content_market {
            width: 50%;
            min-width: 400px;
            text-align: center;
          }

          @media screen and (max-width: 1100px) {
            .container {
              width: 98vw;
              align-items: flex-start;
            }
            .sub_container {
              width: 95%;
            }

            .content_market {
              width: 95%;
            }
          }

          @media screen and (max-width: 600px) {
            .container_name {
              flex-direction: column;
            }

            .container_price_name {
              flex-direction: column;
              align-items: center;
              height: auto;
            }
            .price {
              position: relative;
              right: 0;
            }
          }
        `}
      </style>
    </>
  )
}
