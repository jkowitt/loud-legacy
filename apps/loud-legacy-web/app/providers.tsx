"use client";

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/components/AuthProvider";
import { EditableProvider } from "@/components/EditableProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <EditableProvider>{children}</EditableProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
