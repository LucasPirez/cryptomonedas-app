import { useContextGraficsData } from '../../context/ContextGraficsData'
import ContainerTimeGrafic from './ContainerGrafic'
import { useContextSVG } from '../../context/ContextSVG'

export default function SelectorTime({ id, currency }) {
  const { dataHistoric } = useContextGraficsData()
  const { state } = useContextSVG()
  const { width } = state.constants

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
