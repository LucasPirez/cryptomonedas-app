import Head from 'next/head'
import { useRouter } from 'next/router'
import Search from '../../components/inicio/Search'
import Table from '../../components/inicio/Table'

export default function PagesTable() {
  const { query } = useRouter()

  return (
    <>
      <Head>
        <title>CrytoTracked</title>
        <meta
          name='description'
          content='Explore the cryptocurrency market, get real-time information, follow trends, and track your favorite cryptocurrencies.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <section>
        {typeof query.id === 'string' && (
          <>
            <Search />
            <Table query={query.id} />
          </>
        )}
      </section>
    </>
  )
}
