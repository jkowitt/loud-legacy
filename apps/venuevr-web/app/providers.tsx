"use client";

import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import { getQueryClient } from "../lib/queryClient";

type ProvidersProps = {
  children: ReactNode;
};

const client = getQueryClient();

export function Providers({ children }: ProvidersProps) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
