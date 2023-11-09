import { useReducer } from 'react'
import useClick from './useClick'
import { lista } from '../client/client'

const INITIAL_STATE = {
  list: {},
  listFiltered: [],
  wordTiped: ''
}

const TYPES = {
  cargarList: (state, payload) => {
    return { ...state, list: payload }
  },
  filtrar: (state, payload) => {
    return { ...state, listFiltered: payload }
  },
  escribir: (state, payload) => {
    return { ...state, wordTiped: payload }
  },
  addPriceToList: (state, payload) => {}
}

const reducer = (state, { type, payload }) =>
  TYPES[type](state, payload)

export const useSearchCoin = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  const { list } = state

  const ref = useClick(() =>
    dispatch({ type: 'escribir', payload: '' })
  )

  const handleChange = (value) => {
    console.log(value)
    dispatch({ type: 'escribir', payload: value })
    storage(value)

    if (value.length > 1) {
      const arrCryptos = list[value[0]] ?? []

      const arrFilter = arrCryptos
        .filter((crypto) => crypto.id.includes(value))
        .toSorted((a, b) => a.id.length - b.id.length)

      dispatch({
        type: 'filtrar',
        payload: arrFilter
      })
    }
    if (value.length === 0) {
      dispatch({ type: 'filtrar', payload: [] })
    }
  }

  const storage = (value) => {
    if (!list.length) {
      const storage = JSON.parse(localStorage.getItem('listSearch'))
      if (storage) {
        dispatch({ type: 'cargarList', payload: storage })
      } else {
        if (value.length > 1) {
          lista().then((data) => {
            const dicList = {}

            data.forEach((cripto, index) => {
              if (!dicList[cripto.id[0]]) {
                dicList[cripto.id[0]] = [cripto]
              } else {
                dicList[cripto.id[0]].push(cripto)
              }
            })

            localStorage.setItem(
              'listSearch',
              JSON.stringify(dicList)
            )

            dispatch({
              type: 'cargarList',
              payload: dicList
            })
          })
        }
      }
    }
  }

  return {
    state,
    dispatch,
    handleChange,
    ref
  }
}
