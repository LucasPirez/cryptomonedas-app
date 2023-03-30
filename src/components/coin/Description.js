import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Description({ data, name }) {
  const [text, setText] = useState([]);

  useEffect(() => {
    let str = "";
    console.log(
      data.en.replaceAll(
        '<a href="https://www.coingecko.com/en/coins/',
        "routerPush"
      )
    );

    console.log(str);
  }, []);

  return (
    <>
      <div className="container">
        <h2>Who is {name}?</h2>
      </div>
      <p>{data.en}</p>

      <style jsx>
        {`
          h2 {
            align-text: left;
          }
          .container {
            width: 80%;
            height: auto;
          }
        `}
      </style>
    </>
  );
}
