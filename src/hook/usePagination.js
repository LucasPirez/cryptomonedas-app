import { useRouter } from 'next/router'

export const usePagination = (endpoint) => {
  const { push } = useRouter()

  function handleClickValue(e, val) {
    e.preventDefault()
    window.scrollTo({ top })
    push(`/${endpoint}/${val}`)
  }

  return {
    handleClickValue
  }
}
