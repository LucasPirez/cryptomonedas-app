import React, { useState, useEffect } from 'react'
import { EPCoinAdapter } from '../../adapters/EPCoinAdapter'
import { EPCoinsMarketsAdapter } from '../../adapters/EPCoinsMarketsAdapter'
import { oneCoin } from '../../client/client'
import { color } from '../../styles/colors'
import TableComponent from '../utilities/TableComponent'
import RowFavorites from './RowFavorites'

export default function ListFavorites() {
  const [favoritesFetch, setFavoritesFetch] = useState(null)
  const favorites = JSON.parse(localStorage.getItem('favorites_coin')) || []

  if (!favorites.length) {
    return <h3>you don&apos;t have favorites yet </h3>
  }

  useEffect(() => {
    const promiseAll = favorites.map(async (u) => {
      const response = await oneCoin(u)
      return response
    })

    Promise.all(promiseAll)
      .then((data) => {
        setFavoritesFetch(data)
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }, [])

  return (
    <>
      <div className='container'>
        <>
          <table>
            <thead>
              <tr className='local_tr'>
                <TableComponent />
              </tr>
            </thead>
            <tbody>
              {favoritesFetch &&
                favoritesFetch.map((u, i) => (
                  <RowFavorites data={EPCoinsMarketsAdapter(u)} key={u.id} />
                ))}
            </tbody>
          </table>
        </>
      </div>
      <style jsx>{`
        table {
          position: relative;
          background: 'white';
          border-collapse: collapse;
        }
        .container {
          max-width: 1150px;
          width: auto;
          overflow-x: auto;
        }

        .container::-webkit-scrollbar {
          display: none;
          width: 10px;
          height: 10px;
          background-color: lightblue;
        }
        .container:hover::-webkit-scrollbar {
          display: initial;
        }
        .container::-webkit-scrollbar-thumb {
          background-color: #09c;
        }

        .local_tr {
          height: 50px;
          border-bottom: 2px solid ${color.letters}50;
          cursor: pointer;
          transition: all 0.3s;
          width: 100%;
        }
      `}</style>
    </>
  )
}
