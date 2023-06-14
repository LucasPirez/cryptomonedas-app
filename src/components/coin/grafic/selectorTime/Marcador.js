import useGraficContext from '../../../../context/GraficContext'

function Marcador({ xScale, yScale }) {
  const { data } = useGraficContext()
  const handleDown = (e) => {
    e.preventDefault()
    return (bool = true)
  }

  const handleUp = (e) => {
    return (bool = false)
  }
  // const handleMove = (e) => {
  //   e.preventDefault()
  //   const x = e.nativeEvent.offsetX
  //   if (bool) {
  //     console.log(e)
  //     updateElement({ x1: x, x2: x }, lineHistoric)
  //   }
  // }

  return (
    <>
      <line
        style={{ cursor: 'ew-resize' }}
        id={'lineHistoricMax'}
        x1={width}
        y={0}
        x2={width}
        y2={80}
        stroke={`${color.lineGrafic}90`}
        strokeWidth={3}
        onMouseDown={handleDown}
        onMouseUp={handleUp}
      />

      {data && (
        <line
          style={{ cursor: 'ew-resize' }}
          id={'lineHistoric'}
          x1={xScale(min(data, (d) => d[0]))}
          y={0}
          x2={xScale(min(data, (d) => d[0]))}
          y2={80}
          stroke={`${color.lineGrafic}90`}
          strokeWidth={3}
          onMouseDown={handleDown}
          onMouseUp={handleUp}
        />
      )}
    </>
  )
}
