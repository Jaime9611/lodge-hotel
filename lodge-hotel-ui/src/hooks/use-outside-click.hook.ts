import { useEffect, useRef } from "react";

export const useOutsideClick = <T extends HTMLElement>(
  handle: () => void,
  listenCapturing: boolean = true
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (e: globalThis.MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target)) handle();
    };

    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [close]);

  return ref;
};
