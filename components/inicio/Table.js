import React, { useState, useEffect, Suspense, useMemo } from "react";
import { pagination } from "../../client/client";
import CoinsRow from "../Row";
import useAppContext from "../../context/TableContext";
import { color } from "../../styles/colors";
import { useRouter } from "next/router";
import SelectPage from "./SelectPage";
import useIntersectionObserver from "../../hook/useIntersectionObserver";

import OrderTable from "../OrderTable";
import TableComponent from "../utilities/TableComponent";
import Link from "next/link";
import Loading from "../Loading";
import { EPCoinsMarketsAdapter } from "../../adapters/EPCoinsMarketsAdapter";

export default function Table({ search }) {
  const { coinTable, setCoinTable, coint, setCoint } = useAppContext();
  const { container, count, setCount, visible } = useIntersectionObserver();

  const router = useRouter();

  useEffect(() => {
    if (visible) {
      setCoint(coint + 25);
    }
  }, [count, visible]);
  // onClick={() => router.push(`coin/${u.id}`)}
  return (
    <>
      <div className="contain">
        <table>
          <thead>
            <tr className="local_tr">{coinTable && <TableComponent />}</tr>
          </thead>
          <tbody>
            {coinTable ? (
              coinTable.map((u, i) => {
                console.log(u);
                if (i < coint) {
                  return (
                    <tr
                      key={u.id}
                      onClick={() =>
                        router.push(`http://localhost:3000/coin/${u.id}`)
                      }
                    >
                      <CoinsRow data={EPCoinsMarketsAdapter(u)} />
                    </tr>
                  );
                }
              })
            ) : (
              <tr>
                <td>
                  <Loading />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div
        ref={container}
        style={{ width: "100%", height: 30, background: "trasparent" }}
      ></div>
      <SelectPage max={99} setCount={setCount} route={"pagestable"} />
      <style jsx>
        {`
          table {
            min-height: "90vh";
            width: 100%;
            background: "white";
            opacity: 0.96;
            border-collapse: collapse;
          }

          tr {
            height: 50px;
            border-bottom: 2px solid ${color.letters}50;
            cursor: pointer;
            transition: all 0.3s;
          }
          tbody {
            overflow-x: auto;
          }

          .contain {
            margin: auto;
            overflow-x: auto;
            max-width: 1150px;
            width: auto;
            min-height: 90vh;
          }

          .local_tr {
            height: 50px;
            border-bottom: 2px solid ${color.letters}50;
            cursor: pointer;
            transition: all 0.3s;
            width: 100%;
          }
        `}
      </style>{" "}
    </>
  );
}
