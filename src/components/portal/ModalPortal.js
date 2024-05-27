import { useEffect } from 'react'
import ReactDom from 'react-dom'

export default function ModalPortal({ children }) {
  const portalNode = document.createElement('div')

  portalNode.ariaLabel = 'portalNode'
  portalNode.style.position = 'fixed'
  portalNode.style.width = '100vw'
  portalNode.style.height = '100vh'
  portalNode.style.display = 'flex'
  portalNode.style.justifyContent = 'center'
  portalNode.style.background = 'rgba(240,240,240)'
  portalNode.style.top = '0'
  portalNode.style.left = '0'
  portalNode.style.zIndex = 9999

  useEffect(() => {
    document.body.appendChild(portalNode)

    return () => {
      portalNode.remove()
    }
  }, [portalNode])

  return ReactDom.createPortal(children, portalNode)
}
