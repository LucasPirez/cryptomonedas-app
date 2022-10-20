import { useState, useEffect, useRef } from "react";
import { graficDays, graficRange } from "../../client/client";
import { color } from "../../styles/colors";
import Grafic from "./grafic/Grafic";
import CandleGrafic from "./grafic/candleGrafic";
import Image from "next/image";
import HeaderGeneralGrafic from "./grafic/HeaderGeneralGrafic";
import ButtonsSelectGrafic from "./ButtonsSelectGrafic";
import useGraficContext from "../../context/GraficContext";
import Loading from "../Loading";
import SelectorTime from "./grafic/selectorTime";
import { image } from "d3";
import useAppContext from "../../context/TableContext";

export default function ContainerGrafic({ id, setPortalState, portalState }) {
  const [dataBitcoin, setDataBitcoin] = useState(null);
  const [candleGrafic, setCandleGrafic] = useState(false);
  const [change, setChange] = useState(false);
  const { currencySelect } = useAppContext();
  const rangeMin = useRef({ min: null, time: null });
  const { data, rangeGrafic, time, loading } = useGraficContext();

  function reduceBitcoin(value) {
    const arr = value.map((u, i) => {
      if (i < data.length) {
        return [u[0], data[i][1] / u[1]];
      }
    });
    console.log(data);
    console.log(value);
    setDataBitcoin(arr);
  }

  useEffect(() => {
    (async () => {
      if (data && time && change && rangeMin.current.time !== time) {
        rangeMin.current.time = time;

        const response = await graficDays(
          "bitcoin",
          time,
          currencySelect.currency
        );
        console.log(time);

        reduceBitcoin(response.prices);
      }
    })();
  }, [time, change]);

  // rangeGrafic.min &&
  useEffect(() => {
    if (change && rangeGrafic.min !== rangeMin.current.min) {
      rangeMin.current.min = rangeGrafic.min;
      console.log(rangeGrafic.min);
      console.log("render rangeGrafic");

      graficRange({
        id: "bitcoin",
        currency: currencySelect.currency,
        time: rangeGrafic.min / 1000,
        dateNow: rangeGrafic.max / 1000,
      })
        .then((datos) => datos.json())
        .then((datos) => {
          reduceBitcoin(datos.prices);
        });
    }
  }, [rangeGrafic, change]);

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

        {data && <SelectorTime id={id} currency={"usd"} />}
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
  );
}
