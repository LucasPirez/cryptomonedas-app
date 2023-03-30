import { useState, useContext, createContext, children } from "react";

export const CurrencyContext = createContext(null);

export function CurrencyLightProvider({ children }) {
  const [lightDark, setLightDark] = useState("light");
  const [currencySelect, setCurrencySelect] = useState("usd");

  const data = {
    setLightDark,
    lightDark,
    setCurrencySelect,
    currencySelect,
  };

  return (
    <CurrencyContext.Provider value={data}>{children}</CurrencyContext.Provider>
  );
}

export default function useCurrencyLightContext() {
  const context = useContext(CurrencyContext);

  if (!context) {
    console.log("error al desplegar el contexto");
  }

  return context;
}
