import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { exchangesList, pagination } from '../client/client'
import { coinReduceTable } from '../redux/features/listCriptos'
import { useRouter } from 'next/router'
import {
  incrementCripto,
  decrementCripto,
  incrementExchange,
  decrementExchange,
  valueExchanges,
  valueCripto,
} from '../redux/features/pagination'
import { exchangeReducer, updateBitcoin } from '../redux/features/listExchanges'

export const usePagination = (endpoint, reInitCount) => {
  const { [endpoint]: page } = useSelector((state) => state.pagination)
  const dispatch = useDispatch()
  const { currencySelect } = useSelector((state) => state.criptoList)
  const { push, query } = useRouter()

  useEffect(() => {
    window.scrollTo({ top })
    ;(async () => {
      if (endpoint === 'criptos') {
        try {
          console.log('hola suePagination  ', page)

          const response = await pagination(page, currencySelect.currency)
          dispatch(coinReduceTable(response))
          dispatch(updateBitcoin(response[0].current_price))
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          console.log('hola exchanges  ', page)
          const response = await exchangesList(page)
          dispatch(exchangeReducer(response))
        } catch (error) {
          console.log(error)
        }
      }
    })()
    push(`/${endpoint}/${page}`)
    reInitCount()
  }, [page, currencySelect])

  function handlesumClick(e) {
    e.preventDefault()

    if (endpoint === 'criptos') {
      dispatch(incrementCripto())
    } else {
      dispatch(incrementExchange())
    }
  }

  function handleRestClick(e) {
    e.preventDefault()

    if (endpoint === 'criptos') {
      dispatch(decrementCripto())
    } else {
      dispatch(decrementExchange())
    }
  }

  function handleClickValue(e, val) {
    e.preventDefault()

    if (endpoint === 'criptos') {
      dispatch(valueCripto(val))
    } else {
      dispatch(valueExchanges(val))
    }
  }
  return {
    handleClickValue,
    handleRestClick,
    handlesumClick,
    page,
  }
}
