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
            display: grid;
            width: 100vw;
            justify-content: center;

            padding: 10px;
          }
        `}
      </style>
    </>
  )
}
