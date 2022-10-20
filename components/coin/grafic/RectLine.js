export default function RectLine({ u, marginCandles, color }) {
  const mayor = u["open"] < u["close"] ? u["open"] : u["close"];
  const theme =
    u["open"] - u["close"] < 0 ? color.candleRed : color.candleGreen;

  return (
    <>
      <rect
        x={u["posX"]}
        y={mayor}
        width={Math.abs(marginCandles)}
        height={Math.abs(u["open"] - u["close"])}
        fill={theme}
      />

      <line
        x1={u["posX"] + marginCandles / 2}
        y1={u["maximo"]}
        x2={u["posX"] + marginCandles / 2}
        y2={u["minimo"]}
        stroke={theme}
        strokeWidth={0.6}
      />
    </>
  );
}
