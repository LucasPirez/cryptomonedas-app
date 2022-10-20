import React, { useState, useEffect } from "react";
import ListFavorites from "../../components/favorites/ListFavorites";

export default function Favorites() {
  const [favorites, setFavorites] = useState(null);
  useEffect(() => {
    const listFavorites = localStorage.getItem("favorites_coin");
    setFavorites(listFavorites);
  }, []);

  return (
    <>
      <section className="container">
        <h1>Favorites</h1>
        {favorites && <ListFavorites favorites={JSON.parse(favorites)} />}
      </section>
      <style jsx>
        {`
          .container {
            display: grid;
            width: 100vw;
            justify-content: center;

            padding: 10px;
          }
        `}
      </style>
    </>
  );
}
