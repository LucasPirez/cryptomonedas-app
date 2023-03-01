import Header from '../Header/Header'
import GlobalHeader from '../Header/GlobalHeader'
import { useEffect, useState } from 'react'

export default function Layout({ children }) {
  const [showing, setShowing] = useState(false)

  useEffect(() => {
    setShowing(true)
  }, [])

  return (
    <>
      {showing && (
        <>
          <GlobalHeader />
          <Header />
        </>
      )}
      <main>{children}</main>
    </>
  )
}
