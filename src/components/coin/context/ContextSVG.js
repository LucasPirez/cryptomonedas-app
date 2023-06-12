import { useReducer, createContext, useEffect } from 'react'
import useConstansGrafic from '../../../hook/useConstansGrafic'

export const ContextSVG = createContext(null)

const initialState = {
  scaleXandY: { scaleX: null, scaleY: null },
  parsePath: null,
  coordenadas: null,
  constants: {
    width: 200,
    height: 400,
    margin: { top: 40, right: 30, bottom: 50, left: 40 }
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SCALEXANDY':
      return { ...state, scaleXandY: action.payload }

    case 'SET_PARSE_PATH':
      return { ...state, parsePath: action.payload }
    case 'SET_COORDENADAS':
      return { ...state, coordenadas: action.payload }
    case 'SET_CONSTANTS':
      return {
        ...state,
        constants: { ...state.constants, width: action.payload }
      }
  }
}

export default function ContextSVGProvider({ children }) {
  const width = useConstansGrafic()
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({
      type: 'SET_CONSTANTS',
      payload: width
    })
  }, [width])

  return (
    <ContextSVG.Provider value={{ state, dispatch }}>
      {children}
    </ContextSVG.Provider>
  )
}
