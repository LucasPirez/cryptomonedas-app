import Head from 'next/head'
import AlertsCreated from '../../components/alerts/createAlert/AlertsCreated'
import ContextToastProvider from '../../components/alerts/contexts/contextToast'
import FormAlert from '../../components/alerts/createAlert/FormAlert'
import FormContextProvider from '../../components/alerts/contexts/contextForm'
import OnlyAuthorized from '../../components/alerts/OnlyAuthorized'

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
        <FormContextProvider>
          <section className='container'>
            <OnlyAuthorized>
              <FormAlert />
              <AlertsCreated />
            </OnlyAuthorized>
          </section>
        </FormContextProvider>
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
