import { useContext, createContext, useState, useEffect } from 'react'
import { graficRange } from '../../../client/client'

const ContextGraficHistori = createContext(null)

export default function ContextGraficHistoricProvider({ children, id }) {
  const [dataHistoric, setDataHistoric] = useState(null)

  useEffect(() => {
    graficRange({ id, currency: 'usd', time: 1022577232 })
      .then((data) => data.json())
      .then((data) => {
        setDataHistoric(data.prices)
      })
      .catch((error) => {
        console.log(error)
        return null
      })
  }, [])

  const data = {
    dataHistoric
  }
  return (
    <ContextGraficHistori.Provider value={data}>
      {children}
    </ContextGraficHistori.Provider>
  )
}

export function useContextGraficHistoric() {
  const context = useContext(ContextGraficHistori)

  if (!context) {
    throw new Error('El contexto debe usarse dentro del provider')
  }
  return context
}
