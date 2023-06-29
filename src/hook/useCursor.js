import { useRef } from 'react'

export default function useCursor(dispatch) {
  const refTouchStart = useRef()

  function getyforXTouch(e) {
    const y = 100
    const eventX = e.changedTouches[0].pageX - refTouchStart.current

    dispatch({
      type: 'SET_COORDENADAS',
      payload: {
        x: eventX,
        y
      }
    })
  }

  const getYforX = (e) => {
    e.preventDefault()
    const y = e.nativeEvent.offsetY
    const x = e.nativeEvent.offsetX

    dispatch({ type: 'SET_COORDENADAS', payload: { x, y } })
  }

  function stopAnimation() {
    dispatch({ type: 'SET_ANIMATIONSTATE', payload: false })
  }

  function startTouch(e) {
    refTouchStart.current = e.target.getBoundingClientRect().x - 40
    dispatch({ type: 'SET_ANIMATIONSTATE', payload: true })
  }

  function startAnimation(e) {
    dispatch({ type: 'SET_ANIMATIONSTATE', payload: true })
  }

  return {
    getYforX,
    startTouch,
    getyforXTouch,
    stopAnimation,
    startAnimation
  }
}
