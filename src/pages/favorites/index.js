import React, { useRef, useEffect } from 'react'
import ListFavorites from '../../components/favorites/ListFavorites'

export default function Favorites() {
  return (
    <>
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
