import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type SearchParams } from "@shared/schema";

export function useCitizens(params: SearchParams) {
  // Filter out undefined/empty params to keep URL clean
  const cleanParams = Object.entries(params).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== "") {
      // @ts-ignore - Record types are tricky with reduce
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, string | number>);

  const queryString = new URLSearchParams(cleanParams as Record<string, string>).toString();
  const queryKey = [api.citizens.list.path, queryString];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const url = `${api.citizens.list.path}?${queryString}`;
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch citizens");
      return api.citizens.list.responses[200].parse(await res.json());
    },
    // Keep previous data while fetching new pages for smoother transitions
    placeholderData: (previousData) => previousData,
  });
}
