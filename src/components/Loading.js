import { color } from '../styles/colors'

export default function Loading() {
  return (
    <>
      <div className='container'>
        <div className='circulo'></div>
        <div className='circulo2'></div>
        <div className='circulo3'></div>
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

          .circulo,
          .circulo2,
          .circulo3 {
            margin: 0 6px;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: ${color.candleRed};
            animation: loader 1.7s linear infinite;
          }

          .circulo2 {
            animation-delay: 0.6s;
          }

          .circulo3 {
            animation-delay: 1.2s;
          }

          @keyframes loader {
            0%,
            100% {
              transform: scale(0.7);
              opacity: 0.6;
            }
            50% {
              transform: scale(1.5);
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  )
}
