import { useReducer, createContext, useEffect, useContext } from 'react'
import useConstansGrafic from '../../../hook/useConstansGrafic'

export const ContextSVG = createContext(null)

export const selectorGrafic = {
  LINE: 'line',
  CANDLE: 'candle'
}

const initialState = {
  scaleXandY: { scaleX: null, scaleY: null },
  parsePath: null,
  constants: {
    width: 200,
    height: 450,
    margin: { top: 40, right: 30, bottom: 50, left: 40 }
  },
  selectGrafic: selectorGrafic.LINE
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SCALEXANDY':
      return { ...state, scaleXandY: action.payload }
    case 'SET_PARSE_PATH':
      return { ...state, parsePath: action.payload }
    case 'SET_CONSTANTS':
      return {
        ...state,
        constants: { ...state.constants, width: action.payload }
      }
    case 'LINE_GRAPH':
      return {
        ...state,
        selectGrafic: selectorGrafic.LINE
      }
    case 'CANDLE_GRAPH':
      return { ...state, selectGrafic: selectorGrafic.CANDLE }

    default:
      throw new Error('ContextSVG reducer action.type is not exist')
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

export const useContextSVG = () => {
  const context = useContext(ContextSVG)

  if (!context) {
    throw new Error('el contexto debe usarse dentro del provider')
  }

  return context
}
