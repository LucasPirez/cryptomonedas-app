import { useState, useEffect } from "react";
import SignUp from "./SignUp";

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
        {visible && <SignUp />}
      </div>
      <style jsx>{``}</style>
    </>
  );
}
