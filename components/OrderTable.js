import { useState, useEffect } from "react";
import { color } from "../styles/colors";
import ChevronUp from "./Icons/ChevronUp";
import ChevronDown from "./Icons/ChevrowDown";
import { useRouter } from "next/router";

export default function OrderTable({
  children,
  setCoinTable,
  coinTable,
  type,
  nameConvert,
}) {
  const { asPath } = useRouter();
  const order = [];
  const [selectButton, setSelectButton] = useState(false);

  const handleDown = (e) => {
    e && e.preventDefault();
    e && e.stopPropagation();
    e && setSelectButton(true);
    if (type === "string") {
      order = [...coinTable].sort((a, b) =>
        a[nameConvert].localeCompare(b[nameConvert])
      );
    } else {
      order = [...coinTable].sort((a, b) => {
        return a[nameConvert] - b[nameConvert];
      });
    }
    asPath.includes("pagestable")
      ? setCoinTable(order)
      : setCoinTable({ ...coinTable, datos: order });
  };

  const handleUp = (e) => {
    e && e.preventDefault();
    e && e.stopPropagation();
    e && setSelectButton(false);
    if (type === "string") {
      order = [...coinTable].sort((a, b) =>
        b[nameConvert].localeCompare(a[nameConvert])
      );
    } else {
      order = [...coinTable].sort((a, b) => {
        return b[nameConvert] - a[nameConvert];
      });
    }
    asPath.includes("pagestable")
      ? setCoinTable(order)
      : setCoinTable({ ...coinTable, datos: order });
  };

  const handleOrderActual = (e) => {
    e.preventDefault();
    e.stopPropagation();

    return !selectButton ? handleUp() : handleDown();
  };

  return (
    <>
      <div onClick={handleOrderActual}>
        {children}

        {!selectButton ? (
          <button onClick={handleDown}>
            <ChevronDown />
          </button>
        ) : (
          <button onClick={handleUp}>
            <ChevronUp />
          </button>
        )}
      </div>
      <style jsx>{`
        div {
          width: auto;
          height: auto;
          display: inline-flex;
          position: absolute;
          top: 30%;
          left: 10%;
          justify-content: space-around;
          width: 90%;
        }

        button {
          border: none;
          background: transparent;
          color: ${color.letters};
          cursor: pointer;
          trasition: all 0.3s;
        }
        button:hover {
          transform: scale(1.2);
          color: ${color.letters};
        }
      `}</style>
    </>
  );
}
