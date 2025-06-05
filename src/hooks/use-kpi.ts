import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) {
    throw new Error("Failed to fetch resource at " + url);
  }
  return res.json();
})

export function useKpi(endpoint: string, period: string) {
  const { data, error, isLoading } = useSWR(
    `${endpoint}?period=${period}`,
    fetcher
  );
  return { data, error, isLoading };
}
