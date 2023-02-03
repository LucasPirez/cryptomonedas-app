import { useState, useEffect, lazy, Suspense } from "react";
import { useRouter } from "next/router";
import { grafic7Days, oneCoin } from "../../client/client";
import Image from "next/image";
import useConstansGrafic from "../../hook/useConstansGrafic";
import { color } from "../../styles/colors";
import Content from "../../components/coin/Content";
import Convert from "../../components/coin/Convert";
import ModalPortal from "../../components/portal/ModalPortal";
import { GraficContextProvider } from "../../context/GraficContext";
import Description from "../../components/coin/Description";
import { EPCoinAdapter } from "../../adapters/EPCoinAdapter";

const ContainerGrafic = lazy(() =>
  import("../../components/coin/ContainerGrafic")
);

export default function Coin() {
  const [coin, setCoin] = useState(null);
  const { width } = useConstansGrafic();
  const [loading, setLoading] = useState(false);
  const [portalState, setPortalState] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const id = router.query.id;

    if (id) {
      oneCoin(id)
        .then((data) => {
          setCoin(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [router.query.id]);

  return (
    <>
      <section>
        <GraficContextProvider>
          {coin && (
            <>
              <Content data={EPCoinAdapter(coin)} />
              <div>
                {!portalState ? (
                  <>
                    <Suspense fallback={<p>Cargando Grafico</p>}>
                      <ContainerGrafic
                        id={router.query.id}
                        setPortalState={setPortalState}
                        portalState={portalState}
                      />
                    </Suspense>
                    <Convert data={coin.market_data} name={coin.symbol} />
                  </>
                ) : (
                  <ModalPortal setPortalState={setPortalState}>
                    <ContainerGrafic
                      id={router.query.id}
                      setPortalState={setPortalState}
                      portalState={portalState}
                    />
                  </ModalPortal>
                )}
              </div>
            </>
          )}
        </GraficContextProvider>
      </section>

      <style jsx>
        {`
          section {
            position: relative;
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            color: ${color.letters};
            background: ${color.background};
          }

          div {
            width: 100%;
            height: auto;
            margin: 40px 0;
            display: flex;
          }
          @media (max-width: 1100px) {
            div {
              flex-direction: column-reverse;
              align-items: center;
              margin: 5px 0;
              justify-content: center;
            }
          }
        `}
      </style>
    </>
  );
}
