import { useState, useEffect } from 'react'

import '../styles/globals.css'
import GlobalHeader from '../components/Header/GlobalHeader'
import Header from '../components/Header/Header'
import { Provider } from 'react-redux'
import { CurrencyLightProvider } from '../context/CurrencyLightContext'
import { store } from '../redux/store'

function MyApp({ Component, pageProps }) {
  return (
    <CurrencyLightProvider>
      <Provider store={store}>
        <GlobalHeader />
        <Header />
        <Component {...pageProps} />
      </Provider>
    </CurrencyLightProvider>
  )
}

export default MyApp
