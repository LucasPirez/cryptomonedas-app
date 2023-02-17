import { useSelector } from 'react-redux'

export const useUpdateStates = () => {
  const state = useSelector((state) => state.pagination)
  const dispatch = useDispatch()
  const { currencySelect } = useSelector((state) => state.criptoList)
  const { push, query } = useRouter()

  useEffect(() => {
    window.scrollTo({ top })
    ;(async () => {
      if (endpoint === 'criptos') {
        try {
          console.log('hola suePagination ', page)

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
}
