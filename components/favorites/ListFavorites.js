import React, { useState, useEffect } from "react";
import { oneCoin } from "../../client/client";
import { color } from "../../styles/colors";
import TableComponent from "../utilities/TableComponent";
import RowFavorites from "./RowFavorites";

export default function ListFavorites({ favorites }) {
  const [favoritesFetch, setFavoritesFetch] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count++);
    if (count < 2) {
      setFavoritesFetch((favoritesFetch) => []);
      favorites.map((u) => {
        (async () => {
          const response = await oneCoin(u);
          setFavoritesFetch((favoritesFetch) => [...favoritesFetch, response]);
        })();
      });
    }
  }, []);

  return (
    <>
      <div className="container">
        {favoritesFetch.length ? (
          <>
            <table>
              <thead>
                <tr className="local_tr">
                  <TableComponent />
                </tr>
              </thead>
              <tbody>
                {favoritesFetch.map((u, i) => (
                  <RowFavorites data={u} key={u.id} />
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <h3>you don&apos;t have favorites yet </h3>
        )}
      </div>
      <style jsx>{`
        table {
          position: relative;
          background: "white";
          border-collapse: collapse;
        }
        .container {
          max-width: 1150px;
          width: auto;
          overflow-x: auto;
        }

        .container::-webkit-scrollbar {
          display: none;
          width: 10px;
          height: 10px;
          background-color: lightblue;
        }
        .container:hover::-webkit-scrollbar {
          display: initial;
        }
        .container::-webkit-scrollbar-thumb {
          background-color: #09c;
        }

        .local_tr {
          height: 50px;
          border-bottom: 2px solid ${color.letters}50;
          cursor: pointer;
          transition: all 0.3s;
          width: 100%;
        }
      `}</style>
    </>
  );
}
