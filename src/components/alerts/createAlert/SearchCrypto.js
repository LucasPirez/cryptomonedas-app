'use client'

import { useEffect } from 'react'

export default function SearchCrypto() {
  const fet = globalThis.localStorage
    ? JSON.parse(globalThis.localStorage.getItem('listSearch'))
    : []

  useEffect(() => {
    console.log(localStorage.getItem('listSearch'))
  }, [])

  return (
    <>
      <p>hola</p>
      <select>
        {fet.map((cripto) => (
          <option value={cripto.id} key={cripto}>
            {cripto}
          </option>
        ))}
      </select>
    </>
  )
}
