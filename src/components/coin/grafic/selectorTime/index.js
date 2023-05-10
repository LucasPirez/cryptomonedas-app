import { useState, useEffect } from 'react'
import { graficRange } from '../../../../client/client'
import useConstansGrafic from '../../../../hook/useConstansGrafic'
import ContainerTimeGrafic from './ContainerGrafic'

export default function SelectorTime({ id, currency }) {
  const { width } = useConstansGrafic()
  const [data, setData] = useState(null)

  useEffect(() => {
    graficRange({ id, currency, time: 1022577232 })
      .then((data) => data.json())
      .then((data) => {
        setData(data.prices)
      })
      .catch((error) => {
        console.log(error)
        return null
      })
    console.log('selector')
  }, [])

  return (
    <div
      style={{
        width: `${width}px`,
        height: '80px'
      }}
    >
      {data && <ContainerTimeGrafic data={data} />}
    </div>
  )
}
