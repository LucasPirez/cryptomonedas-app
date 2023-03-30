import { useState, useEffect } from "react";

export default function useConstansGrafic() {
  const height = 400;
  const margin = { top: 40, right: 30, bottom: 50, left: 40 };

  const [width, setWidth] = useState(null);

  useEffect(() => {
    const inner =
      window.innerWidth > 1100
        ? window.innerWidth * 0.65
        : window.innerWidth * 0.9;
    setWidth(inner);

    const res = window.addEventListener("resize", () => {
      const resizewidth =
        window.innerWidth > 1100
          ? window.innerWidth * 0.65
          : window.innerWidth * 0.9;

      setWidth(resizewidth);
    });

    return () => window.removeEventListener("resize", res);
  }, []);

  return { width, height, margin };
}
