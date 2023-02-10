import { useState, useEffect } from "react";
import Link from "next/link";
import { color } from "../../styles/colors";
import ArrowLeft from "../Icons/Arrowleft";
import { useRouter } from "next/router";
import SelectCurrency from "./SelectCurrency";
import useAppContext from "../../context/TableContext";
import useClick from "../../hook/useClick";
import LoginLogout from "../user/LoginLogout";
import SesionItit from "../user/SesionInit";
import { useSelector } from "react-redux";

export default function Header() {
  const router = useRouter();
  const { numberActualState } = useAppContext();
  const path = router.asPath;
  const [hidden, setHidden] = useState(true);
  const handleClick = () => {
    setHidden(true);
  };
  const { criptos, exchanges } = useSelector((state) => state.pagination);
  const ref = useClick(handleClick);
  return (
    <>
      <nav ref={ref}>
        <button onClick={() => router.back()}>
          <ArrowLeft />
        </button>
        <h2>Crypto Tracker</h2>
        <div className="hamburguer" onClick={() => setHidden(!hidden)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`ul_container ${!hidden ? "mostrar" : ""}`}>
          <ul>
            <li className={path.includes("/criptos") ? "select" : ""}>
              <Link href={`/criptos/${criptos || 1}`}>
                <a>table</a>
              </Link>
            </li>
            <li className={path.includes("/favorites/") ? "select" : ""}>
              <Link href={"/favorites"}>
                <a>Favorites</a>
              </Link>
            </li>
            <li className={path.includes("/exchanges/1") ? "select" : ""}>
              <Link href={`/exchanges/${exchanges || 1}`}>
                <a>Exchanges</a>
              </Link>
            </li>
            <li>
              <LoginLogout />
            </li>
            <li></li>
          </ul>
          <SelectCurrency />
        </div>
      </nav>
      <SesionItit />

      <style jsx>{`
        nav {
          position: relative;
          display: flex;
          width: 100%;
          height: 12vh;
          align-items: center;
          justify-content: space-around;
          background: ${color.reduceBackground}50;
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
          font-size: 1.14em;
          text-decoration: none;
          color: ${color.blue};
          padding: 0.4em 0.8em 0.7em;
          border-radius: 6px;
          transition: transform 0.3s;
        }

        li:hover {
          transform: scale(1.1);
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
          background: ${color.letters};
          color: ${color.lightBlue};
        }

        .ul_container {
          display: flex;
          align-items: center;
        }

        @media (max-width: 800px) {
          .ul_container {
            border: 2px solid ${color.letters}80;
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

          li:hover {
            opacity: 0.86;
            transform: scale(1.1);
          }
          .ul_container {
            flex-direction: column;
            position: absolute;
            top: 64%;
            right: 5%;
            padding: 5px;
            background: ${color.reduceBackground};
            visibility: hidden;
            transform: scale(0);
            z-index: 999;
            transition: transform 0.3s;
            border-radius: 5px;
            transform-origin: top right;
          }

          .hamburguer {
            visibility: visible;
            top: 37%;
            right: 5%;
          }
          .mostrar {
            visibility: visible;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
