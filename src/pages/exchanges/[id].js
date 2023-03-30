import { useState, useEffect } from 'react'
import { exchangesList } from '../../client/client'
import Head from 'next/head'
import Exchanges from '../../components/exchanges'
import { useRouter } from 'next/router'

export default function ExchangePage() {
  const { query } = useRouter()

  useEffect(() => {
    console.log(query)
  }, [])

  return (
    <>
      <section>
        {typeof query.id === 'string' && <Exchanges query={query.id} />}
      </section>

      <style jsx>{``}</style>
    </>
  )
}
