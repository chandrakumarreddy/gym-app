import { useEffect, useState } from "@lynx-js/react";

type AsyncState<T> = { data?: T; error?: Error; loading: boolean };

export function useAsync<T>(fn: () => Promise<T>, deps: unknown[] = []): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ loading: true });

  useEffect(() => {
    let cancelled = false;
    setState({ loading: true });
    fn().then(
      (data) => !cancelled && setState({ data, loading: false }),
      (error: Error) => !cancelled && setState({ error, loading: false }),
    );
    return () => {
      cancelled = true;
    };
  }, deps);

  return state;
}
