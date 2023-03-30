import { useState, useEffect } from 'react'
import '../styles/globals.css'
import { Provider } from 'react-redux'
import { CurrencyLightProvider } from '../context/CurrencyLightContext'
import { store } from '../redux/store'
import Layout from '../components/layouts/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <CurrencyLightProvider>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </CurrencyLightProvider>
  )
}

export default MyApp
