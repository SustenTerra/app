import { useEffect, useState } from 'react';

import { showErrors } from '@/services/errors';

export function usePolling<T>(
  fn: () => Promise<T>,
  interval: number,
  deps: any[] = [],
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fn();
      setData(response);
    } catch (error) {
      showErrors(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, interval);

    return () => clearInterval(intervalId);
  }, deps);

  return { data, loading };
}
