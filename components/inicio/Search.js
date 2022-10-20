import { json } from "d3";
import { makePublicRouterInstance, Router } from "next/router";
import { useState, useEffect } from "react";
import { lista } from "../../client/client";
import useClick from "../../hook/useClick";
import { color } from "../../styles/colors";
import Link from "next/link";

export default function Search() {
  const [list, setList] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const ref = useClick(() => setSearch(""));

  const text = (e) => {
    const { value } = e.target;

    setSearch(value);
    const arr = [];
    if (search.length > 1) {
      list.map((u) => {
        if (u.includes(search)) {
          arr.push(u);
        }
      });

      arr.sort((a, b) => {
        return a.length - b.length;
      });

      setFilter(arr);
    }
    if (search.length === 0) {
      setFilter([]);
    }
  };

  useEffect(() => {
    const arr = [];
    // localStorage.removeItem("listSearch");
    const storage = JSON.parse(localStorage.getItem("listSearch"));
    if (storage) {
      setList(storage);
    }

    if (localStorage.getItem("listSearch") === null) {
      if (search.length > 1) {
        lista().then((data) => {
          console.log(data);
          data.map((u, i) => arr.push(u.id.toLowerCase()));
          localStorage.setItem("listSearch", JSON.stringify(arr));
          setList(arr);
        });
      }
    }
  }, [search]);
  console.log(search);
  return (
    <>
      <div className="container" ref={ref}>
        <div className="container_input">
          <input
            type="text"
            value={search}
            onChange={text}
            className="input"
            placeholder="Search"
          />
          {search.length > 2 && (
            <div className="sub_container">
              {filter.length &&
                filter.map((u) => (
                  <div key={u} className="map">
                    <Link href={`/coin/${u}`}>
                      <a>
                        <p className="names">{u}</p>
                      </a>
                    </Link>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .container{
          width:100%;
          height:auto;
        
        }
          
        .container_input{
          margin: 40px auto;
         max-width:700px;
         width:auto;
         position:relative;
         
        }

        .input{
          font-size:1.2em;
          width:100%;
          outline:none;
         padding:0.3em 0.5em;
         background:${color.letters};
         color:${color.reduceBackground};
         border: 1.5px solid ${color.letters};
         border-radius:3px;
        }
        .input::placeholder{
          color:${color.background}90;
          color:${color.reduceBackground}96
        }
        .input:focus{
       box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
          border: 1.5px solid ${color.blue};
         
        }

        .sub_container {
          margin:auto;
          width:100%;
          height: 400px;
          position:absolute;
          background: ${color.letters};
          z-index: 9;
          overflow: auto;
        }
        .map {
          width: 100%;
          height: 39px;
          margin: 0px;
          border: 1px solid #000;
          background: ${color.letters}
          transition: all 0.3s;
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .map:hover {
          background: ${color.lightBlue};
        }
        .map:hover  .names {
          color: ${color.letters};
        }
        .names{
          margin-left: 2rem;

          color: ${color.lightBlue};
        }
      `}</style>
    </>
  );
}
