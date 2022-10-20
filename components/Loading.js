import { color } from "../styles/colors";

export default function Loading() {
  return (
    <>
      <div className="container">
        <div className="circulo"></div>
        <div className="circulo2"></div>
        <div className="circulo3"></div>
      </div>
      <style jsx>
        {`
          .container {
            position: absolute;
            top: 50%;
            left: 49%;
            display: flex;
            align-items: center;
            width: auto;
            height: auto;
          }

          .circulo {
            margin: 0 3px;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: ${color.candleRed};
            animation: loader 2s linear infinite;
          }

          .circulo2 {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: ${color.candleRed};
            animation: loader 2s linear infinite;
            animation-delay: 0.6s;
            margin: 0 3px;
          }

          .circulo3 {
            width: 15px;
            margin: 0 3px;
            height: 15px;
            border-radius: 50%;
            background: ${color.candleRed};
            animation: loader 2s linear infinite;
            animation-delay: 1.2s;
          }

          @keyframes loader {
            0%,
            100% {
              transform: scale(0);
              opacity: 0;
            }
            50% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
}
