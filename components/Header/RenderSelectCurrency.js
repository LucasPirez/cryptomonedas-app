import { useState } from 'react'
import SelectCurrency from './SelectCurrency'
import { currencySelectReducer } from '../../redux/features/listCriptos'
import { useDispatch } from 'react-redux'

export default function RenderSelectCurrency() {
  const [viewSelect, setViewSelect] = useState(false)
  const dispatch = useDispatch()

  const handleClick = async (e, name, s) => {
    e.preventDefault()

    setViewSelect(!viewSelect)
    dispatch(currencySelectReducer({ currency: name.toLowerCase(), symbol: s }))

    // if (endpoint === 'criptos') {
    //   try {
    //     console.log('hola suePagination  ', page)

    //     const response = await pagination(page, name.toLowerCase())
    //     dispatch(coinReduceTable(response))
    //     dispatch(updateBitcoin(response[0].current_price))
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
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
