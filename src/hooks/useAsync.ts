import { useCallback, useState } from 'react';

interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useAsync<T, Args extends unknown[]>(
  asyncFn: (...args: Args) => Promise<T>,
) {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const run = useCallback(async (...args: Args) => {
    setState({ data: null, loading: true, error: null });
    try {
      const data = await asyncFn(...args);
      setState({ data, loading: false, error: null });
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Algo deu errado.';
      setState({ data: null, loading: false, error: message });
      return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ...state, run };
}
