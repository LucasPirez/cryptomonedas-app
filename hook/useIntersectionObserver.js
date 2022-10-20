import { useState, useEffect, useRef } from "react";

export default function useIntersectionObserver() {
  const [count, setCount] = useState(25);
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const copyRef = ref.current;
    const callback = (entries) => {
      const element = entries[0];
      console.log(element.isIntersecting);
      console.log(count);
      if (element.isIntersecting) {
        setVisible(element.isIntersecting);
        setCount(count + 25);
      }
      if (count > 90) {
        observer.disconnect();
      }
    };

    const observer = new IntersectionObserver(callback, { rootMargin: "3px" });

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (copyRef) observer.unobserve(copyRef);
    };
  }, [ref, count, visible]);

  return {
    container: ref,
    count,
    setCount,
    visible,
  };
}
