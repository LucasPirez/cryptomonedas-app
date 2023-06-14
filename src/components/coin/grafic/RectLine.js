import { memo } from 'react'

const RectLine = memo(function RectLine({
  marginCandles,
  color,
  dataScale,
  width
}) {
  return (
    <>
      {dataScale.map((u, i) => {
        const mayor = u.open < u.close ? u.open : u.close
        const theme = u.open - u.close < 0 ? color.candleRed : color.candleGreen
        return (
          <g key={i}>
            <rect
              x={u.posX}
              y={mayor}
              width={Math.abs(marginCandles)}
              height={Math.abs(u.open - u.close)}
              fill={theme}
            />

            <line
              x1={u.posX + marginCandles / 2}
              y1={u.maximo}
              x2={u.posX + marginCandles / 2}
              y2={u.minimo}
              stroke={theme}
              strokeWidth={0.6}
            />
          </g>
        )
      })}
    </>
  )
},
arePropsEqual)

function arePropsEqual(prevProps, nextProps) {
  if (
    prevProps.length !== nextProps.length ||
    prevProps.marginCandles !== nextProps.marginCandles ||
    prevProps.width !== nextProps.width
  ) {
    return false
  }
  for (let i = 0; i < prevProps.length / 2; i++) {
    if (
      prevProps[i].posX !== nextProps[i].posX ||
      prevProps[i].open !== nextProps[i].open ||
      prevProps[i].close !== nextProps[i].close ||
      prevProps[i].maximo !== nextProps[i].maximo ||
      prevProps[i].minimo !== nextProps[i].minimo
    ) {
      return false
    }
  }
  return true
}

export default RectLine

// export default function RectLine({ marginCandles, color, dataScale }) {
//   console.log(marginCandles)
//   return (
//     <>
//       {dataScale.map((u, i) => {
//         const mayor = u.open < u.close ? u.open : u.close
//         const theme =
//           u.open - u.close < 0
//             ? `rgb(${Math.random() * 250},${Math.random() * 250},${
//                 Math.random() * 250
//               }`
//             : color.candleGreen
//         return (
//           <g key={i}>
//             <rect
//               x={u.posX}
//               y={mayor}
//               width={Math.abs(marginCandles)}
//               height={Math.abs(u.open - u.close)}
//               fill={theme}
//             />

//             <line
//               x1={u.posX + marginCandles / 2}
//               y1={u.maximo}
//               x2={u.posX + marginCandles / 2}
//               y2={u.minimo}
//               stroke={theme}
//               strokeWidth={0.6}
//             />
//           </g>
//         )
//       })}
//     </>
//   )
// }
