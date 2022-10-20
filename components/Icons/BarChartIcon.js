import * as React from "react";

const SvgComponent = (props) => (
  <svg height={21} width={21} xmlns="http://www.w3.org/2000/svg" {...props}>
    <g
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="scale(1.2)"
    >
      <path d="M3.5 3.5v12a2 2 0 0 0 2 2H17M6.5 11.5v3M10.5 8.5v6M14.5 5.5v9" />
    </g>
  </svg>
);

export default SvgComponent;
