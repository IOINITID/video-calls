import { useEffect, useState } from 'react';

/**
 * Hook that return timer values.
 */
export const useTimer = () => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevValue) => prevValue + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timer / 60)
    .toString()
    .padStart(2, '0');

  const seconds = Number(timer - Math.floor(timer / 60) * 60)
    .toString()
    .padStart(2, '0');

  return { minutes, seconds };
};
