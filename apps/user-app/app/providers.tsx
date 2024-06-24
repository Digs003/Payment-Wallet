"use client";
import { RecoilRoot } from "recoil";
import { ClerkProvider } from "@clerk/nextjs";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilRoot>
      <ClerkProvider>{children}</ClerkProvider>
    </RecoilRoot>
  );
};

