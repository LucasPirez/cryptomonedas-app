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
          color: var(--text-color);
          font-weight: 500;
          border: solid 1px var(--surface-200);
          background: var(--surface-50);
          transition: all 0.25s;
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .map:hover {
          box-shadow: #00000010 0px 0px 34px 6px inset;
        }

        .names {
          margin-left: 2rem;
          color: var(--text-color);
        }
        .names span {
          color: var(--bitcoin);
        }
      `}</style>
    </>
  )
}
