import { color } from '../../styles/colors'

export default function RenderGlobarHeader({ dataGlobal, marketCap }) {
  return (
    <>
      <div style={{ display: 'inline-flex' }}>
        <p>Cryptos:</p>
        {dataGlobal && <span>{dataGlobal.data.active_cryptocurrencies}</span>}
      </div>
      <div style={{ display: 'inline-flex' }}>
        <p>Exchanges:</p>
        {dataGlobal && <span>{dataGlobal.data.markets}</span>}
      </div>
      <div style={{ display: 'inline-flex' }}>
        <p>Dominance:</p>
        <span>{marketCap.Dominance && marketCap.Dominance}</span>
      </div>
      <div style={{ display: 'inline-flex' }}>
        <p>Market Cap:</p>
        <span>
          {marketCap.total !== 0 && marketCap['total'].toLocaleString('en')}
        </span>

        <span>
          &nbsp;
          {dataGlobal &&
            dataGlobal.data.market_cap_change_percentage_24h_usd.toFixed(2)}
          %
        </span>
      </div>
      <style jsx>{`
        p {
          font-size: 0.8em;
          margin: 0 1.5px 0 22px;
          opacity: 0.7;
          font-weight: 500;
          color: ${color.background};
        }
        span {
          font-size: 0.8em;
          color: ${color.lightBlue};
        }
        @media (max-width: 500px) {
          p {
            margin: 0 1.5px 0 8px;
          }
        }
      `}</style>
    </>
  )
}
