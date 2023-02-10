import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pagination } from "../client/client";
import { coinReduceTable } from "../redux/features/listCriptos";
import { useRouter } from "next/router";
import {
  incrementCripto,
  decrementCripto,
  incrementExchange,
  decrementExchange,
  valueExchanges,
  valueCripto,
} from "../redux/features/pagination";

export const useFetch = (endpoint, reInitCount) => {
  const { [endpoint]: page } = useSelector((state) => state.pagination);
  const dispatch = useDispatch();
  const { push } = useRouter();
  useEffect(() => {
    window.scrollTo({ top });
    push(`/${endpoint}/${page}`);
    (async () => {
      if (endpoint === "criptos") {
        try {
          const response = await pagination(page, "usd");
          dispatch(coinReduceTable(response));
        } catch (error) {
          console.log(error);
        }
      }
    })();
    reInitCount();
  }, [page]);

  function handlesumClick(e) {
    e.preventDefault();

    if (endpoint === "criptos") {
      dispatch(incrementCripto());
    } else {
      dispatch(incrementExchange());
    }
  }

  function handleRestClick(e) {
    e.preventDefault();

    if (endpoint === "criptos") {
      dispatch(decrementCripto());
    } else {
      dispatch(decrementExchange());
    }
  }

  function handleClickValue(e, val) {
    e.preventDefault();

    if (endpoint === "criptos") {
      dispatch(valueCripto(val));
    } else {
      dispatch(valueExchanges(val));
    }
  }
  return {
    handleClickValue,
    handleRestClick,
    handlesumClick,
    page,
  };
};
