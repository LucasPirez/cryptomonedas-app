import { useState, useRef } from "react";
import useConstansGrafic from "./useConstansGrafic";

import { getPathData } from "path-data-polyfill";

export default function useCursor() {
  const refTouchStart = useRef();
  const { width, height, margin } = useConstansGrafic();
  const [coordenadas, setCoordenadas] = useState({
    x: 0,
    y: 0,
    mouseY: 0,
    open: null,
    close: null,
    hight: null,
    low: null,
  });
  const [animationStart, setAnimationStart] = useState(false);
  const [datosLine, setDatosLine] = useState(null);

  const getYforX = (e) => {
    setAnimationStart(true);
    const y = e.nativeEvent.offsetY;
    if (y > margin.bottom) {
      datosLine.getPathData().map((u, i) => {
        const x = e.nativeEvent.offsetX;
        if (x + 2 >= u.values[0] && x - 2 <= u.values[0]) {
          if (y < height - margin.bottom) {
            setCoordenadas({
              x: u.values[0],
              y: u.values[1],
              mouseY: y,
            });
          } else {
            setCoordenadas({
              mouseY: height - margin.bottom,
              x: u.values[0],
              y: u.values[1],
            });
          }
        }
        return;
      });
    }
  };

  function startTouch(e) {
    console.log(e.target.getBoundingClientRect());
    refTouchStart.current = e.target.getBoundingClientRect().x - margin.left;
  }

  function getyforXTouch(e) {
    console.log(e.changedTouches[0].pageX);
    console.log(refTouchStart.current);
    // e.nativeEvent.changedTouches &&
    //   e.changedTouches[0].pageX - efTouchStart.current;

    // e.changedTouches[0].pageY;
    // e.changedTouches[0].pageX;

    setAnimationStart(true);
    const y = 100;

    datosLine.getPathData().map((u, i) => {
      const x = e.changedTouches[0].pageX - refTouchStart.current;
      if (x + 2 >= u.values[0] && x - 2 <= u.values[0]) {
        setCoordenadas({
          x: u.values[0],
          y: u.values[1],
          mouseY: y,
        });

        return;
      }
    });
  }

  return {
    coordenadas,
    getYforX,
    getyforXTouch,
    startTouch,
    animationStart,
    setAnimationStart,
    datosLine,
    setDatosLine,
  };
}
