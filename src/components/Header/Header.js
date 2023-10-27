import { useState } from 'react'
import Link from 'next/link'
import { color } from '../../styles/colors'
import ArrowLeft from '../Icons/Arrowleft'
import { useRouter } from 'next/router'
import useClick from '../../hook/useClick'
import { useSelector } from 'react-redux'
import RenderSelectCurrency from './RenderSelectCurrency'

export default function Header() {
  const router = useRouter()
  const path = router.asPath
  const [hidden, setHidden] = useState(true)

  const { page: criptoPage } = useSelector((state) => state.criptoList)
  const { page: exchagesPage } = useSelector((state) => state.exchangesList)

  const handleClick = () => {
    setHidden(true)
  }

  const { ref } = useClick(handleClick)

  async function handleBack(e) {
    e.preventDefault()
    router.back()
  }

  return (
    <>
      <nav ref={ref}>
        <button onClick={handleBack}>
          <ArrowLeft />
        </button>
        <h2>Crypto Tracker</h2>
        <div className='hamburguer' onClick={() => setHidden(!hidden)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`ul_container ${!hidden ? 'mostrar' : ''}`}>
          <ul>
            <li className={path.includes('/criptos') ? 'select' : ''}>
              <Link href={`/criptos/${criptoPage || 1}`}>
                <a>table</a>
              </Link>
            </li>
            <li className={path.includes('/favorites/') ? 'select' : ''}>
              <Link href={'/favorites'}>
                <a>Favorites</a>
              </Link>
            </li>
            <li className={path.includes('/exchanges/1') ? 'select' : ''}>
              <Link href={`/exchanges/${exchagesPage || 1}`}>
                <a>Exchanges</a>
              </Link>
            </li>
          </ul>
          <RenderSelectCurrency />
        </div>
      </nav>

      <style jsx>{`
        nav {
          position: relative;
          display: flex;
          width: 100%;
          height: 10vh;
          min-height: 60px;
          align-items: center;
          justify-content: space-around;
          background: ${color.background};
          border-bottom: 2px solid ${color.letters}70;
          box-shadow: rgba(50, 50, 93, 0.1) 0px 3px 3px -1px,
            rgba(0, 0, 0, 0.1) 0px 3px 5px -1px;
        }

        button {
          position: absolute;
          bottom: 0px;
          left: 10px;
          border: none;
          background: transparent;
          cursor: pointer;
          stroke: black;
        }
        button:hover > :global(svg) {
          stroke: ${color.bitcoin};
        }
        h2 {
          display: inline-block;
          color: ${color.letters};
        }
        ul {
          display: flex;
          margin: 0 10px 0 0;
          width: auto;
          height: 100%;
          align-items: flex-end;
          justify-content: flex-end;
          list-style: none;
        }
        li {
          position: relative;
          font-size: 1.14em;
          text-decoration: none;
          color: ${color.letters};
          font-weight: 600;
          padding: 0.3em 0.8em;
          border-radius: 6px;
          transition: all 0.7s;
        }

        li:before {
          content: '';
          width: 80%;
          height: 2px;
          position: absolute;
          bottom: 0;
          left: 10%;
          background: ${color.letters};
          transform: scale(0);
          transition: all 0.25s;
          transform-origin: left;
        }

        li:hover:before {
          transform: scale(1);
        }

        .hamburguer {
          position: absolute;
          width: auto;
          visibility: hidden;
          height: auto;
        }

        .hamburguer > div {
          width: 24px;
          height: 2.4px;
          margin: 4px;
          background: ${color.letters};
        }

        .select {
          border-radius: 4px;
          border: solid 1px ${color.blue}70;
          color: ${color.blue};
          box-shadow: rgba(0, 0, 0, 0.18) 0px 3px 4px;
        }

        .select:before {
          content: '';
          height: 0;
        }

        .ul_container {
          display: flex;
          align-items: center;
        }

        @media (max-width: 800px) {
          .ul_container {
            flex-direction: column;
            position: absolute;
            top: 0;
            right: 0;
            padding: 23px 5px;
            background: ${color.background};
            visibility: hidden;
            transform: scaleX(0);
            z-index: 999;
            transition: transform 0.3s;
            border-radius: 5px;
            transform-origin: top right;
            box-shadow: 0px 3px 5px 1px ${color.letters}30;
          }
          ul {
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            padding: 0 0.8rem;
          }
          li {
            font-size: 1.14rem;
            width: 100px;
            height: 30px;
            padding: 0.4em 0.3em 1.7em;
            margin: 0.5rem;
          }

          .hamburguer {
            visibility: visible;
            top: 37%;
            right: 5%;
            cursor: pointer;
          }
          .mostrar {
            visibility: visible;
            transform: scaleX(1);
          }
        }
      `}</style>
    </>
  )
}
