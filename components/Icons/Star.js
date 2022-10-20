import * as React from "react";

const SvgComponent = (props) => (
  <svg height={21} width={21} xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="m10.5 14.5-5 3 2-5.131-4-3.869h5l2-5 2 5h5l-4 4 2 5z"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform={props.scale ? `scale(${props.scale})` : "scale(1)"}
    />
  </svg>
);

export default SvgComponent;
