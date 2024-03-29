import ListFavorites from '../../components/favorites/ListFavorites'
import Head from 'next/head'

export default function Favorites() {
  return (
    <>
      <Head>
        <title>Favorites</title>
        <meta
          name='description'
          content='Effortlessly manage your favorite cryptocurrencies, monitor their market movements, and receive personalized insights to make informed investment decisions.'
        />
      </Head>
      <section className='container'>
        <h1>Favorites</h1>
        <ListFavorites />
      </section>
      <style jsx>
        {`
          .container {
            text-align: center;
            width: 100vw;
            padding: 10px;
          }
        `}
      </style>
    </>
  )
}
