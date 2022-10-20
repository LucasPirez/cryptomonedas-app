import { useState, useEffect } from "react";
import { color } from "../../styles/colors";
import Star from "../Icons/Star";

export default function AddDeleteFavorite({
  data,
  yes,
  no,
  setOpacity,
  scale,
}) {
  // localStorage.removeItem("favorites_coin");
  const local = localStorage.getItem("favorites_coin")
    ? JSON.parse(localStorage.getItem("favorites_coin")).includes(data)
    : false;
  const [fill, setFill] = useState(local);

  const favorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const local = JSON.parse(localStorage.getItem("favorites_coin")) || [];

    if (local === null) {
      localStorage.setItem("favorites_coin", JSON.stringify(data));
      setFill(true);
      setOpacity && setOpacity(true);
    } else {
      local.push(data);

      localStorage.setItem("favorites_coin", JSON.stringify(local));
      setFill(true);
      setOpacity && setOpacity(true);
    }
  };
  const delete_favorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const local = JSON.parse(localStorage.getItem("favorites_coin"));

    const result = local.filter((u) => u !== data);

    localStorage.setItem("favorites_coin", JSON.stringify(result));

    setFill(false);
    setOpacity && setOpacity(false);
  };

  return (
    <>
      {fill ? (
        <button className="fill" onClick={delete_favorite}>
          <Star scale={scale} />
        </button>
      ) : (
        <button className="no_fill" onClick={favorite}>
          <Star scale={scale} />
        </button>
      )}
      <style jsx>
        {`
          button {
            background: transparent;
            border: none;
          }
          .no_fill > :global(svg) {
            stroke: ${color.letters};
            fill: ${no};
          }
          .fill > :global(svg) {
            stroke: ${color.letters};
            fill: ${yes};
          }
        `}
      </style>
    </>
  );
}
