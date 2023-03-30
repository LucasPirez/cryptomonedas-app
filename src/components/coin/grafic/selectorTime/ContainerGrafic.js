import { scaleLinear, scaleTime, line, extent } from "d3";
import useConstansGrafic from "../../../../hook/useConstansGrafic";
import SvgTime from "./SvgTime";

export default function ContainerTimeGrafic({ data }) {
  const { width, margin } = useConstansGrafic();

  const xScale = scaleTime()
    .domain(extent(data, (d) => d[0]))
    .range([margin.left, width]);

  const yScale = scaleLinear()
    .domain(extent(data, (d) => d[1]))
    .range([76, 4]);

  const lineGrafic = line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]));

  return (
    <>
      <div
        style={{
          width: `${width}px`,
          height: "80px",
        }}
      >
        <SvgTime
          lineGrafic={lineGrafic}
          xScale={xScale}
          yScale={yScale}
          dataHistoric={data}
        />
      </div>
    </>
  );
}
