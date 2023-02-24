import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { exchangesList, pagination } from '../client/client'
import { coinReduceTable, fetchByPage } from '../redux/features/listCriptos'
import { useRouter } from 'next/router'
import {
  exchangeReducer,
  updateBitcoin,
  exchangesFetch,
} from '../redux/features/listExchanges'

export const usePagination = (endpoint, reInitCount) => {
  const dispatch = useDispatch()
  const { currencySelect } = useSelector((state) => state.criptoList)
  const { push } = useRouter()

  function handleClickValue(e, val) {
    e.preventDefault()
    window.scrollTo({ top })
    if (endpoint === 'criptos') {
      dispatch(fetchByPage(val))
    } else {
      dispatch(exchangesFetch(val))
    }
    push(`/${endpoint}/${val}`)
  }

  return {
    handleClickValue,
  }
}
