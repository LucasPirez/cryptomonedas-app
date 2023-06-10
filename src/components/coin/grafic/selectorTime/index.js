import useConstansGrafic from '../../../../hook/useConstansGrafic'
import { useContextGraficHistoric } from '../../context/ContextGraficHistoric'
import ContainerTimeGrafic from './ContainerGrafic'

export default function SelectorTime({ id, currency }) {
  const { width } = useConstansGrafic()
  const { dataHistoric } = useContextGraficHistoric()

  return (
    <div
      style={{
        width: `${width}px`,
        height: '80px'
      }}
    >
      {dataHistoric && <ContainerTimeGrafic />}
    </div>
  )
}
