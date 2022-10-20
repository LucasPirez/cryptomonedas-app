import { useEffect } from "react";
import useConstansGrafic from "../../../../hook/useConstansGrafic";
import { color } from "../../../../styles/colors";
import { invert } from "d3";

export default function HeaderGrafic({ stateRect, y1, theme }) {
  const { margin, width, height } = useConstansGrafic();

  return (
    <>
      <text
        x={margin.left}
        y={height - 10}
        fontWeight={"600"}
        fontSize={15}
        opacity={0.8}
      >
        O:
      </text>
      <text
        x={margin.left * 1.4}
        y={height - 10}
        fill={theme}
        fontSize={15}
        fontWeight={"600"}
      >
        {y1
          .invert(stateRect.open)
          .toLocaleString("en-US", { maximumFractionDigits: 2 })}
      </text>
      <text
        x={margin.left * 4}
        y={height - 10}
        fontSize={15}
        opacity={0.8}
        fontWeight={"600"}
      >
        H:
      </text>
      <text
        x={margin.left * 4.4}
        y={height - 10}
        fill={theme}
        fontSize={15}
        fontWeight={"600"}
      >
        {y1
          .invert(stateRect.hight)
          .toLocaleString("en-US", { maximumFractionDigits: 2 })}
      </text>
      <text
        x={margin.left * 6.7}
        y={height - 10}
        opacity={0.8}
        fontSize={15}
        fontWeight={"600"}
      >
        L:
      </text>
      <text
        x={margin.left * 7.05}
        y={height - 10}
        fill={theme}
        fontSize={15}
        fontWeight={"600"}
      >
        {y1
          .invert(stateRect.low)
          .toLocaleString("en-US", { maximumFractionDigits: 2 })}
      </text>
      <text
        x={margin.left * 9.4}
        y={height - 10}
        opacity={0.8}
        fontSize={15}
        fontWeight={"600"}
      >
        C:
      </text>
      <text
        x={margin.left * 9.75}
        y={height - 10}
        fill={theme}
        fontSize={15}
        fontWeight={"600"}
      >
        {y1
          .invert(stateRect.close)
          .toLocaleString("en-US", { maximumFractionDigits: 2 })}
      </text>
      <style jsx>{``}</style>
    </>
  );
}
