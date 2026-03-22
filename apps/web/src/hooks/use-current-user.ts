"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { useApiClient } from "./use-api-client";
import type { User } from "@my-app/types";

export function useCurrentUser() {
  const { isSignedIn } = useAuth();
  const api = useApiClient();

  return useQuery<User>({
    queryKey: ["users", "me"],
    queryFn: async () => {
      const response = await api.get<{ data: User }>("/users/me");
      return response.data.data;
    },
    enabled: isSignedIn,
  });
}
