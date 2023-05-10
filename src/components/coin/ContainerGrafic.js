import { useState } from 'react'
import Grafic from './grafic/lineGrafic/Grafic'
import CandleGrafic from './grafic/candleGrafic'
import HeaderGeneralGrafic from './grafic/HeaderGeneralGrafic'
import ButtonsSelectGrafic from './ButtonsSelectGrafic'
import useGraficContext from '../../context/GraficContext'
import Loading from '../Loading'
import SelectorTime from './grafic/selectorTime'
import ModalPortal from '../portal/ModalPortal'

export default function ContainerGrafic({
  id,
  dataBitcoin,
  change,
  setChange
}) {
  const [candleGrafic, setCandleGrafic] = useState(false)
  const [portalState, setPortalState] = useState(false)

  const { data, loading } = useGraficContext()

  function GroupComponentns() {
    return (
      <>
        <section>
          <HeaderGeneralGrafic />

          <ButtonsSelectGrafic
            setPortalState={setPortalState}
            portalState={portalState}
            setCandleGrafic={setCandleGrafic}
            candleGrafic={candleGrafic}
            setChange={setChange}
            name={id}
            change={change}
          />

          {data &&
            (!candleGrafic ? (
              <Grafic data={data} change={change} dataBitcoin={dataBitcoin} />
            ) : (
              <CandleGrafic data={data} />
            ))}
          {loading && <Loading />}
          {data && <SelectorTime id={id} currency={'usd'} />}
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
      {portalState ? (
        <GroupComponentns />
      ) : (
        <ModalPortal>
          <GroupComponentns />
        </ModalPortal>
      )}
    </>
  )
}
