import { useState, useEffect, lazy, Suspense } from 'react'
import { useRouter } from 'next/router'
import { oneCoin } from '../../client/client'
import { color } from '../../styles/colors'
import Content from '../../components/coin/Content'
import Convert from '../../components/coin/Convert'
import { GraficContextProvider } from '../../context/GraficContext'
import { EPCoinAdapter } from '../../adapters/EPCoinAdapter'

const DataGraficFetcher = lazy(() =>
  import('../../components/coin/DataGraficFetcher')
)

export default function Coin() {
  const router = useRouter()
  const [coin, setCoin] = useState({ data: null, id: null })

  useEffect(() => {
    if (coin.id) {
      oneCoin(coin.id)
        .then((data) => {
          setCoin({ ...coin, data })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [coin.id])

  useEffect(() => {
    if (router.query.id) {
      setCoin({ ...coin, id: router.query.id })
    }
  }, [router.query.id])

  return (
    <>
      <section>
        <GraficContextProvider>
          {coin.data && (
            <>
              <Content data={EPCoinAdapter(coin.data)} />
              <div>
                <>
                  <Suspense fallback={<p>Cargando Grafico</p>}>
                    <DataGraficFetcher id={coin.id} />
                  </Suspense>
                  <Convert
                    data={coin.data.market_data}
                    name={coin.data.symbol}
                  />
                </>
              </div>
            </>
          )}
        </GraficContextProvider>
      </section>

      <style jsx>
        {`
          section {
            position: relative;
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            color: ${color.letters};
            background: ${color.background};
          }

          div {
            width: 100%;
            height: auto;
            margin: 40px 0;
            display: flex;
          }
          @media (max-width: 1100px) {
            div {
              flex-direction: column-reverse;
              align-items: center;
              margin: 5px 0;
              justify-content: center;
            }
          }
        `}
      </style>
    </>
  )
}
