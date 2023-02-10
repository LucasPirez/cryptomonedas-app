import { useState, useEffect } from "react";
import { EPExchangesAdapter } from "../../adapters/EPExchagesAdapter";
import { exchangesList, oneCoin } from "../../client/client";
import useAppContext from "../../context/TableContext";
import useIntersectionObserver from "../../hook/useIntersectionObserver";
import { color } from "../../styles/colors";
import Header from "../Header/Header";
import SelectPage from "../inicio/SelectPage";
import Loading from "../Loading";
import OrderTable from "../OrderTable";
import RowExchanges from "./RowExchanges";
import { useSelector } from "react-redux";

export default function Exchanges() {
  const { dataExchanges, setDataExchanges } = useAppContext();
  const { container, count, reInitCount } = useIntersectionObserver();

  return (
    <>
      <div>
        <table>
          <thead>
            {dataExchanges.datos && (
              <tr className="local_tr">
                <th>
                  <OrderTable
                    setCoinTable={setDataExchanges}
                    coinTable={dataExchanges.datos}
                    type={"number"}
                    nameConvert={"trust_score_rank"}
                  >
                    <span>#</span>
                  </OrderTable>
                </th>
                <th>
                  <OrderTable
                    setCoinTable={setDataExchanges}
                    coinTable={dataExchanges.datos}
                    type={"string"}
                    nameConvert={"id"}
                  >
                    <span>Name</span>
                  </OrderTable>
                </th>
                <th>
                  <OrderTable
                    setCoinTable={setDataExchanges}
                    coinTable={dataExchanges.datos}
                    type={"number"}
                    nameConvert={"trust_score"}
                  >
                    <span>Trust Score</span>
                  </OrderTable>
                </th>
                <th>
                  <OrderTable
                    setCoinTable={setDataExchanges}
                    coinTable={dataExchanges.datos}
                    type={"number"}
                    nameConvert={"trade_volume_24h_btc_normalized"}
                  >
                    <span>Volume 24h Normalized</span>
                  </OrderTable>
                </th>
                <th>
                  <OrderTable
                    setCoinTable={setDataExchanges}
                    coinTable={dataExchanges.datos}
                    type={"number"}
                    nameConvert={"trade_volume_24h_btc"}
                  >
                    <span>Volume 24h</span>
                  </OrderTable>
                </th>

                <th>Description</th>
              </tr>
            )}
          </thead>

          <tbody>
            {dataExchanges.datos ? (
              dataExchanges.datos.map((u, i) => {
                if (i < count) {
                  return (
                    <tr key={u.id}>
                      <RowExchanges
                        data={EPExchangesAdapter(u)}
                        bitcoinPrice={dataExchanges.bitcoin}
                      />
                    </tr>
                  );
                }
              })
            ) : (
              <Loading />
            )}
          </tbody>
        </table>
      </div>
      <div
        ref={container}
        style={{ width: "100%", height: 30, background: "trasparent" }}
      ></div>
      <SelectPage max={5} reInitCount={reInitCount} route={"exchanges"} />
      <style jsx>{`
        div {
          max-width: 1150px;
          margin: 0 auto;
          position: relative;
          min-height: "90vh";
          overflow-x: auto;
          width: "100%";
        }
        table {
          margin: auto;
          width: 90%;
          min-height: 90vh;
          position: relative;
          opacity: 0.96;
          border-collapse: collapse;
        }
        tbody {
        }

        tr {
          height: 80px;
          border-bottom: 2px solid ${color.letters}50;
          cursor: pointer;
          transition: all 0.3s;
        }
        tr:hover {
          background: #eee;
        }

        th {
          height: 50px;
          position: relative;
          text-align: center;
          border-top: 2px solid ${color.letters}20;
          align-self: bottom;
        }

        .local_tr {
          height: 80px;
        }

        @media screen and (max-width: 1000px) {
          .local_tr {
            height: 90px;
          }
        }
      `}</style>
    </>
  );
}
