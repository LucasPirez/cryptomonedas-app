import '../styles/globals.css'
import { Provider } from 'react-redux'
import { CurrencyLightProvider } from '../context/CurrencyLightContext'
import { store } from '../redux/store'
import Layout from '../components/layouts/Layout'
import { PrimeReactProvider } from 'primereact/api'
import 'primereact/resources/themes/lara-light-teal/theme.css'
import 'primeicons/primeicons.css'

function MyApp({ Component, pageProps }) {
  return (
    <PrimeReactProvider>
      <CurrencyLightProvider>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </CurrencyLightProvider>
    </PrimeReactProvider>
  )
}

export default MyApp
