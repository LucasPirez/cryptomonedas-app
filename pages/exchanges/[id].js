import { useState, useEffect } from "react";
import { exchangesList } from "../../client/client";
import Head from "next/head";
import Exchanges from "../../components/exchanges";

export default function ExchangePage() {
  return (
    <>
      <section>
        <Exchanges />
      </section>

      <style jsx>{``}</style>
    </>
  );
}
