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
          <br />

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
          <br />

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
          gap: 40px;
        }
        .container {
          width: minmax(350px, 550px);
        }
      `}</style>
    </>
  );
}
