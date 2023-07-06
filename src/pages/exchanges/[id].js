import Exchanges from '../../components/exchanges'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function ExchangePage() {
  const { query } = useRouter()

  return (
    <>
      <Head>
        <title>Exchanges</title>
        <meta
          name='description'
          content='Discover the leading cryptocurrency exchanges, evaluate their features and security measures, and find the ideal platform to facilitate your digital asset transactions.'
        />
      </Head>
      <section>{query.id && <Exchanges query={query.id} />}</section>

      <style jsx>{''}</style>
    </>
  )
}
