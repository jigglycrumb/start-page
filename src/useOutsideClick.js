import { useEffect } from "react";

const useOutsideClick = (elementRef, callback) => {
  useEffect(() => {
    const handleOutsideClick = event => {
      if (!elementRef?.current?.contains(event.target)) {
        callback(event);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick, false);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick, false);
    };
  }, [elementRef, callback]);
};

export { useOutsideClick };
