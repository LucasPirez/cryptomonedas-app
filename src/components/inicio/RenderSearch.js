import Link from 'next/link'
import { color } from '../../styles/colors'

export default function RenderSearch({ cripto }) {
  const { name, symbol, id } = cripto
  return (
    <>
      <div className='map'>
        <Link href={`/coin/${id}`}>
          <a>
            <p className='names'>
              <span>{symbol.toUpperCase()} - </span>
              {name}
            </p>
          </a>
        </Link>
      </div>
      <style jsx>{`
        .map {
          width: 100%;
          height: 39px;
          margin: 0px;
          border: 1px solid #000;
          background: ${color.letters};
          transition: all 0.25s;
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .map:hover {
          box-shadow: #eaeaea30 0px 0px 34px 6px inset;
        }

        .names {
          margin-left: 2rem;

          color: ${color.lightBlue};
        }
        .names span {
          color: ${color.lightBlue}90;
        }
      `}</style>
    </>
  )
}
