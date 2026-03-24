"use client";

import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { apiClient } from "@/lib/api";

export function useApiClient() {
  const { data: session } = useSession();

  return useMemo(() => {
    const client = apiClient;

    client.interceptors.request.use((config) => {
      if (session?.accessToken) {
        config.headers["Authorization"] = `Bearer ${session.accessToken}`;
      }
      return config;
    });

    return client;
  }, [session?.accessToken]);
}
