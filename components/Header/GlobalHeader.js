import React, { useState, useEffect } from "react";
import { global } from "../../client/client";
import { color } from "../../styles/colors";

export default function GlobalHeader() {
  const [dataGlobal, setDataGlobal] = useState(null);
  const [marketCap, setMarketCap] = useState({ total: 0, Dominance: null });

  useEffect(() => {
    global().then((dato) => {
      console.log(dato.data);
      const { total_market_cap, market_cap_percentage } = dato.data;
      setDataGlobal(dato);

      const suma = Object.values(total_market_cap).reduce(
        (acc, cva) => acc + cva,
        0
      );
      const arrP = Object.entries(market_cap_percentage);

      setMarketCap({
        total: suma,
        Dominance: `${arrP[0][0].toUpperCase()} ${arrP[0][1].toLocaleString(
          "en-US"
        )}%, ${arrP[1][0].toUpperCase()} ${arrP[1][1].toLocaleString()}%`,
      });
    });
  }, []);

  return (
    <>
      <div className="container">
        <div className="sub_container">
          <div style={{ display: "inline-flex" }}>
            <p>Cryptos:</p>
            {dataGlobal && (
              <span>{dataGlobal.data.active_cryptocurrencies}</span>
            )}
          </div>
          <div style={{ display: "inline-flex" }}>
            <p>Exchanges:</p>
            {dataGlobal && <span>{dataGlobal.data.markets}</span>}
          </div>
          <div style={{ display: "inline-flex" }}>
            <p>Dominance:</p>
            <span>{marketCap.Dominance && marketCap.Dominance}</span>
          </div>
          <div style={{ display: "inline-flex" }}>
            <p>Market Cap:</p>
            <span>
              {marketCap.total !== 0 && marketCap["total"].toLocaleString("en")}
            </span>

            <span>
              &nbsp;
              {dataGlobal &&
                dataGlobal.data.market_cap_change_percentage_24h_usd.toFixed(2)}
              %
            </span>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          p {
            font-size: 0.8em;
            margin: 0 1.5px 0 22px;
            opacity: 0.7;
            font-weight: 500;
            color: ${color.background};
          }
          span {
            font-size: 0.8em;
            color: ${color.lightBlue};
          }
          .container {
            height: auto;
            width: 100%;
            background: ${color.reduceBackground}50;
          }

          .sub_container {
            width: auto;
            max-width: 800px;
            min-height: 30px;
            height: auto;
            margin: auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            background: ${color.letters};
            border-bottom: 1px solid ${color.letters}70;
          }

          @media (max-width: 500px) {
            p {
              margin: 0 1.5px 0 8px;
            }
          }
        `}
      </style>
    </>
  );
}
