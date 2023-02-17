import Head from 'next/head'
import handler from './api/hello'
import { useState, useEffect, lazy } from 'react'

import { color } from '../styles/colors'
import { global } from '../client/client'
import GlobalHeader from '../components/Header/GlobalHeader'
import Header from '../components/Header/Header'
import { pagination } from '../client/client'
import { coinTableReducer } from '../redux/store'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { coinReduceTable } from '../redux/features/listCriptos'
import Search from '../components/inicio/Search'

const Table = lazy(() => import('../components/inicio/Table'))

export default function Home() {
  const dispatch = useDispatch()
  // const [number, setNumber] = useState(1);
  const { push } = useRouter()

  useEffect(() => {
    pagination(1, 'usd').then((data) => {
      dispatch(coinReduceTable(data))
    })
    push('criptos/1')
  }, [])

  return (
    <>
      <Head>
        <title>CrytoTracked</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header>
        <Header />
      </header>

      <main>
        <>
          <Search />
          <Table />
        </>
      </main>

      <style jsx>
        {`
          main {
            width: 100vw;
          }
          h1 {
            text-align: center;
          }
        `}
      </style>
    </>
  )
}
