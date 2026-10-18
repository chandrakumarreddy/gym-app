import { useEffect, useState } from "@lynx-js/react";

type AsyncState<T> = { data?: T; error?: Error; loading: boolean };
type Tracked<T> = AsyncState<T> & { deps: unknown[] };

function sameDeps(a: unknown[], b: unknown[]): boolean {
  return a.length === b.length && a.every((v, i) => Object.is(v, b[i]));
}

export function useAsync<T>(fn: () => Promise<T>, deps: unknown[] = []): AsyncState<T> {
  const [state, setState] = useState<Tracked<T>>({ loading: true, deps });

  useEffect(() => {
    let cancelled = false;
    setState({ loading: true, deps });
    fn().then(
      (data) => !cancelled && setState({ data, loading: false, deps }),
      (error: Error) => !cancelled && setState({ error, loading: false, deps }),
    );
    return () => {
      cancelled = true;
    };
  }, deps);

  if (!sameDeps(state.deps, deps)) return { loading: true };
  return { data: state.data, error: state.error, loading: state.loading };
}
