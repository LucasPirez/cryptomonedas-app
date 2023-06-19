import { useState } from 'react'
import HeaderGeneralGrafic from './grafic/HeaderGeneralGrafic'
import ButtonsSelectGrafic from './ButtonsSelectGrafic'

import Loading from '../Loading'
import SelectorTime from './grafic/selectorTime'
import ModalPortal from '../portal/ModalPortal'
import GraficSVG from './grafic/GraficSVG'
import ContextSVGProvider from './context/ContextSVG'
import { useContextGraficsData } from './context/ContextGraficsData'
import ContextAnimationCursorProvider from './context/ContextAnimationCursor'

export default function ContainerGrafic({ id, dataBitcoin }) {
  const [portalState, setPortalState] = useState(false)
  const { data, loading } = useContextGraficsData()

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
              {data && (
                <>
                  <GraficSVG data={data} dataBitcoin={dataBitcoin} />
                  <SelectorTime id={id} currency={'usd'} />
                </>
              )}
              {loading && <Loading />}
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
