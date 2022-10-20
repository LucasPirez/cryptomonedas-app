import React, { useState, useEffect } from "react";
import { invert } from "d3";
import { color } from "../../../styles/colors";
import * as d3 from "d3";

export const trim = (val) => {
  if (val) {
    if ((val && val > 9) || val < -9) {
      return val.toFixed(2);
    } else {
      return val.toFixed(5);
    }
  } else {
    return 0;
  }
};
export default function RectInformation({
  coordenadas,
  x1,
  y1,
  bitcoinPrice,
  bitcoinScale,
  animationStart,
}) {
  // console.table(coordenadas, x1, y1, bitcoinPrice, bitcoinScale);

  function updateRect(o, element) {
    for (const name in o) {
      if (o.hasOwnProperty(name)) {
        element.setAttributeNS(null, name, o[name]);
      }
    }
    return element;
  }

  function mostarNOmostrar(valor) {
    ["#textPrice", "#rectInformation", "#textBitcoin", "#textDate"].forEach(
      (u) => {
        d3.select(u)
          .transition()
          .ease(d3.easeLinear)
          .duration(300)
          .style("opacity", valor);
      }
    );
  }

  useEffect(() => {
    if (animationStart) {
      mostarNOmostrar(1);
    } else {
      mostarNOmostrar(0);
    }
  }, [animationStart]);

  useEffect(() => {
    let uperDown;

    if (coordenadas.x > 200) {
      uperDown = 150;
    } else {
      uperDown = -10;
    }

    const yDown = coordenadas.mouseY < 100 ? 95 : -10;

    updateRect(
      { x: coordenadas.x - uperDown, y: coordenadas.mouseY - 85 + yDown },
      rectInformation
    );

    updateRect(
      { x: coordenadas.x - uperDown + 12, y: coordenadas.mouseY - 42 + yDown },
      textPrice
    );

    updateRect(
      { x: coordenadas.x - uperDown + 12, y: coordenadas.mouseY - 65 + yDown },
      textDate
    );

    if (bitcoinScale) {
      updateRect(
        {
          x: coordenadas.x - uperDown + 12,
          y: coordenadas.mouseY - 22 + yDown,
        },
        textBitcoin
      );
    }
  }, [coordenadas]);

  return (
    <>
      <filter id="dropshadow" height="130%"></filter>

      <rect
        id="rectInformation"
        x="0"
        y="0"
        width={135}
        height={85}
        fill={color.letters}
        opacity={0.9}
        stroke={color.letters}
        strokeWidth={1}
      />
      <text
        id="textPrice"
        x={50}
        y={100}
        fontSize={12}
        fill={color.reduceBackground}
        fontWeight={"600"}
      >
        price: $ {trim(y1.invert(coordenadas.y))}
      </text>

      <text
        id="textBitcoin"
        x={50}
        y={100}
        fontSize={12}
        fill={color.bitcoin}
        fontWeight={"600"}
        opacity={bitcoinScale ? 1 : 0}
      >
        B {trim(bitcoinScale)}
      </text>

      <text
        id="textDate"
        x={50}
        y={100}
        fontSize={12}
        fontWeight={"600"}
        fill={color.reduceBackground}
      >
        {new Date(x1.invert(coordenadas.x)).toLocaleString()}
      </text>

      <style jsx>{`
        rect {
          filter: drop-shadow(3px 3px 2px rgb(25 54 25 / 0.4));
        }
      `}</style>
    </>
  );
}
