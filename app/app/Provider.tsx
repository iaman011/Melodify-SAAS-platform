"use client"

import { SessionProvider } from "next-auth/react";

// we need to wrap up session from appbar.tsx
// This Provider component wraps the NextAuth SessionProvider
// It allows access to the session throughout the client components

export function Provider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
