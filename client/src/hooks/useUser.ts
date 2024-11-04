import { getUserInfo } from "@/api/profile";
import { parseError } from "@/api/utils";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  return useQuery<
    Awaited<ReturnType<typeof getUserInfo>>,
    Awaited<ReturnType<typeof parseError>>
  >({
    queryKey: ["user-info"],
    queryFn: getUserInfo,
    retry: false,
    staleTime: Infinity, // Prevent calling API on each invocation, API gets called on login & logout as redirect happens
  });
};
