import Image from "next/image";
import { color } from "../../styles/colors";

export default function RowExchanges({ data, bitcoinPrice = 1 }) {
  const {
    id,
    name,
    country,
    url,
    image,
    trustScore,
    trustScoreRank,
    tradeVolume24hBTC,
    tradeVolume24hBTCNormalized,
    description,
  } = data;
  return (
    <>
      <td>{trustScoreRank}</td>
      <td className="container_name">
        <Image src={`${image}`} alt="" width={20} height={20} />
        <span style={{ fontSize: "1.1em", fontWeight: "600" }}>{name}</span>
      </td>
      <td>
        <div className="trust_visual">
          <div></div>
        </div>
        <span>{trustScore}</span>
      </td>
      <td className="bitcoin_covert">
        <p>${(tradeVolume24hBTCNormalized * bitcoinPrice).toLocaleString()}</p>
      </td>
      <td className="bitcoin_covert">
        <p>${(tradeVolume24hBTC * bitcoinPrice).toLocaleString()}</p>
      </td>
      <td className="td_description">
        {description !== "" ? (
          <>
            <span>Read Description</span>
            <p>
              <strong>{name}</strong>
              {description}
            </p>
          </>
        ) : (
          ""
        )}
      </td>

      <style jsx>
        {`
          td {
            width: 250px;
            height: 80px;
            min-width: 40px;
            text-align: center;
            padding: 5px;
            color: ${color.letters};
            transition: all 0.3s;
            padding: 10px;
          }
          span::selection,
          p::selection {
            background: ${color.letters};
            color: ${color.background};
          }

          p > strong {
            text-align: center;
            display: block;
            margin-bottom: 5px;
            border-bottom: 1px solid ${color.bitcoin};
          }
          .container_name {
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }

          .container_name > span {
            margin-left: 7px;
          }

          .trust_visual {
            display: inline-flex;
            flex-wrap: wrap;
            width: 80px;
            height: 8px;
            background: ${color.background};
            border-radius: 999px;
          }

          .trust_visual > div {
            width: ${trustScore}0%;
            height: 100%;
            border-radius: 999px;
            background: ${color.blue};
          }
          .trust_visual ~ span {
            margin: 0 10px;
          }

          .bitcoin_covert {
            min-width: 80px;
          }

          .td_description {
            position: relative;
          }

          .td_description > p {
            text-align: left;
            position: absolute;
            visibility: hidden;
            top: -18px;
            right: 20px;
            width: 350px;
            max-height: 220px;
            padding: 25px;
            border-radius: 5px;
            background: ${color.background};
            transition: opacity 0.5s;
            opacity: 0;
            z-index: 99;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            overflow: auto;
          }

          .td_description:hover > p {
            visibility: visible;
            opacity: 1;
          }

          @media (max-width: 900px) {
            .container_name {
              position: sticky;
              background: ${color.background};
              left: 0px;
              width: 110px;
            }
          }
        `}
      </style>
    </>
  );
}
