'use client'

import SearchCrypto from '../../components/alerts/createAlert/SearchCrypto'

export default function Alerts() {
  return (
    <>
      <section className='container'>
        <SearchCrypto />
      </section>
      <style jsx>{`
        .container {
          display: grid;
          width: 100vw;
          justify-content: center;

          padding: 10px;
        }
      `}</style>
    </>
  )
}
