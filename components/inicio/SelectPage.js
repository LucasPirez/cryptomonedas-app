import { useState, useEffect } from "react";

import { color } from "../../styles/colors";
import Button from "../Button";
import { useRouter } from "next/router";

export default function SelectPage({ route, max, setCount }) {
  const { push, query } = useRouter();
  const [numberquery, setNumberquery] = useState(1);

  useEffect(() => {
    window.scrollTo({ top, behavior: "smooth" });
    setCount(() => 25);
  }, [numberquery]);

  function handlesumClick(e, val) {
    e.preventDefault();
    setNumberquery(numberquery + val);
    push(`/${route}/${numberquery + val}`);
  }

  function handleRestClick(e, val) {
    e.preventDefault();
    setNumberquery(numberquery - val);
    push(`/${route}/${numberquery - val}`);
  }

  function handleClickValue(e, val) {
    e.preventDefault();
    setNumberquery(val);
    push(`/${route}/${val}`);
  }

  return (
    <>
      <div>
        {numberquery > 1 && (
          <Button onClick={(e) => handleRestClick(e, 1)}>
            <span>PREV</span>
          </Button>
        )}
        {numberquery > 3 && (
          <Button onClick={(e) => handleClickValue(e, 1)}>
            <span>1</span>
          </Button>
        )}
        <Button
          select={true}
          onClick={(e) => handleClickValue(e, e.target.value)}
        >
          <span>{numberquery}</span>
        </Button>
        {numberquery < max && (
          <Button onClick={(e) => handlesumClick(e, 1)} value={numberquery + 1}>
            <span>{numberquery + 1}</span>
          </Button>
        )}
        {numberquery < max - 1 && (
          <Button onClick={(e) => handlesumClick(e, 2)}>
            <span>{numberquery + 2}</span>
          </Button>
        )}

        <span>...</span>
        <Button onClick={(e) => handleClickValue(e, max)}>
          <span>{max}</span>
        </Button>
        {numberquery < max && (
          <Button onClick={(e) => handlesumClick(e, 1)}>
            <span>NEXT</span>
          </Button>
        )}
      </div>
      <style jsx>{`
        div {
          text-align: center;
          margin: 15px 0;
          width: 100%;
        }
        span {
          font-family: monospace;
          font-weight: 600;
          font-size: 1.3em;
          padding: 0.4em 0.5em;
          transition: color 0.3s;
        }

        span:hover {
          color: ${color.lightBlue};
        }
      `}</style>
    </>
  );
}
