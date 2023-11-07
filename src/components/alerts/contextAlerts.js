import { createContext, useContext, useState } from 'react'

const ContextAlerts = createContext(null)

export default function AlertContextProvider({ children }) {
  const [formState, setFormState] = useState({
    coinName: '',
    minPrice: undefined,
    maxPrice: undefined
  })
  const [alerts, setAlerts] = useState({
    alerts: null,
    alertsId: null
  })

  const handleSetAlerts = (alerts) => {
    const alertsId = alerts.map((alert) => alert.coinId)

    setAlerts({ alerts, alertsId })
  }

  const handleSetValueForm = (data) => {
    setFormState((prev) => ({
      ...prev,
      ...data
    }))
  }

  const value = {
    formState,
    handleSetValueForm,
    handleSetAlerts,
    alerts
  }

  return (
    <ContextAlerts.Provider value={value}>
      {children}
    </ContextAlerts.Provider>
  )
}
/**
 *
 * @return - formState-{coinId,minPrice,maxPrite}
 * @return - handleSetValueForm(formState)
 */
export function useContextAlerts() {
  const context = useContext(ContextAlerts)

  if (!context) {
    throw new Error('el contexto debe usarse dentro del provider')
  }

  return context
}
