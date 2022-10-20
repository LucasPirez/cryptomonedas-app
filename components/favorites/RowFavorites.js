import React, { useState, useEffect, lazy, Suspense } from "react";
import Image from "next/image";
import Star from "../../components/Icons/Star";
import Link from "next/link";
import AddDeleteFavorite from "./AddDeleteFavorite";
import { color } from "../../styles/colors";
import { useRouter } from "next/router";

const GraficRow = React.lazy(() => import("../coin/grafic/GraficRow"));

export default function RowFavorites({ data }) {
  const [opacity, setOpacity] = useState(true);
  const { push } = useRouter();
  return (
    <>
      <tr onClick={() => push(`http://localhost:3000/coin/${data.id}`)}>
        <td>
          <div className="star">
            <AddDeleteFavorite
              data={data.id}
              yes={color.bitcoin}
              no={color.background}
              setOpacity={setOpacity}
            />
          </div>
        </td>
        <td className="sticy__td">
          <div className="img_name">
            <div>
              <Image src={data.image.small} alt="icon" width={15} height={15} />

              <Link href={`coin/${data.id}`}>
                <a className="image">{data.name}</a>
              </Link>
            </div>
            <span className="symbol">{data.symbol.toUpperCase()}</span>
          </div>
        </td>

        <td className="numbers">
          ${data.market_data.current_price.usd.toLocaleString("en-US")}
        </td>

        <td
          className={
            data.market_data.price_change_percentage_24h > 0
              ? "price numbers"
              : "price_danger numbers"
          }
        >
          {data.market_data.price_change_percentage_24h &&
            data.market_data.price_change_percentage_24h.toFixed(2)}
          %
        </td>
        <td
          className={
            data.market_data.price_change_percentage_7d_in_currency.usd > 0
              ? "price numbers"
              : "price_danger numbers"
          }
        >
          {data.market_data.price_change_percentage_7d_in_currency.usd &&
            data.market_data.price_change_percentage_7d_in_currency.usd.toFixed(
              2
            )}
          %
        </td>

        <td className="numbers">
          ${data.market_data.total_volume.usd.toLocaleString("en-US")}
        </td>
        <td className="numbers">
          ${data.market_data.market_cap.usd.toLocaleString("en-US")}
        </td>
        <td className="tdGrafic">
          <Suspense fallback="hola">
            <GraficRow
              dataGrafic={data.market_data.sparkline_7d.price}
              graficColor={
                data.market_data.price_change_percentage_7d_in_currency.usd
              }
            />
          </Suspense>
        </td>
      </tr>
      <style jsx>
        {`
          tr {
            cursor: pointer;
            transition: all 0.3s;
            background: ${!opacity ? `${color.dark}50` : ""};
            border-bottom: 1px solid ${color.letters};
            margin: 2rem;
          }

          tr:hover {
            background: ${!opacity ? `${color.dark}50` : ""};
          }

          td {
            min-width: 30px;
            text-align: center;
            transition: all 0.3s;
          }

          span {
            margin: 0 10px 0 0;
          }

          td:hover {
            color: ${color.blue};
          }

          .star {
            width: 50px;
          }

          .img_name {
            display: flex;
            justify-content: space-between;
            font-weight: 600;
            width: 170px;
          }

          .image {
            margin: 0 10px;
          }

          .img_name button,
          .price {
            color: green;
          }

          .price_danger {
            color: red;
          }
          .symbol {
            color: ${color.lineGrafic};
          }
          .numbers {
            padding: 0 30px;
          }
          td .tdGrafic {
            position: relative;
            width: 200;
            min-width: 200px;
          }

          @media screen and (max-width: 900px) {
            .img_name {
              width: 100px;
              flex-wrap: wrap;
              justify-content: center;
              background: ${color.background};
              z-index: 9;
            }

            .sticy__td {
              position: sticky;
              left: 0px;
            }
          }
        `}
      </style>
    </>
  );
}
