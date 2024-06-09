"use client";

import { QueryClient, QueryClientProvider } from "react-query";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SessionProvider>
        <Toaster />
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
