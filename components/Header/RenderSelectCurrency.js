import { useState } from 'react'
import SelectCurrency from './SelectCurrency'
import {
  currencySelectReducer,
  fetchByPage,
} from '../../redux/features/listCriptos'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

export default function RenderSelectCurrency() {
  const [viewSelect, setViewSelect] = useState(false)
  const dispatch = useDispatch()
  const { query } = useRouter()

  const handleClick = async (e, name, s) => {
    e.preventDefault()

    setViewSelect(!viewSelect)
    dispatch(currencySelectReducer({ currency: name.toLowerCase(), symbol: s }))
    dispatch(
      fetchByPage({ numPage: parseInt(query.id), currency: name.toLowerCase() })
    )
  }

  const handleVisibility = (bool = null) => {
    if (bool === false) {
      return setViewSelect(false)
    }
    setViewSelect(!viewSelect)
  }

  return (
    <SelectCurrency
      handleClick={handleClick}
      viewSelect={viewSelect}
      handleVisibility={handleVisibility}
    />
  )
}
