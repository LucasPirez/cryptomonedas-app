import { useState, useEffect } from "react";
import Login from "./Login";

export default function LoginLogout() {
  const [visible, setVisible] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();

    setVisible(!visible);
  };
  return (
    <>
      <div>
        <button onClick={handleClick}>Login/logOUt</button>
        {visible && <Login />}
      </div>
      <style jsx>{``}</style>
    </>
  );
}
