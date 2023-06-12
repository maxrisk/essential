import { RefObject, useEffect } from 'react';

function useClickOutside(ref: RefObject<HTMLElement>, handler: () => void) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (event.target instanceof Node) {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler();
      }
    };

    document.addEventListener('click', listener);
  }, [handler, ref]);
}

export default useClickOutside;
