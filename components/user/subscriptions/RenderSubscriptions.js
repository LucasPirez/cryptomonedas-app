import TipeSubscriptions from "./TipeSubscriptions";

export default function RenderSubscriptions() {
  return (
    <>
      <section>
        <div className="title_container">
          <h2>CrytoTracker Premium</h2>
          <p>
            Monitor the crypto markets distraction-free and stay ahead of the
            curve. Support independent data for the crypto space!
          </p>
        </div>
        <div className="tipe_subscription_container">
          <TipeSubscriptions />
        </div>
      </section>
      <style jsx>{``}</style>
    </>
  );
}
