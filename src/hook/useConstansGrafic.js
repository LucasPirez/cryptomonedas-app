import { useState, useEffect } from 'react'

export default function useConstansGrafic() {
  const [width, setWidth] = useState(null)

  useEffect(() => {
    const inner =
      window.innerWidth > 1100
        ? window.innerWidth * 0.65
        : window.innerWidth * 0.9
    setWidth(inner)

    const res = window.addEventListener('resize', () => {
      console.log('resive width')
      const resizewidth =
        window.innerWidth > 1100
          ? window.innerWidth * 0.65
          : window.innerWidth * 0.9

      setWidth(resizewidth)
    })

    return () => window.removeEventListener('resize', res)
  }, [])

  return width
}
