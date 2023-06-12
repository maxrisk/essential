import { useEffect, useState } from 'react';

export default function useDebounceValue(val: any, idle: number) {
  const [debounceValue, setValue] = useState(val);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(val);
    }, idle);

    return () => {
      clearTimeout(timer);
    };
  }, [idle, val]);

  return debounceValue;
}
