import { useState, useEffect } from 'react'

export function useFetch({ service, value }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [controller, setController] = useState(null)

  useEffect(() => {
    const abortController = new AbortController()
    setController(abortController)
    ;(async () => {
      try {
        const response = await service({
          data: value,
          abort: abortController
        })
        setdata(response)
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Cancelled request')
        } else {
          setError(error)
        }
      } finally {
        setLoading(false)
      }
    })()

    return () => abortController.abort()
  }, [])

  const handleCancelRequest = () => {
    if (controller) {
      controller.abort()
      setError('Cancelled Request')
    }
  }

  return { data, loading, error, handleCancelRequest }
}
