import { useEffect, useRef } from 'react';
interface UseOutsideClickProps {
  handler: () => void;
  listenCapturing: boolean;
}

export function useOutsideClick<T extends HTMLElement>({
  handler,
  listenCapturing,
}: UseOutsideClickProps) {
  const ref = useRef<T>(null);
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    }
    document.addEventListener('click', handleClick, listenCapturing);
    return () =>
      document.removeEventListener('click', handleClick, listenCapturing);
  }, [handler, listenCapturing]);
  return ref;
}
