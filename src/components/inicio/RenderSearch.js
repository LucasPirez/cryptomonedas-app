import Link from 'next/link'
import { color } from '../../styles/colors'

export default function RenderSearch({ u }) {
  return (
    <>
      <div className='map'>
        <Link href={`/coin/${u}`}>
          <a>
            <p className='names'>{u}</p>
          </a>
        </Link>
      </div>
      <style jsx>{` .map {
          width: 100%;
          height: 39px;
          margin: 0px;
          border: 1px solid #000;
          background: ${color.letters}
          transition: all 0.3s;
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .map:hover {
          background: ${color.lightBlue};
        }
        .map:hover  .names {
          color: ${color.letters};
        }
        .names{
          margin-left: 2rem;

          color: ${color.lightBlue};
        }`}</style>
    </>
  )
}
