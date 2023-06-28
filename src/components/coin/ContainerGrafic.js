import { useEffect, useState } from 'react'
import HeaderGeneralGrafic from './grafic/HeaderGeneralGrafic'
import ButtonsSelectGrafic from './ButtonsSelectGrafic'
import SelectorTime from './grafic/selectorTime'
import ModalPortal from '../portal/ModalPortal'
import GraficSVG from './grafic/GraficSVG'
import ContextSVGProvider from './context/ContextSVG'
import ContextAnimationCursorProvider from './context/ContextAnimationCursor'

export default function ContainerGrafic({ id, dataBitcoin }) {
  const [portalState, setPortalState] = useState(false)

  function GroupComponentns() {
    return (
      <>
        <section>
          <ContextSVGProvider>
            <ContextAnimationCursorProvider>
              <HeaderGeneralGrafic />
              <ButtonsSelectGrafic
                setPortalState={setPortalState}
                portalState={portalState}
                name={id}
              />

              <GraficSVG dataBitcoin={dataBitcoin} />
              <SelectorTime id={id} currency={'usd'} />
            </ContextAnimationCursorProvider>
          </ContextSVGProvider>
        </section>

        <style jsx>
          {`
            section {
              position: relative;
              width: auto;
              height: auto;
              padding: 20px;
            }
          `}
        </style>
      </>
    )
  }

  return (
    <>
      {!portalState ? (
        <GroupComponentns />
      ) : (
        <ModalPortal>
          <GroupComponentns />
        </ModalPortal>
      )}
    </>
  )
}
