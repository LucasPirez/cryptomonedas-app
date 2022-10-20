import { useRef, useEffect } from "react";

export default function useClick(callback) {
  const ref = useRef();

  useEffect(() => {
    const event = document.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    });
    return () => {
      document.removeEventListener("click", event);
    };
  }, [ref]);

  return ref;
}
