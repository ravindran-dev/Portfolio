import { useEffect, useState } from 'react';

type UseLoaderOptions = {
  durationMs?: number;
};

export function useLoader(options: UseLoaderOptions = {}) {
  const { durationMs = 3000 } = options;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, durationMs);

    return () => {
      window.clearTimeout(timer);
    };
  }, [durationMs]);

  return { isLoading };
}
