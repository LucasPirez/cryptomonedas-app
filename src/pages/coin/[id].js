import { useState, useEffect, lazy, Suspense } from 'react'
import { useRouter } from 'next/router'
import { oneCoin } from '../../client/client'
import { color } from '../../styles/colors'
import Content from '../../components/coin/Content'
import Convert from '../../components/coin/Convert'
import { EPCoinAdapter } from '../../adapters/EPCoinAdapter'
import ContextGraficsDataProvider from '../../components/coin/context/ContextGraficsData'
import Head from 'next/head'

const ContainerGrafic = lazy(() =>
  import('../../components/coin/ContainerGrafic')
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
      <Head>
        <title>{coin.id}</title>
        <link rel='icon' href={coin.data?.image?.small} />
        <meta
          name='description'
          content={`Explore in-depth details about ${coin?.id}, including its current price, market performance, historical data, and relevant news.`}
        />
      </Head>
      <section>
        {coin.data && (
          <ContextGraficsDataProvider id={coin.id} symbol={coin.data.symbol}>
            <Content data={EPCoinAdapter(coin.data)} />
            <div>
              <Suspense fallback={<p>Cargando Grafico</p>}>
                <ContainerGrafic id={coin.id} />
              </Suspense>
              <Convert data={coin.data.market_data} name={coin.data.symbol} />
            </div>
          </ContextGraficsDataProvider>
        )}
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
