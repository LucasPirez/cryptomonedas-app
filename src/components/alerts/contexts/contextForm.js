import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'

export const INITIAL_STATE_FORM = {
  coinName: '',
  minPrice: undefined,
  maxPrice: undefined
}
const ContextAlerts = createContext(null)

export default function FormContextProvider({ children }) {
  const [formState, setFormState] = useState(INITIAL_STATE_FORM)
  const [isCoinExist, setIsCoinExist] = useState(false)
  const [alerts, setAlerts] = useState(null)
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const refCoinsId = useRef(null)

  const updateAlerts = (alertsObtain) => {
    handleSetValueForm(INITIAL_STATE_FORM)
    const alertsId = alertsObtain.map((alert) => alert.coinId)
    refCoinsId.current = alertsId

    setAlerts({ alerts: alertsObtain, alertsId })
  }

  const handleSetValueForm = (data) => {
    setFormState((prev) => ({
      ...prev,
      ...data
    }))
  }

  useEffect(() => {
    if (refCoinsId.current?.includes(formState.coinName)) {
      setIsCoinExist(true)
    } else {
      setIsCoinExist(false)
    }

    if (
      formState.coinName?.length &&
      formState?.maxPrice &&
      formState?.minPrice
    ) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [formState])

  const value = {
    formState,
    handleSetValueForm,
    alerts,
    updateAlerts,
    refCoinsId,
    isCoinExist,
    buttonDisabled
  }

  return (
    <ContextAlerts.Provider value={value}>
      {children}
    </ContextAlerts.Provider>
  )
}
/**
 *
 * @return - formState-{coinId,minPrice,maxPrice}
 * @return - handleSetValueForm(formState)
 */
export function useContextForm() {
  const context = useContext(ContextAlerts)

  if (!context) {
    throw new Error('el contexto debe usarse dentro del provider')
  }

  return context
}
