"use client";

import { useAuth } from "@clerk/nextjs";
import { useMemo } from "react";
import { apiClient } from "@/lib/api";

export function useApiClient() {
  const { getToken } = useAuth();

  return useMemo(() => {
    const client = apiClient;

    client.interceptors.request.use(async (config) => {
      const token = await getToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });

    return client;
  }, [getToken]);
}
