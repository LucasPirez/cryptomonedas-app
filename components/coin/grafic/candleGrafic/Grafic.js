import React, { useEffect, useState } from "react";
import useConstansGrafic from "../../../../hook/useConstansGrafic";
import * as d3 from "d3";
import { useGrafic } from "../../../../hook/useGrafic";
import RectLine from "../RectLine";
import { color } from "../../../../styles/colors";
import HeaderGrafic from "./HeaderGrafic";
import { invert } from "d3";

export default function Grafic({ dataObj, dataScale, x1, y1 }) {
  const [stateRect, setStateRect] = useState({
    x: null,
    y: null,
    open: null,
    close: null,
    hight: null,
    low: null,
  });
  const [animationStart, setAnimationStart] = useState(false);
  const [theme, setTheme] = useState(null);
  const [yLine, setYLine] = useState(56);
  const { width, height, margin } = useConstansGrafic();
  const calc = Math.round(
    (width - margin.left - margin.right) / dataObj.length
  );
  const marginCandles = calc > 47 ? 47 : calc;

  const diference = dataObj[dataObj.length - 1]["date"] - dataObj[0]["date"];

  const candleRef = useGrafic(
    (svg) => {
      const xAxis = (g) =>
        g

          .attr(
            "transform",
            `translate(${width - width},${height - margin.bottom})`
          )
          .style("color", `${color.letters}`)
          .style("opacity", "0.8")
          .call(
            d3
              .axisBottom()
              .scale(x1)
              .ticks(8, [
                d3.timeFormat(diference > 2629800000 ? "%d/%m/ %Y" : "%d"),
              ])
          )
          .selectAll("text")
          .style("color", `${color.letters}`)
          .style("opacity", "0.8");

      const y1Axis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .style("color", `${color.letters}`)
          .call(d3.axisLeft(y1).ticks(10).tickSize(0))
          .style("opacity", "0.8");

      const xAxisGrid = d3
        .axisLeft(y1)
        .tickSize(-width)
        .tickFormat("")
        .ticks(10);

      svg.select("#x-axis").call(xAxis);
      svg.select("#y-axis").call(y1Axis);

      svg
        .select("#grid")
        .attr("transform", `translate(${margin.left},0)`)
        .attr("class", "noGrid")
        .style("color", `${color.letters}`)
        .style("opacity", "0.3")
        .call(xAxisGrid);
    },
    [dataScale, width]
  );

  function updateElement(o, element) {
    for (const name in o) {
      if (o.hasOwnProperty(name)) {
        element.setAttributeNS(null, name, o[name]);
      }
    }
    return element;
  }

  const getPosition = (e) => {
    setAnimationStart(true);
    const cursor = e.nativeEvent.offsetX;
    const f = e.nativeEvent.offsetY;

    if (f > margin.top && f < height - margin.bottom) {
      setYLine(y1.invert(f).toFixed(0));

      updateElement({ x1: margin.left, y1: f, x2: width, y2: f }, lineUpdate);
      updateElement({ x: 10, y: f - 9 }, rectPriceY);
      updateElement({ x: 12, y: f + 3 }, textPriceY);
    }

    dataScale.map((u, i) => {
      if (
        i < dataScale.length - 1 &&
        cursor > u["posX"] &&
        cursor < dataScale[i + 1]["posX"]
      ) {
        setStateRect({
          x: u["posX"] + 2.5,
          y: u["promedio"],
          open: u["open"],
          close: u["close"],
          hight: u["maximo"],
          low: u["minimo"],
        });
        const t =
          u["open"] - u["close"] < 0 ? color.candleRed : color.candleGreen;
        setTheme(t);
      }
      return;
    });
  };

  return (
    <svg
      ref={candleRef}
      style={{
        height: height,
        width: width,
        marginRight: "0px",
        marginLeft: "0px",
        cursor: "crosshair",
      }}
      onMouseMove={getPosition}
      onMouseLeave={() => setAnimationStart(false)}
    >
      <g id="grid" />
      {dataScale.map((u, i) => (
        <RectLine key={i} u={u} marginCandles={marginCandles} color={color} />
      ))}
      <g id="x-axis" />
      <g id="y-axis" />

      <line
        x1={stateRect.x + marginCandles / 2 - 3}
        y1={margin.top}
        x2={stateRect.x + marginCandles / 2 - 3}
        y2={height - margin.bottom}
        stroke={"#eee"}
        strokeOpacity={0.86}
        transform={animationStart ? "scale(1)" : "scale(0)"}
      />
      <line
        id="lineUpdate"
        x1="100"
        y1="0"
        x2="0"
        y2="47"
        fill={color.letters}
        stroke={color.letters}
        strokeDasharray={4}
        strokeOpacity={0.5}
        transform={animationStart ? "scale(1)" : "scale(0)"}
      />
      <rect
        id="rectPriceY"
        width={30}
        height={18}
        fill={color.letters}
        opacity={animationStart ? "0.8" : "0"}
      />
      <text id="textPriceY" fontSize={11} fill={color.background}>
        {yLine}
      </text>
      <HeaderGrafic stateRect={stateRect} y1={y1} theme={theme} />
    </svg>
  );
}
