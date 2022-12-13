import { useEffect, useState } from "react";

import useAppContext from "../../context/TableContext";
import useClick from "../../hook/useClick";
import ChevronUp from "../Icons/ChevronUp";
import ChevronDown from "../Icons/ChevrowDown";
import styles from "./SelectCurrency.module.css";

const symbols = [
  ["AED", "د.إ"],
  ["ARS", "$"],
  ["AUD", "$"],
  ["BDT", "৳"],
  ["BHD", ".د.ب"],
  ["BMD", "$"],
  ["BRL", "R$"],
  ["CAD", "$"],
  ["CHF", "CHF"],
  ["CLP", "$"],
  ["CNY", "¥"],
  ["CZK", "Kč"],
  ["DKK", "kr"],
  ["EUR", "€"],
  ["GBP", "£"],
  ["HKD", "$"],
  ["HUF", "Ft"],
  ["IDR", "Rp"],
  ["ILS", "₪"],
  ["INR", "₹"],
  ["JPY", "¥"],
  ["KRW", "₩"],
  ["KWD", "د.ك"],
  ["LKR", "₨"],
  ["MMK", "K"],
  ["MXN", "$"],
  ["MYR", "RM"],
  ["NGN", "₦"],
  ["NOK", "kr"],
  ["NZD", "$"],
  ["PHP", "₱"],
  ["PKR", "₨"],
  ["PLN", "zł"],
  ["RUB", "₽"],
  ["SAR", "﷼"],
  ["SEK", "kr"],
  ["SGD", "$"],
  ["THB", "฿"],
  ["TRY", "₤"],
  ["TWD", "NT$"],
  ["UAH", "₴"],
  ["USD", "$"],
  ["VEF", "Bs"],
  ["VND", "₫"],
  ["XDR", "SDR"],
  ["ZAR", "R"],
];

export default function SelectCurrency() {
  const { currencySelect, setCurrencySelect } = useAppContext();
  const [viewSelect, setViewSelect] = useState(false);

  const handleClick = (e, name, s) => {
    e.preventDefault();

    console.log(name);
    setCurrencySelect({ currency: name.toLowerCase(), symbol: s });
    setViewSelect(!viewSelect);
  };

  const ref = useClick(() => setViewSelect(false));
  console.log(symbols);
  return (
    <>
      <div className={styles.container} ref={ref}>
        <button
          onClick={() => setViewSelect(!viewSelect)}
          className={styles.button}
        >
          {currencySelect.currency}
          {!viewSelect ? <ChevronDown /> : <ChevronUp />}
        </button>
        <div
          className={`${styles.sub_container} ${
            viewSelect ? styles.viewSelect : ""
          }`}
        >
          {symbols.map((u, i) => {
            if (i > 0 && symbols[i - 1][0][0] !== u[0][0]) {
              return (
                <>
                  <p className={styles.separator}>{u[0][0]}</p>
                  <div key={i} className={styles.container_letter}>
                    <div
                      className={styles.container_span}
                      onClick={(e) => handleClick(e, u[0], u[1])}
                    >
                      <span>{u[1]}</span>
                      <span className={styles.container_span_span}>{u[0]}</span>
                    </div>
                  </div>
                </>
              );
            } else {
              return (
                <>
                  {i === 0 && <p className={styles.separator}>{u[0][0]}</p>}
                  <div key={i} className={styles.container_letter}>
                    <div
                      className={styles.container_span}
                      onClick={(e) => handleClick(e, u[0], u[1])}
                    >
                      <span>{u[1]}</span>
                      <span className={styles.container_span_span}>{u[0]}</span>
                    </div>
                  </div>
                </>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}
