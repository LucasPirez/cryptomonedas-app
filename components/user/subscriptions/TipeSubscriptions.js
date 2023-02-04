import { color } from "../../../styles/colors";

export default function TipeSubscriptions() {
  return (
    <>
      <section>
        <div className="container">
          <h3>Free</h3>
          <p>
            CrytoTracker as it is - perfect for anyone looking to get a
            360-overview on the crypto markets
          </p>
          <span className="price">$0.00/lifeTime</span>

          <button>Current Plan</button>

          <h4>Top Features</h4>

          <ul>
            <li>
              <strong> Live prices, charts & historical data </strong>on over
              12000+ cryptocurrencies.
            </li>
            <li>
              <strong>Redeem daily Candies </strong>For swags and goodies!
            </li>
            <li>
              <strong> Portfolio </strong>
              Track your holdings. Synced across all devices.
            </li>
            <li>
              <strong> Android & iOS ready </strong> its comming!!!
            </li>
          </ul>
        </div>
        <div className="container">
          <h3>Premium</h3>
          <p>
            For the more demanding, powerful crypto enthusiasts looking for an
            edge in the markets.
          </p>
          <span className="price">$41.66 /mo</span>

          <button>Upgrade to Premium</button>

          <h4>Everything in Free, plus:</h4>

          <ul>
            <li>
              <strong>Exclusive research articles </strong> - Access exclusive
              research articles prepared by our analysts published every week!
            </li>
            <li>
              <strong>Ad-free </strong>- CryptoTracker
            </li>
            <li>
              <strong> Weekly Roundup </strong>- Too busy to follow our daily
              newsletters? Our weekly roundup summarizes the most important bits
              for you!
            </li>
            <li>
              <strong> Even more Candies </strong> (1.2x) - Maximize your crypto
              experience!
            </li>
          </ul>
        </div>
      </section>

      <style jsx>{`
        section {
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          gap: 40px;
          flex-wrap: wrap;
          padding: 3rem;
        }
        h3 {
          font-size: 2rem;
          line-height: 0.4rem;
        }

        span {
          font-size: 2.7rem;
          font-weight: bold;
          margin-top: 2rem;
        }

        button {
          padding: 1.4rem;
          width: 80%;
          border: none;
          background: ${color.candleGreen};
          color: #fff;
          font-size: 1.2rem;
          margin: 1.5rem 0 2rem 0;
          opacity: 0.8;
          transition: all 0.3s;
          cursor: pointer;
          border-radius: 5px;
          box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px,
            rgba(0, 0, 0, 0.24) 0px 1px 2px;
        }
        button:hover {
          opacity: 1;
          box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 2px,
            rgba(0, 0, 0, 0.24) 0px 2px 2px;
        }

        h4 {
          font-size: 1.6rem;
        }

        li {
          margin-bottom: 2rem;
        }

        .container {
          max-width: 450px;
          min-width: 380px;
          height: 840px;
          display: flex;
          flex-direction: column;
          align-items: center;
          border-radius: 5px;
          box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px,
            rgba(0, 0, 0, 0.24) 0px 1px 2px;
          border-top: 30px solid #4a4a4a;
          padding: 0 2.4rem;
        }
      `}</style>
    </>
  );
}
