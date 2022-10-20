import { useState, useEffect } from "react";

import "../styles/globals.css";
import { AppContextProvider } from "../context/TableContext";
import GlobalHeader from "../components/Header/GlobalHeader";
import Header from "../components/Header/Header";
import { CurrencyLightProvider } from "../context/CurrencyLightContext";

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <CurrencyLightProvider>
        <GlobalHeader />
        <Header />
        <Component {...pageProps} />
      </CurrencyLightProvider>
    </AppContextProvider>
  );
}

export default MyApp;
