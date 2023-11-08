import { Toast } from 'primereact/toast'
import { createContext, useRef, useContext } from 'react'

export const ContextToast = createContext()

export default function ContextToastProvider({ children }) {
  const toast = useRef(null)

  const toastSucces = (message) => {
    toast.current.show({
      severity: 'success',
      summary: 'Success',
      detail: message
    })
  }

  const toastError = (message) => {
    toast.current.style = {
      position: 'absolute',
      top: '45%',
      left: '45%'
    }

    toast.current.show({
      severity: 'error',
      summary: 'Error',
      detail: message
    })
  }

  const data = {
    toastSucces,
    toastError
  }

  return (
    <ContextToast.Provider value={data}>
      {children}
      <Toast ref={toast} />
    </ContextToast.Provider>
  )
}

export function useToastContext() {
  const context = useContext(ContextToast)

  if (!context) {
    throw new Error('el contexto debe usarse dentro de su provider')
  }

  return context
}
