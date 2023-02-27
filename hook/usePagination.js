import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { exchangesList, pagination } from '../client/client'
import { coinReduceTable, fetchByPage } from '../redux/features/listCriptos'
import { useRouter } from 'next/router'
import {
  exchangeReducer,
  updateBitcoin,
  exchangesFetch,
} from '../redux/features/listExchanges'

export const usePagination = (endpoint, reInitCount, currencySelect) => {
  const dispatch = useDispatch()
  const { push } = useRouter()

  function handleClickValue(e, val) {
    e.preventDefault()
    window.scrollTo({ top })
    if (endpoint === 'criptos') {
      dispatch(fetchByPage({ numPage: val, currency: currencySelect }))
    } else {
      dispatch(exchangesFetch(val))
    }
    push(`/${endpoint}/${val}`)
  }

  return {
    handleClickValue,
  }
}
