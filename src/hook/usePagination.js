import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { exchangesList, pagination } from '../client/client'
import { coinReduceTable, fetchByPage } from '../redux/features/listCriptos'
import { useRouter } from 'next/router'
import {
  exchangeReducer,
  updateBitcoin,
  exchanges,
} from '../redux/features/listExchanges'

export const usePagination = (endpoint) => {
  const dispatch = useDispatch()
  const { push } = useRouter()
  const { currencySelect } = useSelector((state) => state.criptoList)

  function handleClickValue(e, val) {
    e.preventDefault()
    window.scrollTo({ top })
    if (endpoint === 'criptos') {
      dispatch(fetchByPage({ numPage: val, currency: currencySelect.currency }))
    } else {
      dispatch(exchanges(val))
    }
    push(`/${endpoint}/${val}`)
  }

  return {
    handleClickValue,
  }
}
