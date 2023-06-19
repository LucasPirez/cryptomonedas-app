import { createContext, useContext, useReducer } from 'react'

const ContextAnimationCursor = createContext(null)

const initialState = {
  coordenadas: { x: 0, y: 0 },
  animationStart: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_COORDENADAS':
      return { ...state, coordenadas: action.payload }
    case 'SET_ANIMATIONSTATE':
      return { ...state, animationStart: action.payload }
    default:
      throw new Error('ContextAnimationCursor reducer action.type is not exist')
  }
}

export default function ContextAnimationCursorProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <ContextAnimationCursor.Provider value={{ state, dispatch }}>
      {children}
    </ContextAnimationCursor.Provider>
  )
}

export const useContextAnimationCursor = () => {
  const context = useContext(ContextAnimationCursor)

  if (!context) {
    throw new Error('el contexto se uso fuera del Provider')
  }

  return context
}
