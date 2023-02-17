import { useContext, createContext, useEffect, useState, useRef } from 'react'
import { exchangesList, pagination } from '../client/client'
import { useRouter } from 'next/router'

export const AppContext = createContext(null)

export const AppContextProvider = ({ children }) => {
  const { asPath, query } = useRouter()
  const [coinTable, setCoinTable] = useState(null)
  const [coint, setCoint] = useState(25)
  const [numberActualState, setNumberActualState] = useState({
    coin: null,
    exchanges: null,
  })

  const [currencySelect, setCurrencySelect] = useState({
    currency: 'usd',
    symbol: '$',
  })

  const currencyActual = useRef(null)

  // useEffect(() => {
  //   console.log(query.id)
  //   if (query.id) {
  //     if (
  //       asPath.includes('pagestable') &&
  //       (numberActualState.coin !== Number(query.id) ||
  //         currencyActual.current !== currencySelect)
  //     ) {
  //       pagination(query.id, currencySelect.currency).then((data) => {
  //         setCoinTable(data)
  //         setCoint(25)
  //         setNumberActualState({
  //           ...numberActualState,
  //           coin: Number(query.id),
  //         })

  //         currencyActual.current = currencySelect
  //         if (data[0].id === 'bitcoin') {
  //           console.log(data[0])
  //           setDataExchanges({
  //             ...dataExchanges,
  //             bitcoin: data[0].current_price,
  //           })
  //         }
  //       })
  //     }
  //   }
  // }, [query, currencySelect])

  useEffect(() => {
    console.log('render tableContext')
  }, [])

  const data = {
    coinTable,
    coint,
    setCoint,
    setCoinTable,
    currencySelect,
    setCurrencySelect,

    numberActualState,
  }

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)

  if (!context) {
    console.error('Error deploying App Context!!!')
  }

  return context
}
export default useAppContext
