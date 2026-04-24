"use client";

import { useEffect } from "react";
import { useConfigStore } from "@/store/useConfigStore";

export default function ConfigLoader({ children }: { children: React.ReactNode }) {
  const fetchConfig = useConfigStore((state) => state.fetchConfig);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  return <>{children}</>;
}
