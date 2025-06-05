import useSWR from "swr";

const fetcher = <T>(url: string): Promise<T> => fetch(url).then((res) => {
  if (!res.ok) {
    throw new Error("Failed to fetch resource at " + url);
  }
  return res.json();
})

export function useKpi<T>(endpoint: string, period: string) {
  return useSWR<T>(`${endpoint}?period=${period}`, fetcher);
}
