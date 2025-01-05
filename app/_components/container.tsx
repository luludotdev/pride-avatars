import type { ReactNode } from "react";

export const Container = ({ children }: { readonly children: ReactNode }) => (
  <div className="relative flex h-fit min-h-screen w-full flex-col items-center px-4">
    {children}
  </div>
);

export const Content = ({ children }: { readonly children: ReactNode }) => (
  <div className="mt-4 flex w-full max-w-[540px] flex-1 flex-col items-center gap-y-4">
    {children}
  </div>
);
