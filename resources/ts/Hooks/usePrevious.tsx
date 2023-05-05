import { useRef, useEffect } from 'react';

const usePrevious = (value: null) => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export default usePrevious;
