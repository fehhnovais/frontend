import { useEffect, useState } from "react";
import { isAxiosError, isCancel } from "axios";
import clientApi from "../api/clientApi";

type UseAxiosResult<T> = {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  refetch: () => void;
};

/**
 * GET genérico pelo clientApi. Com url === null o hook fica parado.
 * Dependências do efeito só primitivas: [url, attempt].
 */
export function useAxios<T>(url: string | null): UseAxiosResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [attempt, setAttempt] = useState<number>(0);

  useEffect(() => {
    setData(null);
    setError(null);

    if (url === null) {
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await clientApi.get<T>(url, { signal: controller.signal });
        setData(response.data);
      } catch (err) {
        // Cancelamento não vira erro na tela (e o efeito novo cuida do loading).
        if (isCancel(err)) return;

        const message = isAxiosError(err) ? err.message : "Erro inesperado";
        setError(message);
      }

      setIsLoading(false);
    };

    void fetchData();

    return () => controller.abort();
  }, [url, attempt]);

  const refetch = () => setAttempt((current) => current + 1);

  return { data, error, isLoading, refetch };
}
