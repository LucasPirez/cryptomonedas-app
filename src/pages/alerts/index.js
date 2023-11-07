import Head from 'next/head'
import SearchCrypto from '../../components/alerts/createAlert/SearchCrypto'
import AlertsCreated from '../../components/alerts/createAlert/AlertsCreated'
import AlertContextProvider from '../../components/alerts/contextAlerts'
import ContextToastProvider from '../../components/alerts/contextToast'

export default function Alerts() {
  return (
    <>
      <Head>
        <title>Favorites</title>
        <meta
          name='description'
          content='Effortlessly manage your favorite cryptocurrencies, monitor their market movements, and receive personalized insights to make informed investment decisions.'
        />
      </Head>
      <ContextToastProvider>
        <AlertContextProvider>
          <section className='container'>
            <SearchCrypto />
            <AlertsCreated />
          </section>
        </AlertContextProvider>
      </ContextToastProvider>
      <style jsx>{`
        .container {
          display: grid;
          width: 100vw;
          justify-content: center;
          padding: 10px;
        }
      `}</style>
    </>
  )
}
