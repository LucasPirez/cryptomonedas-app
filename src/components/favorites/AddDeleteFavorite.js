import { useState } from 'react'
import { color } from '../../styles/colors'
import Star from '../Icons/Star'

export default function AddDeleteFavorite({
  data,
  yes,
  no,
  setOpacity,
  scale
}) {
  const getStorage = () => {
    return localStorage.getItem('favorites_coin')
      ? JSON.parse(localStorage.getItem('favorites_coin'))
      : []
  }

  const [fill, setFill] = useState(getStorage().includes(data))

  const favorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const storage = getStorage()
    if (!storage.length) {
      localStorage.setItem('favorites_coin', JSON.stringify([data]))
    } else {
      localStorage.setItem('favorites_coin', JSON.stringify([...storage, data]))
    }
    setFill(true)
    setOpacity && setOpacity(true)
  }

  const delete_favorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const storage = getStorage()
    const storageFilter = storage.filter((u) => u !== data)
    setFill(false)
    localStorage.setItem('favorites_coin', JSON.stringify(storageFilter))
    setOpacity && setOpacity(false)
  }

  return (
    <>
      {fill ? (
        <button className='fill' onClick={delete_favorite}>
          <Star scale={scale} />
        </button>
      ) : (
        <button className='no_fill' onClick={favorite}>
          <Star scale={scale} />
        </button>
      )}
      <style jsx>
        {`
          button {
            background: transparent;
            border: none;
          }
          .no_fill > :global(svg) {
            stroke: ${color.letters};
            fill: ${no};
          }
          .fill > :global(svg) {
            stroke: ${color.letters};
            fill: ${yes};
          }
        `}
      </style>
    </>
  )
}
