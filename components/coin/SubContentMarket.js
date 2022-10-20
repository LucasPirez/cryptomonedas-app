import useAppContext from "../../context/TableContext";
import { color } from "../../styles/colors";

export default function SubContentMarket({ data }) {
  const { currencySelect } = useAppContext();
  const {
    total_volume,
    market_cap,
    price_change_percentage_7d,
    price_change_percentage_14d,
    price_change_percentage_30d,
  } = data;

  return (
    <>
      <div className="container">
        <div className="sub_container">
          <h3>Market Cap</h3>
          <p>
            <span>{currencySelect.symbol}</span>{" "}
            {market_cap[currencySelect.currency] &&
              market_cap[currencySelect.currency].toLocaleString("en")}
          </p>
        </div>
        <div className="sub_container">
          <h3>Total volume</h3>
          <p>
            <span>{currencySelect.symbol}</span>{" "}
            {total_volume[currencySelect.currency] &&
              total_volume[currencySelect.currency].toLocaleString("un-US")}
          </p>
        </div>
        <div className="sub_container">
          <h3>Price Percentaje</h3>
          <p>
            7D:
            <strong
              className={price_change_percentage_7d > 0 ? "green" : "red"}
            >
              %{price_change_percentage_7d.toLocaleString("en-US")}
            </strong>
          </p>
          <p>
            14D:
            <strong
              className={price_change_percentage_14d > 0 ? "green" : "red"}
            >
              %{price_change_percentage_14d.toLocaleString("en-US")}
            </strong>
          </p>
          <p>
            30D:
            <strong
              className={price_change_percentage_30d > 0 ? "green" : "red"}
            >
              %{price_change_percentage_30d.toLocaleString("en-US")}
            </strong>
          </p>
        </div>
      </div>

      <style jsx>
        {`
          .container {
            display: flex;
            width: 100%;
            justify-content: space-around;
            flex-wrap: wrap;
          }

          .sub_container {
            padding: 0 20px;
            margin: 30px 0;
            min-width: 120px;
            width: auto;
            border-left: 1px solid #eee;
          }

          .green {
            color: ${color.candleGreen};
          }
          .red {
            color: ${color.candleRed};
          }
          @media screen (max-width: 1000px) {
            .sub_container {
              padding: 0 4px;
            }
          }
        `}
      </style>
    </>
  );
}
